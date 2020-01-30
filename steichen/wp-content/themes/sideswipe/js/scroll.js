(function(jQuery){
  jQuery.extend(jQuery.expr[':'], {
    next: function(a){
      var fold = jQuery(window).width() + jQuery(window).scrollLeft();
      return fold <= (jQuery(a).offset().left + jQuery(a).width());
    },
    prev: function(a){
      var left = jQuery(window).scrollLeft();
      return left >= jQuery(a).offset().left;
    }
  });

  jQuery.fn.scrollTo = function(options, callback){
    var settings = {
      'speed' : 300
    };
    if ( options ) {
      jQuery.extend( settings, options );
    }
    var offset = jQuery(this).offset();
    if( offset ) {
      var scroll = offset.left-((jQuery(window).width()/2)-(jQuery(this).width()/2));
    }
    if(scroll < 0 ){
      scroll = 0;
    }
    if (window.opera) {
      scrollElement = 'html';
    } else {
      scrollElement = 'html, body';
    }
    jQuery(scrollElement).animate({scrollLeft: scroll}, 300, callback);
    return this;
  }

})(jQuery);

jQuery(window).load(function(){
  sideswipe.init();

  if(navigator.userAgent.match(/iPad/i) != null){
    sideswipe.setup_ipad();
  }

  sideswipe.enable_keys();

  jQuery('input, textarea').focus(function(){
    sideswipe.disable_keys();
  });

  jQuery('input, textarea').blur(function(){
    sideswipe.enable_keys();
  });

  jQuery('button.next').click(function(){
    sideswipe.next();
    return false;
  });

  jQuery('button.prev').click(function(){
    sideswipe.prev();
    return false;
  });

  jQuery(window).scroll(function(){
    sideswipe.reset_buttons();
  });

  jQuery('.faded, .hentry').each(function(i) {
    jQuery(this).delay(i * 500).fadeTo('slow', 1);
  });

});


var sideswipe = {
  scroll_speed: 300,
  init: function(){
    var window_width = jQuery(window).width(), sideswipe_width = 0, article_array, closest, m=0, gallery_width = 0, widths = 0;

    jQuery('.sideswipe').children().each(function(index){
      var incl_margin = true;
      if(parseInt(jQuery(this).css('margin-left')) < 0 || parseInt(jQuery(this).css('margin-right')) < 0) {
        var incl_margin = false;
      }
      m++;
      var hasGallery = jQuery('.sideswipe article:nth-child('+m+')').hasClass('post-format-content');
      if( hasGallery == true ) {
        jQuery('.sideswipe .post-format-content .gallery').children().each(function() {
          gallery_width += (parseInt(jQuery(this).outerWidth(true)));
        });
        widths = (gallery_width + 20);
      } else {
        widths = (jQuery(this).outerWidth(incl_margin));
      }
      sideswipe_width += (widths+2);
      jQuery(this).attr('data-index', index).attr('data-width', widths );

      // iPad only
      if(navigator.userAgent.match(/iPad/i) != null) {
        if(jQuery(this).find('.hentry').height() < jQuery(this).find('.content').height()){
          jQuery(this).addClass('scrollable');
        }
        var gwidth = 0;

        jQuery('.post-format-content .image').each(function() {
          gwidth += jQuery(this).outerWidth( true );
          jQuery('.post-format-content').attr('data-width', gwidth);
          jQuery('.sideswipe').css({'width' : gwidth+300+'px'});
        });
      }
    });
    if(sideswipe_width > 0) {
      jQuery('.sideswipe').css({'width' : sideswipe_width+'px'});
    }
    sideswipe.reset_buttons();
    if (window_width < sideswipe_width) {
      jQuery('body').addClass('js');
    }

  },
  next: function(){
    if(jQuery('.post-format-content article:next:first').length != 0){
      jQuery('.post-format-content article:next:first').scrollTo({speed: sideswipe.scroll_speed}, function(){
        sideswipe.reset_buttons();
      });
    } else {
		jQuery('article:next:first').scrollTo({speed: sideswipe.scroll_speed}, function(){
        sideswipe.reset_buttons();
      });
	}
    return false;
  },
  prev: function(){
    if(jQuery('article:prev:last').length != 0){
      jQuery('article:prev:last').scrollTo({speed: sideswipe.scroll_speed}, function(){
        sideswipe.reset_buttons();
      });
    }
    return false;
  },
  reset_buttons: function(){
    if(jQuery(window).scrollLeft() === 0){
      jQuery('button.prev').addClass('disabled');
    } else {
      jQuery('button.prev').removeClass('disabled');
    }
    if(jQuery(window).scrollLeft()+jQuery(window).width() == jQuery('.sideswipe').outerWidth()){
      jQuery('button.next').addClass('disabled');

    } else {
      jQuery('button.next').removeClass('disabled');
    }
  },
  enable_keys: function(){
    jQuery(document).keyup(function(e){
      if(e.keyCode == '37'){
        e.preventDefault();
        sideswipe.prev();
      }
      if(e.keyCode == '39'){
        e.preventDefault();
        sideswipe.next();
      }
    });
  },
  disable_keys: function(){
    jQuery(document).unbind('keyup');
  },
  setup_ipad: function(){
    sideswipe.touch_scroll();
    jQuery('.pagenav').clone().appendTo('.sideswipe').css({'position':'absolute', 'bottom' : '-8px', 'right':'37px'});
  },
  is_touch_device: function(){
    try{
      document.createEvent("TouchEvent");
      return true;
    }catch(e){
      return false;
    }
  },
  touch_scroll: function(){
    if(sideswipe.is_touch_device){ //if touch events exist...
      var els=jQuery('.scrollable .card').get();//document.getElementsByClassName(selector);
      var scrollStartPos=0;

      for (i = 0, j = 0; i < els.length; i++) {
        els[i].addEventListener("touchstart", function(event) {
          scrollStartPos=this.scrollTop+event.touches[0].pageY;
        },false);

        els[i].addEventListener("touchmove", function(event) {
          this.scrollTop=scrollStartPos-event.touches[0].pageY;
          event.preventDefault();
        },false);
      }
    }
  }
}