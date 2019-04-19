/*! ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * This section holds the Develo2 algorithm
 *
 * id : file 20190401°0711 (after 20140901°0511)
 */

'use strict';

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
      if ( Cvgr.Algos.Develo2.iCursorPosX !== null ) {


         // calculate fix [seq 20190401°1033]
         // Compare seq 20190324°0831 'fix the height calculation' in file 20190324°0757
         //    http://www.trekta.biz/svn/demosjs/trunk/fairydustcursor/fairyDustCursorTrekta.js
         var nScrollAmountX = document.documentElement.scrollLeft || document.body.scrollLeft;
         var nScrollAmountY = document.documentElement.scrollTop || document.body.scrollTop;

         // convenience [seq 20190401°1031]
         var nCurPosX = Cvgr.Algos.Develo2.iCursorPosX - iko.Canvas.offsetLeft + nScrollAmountX;
         var nCurPosY = Cvgr.Algos.Develo2.iCursorPosY - iko.Canvas.offsetTop + nScrollAmountY;

         // (.) draw [seq 20190401°1015]
         iko.Context.beginPath();
         iko.Context.arc ( nCurPosX                                    // center point x
                          , nCurPosY                                   // center point y
                           , 16 // nRadiCurr                           // radius
                            , 0                                        // starting point angle in radians, starting east
                             , Math.PI * 2                             // endpoint angle in radians
                              , false                                  // clockwise
                               );

         // (.) finish [seq 20140829°0518]
         iko.Context.closePath();
         iko.Context.fillStyle = 'DeepPink';                           // o.Color;
         iko.Context.fill();

         // debug [seq 20190401°1033]
         iko.Context.fillStyle = 'Teal';
         iko.Context.font = "1.1em monospace";                         // Arial monospace
         iko.Context.fillText('nScrollAmountY  = ' + nScrollAmountY, 11, 44);
         iko.Context.fillText('nCurPosY        = ' + nCurPosY, 11, 66);

      }

   }

   /**
    * This optional function shall pick up the key-down event
    *
    * @id 20190401°1101
    * @status Under construction
    * @callers Only •
    */
   , pickupOnKeyDown : function() // [Cvgr.Algos.Develo2.pickupOnKeyDown]
   {
   }

   /**
    * This optional function shall pick up the mouse-down event
    *
    * @id 20190401°1111
    * @callers Only •
    */
   , pickupOnMouseDown : function() // [Cvgr.Algos.Develo2.pickupOnKeyDown]
   {
   }

   /**
    * This optional function shall pick up the mouse-move event
    *
    * @id 20190401°1121 [[20190401°0741]]
    * @callers Only •
    */
   , pickupOnMouseMove : function(evt) // [Cvgr.Algos.Develo2.pickupOnMouseMove]
   {
      // [seq 20190401°1025]
      Cvgr.Algos.Develo2.iCursorPosX = evt.clientX;
      Cvgr.Algos.Develo2.iCursorPosY = evt.clientY;
   }

   /**
    * This optional function shall pick the mouse-up event
    *
    * @id 20190401°1131
    * @callers Only •
    */
   , pickupOnMouseUp : function() // [Cvgr.Algos.Develo2.pickupOnKeyDown]
   {
   }

   /**
    * This optional function shall pick up the touch-move event
    *
    * @id 20190401°1141
    * @callers Only •
    */
   , pickupOnTouchMove : function() // [Cvgr.Algos.Develo2.pickupOnTouchMove]
   {
   }

   /**
    * This optional function shall pick up the touch-move event
    *
    * @id 20190401°1151
    * @callers Only •
    */
   , pickupOnTouchStart : function() // [Cvgr.Algos.Develo2.pickupOnTouchStart]
   {
   }

   , iCursorPosX : null // [prop 20190401°1021]

   , iCursorPosY : null // null // [prop 20190401°1023]

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
