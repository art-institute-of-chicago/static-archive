var AALP = {

  getNavElements: function() {
    return $('.main-nav').children('li');
  },

  setNavClass: function(className) {
    // className needs to be either 'desktop' or 'mobile'
    var nav = $('.main-nav');
    $.each(['desktop', 'mobile'], function(k,v) {nav.removeClass(v)});
    nav.addClass(className);
  },

  activateSubNavs: function() {
    AALP.deactivateSubNavs();
    if($(window).width() >= 768) {
      AALP.activateDesktopSubNavs();
    } else {
      AALP.activateMobileSubNavs();
    }
  },

  activateDesktopSubNavs: function() {
    AALP.setNavClass('desktop');

    var navElements = AALP.getNavElements();
    
    navElements.children("a").on("click", function() {
      window.location = $(this).data("link-url");
    });

    navElements.on("mouseenter", function() {
      // note that this will only work for a single main nav
      // if there are multiple navs it will need to be changed
      var subNavs = $(this).children('.expandable-sub-nav');
      var mainWidth = $('.main-nav')[0].offsetWidth;
      $(this).addClass('hovering');
      subNavs.css({
        left: mainWidth,
        display: 'block'
      })
    });

    navElements.on("mouseleave", function() {
      var subNavs = $(this).children('.expandable-sub-nav');
      $(this).removeClass('hovering');
      subNavs.css({
        display: 'none'
      });
    });
  },

  activateMobileSubNavs: function() {
    AALP.setNavClass('mobile');
    var navElements = AALP.getNavElements();

    navElements.children("a").on("click", function(e) {
      if ($(this).parent().attr('id') == 'chefs') {
        window.location = $(this).data("link-url");
      } else {
        $('.expandable-sub-nav').slideUp();
        $(this).siblings('.expandable-sub-nav').slideToggle(
          400, 
          function() {
            var categoryTop = $(this).parent().attr('id');
            $("html, body").animate({ scrollTop: $('#'+categoryTop).offset().top }, 1000);
          }
        );
        e.preventDefault();
      }
    });
  },

  deactivateSubNavs: function() {
    var navElements = AALP.getNavElements();

    navElements.children("a").off("click");
  
    navElements.off("mouseenter");
    navElements.off("mouseleave");
  }

};

/*
 * linotype font loading
 */

var MTUserId='8163f540-ea48-48b6-87a1-d880fb722696';
var MTFontIds = new Array();

MTFontIds.push("795742"); // Bauer Bodoni® WFS W01 Black 
MTFontIds.push("774839"); // Futura® WFS W01 Book 
MTFontIds.push("774842"); // Futura® WFS W01 Book Oblique 
MTFontIds.push("774884"); // Futura® WFS W01 Medium Condensed 
(function() {
var mtTracking = document.createElement('script');
mtTracking.type='text/javascript';
mtTracking.async='true';
mtTracking.src=('https:'==document.location.protocol?'https:':'http:')+'//fast.fonts.net/lt/trackingCode.js';

(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(mtTracking);
})();

/*
 * end linotype font loading
 */


$(window).load(function() {
  $(document).foundation();
  AALP.activateSubNavs();
  window.onresize = function() {
    AALP.activateSubNavs();
  };
});

