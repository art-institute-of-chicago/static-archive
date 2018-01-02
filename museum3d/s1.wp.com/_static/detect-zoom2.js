/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("factory", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //Mobile Webkit
        else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
            func = webkitMobile;
        }
        //WebKit
        else if (typeof document.body.style.webkitMarquee === 'string') {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

var wpcom_img_zoomer = {
        clientHintSupport: {
                gravatar: false,
                files: false,
                photon: false,
                mshots: false,
                staticAssets: false,
                latex: false,
                imgpress: false,
        },
	useHints: false,
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

        hintsFor: function( service ) {
                if ( this.useHints === false ) {
                        return false;
                }
                if ( this.hints() === false ) {
                        return false;
                }
                if ( typeof this.clientHintSupport[service] === "undefined" ) {
                        return false;
                }
                if ( this.clientHintSupport[service] === true ) {
                        return true;
                }
                return false;
        },

	hints: function() {
		try {
			var chrome = window.navigator.userAgent.match(/\sChrome\/([0-9]+)\.[.0-9]+\s/)
			if (chrome !== null) {
				var version = parseInt(chrome[1], 10)
				if (isNaN(version) === false && version >= 46) {
					return true
				}
			}
		} catch (e) {
			return false
		}
		return false
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = detectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Wait for original images to load
			if ( "complete" in imgs[i] && ! imgs[i].complete )
				continue;

			// Skip images that have srcset attributes.
			if ( imgs[i].hasAttribute('srcset') ) {
				continue;
			}

			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			// Skip images from Lazy Load plugins
			if ( ! imgScale && imgs[i].getAttribute("data-lazy-src") && (imgs[i].getAttribute("data-lazy-src") !== imgs[i].getAttribute("src")))
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

                var isFiles = false;
                var isLatex = false;
                var isPhoton = false;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
                        if ( this.hintsFor( "gravatar" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
                        if ( this.hintsFor( "mshots" ) === true ) {
                                return false;
                        }
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});

			// Update height attribute to match width
			newSrc = newSrc.replace( /([?&]h=)(\d+)/, function($0, $1, $2) {
				if ( newSrc == img.src ) {
					return $0;
				}
				// Stash the original size
				var originalAtt = 'originalh', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
				}
				// Get the height of the image in CSS pixels
				var size = img.clientHeight;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalHeight )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
				return $0;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
                        if ( this.hintsFor( "imgpress" ) === true ) {
                                return false; 
                        }
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale files.wordpress.com, LaTeX, or Photon images (i#.wp.com)
		else if (
			( isFiles = img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/) ) ||
			( isLatex = img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) ||
			( isPhoton = img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/) )
		) {
                        if ( false !== isFiles && this.hintsFor( "files" ) === true ) {
                                return false
                        }
                        if ( false !== isLatex && this.hintsFor( "latex" ) === true ) {
                                return false
                        }
                        if ( false !== isPhoton && this.hintsFor( "photon" ) === true ) {
                                return false
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 ) {
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			} else {
				newSrc = img.src;

				var url_var = newSrc.match( /([?&]w=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.width );
				}

				url_var = newSrc.match( /([?&]h=)(\d+)/ );
				if ( url_var !== null && url_var[2] ) {
					newSrc = newSrc.replace( url_var[0], url_var[1] + img.height );
				}

				var zoom_arg = '&zoom=2';
				if ( !newSrc.match( /\?/ ) ) {
					zoom_arg = '?zoom=2';
				}
				img.setAttribute( 'srcset', newSrc + zoom_arg + ' ' + scale + 'x' );
			}
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
                        if ( this.hintsFor( "staticAssets" ) === true ) {
                                return false; 
                        }
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			prevSrc = img.src;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/* global pm, wpcom_reblog */

var jetpackLikesWidgetQueue = [];
var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = false;

function JetpackLikespostMessage( message, target ) {
	if ( 'string' === typeof message ){
		try {
			message = JSON.parse( message );
		} catch(e) {
			return;
		}
	}

	pm( {
		target: target,
		type: 'likesMessage',
		data: message,
		origin: '*'
	} );
}

function JetpackLikesBatchHandler() {
	var requests = [];
	jQuery( 'div.jetpack-likes-widget-unloaded' ).each( function() {
		if ( jetpackLikesWidgetBatch.indexOf( this.id ) > -1 ) {
			return;
		}
		jetpackLikesWidgetBatch.push( this.id );
		var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
			match = regex.exec( this.id ),
			info;

		if ( ! match || match.length !== 5 ) {
			return;
		}

		info = {
			blog_id: match[2],
			width:   this.width
		};

		if ( 'post' === match[1] ) {
			info.post_id = match[3];
		} else if ( 'comment' === match[1] ) {
			info.comment_id = match[3];
		}

		info.obj_id = match[4];

		requests.push( info );
	});

	if ( requests.length > 0 ) {
		JetpackLikespostMessage( { event: 'initialBatch', requests: requests }, window.frames['likes-master'] );
	}
}

function JetpackLikesMessageListener( event, message ) {
	var allowedOrigin, $container, $list, offset, rowLength, height, scrollbarWidth;

	if ( 'undefined' === typeof event.event ) {
		return;
	}

	// We only allow messages from one origin
	allowedOrigin = window.location.protocol + '//widgets.wp.com';
	if ( allowedOrigin !== message.origin ) {
		return;
	}

	if ( 'masterReady' === event.event ) {
		jQuery( document ).ready( function() {
			jetpackLikesMasterReady = true;

			var stylesData = {
					event: 'injectStyles'
				},
				$sdTextColor = jQuery( '.sd-text-color' ),
				$sdLinkColor = jQuery( '.sd-link-color' );

			if ( jQuery( 'iframe.admin-bar-likes-widget' ).length > 0 ) {
				JetpackLikespostMessage( { event: 'adminBarEnabled' }, window.frames[ 'likes-master' ] );

				stylesData.adminBarStyles = {
					background: jQuery( '#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a' ).css( 'background' ),
					isRtl: ( 'rtl' === jQuery( '#wpadminbar' ).css( 'direction' ) )
				};
			}

			if ( ! window.addEventListener ) {
				jQuery( '#wp-admin-bar-admin-bar-likes-widget' ).hide();
			}

			stylesData.textStyles = {
				color:          $sdTextColor.css( 'color' ),
				fontFamily:     $sdTextColor.css( 'font-family' ),
				fontSize:       $sdTextColor.css( 'font-size' ),
				direction:      $sdTextColor.css( 'direction' ),
				fontWeight:     $sdTextColor.css( 'font-weight' ),
				fontStyle:      $sdTextColor.css( 'font-style' ),
				textDecoration: $sdTextColor.css('text-decoration')
			};

			stylesData.linkStyles = {
				color:          $sdLinkColor.css('color'),
				fontFamily:     $sdLinkColor.css('font-family'),
				fontSize:       $sdLinkColor.css('font-size'),
				textDecoration: $sdLinkColor.css('text-decoration'),
				fontWeight:     $sdLinkColor.css( 'font-weight' ),
				fontStyle:      $sdLinkColor.css( 'font-style' )
			};

			JetpackLikespostMessage( stylesData, window.frames[ 'likes-master' ] );

			JetpackLikesBatchHandler();

			jQuery( document ).on( 'inview', 'div.jetpack-likes-widget-unloaded', function() {
				jetpackLikesWidgetQueue.push( this.id );
			});
		});
	}

	if ( 'showLikeWidget' === event.event ) {
		jQuery( '#' + event.id + ' .post-likes-widget-placeholder'  ).fadeOut( 'fast', function() {
			jQuery( '#' + event.id + ' .post-likes-widget' ).fadeIn( 'fast', function() {
				JetpackLikespostMessage( { event: 'likeWidgetDisplayed', blog_id: event.blog_id, post_id: event.post_id, obj_id: event.obj_id }, window.frames['likes-master'] );
			});
		});
	}

	if ( 'clickReblogFlair' === event.event ) {
		wpcom_reblog.toggle_reblog_box_flair( event.obj_id );
	}

	if ( 'showOtherGravatars' === event.event ) {
		$container = jQuery( '#likes-other-gravatars' );
		$list = $container.find( 'ul' );

		$container.hide();
		$list.html( '' );

		$container.find( '.likes-text span' ).text( event.total );

		jQuery.each( event.likers, function( i, liker ) {
			var element = jQuery( '<li><a><img /></a></li>' );
			element.addClass( liker.css_class );

			element.find( 'a' ).
				attr({
					href: liker.profile_URL,
					rel: 'nofollow',
					target: '_parent'
				}).
				addClass( 'wpl-liker' );

			element.find( 'img' ).
				attr({
					src: liker.avatar_URL,
					alt: liker.name
				}).
				css({
					width: '30px',
					height: '30px',
					paddingRight: '3px'
				});

			$list.append( element );
		} );

		offset = jQuery( '[name=\'' + event.parent + '\']' ).offset();

		$container.css( 'left', offset.left + event.position.left - 10 + 'px' );
		$container.css( 'top', offset.top + event.position.top - 33 + 'px' );

		rowLength = Math.floor( event.width / 37 );
		height = ( Math.ceil( event.likers.length / rowLength ) * 37 ) + 13;
		if ( height > 204 ) {
			height = 204;
		}

		$container.css( 'height', height + 'px' );
		$container.css( 'width', rowLength * 37 - 7 + 'px' );

		$list.css( 'width', rowLength * 37 + 'px' );

		$container.fadeIn( 'slow' );

		scrollbarWidth = $list[0].offsetWidth - $list[0].clientWidth;
		if ( scrollbarWidth > 0 ) {
			$container.width( $container.width() + scrollbarWidth );
			$list.width( $list.width() + scrollbarWidth );
		}
	}
}

pm.bind( 'likesMessage', JetpackLikesMessageListener );

jQuery( document ).click( function( e ) {
	var $container = jQuery( '#likes-other-gravatars' );

	if ( $container.has( e.target ).length === 0 ) {
		$container.fadeOut( 'slow' );
	}
});

function JetpackLikesWidgetQueueHandler() {
	var $wrapper, wrapperID, found;
	if ( ! jetpackLikesMasterReady ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	if ( jetpackLikesWidgetQueue.length > 0 ) {
		// We may have a widget that needs creating now
		found = false;
		while( jetpackLikesWidgetQueue.length > 0 ) {
			// Grab the first member of the queue that isn't already loading.
			wrapperID = jetpackLikesWidgetQueue.splice( 0, 1 )[0];
			if ( jQuery( '#' + wrapperID ).hasClass( 'jetpack-likes-widget-unloaded' ) ) {
				found = true;
				break;
			}
		}
		if ( ! found ) {
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	} else if ( jQuery( 'div.jetpack-likes-widget-unloaded' ).length > 0 ) {
		// Grab any unloaded widgets for a batch request
		JetpackLikesBatchHandler();

		// Get the next unloaded widget
		wrapperID = jQuery( 'div.jetpack-likes-widget-unloaded' ).first()[0].id;
		if ( ! wrapperID ) {
			// Everything is currently loaded
			setTimeout( JetpackLikesWidgetQueueHandler, 500 );
			return;
		}
	}

	if ( 'undefined' === typeof wrapperID ) {
		setTimeout( JetpackLikesWidgetQueueHandler, 500 );
		return;
	}

	$wrapper = jQuery( '#' + wrapperID );
	$wrapper.find( 'iframe' ).remove();

	if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="22px" width="68px" frameBorder="0" scrolling="no" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	} else {
		$wrapper.find( '.post-likes-widget-placeholder' ).after( '<iframe class="post-likes-widget jetpack-likes-widget" name="' + $wrapper.data( 'name' ) + '" height="55px" width="100%" frameBorder="0" src="' + $wrapper.data( 'src' ) + '"></iframe>' );
	}

	$wrapper.removeClass( 'jetpack-likes-widget-unloaded' ).addClass( 'jetpack-likes-widget-loading' );

	$wrapper.find( 'iframe' ).load( function( e ) {
		var $iframe = jQuery( e.target );
		$wrapper.removeClass( 'jetpack-likes-widget-loading' ).addClass( 'jetpack-likes-widget-loaded' );

		JetpackLikespostMessage( { event: 'loadLikeWidget', name: $iframe.attr( 'name' ), width: $iframe.width() }, window.frames[ 'likes-master' ] );

		if ( $wrapper.hasClass( 'slim-likes-widget' ) ) {
			$wrapper.find( 'iframe' ).Jetpack( 'resizeable' );
		}
	});
	setTimeout( JetpackLikesWidgetQueueHandler, 250 );
}
JetpackLikesWidgetQueueHandler();
;
/*! responsive-nav.js v1.0.14
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/* jshint strict:false, forin:false, noarg:true, noempty:true, eqeqeq:true,
boss:true, bitwise:true, browser:true, devel:true, indent:2 */
/* exported responsiveNav */

var responsiveNav = (function (window, document) {

  var computed = !!window.getComputedStyle;

  // getComputedStyle polyfill
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(el) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop === "float") {
          prop = "styleFloat";
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      };
      return this;
    };
  }

  var nav,
    opts,
    navToggle,
    docEl = document.documentElement,
    head = document.getElementsByTagName("head")[0],
    styleElement = document.createElement("style"),
    navOpen = false,

    // fn arg can be an object or a function, thanks to handleEvent
    // read more at: http://www.thecssninja.com/javascript/handleevent
    addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },

    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    },

    getFirstChild = function (e) {
      var firstChild = e.firstChild;
      // skip TextNodes
      while (firstChild !== null && firstChild.nodeType !== 1) {
        firstChild = firstChild.nextSibling;
      }
      return firstChild;
    },

    setAttributes = function (el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },

    addClass = function (el, cls) {
      el.className += " " + cls;
      el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
    },

    removeClass = function (el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    },

    ResponsiveNav = function (el, options) {
      var i;

      // Default options
      this.options = {
        animate: true,        // Boolean: Use CSS3 transitions, true or false
        transition: 400,      // Integer: Speed of the transition, in milliseconds
        label: "Menu",        // String: Label for the navigation toggle
        insert: "after",      // String: Insert the toggle before or after the navigation
        customToggle: "",     // Selector: Specify the ID of a custom toggle
        openPos: "relative",  // String: Position of the opened nav, relative or static
        jsClass: "js",        // String: 'JS enabled' class which is added to <html> el
        init: function(){},   // Function: Init callback
        open: function(){},   // Function: Open callback
        close: function(){}   // Function: Close callback
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      // Adds "js" class for <html>
      addClass(docEl, this.options.jsClass);

      // Wrapper
      this.wrapperEl = el.replace("#", "");
      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);
      } else {
        // If el doesn't exists, stop here.
        throw new Error("The nav element you are trying to select doesn't exist");
      }

      // Inner wrapper
      this.wrapper.inner = getFirstChild(this.wrapper);

      // For minification
      opts = this.options;
      nav = this.wrapper;

      // Init
      this._init(this);
    };

  ResponsiveNav.prototype = {
    // Public methods
    destroy: function () {
      this._removeStyles();
      removeClass(nav, "closed");
      removeClass(nav, "opened");
      nav.removeAttribute("style");
      nav.removeAttribute("aria-hidden");
      nav = null;
      _instance = null;

      removeEvent(window, "load", this, false);
      removeEvent(window, "resize", this, false);
      removeEvent(navToggle, "mousedown", this, false);
      removeEvent(navToggle, "touchstart", this, false);
      removeEvent(navToggle, "touchend", this, false);
      removeEvent(navToggle, "keyup", this, false);
      removeEvent(navToggle, "click", this, false);

      if (!opts.customToggle) {
        navToggle.parentNode.removeChild(navToggle);
      } else {
        navToggle.removeAttribute("aria-hidden");
      }
    },

    toggle: function () {
      if (!navOpen) {
        removeClass(nav, "closed");
        addClass(nav, "opened");
        nav.style.position = opts.openPos;
        setAttributes(nav, {"aria-hidden": "false"});

        navOpen = true;
        opts.open();
      } else {
        removeClass(nav, "opened");
        addClass(nav, "closed");
        setAttributes(nav, {"aria-hidden": "true"});

        if (opts.animate) {
          setTimeout(function () {
            nav.style.position = "absolute";
          }, opts.transition + 10);
        } else {
          nav.style.position = "absolute";
        }

        navOpen = false;
        opts.close();
      }
    },

    handleEvent: function (e) {
      var evt = e || window.event;

      switch (evt.type) {
      case "mousedown":
        this._onmousedown(evt);
        break;
      case "touchstart":
        this._ontouchstart(evt);
        break;
      case "touchend":
        this._ontouchend(evt);
        break;
      case "keyup":
        this._onkeyup(evt);
        break;
      case "click":
        this._onclick(evt);
        break;
      case "load":
        this._transitions(evt);
        this._resize(evt);
        break;
      case "resize":
        this._resize(evt);
        break;
      }
    },

    // Private methods
    _init: function () {
      addClass(nav, "closed");
      this._createToggle();

      addEvent(window, "load", this, false);
      addEvent(window, "resize", this, false);
      addEvent(navToggle, "mousedown", this, false);
      addEvent(navToggle, "touchstart", this, false);
      addEvent(navToggle, "touchend", this, false);
      addEvent(navToggle, "keyup", this, false);
      addEvent(navToggle, "click", this, false);
    },

    _createStyles: function () {
      if (!styleElement.parentNode) {
        head.appendChild(styleElement);
      }
    },

    _removeStyles: function () {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    },

    _createToggle: function () {
      if (!opts.customToggle) {
        var toggle = document.createElement("a");
        toggle.innerHTML = opts.label;
        setAttributes(toggle, {
          "href": "#",
          "id": "nav-toggle"
        });

        if (opts.insert === "after") {
          nav.parentNode.insertBefore(toggle, nav.nextSibling);
        } else {
          nav.parentNode.insertBefore(toggle, nav);
        }

        navToggle = document.getElementById("nav-toggle");
      } else {
        var toggleEl = opts.customToggle.replace("#", "");

        if (document.getElementById(toggleEl)) {
          navToggle = document.getElementById(toggleEl);
        } else {
          throw new Error("The custom nav toggle you are trying to select doesn't exist");
        }
      }
    },

    _preventDefault: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.returnValue = false;
      }
    },

    _onmousedown: function (e) {
      var evt = e || window.event;
      // If the user isn't right clicking:
      if (!(evt.which === 3 || evt.button === 2)) {
        this._preventDefault(e);
        this.toggle(e);
      }
    },

    _ontouchstart: function (e) {
      // Touchstart event fires before
      // the mousedown and can wipe it
      navToggle.onmousedown = null;
      this._preventDefault(e);
      this.toggle(e);
    },

    _ontouchend: function () {
      // Prevents ghost click from happening on some Android browsers
      var that = this;
      nav.addEventListener("click", that._preventDefault, true);
      setTimeout(function () {
        nav.removeEventListener("click", that._preventDefault, true);
      }, opts.transition);
    },

    _onkeyup: function (e) {
      var evt = e || window.event;
      if (evt.keyCode === 13) {
        this.toggle(e);
      }
    },

    _onclick: function (e) {
      // For older browsers (looking at IE)
      this._preventDefault(e);
    },

    _transitions: function () {
      if (opts.animate) {
        var objStyle = nav.style,
          transition = "max-height " + opts.transition + "ms";

        objStyle.WebkitTransition = transition;
        objStyle.MozTransition = transition;
        objStyle.OTransition = transition;
        objStyle.transition = transition;
      }
    },

    _calcHeight: function () {
      var savedHeight = nav.inner.offsetHeight,
        innerStyles = "#" + this.wrapperEl + ".opened{max-height:" + savedHeight + "px}";

      // Hide from old IE
      if (computed) {
        styleElement.innerHTML = innerStyles;
        innerStyles = "";
      }
    },

    _resize: function () {
      if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
        setAttributes(navToggle, {"aria-hidden": "false"});

        // If the navigation is hidden
        if (nav.className.match(/(^|\s)closed(\s|$)/)) {
          setAttributes(nav, {"aria-hidden": "true"});
          nav.style.position = "absolute";
        }

        this._createStyles();
        this._calcHeight();
      } else {
        setAttributes(navToggle, {"aria-hidden": "true"});
        setAttributes(nav, {"aria-hidden": "false"});
        nav.style.position = opts.openPos;
        this._removeStyles();
      }

      // Init callback
      opts.init();
    }

  };

  var _instance;
  function rn (el, options) {
    if (!_instance) {
      _instance = new ResponsiveNav(el, options);
    }
    return _instance;
  }

  return rn;
})(window, document);
;
/**
 * Add Immediately-Invoked Function Expression that initiates all of the general purpose theme JS.
 *
 * @since  1.0.
 *
 * @param  object    window    The window object.
 * @param  object    $         The jQuery object.
 * @return void
 */

