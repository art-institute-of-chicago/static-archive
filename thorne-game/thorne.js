// Javascript Document
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

/*$(document).ready(function() {

  $("body").css("display", "none");

  $("body").fadeIn(4000);

  });
  */

function playSound(soundfile) {
  // update the function to HTML5
  var audio = new Audio(soundfile);
  audio.play();
}

if (sPage== 'index.html') {


  if (origin == "E26") {
    document.write('You enter the large bedroom where you first woke up in this strange place.');
  }
  else if (origin == "E17bed") {
    document.write('There is a message embroidered in red letters on the ceiling of the bed canopy: &quot;<FONT COLOR="#9d1b31"><strong>Find the three letters to escape from the mansion</strong></FONT>.&quot;');
  }
  else if (origin == "A37") {
    document.write('As soon as you sit on the red sofa, you are overcome by a heavy drowsiness and drift off to sleep. You dream of electric sheep and awake to find yourself slouched over the desk in the middle of the large bedroom where you began this adventure. With your face pressed flat against the desk, you can see that the letter &quot;<FONT COLOR="#9d1b31"><strong>W</strong></FONT>&quot; has been carved into the surface.');
  }
  else if (origin == "E17chair") {
    document.write('You sit down and look out the window.');
  }
  else if (origin == "START") {
    document.write('You wake up from a deep sleep to find yourself in an unfamiliar bed. Above you, on the ceiling of the bed canopy is embroidered a cryptic message: &quot;<FONT color="#9d1b31"><strong>Find the three letters to escape from the mansion</strong></font>.&quot; You look around the room, and have no idea where you are. You guess that you will just have to point and click your way around this place and see if you can find the three letters and a way out.');
  }
  else if (origin == "A12") {
    document.write('You sit on the red chair. It is so comfortable that you decide to close your eyes and rest, but you soon drift off. When you wake up, you are back in the bed where you started, staring up at the message: &quot;<FONT color="#A3AD9E"><strong><strong>Find the three letters to escape from the mansion</strong></strong></font>.&quot;');
  }
  else {
    document.write('You are in the large bedroom where you first woke up in this strange place.');
  }
}

if (sPage== 'E26.html')  {
  playSound('sounds/harp.mp3');

  if (origin == "E17") {
    document.write('You walk out of the bedroom and into a finely appointed anteroom through a door on the right. Soft notes sound from the harp on the left side of the room. The two chairs in the center of the room have well-worn seats. There is another door on the left.');
  }
  else if (origin == "E28") {
    document.write('You stroll back into the anteroom through the door on the left. From this vantage point, you can see that the large, roomy fireplace seems to go waaaay back.');
  }
  else if (origin == "E26harp")  {
    playSound('sounds/harp.mp3');
    document.write('You carefully inspect the harp, but cannot figure out how it works.');
  }
  else if (origin == "E26chair") {

    document.write('You sit down on the chair. The harp music is lovely.');
  }
  else if (origin == "A19") {
    document.write('You crawl back through the secret fireplace passage into the anteroom with a self-playing harp. There are two well-worn chairs in the center of the room.');
  }
  else if (origin == "E21") {
    document.write('As you stare at the clock, the ticking stops and the hands begin to spin counterclockwise. You become dizzy and pass out. Faint harp music slowly becomes louder and you open your eyes to find yourself seated in the anteroom.')
  }
  else {
    document.write('This is a finely appointed anteroom with two doors. Soft notes sound from the harp on the left side of the room. The two chairs in the center of the room have well-worn seats.');
  }

}



if (sPage== 'A4.html') {

  if (origin == "A19") {
    document.write('You emerge from the fireplace secret passage into parlor with an open door.');
  }
  else if (origin == "_10") {
    document.write('You enter a parlor with beautiful wooden paneling. The only door is the one through which you entered. There are several chairs, and a fireplace that seems much deeper than a normal fireplace.');
  }
  else {
    document.write('You are in a parlor with beautiful wooden paneling. There are several chairs, and a fireplace that seems much deeper than a normal fireplace.');
  }
}


// E17 -->

