/*
 * jQuery Tooltip plugin 1.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 *
 * Copyright (c) 2006 Jörn Zaefferer, Stefan Petre
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.tooltip.js 2237 2007-07-04 19:11:15Z joern.zaefferer $
 *
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){n d={},l,f,u,O=$.29.1W&&/1S\\s(5\\.5|6\\.)/.1s(1o.28),F=16;$.p={q:16,13:{K:1I,V:U,M:"",t:15,w:15},1n:3(){$.p.q=!$.p.q}};$.Q.1f({p:3(a){a=$.1f({},$.p.13,a);1d();e 2.A(3(){2.8=a;2.N=2.f;$(2).1R("f");2.1Q=""}).1N(11,g).1J(g)},D:O?3(){e 2.A(3(){n b=$(2).m(\'I\');4(b.1z(/^k\\(["\']?(.*\\.1v)["\']?\\)$/i)){b=1t.$1;$(2).m({\'I\':\'1r\',\'S\':"1p:1m.1l.1k(1j=U, 27=24, 1g=\'"+b+"\')"}).A(3(){n a=$(2).m(\'1e\');4(a!=\'1X\'&&a!=\'1b\')$(2).m(\'1e\',\'1b\')})}})}:3(){e 2},1a:O?3(){e 2.A(3(){$(2).m({\'S\':\'\',I:\'\'})})}:3(){e 2},19:3(){e 2.A(3(){$(2)[$(2).z()?"j":"g"]()})},k:3(){e 2.1c(\'1V\')||2.1c(\'1g\')}});3 1d(){4(d.7)e;d.7=$(\'<o 1U="1T"><L></L><o 14="9"></o><o 14="k"></o></o>\').g().1P(\'9\');4($.Q.12)d.7.12();d.f=$(\'L\',d.7);d.9=$(\'o.9\',d.7);d.k=$(\'o.k\',d.7)}3 P(a){4(2.8.K)u=1M(j,2.8.K);B j();F=!!2.8.F;$(\'9\').1L(\'G\',r);r(a)}3 11(){4($.p.q||2==l||!2.N)e;l=2;f=2.N;4(2.8.Z){d.f.g();d.9.z(2.8.Z.1H(2)).j()}B 4(2.8.X){n a=f.1F(2.8.X);d.f.z(a.1E()).j();d.9.1C();1B(n i=0,H;H=a[i];i++){4(i>0)d.9.T("<1A/>");d.9.T(H)}d.9.19()}B{d.f.z(f).j();d.9.g()}4(2.8.V&&$(2).k())d.k.z($(2).k().1y(\'1D://\',\'\')).j();B d.k.g();d.7.1x(2.8.M);4(2.8.D)d.7.D();P.1w(2,1G)}3 j(){u=J;d.7.j();r()}3 r(c){4($.p.q)e;4(!F&&d.7.1u(":1K")){$(\'9\').W(\'G\',r)}4(l==J){$(\'9\').W(\'G\',r);e}n b=d.7[0].Y;n a=d.7[0].10;4(c){b=c.1q+l.8.w;a=c.1O+l.8.t;d.7.m({w:b+\'C\',t:a+\'C\'})}n v=R(),h=d.7[0];4(v.x+v.1i<h.Y+h.18){b-=h.18+20+l.8.w;d.7.m({w:b+\'C\'})}4(v.y+v.17<h.10+h.1h){a-=h.1h+20+l.8.t;d.7.m({t:a+\'C\'})}}3 R(){e{x:$(E).26(),y:$(E).25(),1i:$(E).23(),17:$(E).22()}}3 g(a){4($.p.q)e;4(u)21(u);l=J;d.7.g().1Z(2.8.M);4(2.8.D)d.7.1a()}})(1Y);',62,134,'||this|function|if|||parent|tSettings|body|||||return|title|hide|||show|url|current|css|var|div|Tooltip|blocked|update||top|tID||left|||html|each|else|px|fixPNG|window|track|mousemove|part|backgroundImage|null|delay|h3|extraClass|tooltipText|IE|handle|fn|viewport|filter|append|true|showURL|unbind|showBody|offsetLeft|bodyHandler|offsetTop|save|bgiframe|defaults|class||false|cy|offsetWidth|hideWhenEmpty|unfixPNG|relative|attr|createHelper|position|extend|src|offsetHeight|cx|enabled|AlphaImageLoader|Microsoft|DXImageTransform|block|navigator|progid|pageX|none|test|RegExp|is|png|apply|addClass|replace|match|br|for|empty|http|shift|split|arguments|call|200|click|visible|bind|setTimeout|hover|pageY|appendTo|alt|removeAttr|MSIE|tooltip|id|href|msie|absolute|jQuery|removeClass||clearTimeout|height|width|crop|scrollTop|scrollLeft|sizingMethod|userAgent|browser'.split('|'),0,{}))

// The tooltip plugin is included here so that it doesn't need to be a separate HTTP hit on each page.

// Set up the "more" link on artwork nodes.
$(document).ready(function() {
  $("#extended").hide();
  $("a.more").bind('click', function(event) {
    event.preventDefault();
    $("#abbrev").hide();
    $("#extended").show();
  });
  $("a.less").bind('click', function(event) {
    event.preventDefault();
    $("#abbrev").show();
    $("#extended").hide();
  });
});

// Set up the "morerelatedartworks" link on exhibition resource nodes.
$(document).ready(function() {
  $("#relatedArtworksMore").hide();
  $("a.morerelatedartworks").bind('click', function(event) {
    event.preventDefault();
    $("#relatedArtworksLess").hide();
    $("#relatedArtworksMore").show();
  });
  $("a.lessrelatedartworks").bind('click', function(event) {
    event.preventDefault();
    $("#relatedArtworksLess").show();
    $("#relatedArtworksMore").hide();
  });
});

// Set up the "moretombstone" link on homer artwork nodes.
/*
$(document).ready(function() {
  $("#extendedtombstone").hide();
  $("a.moretombstone").bind('click', function(event) {
    event.preventDefault();
    $("#abbrevtombstone").hide();
    $("#extendedtombstone").show();
  });
  $("a.lesstombstone").bind('click', function(event) {
    event.preventDefault();
    $("#abbrevtombstone").show();
    $("#extendedtombstone").hide();
  });
});
*/

