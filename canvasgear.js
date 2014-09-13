/*
 * file : canvasgear.js
 * id : # 20140815.1213
 * version : CanvasGear 0.1.2 (# 20140904.0311)
 * description : This script paints animated icons on canvases.
 * license : The MIT License
 * copyright : Norbert C. Maier
 * authors :
 * note : This is developed on Chrome 32.0, FF 30.0, IE 8, Opera 10.53.
 * note : Script overview
 *         - function Ikon                     ; class Ikon
 *         - function Algo                     ; class Algo
 *         - function Linie                    ; class
 *         - function startCanvasGear()        ; page function
 *         - window.onload = function(){}      ; anonymous function
 *         - function executeFrame()           ; page function
 *         *
 *         - algoDevelop()     = develop       ; temporary algo for development
 *         - algoOblongrose()  = oblongrose    ; rose build from rectangles
 *         - algoPulse()       = pulse         ; balloon
 *         - algoTriangle()    = triangle      ; rotating triangle
 *         - algoTriangulum()  = triangulum    ; oscillating triangle
 *         *
 *         - algoHelo3Line_drawLine(..)        ; planned helper function
 *         - function setRadiobutton()         ; page function
 *         - function Webcolors()              ; class for colorNameToHex()
 *         - function colorNameToHex()         ; utility function
 * note :
 */


// global variables
var bFlagTipTopTest = false;
var iTimeStart = new Date();
iTimeStart.getTime();
var iTimeStartMs = iTimeStart.getMilliseconds();


/*
 * This function represents an icon object.
 * @id # 20140815.1221
 * note : Line 'this.Algo = algoPulse;' is bad, it makes the script disappear. [20140828o0722]
 */
function Ikon() {

   // public properties, to be set by user via HTML comment
   this.AlgoName = 'default';  // string - algorithm (workaround for Algo)
   this.BgColor;               // string - background color as RGB or webcolor
   this.Color;                 // string - RGB or webcolor
   this.Color2;                // string - RGB or webcolor
   this.Color3;                // string - RGB or webcolor (NOWHERE USED YET)
   this.Hertz;                 // number - frequency in Hz (not yet used)
   this.ShiftX;                // int - horizontal offset (pixel)
   this.ShiftY;                // int - vertical offset (pixel)
   this.Speed;                 // number - use empirical values, shall be replaced by Hertz

   // constant properties, set via canvas attributes
   this.Height;                // int - canvas height (pixel)
   this.Width;                 // int - canvas width (pixel)

   // private properties, set program internally
   this.Algo = null;           // Algo - drawing algorithm (not yet used?)
   this.Angle = 0;             // private
   this.Canvas;                // object - the canvas tag
   this.Command;               // string - some command string
   this.Context;               // object - attached to canvas
   this.DrawOnlyOnce = false;  // object - flag

   // experimental function, not yet active
   this.draw1 = function x() { // funct - algorithm
      // ...;
   }
}


// 
// status : Under construction, implementation yet unclear
/*
 * This function represents an algorithm object. It shall store
 *     a drawing algorithm, acts on an Ikon object
 * @id # 20140815.1231
 *
 */
function Algo() {
   this.Canvas;                // object - the canvas tag
   this.Context;               // object - attached to canvas
   this.Funktion;              // function - ...
   this.Ikon;                  // Ikon - ?
   this.draw = function x() {  // funct - algorithm
      // ...;
   }
}


/*
 * This 'class' represents one line.
 * @status Embryonic ... experimental
 * @id # 20140901.0511
 * @usage In function algoLines() ...
 * @note
 */
function Line(iX1, iY1, iX2, iY2, sColor) {
   this.X1 = iX1;                      // number - x position start
   this.Y1 = iY1;                      // number - y position start
   this.X2 = iX2;                      // number - x position end
   this.Y2 = iY2;                      // number - y position end
   this.Colo = colorNameToHex(sColor); // string - color
   this.Widt;                          // number - line width (pixel)
}


// ('static' variables for below function)
var icos = new Array();
var iFrameNo = 0; // counter


/*
 * This function starts the icondrawing, it runs from the body tag on after the page is loaded.
 * @id # 20140815.1241
 *
 */
