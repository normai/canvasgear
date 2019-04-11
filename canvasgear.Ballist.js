/*!
 * This module provides an algorithm for canvasgear.js.
 *
 * version : 0.1.8 — 20190330°0711..
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */
/**
 * @id 20140916°0411
 * @authors ncm
 * @encoding UTF-8-with-BOM
 */

/**
 * This namespace constitutes the CanvasGear namespace
 *
 * @id 20180618°0622
 */
var Cvgr = Cvgr || {};

/**
 * This namespace shall hold algorithms
 *
 * @id 20180619°0111
 */
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace shall hold the Ballist algorithm
 *
 * @id 20180619°0121
 */
Cvgr.Algos.Ballist = Cvgr.Algos.Ballist || {};

/**
 * This class provides a ring object for the Ballist algorithm
 *
 * @id 20140815°1221
 * @param sRingName {}
 * @param nRadiusAbs {}
 * @param sColorRing {}
 * @param sColorSpace {}
 */
Cvgr.Algos.Ballist.Ring = function(sRingName, nRadiusAbs, sColorRing, sColorSpace ) {

   // guarantee default values
   // note : not sure this sequence yet works properly
   if (sRingName === null) {
      sRingName ='?';
   }
   if (nRadiusAbs === null) {
      nRadiusAbs = 0.987;                              //  m
   }
   if (sColorRing === null) {
      sColorRing = 'gray';
   }
   if (sColorSpace === null) {
      sColorSpace = 'white';
   }

   // set public properties
   this.ringname = sRingName;                          // string e.g. '1', '2', ..
   this.radiusAbs = nRadiusAbs;                        // number - radius absolute in meter
   this.colorRing = sColorRing;                        // string - color of the ring, RGB or webcolor
   this.colorSpace = sColorSpace;                      // string - color of the space for the ring RGB or webcolor
};

/*
 * This class provides a target object for the Ballist algorithm
 *
 * @id 20140916°0911
 * @param nRadius {} The target's radius in m, usually goes with lowest ring.
 */
 Cvgr.Algos.Ballist.Target = function() {

   this.Diameter = 0.1;                                // diameter in meter [var 20140926°1151] the canvas scale shall be based on this
   this.Naame = '<n/a>';                               // the discipline name
   this.Shortnam = '<n/a>';                            //
   this.rings = new Array();                           // array of rings, to be filled by somebody
};

/*
 * This function provides a hit object for the Ballist algorithm
 *
 * @id 20140916°0741
 * @param nRingval {}
 * @param nMinutes {}
 */
Cvgr.Algos.Ballist.Hit = function(nRingval, nMinutes) {

   // set source values
   this.ringval = nRingval;                            // number - the ring value (assumed from 1.0 to 10.9)
   this.minutes = nMinutes;                            // number - which minute on the clock

   // calculate cartesian coordinates
   var angle = this.minutes / 60 * Math.PI * 2;        // preliminary guess
   angle = angle + Math.PI * 1.5;                      // shift the 0-Minute from east position to north position

   // invert ring to radius
   // note 20140917°0311 : The final coordinates can only be calculated
   //    if the size of the target and the size of the canvas is known.
   var nRadi = 10.9 - this.ringval;                    // invert ring value to a radius number
   // //nRadi = nRadi * 0.2;                           // they calc from 1 to 10, we need from 1.1 to 10.9

   var nEmpricHelper = 0.20;
   var x = nRadi * Math.cos(angle) * nEmpricHelper;    // ELIMINATE empirical factor
   var y = nRadi * Math.sin(angle) * nEmpricHelper;    // ELIMINATE empirical factor

   this.X = x;                                         // number - calculated
   this.Y = y;                                         // number - calculated
};

/////**
//// * This variable stores the next step for an algorithm
//// *
//// * @callers Seems unused
//// * @id 20140916°0811
//// */
////Cvgr.Algos.iStep = 0;

/**
 * This function .. is a test function
 *
 * @id 20140926°1211
 * @callers Only • func 20140916°0421 executeAlgorithm
 * @param {object} iko ...
 */