if (sPage== 'E17.html') {

  if (origin == "E26") {
    document.write('You enter the large bedroom where you first woke up in this strange place.');
  }
  else if (origin == "E17bed") {
    document.write('There is a message embroidered in red letters on the ceiling of the bed canopy: &quot;<FONT COLOR="#9d1b31"><strong><strong>Find the three letters to escape from the mansion</strong></strong></FONT>.&quot;');
  }
  else if (origin == "A37") {
    document.write('As soon as you sit down on the red sofa, a heavy drowsiness suddenly overcomes you involuntarily drift off into sleep. You dream of electric sheep, and awake to find yourself slouched over the desk in the middle of the large bedroom where you began this adventure. With your face pressed flat against the desk, you can see that the letter &quot;<FONT COLOR="#9d1b31"><strong>W</strong></FONT>&quot; has been carved into the surface.');
  }
  else if (origin == "E17chair") {
    document.write('You sit down and look out the window.');
  }
  else if (origin == "index") {
    document.write('You wake up from a deep sleep to find yourself in an unfamiliar bed. Above you, on the ceiling of the bed canopy is a cryptic message embroidered in bright red letters: &quot;<FONT color="#9d1b31"><strong>Find the three letters to escape from the mansion</strong></font>.&quot; You look around the room, and have no idea where you are. You guess that you will just have to point and click your way around this place and see if you can find the three letters and a way out.');
  }
  else if (origin == "A12") {
    document.write('You sit on the red chair. It is so comfortable that you decide to close your eyes and rest, but you soon drift off. When you wake up, you are back in the bed where you started, staring up at the message: &quot;<FONT color="#9d1b31"><strong>Find the three letters to escape from the mansion</strong></font>.&quot;');
  }
  else {
    document.write('You are in the large bedroom where you first woke up in this strange place.');
  }
}

// A8 -->

if (sPage== 'A8.html') {

  if (origin == "E22") {
    document.write('You ascend the winding stairs. After a few steps, the lights fade and your ears start to ring. You resume climbing and reach a closed door at the top of the stairs. You open the door and enter into the right side of a bedroom. A doorway leads out of the back of the room. The bed looks very comfortable and inviting, and you feel like you could use a rest after climbing those stairs.');
  }
  else if (origin == "A12") {
    document.write('You ascend the winding stairs. After a few steps, the lights fade and your ears start to ring. You resume climbing and reach a closed door at the top of the stairs. You open the door and enter into the right side of a bedroom. A doorway leads out of the back of the room. The bed looks very comfortable and inviting, and you feel like you could use a rest after climbing those stairs.');
  }
  else if (origin == "A17") {
    document.write('You ascend the stairs. After a few steps, the lights fade and your ears start to ring. You resume climbing and reach a closed door at top of the stairs. You open the door and enter into the right side of a bedroom. A doorway leads out of the back of the room. The bed looks very comfortable and inviting, and you feel like you could use a rest after climbing those stairs.');
  }
  else if (origin == "E28") {
    document.write('You enter the bedroom through the doorway on the back wall. The door on the right wall leads to the descending staircase that gave you a strange feeling on the way up.');
  }
  else {
    document.write('There is a doorway leading out of the back of the room. A door on the right wall opens to a dim, descending staircase.');
  }
}
// A10 -->

if (sPage== 'A10.html') {

  if (origin == "A20") {
    document.write('You enter the four-doored dining room through the far door on the right.');
  }
  else if (origin == "A25") {
    document.write('You re-enter the four-doored dining room from the drawing room through the near door on the right.');
  }
  else if (origin == "A19") {
    document.write('You enter a dining room through the near door on the left wall. There are two doors on each of the left and right walls of the room.');
  }
  else if (origin == "A12") {
    document.write('You enter a dining room through the far door on the left wall. There are two doors on each of the left and right walls of the room.');
  }
  else {
    document.write('A dining room with four doors.');
  }
}
// A12 -->

if (sPage== 'A12.html') {

  if (origin == "A10") {
    document.write('You enter from the right into a charming little room with a bulls-eye rug. Next to a small door on the back wall is a narrow staircase. The red chair looks very comfortable.');
  }
  else if (origin == "E22") {
    document.write('You squeeze through the small door in the back of the room. This room has a narrow staircase, and another door on the right. A cozy red chair sits in the corner.');
  }
  else if (origin == "E11") {
    document.write('You cautiously walk back through the convoluted staircase passage, emerging into the room with the bulls-eye rug.');
  }
  else {
    document.write('You are in a small room with two doors and a staircase. The red chair looks so soft.');
  }
}
// A17 -->

