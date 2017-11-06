var ImageExplorer = {

  // root path for tile sets
  tile_image_path: "",


  // to add or remove layers from the image explorer 
  // add/remove objects from this array
  // methods after this array will loop through it to build the 
  // image explorer and thumbnail navigation
  //
  // Attributes:
  // id: folder name in tile_image_path containing generated tiles
  // title: name of tile set, displayed in title/alt tags as well as below thumbnail nav
  dzt_tile_subdirectory_array: [
    {
      id: "TimeTransfixed_painting",
      title: "The Painting",
      caption: "René Magritte. <em>Time Transfixed</em>, 1938. The Art Institute of Chicago, Joseph Winterbotham Collection. © Charly Herscovici–ADAGP–ARS, 2014."
    },
    {
      id: "TimeTransfixed_xray",
      title: "X-ray",
      caption: "X-ray of <em>Time Transfixed</em>."
    },
    {
      id: "TimeTransfixed_xray_outline_trains",
      title: "X-ray (trains outlined)",
      caption: "X-ray of <em>Time Transfixed</em> with outline of original placement of the train (in red) and current placement (in green)."
    },
    {
      id: "TimeTransfixed_IR",
      title: "Transmitted Infrared",
      caption: "Transmitted infrared photograph of <em>Time Transfixed</em>."
    },
    {
      id: "TimeTransfixed_IR_outlined_figure",
      title: "Transmitted Infrared (figure outlined)",
      caption: "Transmitted infrared photograph of <em>Time Transfixed</em> with outline of reclining male figure."
    },
    {
      id: "TimeTransfixed_translight_outlined_figure",
      title: "Transmitted Light (figure outlined)",
      caption: "Transmitted light photograph of <em>Time Transfixed</em> with outline of reclining male figure."
    },
    {
      id: "TimeTransfixed_overlay_figure_sketch",
      title: "Transmitted Infrared (sketch overlay)",
      caption: "René Magritte. <em>Untitled (Study for “Spring Eternal”)</em>, c. 1937-38. Private Collection. © Charly Herscovici–ADAGP–ARS, 2014. Overlayed on transmitted infrared image of René Magritte, <em>Time Transfixed</em>, 1938. The Art Institute of Chicago, Joseph Winterbotham Collection. © Charly Herscovici–ADAGP–ARS, 2014."
    }
  ],


  // parameters
  // dzt_directory_array (Array) - list of diretory names containing dzt-generated tiles
  // zoom_level (Integer) - zoom level to use for images thumbnails
     // REFACTOR?: if thumbnails made by dzt (Ruby tile generator) are not sufficient
  create_thumbnail_nav_html: function(dzt_directory_array, zoom_level) {
    var bullet_list = "";
    jQuery.each(dzt_directory_array, function(index, value) {
      var active = index == 0 ? " active-slide" : ""; 
      var thumbnail = ImageExplorer.tile_image_path + value.id + "/" + zoom_level + "/0_0.jpg";
      var bullet = "<li><a href='#' class='slide-nav-item slide-" + index + active + "' data-select-slide='" + index + "' title='" + value.title + "'><img src='" + thumbnail + "' alt='" + value.title + "' /><span>" + value.title + "</span></a></li>";
      bullet_list += bullet;
    });
    jQuery(".slide-selector").html(bullet_list);
  },


  create_seadragon_object: function(dzt_directory_array) {

    var seadragon_options = {
      id: "image-explorer",
      prefixUrl: "",
      showNavigator: true,
      preserveViewport: true,
      // debugMode: true, // comment out or remove when done testing
      tileSources: ImageExplorer.get_tile_sources(dzt_directory_array),
    };

    return OpenSeadragon(seadragon_options);
  },


  get_tile_sources: function(dzt_directory_array) {

    var tile_sources = [];

    // loop through full list of dzt_directory_array
    // and create the list of tiles sources (each image layer)
    // for openseadragon object
    jQuery.each(dzt_directory_array, function(index, value) {
      var tile_set = {
        Image: {
          xmlns:    "http://schemas.microsoft.com/deepzoom/2008",
          Url:      "" + value.id + "/",
          Format:   "jpg", 
          Overlap:  "0", 
          TileSize: "512",
          Size: {
              Height: "3000",
              Width:  "2000"
          }
        }
      }
      tile_sources.push(tile_set);
    });

    return tile_sources;
  },


  scroll_to_image_explorer: function() {
    setTimeout( function() {
      jQuery('html, body').animate({
        scrollTop: jQuery('#image-explorer').offset().top
      }, 1000); 
    }, 500);
  },


  set_current_view: function(current_slide) {
    // remove all active-slide classes
    jQuery('.slide-selector li a').removeClass('active-slide');
    jQuery('.slide-selector .slide-'+current_slide).addClass('active-slide');
    jQuery('.image-explorer-title span').text(ImageExplorer.dzt_tile_subdirectory_array[current_slide].title);
    jQuery('.current-image-caption').html(ImageExplorer.dzt_tile_subdirectory_array[current_slide].caption);
  },

};

jQuery(document).ready(function() {
  var image_viewer = ImageExplorer.create_seadragon_object(ImageExplorer.dzt_tile_subdirectory_array);
  ImageExplorer.create_thumbnail_nav_html(ImageExplorer.dzt_tile_subdirectory_array, 8);
  jQuery("ul.slide-selector li a").click(function(e) {
    var slide = jQuery(this).data("select-slide"); 
    image_viewer.goToPage(slide);
    ImageExplorer.scroll_to_image_explorer();
    ImageExplorer.set_current_view(image_viewer.currentPage());
    e.preventDefault();
  });
});
