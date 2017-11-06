/*
 * Custom Javascript Elements for Art Institute - Filter Menu
 */
 

$(document).ready(function() {

	
		//On Hover Over
		function megaHoverOver(){
   			$(this).find(".sub").stop().fadeTo('fast', 1).show(); //Find sub and fade it in
		}
	
		//On Hover Out
		function megaHoverOut(){
  		$(this).find(".sub").stop().fadeTo('fast', 0, function() { //Fade to 0 opactiy
      		$(this).hide();  //after fading, hide it
  		});
		}
	
		//Set custom configurations
		var config = {
     		sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
     		interval: 100, // number = milliseconds for onMouseOver polling interval
     		over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
     		timeout: 500, // number = milliseconds delay before onMouseOut
     		out: megaHoverOut // function = onMouseOut callback (REQUIRED)
		};

		$("ul#filters li .sub").css({'opacity':'0'}); //Fade sub nav to 0 opacity on default
		$("ul#filters li").hoverIntent(config); //Trigger Hover intent with custom configurations
		
		// Set up logo with max z-index
		
		$.maxZIndex = $.fn.maxZIndex = function(opt) {
    		/// <summary>
    		/// Returns the max zOrder in the document (no parameter)
    		/// Sets max zOrder by passing a non-zero number
    		/// which gets added to the highest zOrder.
    		/// </summary>    
    		/// <param name="opt" type="object">
    		/// inc: increment value, 
    		/// group: selector for zIndex elements to find max for
    		/// </param>
    		/// <returns type="jQuery" />
    		var def = { inc: 10, group: "*" };
    		$.extend(def, opt);    
    		var zmax = 0;
    		$(def.group).each(function() {
        		var cur = parseInt($(this).css('z-index'));
        		zmax = cur > zmax ? cur : zmax;
    		});
    		if (!this.jquery)
        		return zmax;

    		return this.each(function() {
        		zmax += def.inc;
        		$(this).css("z-index", zmax);
    		});
		}
		
		// infinitescroll() is called on the element that surrounds 
		// the items you will be loading more of
		  $('#galleryContent').infinitescroll({
		 
		 	loadingImg   : "/images/loading.gif",
		 	
			navSelector  : "div.navigation",            
						   // selector for the paged navigation (it will be hidden)
			nextSelector : "div.navigation a:first",    
						   // selector for the NEXT link (to page 2)
			itemSelector : "#galleryContent div.post"          
						   // selector for all items you'll retrieve
		  });
		  
		 
		
	
	});
