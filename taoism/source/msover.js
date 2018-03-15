// Determine if browser supports scriptable image object
var imgCap;
bVer = parseInt(navigator.appVersion);
if((isNav && bVer >= 3) || (isIE && bVer >= 4))
	imgCap = true; 
else
	imgCap = false;

var curImage = 0;

function imgActivate(imageID)
{
	if(!imgCap)
		return;

	var imgObj;

	// Switch image to color
	imgObj = eval("document['image" + imageID + "']");
	imgObj.src = eval("imageColor" + imageID + ".src");
	curImage = imageID;
}

function imgDeactivate(imageID)
{
	if(!imgCap)
		return;

	var imgObj;

	// Switch previously colorized image back to grey
	if(imageID != 0)
	{
		// Switch prev back to grey
		imgObj = eval("document['image" + imageID + "']");
		imgObj.src = eval("image" + imageID + ".src");
	}
}

function mouseOn(imageID)
{
	imgDeactivate(curImage);
	imgActivate(imageID);
}

function mouseOff()
{
	imgDeactivate(curImage);
}

function goURL(newURL)
{
	// detect browser to determine redirect method
	var appVer = navigator.appVersion;
	var NS = (navigator.appName == 'Netscape') && ((appVer.indexOf('3') != -1) || (appVer.indexOf('4') != -1));
	var MSIE = (appVer.indexOf('MSIE 4') != -1) || (appVer.indexOf('MSIE 5') != -1);
	
	if (NS || MSIE)	// if Netscape v3 or v4 or IE v4
		location.replace(newURL);
	else			// all other browsers
		location.href = newURL;
}
	
