var remote = null;

function openPic(picURL, iWidth, iHeight)
{
	if(remote != null)
	{
		remote.close();
		remote = null;
	}

    remote = window.open('/taoism/image.php?picURL=' + picURL, 'aicpic','width=' + iWidth + ',height=' + iHeight + ',scrollbars=0,resizable=1');
	remote.handle = self;
	remote.focus();
}

var bNoActivate = false;