Cvgr.Algos.Ballist.executeAlgo_drawDiagonal = function(iko)
{
   var nHeight = iko.Height;                           // pixel
   var nWidth = iko.Width;                             // pixel
   var nDist1 = 11;                                    // distance to the canvas border in pixel
   var nDistTwo = nDist1 / 2;                          // half distance

   ///var nSize = (nHeight + nWidth) / 2;              // calculate flat rate

   // scale endpoints
   var nX1 = nDist1;
   var nY1 = nHeight - nDist1;
   var nX2 = nWidth - nDist1;
   var nY2 = nHeight - nDist1;

   /**
    * This variable stores some kind of factor
    *
    * @id 20140926°1212
    * @note Not sure, what exactly this may be good for. Eliminate it?
    */
   //var nSiz = 1;
   //var iPt1x = nSiz * 9;
   //var iPt1y = nSiz * iko.Height - 9;
   //var iPt2x = nSiz * iko.Width - 9;
   //var iPt2y = nSiz * iko.Height -9;

   // draw [seq 20140926°1221]
   // note : Sequence written after sequence in Cvgr.Func.algoTriangle().
   iko.Context.beginPath();

   // (why the try see issue 20140901°0933)
   try {
      iko.Context.moveTo(nX1, nY1);
   }
   catch (e) {
      alert('[debug 20140901°0932]\nException : \n\n"' + e + '"');
      return;
   }
   iko.Context.lineTo(nX2, nY2);

   iko.Context.moveTo(nX1, nY2 + nDistTwo);
   iko.Context.lineTo(nX1, nY2 - nDistTwo);

   iko.Context.moveTo(nX2, nY2 + nDistTwo);
   iko.Context.lineTo(nX2, nY2 - nDistTwo);

   iko.Context.strokeStyle = iko.Color; // ?
   iko.Context.fillStyle = iko.Color;
   iko.Context.fill();

   iko.Context.closePath();

   iko.Context.strokeStyle = 'turquoise';                      // 'lightgreen'
   iko.Context.lineWidth = 3;
   iko.Context.stroke();

   if (true) {
      var s = "~0.11 m";
      iko.Context.font = "1.2em Arial";                        // e.g. "20px Times Roman", "1.2em Arial", "bold 14px verdana, sans-serif"
      iko.Context.fillStyle = "turquoise";                     // "aquamarine" // "#ff0000"
      iko.Context.fillText(s, nX1 + nDistTwo, nY1 - nDistTwo); // IE8 Error 'Object doesn't support this property or method' (see issue 20160416°1321)
   }

   // todo : Outsource this sequence to a dedicated algorithm e.g. 'writetext' (20140926°1341)
   if (true) {
      // (issue 20140926°1321)
      // Compatibility. IE8 does not understand the fillText() function.

      if (iko.CmdHash2['text']) {
         iko.Context.fillStyle = "#102030";
         iko.Context.font = "1.2em Arial";                     // e.g. "20px Times Roman", "1.2em Arial"
         iko.Context.fillText(iko.CmdHash2['text'], 10, 20);   // e.g. "Hello.."
      }
   }
};

/**
 * This function .. is a private helper function
 * @id 20140926°0911
 * @status
 * @callers Only Cvgr.Algos.Ballist.executeAlgorithm
 * @param sSeries {} ..
 */