function startCanvasGear()
{

   /**
    * This anonymous function registers the radiobutton click handles.
    * @id 20140819o1811
    * @note Does not work as expected. We need still onclick in HTML.
    * @note This can also be defined outside this function on script level.
    */
   window.onload = function() {

      var bt1 = document.getElementById("id20140819o1821");
      var bt2 = document.getElementById("id20140819o1822");
      bt1.onclick = setRadiobutton;
      bt2.onclick = setRadiobutton;
   }


   // detect non-existence of IE flag (seq # 20140815.0721)
   if (typeof window.bIsExcanvasLoaded == 'undefined') {
      var bIsExcanvasLoaded = false;
   }


   // workaround against issue # 20140815.0641 (seq # 20140815.0651)
   // desc : This provides a fallback for the possibly missing
   //    'requestAnimationFrame' browser method.
   // ref : http://www.paulirish.com/2011/requestanimationframe-for-smart-animating (ref # 20140815.0634)
   //-------------------------------
   // shim layer with setTimeout fallback
   window.requestAnimFrame = (function(){
      return window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
               || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame      // ? (added after line # 20140815.0652)
                 || function( callback ) {
                  window.setTimeout(callback, 1000 / 60);
                   };
   })();
   //-------------------------------


   // retrieve all canvases (seq # 20140815.0941)
   var canvases = document.getElementsByTagName("canvas");


   // loop over the found canvases and provide one Icon
   //    object per canvas (seq # 20140815.0942)
   for (var i = 0; i < canvases.length; i++) {

      // create Ikon
      var ico = new Ikon();

      ico.Canvas = canvases[i];
      ico.Context = canvases[i].getContext('2d')
      ico.Width = ico.Canvas.height;
      ico.Height = ico.Canvas.width;
      ico.Command = "";
      var sCmdln = ""; //


      // (note # 20140830o0251)
      // note : Remember issue # 20140830.0221 'IE get HTML comment'
      // note : Remember issue # 20140828.1151 'IE canvas innerHTML'
      // note : Node type 8 is a comment node.
      if (false) {

         // (seq # 20140830o0211)
         // This first retrieves all siblings, then findes the comment
         //   node(s) within the siblings and reads it's value.
         // note : This procedere has the disadvantage, that it works only
         //    nice if the canvas is wrapped in a div, but no more if the
         //    canvas is somewhere standalone. So try to change the algorithm
         //    to one searching just the command immediately behind the icon.
         var nSiblings = ico.Canvas.parentNode.childNodes;
         for (var i2 = 0; i2 < nSiblings.length; i2++) {
            if (nSiblings[i2].nodeType === 8) {
               ico.Command = nSiblings[i2].nodeValue;
            }
         }
      }
      else {

         //(seq # 20140830.0311)
         // This gets along without the siblings list and directly reads
         //  the node behind the canvase, expecting a comment node there.
         // note : Only if the comment follows the canvas immediately, the
         //    next sibling will be the wanted one. If between the canvas
         //    and the comment is a blank or something, then we need the
         //    next but one sibling.
         var nNext = ico.Canvas.nextSibling;
         if (nNext.nodeType === 8) {
            ico.Command = nNext.nodeValue;
         }
         else {
            if (nNext != null) {
               var nNext2 = nNext.nextSibling;
               if (nNext2 != null) {
                  if (nNext2.nodeType === 8) {
                     ico.Command = nNext2.nodeValue;
                  }
               }
            }
         }
      }
      // now ico.Command is e.g. "algo=pulse hertz=111 color=orange"


      // provide properties object
      var oProps = new Object();
      parseCmdString(oProps, ico.Command);


      // determine AlgoName
      if (oProps.AlgoName != null) {
         ico.AlgoName = oProps.AlgoName;
      } else {
         ico.AlgoName = 'default';
      }

      // determine BgColor
      if (oProps.BgColor != null) {
         if (oProps.BgColor.substr(0, 1) != '#') {
            oProps.BgColor = colorNameToHex(oProps.BgColor);
         }
         ico.BgColor = oProps.BgColor;
      } else {
         ico.BgColor = "#f0f0f0";
      }

      // determine Color
      if (oProps.Color != null) {
         if (oProps.Color.substr(0, 1) != '#') {
            oProps.Color = colorNameToHex(oProps.Color);
         }
         ico.Color = oProps.Color;
      } else {
         ico.Color = "#404040";
      }

      // determine Color2
      if (oProps.Color2 != null) {
         if (oProps.Color2.substr(0, 1) != '#') {
            oProps.Color2 = colorNameToHex(oProps.Color2);
         }
         ico.Color2 = oProps.Color2;
      } else {
         ico.Color2 = "#606060";
      }

      // determine Color3
      if (oProps.Color3 != null) {
         if (oProps.Color3.substr(0, 1) != '#') {
            oProps.Color3 = colorNameToHex(oProps.Color3);
         }
         ico.Color3 = oProps.Color3;
      } else {
         ico.Color3 = "#808080";
      }

      // determine Hertz
      if (oProps.Hertz != null) {
         ico.Hertz = oProps.Hertz;
      } else {
         ico.Hertz = 0.2;
      }

      // determine ShiftX (pixel)
      if (oProps.ShiftX != null) {
         ico.ShiftX = oProps.ShiftX;
      } else {
         ico.ShiftX = 0;
      }

      // determine ShiftY (pixel)
      if (oProps.ShiftY != null) {
         ico.ShiftY = oProps.ShiftY;
      } else {
         ico.ShiftY = 0;
      }

      // determine Speed
      if (oProps.Speed != null) {
         ico.Speed = oProps.Speed;
      } else {
         ico.Speed = 444;
      }

      icos.push(ico);
   }
   canvases = null; // 'delete canvases' is not such good idea


   //-------------------------------
   // initialize canvas for excanvas.js (seq # 20140815.0651)
   if (bIsExcanvasLoaded) {
      for (var i = 0; i < icos.length; i++) {
         G_vmlCanvasManager.initElement(icos[i].Canvas);
      }   
   }
   //-------------------------------


   // initial drawing
   executeFrame();
}


// helper variables for browser independend angle calculation
var iMarkLastTwoSecond = 0;        //
var iMarkLastTwoSecondFrame = 0;   //
var iFramesInLastTwoSeconds = 0;   //
var iFramesPerTowSeconds = 0;      //
var nTrueAngleTurns = 0;           // wanted browser independend angle in turns for 1 Hz
var nIncTurnsPerFrame = 0;         // increment turns per frame for 1 Hz


/*
 * This function is called initially from startCanvasGear,
 *    then with each requestAnimFrame from the browser.
 * @id # 20140815.1221
 * @note
 * @callers First it is called from the start function 'startCanvasGear',
 *    then it is called periodically via requestAnimFrame();
 */
