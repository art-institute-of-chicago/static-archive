// orientation can be "top" or "bottom"
function setupTooltips(map_container, orientation, attempts) {
  // orientation defaults to "top"
  if(orientation === undefined) {
    orientation = 'top';
  }

  // set safety counter to max attempts
  if(attempts === undefined) {
    attempts = 10;
  }

  // if fleximap areas have been loaded...
  if($(map_container).find('.fleximap-area').length > 0) {
    $(map_container).find('.fleximap-area').each(function() {
      var citation = $(this).data('citation') || '';
      // "ctitle" is different from the modal "title" for owned works because
      // it is the original catalogue title, rather than the artwork name
      var ctitle = $(this).data('ctitle') || '';
      var tip = '<p class="tip-title">' + ctitle + '</p><p class="tip-citation">' + citation + '</p>';
      $(this).attr('title', tip);
      // if area has "tipside" then override default tip orientation
      var tipside = $(this).data('tipside') || orientation;
      $(this).addClass('has-tip tip-' + tipside + ' noradius');
    });
  // if not loaded, wait and retry up to 10 times
  } else if(attempts > 0) {
    attempts = attempts - 1;
    setTimeout(function() {
      setupTooltips(map_container, orientation, attempts);
    }, 500);
  }
  $(document).tooltips('reload');
}

function mobileTapToHover(container) {
  var attempts = 10;
  if($(container).find('.fleximap-area').length > 0) {
    $(container).find('.fleximap-area').click(function() {
      $(container).find('.fleximap-area.active').trigger('mouseout');
      $(this).trigger('mouseover');
      $(this).addClass('active');
    });
  } else if(attempts > 0) {
    attempts = attempts - 1;
    setTimeout(function() {
      mobileTapToHover(container);
    }, 500);
  }
}

function createLastJoyrideStopAndBegin(container) {
  var attempts = 10;
  var allAreas = $(container).find('.fleximap-area');
  if(allAreas.length > 0) {
    var stopAreaId = '';
    $.each(allAreas, function() {
      if($(this).data('joyride-stop') === true) {
        stopAreaId = $(this).attr('id');
      }
    });
    // fallback to first area if no stop is defined in data
    if(stopAreaId === '') {
      stopAreaId = allAreas.first().attr('id');
    }
    // last stop joyride options go here
    var optionsString = 'tipLocation:top;';
    // last stop html content goes here
    var content = '<p>Hover over artworks (or tap on mobile) for more information.</p>';
    $('#joyride-schedule').append('<li data-id="' + stopAreaId + '" data-options="' + optionsString + '" data-button="close">' + content + '</li>');
    $('#joyride-schedule').joyride({
      // global joyride options go here
      'timer' : 0,
      'cookieMonster' : true
    });
  } else if(attempts > 0) {
    attempts = attempts - 1;
    setTimeout(function() {
      createLastJoyrideStopAndBegin(container);
    }, 500);
  }
}

function createAllModals() {
  var attempts = 10;
  var allAreas = $('.fleximap-area');
  if(allAreas.length > 0) {
    // find fleximap areas that have data "owned" true
    allAreas.each(function() {
      if($(this).data('owned') === true) {
        // parse the other data: thumbnail, period, title, medium, collection
        var modalData = {
          "id" : $(this).attr('id'),
          "thumbnail" : $(this).data('thumbnail'),
          "artist" : $(this).data('artist'),
          "period" : $(this).data('period'),
          "title" : $(this).data('title'),
          "medium" : $(this).data('medium'),
          "collection" : $(this).data('collection'),
          "description" : $(this).data('description'),
          "link"  : $(this).data('link')
        };

        // pass data to createSingleModal to create the modal
        var modalId = createSingleModal(modalData);

        // attach modal-launch event handler to fleximap area
        $(this).bind('click touchstart', function() {
          $("#" + modalId).reveal({
            animation: 'fade',
            dismissModalClass: 'close-modal'
          });
        });

        // update tooltip text
        addClickTextToTooltip(this);
      
      }
    });
  } else if(attempts > 0) {
    attempts = attempts - 1;
    setTimeout(function() {
      createAllModals();
    }, 500);
  }
}

function createSingleModal(modalData) {
  // construct modal div from above
  var modalId = modalData["id"] + '-modal';
  if(modalData["link"] && modalData["link"] !== '') {
    var link = '<a href="' + modalData["link"] + '" class="owned-link" target="_blank">More info</a>'; 
  } else {
    var link = '';
  }
  if(modalData["thumbnail"] && modalData["thumbnail"] !== '') {
    var thumbnail = '<img src="' + modalData["thumbnail"] + '" class="modal-thumbnail"/>';
  } else {
    var thumbnail = '';
  }
  var modal = ' \
    <div id="' + modalId + '" class="reveal-modal gallery"> \
      <p class="modal-artist">' + modalData["artist"] + '</p> \
      <p class="modal-details">' + modalData["period"] + '</p> \
      <p class="modal-details">' + modalData["title"] + '</p> \
      <p class="modal-details">' + modalData["medium"] + '</p> \
      <p class="modal-details">' + modalData["collection"] + '</p> \
      <p class="modal-description"> \
        ' + thumbnail + ' \
        ' + modalData["description"] + ' \
      </p> \
      <p class="modal-close"> \
        <a href="#" class="close-modal">Return to page</a> \
        ' + link + ' \
      </p> \
    </div> \
  ';

  // append it to the body
  $('body').append(modal);  

  // return modal id
  return modalId;
}

function addClickTextToTooltip(area) {
  $(area).attr('title', $(area).attr('title') + '<p class="click-tip">This artwork is in the Art Institute\'s collection, click it for more information</p>');
}

// for mobile, to prevent conflict with modal
function removeTooltipsFromOwned() {
  var attempts = 10;
  var allAreas = $('.fleximap-area');
  if(allAreas.length > 0) {
    // find fleximap areas that have data "owned" true
    allAreas.each(function() {
      if($(this).data('owned') === true) {
        $(this).removeClass('has-tip');
      }
    });
  } else if(attempts > 0) {
    attempts = attempts - 1;
    setTimeout(function() {
      removeTooltipsFromOwned();
    }, 500);
  }
}