Cvgr.Algos.Ballist.executeAlgo_getSeries = function(sSeries)
{
   var hits = new Array();

   if (sSeries.length < 1) {

      // hardcoded default hitlist [seq 20140916°0751]
      var h = new Cvgr.Algos.Ballist.Hit(10.7, 55); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(9.3, 43); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.1, 0); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.2, 1); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.3, 3); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.4, 6); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.5, 10); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.6, 20); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.7, 30); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.8, 40); hits.push(h);
      var h = new Cvgr.Algos.Ballist.Hit(2.9, 50); hits.push(h);

      // retrieve series details ring-decimal/minutes-on-clock
      // Commandlines e.g.:
      //   - algo=Ballist series="10.7/55 9.3/43 8.5/39 6.2/43 3.3/33 1.0/11" id="id20140916o0731"
      //   - <!-- algo=Ballist series="9.3/43 8.5/39 8.0/45 8.9/51 8.5/56 9.7/29 9.9/27 8.5/17 8.3/42 6.3/43 9.7/1 9.9/45 9.8/47 7.8/41 6.2/43 10.0/16 10.2/44 9.8/7 8.1/47 7.9/20 10.1/7 9.4/11 9.4/14 9.6/32 7/8/48 9.0/20 8.1/3 8.9/32 6.2/28 6.5/39" id="id20140914o1330" -->
      //   - <!-- algo=Ballist series="10.4/40 10.3/42 10.6/47 10.3/56 9.2/11 9.7/16 9.6/34 9.1/39 9.9/54 9.9/58 8.4/48 8.6/50 8.6/53 7.4/54 6.5/55" id="id20140926o203021" -->

      // read series from commandline [line 20140926°0851]
      // // var a = iko.CmdHash2['series'];
      // sSeries ..

   }
   else {

      // read from somewhere
      // .. parse ..
      var a1 = sSeries.split(" ");
      for (var i = 0; i < a1.length; i++) {
         var a2 = a1[i].split("/");
         var h = new Cvgr.Algos.Ballist.Hit(a2[0], a2[1]); hits.push(h);
      }
   }

   return hits;
};

/**
 * This function delivers a target object depending on the given name
 *
 * @id 20140916°0921
 * @status Under construction
 * @note function Cvgr.Algos.Ballist.Ring(sRingName, nRadiusAbs, sColorRing, sColorSpace )
 * @note The details are still be to adjusted.
 * @param sTargetName {string} ..
 */
 Cvgr.Algos.Ballist.executeAlgo_getTarget = function(sTargetName)
{
   var target = new Cvgr.Algos.Ballist.Target();

   if (sTargetName === 'kkspp') {
      // ref : http://commons.wikimedia.org/wiki/Category:Targets?uselang=de#mediaviewer/File:25_Meter_Precision_and_50_Meter_Pistol_Target.svg (20140926°1331)
      target.Diameter = 0.500;
      target.Naame = "Sportpistole 25 m Präzision";
      target.Shortnam = sTargetName;
      target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.025, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.050, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.075, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.100, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.125, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.150, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.175, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.200, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.225, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'white'));
   }
   else if (sTargetName === 'kkspd') {
      target.Diameter = 0.500;
      target.Naame = "Sportpistole 25 m Duell";
      target.Shortnam = sTargetName;
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.050, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.100, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.150, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.200, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'black'));
   }
   else if (sTargetName === 'lg10m') {
      target.Diameter = 0.050;
      target.Naame = "Luftgewehr 10 m";
      target.Shortnam = sTargetName;
      target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0025, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0050, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0075, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0100, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0125, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0150, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0175, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0200, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0225, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0250, 'blue' , 'white'));
   }
   else if (sTargetName === 'lgdt10m') {
      target.Diameter = 0.0100;
      target.Naame = "Deutsche Luftgewehr-Scheibe 10 m";
      target.Shortnam = sTargetName;
      target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0005, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0010, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0015, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0020, 'blue' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0025, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0030, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0035, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0040, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0045, 'blue' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0050, 'blue' , 'white'));
   }
   else {
      target.Diameter = 0.1500;
      target.Naame = "Luftpistole 10 m";
      target.Shortnam = 'lupi10m';
      target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0055, 'black', 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0135, 'black', 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0215, 'gray' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0295, 'gray' , 'black'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0375, 'gray' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0455, 'gray' , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0535, 'red'  , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0615, 'red'  , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0695, 'red'  , 'white'));
      target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0775, 'red'  , 'white'));
   }

   return target;
};

/**
 * This function implements the drawing algorithm
 *
 * @id 20140916°0421
 * @status under construction
 * @note The statement 'fill() includes closePath()' is true only to some
 *         degree, e.g. *not* for drawing the final line to origin.
 * @note Compatibility: Seems not to work with IE8
 * @callers • Cvgr.Func.executeFrame
 * @param {array} icos — This is Cvgr.Vars.icos[iNdx] at the caller.
 * @param {number} iNdx — The index into the Cvgr.Vars.icos array.
 */
