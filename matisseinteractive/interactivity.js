//Javascript Document

<!--
function get_check_value()
{
	// 1
	if (document.backs.compare[0].checked && !(document.backs.compare[1].checked) && !(document.backs.compare[2].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_1.jpg";
	}
	// 2
	if (document.backs.compare[1].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[2].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_2.jpg";
	}
	// 3
	if (document.backs.compare[2].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[1].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_3.jpg";
	}
	// 4
	if (document.backs.compare[3].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[1].checked) && !(document.backs.compare[2].checked)) {
		  document.backpic.src="images/matissebacks_4.jpg";
	}
	// 12
	if (document.backs.compare[0].checked && document.backs.compare[1].checked && !(document.backs.compare[2].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_12.jpg";
	}
	// 13
	if (document.backs.compare[0].checked && document.backs.compare[2].checked && !(document.backs.compare[1].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_13.jpg";
	}
	// 14
	if (document.backs.compare[0].checked && document.backs.compare[3].checked && !(document.backs.compare[1].checked) && !(document.backs.compare[2].checked)) {
		  document.backpic.src="images/matissebacks_14.jpg";
	}
	// 23
	if (document.backs.compare[1].checked && document.backs.compare[2].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_23.jpg";
	}
	// 24
	if (document.backs.compare[1].checked && document.backs.compare[3].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[2].checked)) {
		  document.backpic.src="images/matissebacks_24.jpg";
	}
	// 34
	if (document.backs.compare[2].checked && document.backs.compare[3].checked && !(document.backs.compare[0].checked) && !(document.backs.compare[1].checked)) {
		  document.backpic.src="images/matissebacks_34.jpg";
	}
	// 123
	if (document.backs.compare[0].checked && document.backs.compare[1].checked && document.backs.compare[2].checked && !(document.backs.compare[3].checked)) {
		  document.backpic.src="images/matissebacks_123.jpg";
	}
	// 124
	if (document.backs.compare[0].checked && document.backs.compare[1].checked && document.backs.compare[3].checked && !(document.backs.compare[2].checked)) {
		  document.backpic.src="images/matissebacks_124.jpg";
	}
	// 134
	if (document.backs.compare[0].checked && document.backs.compare[2].checked && document.backs.compare[3].checked && !(document.backs.compare[1].checked)) {
		  document.backpic.src="images/matissebacks_134.jpg";
	}
	// 234
	if (document.backs.compare[1].checked && document.backs.compare[2].checked && document.backs.compare[3].checked && !(document.backs.compare[0].checked)) {
		  document.backpic.src="images/matissebacks_234.jpg";
	}
	// 1234
	if (document.backs.compare[0].checked && document.backs.compare[1].checked && document.backs.compare[2].checked && document.backs.compare[3].checked) {
		  document.backpic.src="images/matissebacks_1234.jpg";
	}
	// None
	if ((!(document.backs.compare[0].checked) && !(document.backs.compare[1].checked) && !(document.backs.compare[2].checked) && !(document.backs.compare[3].checked))) {
		  document.backpic.src="images/matissebacks_blank.jpg";
	}
}
//-->