function executeFrame() {

   // () output page status (seq # 20140815.1251)
   // (.) calculate each frame
   iFrameNo++;
   var iTimeCurr = new Date();
   iTimeCurr.getTime();
   var iTimeCurrMs = iTimeCurr.getMilliseconds();
   var iElapsedMs = iTimeCurr - iTimeStart;
   var iFramesPerSecondTotal = iFrameNo / iElapsedMs * 1000;
   var iElapsedTwoSeconds = Math.floor( iElapsedMs / 2000 ) * 2;

   // (.2) calculate periodic measurment
   if ( iMarkLastTwoSecond < iElapsedTwoSeconds ) {
      iMarkLastTwoSecond = iElapsedTwoSeconds;
      iFramesInLastTwoSeconds = iFrameNo - iMarkLastTwoSecondFrame;
      iFramesPerTowSeconds = (iFrameNo - iMarkLastTwoSecondFrame) / 2;
      iMarkLastTwoSecondFrame = iFrameNo;
   }

   // (.3) calculate true angle
   if (iFramesPerTowSeconds < 0.001) {
      // The calculated speed is not available on start, there is not yet a
      // two-second measurement, so use the first available value. But this
      // is pretty imprecise, sometime half, sometime double the final value.
      iFramesPerTowSeconds = iFramesPerSecondTotal * 2;
   }
   nTrueAngleTurns = nTrueAngleTurns + (1 / iFramesPerTowSeconds);
   if (nTrueAngleTurns > 1) {
      nTrueAngleTurns = nTrueAngleTurns - 1;
   }
   nIncTurnsPerFrame = 1 / iFramesPerTowSeconds;

   // (.4) do output
   var s = "<b>CanvasGear page status</b> :"
          + " AlgoMode = " + (bFlagTipTopTest ? 'Top' : 'Tip') + "; "
           + " Frame number = " + iFrameNo + ";"
           + "<br />Start time = " + iTimeStart + " = " + iTimeStart.valueOf() + ";"
           + "<br />Current time = " + iTimeCurr + " = " + iTimeCurr.valueOf() + ";"
           //+ "<br />Elapsed ms = " + iElapsedMs + ";"
           + "<br />Elapsed seconds (every two) = " + iElapsedTwoSeconds + ";"
           + "<br />Frames per seconds = " + iFramesPerSecondTotal + " (total, average since start);"
           + "<br />Frames per seconds = " + iFramesPerTowSeconds + " (for the last two seconds);"
           + "<br />True angle for 1 Hz (turns) = " + nTrueAngleTurns + ";"
           + "<br />Increment per frame (turns) = " + nIncTurnsPerFrame + ";"
             ;
   var el = document.getElementById("id20140828o0651"); // <!-- output status message -->
   if (el != null) {
      el.innerHTML = s;
   }


   // process each canvas (seq # 20140815.1252)
   for (var iFor = 0; iFor < icos.length; iFor++) {

      if (iFor == 3) {
         var s4 = ""; // debug
      }

      // (x) output canvas status (seq # 20140815.1253)
      // (x.1) build output paragraph
      var s = '<small>Canvas status:';
      var i = 1;
      i = Math.floor( icos[iFor].Angle * 10); // convert from number to int, also floor and round were available
      s += "<br />Algo = " + icos[iFor].AlgoName;
      s += "<br />AlgoName = " + icos[iFor].AlgoName;
      s += "<br />Angle = " + i;
      s += "<br />Color = " + icos[iFor].Color;
      s += "<br />Height = " + icos[iFor].Height;
      s += "<br />Mode = " + (bFlagTipTopTest ? 'Top' : 'Tip');
      s += "<br />Width = " + icos[iFor].Width;
      s += "</small>"
      // (x.2) display output paragraph
      var el = document.getElementById("id20140828o0741"); // <!-- canvas attached info paragraph -->
      if (el != null) {
         el.innerHTML = s;
      }


      // () execute algorithm (seq # 20140815.1254)
      // note : Remember issue # 20140828.0751 'Algo calling params quirk'
      s = icos[iFor].AlgoName;
      if (s == 'develop') {
         algoDevelop(icos, iFor);
      } else if (s == 'oblongrose') {
         algoOblongrose(icos, iFor);
      } else if (s == 'pulse') {
         algoPulse(icos, iFor);
      } else if ( s == 'triangle' ) {
         algoTriangle(icos, iFor);
      } else if (s == 'triangulum') {
         algoTriangulum(icos, iFor);
      } else {
         algoPulse(icos, iFor);
      }
   }

   // (line # 20140815.1255)
   window.requestAnimFrame(executeFrame);
}


//*****************************************************
// Algorithms
//*****************************************************


/**
 * This function serves developing an algorithm.
 * @id # 20140901.0521 (# 20140816.0331)
 * @status
 * @param icos The complete icons array
 * @param iFor The index into the icons array to the wanted icon
 * @note Sorrily, we must pass the icon via array plus index. All attempts
 *    to pass the plain icon failed. Not sure why. (issue # 20140828.0751)
 */
function algoDevelop(icos, iFor)
{
   // note : This shall become the 'lines' algorithm' (# 20140901.0521).

   var iko = icos[iFor]; // workaround for issue # 20140828.0751

   // PROVISORY draw this algorithm only once
   if (iko.DrawOnlyOnce) {
      return;
   }
   iko.DrawOnlyOnce = true;

   // preparatory calculations
   var iSize = (+iko.Width + +iko.Height) / 2; // [see note # 20140901.0331]

   // prepare canvas
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = "#eeeeee";
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // preparatory calculations
   var lins = new Array();
   ////var lin1 = new Line(3, 3, 33, 3, 'crimson');
   var lin1 = new Line(3, 3, iSize -3, 3, 'crimson');
   ////var lin2 = new Line(4, 44, 44, 44, 'seagreen');
   var lin2 = new Line(4, iSize - 4, iSize - 4, iSize - 4, 'seagreen');
   ////var lin3 = new Line(5, 55, 55, 5, 'royalblue');
   var lin3 = new Line(5, iSize - 7, iSize - 5, 7, 'royalblue');
   lins.push(lin1);
   lins.push(lin2);
   lins.push(lin3);

   for (var i = 0; i < lins.length; i++) {
      iko.Context.beginPath();
      iko.Context.moveTo(lins[i].X1, lins[i].Y1);
      iko.Context.lineTo(lins[i].X2, lins[i].Y2);
      iko.Context.lineWidth = 3;
      iko.Context.strokeStyle = lins[i].Colo;
      iko.Context.stroke();
   }
}



