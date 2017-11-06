(function(){
  // scroll past nav on page load for small screens
  if(window.innerWidth <= 390) {
    $('html, body').animate({
      scrollTop: $('.sticky').height()
    }, 1000);
  }
})();
