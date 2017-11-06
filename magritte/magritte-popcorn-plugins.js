(function(Popcorn) {

  Popcorn.plugin("multi_image", {
    // display one or more images with captions

    _setup: function(options) {
      var image_elements = [], 
          caption_elements = [],
          img_class;

      $.each(options.images, function(k, image) {
        img_class = typeof image.class !== 'undefined' ? image.class : '';
        image_elements.push(TD(IMG({src: image.src, class: img_class})));
        caption_elements.push($('<p/>').html(image.caption));
      });

      options.media_area_content = TABLE(TR(image_elements));
      options.caption_area_content = caption_elements;
    }, 

    _update: function(options) {},
    _teardown: function(options) {},
    
    start: function(event, options) {
      $('#presentation-container').css('opacity', 0);
      $('#segment-media-area').html(options.media_area_content);
      $('#segment-caption-area').html(options.caption_area_content);
      $('#presentation-container').fadeTo(1000, 1);
    },

    end: function(event, options) {}

  });


  Popcorn.plugin("next_segment_button", {
    // display the button to advance to next segment

    _setup: function(options) {},
    _update: function(options) {},
    _teardown: function(options) {},

    start: function(event, options) {
      $('#next-segment-button').css('display', 'block');
    },

    end: function(event, options) {
      if(this.currentTime() < options.start) {
        $('#next-segment-button').css('display', 'none');
      }
    }
  
  });


  Popcorn.plugin("last_gangster_button", {
    // display the button to advance to next segment

    _setup: function(options) {
      var audio_player = document.getElementById("segment-audio-player-4");
      $('#last-gangster-thumbnail-button').click(function() {
        $(this).addClass('video-watched');
        $('#resume-audio-play').css('display', 'block');
        audio_player.pause();
        window.open('/magritte/resources?autoplay=true', '_blank');
      });
      $('#resume-audio-play').click(function() {
        audio_player.play();
        $(this).css('display','none');
      });
    },

    _update: function(options) {},
    _teardown: function(options) {},

    start: function(event, options) {
      $('#last-gangster-thumbnail-button').css('display', 'block');
    },

    end: function(event, options) {
      $('#last-gangster-thumbnail-button').css('display', 'none');
    }
  
  });
  

  Popcorn.plugin("rotate_images", {
    // rotate current image(s) by given amount

    _setup: function(options) {

    }, 

    _update: function(options) {},
    _teardown: function(options) {},
    
    start: function(event, options) {
      
    },

    end: function(event, options) {}

  });


  Popcorn.plugin("any_html", {
    // display arbitrary html content, for video embeds and the like

    _setup: function(options) {

    }, 

    _update: function(options) {},
    _teardown: function(options) {},
    
    start: function(event, options) {
      $('#presentation-container').css('opacity', 0);
      $('#segment-media-area').html(options.content);
      $('#segment-caption-area').html(options.caption);
      $('#presentation-container').fadeTo(1000, 1);
    },

    end: function(event, options) {}

  });

})(Popcorn);