/**
 * This function implements a drawing algorithm. It draws a rose.
 * @id 20140828o1411
 * @status Not yet animated
 * @ref http://gnuzoo.org/rose/index.htm [# 20140815.0521]
 * @param iko This is icos[iFor] at the caller.
 * @param iFor The index into the icos array.
 */
function algoOblongrose(icos, iFor)
{
   var iko = icos[iFor]; // (workaround for issue # 20140828.0751)

   // draw this algorithm only once
   if (iko.DrawOnlyOnce) {
      return;
   }
   iko.DrawOnlyOnce = true;

   // preparatory calculations
   var iSize = (+iko.Width + +iko.Height) / 2; // [see note # 20140901.0331]

   // prepare canvas
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // set colors
   iko.Context.strokeStyle = iko.Color;
   iko.Context.fillStyle = '#ffff00'; // 'yellow' // not applied below

   // set registration point
   iko.Context.translate(iSize / 2, iSize / 2);

   var iNums = 16;
   for (var i = 0; i < iNums; i++) {
      iko.Context.rotate(2 * Math.PI / iNums);
      iko.Context.strokeRect(0, 0, iSize / 2, iSize / 6);
   }
}



/**
 * This function implements the pulse drawing algorithm v2.
 *    - It adjusts the drawing size relative to the canvas size.
 *    - It allows parameters 'shiftx' and 'shifty'.
 *    - It uses parameter 'hertz' instead of the old 'speed'
 * @id 20140829o0511 (20140816o0331)
 * @status
 * @param iko This is icos[iFor] at the caller.
 * @param iFor This is the index into the array.
 */
function algoPulse(icos, iFor)
{
   var iko = icos[iFor]; // workaround for issue # 20140828.0751

   // (.) prepare canvas
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = "#f0f0f0";
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate size
   var iRadius = iko.Height;
   iRadius = iRadius / 2;

   // (.) calculate current radius
   var radius = 0;
   radius = iRadius * Math.abs(Math.cos(iko.Angle));

   // (.) calculate position
   var iRadiX = iRadius + parseInt(iko.ShiftX, 10);
   var iRadiY = iRadius + parseInt(iko.ShiftY, 10);

   // (.) draw
   iko.Context.beginPath();                    // circle
   iko.Context.arc ( iRadiX                    // x coordinate, e.g. 90
                    , iRadiY                   // y coordinate, e.g. 90
                     , radius                  // radius, e.g. 90
                      , 0                      // starting point angle in radians, starting east
                       , Math.PI * 2           // endpoint angle in radians
                        , false                // clockwise
                         );

   // (.) finish
   iko.Context.closePath();
   iko.Context.fillStyle = iko.Color;
   iko.Context.fill();

   // (.) calculate progression
   iko.Angle += nIncTurnsPerFrame * Math.PI * icos[iFor].Hertz;
}



/**
 * This function implements a drawing algorithm for an ikon.
 * @id 20140828o0851
 * @status proof-of-concept
 * @param iko This is icos[iFor] at the caller.
 * @note Sorrily, we must pass the icon via array plus index. All attempts
 *     to pass the plain icon failed. No idea why. (issue # 20140828.0751)
 * @ref : Article 'Drawing shapes with canvas'
 *     https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes [20140828o0911]
 * @ref : Article 'Hwo do you rotate an HTML5 canvas around it's center' [20140901o0321]
 *     http://www.williammalone.com/briefs/how-to-rotate-html5-canvas-around-center
 * @note : [note # 20140901.0331]
 *     The plus sign before iko.Width and iko.Height is wanted for
 *     IE8, which will otherwise interpret that as string, and e.g.
 *     iSize will have the value 3232 if width=64 and height=64.
 */
function algoTriangle(icos, iFor)
{
   var iko = icos[iFor]; // (workaround for issue # 20140828.0751)

   // preparatory calculations
   var iSize = (+iko.Width + +iko.Height) / 2; //  (see note # 20140901.0331 about '+')
   var iPt1x = iSize * 0.5;
   var iPt1y = iSize * 0.01;
   var iPt2x = iSize * 0.8;
   var iPt2y = iSize * 0.9;
   var iPt3x = iSize * 0.2;
   var iPt3y = iPt2y;

   // prepare canvas
   ////iko.Context.clearRect(0, 0, iko.Canvas.Width, iko.Canvas.Height); // Opera throws exception (finding # 20140901.0921)
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);     // Opera works fine

   // (.) rotation
   // (.1) set registration point
   iko.Context.translate(iSize / 2, iSize / 2);
   // (.2) rotate 1 degree
   iko.Context.rotate(nIncTurnsPerFrame * 4 * iko.Hertz); // 'nIncTurnsPerFrame * 4' is 1 rotation per second
   // (.3) move registration point back to the top left corner of canvas
   iko.Context.translate(-iSize / 2, -iSize / 2);


   //--------------------------------------------------
   // issue # 20140901.0911
   // title : Opera fillRect() fail
   // location : canvasgear.js with Opera 10.53
   // descr : in line "iko.Context.fillRect(0, 0, iko.Canvas.Width, iko.Canvas.Height);",
   //    Opera throws exception 'Error: NOT_SUPPORTED_ERR'.
   // workaround : Wrap line in try envelope. Disadvantage is, that
   //    the background is no more filled with it's color.
   // note : At other locations, fillRect() obviously works fine in Opera.
   // note : Finding # 20140901.0921 - Opera seems case sensitive with object
   //    properties e.g. wrong 'iko.Canvas.Width' vs. right 'iko.Canvas.width'!
   // status : Open
   // priority : Low
   //--------------------------------------------------


   // set background
   ////iko.Context.fillStyle = "#eeeeee";
   iko.Context.fillStyle = iko.BgColor;
   // (# 20140901.0912) try envelope against issue # 20140901.0911 'Opera fillRect() fail'
   try {
      // Opera may throw 'object DOMException' here (issue # 20140901.0911)
      ////iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.weight);
      iko.Context.fillRect(0, 0, iko.Width, iko.Height);
   } catch (e) {
      if (false) { // toggle this
         alert('[debug # 20140901.0913]\nException "' + e + '"');
      }
   }

   // draw
   iko.Context.beginPath();
   try {
      // note : If above e.g. 'iko.width' is used instead 'iko.Width', Opera will
      //    receive iPt1x/iPt1y as NaN and throw an exception here (note # 20140901.0933)
      // note : If this line throws exception, below lines will do so as well.
      iko.Context.moveTo(iPt1x, iPt1y);
   } catch (e) {
      if (false) { // toggle this
         alert('[debug # 20140901.0932]\nException "' + e + '"');
      }
   }
   iko.Context.lineTo(iPt2x, iPt2y);
   iko.Context.lineTo(iPt3x, iPt3y);
   iko.Context.fillStyle = iko.Color;
   iko.Context.fill();
   iko.Context.closePath();
}



