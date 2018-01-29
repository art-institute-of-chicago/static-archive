<HTML>
<HEAD>
	<TITLE>Taoism and the Arts of  (Art Institute of Chicago)</TITLE>
	<META NAME=Description CONTENT="">
	<META NAME=Keywords CONTENT="">
	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/browver.js></SCRIPT>
	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/msover.js></SCRIPT>
	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/bLoad.js></SCRIPT>
	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/launchHelp.js></SCRIPT>
	<SCRIPT LANGUAGE=JavaScript>
function validateEmail(theAddress)
{
	var returnValue = true;
	var AtSym       = theAddress.indexOf('@');
	var Period      = theAddress.lastIndexOf('.');
	var Space       = theAddress.indexOf(' ');
	var Length      = theAddress.length - 1;  // Array is from 0 to length-1

	// '@' cannot be in first position, Must be at least one valid char btwn '@' and '.'
	// Must be at least one valid char after '.', No empty spaces permitted
	if((AtSym < 1) || (Period <= AtSym+1) || (Period == Length ) || (Space  != -1))
		returnValue = false;

	return returnValue;
}

function validateForm(theForm)
{
	if(document.all.edt)
		document.all.plainmsg.value = document.all.edt.html;

	var returnValue = true;
	var errMessage = "";

	errMessage  = "_____________________________________________________________\n\n";
	errMessage += "The form was not submitted because of the following error(s).\n";
	errMessage += "Please correct these error(s) and re-submit.\n";
	errMessage += "_____________________________________________________________\n\n";
	
	// Validate description
//	if(theForm.description.value == "")
//	{
//		errMessage += "You must enter a description.\n";
//		returnValue = false;
//	}

	if(!returnValue)
		alert(errMessage);
		
	return returnValue;
}
</SCRIPT>

	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/openPic.js></SCRIPT>
	<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/launchWin.js></SCRIPT>
	<LINK REL=STYLESHEET HREF="/taoism/styles/default.css">
</HEAD>

<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINHEIGHT=0 MARGINWIDTH=0 BGCOLOR=#FFFFFF TEXT=#000000 LINK=#000000 VLINK=#000000 ALINK=#807244>
<A NAME="navTop"></A>


<TABLE WIDTH=100% CELLPADDING=0 CELLSPACING=0 BORDER=0>
<TR>
	<TD HEIGHT=20 ALIGN=center BGCOLOR=#000000><P ID=pageTitle CLASS=pageBanner>T &nbsp;A &nbsp;O &nbsp;I &nbsp;S &nbsp;M&nbsp;&nbsp;&nbsp; A &nbsp;N &nbsp;D&nbsp;&nbsp;&nbsp; T &nbsp;H &nbsp;E&nbsp;&nbsp;&nbsp; A &nbsp;R &nbsp;T &nbsp;S&nbsp;&nbsp;&nbsp; O &nbsp;F&nbsp;&nbsp;&nbsp; C &nbsp;H &nbsp;I &nbsp;N &nbsp;A</P></TD>
</TR>
<TR>
	<TD ALIGN=center>
	<IMG SRC=/taoism/images/yin-yang-new.gif WIDTH=50 HEIGHT=50 BORDER=0><BR>

	<P><FONT FACE=Arial,Helvetica,Helv,Monaco><B>EVALUATION FORM</B></FONT></P>	<P><B><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco SIZE=-1>&nbsp;</FONT></B></P><HR ALIGN=LEFT SIZE=2 NOSHADE WIDTH=300><BR>	</TD>
</TR>
</TABLE>

<TABLE WIDTH="100%" HEIGHT="100%" BORDER="0" CELLSPACING="0" CELLPADDING="0" BORDERCOLOR="Black">
<TR>
	<TD WIDTH="150" COLSPAN="2" VALIGN="top"> 
	
<!-- left column -->
		<TABLE WIDTH=140>
		<TR>
		<TD>&nbsp;</TD>
		<TD COLSPAN="2" VALIGN="top">
		</TD>
		</TR>	
	 	<TR>
		<TD>&nbsp;</TD>
			<TD VALIGN="top"><BR><P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco SIZE=-1>			<br>
			<BR>
			<BR>
			<BR>
			<BR>
			</TD>
		</TR>
		</TABLE>
	</TD>

<!-- padding -->
	<TD WIDTH=10>&nbsp;&nbsp;&nbsp;&nbsp;</TD>
	
	<TD VALIGN=top>
	
<!-- middle column -->	

