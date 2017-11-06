var Adjaye = {

  shortfade: 250,

  longfade: 1000,

  mobile_breakpoint: 768,

  is_mobile: false,

  content_container_timeout: 0,

  scrolling: false,

  scroll_step: 50,

  active_section: 0,

  video_div: 'yt-video-player',

  video_player: [],

  current_video_data: null,

  mobile_check: function() {
    if($(window).width() <= Adjaye.mobile_breakpoint) {
      $('body').addClass('mobile');
    }

    if($('body').hasClass('mobile')) {
      Adjaye.is_mobile = true;
    }
  },

  set_full_height: function(selector) {
    // allow custom selector but also automatically resize anything with .full-height class
    $(selector + ', .full-height').css('min-height', $(window).height() + 'px');
  },

  preload_background_images: function() {
    $('.background-image').each(function() {
      if(Adjaye.is_mobile) {
        var bg = $(this).data('bg-mobile');
      } else {
        var bg = $(this).data('bg-desktop');
      }
      $(this).css('background-image', 'url(' + bg + ')');
    });
  },

  get_background_image: function(chapter) {
    return $('.chapter[data-chapter="' + chapter + '"] .background-image');
  },

  change_background_image: function(chapter, direction) {
    if(Adjaye.is_mobile) {
      $('.chapter .background-image').css({
        display: 'block', 
        visibility: 'visible', 
        opacity: '1'
      });
      return;
    }

    if(direction === 'up') {
      Adjaye.get_background_image(chapter).fadeIn(Adjaye.longfade);
    } else {
      Adjaye.get_background_image(chapter - 1).fadeOut(Adjaye.longfade);
    }
  },

  show_content_container: function() {
    clearTimeout(Adjaye.content_container_timeout);

    $('.content-container').stop(true).animate({
      backgroundColor: 'rgba(255, 255, 255, 1)'
    }, Adjaye.shortfade);
    $('.secondary-logo-container').stop(true).animate({
      opacity: 1
    }, Adjaye.shortfade);

    Adjaye.content_container_timeout = setTimeout(function() {
      $('.secondary-logo-container').css('backgroundColor', 'rgba(255, 255, 255, 1)');
      $('.content-container .chapter article section').stop(true).animate({
        color: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)'
      }, Adjaye.shortfade);
    }, Adjaye.shortfade);
  },

  hide_content_container: function() {
    if(Adjaye.is_mobile) {return;}

    clearTimeout(Adjaye.content_container_timeout);

    $('.content-container .chapter article section').stop(true).animate({
      color: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0)'
    }, Adjaye.shortfade);

    Adjaye.content_container_timeout = setTimeout(function() {
      $('.secondary-logo-container').css('backgroundColor', 'rgba(255, 255, 255, 0)');
      $('.content-container').stop(true).animate({
        backgroundColor: 'rgba(255, 255, 255, 0)'
      }, Adjaye.shortfade);
      $('.secondary-logo-container').stop(true).animate({
        opacity: 0
      }, Adjaye.shortfade);
    }, Adjaye.shortfade);
  },

  display_related_events: function() {
    $.get("/calendar", {'url' : 'http://www.artic.edu/calendar?date1=09-04-2015&date2=09-04-2016&keyword=adjaye'}, function(calendar_feed) {
      $('#related-events-spinner').remove();

      calendar_feed = calendar_feed.slice(0, 5);
      $.each(calendar_feed, function(k, event) {
        $('#related-events').append(
          '<p class="event">' + 
            '<a href="' + event.url + '">' +
              event.title + 
            '</a>' +
            '<br /><span class="event-date">' +
              event.date +
            '</span>' +
          '</p>'
        );
      });
    }, 'json');
  },

  scroll_content: function(direction) {
    // http://stackoverflow.com/questions/4571867/how-to-make-a-scrolable-div-scroll-on-click-and-mouseover-using-jquery
    if(direction === 'down' && Adjaye.active_section === 0) {
      $.scrollTo('.chapter[data-chapter="1"]', {
        duration: 500,
        complete: function() {
          setTimeout(function() {
            Adjaye.scroll_content('down');
          }, 1000);
        }
      });
      return;
    }

    var current_offset = $(window).scrollTop();
    if(direction === 'up') {
      var next_offset = current_offset - 5;
    } else {
      var next_offset = current_offset + 5;
    }

    $.scrollTo('.content-container', {
      offset: next_offset,
      duration: 1,
      complete: function() {
        if(Adjaye.scrolling) {
          Adjaye.scroll_content(direction);
        }
      }
    });
  },

  scroll_to_chapter: function(target_chapter) {
    $('html, body').animate({
      scrollTop: $('.chapter[data-chapter="' + target_chapter + '"]').offset().top
    }, 1000);
  },

  initialize_video: function(youtube_id) {
    Adjaye.load_frame_api_script();

    window.onYouTubeIframeAPIReady = function() {
      var video_containers = $('.'+Adjaye.video_div);

      $.each(video_containers, function(index, value) {
        Adjaye.build_player($(this).attr('id'));
      });
    }
  },

  load_frame_api_script: function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },
  
  build_player: function(youtube_id) {
    Adjaye.video_player[youtube_id] = new YT.Player(youtube_id, {
      height: '326',
      width: '580',
      videoId: youtube_id,
      playerVars: {
        wmode: "opaque",
        rel: 0,
        showinfo: 0
      },
      events: {
        'onReady': Adjaye.on_player_ready,
        'onStateChange': Adjaye.on_player_state_change
      }
    });
  },

  on_player_ready: function(event) {
    Adjaye.set_responsive_video();
    var autoplay_match = window.location.search.match(/autoplay=([^&]*)/);
    if(autoplay_match !== null && autoplay_match[1] === 'true') {
      event.target.playVideo();
      $('#video-status').show();
    }
  },

  on_player_state_change: function(event) {
    if(event.data == YT.PlayerState.PLAYING) {
      Adjaye.current_video_data = event.target.getVideoData();
      $('#video-status').show();
    } else if(event.data == YT.PlayerState.PAUSED) {
      $('#video-status').hide();
    }
  },

  video_pause: function() {
    Adjaye.video_player[Adjaye.current_video_data.video_id].pauseVideo();
    $('#video-status').hide();
  },

  /* TODO: set this to use the API setSize() function instead
           player.setSize(width:Number, height:Number):Object */
  set_responsive_video: function() {
    if(Adjaye.is_mobile) {
      var all_videos = $("iframe[src^='https://www.youtube.com']"),
          fluid_el   = $(".content-container");

      all_videos.each(function() {
        $(this)
          .data('aspect_ratio', this.height / this.width)
          .removeAttr('height')
          .attr('width', '100%');
      });

      $(window).resize(_.debounce(function() {
        var new_width = fluid_el.width();
        all_videos.each(function() {
          var el = $(this);
          $(this).height(fluid_el.width() * el.data('aspect_ratio'));
        });
      }, 250)).resize();
    }
  }
}


