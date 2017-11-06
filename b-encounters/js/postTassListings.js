/*
 * When we re-themed old listing pages to look like the pages produced during the TASS project,
 * we had to code a lot of JavaScript-generated HTML to server-generate Drupal code. This handy
 * little script does the last bit that still needs to be done in JavaScript for image preview hovers.
 */

$(document).ready(function(){
	$('div.galleryImage').each(
				   function(i) {
				       var gTooltip = $( '#' + $(this).id() + 'tooltip');
				       gTooltip.hide();

				       $(this).find("a").hover(
							       function () {
								   gTooltip.show();
								   gTooltip.css( { "bottom": $(this).find("img.scaled").height()/2 + ( $(this).height() - $(this).find("img.scaled").height() ) + "px", "left": $(this).find("img.scaled").width()/2 + "px" } );
							       },

							       function () { gTooltip.hide(); }
							       );
				   }
				   );
    });
