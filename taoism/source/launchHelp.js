var remote;
function launchHelp(helpURL, size)
{
	remote = window.open(helpURL, "help", size+",scrollbars=1,resizable=1");
	remote.focus();
}