$(window).on('resize', _.debounce(function() {
  Adjaye.set_full_height('.chapter');
  Adjaye.mobile_check();
}, 250));


$(document).on('ready', function() {
  Adjaye.mobile_check();

  Adjaye.preload_background_images();

  Adjaye.set_full_height('.chapter');

  // if the video div player is on the page, load the yt api player
  if($('.'+Adjaye.video_div)) {
    Adjaye.initialize_video();
  }

  Adjaye.display_related_events();

  $('.chapter').waypoint({
    handler: function(direction) {
      var active_section = $(this.element).data('chapter');

      if(direction === 'up') {
        active_section = active_section - 1;
      }

      Adjaye.active_section = active_section;

      if(active_section === 0) {
        $('.scroll-up-arrow').css('visibility', 'hidden');
      } else if(active_section === 10) {
        $('.scroll-down-arrow').css('visibility', 'hidden');
      } else {
        $('.scroll-arrow').css('visibility', 'visible');
      }

      Adjaye.change_background_image(active_section, direction);

      // show / hide content area, this is pretty fragile
      if(active_section === 0 || active_section >= 7) {
        Adjaye.hide_content_container();
      } else {
        Adjaye.show_content_container();
      }
    },
    offset: '50%'
  });

  $('.go-to-video').on('click', function() {
    var current_video_chapter = $('#'+Adjaye.current_video_data.video_id).closest('.chapter').data('chapter');
    Adjaye.scroll_to_chapter(current_video_chapter);
  });

  $('.play-video').on('click', function(e) {
    e.preventDefault();
    Adjaye.scroll_to_chapter($(this).data('go-to-chapter'));
    Adjaye.video_player[$(this).data('youtube-id')].playVideo();
  });

  $('#video-pause').click(Adjaye.video_pause)

  $('.scroll-down-arrow').on('mouseover', function(event) {
    Adjaye.scrolling = true;
    Adjaye.scroll_content('down');
  }).on('mouseout', function(event) {
    Adjaye.scrolling = false;
  });

  $('.scroll-up-arrow').on('mouseover', function(event) {
    Adjaye.scrolling = true;
    Adjaye.scroll_content('up');
  }).on('mouseout', function(event) {
    Adjaye.scrolling = false;
  });

  var chapter_match = window.location.search.match(/chapter=([^&]*)/);
  if(chapter_match !== null) {
    Adjaye.scroll_to_chapter(chapter_match[1]);
  }

});
