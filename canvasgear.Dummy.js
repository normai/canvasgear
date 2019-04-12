//======✂======================================================
﻿/*!
 * This module provides the Dummy algorithm
 *
 * version : 0.1.8 — 20190330°0711...
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */
/**
 * @id file 20190329°0611
 * @authors ncm
 * @encoding UTF-8-with-BOM
 */

/**
 * This namespace constitutes the CanvasGear namespace
 *
 * @id 20190329°0621 (parent 20180618°0622)
 */
var Cvgr = Cvgr || {};

/**
 * This namespace holds the algorithms
 *
 * @id 20190329°0622 (parent 20180619°0111)
 */
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the respectively named algorithm. If you have
 *  copied canvasgear.Dummy.js to another file, e.g. canvasgear.MyAlgo.js, then
 *  rename this namespace and it's members respectively, e.g. Cvgr.Algos.MyAlgo
 *
 * @id 20190329°0623
 */
Cvgr.Algos.Dummy = Cvgr.Algos.Dummy || {};

/**
 * This function implements the drawing algorithm
 *
 * @id 20190329°0631
 * @status dummy function
 * @callers • Cvgr.Func.executeFrame
 * @param {array} icos — This is Cvgr.Vars.icos[iNdx] at the caller
 * @param {number} iNdx — The index into the Cvgr.Vars.icos array
 */
Cvgr.Algos.Dummy.executeAlgorithm = function(icos, iNdx)
{
   // hold off impossible index [seq 20190329°0423]
   // See issue 20190329°0421 'impossible index'
   if ( iNdx >= icos.length) {
      return;
   }

   // convenience, get the pure Ikon object [line 20190329°0425]
   //  Workaround for issue 20140828°0751 'algo calling params quirk'
   var iko = icos[iNdx];

   // prolog - draw this algorithm only once [seq 20190329°0427]
   // note : This does not prevent Taskmanager show CPU usage nearly hundred
   //   percent. Without single-paint mode, it raises full hundred percent.
   // todo : Implement flag as commandline option and process very early.
   if (iko.DrawOnlyOnce) {
      return;
   }
   iko.DrawOnlyOnce = false; // true; // false

   // prepare canvas [line 20190329°0441]
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor; // 'MistyRose'; // iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate center point from canvas length and height [line 20190329°0442]
   // note : The calculation is redundant to 'iSize'.
   var iCenterPoint = (iko.Width + iko.Height) / 4; // this is half iSize

   // (.) adjust center position from possible shift [seq 20190329°0443]
   var iRadiX = iCenterPoint;
   var iRadiY = iCenterPoint;
   if (iko.ShiftX !== null) {
      var iRadiX = iCenterPoint + parseInt(iko.ShiftX, 10);
   }
   if (iko.ShiftY !== null) {
      var iRadiY = iCenterPoint + parseInt(iko.ShiftY, 10);
   }

   // (.) calculate current radius [seq 20190329°0444]
   var radius = iCenterPoint * 0.79;

   // (.) draw something [seq 20190329°0445]
   iko.Context.beginPath();                         // circle
   iko.Context.arc ( iRadiX                         // x coordinate, e.g. 90
                    , iRadiY                        // y coordinate, e.g. 90
                     , radius                       // radius, e.g. 90
                      , 0.1 // 0                    // starting point angle in radians, starting east
                       , Math.PI * 2 * 0.7 // Math.PI * 2 // endpoint angle in radians
                        , false                     // clockwise
                         );

   // (.) finish [seq 20190329°0446]
   //iko.Context.closePath();
   iko.Context.strokeStyle = iko.Color; // 'blue';
   iko.Context.lineWidth = 6;
   iko.Context.stroke();

   /*
   issue 20190329°0451 'iko.Angle does not reset'
   matter : The angle does not reset. Why not?
   answer : It only seemed so, because the angle in the debug display
      was printed as integer, when it was a number of 1/10.
   status : finished
   */

   // progress [seq 20190329°0447]
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * 4 * iko.Hertz;
   ///if (iko.Angle > iSize - 4) {
   ////if (iko.Angle > 16) { // Does this work? See issue 20190329°0451
   if (iko.Angle > 12345) {
      iko.Angle = 0;
   }
};
//======✂======================================================
/* eof */
