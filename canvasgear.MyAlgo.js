/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This script supplements a CanvasGear algorithm [file 20190329°0611]
 *
 * version : 0.2.0.g — 20190331°0631
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */

// Formal integration into main script [seq 20190329°0621`03]
'use strict';
var Cvgr = Cvgr || {}; // (after parent 20180618°0621)
Cvgr.Algos = Cvgr.Algos || {}; // (after parent 20180619°0111)

/**
 * This namespace holds the Template algorithm, or any renamed one
 *
 * Usage. This is a template to spawn algorithm modules from.
 *  If you have copied canvasgear.Template.js to another file,
 *  e.g. canvasgear.MyAlgo.js, then rename this namespace and
 *  it's members respectively, e.g. Cvgr.Algos.MyAlgo etc.
 *
 * @id 20190329°0624 (after 20190329°0623)
 */
Cvgr.Algos.MyAlgo = {};

/**
 * This function implements the drawing algorithm
 *
 * @id 20190329°0631
 * @callers Only • Cvgr.Func.executeFrame
 * @note See issue 20190329°0421 'impossible index', is it solved?
 * @param {Object} iko — The Icon object to paint
 */
Cvgr.Algos.MyAlgo.executeAlgorithm = function(iko)
{

   // prologue — no-animation flag [seq 20190329°0427]
   // todo : Make this flag an algo property and process it before here
   if (iko.DrawOnlyOnce) { return; }

   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   // Above were formal lines, below comes wanted fuctionality.
   // Have fun experimenting with your modifications.
   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   // prepare canvas [seq 20190329°0441]
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate center position [line 20190329°0442]
   // note : The calculation is redundant to 'iSize'.
   var iCenterX = iko.Width / 2;
   var iCenterY = iko.Height / 2;

   // (.) adjust center position by shift [seq 20190329°0443]
   iCenterX = (iko.ShiftX !== null) ? iCenterX + parseInt(iko.ShiftX, 10) : iCenterX;
   iCenterY = (iko.ShiftY !== null) ? iCenterY + parseInt(iko.ShiftY, 10) : iCenterY;

   // (.) calculate radius [seq 20190329°0444]
   var nRadius = ( (iko.Width + iko.Height) / 4) * 0.44;

   // (.) draw something [seq 20190329°0445]
   iko.Context.beginPath();
   iko.Context.arc ( iCenterX                                  // center x coordinate
                    , iCenterY                                 // center y coordinate
                     , nRadius                                 // radius
                      , 0.1 + iko.Angle                        // start angle in radians
                       , (Math.PI * 2) * 0.8  + iko.Angle      // stop angle in radians
                        , false                                // clockwise
                         );

   // (.) finish [seq 20190329°0446]
   //iko.Context.closePath();
   iko.Context.strokeStyle = iko.Color;
   iko.Context.lineWidth = 6;
   iko.Context.stroke();

   // progress [seq 20190329°0447]
   //  Remember todo 20190329°0833 'centralize progression'
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
   if (iko.Angle > Math.PI * 2) {
      iko.Angle = iko.Angle - Math.PI * 2;
   }
};
// - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
/* eof */