/**
 * This function implements a drawing algorithm. It draws a line.
 * @id 20140828o1431
 * @status under construction
 * @ref http://stackoverflow.com/questions/3594653/html5-canvas-drawing-multicolored-lines [20140831o0741]
 * @ref http://html5tutorial.com/advanced-path-painting/ [20140831o0742]
 * @ref http://www.mysamplecode.com/2012/04/html5-canvas-draw-line-tutorial.html [20140831o0743] here I found the first example for multi colored lines
 * @ref http://www.peterkroener.de/eine-kleine-canvas-einfuehrung [20140828o1221]
 * @ref http://canvas.quaese.de/index.php?doc_id=36&nav=6,47 [20140828o1421]
 * @ref https://developer.mozilla.org/de/docs/Web/Guide/HTML/Canvas_tutorial/Applying_styles_and_colors [20140828o1422]
 * @note The statement 'fill() includes closePath()' is true only to some degree,
 *         e.g. *not* for drawing the final line to origin.
 * @param iko This is icos[iFor] at the caller.
 * @param iFor The index into the icos array.
 */
function algoTriangulum(icos, iFor)
{
   var iko = icos[iFor];                       // (workaround for issue # 20140828.0751)

   // preparatory calculations
   var iSize = (+iko.Width + +iko.Height) / 2; // [see note # 20140901.0331]

   var nCurrAngle = iko.Angle;
   nCurrAngle = Math.sin (iko.Angle) * (iSize - 4) / 2 + iSize / 2;

   // prepare canvas
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // draw triangle
   iko.Context.beginPath();
   iko.Context.moveTo(3, 3);
   iko.Context.lineTo(iSize - 3, 3);
   iko.Context.lineTo(nCurrAngle, iSize - 5);
   ////iko.Context.fillStyle = '#90ee90'; // lightgreen
   iko.Context.fillStyle = iko.Color;
   iko.Context.fill();
   iko.Context.closePath();
   iko.Context.lineWidth = 2;
   ////iko.Context.strokeStyle = "red";
   iko.Context.strokeStyle = iko.Color2;
   iko.Context.stroke();

   // draw line
   iko.Context.beginPath();
   iko.Context.moveTo(2, iSize - 2);
   iko.Context.lineTo(iSize - 2, iSize - 2);
   iko.Context.lineWidth = 3;
   ////iko.Context.strokeStyle = '#add8e6'; // lightblue
   iko.Context.strokeStyle = iko.Color3;
   iko.Context.stroke();

   // maintain progress
   iko.Angle += nIncTurnsPerFrame * 4 * iko.Hertz;
   if (iko.Angle > iSize - 4) {
      iko.Angle = 0;
   }
}



//*****************************************************
// Utility functions
//*****************************************************



/**
 * This is a helper function for ...().
 * @id 20140828o1411
 * @status not yet connected
 * @param objContext
 * @param intMoveX
 * @param intMoveY
 * @param intDestX
 * @param intDestY
 * @param strColor
 * @ref http://canvas.quaese.de/index.php?doc_id=36&nav=6,47 (20140828o1421)
 */
/*
function algoHelo3Line_drawLine(objContext, intMoveX, intMoveY, intDestX, intDestY, strColor)
{
   // Neuen Arbeitspfad anlegen
   objContext.beginPath();
   objContext.moveTo(intMoveX, intMoveY);
   objContext.lineTo(intDestX, intDestY);
   objContext.strokeStyle = strColor;
   objContext.stroke();
}
*/



/**
 * This function handles radiobutton clicks.
 * @id 20140819o1751
 * @status Not called yet ...
 * @param iko This is icos[iFor] at the caller.
 */
function setRadiobutton()
{
   var s = "";

   if (document.FormAlgoMode.AlgoMode[0].checked) {
      bFlagTipTopTest = false;
      s = document.FormAlgoMode.AlgoMode[0].value;
   }
   else {
      bFlagTipTopTest = true;
      s = document.FormAlgoMode.AlgoMode[1].value;
   }

   // debug
   /*
   var s = "[Debug] Radiobutton algo-mode is '" + s + "'.";
   document.getElementById("id20140828o0651").innerHTML = s; // <!-- output debug messages -->
   */

   return;
}


/**
 * This function parses a commandstring.
 * @id # 20140828.0841
 * @status ...
 * @callers ...
 * @todo This is an utility function, possibly shift to utility library.
 * @todo Improve ... e.g. allow leaving the leading and trailing blank ...
 * @ ref : About tokenizing with split() [20140828o0832]
 *     http://www.majstro.com/Web/Bedrijf/js/js_Global_String_split2.html
 * @param oProps - associative array to fill with key/value pairs
 * @param sCmd - the string to parse
 */
