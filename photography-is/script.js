var ModernRiot = {

  data_complete: ko.observableArray([]),

  search_term: ko.observable(''),

  map_initialized: false,

  map_position: ko.observable(0),

  map_click_increment: 250,

  map_hover_increment: 45,

  hover_interval_id: null,

  current_page: ko.observable(1),

  items_per_page: 999,


  Router: Backbone.Router.extend({

    routes: {
      "map":                 "activate_map",
      "list":                "activate_list",
      "*path":               "activate_map"
    },

    activate_map: function() {
      $('#riot-of-modernism-list').removeClass('show').addClass('hide');
      $('#riot-of-modernism-map-supercontainer').removeClass('hide').addClass('show');
      $('.map-link').addClass('disabled');
      $('.list-link').removeClass('disabled');
      if(!ModernRiot.map_initialized) {
        ModernRiot.initialize_map();
      }
    },

    activate_list: function() {
      $('#riot-of-modernism-map-supercontainer').removeClass('show').addClass('hide');
      $('#riot-of-modernism-list').removeClass('hide').addClass('show');
      $('.list-link').addClass('disabled');
      $('.map-link').removeClass('disabled');
      ModernRiot.list_sort_reference();
    }

  }),


  initialize: function() {

    // data stored in ModernRiotData (riot-of-modernism-data.js)

    // remap areas data for easier use w knockout
    _.each(ModernRiotData.areas, function(v, k) {
      v.key = k;
      ModernRiot.data_complete.push(v);
    });

    ko.applyBindings(ModernRiot.data_complete);

    var router = new ModernRiot.Router();
    Backbone.history.start();

  },


  initialize_map: function() {

    // initialize fleximap and related
    $("#riot-of-modernism-image-map").flexiMap(ModernRiotData, function() {
      setupTooltips("#riot-of-modernism-image-map");
    });

    createAllModals(ModernRiotData);

    $(window).resize(function() {
      $('#riot-of-modernism-image-map').flexiMap('resize');
    });

    ModernRiot.map_initialized = true;

  },


  scroll_map_left: function(increment) {
    var new_pos = ModernRiot.map_position() - increment;
    if(new_pos >= 0) {
      ModernRiot.map_position(new_pos);
    } else {
      ModernRiot.map_position(0);
      ModernRiot.stop_hover();
    }
    console.log("SCROLL LEFT: " + new_pos + " | " + ModernRiot.map_position());
  },


  scroll_map_right: function(increment) {
    var new_pos = ModernRiot.map_position() + increment,
        map_width = ModernRiotData.mapwidth.match(/[0-9]*[^px]/),
        last_pos = map_width - $('#riot-of-modernism-map-mask').width();
    if(new_pos < last_pos) {
      ModernRiot.map_position(new_pos);
    } else {
      ModernRiot.map_position(last_pos);
      ModernRiot.stop_hover();
    }
    console.log("SCROLL RIGHT: " + new_pos + " | " + ModernRiot.map_position());
  },


  click_map_left: function() {
    ModernRiot.scroll_map_left(ModernRiot.map_click_increment);
  },


  click_map_right: function() {
    ModernRiot.scroll_map_right(ModernRiot.map_click_increment);
  },


  hover_map_left: function() {
    ModernRiot.hover_interval_id = window.setInterval(function() {
      ModernRiot.scroll_map_left(ModernRiot.map_hover_increment);
    }, 150);
  },


  hover_map_right: function() {
    ModernRiot.hover_interval_id = window.setInterval(function() {
      ModernRiot.scroll_map_right(ModernRiot.map_hover_increment);
    }, 150);
  },


  stop_hover: function() {
    window.clearInterval(ModernRiot.hover_interval_id);
  },


  list_sort: function(property, type_conversion) {
    var sorted = _.sortBy(ModernRiot.data_complete(), function(o) {
      var p = o.data[property];
      if(typeof type_conversion !== 'undefined') {
        return type_conversion.call(this, p);
      } else {
        return p;
      }
    });
    ModernRiot.data_complete(sorted);
    $('.sort-by-container a').removeClass('disabled');
  },


  list_sort_artist: function() {
    ModernRiot.list_sort('artist');
    $('.sort-artist-link').addClass('disabled');
  },


  list_sort_title: function() {
    ModernRiot.list_sort('title');
    $('.sort-title-link').addClass('disabled');
  },


  list_sort_reference: function() {
    ModernRiot.list_sort('reference', parseInt);
    $('.sort-ref-link').addClass('disabled');
  }


};


// ko.computed definitions have to be made outside the singleton object, cause javascript
ModernRiot.data_filtered = ko.computed(function() {
  var term = ModernRiot.search_term(),
      matches = ModernRiot.data_complete().filter(function(i) {
        var searchable_text = [i.data.artist, 
                               i.data.period, 
                               i.data.title, 
                               i.data.date,
                               i.data.reference,
                               i.data.medium].join(' ').toLowerCase(),
            lowercase_term = term.toLowerCase();
        return searchable_text.indexOf(lowercase_term) > -1;
      });
  return matches;
});


// ko.computed definitions have to be made outside the singleton object, cause javascript
ModernRiot.total_pages = ko.computed(function() {
  return Math.ceil(ModernRiot.data_filtered().length / ModernRiot.items_per_page);
});


// ko.computed definitions have to be made outside the singleton object, cause javascript
ModernRiot.current_page_data = ko.computed(function() {
  var start = (ModernRiot.current_page() - 1) * ModernRiot.items_per_page,
      end   = start + ModernRiot.items_per_page + 1;
  return ModernRiot.data_filtered().slice(start, end);
});


$(document).ready(function() {
  ModernRiot.initialize();
});