<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco SIZE=-1>Thank you for visiting our site. We hope you have enjoyed <I>Taoism and the Arts of China</I> and appreciate your answers to the following questions and comments about how we can improve the site.</P><FORM NAME=feedback ACTION=thanks.php METHOD=post onSubmit="return validateForm(this);">

<TABLE CLASS=feedback CELLPADDING=8 CELLSPACING=0 BORDER=0>
<TR>
	<TD>Name</TD>
	<TD><INPUT TYPE=text NAME=evalName SIZE=20></TD>
</TR>
<TR>
	<TD>Occupation</TD>
	<TD><INPUT TYPE=text NAME=occupation SIZE=20></TD>
</TR>
<TR>
	<TD>City</TD>
	<TD><INPUT TYPE=text NAME=city SIZE=20></TD>
</TR>
<TR>
	<TD>Country</TD>
	<TD><INPUT TYPE=text NAME=country SIZE=20></TD>
</TR>
<TR>
	<TD><nobr>E-mail Address</nobr></TD>
	<TD><INPUT TYPE=text NAME=email SIZE=20></TD>
</TR>
<TR>
	<TD VALIGN=top>Age</TD>
	<TD>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=age VALUE="Under 18"> Under 18<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=age VALUE="18-25"> 18-25<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=age VALUE="26-45"> 26-45<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=age VALUE="46-65"> 46-65<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=age VALUE="Over 65"> Over 65<BR>
	</TD>
</TR>
<TR>
	<TD COLSPAN=2>Use a scale of 1–5 to answer the following.<BR>
	(1=strongly disagree, 5=strongly agree)</TD>
<TR>
	<TD VALIGN=top COLSPAN=2>The information provided about the works of art improved my appreciation of them.</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=appreciationRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=appreciationRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=appreciationRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=appreciationRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=appreciationRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>The information provided was clear and understandable.</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=clearRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=clearRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=clearRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=clearRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=clearRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Comments:</TD>
	<TD><TEXTAREA NAME=comment1 ROWS=4 COLS=30></TEXTAREA></TD>
</TR>
<TR>
	<TD COLSPAN=2>How interesting/useful did you find the following?<BR>
	(1 = not at all of interest or use, 5 = extremely interesting and useful)</TD>
</TR>
<TR>
	<TD VALIGN=top>Diagrams</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=diagramsRating VALUE=1> 1 <INPUT TYPE=radio NAME=diagramsRating VALUE=2> 2 <INPUT TYPE=radio NAME=diagramsRating VALUE=3> 3 <INPUT TYPE=radio NAME=diagramsRating VALUE=4> 4 <INPUT TYPE=radio NAME=diagramsRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Maps</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=mapsRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=mapsRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=mapsRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=mapsRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=mapsRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Timeline</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=timelineRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=timelineRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=timelineRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=timelineRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=timelineRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Lesson Plans</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=lessonsRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=lessonsRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=lessonsRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=lessonsRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=lessonsRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top><nobr>Family Self-Guide</nobr></TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=guideRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=guideRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=guideRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=guideRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=guideRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Glossary</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=glossaryRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=glossaryRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=glossaryRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=glossaryRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=glossaryRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Books and Links</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=linksRating VALUE=1> 1 <INPUT CLASS=bodyXsmall TYPE=radio NAME=linksRating VALUE=2> 2 <INPUT CLASS=bodyXsmall TYPE=radio NAME=linksRating VALUE=3> 3 <INPUT CLASS=bodyXsmall TYPE=radio NAME=linksRating VALUE=4> 4 <INPUT CLASS=bodyXsmall TYPE=radio NAME=linksRating VALUE=5> 5</TD>
</TR>
<TR>
	<TD VALIGN=top>Comments</TD>
	<TD><TEXTAREA NAME=comment2 ROWS=4 COLS=30></TEXTAREA></TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>What did you like most about <I>Taoism and the Arts of China</I>?</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><TEXTAREA NAME=comment3 ROWS=4 COLS=30></TEXTAREA></TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>What did you like least?</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><TEXTAREA NAME=comment4 ROWS=4 COLS=30></TEXTAREA></TD>
</TR>
<TR>
	<TD COLSPAN=2>Did you have any problems or technical difficulties while using the site?</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=siteProblems VALUE=yes> yes <INPUT CLASS=bodyXsmall TYPE=radio NAME=siteProblems VALUE=no> no</TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>If yes, please describe:</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><TEXTAREA NAME=comment5 ROWS=4 COLS=30></TEXTAREA></TD>
