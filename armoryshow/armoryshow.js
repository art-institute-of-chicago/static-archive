function addExpanderLinks(more, less) {
  var expanders = $('div.expandable');
  expanders.each(function() {
    var summary = $(this).children('div.summary');
    var fulltext = $(this).children('div.fulltext');
    if(summary.length > 0 && fulltext.length > 0) {
      summary.append('<p><a href="javascript:;" class="expandlink">' + more + '</a></p>');
      fulltext.append('<p><a href="javascript:;" class="expandlink">' + less + '</a></p>');
      summary.find('a.expandlink').click(function() {
        summary.css({'visibility':'hidden', 'height':'0', 'overflow':'hidden'});
        fulltext.css({'visibility':'visible', 'height':'auto', 'overflow':'visible'});
      });
      fulltext.find('a.expandlink').click(function() {
        fulltext.css({'visibility':'hidden', 'height':'0', 'overflow':'hidden'});
        summary.css({'visibility':'visible', 'height':'auto', 'overflow':'visible'});
      });
    }
  });
}

// manual slideshow start

function parseHash(default_selection) {
  return window.location.hash ? window.location.hash.substring(1) : default_selection;
}

function selectCurrent(slideid) {
  $('.slideshow-container.current').removeClass('current');
  $('.thumbnail-container img.current').removeClass('current');
  $('#slide-' + slideid).addClass('current');
  $('.thumbnail-container a').each(function() {
    if($(this).attr('href').substring(1) === slideid) {
      $(this).children('img').addClass('current');
    }
  });
}

function attachThumbClickHandlers() {
  $('.thumbnail-container img').each(function() {
    var slideid = $(this).data('slide');
    $(this).click(function() {
      var newhash = $(this).parent().attr('href').substring(1);
      selectCurrent(newhash);
    });
  });
}

function initializeManualSlideshow(default_selection) {
  attachThumbClickHandlers();
  selectCurrent(parseHash(default_selection));
}

// manual slideshow end

$(window).load(function() {
  addExpanderLinks('Full Text', 'Summary');
});

// container should be a full identifier like "#thing" or ".things"
function addCloseModalLinks(container) {
  var container = container || 'body';
  var link = ' \
    <p class="modal-close"> \
      <a href="javascript:;" class="close-modal">Return to page</a> \
    </p> \
  ';
  $(container + ' .reveal-modal').append(link);
}
