/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This script serves as template to spawn CanvasGear algorithms
 *
 * id : file 20190329°0611
 * version : 0.2.3 — 20190402°0641
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 */

'use strict';

// Formal integration into main script
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the Template algorithm
 *
 * Usage — Either directly edit below function executeAlgorithm,
 *  or copy this file to another algorithm name and edit the copy.
 *
 *  If you have copied canvasgear.Template.js to another file you must
 *  adjust the namespace respectively. E.g. for file canvasgear.MyAlgo2.js,
 *  the namespace must be named Cvgr.Algos.MyAlgo2
 *
 *  Use the new algorithm name in your HTML canvas and edit executeAlgorithm.
 *
 *  Your new algorithm will be automatically detected from the parent script
 *  canvasgear.js by through the naming convention. No need to add a script tag.
 *
 * @id 20190329°0623
 */
Cvgr.Algos.Template = {

   /**
    * This function implements the drawing. Edit it for your experiments
    *
    * @id 20190329°0631
    * @callers Only • Cvgr.Func.executeFrame
    * @param {Object} iko — The Icon object to paint
    */
   executeAlgorithm : function(iko)
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
      iko.Context.arc ( iCenterX                                       // center x coordinate
                       , iCenterY                                      // center y coordinate
                        , nRadius                                      // radius
                         , 0.1 + iko.Angle                             // start angle in radians
                          , (Math.PI * 2) * 0.95  + iko.Angle          // stop angle in radians
                           , false                                     // clockwise
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
      iko.Context.font = "0.9em Arial";
      iko.Context.fillText(sText, 3, 21);                              // text, start pos x, start pos y

      // progress [seq 20190329°0447]
      //  Remember todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI * 2)
      {
         iko.Angle = iko.Angle - Math.PI * 2;
      }
   }

   /**
    * This object defines the default properties for this algorithm
    *
    * @id 20190329°0617
    */
   , defaultProperties :
   {
      DrawNumberLimit : 0 // unlimited frames, perform animation
   }

};
﻿/* - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
/* eof */