if (sPage== 'A17.html') {

  if (origin == "A10") {
    document.write('You enter an old wooden kitchen through a door on the right wall. There is a staircase leading up, and a door under the stairs.');
  }
  else if (origin == "A17") {
    document.write('The door is locked.');
  }
  else {
    document.write('A kitchen. There are two doors and a staircase leading up.');
  }
}
// A19 -->

if (sPage== 'A19.html') {

  if (origin == "E26") {
    document.write('You crawl into the fireplace. It opens into a dark passage which emerges from another fireplace on the left wall of stately dining room. You brush yourself off. There are two doors on the right. One is closed and the other appears to lead outside.');
  }
  else if (origin == "A10") {
    document.write('You enter through the near right door of the dining room with the secret fireplace passage. The far right door appears to lead outside.');
  }
  else if (origin == "A27") {
    document.write('You walk out of the kitchen and into a short glass tunnel which channels you into the far right door of a dining room. There is a second, closed door on the right. Faint soot footprints lead out of the fireplace on the left.');
  }
  else {
    document.write('You are in a dining room with two doors. There are faint footprints near the fireplace on the left side of the room.');
  }
}

// A20 -->


if (sPage== 'A20.html') {

  if (origin == "A10") {
    document.write('You enter yet another dining room through a doorway on the left wall. There are two doors leading out of the back of the room.');
  }
  else if (origin == "A22") {
    document.write('You re-enter the dining room through the right door on the back wall.');
  }
  else if (origin == "A33") {
    document.write('You re-enter the dining room through the left door on the back wall.');
  }
  else {
    document.write('Yet another dining room. There is a door on the left, and two doors leading out of the back of the room.');
  }
}

// A21 -->

if (sPage== 'A21.html') {

  if (origin == "A22") {
    document.write('You walk into a small parlor with several chairs, a desk, and a fireplace.');
  }
  else if (origin == "A21") {
    document.write('You try to crawl into the fireplace, but you only succeed in getting your clothes dirty.');
  }
  else {
    document.write('A small parlor with several chairs, a desk, and a fireplace.');
  }
}
// A22 -->

if (sPage== 'A22.html') {

  if (origin == "E31") {
    document.write('You head back into the mansion to look for the three letters that will help you escape. You enter the dining room from the right. There are two doors on the back wall.');
  }
  else if (origin == "A20") {
    document.write('You enter a dining room through the right door on the back wall.');
  }
  else if (origin == "A21") {
    document.write('You re-enter the dining room through the left door on the back wall.');
  }
  else {
    document.write('Yet another dining room. There is a door on the right, and two doors leading out of the back of the room.');
  }
}
// A25 -->


if (sPage== 'A25.html') {

  if (origin == "A10") {
    document.write('You enter a wood-paneled drawing room. There is another door on the back wall. Above the fireplace is a distinctive convex mirror.');
  }
  else if (origin == "A25") {
    document.write('The door is locked.');
  }
  else if (origin == "A25mirror") {
    document.write('You look into the mirror and see a tired, soot-covered person whom you barely recognize.');
  }
  else {
    document.write('A wood-paneled drawing room with doors on the left and back walls.');
  }
}

// A27 -->


if (sPage== 'A27.html') {


  if (origin == "A19") {
    document.write('You walk into a short glass tunnel. The dirty glass gives you a hazy glimpse of the outdoors, but channels you directly into a rustic kitchen. A set of stairs which looks more like a ladder leads up and out of the room.');
  }
  else if (origin == "E22") {
    document.write('You climb up the staircase into a dim passage that winds around before descending a ladder into a rustic kitchen. There is a door on the left which, from a distance, appears to lead outside.');
  }
  else if (origin == "A27") {
    document.write('A wise person once said that you should always stop and play with the toys, so you do.');
  }
  else {
    document.write('You are in a rustic kitchen with a brightly lit door on the left and a ladder leading up.');
  }
}

// A33 -->


