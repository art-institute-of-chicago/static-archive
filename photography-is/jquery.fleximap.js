(function( $ ) {

  var methods = {
    init : function(mapdata, callback) {
      // attach json to container object for use
      // by fleximap methods after init
      var container = this;
      container.data('fleximap-data', mapdata);
      // default to 'fleximap' for id and class names
      if(getId(container) === undefined) {
        setData(container, 'identifier', 'fleximap');
      }
      mapGenerate(container);
      $('#' + getId(container)).load(function() {
        // order matters
        mapSize(container);
        areasGenerate(container);
        assignAreaData(container);
        areasSize(container);
        overlayAlign(container);
        assignListeners(container);
      }); 
      mapLoad(this);
      this.data('fleximap-init', true);
      // callback
      if(typeof callback == 'function') {
        return callback.call(this);
      } else {
        return this;
      }
    },
    debug : function(toggle) {
      // debug enable highlighting here
      if(toggle !== false && toggle !== 0) {
        $('.' + getId(this) + '-overlay').css({'opacity' : 1, 'background-color' : '#F09'});
      } else {
        $('.' + getId(this) + '-overlay').css({'opacity' : 0, 'background-color' : 'none'});
      }
      return this;
    },
    resize : function(width, height) {
      mapSize(this, width, height);
      overlayAlign(this);
      return this;
    }
  };

  $.fn.flexiMap = function(method) {
    // routing method calls
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
    } else if (typeof method === 'object' || !method) {
      // default to init, but check if already called
      if(!this.data('fleximap-init')) {
        return methods.init.apply(this, arguments);
      } else {
        $.error('FlexiMap already initialized.');
      }
    } else {
      $.error('Method ' +  method + ' does not exist.');
    }
  }

  // helpers

  function assignAreaData(container) {
    // attributes cascade with following heirarchy
    // - area attribute
    // - group attribute
    // - map attribute

    var datakeys = {
      "width"   : "mapwidth",
      "height"  : "mapheight",
      "left"    : "mapwidth",
      "top"     : "mapheight",
      "group"   : ""
    }

    $.each(getData(container, 'areas'), function(k,v) {
      if(k !== '') {
        var tmptarget = $('#' + getId(container) + '-area-' + k);
        $.each(datakeys, function(key,rel) {
          // handle cascading inheritance and empty values
          if(typeof v[key] !== 'undefined' && v[key] !== '') {
            var value = v[key];
          } else if(v['group'] && getData(container, 'groups') && getData(container, 'groups')[v['group']] && getData(container, 'groups')[v['group']][key]) {
            var value = getData(container, 'groups')[v['group']][key];
          } else if(typeof getData(container, 'key') !== 'undefined' && getData(container, 'key') !== '') {
            var value = getData(container, 'key');
          } else {
            var value = undefined;
            // if no value, don't log a value
          }
          if(typeof value !== 'undefined') {
            if(value.indexOf('px') !== -1) {
              value = (parseInt(value) / parseInt(getData(container, rel)) * 100) + '%';
            }
            tmptarget.data(key,value);
          }
        });

        // "data" item is a special case
        if(typeof v['data'] !== 'undefined') {
          $.each(v['data'], function(x,y) {
            tmptarget.data(x,y);
          });
        } 
        if(v['group'] && getData(container, 'groups') && getData(container, 'groups')[v['group']] && getData(container, 'groups')[v['group']]['data']) {
          $.each(getData(container, 'groups')[v['group']]['data'], function(x,y) {
            tmptarget.data(x,y);
          });
        }
      }
    });

  }

  function assignListeners(container) {
    $.each(getData(container, 'areas'), function(k,v) {

      var eventarr = {};
      $.each(['hoverin', 'hoverout', 'click'], function(key, event) {
        if(typeof v[event] !== 'undefined') {
          eventarr[event] = v[event];
        } else if(v['group'] && getData(container, 'groups') && getData(container, 'groups')[v['group']] && getData(container, 'groups')[v['group']][event]) {
          eventarr[event] = getData(container, 'groups')[v['group']][event];
        } else if(typeof getData(container, event) !== 'undefined') {
          eventarr[event] = getData(container, event);
        }
        if(eventarr[event] && eventarr[event].slice(-1) !== ';') {
          eventarr[event] = eventarr[event] + ';';
        }
      });

      if(typeof eventarr['click'] !== 'undefined') {
        $('#' + getId(container) + '-area-' + k).click(function() {
          eval(eventarr['click']);
        });
      }

      if(typeof eventarr['hoverin'] !== 'undefined') {
        $('#' + getId(container) + '-area-' + k).mouseenter(function() {
          eval(eventarr['hoverin']);
        });
      }

      if(typeof eventarr['hoverout'] !== 'undefined') {
        $('#' + getId(container) + '-area-' + k).mouseleave(function() {
          eval(eventarr['hoverout']);
        });
      }

    });
  }

  function mapGenerate(container) {
    container.html("<div id='" + getId(container) + "-container'><img src='' id='" + getId(container) + "' style='max-width:none;width:100%;position:absolute;top:0;left:0;'/></div>");
  }

  function mapLoad(container) {
    $('#' + getId(container)).attr('src', getData(container, 'map'));
  }

  // if not all arguments provided mapSize will auto-size
  // based on the containing object
  function mapSize(container, width, height) {
    var mapwidth, mapheight;

    if(width !== undefined && height !== undefined) {
      mapwidth = width;
    } else {
      mapwidth = container.width();
    }
    $('#' + getId(container)).css('width', mapwidth);

    // repeat test because height can depend on
    // width being set as above
    if(width !== undefined && height !== undefined) {
      mapheight = height;
    } else {
      mapheight = $('#' + getId(container)).height();
    }
    $('#' + getId(container)).css('height', mapheight);

    $('#' + getId(container) + '-container').css({'width': mapwidth, 'height' : mapheight});
  }

  function areasGenerate(container) {
    if(typeof getData(container, 'areas') !== 'undefined') {
      var cid = getId(container);

      $.each(getData(container, 'areas'), function(k,v) {
        ohtml = "\n \
          <div id='" + cid + "-area-" + k + "' class='" + cid + "-area' style='position:absolute;overflow:hidden;'> \
            <img src='" + getData(container, 'overlay') + "' onmouseover='javascript:$(this).css(\"opacity\", 1);' onmouseout='javascript:$(this).css(\"opacity\", 0);' class='" + cid + "-overlay' style='max-width:none;position:relative;opacity:0;'/> \
          </div>";
        $('#' + cid + '-container').append(ohtml);
      });
    }
  }

  function areasSize(container) {
    $.each($('.' + getId(container) + '-area'), function() {
      newStyles = {
        "width"   : $(this).data('width'),
        "height"  : $(this).data('height'),
        "left"    : $(this).data('left'),
        "top"     : $(this).data('top')
      }
      combineOldNewStyles($(this), newStyles);
    });
  }

  function overlayAlign(container) {
    var mapwidth, mapheight;
    mapwidth = $('#' + getId(container)).width();
    mapheight = $('#' + getId(container)).height();
    $('.' + getId(container) + '-overlay').css('width', mapwidth);
    $.each($('.' + getId(container) + '-area'), function() {
      var vtop = (mapheight * (parseFloat($(this).data('top')) * -0.01)) + 'px';
      var vleft = (mapwidth * (parseFloat($(this).data('left')) * -0.01)) + 'px';
      $(this).children('.' + getId(container) + '-overlay').css({'top' : vtop, 'left' : vleft});
    });
  }

  function objectifyStyleString(styleString) {
    var individualStyles, separateStyles = [], styleObject;
    individualStyles = styleString.split(';');
    for(var i = 0; i < individualStyles.length; i++) {
      separateStyles[i] = individualStyles[i].split(':');
    }
    for(var j = 0; j < separateStyles.length; j++) {
      if(key !== undefined) {
        var key = $.trim(separateStyles[j][0]);
        var value = $.trim(separateStyles[j][1]);
        styleObject[key] = value;
      }
    }
    return styleObject;
  }

  function combineOldNewStyles(element, newStyles) {
    // add old variables to new, erring on new for dupes
    oldStyles = objectifyStyleString(element.attr('style'));
    for(var styleName in oldStyles) {
      if(newStyles[styleName] === undefined) {
        newStyles[styleName] = oldStyles[styleName];
      }
    }
    element.css(newStyles);
  }

  function getData(container, key) {
    var data = container.data('fleximap-data');
    return data[key];
  }

  function setData(container, key, value) {
    var data = container.data('fleximap-data');
    data[key] = value;
    container.data('fleximap-data', data);
  }

  function getId(container) {
    return getData(container, 'identifier');
  }

})( jQuery );
