/**
 * Handles toggling the main navigation menu for small screens.
 * A Generic wrapper class for show/hide stuff on hover
 */
jQuery( document ).ready(function( $ ){
    var $masthead = $( '#masthead' ),
        timeout = false;

    $.fn.smallMenu = function() {
        $masthead.find( '.site-navigation' ).removeClass( 'main-navigation' ).addClass( 'main-small-navigation' );
        $masthead.find( '.site-navigation h1' ).removeClass( 'assistive-text' ).addClass( 'menu-toggle' );

        $( '.menu-toggle' ).unbind( 'click' ).click( function() {
            $masthead.find( '.menu' ).toggle();
            $( this ).toggleClass( 'toggled-on' );
        } );
    };

    // Check viewport width on first load.
    if ( $( window ).width() < 1024 )
        $.fn.smallMenu();

    // Check viewport width when user resizes the browser window.
    $( window ).resize( function() {
        var browserWidth = $( window ).width();

        if ( false !== timeout )
            clearTimeout( timeout );

        timeout = setTimeout( function() {
            if ( browserWidth < 1024 ) {
                $.fn.smallMenu();
            } else {
                $masthead.find( '.site-navigation' ).removeClass( 'main-small-navigation' ).addClass( 'main-navigation' );
                $masthead.find( '.site-navigation h1' ).removeClass( 'menu-toggle' ).addClass( 'assistive-text' );
                $masthead.find( '.menu' ).removeAttr( 'style' );
            }
        }, 200 );
    } );

    // Disable browser left/right arrow keys
    var ar=new Array(37,39);
    $(document).keydown(function(e) {
         var key = e.which;
          if($.inArray(key,ar) > -1) {
              e.preventDefault();
              return false;
          }
          return true;
    });

    $('.sideswipe').show();
    $('.preloader').hide();

	var $gallery_slider = $('.single-format-gallery .flexslider:first');
	$('.post-format-content').append($gallery_slider);

});

 jQuery(window).resize(function(){
      sideswipe.init();
  });