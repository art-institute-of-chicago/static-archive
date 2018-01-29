var curMenu = "";

function doMenu(evnt, menuID)
{
	var menuObj, offset;

	if(curMenu != "")
		hideMenu();

	document.divMenu01.left = (window.innerWidth - document.layers['divMenu01'].clip.width - 19) / 2;

	menuObj = eval("document." + menuID);

	// Display local menu via transition
	offset = menuObj.clip.height;
	menuObj.clip.height = 0;
	menuObj.visibility = "visible";
	clipReveal(menuObj, 20, offset);
	
	curMenu = menuID;
}

function clipReveal(lyr, step, stop)
{
	lyr.clip.height += step;
	
	if((step > 0) && (lyr.clip.height < stop))
	{
	     setTimeout('clipReveal(document.layers["'+lyr.name+'"],'+step+','+stop+')',15);
   	}
}

function hideMenu()
{
	var menuObj;

	menuObj = eval("document." + curMenu);
	menuObj.visibility = "hidden";
	curMenu = "";
}
