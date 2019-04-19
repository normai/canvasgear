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

      // preparation [seq 20190401°0731]
      var iSize = (iko.Width + iko.Height) / 2;

      // prepare canvas [seq 20190401°0733]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // build some lines [seq 20190401°0735]
      var lins = new Array();
      var lin1 = new Cvgr.Objs.Line(3, 3, iSize -3, 3, iko.Color);
      var lin2 = new Cvgr.Objs.Line(4, iSize - 4, iSize - 4, iSize - 4, iko.Color2);
      var lin3 = new Cvgr.Objs.Line(5, iSize - 7, iSize - 5, 7, iko.Color3);
      lins.push(lin1);
      lins.push(lin2);
      lins.push(lin3);

      // draw the built lines [seq 20190401°0737]
      for (var i = 0; i < lins.length; i++)
      {
         iko.Context.beginPath();
         iko.Context.moveTo(lins[i].X1, lins[i].Y1);
         iko.Context.lineTo(lins[i].X2, lins[i].Y2);
         iko.Context.lineWidth = 3;
         iko.Context.strokeStyle = lins[i].Colo;
         iko.Context.stroke();
      }
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190401°0741
    */
   , defaultProperties : { // [Cvgr.Algos.Develo2.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral' // Red
      , Color2 : 'PaleGreen' // Green
      , Color3 : 'LightBlue' // Blue
   }
};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
