(function($) {
        
    $(document).ready(function() { 
        if($(document.body)[0].scrollHeight > $(window).height() == false){
            $('.backButton.Right').css("right" , "0px");
            $('.backButton.Left').css("left" , "0px");
        }
        var boton = $('.backButton');
        if(boton.hasClass('forceShow')){
            if(boton.hasClass("Right")){
                boton.css("right" , "0px");
            }else{
                boton.css("left" , "0px");
            }
        }
    });
        
    var win = $(window);
    win.scroll(function () {
        var boton = $('.backButton');
        
        if(boton.hasClass('forceShow') == false){
          if (win.height() + win.scrollTop() >= $(document).height()/1.5) {
                 if(boton.hasClass("Right")){
                    boton.css("right" , "0px");
                 }else{
                    boton.css("left" , "0px");
                 }
           }else{
                 if(boton.hasClass("Right")){
                     boton.css("right" , "-250px");
                 }else{
                     boton.css("left" , "-250px");
                 }
           }
        }
    });
    
}(jQuery));