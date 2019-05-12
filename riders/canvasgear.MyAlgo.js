/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This script supplements a CanvasGear algorithm [file 20190329°1111]
 *
 * version : 0.2.3.d
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */

// Formal integration into main script [seq 20190329°0621`03]
var Cvgr = Cvgr || {}; // (after parent 20180618°0621)
Cvgr.Algos = Cvgr.Algos || {}; // (after parent 20180619°0111)

/**
 * This namespace holds the MyAlgo algorithm
 *
 * @id 20190329°1121 (after 20190329°0623)
 */
Cvgr.Algos.MyAlgo = {};

/**
 * This function implements the drawing algorithm
 *
 * @id 20190329°1131 (after 20190329°1131)
 * @callers Only • Cvgr.Func.executeFrame
 * @param {Object} iko — The Icon object to paint
 */
Cvgr.Algos.MyAlgo.executeAlgorithm = function(iko)
{
   'use strict';

   // prepare canvas [seq 20190329°1141]
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate center position [line 20190329°1142]
   // note : The calculation is redundant to 'iSize'
   var iCenterX = iko.Width / 2;
   var iCenterY = iko.Height / 2;

   // (.) adjust center position by shift [seq 20190329°1143]
   iCenterX = (iko.ShiftX !== null) ? iCenterX + parseInt(iko.ShiftX, 10) : iCenterX;
   iCenterY = (iko.ShiftY !== null) ? iCenterY + parseInt(iko.ShiftY, 10) : iCenterY;

   // (.) calculate radius [seq 20190329°1144]
   var nRadius = ( (iko.Width + iko.Height) / 4) * 0.44;

   // (.) draw something [seq 20190329°1145]
   iko.Context.beginPath();
   iko.Context.arc ( iCenterX                                  // center x coordinate
                    , iCenterY                                 // center y coordinate
                     , nRadius                                 // radius
                      , 0.1 + iko.Angle                        // start angle in radians
                       , (Math.PI * 2) * 0.8  + iko.Angle      // stop angle in radians
                        , false                                // clockwise
                         );

   // (.) finish [seq 20190329°1146]
   iko.Context.strokeStyle = iko.Color;
   iko.Context.lineWidth = 6;
   iko.Context.stroke();

   // progress [seq 20190329°1147]
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
   if (iko.Angle > Math.PI * 2) {
      iko.Angle = iko.Angle - Math.PI * 2;
   }
};

/**
 * This object defines default properties for this algorithm.
 *
 * @id 20190329°1151
 */
Cvgr.Algos.MyAlgo.defaultProperties = {
      DrawNumberLimit : 0
};

/* - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* eof */