if (sPage== 'A33.html') {

  if (origin == "A37") {
    document.write('You walk back into the parlor.');
  }
  else if (origin == "A20") {
    document.write('You enter a late 19th century parlor through the door on the back wall. A second door is on the right wall.');
  }
  else {
    document.write('You are in a late 19th century parlor. There are doors on the back and right walls of the room.');
  }
}

// A37 -->

if (sPage== 'A37.html') {

  if (origin == "A33") {
    document.write('You walk from the traditional parlor into a room decorated with several works of modern art. You are struck by the painting above a very comfortable-looking red sofa.');
  }
  else if (origin == "A37") {
    document.write('Wow, that looks like a genuine Leger!');
  }
  else {
    document.write('You are in a room decorated with modern art.');
  }
}

// E11 -->
if (sPage== 'E11.html') {
  if (origin == "A12") {
    document.write('You go up the stairs, which lead to a meandering passage that eventually ends at the top of a staircase into an elegant white and cream room. You carefully inspect the room, but can find no other way out.');
  }
  else {
    document.write('You are in an elegant white and cream room with a staircase.');
  }
}

/*	// E17 -->


        if (sPage== 'E17.html') {
        if (origin == "E26") {
        document.write('You enter the large bedroom where you first woke up in this strange place.');
        }
        else if (origin == "E17bed") {
        document.write('There is a message embroidered in red letters on the ceiling of the bed canopy: &quot;<FONT COLOR="red"><strong>Find the three letters to escape from the mansion</strong></FONT>.&quot;');
        }
        else if (origin == "A37") {
        document.write('As soon as you sit down on the red sofa, a heavy drowsiness suddenly overcomes you involuntarily drift off into sleep. You dream of electric sheep, and awake to find yourself slouched over the desk in the middle of the large bedroom where you began this adventure. With your face pressed flat against the desk, you can see that the letter &quot;<FONT COLOR="yellow"><strong>W</strong></FONT>&quot; has been carved into the surface.');
        }
        else if (origin == "E17chair") {
        document.write('You sit down and look out the window.');
        }
        else if (origin == "START") {
        document.write('You wake up from a deep sleep to find yourself in an unfamiliar bed. Above you, on the ceiling of the bed canopy is a cryptic message embroidered in bright red letters: &quot;<FONT color="red"><strong>Find the three letters to escape from the mansion</strong></font>.&quot; You look around the room, and have no idea where you are. You guess that you will just have to point and click your way around this place and see if you can find the three letters and a way out.');
        }
        else if (origin == "A12") {
        document.write('You sit on the red chair. It is so comfortable that you decide to close your eyes and rest, but you soon drift off. When you wake up, you are back in the bed where you started, staring up at the message: &quot;<FONT color="red"><strong>Find the three letters to escape from the mansion</strong></font>.&quot;');
        }
        else {
        document.write('You are in the large bedroom where you first woke up in this strange place.');
        }

        }*/
// E21 -->
if (sPage== 'E21.html') {
  if (origin == "E26") {
    document.write('You sit down on the chair. There is a sudden, blinding flash of light. When your vision returns, you find yourself sitting on a bright blue chair in the right corner of what appears to be a French boudoir. You do not see any doors leading out of the room.');
  }
  else if (origin == "E21chair") {
    document.write('You sit back down on the bright blue chair, but nothing happens.');
  }
  else if (origin == "E21light") {
    document.write('The chandelier sparkles in the light from the window.')
  }
  else if (origin == "E21code") {
    document.write('You carefully examine the sculpture and notice that the letter &quot;<FONT color="#9d1b31"><strong>M</strong></FONT>&quot; has been chiseled onto the torso of the figure.');
  }
  else if (origin == "E21mirror") {
    document.write('You sit in the chair by the mirror and look around the room. From this position, you notice a small pile of debris that seems out of place under the white marble sculpture by the fireplace.');
  }
  else if (origin == "E21other") {
    document.write('You sit on the big red chair and look around the room. There is no obvious way out. The clock on the right wall looks interesting, though.');
  }
  else {
    document.write('You are in a boudoir with a bright blue chair and many other items of interest.');
  }
}

// E22 -->


