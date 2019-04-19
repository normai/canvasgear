/*! ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * This section holds the Develo2 algorithm
 *
 * id : section 20190401°0711 (after 20140901°0511)
 */

// Formal integration [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace represents the 'Develo2' algorithm
 *
 * @id 20190401°0713
 */
Cvgr.Algos.Develo2 = {

   /**
    * This function executes the drawing
    *
    * @id 20190401°0721 ✱
    * @status Under construction
    * @callers Only • Cvgr.Func.executeFrame
    * @param {Object} iko — This is Cvgr.Vars.icos[iNdx] from the caller
    */
   executeAlgorithm : function(iko) // [Cvgr.Algos.Develo2.executeAlgorithm]
   {
      'use strict';

      // preparation [seq 20190401°0722]
      var iSize = (iko.Width + iko.Height) / 2;
      var iDist = 2;

      // draw only in first round [condition 20190401°1011]
      if (true) {

         // prepare canvas [seq 20190401°0723]
         iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
         iko.Context.fillStyle = iko.BgColor;
         iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

         // prepare some lines [seq 20190401°0724]
         var aLins = new Array();
         var oLin1 = new Cvgr.Objs.Line(iDist, iSize / 2, iSize / 2 , iDist, iko.Color);
         var oLin2 = new Cvgr.Objs.Line(iSize / 2, iDist, iSize / 2, iSize - iDist, iko.Color2);
         var oLin3 = new Cvgr.Objs.Line(iSize / 2, iSize - iDist, iSize - iDist, iSize / 2, iko.Color3);
         aLins.push(oLin1);
         aLins.push(oLin2);
         aLins.push(oLin3);

         // draw the built lines [seq 20190401°0725]
         for (var i = 0; i < aLins.length; i++)
         {
            iko.Context.beginPath();
            iko.Context.moveTo(aLins[i].X1, aLins[i].Y1);
            iko.Context.lineTo(aLins[i].X2, aLins[i].Y2);
            iko.Context.lineWidth = 9;
            iko.Context.strokeStyle = aLins[i].Colo;
            iko.Context.stroke();
         }
      }

      // draw each round [seq 20190401°1013]
      if (iCursoPosX !== null) {

         // (.) draw [seq 20190401°1015]
         iko.Context.beginPath();
         iko.Context.arc ( iCursoPosX                        // center point x
                          , iCursoPosX                       // center point y
                           , 16 // nRadiCurr                 // radius
                            , 0                              // starting point angle in radians, starting east
                             , Math.PI * 2                   // endpoint angle in radians
                              , false                        // clockwise
                               );

         // (.) finish [seq 20140829°0518]
         iko.Context.closePath();
         iko.Context.fillStyle = iko.Color;
         iko.Context.fill();

      }

   }

   /**
    * This optional function shall pick up a cursor position
    *
    * @id 20190401°0741
    * @status Under construction
    * @callers Only •
    */
   , pickupCursor : function(evt) // [Cvgr.Algos.Develo2.pickupCursor]
   {
      // [seq 20190401°1025]
      iCursoPosX = 123;
      iCursoPosy = 123;
   }

   /**
    * This optional function shall pick up a keystroke
    *
    * @id 20190401°0751
    * @status Under construction
    * @callers Only •
    */
   , pickupKeystroke : function() // [Cvgr.Algos.Develo2.pickupKeystroke]
   {
   }

   , iCursoPosX : null // [prop 20190401°1021]
   , iCursoPosy : null // null // [prop 20190401°1023]

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190401°0731
    */
   , defaultProperties : { // [Cvgr.Algos.Develo2.defaultProperties]
      BgColor : 'AntiqueWhite'
      , Color : 'LightCoral'
      , Color2 : 'PaleGreen'
      , Color3 : 'LightBlue'
      , DrawNumberLimit : 0
   }
};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
