/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This script provides a CanvasGear algorithm [file 20190329°0611]
 *
 * version : 0.2.0.h.. — 20190331°0631
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */

'use strict'; // [line 20190329°0844`02]

// Formal integration into main script [seq 20190329°0621`02]
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
 * @id 20190329°0623
 */
Cvgr.Algos.Template = {};

/**
 * This function implements the drawing algorithm
 *
 * @id 20190329°0631
 * @callers Only • Cvgr.Func.executeFrame
 * @note See issue 20190329°0421 'impossible index', is it solved?
 * @param {Object} iko — The Icon object to paint
 */
Cvgr.Algos.Template.executeAlgorithm = function(iko)
{
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
   var nRadius = ( (iko.Width + iko.Height) / 4) * 0.55;

   // (.) draw something [seq 20190329°0445]
   iko.Context.beginPath();
   iko.Context.arc ( iCenterX                                  // center x coordinate
                    , iCenterY                                 // center y coordinate
                     , nRadius                                 // radius
                      , 0.1 + iko.Angle                        // start angle in radians
                       , (Math.PI * 2) * 0.95  + iko.Angle      // stop angle in radians
                        , false                                // clockwise
                         );

   // (.) finish [seq 20190329°0446]
   iko.Context.strokeStyle = iko.Color;
   iko.Context.lineWidth = 6;
   iko.Context.stroke();

   // add text [seq 20190331°0531] (after parent 20190331°0521 'write text')
   // See howto 20190331°0541 'about linebreaks in canvas'
   var sText = "Template extern";
   if (iko.CmdsHash['text']) {
      sText = iko.CmdsHash['text'];
   }
   iko.Context.fillStyle = 'MediumVioletRed';
   iko.Context.font = "0.9em Arial";                   // e.g. "20px Times Roman", "1.2em Arial"
   iko.Context.fillText(sText, 3, 21);                 // text, start pos x, start pos y

   // progress [seq 20190329°0447]
   //  Remember todo 20190329°0833 'centralize progression'
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
   if (iko.Angle > Math.PI * 2) {
      iko.Angle = iko.Angle - Math.PI * 2;
   }
};

/**
 * This object defines default properties for this algorithm.
 *
 * @id ~20190329°0617
 */
Cvgr.Algos.Template.defaultProperties = {
      DrawNumberLimit : 0
};
﻿/* - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
/* eof */