// Set up the enlargement link modal popup.
$(document).ready(function() {

  if (Drupal.settings.citi && Drupal.settings.citi.enlargements) {
    $('.enlargement-link').each(function() {
      var href = $(this).attr('href');

      $('<div class="enlargement">')
  			.append($('<div class="banner">')
  							.append('<div class="close"><a href="scripts.js#" class="jqmClose">X</a></div>')
  							.append($('<div class="caption">')
  											.append('<div class="enlargement-artist">' + Drupal.settings.citi.enlargements[href].object_artist_culture_display + '</div>')
  											.append('<div class="enlargement-title-date"><em>' + Drupal.settings.citi.enlargements[href].object_title + '</em>, ' + Drupal.settings.citi.enlargements[href].object_date_display + '</div>')
												.append('<div class="enlargement-copyright">' + (Drupal.settings.citi.enlargements[href].object_copyright_notice || '') + '</div>')
  											)
  							)
  			.append('<img class="enlargement-image" src="http://www.artic.edu/aic/collections/sites/default/themes/aicexhibitionstheme/' + href + '" />')
  			.css({
          display: 'none',
          position: 'absolute',
          left: '40px'
        })
        .appendTo('body')
        .jqm({
          trigger: '.enlargement-link-' + Drupal.settings.citi.enlargements[href].object_id,
          overlay: 50,
					onShow: function(hash) {
            hash.w.fadeIn();
            hash.w.top(getTopPosition() + 'px');
          }
        });
    });
  }
});