function parseCmdString(oProps, sCmd)
{
   var a1 = sCmd.split(" ");                           // delimiter is one blank
   for (var i = 0; i < a1.length; i++)
   {
      var a2 = a1[i].split("=");

      // is it a known key/value pair?
      if (a2.length == 2) {

         if (a2[0] == 'algo')    { oProps.AlgoName = a2[1]; }
         if (a2[0] == 'bgcolor') { oProps.BgColor  = a2[1]; }
         if (a2[0] == 'color')   { oProps.Color    = a2[1]; }
         if (a2[0] == 'color2')  { oProps.Color2   = a2[1]; }
         if (a2[0] == 'color3')  { oProps.Color3   = a2[1]; }
         if (a2[0] == 'hertz')   { oProps.Hertz    = a2[1]; }
         if (a2[0] == 'shiftx')  { oProps.ShiftX   = a2[1]; }
         if (a2[0] == 'shifty')  { oProps.ShiftY   = a2[1]; }
         if (a2[0] == 'speed')   { oProps.Speed    = a2[1]; }
      }
   }

   // supplement default values
   if (oProps.AlgoName == null) {
      oProps.AlgoName = 'default';
   }
   if (oProps.Color == null) {
      oProps.Color = '#bb1111';
   }
   if (oProps.Hertz == null) {
      oProps.Hertz = 0.2;
   }
   if (oProps.Speed == null) {
      oProps.Speed = 456;
   }
}



/**
 * This function finds comments ...
 * @id # 20140828.1231
 * @status ..
 * @callers ..
 * @ref http://stackoverflow.com/questions/6027830/is-it-possible-to-get-reference-to-comment-element-block-by-javascript [20140828o1222]
 * @note
 */
var findComments = function(el) {
   var arr = [];
   for(var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if(node.nodeType === 8) {
         arr.push(node);
      } else {
         arr = arr.concat(findComments(node));
      }
   }
   return arr;
};



/**
 * This function finds comments ... (alternative to findComments())
 * @id # 20140828.1241
 * @status ..
 * @callers ..
 * @ref http://stackoverflow.com/questions/6027830/is-it-possible-to-get-reference-to-comment-element-block-by-javascript [20140828o1222]
 * @note
 */
function getComments(context) {
   var foundComments = [];
   var elementPath = [context];
   while (elementPath.length > 0) {
      var el = elementPath.pop();
      for (var i = 0; i < el.childNodes.length; i++) {
         var node = el.childNodes[i];
         if (node.nodeType === 8) {
            foundComments.push(node);
         } else {
            elementPath.push(node);
         }
      }
   }
   return foundComments;
}



/**
 * This object defines webcolors.
 * @id # 20140831.0321
 * @status Working
 * @callers Only function # 20140831.0331 colorNameToHex
 * @ref http://en.wikipedia.org/wiki/Web_colors (20140831o0311)
 * @note
 */
