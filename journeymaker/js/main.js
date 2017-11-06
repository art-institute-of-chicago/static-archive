(function($){


    /*
       $("#affix-nav li a[href^='#']").on('click', function(e) {

    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $('html, body').animate({
    scrollTop: $(hash).offset().top
    }, 300, function(){

    // when done, add hash to url
    // (default click behaviour)
    window.location.hash = hash;
    });

    });
    */

    $(window).scroll(function() {
        if ($(document).scrollTop() > 500) {
            $('#navbar').addClass('shrink');
        } else {
            $('#navbar').removeClass('shrink');
        }
    });

    $("a.angle-down").click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
/*
    $('#affix-nav a').on('click', function() {
        $('.navbar-fixed-top li').removeClass('active');

    });
*/
    $('.navbar-fixed-top a').on('click', function(e) {
        $('.navbar-fixed-top li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });

    if(location.search.indexOf('v=1') > 0){window.scrollTo(0, document.getElementById('video').offsetTop)}

})(jQuery)