(function ( window, $ ) {
	// Cache document for fast access.
	var document = window.document;

	/**
	 * The faux "class" constructor.
	 *
	 * @since  1.0.
	 *
	 * @return void
	 */
	var Snap = function () {

		/**
		 * Holds reusable elements.
		 *
		 * @since 1.0.
		 *
		 * @type  {{}}
		 */
		var cache = {};

		/**
		 * Initiate all actions for this class.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function init( snapResponsiveNavOptions ) {
			// Cache the reusable elements
			cacheElements();

			// Initiate FitVids
			setupFitVids();

			// Label the last posts
			labelLastPosts();

			// Grid items without an image can be truncated immediately
			addEllipsis();

			// Enable the mobile menu
			setupMenu( snapResponsiveNavOptions );

			// Setup event binding
			bindEvents();
		}

		/**
		 * Caches elements that are used in this scope.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function cacheElements() {
			cache.$window   = $( window );
			cache.$document = $( document );
		}

		/**
		 * Setup event binding.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function bindEvents() {
			// Re-label the last posts when IS loads
			cache.$document.on( 'post-load', labelLastPosts );

			// After Infinite Scroll has loaded, all images are present all grid items can be dotdotdot-ed
			cache.$document.on( 'post-load', addEllipsis );

			// When the window resizes, redo the ellipsis. Check that the dependency is available
			if ( 'function' === typeof cache.$window.smartresize ) {
				cache.$window.smartresize( addEllipsis );
			}
		}

		/**
		 * Run FitVids.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function setupFitVids() {
			// FitVids is only loaded on the pages and single post pages. Check for it before doing anything.
			if ( ! $.fn.fitVids )
				return;

			$( '.page .frame, .single-post .frame' ).fitVids();
		}

		/**
		 * Label posts in the last row of the blog listing.
		 *
		 * Posts in the last row of the blog listing need to be labeled as "last-of-posts". This removes the thin border
		 * at the bottom of those posts. This is being implemented via JS for better handling of edge cases with odd
		 * number of posts, sticky posts, and Infinite Scroll.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function labelLastPosts() {
			// This function should only run on pages using dotdotdot. Exit if not loaded
			if ( ! $.fn.dotdotdot )
				return;

			var $tile      = $( '.tile' ),
				$lastPosts = $( '.last-of-posts', $tile ),
				$posts     = $( '.post, .page', $tile );

			// When IS loads, the "last-of-posts" class needs to be removed as the last of posts posts are no longer last of posts
			$lastPosts.removeClass( 'last-of-posts' );

			/**
			 * Assume that there are an even number of posts displayed, meaning that there are 2 posts in the last row.
			 * Slice is initially set to -2 (which later leads to selecting the posts in the last row) to meet this
			 * assumption. Then, check for that assumption. If there are not an even number of posts, set slice to -1 to
			 * pick the 1 post in the last row.
			 */
			var slice = -2;

			if ( 0 !== $posts.length % 2 ) {
				slice = -1;
			}

			// Tag the post(s) in the last row with the "last-of-posts" class
			$posts.slice( slice ).addClass( 'last-of-posts' );
		}

		/**
		 * Truncate content to fit in an area and add an ellipsis.
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function addEllipsis() {
			// Dotdotdot is only loaded on the blog page and homepage. Check for it before doing anything.
			if ( ! $.fn.dotdotdot )
				return;

			var $setPosts      = $( '.set-post', '.post, .page' ),                              // Used to set context for other selectors
				$withoutThumbs = $( '.without-thumb .grid-content-wrapper', $setPosts ), // Get all of the grid items without thumbs. These are treated differently than items with thumbs.
				$withThumbs    = $( '.with-thumb .grid-content-wrapper', $setPosts ),    // Get all of the grid items with thumbs.
				deviceWidth    = cache.$window.width(),                                  // Current device width for getting image size.
				gridItemWidth  = Math.round( $( '.set-post:first' ).width() ),                         // Get the grid item width based on the first item's width
				maxGridHeight  = ( deviceWidth >= 600 ) ? 360 : 0;                       // Get the max height of the grid items, which is based on the device width

			// Posts with thumbs can be dotted. Height needs to be static in all but the narrow view.
			if ( $withoutThumbs.length > 0 ) {
				$withoutThumbs.dotdotdot( {
					height : ( 0 !== maxGridHeight ) ? maxGridHeight : '' // '' will allow the area to be flexible
				} );
			}

			/**
			 * When the grid item has a thumbnail, the content area needs to be adjusted. Based on the size of the screen,
			 * the content area is adjusted differently.
			 */
			$withThumbs.each( function () {
				var $this            = $( this ),
					$img             = $( 'img:first', $this.parent() ),
					htmlHeight       = parseInt( $img.attr( 'height' ) ),
					htmlWidth        = parseInt( $img.attr( 'width' ) ),
					hasHeight        = ( ! isNaN( htmlHeight ) ),
					hasWidth         = ( ! isNaN( htmlWidth ) ),
					hasDimensions    = ( hasHeight && hasWidth ),
					currentMaxHeight = getCurrentMaxHeight(),
					contentHeight    = '';

				// Estimates can only be made it HTML attrs for dimensions are available
				if ( hasDimensions ) {
					var estimatedThumbHeight = guessImageDisplayHeight( htmlHeight, htmlWidth, currentMaxHeight, gridItemWidth );
					contentHeight = ( 0 !== maxGridHeight && 0 !== estimatedThumbHeight ) ? maxGridHeight - estimatedThumbHeight : '';
				} else {
					// Assume that the full height of the thumb area is taken and set the content height based on that
					contentHeight = ( 0 !== maxGridHeight ) ? maxGridHeight - currentMaxHeight : '';
				}

				// Adjust the height to account for 11 px of margin
				contentHeight = contentHeight - 11;
				contentHeight = ( contentHeight < 0 ) ? 0 : contentHeight;

				// Set the correct height for the content to avoid having half of a line get cut off
				if ( contentHeight > 0 ) {
					$this.css( {
						height : contentHeight
					} );
				}

				// Apply dotdotdot with the correct height
				$this.dotdotdot( {
					height : ( contentHeight > 0 ) ? contentHeight : null
				} );
			} );
		}

		/**
		 * Based on the 4 parameters, attempt to guess the display height of an image.
		 *
		 * @since   1.0.3.
		 *
		 * @param   htmlHeight    int    Height HTML attr.
		 * @param   htmlWidth     int    Width HTML attr.
		 * @param   maxHeight     int    The max height that the current thumb can be.
		 * @param   maxWidth      int    The max width that the current thumb can be.
		 * @returns {int}
		 */
		function guessImageDisplayHeight( htmlHeight, htmlWidth, maxHeight, maxWidth ) {
			var estimatedDisplayHeight = 0;

			if ( 'landscape' === getImageOrientation( htmlHeight, htmlWidth ) ) {
				if ( htmlWidth > maxWidth ) {
					/**
					 * Since the width of the image is greater than the max width of the grid area, the image is resized.
					 * Get the percent size reduction for the width, then apply that to the height to get the estimated
					 * display height.
 					 */
					var ratio = maxWidth / htmlWidth;
					estimatedDisplayHeight = htmlHeight * ratio;
				} else {
					/**
					 * In this condition, the image will not stretch the full width of the grid area. The width of the
					 * image is less that the grid width. We need to verify that the height of the image is not greater
					 * than the max height for the area. If it is, the image height (and width for that matter) will be
					 * altered. It will be the same as the maxHeight value.
					 */
					if ( htmlHeight > maxHeight ) {
						estimatedDisplayHeight = maxHeight;
					} else {
						estimatedDisplayHeight = htmlHeight;
					}
				}
			} else {
				if ( htmlHeight > maxHeight ) {
					/**
					 * Since this is a portrait image and because the image's height is greater than the max height for
					 * the element, it must be scaled down to the max height.
					 */
					estimatedDisplayHeight = maxHeight;
				} else {
					/**
					 * This is the tricky condition. At this point the image is a portrait that is shorter than the max
					 * height of the grid area.
					 */
					if ( htmlWidth > maxWidth ) {
						/**
						 * In this condition, we know that the image is being resized based on reducing the width of the
						 * image. We can use the ratio reduction to determine the height of the image.
						 */
						var ratio = maxWidth / htmlWidth;
						estimatedDisplayHeight = htmlHeight * ratio;
					} else {
						/**
						 * In this condition, the image is not exceeding the height or the width of the grid area. This
						 * means the the image isn't resized at all. Most likely, the height is the htmlHeight.
						 */
						estimatedDisplayHeight = htmlHeight;
					}
				}
			}

			return Math.round( estimatedDisplayHeight );
		}

		/**
		 * Determine the max height of the thumbnail area given the current screen width.
		 *
		 * @since   1.0.3.
		 *
		 * @returns {int}
		 */
		function getCurrentMaxHeight() {
			var deviceWidth      = cache.$window.width(),
				deviceWidthLabel = 'devicedefault',
				thumbMaxSizes    = {
					devicedefault : 407,
					small   : 285,
					medium  : 221
				};

			// Determine the size of the screen. This corresponds to the media queries in the CSS.
			if ( deviceWidth >= 600 && deviceWidth < 900 ) {
				deviceWidthLabel = 'small';
			} else if ( deviceWidth >= 900 ) {
				deviceWidthLabel = 'medium';
			}

			return thumbMaxSizes[ deviceWidthLabel ];
		}

		/**
		 * Determine an image's orientation.
		 *
		 * @since   1.0.3.
		 *
		 * @param   htmlHeight    int    Height HTML attr.
		 * @param   htmlWidth     int    Width HTML attr.
		 * @returns {string}
		 */
		function getImageOrientation( htmlHeight, htmlWidth ) {
			if ( htmlHeight > htmlWidth ) {
				return 'portrait';
			} else {
				return 'landscape';
			}
		}

		/**
		 * Activate the mobile menu
		 *
		 * @since  1.0.
		 *
		 * @return void
		 */
		function setupMenu( snapResponsiveNavOptions ) {
			// Be safe and check that the resource is loaded
			if ( 'function' !== typeof responsiveNav )
				return;

			// Verify that we have a legit object
			if ( 'object' !== typeof snapResponsiveNavOptions ) {
				/**
				 * Looks like the expected object does not exist, which likely means someone did something to 
				 * "unlocalize" the script. To try to correct for this situation, define the defaults so the menu will
				 * still work.
				 */
				var snapResponsiveNavOptions = {
					animate      : true,
					transition   : 400,
					label        : 'Show Menu',
					insert       : 'before',
					customToggle : 'mobile-toggle',
					openPos      : 'relative',
					jsClass      : 'js',

					// This is not a part of Responsive Nav, but is needed for changing the menu label
					closedLabel  : 'Hide Menu'
				}
			}

			// Cache the object for use in other methods
			cache.responsiveNavOptions = snapResponsiveNavOptions;

			// Add callback function to change the label when the menu is closed
			cache.responsiveNavOptions.open = function() {
				toggleLabel( cache.responsiveNavOptions.closedLabel );
			}

			// Add callback function to change the label when the menu is opened
			cache.responsiveNavOptions.close = function() {
				toggleLabel( cache.responsiveNavOptions.label );
			}

			// Initiate the Responsive Nav menu
			cache.nav = responsiveNav( '#snap-nav', cache.responsiveNavOptions );
		}

		/**
		 * Change the label in the menu.
		 *
		 * @since  1.0
		 *
		 * @param  label    Value to change the menu to.
		 * @return void
		 */
		function toggleLabel( label ) {
			// If the element is not cached, cache it
			if ( 'object'  !== cache.$navMenuLabel ) {
				cache.$navMenuLabel = $( 'span', '#' + cache.responsiveNavOptions.customToggle );
			}

			// Set the label
			cache.$navMenuLabel.text( label );
		}

		// Initiate the actions.
		init( snapResponsiveNavOptions );
	}

	// Instantiate the "class".
	window.Snap = new Snap();
})( window, jQuery );
;
/* global FB, jpfbembed */
(function( window ) {
	var facebookEmbed = function() {
		var fbroot, src;

		if ( 'undefined' !== typeof FB && FB.XFBML ) {
			FB.XFBML.parse();
		} else {
			fbroot = document.createElement( 'div' );
			fbroot.id = 'fb-root';
			document.getElementsByTagName( 'body' )[0].appendChild( fbroot );

			src = '//connect.facebook.net/' + jpfbembed.locale + '/sdk.js#xfbml=1';
			if ( jpfbembed.appid ) {
				src += '&appId=' + jpfbembed.appid;
			}
			src += '&version=v2.3';
			jQuery.getScript( src );
		}
	};

	window.fbAsyncInit = function() {
		FB.init( {
			appId  : jpfbembed.appid,
			version: 'v2.3'
		} );

		FB.XFBML.parse();
	};

	if ( 'undefined' !== typeof infiniteScroll ) {
		jQuery( document.body ).on( 'post-load', facebookEmbed );
	}

	facebookEmbed();
})( this );
;
/* jshint ignore:start */
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document,"script","twitter-wjs");
/* jshint ignore:end */
;
/***
 * Warning: This file is remotely enqueued in Jetpack's Masterbar module.
 * Changing it will also affect Jetpack sites.
 */