Cvgr.Algos.Ballist.executeAlgorithm = function(icos, iNdx)
{
   // prolog
   var iko = icos[iNdx]; // (workaround for issue 20140828°0751)

   // prolog - draw this algorithm only once [seq 20140916°102203]
   // note : This does not prevent Taskmanager to raise CPU usage
   //    to nearly hundred percent. But without single-paint mode,
   //    it raises towards full hundred percent perhaps.
   // todo : Implement flag as commandline option and process very early.
   if (iko.DrawOnlyOnce) {
      return;
   }
   iko.DrawOnlyOnce = true;

   // preparatory calculations (line 20140916°0825)
   var iSize = ((+iko.Width) + (+iko.Height)) / 2; // (see note 20140901°0331)

   // calculate angle
   //var nCurrAngle = iko.Angle;
   //nCurrAngle = Math.sin (iko.Angle) * (iSize - 4) / 2 + iSize / 2;

   // retrieve target
   var tgt = Cvgr.Algos.Ballist.executeAlgo_getTarget();

   // retrieve series
   var hits = Cvgr.Algos.Ballist.executeAlgo_getSeries(iko.CmdHash2['series']);

   // prepare canvas
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate center point from canvas length and height
   // note : The calculation is redundant to 'iSize'.
   var iCenterPoint = (iko.Width + iko.Height) / 4; // this is half iSize

   // (.) adjust center position from possible shift
   var iRadiX = iCenterPoint;
   var iRadiY = iCenterPoint;
   if (iko.ShiftX !== null) {
      var iRadiX = iCenterPoint + parseInt(iko.ShiftX, 10);
   }
   if (iko.ShiftY !== null) {
      var iRadiY = iCenterPoint + parseInt(iko.ShiftY, 10);
   }

   // (.) paint rings
   for (var iLoop = 0; iLoop < tgt.rings.length; iLoop++) {

      // (.) calculate current radius
      // todo: Replace fixed factor by calculated factor
      var radius = iCenterPoint * tgt.rings[iLoop].radiusAbs * 12;

      // (.) draw
      iko.Context.beginPath();                         // circle
      iko.Context.arc ( iRadiX                         // x coordinate, e.g. 90
                       , iRadiY                        // y coordinate, e.g. 90
                        , radius                       // radius, e.g. 90
                         , 0                           // starting point angle in radians, starting east
                          , Math.PI * 2                // endpoint angle in radians
                           , false                     // clockwise
                            );

      // (.) finish
      iko.Context.closePath();
      iko.Context.strokeStyle = Trekta.Util2.colorNameToHex(tgt.rings[iLoop].colorRing);
      iko.Context.lineWidth = 1;
      iko.Context.stroke();
   }

   // (.) paint hits
   for (var i = 0; i < hits.length; i++) {

      // (.) calculate radius
      radius = 6;

      var iRadiX = iCenterPoint + hits[i].X * 50 + parseInt(iko.ShiftX, 10);
      var iRadiY = iCenterPoint + hits[i].Y * 50 + parseInt(iko.ShiftY, 10);

      // (.) draw hit
      iko.Context.beginPath();                 // circle
      iko.Context.arc ( iRadiX                 // x coordinate
                       , iRadiY                // y coordinate
                        , radius               // radius, e.g. 90
                         , 0                   // starting point angle in radians, starting east
                          , Math.PI * 2        // endpoint angle in radians
                           , false             // clockwise
                            );

      // (.) finish
      iko.Context.closePath();

      iko.Context.strokeStyle = '#4169e1'; // 'royalblue';
      iko.Context.lineWidth = 1;
      iko.Context.stroke();
   }

   Cvgr.Algos.Ballist.executeAlgo_drawDiagonal(iko);

   // progress
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * 4 * iko.Hertz;
   if (iko.Angle > iSize - 4) {
      iko.Angle = 0;
   }
};

/* eof */
