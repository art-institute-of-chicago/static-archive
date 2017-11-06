var CURRENT_INDEX = 1;
var CURRENT_ITEM = '';
var CURRENT_NAV = '';
var NEXT_INDEX = '';
var NEXT_ITEM = '';
var TOTAL_ITEMS = '';
var AUTO_PLAY = true;
var PAIRED_DELAY = 4;
var ITEM_DELAY = 3;
var ZA = '';
var ZB = '';
var moveLeftAmount = ["ha", "-=140px", "ha", "-=60px", "ha", "-=100px", "ha", "-=100px", "ha"];
var startPosition = []; /// place from which images (1,3,5,7) fade in
var showcasePosition = []; /// place at which images (1,3,5,7) sit for view
var endPosition = []; /// place to which images (1,3,5,7) fade out

function initGSC() {
	TOTAL_ITEMS =  $("#gsc li").length;

	$('.gscnav li').css("cursor", "default");

	CURRENT_ITEM = $('#gsc li:nth-child('+CURRENT_INDEX+')');
	CURRENT_NAV = $('.gscnav li:nth-child('+CURRENT_INDEX+')');
	ZA = CURRENT_INDEX+10;

	TweenLite.fromTo(CURRENT_ITEM, 1, {left:"+=100px"}, {left:"-=140px", opacity:1, delay:0.5, zIndex:ZA, onComplete:showNextItem, onCompleteParams:["item"]});
	TweenLite.to(CURRENT_NAV, 0, {cursor:"default"});
	TweenLite.to(CURRENT_NAV, 1, {backgroundColor:"#666", delay:0.5});
}

function showNextItem(_which) {
	if(AUTO_PLAY) {
		CURRENT_ITEM = $('#gsc li:nth-child('+CURRENT_INDEX+')');
		(CURRENT_INDEX < TOTAL_ITEMS) ? NEXT_INDEX = CURRENT_INDEX+1 : NEXT_INDEX = 1;
		NEXT_ITEM = $('#gsc li:nth-child('+NEXT_INDEX+')');
		$(NEXT_ITEM).css({left:0});
		CURRENT_NAV = $('.gscnav li:nth-child('+CURRENT_INDEX+')');
		//stepMaster();
		NEXT_NAV = $('.gscnav li:nth-child('+NEXT_INDEX+')');
		ZB = NEXT_INDEX+9;

		if(_which == "pair") {
			// move out, fade out CURRENT_ITEM
			// move in, fade in NEXT_ITEM
			TweenLite.to(CURRENT_ITEM, 0.75, {left:"-=300px", delay:2, opacity:0});
			TweenLite.fromTo(NEXT_ITEM, 1, {left:"+=100px"}, {left:moveLeftAmount[NEXT_INDEX], opacity:1, zIndex:ZB, delay:PAIRED_DELAY, onComplete:showNextItem, onCompleteParams:["item"]});
			// change navigation
			TweenLite.to(CURRENT_NAV, 0.75, {backgroundColor:"#FFF", delay:ITEM_DELAY});
			TweenLite.to(NEXT_NAV, 1, {backgroundColor:"#666", delay:PAIRED_DELAY});
		}

		if(_which == "item") {
			// fade out CURRENT_ITEM
			// fade in NEXT_ITEM
			TweenLite.to(CURRENT_ITEM, 0.75, {opacity:0, delay:ITEM_DELAY});
			TweenLite.to(NEXT_ITEM, 1, {opacity:1, delay:1, onComplete:showNextItem, onCompleteParams:["pair"]});
			// change navigation
			TweenLite.to(CURRENT_NAV, 0.75, {backgroundColor:"#FFF", delay:ITEM_DELAY});
			TweenLite.to(NEXT_NAV, 1, {backgroundColor:"#666", delay:1});
		}
		(CURRENT_INDEX < TOTAL_ITEMS) ? CURRENT_INDEX++ : CURRENT_INDEX = 1;
	}
}


function showChosenItem() {
	// interrupts autoplay and shows user's choice via navigation interaction
	// go on from there
	AUTO_PLAY = false;
	TweenLite.killTweensOf(showNextItem);
	TweenLite.killTweensOf($("#gsc li"));
	TweenLite.killTweensOf($(".gscnav li"));
	TweenLite.to($("#gsc li"), 0.1, {left:0, opacity:0, delay:0.1});
	TweenLite.to($(".gscnav li"), 0.1, {backgroundColor:"#FFF", delay:0.1}); // immediate reset of nav

	CURRENT_INDEX = $(this).data("id"); // reset current index to chosen button
	CURRENT_ITEM = $('#gsc li:nth-child('+CURRENT_INDEX+')');
	CURRENT_NAV = $('.gscnav li:nth-child('+CURRENT_INDEX+')');

	TweenLite.to(CURRENT_ITEM, 0.25, {opacity:1, delay:0.5, onComplete: timeMasterTrigger});
	TweenLite.to(CURRENT_NAV, 0.25, {backgroundColor:"#666", delay:0.5});
}

function timeMasterTrigger() {
	TweenLite.killDelayedCallsTo(timeMaster);
	TweenLite.delayedCall(5, timeMaster);
}

function timeMaster() {
	AUTO_PLAY = true;
	TweenLite.to(CURRENT_ITEM, 0.25, {opacity:0});
	TweenLite.to(CURRENT_NAV, 0.25, {backgroundColor:"#FFF"});
	CURRENT_INDEX = 1;
	CURRENT_ITEM = '';
	CURRENT_NAV = '';
	NEXT_INDEX = '';
	NEXT_ITEM = '';
	initGSC();
}



$(function() {
	initGSC();
});