</TR>
<TR>
	<TD COLSPAN=2>What kind of Internet connection do you use?</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="DSL"> DSL<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="T1"> T1<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="Cable modem"> Cable modem<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="ISDN"> ISDN<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="56K"> 56K<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="28K"> 28K<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=connection VALUE="Don't know"> Don't know<BR>
	</TD>
</TR>
<TR>
	<TD COLSPAN=2>What browser and operating system do you use?</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Internet Explorer 5 Mac"> Internet Explorer 5 Windows<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Internet Explorer 5 Windows"> Internet Explorer 5 Mac<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Netscape Navigator 4.x Mac"> Netscape Navigator 4.x Windows<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Netscape Navigator 4.x Windows"> Netscape Navigator 4.x Mac<BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Other"> Other &nbsp;<INPUT TYPE=text NAME=otherBrowser SIZE=20><BR>
	<INPUT CLASS=bodyXsmall TYPE=radio NAME=browser VALUE="Don't know"> Don't know<BR>
	</TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>Additional comments:</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><TEXTAREA NAME=comment6 ROWS=4 COLS=30></TEXTAREA><BR>&nbsp;</TD>
</TR>
<TR>
	<TD COLSPAN=2><B>For teachers</B></TD>
</TR>
<TR>
	<TD COLSPAN=2>I might use or adapt one or some of the lesson plans.</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><INPUT CLASS=bodyXsmall TYPE=radio NAME=useLessons VALUE=yes> yes <INPUT CLASS=bodyXsmall TYPE=radio NAME=useLessons VALUE=no> no</TD>
</TR>
<TR>
	<TD>Grade(s) taught</TD>
	<TD><INPUT TYPE=text NAME=gradesTaught SIZE=20></TD>
</TR>
<TR>
	<TD><nobr>Subject(s) taught<nobr></TD>
	<TD><INPUT TYPE=text NAME=subjectsTaught SIZE=20></TD>
</TR>
<TR>
	<TD VALIGN=top COLSPAN=2>Comments about the lesson plans:</TD>
</TR>
<TR>
	<TD>&nbsp;</TD>
	<TD><TEXTAREA NAME=comment7 ROWS=4 COLS=30></TEXTAREA><BR>&nbsp;</TD>
</TR>
<TR>
	<TD ALIGN=center COLSPAN=2><INPUT TYPE=submit VALUE=Submit></TD>
</TR>
</TABLE>
</FORM>
<BR>

<BR><CENTER><A HREF=#navTop><IMG SRC=/taoism/images/top.gif WIDTH=78 HEIGHT=14 BORDER=0></A><P CLASS=Footer>Copyright &copy;&nbsp;2000, The Art Institute of Chicago.<BR> All text and images on this site are protected by U.S. and international copyright laws.<BR>Unauthorized use is prohibited.</P><BR><BR><A HREF=http://www.artic.edu/aic/index.html><IMG SRC=/taoism/images/aic-arches.gif WIDTH=101 HEIGHT=60 border=0 alt=Art&nbsp;Institute&nbsp;of&nbsp;Chicago></A><BR><P CLASS=Footer>The Art Institute of Chicago</P></CENTER>
	<BR>
	<BR>
	</TD>
	
	<TD>&nbsp;&nbsp;&nbsp;&nbsp;</TD>

	<TD VALIGN=top ALIGN=center WIDTH=150>
<!-- right column -->
<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco>	<BR>
	<BR>
	<BR>
	<A CLASS=rightMenu HREF=/taoism/introduction.php>Introduction</A></FONT></P><P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/menu.php>Exhibition Themes</A>	</FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/artindex.php>View Works<BR>of Art</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/diag-intro.php>Diagrams</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/map.php>Map of China</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/timeline.php>Timeline</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/calendar.php>Calendar of<BR>Related Events</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/teachers/guide.php>Lesson Plans</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/glossary.php>Glossary</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/books.php>Books and Links</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/credits.php>Credits</A></FONT></P>	<P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco><A CLASS=rightMenu HREF=/taoism/feedback.php>Evaluation Form</A></FONT></P>	<BR>
	<IMG SRC=/taoism/images/1pixel.gif WIDTH=150 HEIGHT=1 BORDER=0><P><FONT FACE=Verdana,Arial,Helvetica,Helv,Monaco SIZE=-1>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</P>
	</TD>


</TR>
</TABLE>

</BODY>
</HTML>

<SCRIPT LANGUAGE=JavaScript SRC=/taoism/source/nsMenus.js></SCRIPT>