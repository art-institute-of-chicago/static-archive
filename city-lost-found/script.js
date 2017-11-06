var CityLostFound = {
  
  more_text: "More [+]",

  less_text: "Less [-]",

  toggle_more_info: function(container_name) {
    var is_hidden = $('.'+container_name).is(':hidden');
    var container_link = $(".more-info-link[data-more-info='" + container_name + "']");
    $('.'+container_name).slideToggle();
    if (is_hidden) {
      container_link.text(CityLostFound.less_text);
    } else {
      container_link.text(CityLostFound.more_text);
    }
  }

};


$(document).ready( function() {
  $(document).foundation();
  $('.more-info').hide();

  $('.more-info-link').click( function(e) {
    e.preventDefault();
    CityLostFound.toggle_more_info($(this).data('more-info'));
  });

  $('.city-stripes > div').click( function(e) {
    window.location = '/city-lost-found/' + $(this).data('city');
  });

});
