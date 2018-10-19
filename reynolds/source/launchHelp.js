var remote;
function launchHelp(helpURL, size, winName)
{
	// size string should have the format of 'width=#,height=#'
	// this avoids having to change all the function calls to launchHelp()
	var firstEqual = size.indexOf("=")+1;
	var comma = size.indexOf(",")+1;
	var secondEqual =  size.lastIndexOf("=")+1;
	var sizeLen = size.length;
	
	var w = parseInt(size.substring(firstEqual, comma));
	var h = parseInt(size.substring(secondEqual, sizeLen));
	
	var xPos = (screen.height-h)/2;
	var yPos = (screen.width-w)/2;
	remote = window.open(helpURL, winName, size+",scrollbars=1,resizable=1,left="+yPos+",top="+xPos);
	remote.focus();
}
