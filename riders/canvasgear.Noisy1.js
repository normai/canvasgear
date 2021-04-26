/*! ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * This section holds the Noisy1 figure
 *
 * id : file 20190401°0711 (after 20140901°0511)
 */
// note : Words — Algorithm figure gesture paragon pattern

// Formal integration [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace represents the Noisy1 algorithm
 *
 * @id 20190401°0713
 */
Cvgr.Algos.Noisy1 = {

   /**
    * This function executes the drawing
    *
    * @id 20190401°0721 ✱
    * @status Under construction
    * @callers Only • Cvgr.Func.executeFrame
    * @param {Object} iko — This is Cvgr.Vars.icos[iNdx] from the caller
    */
   executeAlgorithm : function(iko) // [Cvgr.Algos.Noisy1.executeAlgorithm]
   {
      'use strict';

      // () preparation [seq 20190401°0722]
      var iSize = (iko.Width + iko.Height) / 2;
      var iDist = 2;

      // () pass canvas to the event handlers [line 20190401°1217]
      Cvgr.Algos.Noisy1.oIko = iko;

      // (A) draw only in first round [condition 20190401°1011]
      // No, it needs be drawn each round, because if iko.Context.clearRect()
      //  is missing, then all drawings below will accumulate over one another.
      var b_DrawThis = ( (Cvgr.Vars.iFrameNo - iko.iFrameDelay) < 2 );
      b_DrawThis = true;
      if ( b_DrawThis ) {

         // (A.2) prepare canvas [seq 20190401°0723]
         iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
         iko.Context.fillStyle = iko.BgColor;
         iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

         // (A.3) prepare some lines [seq 20190401°0724]
         var aLins = [];
         var oLin1 = new Cvgr.Objs.Line(iDist, iSize / 2, iSize / 2 , iDist, iko.Color);
         var oLin2 = new Cvgr.Objs.Line(iSize / 2, iDist, iSize / 2, iSize - iDist, iko.Color2);
         var oLin3 = new Cvgr.Objs.Line(iSize / 2, iSize - iDist, iSize - iDist, iSize / 2, iko.Color3);
         aLins.push(oLin1);
         aLins.push(oLin2);
         aLins.push(oLin3);

         // (A.4) draw the built lines [seq 20190401°0725]
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

      // (B) draw with each round [seq 20190401°1013]
      if ( Cvgr.Algos.Noisy1.iCursorPosX !== null ) {

         // (C.1) draw [seq 20190401°1015]
         iko.Context.beginPath();
         iko.Context.arc ( Cvgr.Algos.Noisy1.iCursorPosX // nCurPosX  // center point x
                          , Cvgr.Algos.Noisy1.iCursorPosY // nCurPosY // center point y
                           , 16 // nRadiCurr                           // radius
                            , 0                                        // starting point angle in radians, starting east
                             , Math.PI * 2                             // endpoint angle in radians
                              , false                                  // clockwise
                               );

         // (C.2) finish [seq 20140829°0518]
         iko.Context.closePath();
         iko.Context.fillStyle = 'DeepPink';                           // o.Color;
         iko.Context.fill();

         // (D) draw ring buffer [seq 20190401°1051]
         for (var iNdx = 0; iNdx < Cvgr.Algos.Noisy1.aPoints.length; iNdx ++) {

            // (D.1) draw [seq 20190401°1053]
            var pt = Cvgr.Algos.Noisy1.aPoints[iNdx];
            iko.Context.beginPath();
            iko.Context.arc ( pt.ptX                                   // center point x
                             , pt.ptY                                  // center point y
                              , 9                                      // radius
                               , 0                                     // starting point angle in radians, starting east
                                , Math.PI * 2                          // endpoint angle in radians
                                 , false                               // clockwise
                                  );
            iko.Context.closePath();
            iko.Context.fillStyle = 'LightSlateGray';                  // o.Color;
            iko.Context.fill();
         }
      }

      // (E) debug [seq 20190401°1035]
      iko.Context.fillStyle = 'Teal';
      iko.Context.font = "0.9em monospace";                         // Arial monospace
      iko.Context.fillText('scrollX   = ' + (document.documentElement.scrollLeft || document.body.scrollLeft), 11, 28);
      iko.Context.fillText('scrollY   = ' + (document.documentElement.scrollTop || document.body.scrollTop), 11, 44);
      iko.Context.fillText('curX      = ' + Cvgr.Algos.Noisy1.iCursorPosX, 11, 60);
      iko.Context.fillText('curY      = ' + Cvgr.Algos.Noisy1.iCursorPosY, 11, 76);
      iko.Context.fillText('ptsNdx    = ' + Cvgr.Algos.Noisy1.iPtsNdx, 11, 92);
      iko.Context.fillText('keyboard  = ' + Cvgr.Algos.Noisy1.sKeyboard, 11, 108);
      iko.Context.fillText('sm2loaded = ' + Cvgr.Vars.bSoundLibraryLoaded, 11, 124);
      iko.Context.fillText('sm2ready  = ' + Cvgr.Vars.bSoundLibraryReady, 11, 140);
      iko.Context.fillText('canvasX   = ' + iko.Canvas.offsetLeft, 11, 156); // seems relative to parent element, not page
      iko.Context.fillText('canvasY   = ' + iko.Canvas.offsetTop, 11, 172);

   }

   /**
    * This function retrieves element position relative to the page
    *
    * @id 20190401°1543
    * @note Code after ref 20190401°1532 'PlainJs → Get position relative to document'
    * @param el {Element} The element of which to get the position
    * @callers •
    */
   , getElementPositionOnPage : function(el) // [Cvgr.Algos.Noisy1.getElementPositionOnPage]
   {
      'use strict';

      var rect = el.getBoundingClientRect()
                , scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
                 , scrollTop = window.pageYOffset || document.documentElement.scrollTop
                  ;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
   }

   /**
    * This optional function shall pick up the key-down event
    *
    * @id 20190401°1101
    * @callers Only •
    */
   , pickupOnKeyDown : function(evt) // [Cvgr.Algos.Noisy1.pickupOnKeyDown]
   {
      'use strict';

      // catch char [seq 20190401°1103]
      var oEvt = evt || window.event;
      ///if (typeof self.keys[sChar] !== 'undefined') soundManager.play('s' + self.keys[sChar]);
      ///var sChar = String.fromCharCode(oEvt.keyCode);
      ///var sChar = String.fromCharCode(oEvt.which);
      var sChar = oEvt.key;

      // process char [seq 20190401°1105]
      Cvgr.Algos.Noisy1.sKeyboard += ' ' + sChar;
      if ( Cvgr.Algos.Noisy1.sKeyboard.length > 17 ) {
         Cvgr.Algos.Noisy1.sKeyboard = Cvgr.Algos.Noisy1.sKeyboard.slice(Cvgr.Algos.Noisy1.sKeyboard.length - 17);
      }
   }

   /**
    * This optional function shall pick up the mouse-down event
    *
    * @id 20190401°1111
    * @callers Only •
    */
   , pickupOnMouseDown : function() // [Cvgr.Algos.Noisy1.pickupOnKeyDown]
   {
      'use strict';
   }

   /**
    * This optional function shall pick up the mouse-move event
    *
    * @id 20190401°1121
    * @see ref 20190401°0541 'Scott Schiller → A Noisy1 page (animation.js)'
    * @callers Only •
    */
   , pickupOnMouseMove : function(evt) // [Cvgr.Algos.Noisy1.pickupOnMouseMove]
   {
      'use strict';

      // [seq 20190402°0531]
      if ( Cvgr.Vars.bSoundLibraryReady ) {
         Cvgr.Vars.sound.play();
      }

      // fix cursor pos [line 20190401°1515]
      Cvgr.Algos.Noisy1.settle_cursorPos(evt.clientX, evt.clientY);

      // maintain ringbuffer [line 20190401°1525]
      Cvgr.Algos.Noisy1.settle_ringbuffer();
   }

   /**
    * This optional function shall pick the mouse-up event
    *
    * @id 20190401°1131
    * @callers Only •
    */
   , pickupOnMouseUp : function() // [Cvgr.Algos.Noisy1.pickupOnKeyDown]
   {
      'use strict';
   }

   /**
    * This optional function shall pick up the touch-move event
    *
    * @id 20190401°1141
    * @callers Only •
    */
   , pickupOnTouchMove : function(evt) // [Cvgr.Algos.Noisy1.pickupOnTouchMove]
   {
      'use strict';

      // [seq 20190401°1027]
      // finding : On a iPhone, this paints a dot where the screen
      //   is touched, but it does not follow a swipe
      Cvgr.Algos.Noisy1.iCursorPosX = evt.clientX;
      Cvgr.Algos.Noisy1.iCursorPosY = evt.clientY;
   }

   /**
    * This optional function shall pick up the touch-move event
    *
    * @id 20190401°1151
    * @callers Only •
    */
   , pickupOnTouchStart : function() // [Cvgr.Algos.Noisy1.pickupOnTouchStart]
   {
      'use strict';
   }

   /**
    * This function maintains the cursor positions ringbuffer
    *
    * @id 20190401°1523
    * @callers •
    */
   , settle_ringbuffer : function() // [Cvgr.Algos.Noisy1.settle_ringbuffer]
   {
      'use strict';

      // rotate ringbuffer index [seq 20190401°1026]
      if ( Cvgr.Algos.Noisy1.iPtsNdx === null ) {
         Cvgr.Algos.Noisy1.iPtsNdx = 0;
      }
      Cvgr.Algos.Noisy1.iPtsNdx += 1;
      if ( Cvgr.Algos.Noisy1.iPtsNdx > ( Cvgr.Algos.Noisy1.defaultProperties.TailLength - 1 )) {
         Cvgr.Algos.Noisy1.iPtsNdx = 0;
      }

      // write ringbuffer [seq 20190401°1043]
      var p = new Cvgr.Objs.Pojnt(Cvgr.Algos.Noisy1.iCursorPosX, Cvgr.Algos.Noisy1.iCursorPosY);
      if ( Cvgr.Algos.Noisy1.aPoints.length < ( Cvgr.Algos.Noisy1.iPtsNdx + 1 )) {
         Cvgr.Algos.Noisy1.aPoints.push(p);
      }
      else {
         Cvgr.Algos.Noisy1.aPoints[Cvgr.Algos.Noisy1.iPtsNdx] = p;
      }

      return;
   }

   /**
    * This function translates page cursor position to canvas cursor position
    *
    * @id 20190401°1513
    * @note Compare seq 20190324°0831 'fix the height calculation' in file 20190324°0757
    *     https://www.trekta.biz/svn/demosjs/trunk/fairydustcursor/fairyDustCursor2Trekta.js
    * @note : Remember todo 20190401°1223 'outsource lines'
    * @callers •
    */
   , settle_cursorPos : function(nClientX, nClientY) // [Cvgr.Algos.Noisy1.settle_cursorPos]
   {
      'use strict';

      // calculation [seq 20190401°1541]
      var nScrollAmountX = document.documentElement.scrollLeft || document.body.scrollLeft;
      var nScrollAmountY = document.documentElement.scrollTop || document.body.scrollTop;
      var divOffset = Cvgr.Algos.Noisy1.getElementPositionOnPage(Cvgr.Algos.Noisy1.oIko.Canvas);
      var nCurPosX = nClientX - divOffset.left + nScrollAmountX;
      var nCurPosY = nClientY - divOffset.top + nScrollAmountY;

      // [seq 20190401°1025] may be superfluous in favour of the ringbuffer
      Cvgr.Algos.Noisy1.iCursorPosX = nCurPosX; // evt.clientX;
      Cvgr.Algos.Noisy1.iCursorPosY = nCurPosY; // evt.clientY;
   }

   , aPoints : [] // [prop 20190401°1211] ring buffer for point objects

   , iCursorPosX : null // [prop 20190401°1021]

   , iCursorPosY : null // null // [prop 20190401°1023]

   , iPtsNdx : null // [prop 20190401°1213] pointer into the ring buffer

   , oIko : null // [prop 20190401°1215] provide canvas for the event handlers

   , sKeyboard : '' // [prop 20190401°1225]

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190401°0731
    */
   , defaultProperties : { // [Cvgr.Algos.Noisy1.defaultProperties]
      BgColor : 'AntiqueWhite'
      , Color : 'LightCoral'
      , Color2 : 'PaleGreen'
      , Color3 : 'LightBlue'
      , DrawNumberLimit : 0
      , PlaySound : 'yes'
      , TailLength : 32 // property dedicated for this algorithm [prop 20190401°1227]
   }
};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
