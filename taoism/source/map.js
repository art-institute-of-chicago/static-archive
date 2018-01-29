<!--
nMaxItem = 4;
NameIndex = 0;
MouseOverState = 1;
MouseClickState = 2;
MouseDownState = 3;
MouseOutState = 4;
sndCounter = 0;
SoundList = new Array();
//-->

<!--

function RestoreImage(){ //v2.0
	nCount = document.OriginImage.length;
	ImgArray = document.OriginImage;

	if (document.OriginImage != null)
		for (i = 0; i < (nCount - 1); i += 2)
			ImgArray[i].src = ImgArray[i+1];
	document.OriginImage = null;
}

function ReplaceImage(){ //v2.0
	j = 0;
	ImgArray = new Array;
	oldImgArray = document.OriginImage;

	for (i = 0; i < ReplaceImage.arguments.length; i += 2) {
		obj=ReplaceImage.arguments[i]
		ImgArray[j++] = obj;
		if (oldImgArray == null || oldImgArray[j-1] != obj)
			ImgArray[j++] = obj.src;
		else
			ImgArray[j++] = oldImgArray[j];
		obj.src = ReplaceImage.arguments[i + 1];
	}
	if (document.OriginImage == null)
		document.OriginImage = ImgArray;
}

//-->