function Webcolors() {
  
   // Pink colors

   this.pink                 = '#ffc0cb';   // Pink                  FF C0 CB    255 192 203
   this.lightpink            = '#ffb6c1';   // LightPink             FF B6 C1    255 182 193
   this.hotpink              = '#ff69b4';   // HotPink               FF 69 B4    255 105 180
   this.deeppink             = '#ff1493';   // DeepPink              FF 14 93    255  20 147
   this.palevioletred        = '#db7093';   // PaleVioletRed         DB 70 93    219 112 147
   this.mediumvioletred      = '#c71585';   // MediumVioletRed       C7 15 85    199  21 133

   // Red colors

   this.lightsalmon          = '#ffa07a';   // LightSalmon           FF A0 7A    255 160 122
   this.salmon               = '#fa8072';   // Salmon                FA 80 72    250 128 114
   this.darksalmon           = '#e9967a';   // DarkSalmon            E9 96 7A    233 150 122
   this.lightcoral           = '#f08080';   // LightCoral            F0 80 80    240 128 128
   this.indianred            = '#cd5c5c';   // IndianRed             CD 5C 5C    205  92  92
   this.crimson              = '#dc143c';   // Crimson               DC 14 3C    220  20  60
   this.firebrick            = '#b22222';   // FireBrick             B2 22 22    178  34  34
   this.darkred              = '#8b0000';   // DarkRed               8B 00 00    139   0   0
   this.red                  = '#ff0000';   // Red                   FF 00 00    255   0   0

   // Orange colors

   this.orangered            = '#ff4500';   // OrangeRed             FF 45 00    255  69   0
   this.tomato               = '#ff6347';   // Tomato                FF 63 47    255  99  71
   this.coral                = '#ff7f50';   // Coral                 FF 7F 50    255 127  80
   this.darkorange           = '#ff8c00';   // DarkOrange            FF 8C 00    255 140   0
   this.orange               = '#ffa500';   // Orange                FF A5 00    255 165   0

   // Yellow colors

   this.yellow               = '#ffff00';   // Yellow                FF FF 00    255 255   0
   this.lightyellow          = '#ffffe0';   // LightYellow           FF FF E0    255 255 224
   this.lemonchiffon         = '#fffacd';   // LemonChiffon          FF FA CD    255 250 205
   this.lightgoldenrodyellow = '#fafad2';   // LightGoldenrodYellow  FA FA D2    250 250 210
   this.papayawhip           = '#ffefd5';   // PapayaWhip            FF EF D5    255 239 213
   this.moccasin             = '#ffe4b5';   // Moccasin              FF E4 B5    255 228 181
   this.peachpuff            = '#ffdab9';   // PeachPuff             FF DA B9    255 218 185
   this.palegoldenrod        = '#eee8aa';   // PaleGoldenrod         EE E8 AA    238 232 170
   this.khaki                = '#f0e68c';   // Khaki                 F0 E6 8C    240 230 140
   this.darkkhaki            = '#bdb76b';   // DarkKhaki             BD B7 6B    189 183 107
   this.gold                 = '#ffd700';   // Gold                  FF D7 00    255 215   0

   // Brown colors

   this.cornsilk             = '#fff8dc';   // Cornsilk              FF F8 DC    255 248 220
   this.blanchedalmond       = '#ffebcd';   // BlanchedAlmond        FF EB CD    255 235 205
   this.bisque               = '#ffe4c4';   // Bisque                FF E4 C4    255 228 196
   this.navajowhite          = '#ffdead';   // NavajoWhite           FF DE AD    255 222 173
   this.wheat                = '#f5deb3';   // Wheat                 F5 DE B3    245 222 179
   this.burlywood            = '#deb887';   // BurlyWood             DE B8 87    222 184 135
   this.tan                  = '#d2b48c';   // Tan                   D2 B4 8C    210 180 140
   this.rosybrown            = '#bc8f8f';   // RosyBrown             BC 8F 8F    188 143 143
   this.sandybrown           = '#f4a460';   // SandyBrown            F4 A4 60    244 164  96
   this.goldenrod            = '#daa520';   // Goldenrod             DA A5 20    218 165  32
   this.darkgoldenrod        = '#b8860b';   // DarkGoldenrod         B8 86 0B    184 134  11
   this.peru                 = '#cd853f';   // Peru                  CD 85 3F    205 133  63
   this.chocolate            = '#d2691e';   // Chocolate             D2 69 1E    210 105  30
   this.saddlebrown          = '#8b4513';   // SaddleBrown           8B 45 13    139  69  19
   this.sienna               = '#a0522d';   // Sienna                A0 52 2D    160  82  45
   this.brown                = '#a52a2a';   // Brown                 A5 2A 2A    165  42  42
   this.maroon               = '#800000';   // Maroon                80 00 00    128   0   0
   
   // Green colors

   this.darkolivegreen       = '#556b2f';   // DarkOliveGreen        55 6B 2F     85 107  47
   this.olive                = '#808000';   // Olive                 80 80 00    128 128   0
   this.olivedrab            = '#6b8e23';   // OliveDrab             6B 8E 23    107 142  35
   this.yellowgreen          = '#9acd32';   // YellowGreen           9A CD 32    154 205  50
   this.limegreen            = '#32cd32';   // LimeGreen             32 CD 32     50 205  50
   this.lime                 = '#00ff00';   // Lime                  00 FF 00      0 255   0
   this.lawngreen            = '#7cfc00';   // LawnGreen             7C FC 00    124 252   0
   this.chartreuse           = '#7fff00';   // Chartreuse            7F FF 00    127 255   0
   this.greenyellow          = '#adff2f';   // GreenYellow           AD FF 2F    173 255  47
   this.springgreen          = '#00ff7f';   // SpringGreen           00 FF 7F      0 255 127
   this.mediumspringgreen    = '#00fa9a';   // MediumSpringGreen     00 FA 9A      0 250 154
   this.lightgreen           = '#90ee90';   // LightGreen            90 EE 90    144 238 144
   this.palegreen            = '#98fb98';   // PaleGreen             98 FB 98    152 251 152
   this.darkseagreen         = '#8fbc8f';   // DarkSeaGreen          8F BC 8F    143 188 143
   this.mediumseagreen       = '#3cb371';   // MediumSeaGreen        3C B3 71     60 179 113
   this.seagreen             = '#2e8b57';   // SeaGreen              2E 8B 57     46 139  87
   this.forestgreen          = '#228b22';   // ForestGreen           22 8B 22     34 139  34
   this.green                = '#008000';   // Green                 00 80 00      0 128   0
   this.darkgreen            = '#006400';   // DarkGreen             00 64 00      0 100   0

   // Cyan colors

   this.mediumaquamarine     = '#66cdaa';   // MediumAquamarine      66 CD AA    102 205 170
   this.aqua                 = '#00ffff';   // Aqua                  00 FF FF      0 255 255
   this.cyan                 = '#00ffff';   // Cyan                  00 FF FF      0 255 255
   this.lightcyan            = '#e0ffff';   // LightCyan             E0 FF FF    224 255 255
   this.paleturquoise        = '#afeeee';   // PaleTurquoise         AF EE EE    175 238 238
   this.aquamarine           = '#7fffd4';   // Aquamarine            7F FF D4    127 255 212
   this.turquoise            = '#40e0d0';   // Turquoise             40 E0 D0     64 224 208
   this.mediumturquoise      = '#48d1cc';   // MediumTurquoise       48 D1 CC     72 209 204
   this.darkturquoise        = '#00ced1';   // DarkTurquoise         00 CE D1      0 206 209
   this.lightseagreen        = '#20b2aa';   // LightSeaGreen         20 B2 AA     32 178 170
   this.cadetblue            = '#5f9ea0';   // CadetBlue             5F 9E A0     95 158 160
   this.darkcyan             = '#008b8b';   // DarkCyan              00 8B 8B      0 139 139
   this.teal                 = '#008080';   // Teal                  00 80 80      0 128 128

   // Blue colors

   this.lightsteelblue       = '#b0c4de';   // LightSteelBlue        B0 C4 DE    176 196 222
   this.powderblue           = '#b0e0e6';   // PowderBlue            B0 E0 E6    176 224 230
   this.lightblue            = '#add8e6';   // LightBlue             AD D8 E6    173 216 230
   this.skyblue              = '#87ceeb';   // SkyBlue               87 CE EB    135 206 235
   this.lightskyblue         = '#87cefa';   // LightSkyBlue          87 CE FA    135 206 250
   this.deepskyblue          = '#00bfff';   // DeepSkyBlue           00 BF FF      0 191 255
   this.dodgerblue           = '#1e90ff';   // DodgerBlue            1E 90 FF     30 144 255
   this.cornflowerblue       = '#6495ed';   // CornflowerBlue        64 95 ED    100 149 237
   this.steelblue            = '#4682b4';   // SteelBlue             46 82 B4     70 130 180
   this.royalblue            = '#4169e1';   // RoyalBlue             41 69 E1     65 105 225
   this.blue                 = '#0000ff';   // Blue                  00 00 FF      0   0 255
   this.mediumblue           = '#0000cd';   // MediumBlue            00 00 CD      0   0 205
   this.darkblue             = '#00008b';   // DarkBlue              00 00 8B      0   0 139
   this.navy                 = '#000080';   // Navy                  00 00 80      0   0 128
   this.midnightblue         = '#191970';   // MidnightBlue          19 19 70     25  25 112

   // Purple colors

   this.lavender             = '#e6e6fa';   // Lavender              E6 E6 FA    230 230 250
   this.thistle              = '#d8bfd8';   // Thistle               D8 BF D8    216 191 216
   this.plum                 = '#dda0dd';   // Plum                  DD A0 DD    221 160 221
   this.violet               = '#ee82ee';   // Violet                EE 82 EE    238 130 238
   this.orchid               = '#da70d6';   // Orchid                DA 70 D6    218 112 214
   this.fuchsia              = '#ff00ff';   // Fuchsia               FF 00 FF    255   0 255
   this.magenta              = '#ff00ff';   // Magenta               FF 00 FF    255   0 255
   this.mediumorchid         = '#ba55d3';   // MediumOrchid          BA 55 D3    186  85 211
   this.mediumpurple         = '#9370db';   // MediumPurple          93 70 DB    147 112 219
   this.blueviolet           = '#8a2be2';   // BlueViolet            8A 2B E2    138  43 226
   this.darkviolet           = '#9400d3';   // DarkViolet            94 00 D3    148   0 211
   this.darkorchid           = '#9932cc';   // DarkOrchid            99 32 CC    153  50 204
   this.darkmagenta          = '#8b008b';   // DarkMagenta           8B 00 8B    139   0 139
   this.purple               = '#800080';   // Purple                80 00 80    128   0 128
   this.indigo               = '#4b0082';   // Indigo                4B 00 82     75   0 130
   this.darkslateblue        = '#483d8b';   // DarkSlateBlue         48 3D 8B     72  61 139
   this.slateblue            = '#6a5acd';   // SlateBlue             6A 5A CD    106  90 205
   this.mediumslateblue      = '#7b68ee';   // MediumSlateBlue       7B 68 EE    123 104 238

   // White colors

   this.white                = '#ffffff';   // White                 FF FF FF    255 255 255
   this.snow                 = '#fffafa';   // Snow                  FF FA FA    255 250 250
   this.honeydew             = '#f0fff0';   // Honeydew              F0 FF F0    240 255 240
   this.mintcream            = '#f5fffa';   // MintCream             F5 FF FA    245 255 250
   this.azure                = '#f0ffff';   // Azure                 F0 FF FF    240 255 255
   this.aliceblue            = '#f0f8ff';   // AliceBlue             F0 F8 FF    240 248 255
   this.ghostwhite           = '#f8f8ff';   // GhostWhite            F8 F8 FF    248 248 255
   this.whitesmoke           = '#f5f5f5';   // WhiteSmoke            F5 F5 F5    245 245 245
   this.seashell             = '#fff5ee';   // Seashell              FF F5 EE    255 245 238
   this.beige                = '#f5f5dc';   // Beige                 F5 F5 DC    245 245 220
   this.oldlace              = '#fdf5e6';   // OldLace               FD F5 E6    253 245 230
   this.floralwhite          = '#fffaf0';   // FloralWhite           FF FA F0    255 250 240
   this.ivory                = '#fffff0';   // Ivory                 FF FF F0    255 255 240
   this.antiquewhite         = '#faebd7';   // AntiqueWhite          FA EB D7    250 235 215
   this.linen                = '#faF0e6';   // Linen                 FA F0 E6    250 240 230
   this.lavenderblush        = '#fff0f5';   // LavenderBlush         FF F0 F5    255 240 245
   this.mistyrose            = '#ffe4e1';   // MistyRose             FF E4 E1    255 228 225

   // Gray/Black colors

   this.gainsboro            = '#dcdcdc';   // Gainsboro             DC DC DC    220 220 220
   this.lightgrey            = '#d3d3d3';   // LightGrey             D3 D3 D3    211 211 211
   this.silver               = '#c0c0c0';   // Silver                C0 C0 C0    192 192 192
   this.darkgray             = '#a9a9a9';   // DarkGray              A9 A9 A9    169 169 169
   this.gray                 = '#808080';   // Gray                  80 80 80    128 128 128
   this.dimgray              = '#696969';   // DimGray               69 69 69    105 105 105
   this.lightslategray       = '#778899';   // LightSlateGray        77 88 99    119 136 153
   this.slategray            = '#708090';   // SlateGray             70 80 90    112 128 144
   this.darkslategray        = '#2f4f4f';   // DarkSlateGray         2F 4F 4F     47  79  79
   this.black                = '#000000';   // Black                 00 00 00      0   0   0

   // Additional colors

   this.rebeccapurple        = '#663399';   // Rebeccapurple         66 33 99    102  51 152

   this.verydarkviolett      = '#d000d0'    // (custom color # 20140903.0341)
}



/**
 * This function translates a X11 web color name to it' hex value
 * @id # 20140831.0331
 * @status Working
 * @note This helps to use webcolors with IE8.
 * @returns The wanted color hex value, e.g. '#FF0000' for 'red', or '#C0C0C0' silver for wrong names.
 * @note
 */
function colorNameToHex(sName) {

   var cols = new Webcolors;
   var sCol = '';

   sName = sName.toLowerCase();

   if (cols[sName]) {
      sCol = cols[sName];
   }
   else {
      sCol = '#C0C0C0'; // silver for unknown color names
   }

   return sCol;
}