jQuery( document ).ready( function( $, wpcom ) {
	var masterbar,
		menupops = $( 'li#wp-admin-bar-blog.menupop, li#wp-admin-bar-newdash.menupop, li#wp-admin-bar-my-account.menupop' ),
		newmenu = $( '#wp-admin-bar-new-post-types' );

	// Unbind hoverIntent, we want clickable menus.
	menupops
		.unbind( 'mouseenter mouseleave' )
		.removeProp( 'hoverIntent_t' )
		.removeProp( 'hoverIntent_s' )
		.on( 'mouseover', function(e) {
			var li = $(e.target).closest( 'li.menupop' );
			menupops.not(li).removeClass( 'ab-hover' );
			li.toggleClass( 'ab-hover' );
		} )
		.on( 'click touchstart', function(e) {
			var $target = $( e.target );

			if ( masterbar.focusSubMenus( $target ) ) {
				return;
			}

			e.preventDefault();
			masterbar.toggleMenu( $target );
		} );

	masterbar = {
		focusSubMenus: function( $target ) {
			// Handle selection of menu items
			if ( ! $target.closest( 'ul' ).hasClass( 'ab-top-menu' ) ) {
				$target
					.closest( 'li' );

				return true;
			}

			return false;
		},

		toggleMenu: function( $target ) {
			var $li = $target.closest( 'li.menupop' ),
				$html = $( 'html' );

			$( 'body' ).off( 'click.ab-menu' );
			$( '#wpadminbar li.menupop' ).not($li).removeClass( 'ab-active wpnt-stayopen wpnt-show' );

			if ( $li.hasClass( 'ab-active' ) ) {
				$li.removeClass( 'ab-active' );
				$html.removeClass( 'ab-menu-open' );
			} else {
				$li.addClass( 'ab-active' );
				$html.addClass( 'ab-menu-open' );

				$( 'body' ).on( 'click.ab-menu', function( e ) {
					if ( ! $( e.target ).parents( '#wpadminbar' ).length ) {
						e.preventDefault();
						masterbar.toggleMenu( $li );
						$( 'body' ).off( 'click.ab-menu' );
					}
				} );
			}
		}
	};
} );;
/*globals JSON */
( function( $ ) {
	var eventName = 'wpcom_masterbar_click';

	var linksTracksEvents = {
		//top level items
		'wp-admin-bar-blog'                        : 'my_sites',
		'wp-admin-bar-newdash'                     : 'reader',
		'wp-admin-bar-ab-new-post'                 : 'write_button',
		'wp-admin-bar-my-account'                  : 'my_account',
		'wp-admin-bar-notes'                       : 'notifications',
		//my sites - top items
		'wp-admin-bar-switch-site'                 : 'my_sites_switch_site',
		'wp-admin-bar-blog-info'                   : 'my_sites_site_info',
		'wp-admin-bar-site-view'                   : 'my_sites_view_site',
		'wp-admin-bar-blog-stats'                  : 'my_sites_site_stats',
		'wp-admin-bar-plan'                        : 'my_sites_plan',
		'wp-admin-bar-plan-badge'                  : 'my_sites_plan_badge',
		//my sites - manage
		'wp-admin-bar-edit-page'                   : 'my_sites_manage_site_pages',
		'wp-admin-bar-new-page-badge'              : 'my_sites_manage_add_page',
		'wp-admin-bar-edit-post'                   : 'my_sites_manage_blog_posts',
		'wp-admin-bar-new-post-badge'              : 'my_sites_manage_add_post',
		'wp-admin-bar-edit-attachment'             : 'my_sites_manage_media',
		'wp-admin-bar-new-attachment-badge'        : 'my_sites_manage_add_media',
		'wp-admin-bar-comments'                    : 'my_sites_manage_comments',
		'wp-admin-bar-edit-jetpack-testimonial'    : 'my_sites_manage_testimonials',
		'wp-admin-bar-new-jetpack-testimonial'     : 'my_sites_manage_add_testimonial',
		'wp-admin-bar-edit-jetpack-portfolio'      : 'my_sites_manage_portfolio',
		'wp-admin-bar-new-jetpack-portfolio'       : 'my_sites_manage_add_portfolio',
		//my sites - personalize
		'wp-admin-bar-themes'                      : 'my_sites_personalize_themes',
		'wp-admin-bar-cmz'                         : 'my_sites_personalize_themes_customize',
		//my sites - configure
		'wp-admin-bar-sharing'                     : 'my_sites_configure_sharing',
		'wp-admin-bar-people'                      : 'my_sites_configure_people',
		'wp-admin-bar-people-add'                  : 'my_sites_configure_people_add_button',
		'wp-admin-bar-plugins'                     : 'my_sites_configure_plugins',
		'wp-admin-bar-domains'                     : 'my_sites_configure_domains',
		'wp-admin-bar-domains-add'                 : 'my_sites_configure_add_domain',
		'wp-admin-bar-blog-settings'               : 'my_sites_configure_settings',
		'wp-admin-bar-legacy-dashboard'            : 'my_sites_configure_wp_admin',
		//reader
		'wp-admin-bar-followed-sites'              : 'reader_followed_sites',
		'wp-admin-bar-reader-followed-sites-manage': 'reader_manage_followed_sites',
		'wp-admin-bar-discover-discover'           : 'reader_discover',
		'wp-admin-bar-discover-search'             : 'reader_search',
		'wp-admin-bar-my-activity-my-likes'        : 'reader_my_likes',
		//account
		'wp-admin-bar-user-info'                   : 'my_account_user_name',
		// account - profile
		'wp-admin-bar-my-profile'                  : 'my_account_profile_my_profile',
		'wp-admin-bar-account-settings'            : 'my_account_profile_account_settings',
		'wp-admin-bar-billing'                     : 'my_account_profile_manage_purchases',
		'wp-admin-bar-security'                    : 'my_account_profile_security',
		'wp-admin-bar-notifications'               : 'my_account_profile_notifications',
		//account - special
		'wp-admin-bar-get-apps'                    : 'my_account_special_get_apps',
		'wp-admin-bar-next-steps'                  : 'my_account_special_next_steps',
		'wp-admin-bar-help'                        : 'my_account_special_help',
	};

	var notesTracksEvents = {
		openSite: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_site',
				site_id: data.siteId
			};
		},
		openPost: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_post',
				site_id: data.siteId,
				post_id: data.postId
			};
		},
		openComment: function( data ) {
			return {
				clicked: 'masterbar_notifications_panel_comment',
				site_id: data.siteId,
				post_id: data.postId,
				comment_id: data.commentId
			};
		}
	};

	function recordTracksEvent( eventProps ) {
		eventProps = eventProps || {};
		window._tkq = window._tkq || [];
		window._tkq.push( [ 'recordEvent', eventName, eventProps ] );
	}

	function parseJson( s, defaultValue ) {
		try {
			return JSON.parse( s );
		} catch ( e ) {
			return defaultValue;
		}
	}

	$( document ).ready( function() {
		var trackableLinks = '.mb-trackable .ab-item:not(div),' +
			'#wp-admin-bar-notes .ab-item,' +
			'#wp-admin-bar-user-info .ab-item,' +
			'.mb-trackable .ab-secondary';

		$( trackableLinks ).on( 'click touchstart', function( e ) {
			var $target = $( e.target ),
				$parent = $target.closest( 'li' );

			if ( ! $parent ) {
				return;
			}

			var trackingId = $target.attr( 'ID' ) || $parent.attr( 'ID' );

			if ( ! linksTracksEvents.hasOwnProperty( trackingId ) ) {
				return;
			}

			var eventProps = { 'clicked': linksTracksEvents[ trackingId ] };

			recordTracksEvent( eventProps );
		} );
	} );

	// listen for postMessage events from the notifications iframe
	$( window ).on( 'message', function( e ) {
		var event = ! e.data && e.originalEvent.data ? e.originalEvent : event;
		if ( event.origin !== 'https://widgets.wp.com' ) {
			return;
		}

		var data = ( 'string' === typeof event.data ) ? parseJson( event.data, {} ) : event.data;
		if ( 'notesIframeMessage' !== data.type ) {
			return;
		}

		var eventData = notesTracksEvents[ data.action ];
		if ( ! eventData ) {
			return;
		}

		recordTracksEvent( eventData( data ) );
	} );

} )( jQuery );
;
var wpcom = window.wpcom || {};
wpcom.actionbar = {};
wpcom.actionbar.data = actionbardata;

