var isNav, isIE

// Determine browser version
if(parseInt(navigator.appVersion) >= 4)
{
	if(navigator.appName == "Netscape")
	{
		isNav = true;
		isIE = false;
	}
	else
	{
		isIE = true;
		isNav = false;
	}
}
