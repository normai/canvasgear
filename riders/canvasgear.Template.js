/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This script serves as template to spawn CanvasGear algorithms
 *
 * id : file 20190329°0611
 * version : 0.2.5
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2021 Norbert C. Maier https://github.com/normai/canvasgear/
 */

/**
 *  Formal integration into main script
 *
 * @id seq 20190329°0621`xx
 * @type {Object} —
 * @c_o_n_s_t — Namespace
 */
var Cvgr = Cvgr || {};

/**
 *  Formal integration into main script
 *
 * @id seq 20190329°0621`xx
 * @type {Cvgr.Algos} —
 * @c_o_n_s_t — Namespace
 */
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
      'use strict';

      // Prepare canvas [seq 20190329°0441]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // (.) Calculate center position [line 20190329°0442]
      // note : The calculation is redundant to 'iSize'.
      var iCenterX = iko.Width / 2;
      var iCenterY = iko.Height / 2;

      // (.) Adjust center position by shift [seq 20190329°0443]
      iCenterX = (iko.ShiftX !== null) ? iCenterX + parseInt(iko.ShiftX, 10) : iCenterX;
      iCenterY = (iko.ShiftY !== null) ? iCenterY + parseInt(iko.ShiftY, 10) : iCenterY;

      // (.) Calculate radius [seq 20190329°0444]
      var nRadius = ( (iko.Width + iko.Height) / 4) * 0.55;

      // (.) Draw something [seq 20190329°0445]
      iko.Context.beginPath();
      iko.Context.arc ( iCenterX                                       // center x coordinate
                       , iCenterY                                      // center y coordinate
                        , nRadius                                      // radius
                         , 0.1 + iko.Angle                             // start angle in radians
                          , (Math.PI * 2) * 0.95  + iko.Angle          // stop angle in radians
                           , false                                     // clockwise
                            );

      // (.) Finish [seq 20190329°0446]
      iko.Context.strokeStyle = iko.Color;
      iko.Context.lineWidth = 6;
      iko.Context.stroke();

      // Add text [seq 20190331°0531] (after parent 20190331°0521 'write text')
      // See howto 20190331°0541 'about linebreaks in canvas'
      var sText = "Template extern";
      if (iko.CmdsHash['text']) {
         sText = iko.CmdsHash['text'];
      }
      iko.Context.fillStyle = 'MediumVioletRed';
      iko.Context.font = "0.9em Arial";
      iko.Context.fillText(sText, 3, 21);                              // text, start pos x, start pos y

      // Progress [seq 20190329°0447]
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
    * @type {Object} —
    */
   , defaultProperties :
   {
      /**
       * @id 20190329°0618
       * @type {number} (integer) —
       */
      DrawNumberLimit : 0                                              // unlimited frames, perform animation
   }

};
/* - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* eof */