// Set up the Zoomify modal popup.
$(document).ready(function() {

  // We want to exclude only Firefox on the Mac, because for some reason that one browser is buggy
  // and doesn't render this properly.
  if (!(/Mac/.test(navigator.platform) && /Firefox/.test(navigator.userAgent))) {
    $('<div class="zoomify enlargement"><div class="banner"><div class="close"><a href="scripts.js#" class="jqmClose">X</a></div><div class="zoom-image"></div></div>')
      .css({
        display: 'none',
        position: 'absolute',
        top: '100px',
        left: '100px',
        width: '400px',
        height: '400px'
      })
      .appendTo('body')
      .jqm({
        trigger: '.zoomify-link',
        overlay: 85,
        ajax: '@href',
        target: '.zoom-image'
      });
  }
});


// Set up the hoverify effect for thumbnail lists.  Note that this
// requies that there be a div of id hoverify-target already in the document.
$(document).ready(function() {
  $('.hoverify-link').hover(function() {
    var img = $(this).find('img');
    $('#hoverify-target').empty()
      .append($('<a>').attr('href', $(this).attr('href')).append($('<img>').attr('src', img.attr('src'))))
      .append($('<div>').append(img.attr('title')));
  }, function() { /* Do nothing on mouse-out */ });
});

// Set up the artwork hoverify.  This is more like enlargements than the resource hoverify because
// we're using separate images.
$(document).ready(function() {

  if (Drupal.settings.citi && Drupal.settings.citi.artwork_hoverify) {
    $('.artwork-hoverify-link').hover(function() {
      // Parse the artwork ID out of the URL.  Ick.
      var artworkId = $(this).attr('href').split('/').pop();
      var hoverifyInfo = Drupal.settings.citi.artwork_hoverify['artwork-' + artworkId];
      $('#hoverify-target').empty()
        .append($('<a>').attr('href', $(this).attr('href')).append($('<img>').attr('src',hoverifyInfo.hoverify_image)))
        .append(
          $('<div>').append(hoverifyInfo.object_title + '<br />' + hoverifyInfo.object_date_display)
        );

    }, function() { /* Do nothing on mouse-out */ });
  }
});

$(document).ready(function() {
  $('.event-hoverify-link')
    .hover(function() {
      $('#hoverify-target').load(Drupal.settings.base_path + 'exhibitions/event-component/' + $(this).attr('href').split('=').pop());
    }, function() { /* Do nothing on mouse-out */ })
    .bind('click', function(e) {
      // Just block the click event from firing, so we don't leave the site unless JS is disabled entirely.
      e.preventDefault();
    });
});

getTopPosition = function() {
	var arrayPageScroll = getPageScroll();
	var topPosition = 40;
	var modalTop = arrayPageScroll[1] + (topPosition == '' ? (arrayPageSize[3] / 10) : topPosition) * 1;
	return modalTop;
};

// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.com.
getPageScroll = function() {

	var xScroll, yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop) {  // Explorer 6 Strict.
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	}
	else if (document.body) {// All other Explorers.
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;
	}

	arrayPageScroll = [xScroll,yScroll];
	return arrayPageScroll;
},

// getPageSize()
// Returns array with page width, height and window width, height.
// Core code from - quirksmode.com.
// Edit for Firefox by pHaez.
getPageSize = function() {

	var xScroll, yScroll;

	if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	}
	else if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	}
	// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari.
	else {
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;

	if (self.innerHeight) { // All except Explorer.
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		}
		else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	}
	// Explorer 6 Strict Mode.
	else if (document.documentElement && document.documentElement.clientHeight) {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	}
	else if (document.body) { // Other Explorers.
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}


	// For small pages with total height less then height of the viewport.
	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	}
	else {
		pageHeight = yScroll;
	}


	// For small pages with total width less then width of the viewport.
	if (xScroll < windowWidth) {
		pageWidth = windowWidth;
	}
	else {
		pageWidth = xScroll;
	}

	arrayPageSize = [pageWidth, pageHeight, windowWidth, windowHeight];
	return arrayPageSize;
}
