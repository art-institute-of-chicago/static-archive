var remoteX;
function launchWin(URL)
{
	remoteX = window.open(URL, "popup", "width=580,height=440,scrollbars=1,resizable=1");
	remoteX.focus();
}