if (sPage== 'E22.html') {
  if (origin == "A27") {
    document.write('You climb up the stairs into a dim passage that winds around before descending a staircase into a small bedroom. There is a narrow door to the left of the bed.');
  }
  else if (origin == "A12") {
    document.write('You squeeze through the door into the left corner of a bedroom. There is a staircase going up, but you are unable to see where it leads.');
  }
  else {
    document.write('You are in a bedroom with a staircase and a narrow door flanking a comfortable-looking bed.');
  }
}


// E28 -->


if (sPage== 'E28.html') {playSound('sounds/canary.mp3')

  if (origin == "E26") {
    document.write('You enter a finely decorated room with two bright red chairs. A caged bird quietly accompanies faint harp music from the adjacent anteroom.');
  }
  else if (origin == "E28") {
    document.write('You approach the bird. It cocks its head at you and then begins to excitedly squawk in a manner that sounds distinctly like the letter &quot;<FONT color="#9d1b31"><strong>A</strong></FONT>&quot;');
  }
  else if (origin == "E28leftchair") {
    document.write('Sometimes a chair is just a chair.');
  }
  else if (origin == "E28rightchair") {
    document.write('You sit in the chair and listen to the bird sing.');
  }
  else {
    document.write('You are in a finely decorated room with two bright red chairs. A caged bird quietly accompanies faint harp music from the adjacent anteroom.');
  }
}

// E31 -->


if (sPage== 'E31.html') {
  if (origin == "A22") {
    playSound('sounds/china.mp3');
      document.write('You enter a traditional Japanese room through a door from the left. On the opposite side of the room is an open door which appears to lead out of the mansion.');
  }
  else if (origin == "E31") {

    var a11l11l1="WAR";var a111l1l1="RAW";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="OPP";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="XYZ";var a11111l1="ABC";var a11ll111="ESP";var a111l1l1="RAW";var a11111l1="ABC";var a11ll111="RET";var a111l1l1="WAM";var a11111l1="ABC";var a11ll111="TBK";var a111l1l1="TBK";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="MAP";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="OWL";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="RAW";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="POW";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="DOG";var a11111l1="MAG";var a11ll111="REP";var a111l1l1="RAW";var a11111l1="ABC";var a11ll111="CLE";var a111l1l1="RAW";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="RAM";var a11111l1="MAW";var a11ll111="BAT";var a111l1l1="RAW";var a1l111l1="ABC";var a11ll111="REP";var a11ll111="EGG";var a111l1l1="DOG";var a11ll111="BAT";var a111l1l1="ETC";var a1l111l1="ABC";var a11ll111="REP";var a11ll111="EGG";var a111l1l1="REP";var a11ll111="MAR";var answer="DPV";var a111l1l1="REW";var a1111lll="abc";var a1l111l1="ABC";var a11ll111="REP";var a1111lll="two";var a11ll111="EGG";var a111l1l1="CAT";var a11ll111="TOP";var a1111lll="ten";var a11ll111="XMF";var a1111lll="ret";var a1111lll="maw";var a111l1l1="QUE";var a1111l1l="abc";var a1111l1l="dew";var a1111l1l="tbk";
    var password=prompt("You try to walk through the open door, but a repulsive force pushes you back into the room. A low, strange voice whispers in your ear, 'Speak the password.'","");
    var answer="QMZ";if (password==answer) {var a1111l1l="123";var a1111l1l="456";var a1111l1l="123";var a1111l1l="456";var a1111l1l="123";var a1111l1l="456";var a1111l1l="123";var a1111l1l="456";var a1111l1l="123";var a1111l1l="456";var a1111l1l="123";var a1111l1l="456";alert("The voice says 'No dice.'")} else {var a1111l1l="123";var a1111l1l="456";var a1111l1l="tbk";var a1111l1l="tbk";if ((password==a11111l1)||(password==a1111lll)) {var a11111l1="ABC";var a11ll111="REP";var a111l1l1="OPP";var a11111l1="ABC";var a11ll111="REP";var a111l1l1="OPP";window.location.replace("TheEnd.html?E31");var a11111l1="ABC";var a11ll111="REP"} else {alert("The voice says 'No dice.'")}}
    document.write('No luck. You wonder if this password has anything to do with the three letters...');
  }
  else {

  }

}