// This might be better in another file, but is here for now
(function($){
	var fbd = wpcom.actionbar.data,
			d = document,
			docHeight = $( d ).height(),
			b = d.getElementsByTagName( 'body' )[0],
			lastScrollTop = 0,
			lastScrollDir, fb, fhtml, fbhtml, fbHtmlLi,
			followingbtn, followbtn, fbdf, action,
			slkhtml = '', foldhtml = '', reporthtml = '',
			customizeIcon, editIcon, statsIcon, themeHtml = '', signupHtml = '', loginHtml = '',
			viewReaderHtml = '', editSubsHtml = '', editFollowsHtml = '',
			toggleactionbar, $actionbar;

	// Don't show actionbar when iframed
	if ( window != window.top ) {
		return;
	}

	fhtml = '<ul>';

	// Customize Icon
	customizeIcon = '<svg class="gridicon gridicon__customize" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2 1.657 0 3 1.343 3 3 0 .386-.08.752-.212 1.09.74.594 1.476 1.19 2.19 1.81L8.9 11.98c-.62-.716-1.214-1.454-1.807-2.192C6.753 9.92 6.387 10 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.34-1.34c.607.304 1.283.492 2.008.492 2.485 0 4.5-2.015 4.5-4.5 0-.725-.188-1.4-.493-2.007L18 9l-2-2 3.507-3.507C18.9 3.188 18.225 3 17.5 3 15.015 3 13 5.015 13 7.5c0 .725.188 1.4.493 2.007L3 20l2 2 6.848-6.848c1.885 1.928 3.874 3.753 5.977 5.45l1.425 1.148 1.5-1.5-1.15-1.425c-1.695-2.103-3.52-4.092-5.448-5.977z" data-reactid=".2.1.1:0.1b.0"></path></g></svg>';

	if ( fbd.canCustomizeSite && fbd.isLoggedIn ) {
		fhtml += '<li class="actnbr-btn actnbr-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li>';
	}

	// Edit Icon
	editIcon = '<svg class="gridicon gridicon__pencil" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path></g></svg>';

	if ( fbd.canEditPost ) {
		fhtml += '<li class="actnbr-btn actnbr-edit"><a href="'+ fbd.editLink +'">' + editIcon + '<span>' + fbd.i18n.edit + '</span></a></li>';
	}

	// Stats Icon
	statsIcon = '<svg class="gridicon gridicon__stats-alt" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M21,21H3v-2h18V21z M8,10H4v7h4V10z M14,3h-4v14h4V3z M20,6h-4v11h4V6z"/></path></g></svg>';

	if ( fbd.canEditPost ) {
		fhtml += '<li class="actnbr-btn actnbr-stats"><a href="'+ fbd.statsLink +'">' + statsIcon + '<span>' + fbd.i18n.stats + '</span></a></li>';
	}

	// Follow/Unfollow Icon
	followingbtn = '<svg class="gridicon gridicon__following" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 13.482L15.508 21 12 17.4l1.412-1.388 2.106 2.188 6.094-6.094L23 13.482zm-7.455 1.862L20 10.89V2H2v14c0 1.1.9 2 2 2h4.538l4.913-4.832 2.095 2.176zM8 13H4v-1h4v1zm3-2H4v-1h7v1zm0-2H4V8h7v1zm7-3H4V4h14v2z"/></g></svg>';
	followbtn = '<svg class="gridicon gridicon__follow" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M23 16v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM20 2v9h-4v3h-3v4H4c-1.1 0-2-.9-2-2V2h18zM8 13v-1H4v1h4zm3-3H4v1h7v-1zm0-2H4v1h7V8zm7-4H4v2h14V4z"/></g></svg>';

	fbhtml = '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>';
	if ( fbd.isFollowing ) {
		fbhtml = '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>';
	}

	// Show follow/unfollow icon on top level, when this is not your own site
	if ( fbd.canFollow && ! ( fbd.canEditPost || fbd.canCustomizeSite ) ) {
		fhtml += '<li class="actnbr-btn actnbr-hidden"> \
			    	' + fbhtml + ' \
			    	<div class="actnbr-popover tip tip-top-left actnbr-notice"> \
			    		<div class="tip-arrow"></div> \
			    		<div class="tip-inner actnbr-follow-bubble"></div> \
			    	</div> \
			    </li>';
	}

	if ( ! fbd.canCustomizeSite ) {
		// Report Link
		reporthtml = '<li class="flb-report"><a href="http://en.wordpress.com/abuse/">' + fbd.i18n.report + '</a></li>';
	}

	// Show shortlink on single posts
	if ( fbd.isSingular ) {
		slkhtml = '<li class="actnbr-shortlink"><a href="' + fbd.shortlink + '">' + fbd.i18n.shortlink + '</a></li>'
	}

	// Set up fold/unfold menu item
	foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.foldBar + '</a></li>'
	if ( fbd.isFolded ) {
		foldhtml = '<li class="actnbr-fold"><a href="">' + fbd.i18n.unfoldBar + '</a></li>'
	}
	if ( ! fbd.isLoggedIn && ! fbd.canFollow ) {
		foldhtml = '';
	}

	if ( fbd.isLoggedIn ) {
		if ( '' != fbd.themeURL ) {
			themeHtml = '<li class="actnbr-theme"><a href="' + fbd.themeURL + '">' + fbd.i18n.themeInfo.replace( /{theme}/, fbd.themeName ) + '</a></li>';
		}
		if ( fbd.canFollow ) {
			if ( fbd.isSingular ) {
				viewReaderHtml = '<li class="actnbr-reader"><a href="https://wordpress.com/read/blogs/' + fbd.siteID + '/posts/' + fbd.postID +'">' + fbd.i18n.viewReadPost + '</a></li>';
			} else {
				viewReaderHtml = '<li class="actnbr-reader"><a href="https://wordpress.com/read/' + ( fbd.feedID ? 'feeds/' + fbd.feedID : 'blogs/' + fbd.siteID ) + '">' + fbd.i18n.viewReader + '</a></li>';
			}
		}
		editFollowsHtml = '<li class="actnbr-follows"><a href="https://wordpress.com/following/edit">' + fbd.i18n.editSubs + '</a></li>';
	} else {
		loginHtml += '<li class="actnbr-login"><a href="' + fbd.loginURL + '">' + fbd.i18n.login + '</a></li>';
		signupHtml = '<li class="actnbr-signup"><a href="' + fbd.signupURL + '">' + fbd.i18n.signup + '</a></li>';
		editSubsHtml = '<li class="actnbr-subs"><a href="https://subscribe.wordpress.com/">' + fbd.i18n.editSubs + '</a></li>';
	}

	// Hide follow/unfollow completely for static sites, and sites not allowing followers (VIP, private, etc).
	if ( ! fbd.canFollow ) {
		fbHtmlLi = '';
	} else {
		fbHtmlLi = '<li class="actnbr-folded-follow">' + fbhtml + '</li>';
	}

	// Ellipsis Menu
	fhtml += '<li class="actnbr-ellipsis actnbr-hidden"> \
			  <svg class="gridicon gridicon__ellipsis" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="12" r="2"/></g></svg> \
			  <div class="actnbr-popover tip tip-top-left actnbr-more"> \
			  	<div class="tip-arrow"></div> \
			  	<div class="tip-inner"> \
				  <ul> \
				    <li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				   	<li class="actnbr-folded-customize"><a href="'+ fbd.customizeLink +'">' + customizeIcon + '<span>' + fbd.i18n.customize + '<span></a></li> \
				    ' + fbHtmlLi + ' \
					' + signupHtml + ' \
				    ' + loginHtml + ' \
				    ' + themeHtml + ' \
				    ' + slkhtml + ' \
				    ' + reporthtml + ' \
				    ' + viewReaderHtml + ' \
				    ' + editFollowsHtml + ' \
				    ' + editSubsHtml + ' \
				    ' + foldhtml + ' \
			      </ul> \
			    </div> \
		      </div> \
		    </li> \
	      </ul>';

	fbdf = d.createElement( 'div' );
	fbdf.id = 'actionbar';
	fbdf.innerHTML = fhtml;
	b.appendChild( fbdf );

	$actionbar = $( '#actionbar' ).addClass( 'actnbr-' + fbd.themeSlug.replace( '/', '-' ) );

	// Add classes based on contents
	if ( fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-customize' );
	}

	if ( fbd.canEditPost ) {
		$actionbar.addClass( 'actnbr-has-edit' );
	}

	if ( ! fbd.canCustomizeSite ) {
		$actionbar.addClass( 'actnbr-has-follow' );
	}

	if ( fbd.isFolded ) {
		$actionbar.addClass( 'actnbr-folded' );
	}

	// Show status message if available
	if ( fbd.statusMessage ) {
		showActionBarStatusMessage( fbd.statusMessage );
	}

	// *** Actions *****************

	// Follow Site
	$actionbar.on(  'click', '.actnbr-actn-follow', function(e) {
		e.preventDefault();

		if ( fbd.isLoggedIn ) {
			showActionBarStatusMessage( '<div class="actnbr-reader">' + fbd.i18n.followedText + '</div>' );
			bumpStat( 'followed' );
			request( 'ab_subscribe_to_blog' );
		} else {
			showActionBarFollowForm();
		}
	} )

	// UnFollow Site
	.on(  'click', '.actnbr-actn-following', function(e) {
		e.preventDefault();
		$( '#actionbar .actnbr-actn-following' ).replaceWith( '<a class="actnbr-action actnbr-actn-follow" href="">' + followbtn + '<span>' + fbd.i18n.follow + '</span></a>' );

		bumpStat( 'unfollowed' );
		request( 'ab_unsubscribe_from_blog' );
	} )

	// Show shortlink prompt
	.on( 'click', '.actnbr-shortlink a', function(e) {
		e.preventDefault();
		window.prompt( "Shortlink: ", fbd.shortlink );
	} )

	// Toggle more menu
	.on( 'click', '.actnbr-ellipsis', function(e) {
		if ( $( e.target ).closest( 'a' ).hasClass( 'actnbr-action' ) ) {
			return false;
		}

		var popoverLi = $( '#actionbar .actnbr-ellipsis' );
		popoverLi.toggleClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! popoverLi.hasClass( 'actnbr-hidden' ) ) {
				$( document ).on( 'click.actnbr-body-click', function(e) {
					popoverLi.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	})

	// Fold/Unfold
	.on( 'click', '.actnbr-fold', function(e) {
		e.preventDefault();

		if ( $( '#actionbar' ).hasClass( 'actnbr-folded' ) ) {
			$( '.actnbr-fold a' ).html( fbd.i18n.foldBar );
			$( '#actionbar' ).removeClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'unfold_actionbar' } );
		} else {
			$( '.actnbr-fold a' ).html( fbd.i18n.unfoldBar );
			$( '#actionbar' ).addClass( 'actnbr-folded' );

			$.post( fbd.xhrURL, { 'action': 'fold_actionbar' } );
		}
	})

	// Record stats for clicks
	.on( 'click', '.actnbr-sitename a', function(e) {
		bumpStat( 'clicked_site_title' );
	})
	.on( 'click', '.actnbr-customize a', function(e) {
		bumpStat( 'customized' );
	})
	.on( 'click', '.actnbr-folded-customize a', function(e) {
		bumpStat( 'customized' );
	})
	.on( 'click', '.actnbr-theme a', function(e) {
		bumpStat( 'explored_theme' );
	})
	.on( 'click', '.actnbr-edit a', function(e) {
		bumpStat( 'edited' );
	})
	.on( 'click', '.actnbr-stats a', function(e) {
		bumpStat( 'clicked_stats' );
	})
	.on( 'click', '.flb-report a', function(e) {
		bumpStat( 'reported_content' );
	})
	.on( 'click', '.actnbr-follows a', function(e) {
		bumpStat( 'managed_following' );
	})
	.on( 'click', '.actnbr-shortlink a', function(e) {
		bumpStat( 'copied_shortlink' );
	})
	.on( 'click', '.actnbr-reader a', function(e) {
		bumpStat( 'view_reader' );
	})
	.on( 'submit', '.actnbr-follow-bubble form', function ( e ) {
		$( '#actionbar .actnbr-follow-bubble form button' ).attr( 'disabled', true );
	});


	// Make Follow/Unfollow requests
	var request = function( action ) {
		$.post( fbd.xhrURL, {
			'action': action,
			'_wpnonce': fbd.nonce,
			'source': 'actionbar',
			'blog_id': fbd.siteID
		});
	};

	// Show/Hide actionbar on scroll
	fb = $('#actionbar');
	toggleactionbar = function() {
		var st = $(window).scrollTop(),
			topOffset = 0;

		if ( $(window).scrollTop() < 0 ) {
			return;
		}

		// Still
		if ( lastScrollTop == 0 || ( ( st == lastScrollTop ) && lastScrollDir == 'up' ) ) {
			fb.removeClass( 'actnbr-hidden' );

		// Moving
		} else {
			 // Scrolling Up
		    if ( st < lastScrollTop ){
				fb.removeClass( 'actnbr-hidden' );
				lastScrollDir = 'up';

			// Scrolling Down
			} else {
				// check if there are any popovers open, and only hide action bar if not
				if ( $( '#actionbar > ul > li:not(.actnbr-hidden) > .actnbr-popover' ).length === 0 ) {
					fb.addClass( 'actnbr-hidden' )
					lastScrollDir = 'down';

					// Hide any menus
					$( '#actionbar li' ).addClass( 'actnbr-hidden' );
				}
			}
		}

		lastScrollTop = st;
	}
	setInterval( toggleactionbar, 100 );

	// Bump stats
	var bumpStat = function( stat ) {
		$.post( fbd.xhrURL, {
			'action': 'actionbar_stats',
			'stat': stat
		});
	}

	function actionBarEscapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			var entityMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': '&quot;',
				"'": '&#39;',
				"/": '&#x2F;'
			};
			return entityMap[s];
		});
	};

	function showActionBarStatusMessage( message ) {
		$( '#actionbar .actnbr-actn-follow' ).replaceWith( '<a class="actnbr-action actnbr-actn-following" href="">' + followingbtn + '<span>' + fbd.i18n.following + '</span></a>' );
		$( '#actionbar .actnbr-follow-bubble' ).html( ' \
			<ul> \
				<li class="actnbr-sitename"><a href="' + fbd.siteURL + '">' + fbd.icon + ' ' + actionBarEscapeHtml( fbd.siteName ) + '</a></li> \
				<li class="actnbr-message">' + message + '</li> \
			</ul> \
		');

		var btn = $( '#actionbar .actnbr-btn' );
		btn.removeClass( 'actnbr-hidden' );

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				$( '#actionbar .actnbr-email-field' ).focus();
				$( document ).on( 'click.actnbr-body-click', function(e) {
					if ( $( e.target ).closest( '.actnbr-popover' )[0] ) {
						return;
					}
					btn.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}

	function showActionBarFollowForm() {
		var btn = $( '#actionbar .actnbr-btn' );
		btn.toggleClass( 'actnbr-hidden' );

		var form = $('<form>');
		if ( fbd.i18n.followers )
			form.append($('<div class="actnbr-follow-count">').html(fbd.i18n.followers));
		form.append($('<div>').append($('<input>').attr({"type": "email", "name": "email", "placeholder": fbd.i18n.enterEmail, "class": "actnbr-email-field"})));
		form.append($('<input type="hidden" name="action" value="subscribe"/>'));
		form.append($('<input type="hidden" name="blog_id">').attr('value', fbd.siteID));
		form.append($('<input type="hidden" name="source">').attr('value', fbd.referer));
		form.append($('<input type="hidden" name="sub-type" value="actionbar-follow"/>'));
		form.append($(fbd.subscribeNonce));
		form.append($('<div class="actnbr-button-wrap">').append($('<button type="submit">').attr('value', fbd.i18n.subscribe).html(fbd.i18n.subscribe)));
		form.attr('method', 'post');
		form.attr('action', 'https://subscribe.wordpress.com');
		form.attr('accept-charset', 'utf-8');

		var html = $('<ul/>');
		html.append($('<li class="actnbr-sitename">').append($('<a>').attr('href', fbd.siteURL).append($(fbd.icon)).append(' ' + actionBarEscapeHtml( fbd.siteName ))))
		html.append($('<li>').append(form));
		html.append($('<li class="actnbr-login-nudge">').append($('<div>').html(fbd.i18n.alreadyUser)))

		$( '#actionbar .actnbr-follow-bubble' ).empty().append(html);

		setTimeout( function() {
			if ( ! btn.hasClass( 'actnbr-hidden' ) ) {
				$( '#actionbar .actnbr-email-field' ).focus();
				$( document ).on( 'click.actnbr-body-click', function(e) {
					if ( $( e.target ).closest( '.actnbr-popover' )[0] ) {
						return;
					}
					btn.addClass( 'actnbr-hidden' );
					$( document ).off( 'click.actnbr-body-click' );
				} );
			}
		}, 10 );
	}
})(jQuery);
;
