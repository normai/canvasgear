﻿/*!
 * This script paints animated icons on HTML5 canvases
 *
 * version : 0.2.2.a — 20190401°0551..
 * license : GNU LGPL v3 or later https://www.gnu.org/licenses/lgpl.html
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * note : Minimized with Google Closure Compiler
 */
/**
 * @id : file 20140815°1213
 * @authors ncm
 * @encoding UTF-8-with-BOM
 * @note This shall work with Chrome 32.0, Edge 42 , FF 60, IE 9, Opera 58
 * @note Use canvas class 'skipthis' to skip canvas not to be process by CanvasGear
 * @note Search ✂
 */

'use strict'; // [line 20190329°0843]

/**
 * This namespace constitutes the CanvasGear root namespace
 *
 * See sequences 20190329°0621`
 * @id 20180618°0621 (this is parent)
 */
var Cvgr = {};

/**
 * This namespace holds the individual and possibly external algorithm namespaces
 *
 * @id 20180619°0111 (this is parent)
 */
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace stores CanvasGear constants
 *
 * @id 20140926°0741
 * @ref qna 20160612°0321 'semicolon after function definition'
 */
Cvgr.Const =
{
   /**
    * This constant tells the CanvasGear version number -- unused so far
    *
    * @id 20140926°0931
    */
    versionnumber : '0.2.2.a'

   /**
    * This constant tells the CanvasGear version timestamp -- unused so far
    *
    * @id 20140926°0932
    */
   , versiontimestamp : '20190401°0551..'

   /**
    * This ~constant tells whether to pop up debug messages or not
    *
    * @id 20190311°1523
    * @type Boolean
    */
   , bShow_Debug_Dialogs : false

};

/**
 * This namespace holds CanvasGear functions
 *
 * @id 20180618°0631
 */
Cvgr.Func = {};

/**
 * This namespace holds CanvasGear objects
 *
 * @id 20180618°0641
 */
Cvgr.Objs = {};

/**
 * This namespace holds CanvasGear global variables
 *
 * @id 20180618°0651
 */
Cvgr.Vars =
{
   /**
    * This flag is experimental ..
    *
    * @id 20180618°0642
    */
   bFlagTipTopTest : false

   /**
    * This flag is a humble helper
    *
    * @id 20190331°0331
    */
   , bTemplateSearchFinished : false

   /**
    * This number stores the CanvasGear start seconds
    *
    * @id 20180618°0643
    */
   , iTimeStart : 0

   /**
    * This number stores the CanvasGear start milliseconds
    *
    * @id 20180618°0644
    */
   , iTimeStartMs : 0 // unused so far

};

// initialize
Cvgr.Vars.iTimeStart = new Date();
Cvgr.Vars.iTimeStart.getTime();
Cvgr.Vars.iTimeStartMs = Cvgr.Vars.iTimeStart.getMilliseconds();

// initialize controls [seq 20140926°0811]
// note : This should be done after the document is completely loaded.
Cvgr.Vars.radiobuttn = document.getElementById("i20140819o1822"); // top
if (Cvgr.Vars.radiobuttn !== null)
{
   Cvgr.Vars.radiobuttn.checked = true;
}

/**
 * This class represents an algorithm object
 *
 * This shall store a drawing algorithm which acts on an Ikon object.
 * This design proposal is probably obsolete because replaced by namespace Algos.
 *
 * @id 20140815°1231
 * @status Under construction, implementation yet unclear
 * @note Compare ...
 */
Cvgr.Objs.Algo = function()
{
   this.Canvas = null;                                 // Canvas object - the canvas tag [prop 20140916°0552]
   this.Context = null;                                // Context object - attached to canvas [prop 20140916°0553]
   this.Funktion = null;                               // function - ... [prop 20140916°0554]
   this.Ikon = null;                                   // Ikon object - ...  [prop 20140916°0555]
   this.draw = function x()                            // function - The wanted algorithm  [prop 20140916°0556]
   {
      // The drawing function shall be provided by the caller
   };
};

/**
 * This class represents an icon object
 *
 * @id 20140815°1221
 * @note Line 'this.Algo = Cvgr.Func.algoPulse;' is bad, it makes
 *        the script disappear [note 20140828°0722]
 * @callers Only • func 20140815°1241 startCanvasGear
 */
Cvgr.Objs.Ikon = function()
{

   // public properties, to be set by user via HTML comment
   this.AlgoName = ''; // 'pulse'                      // string - algorithm (workaround for Algo) [prop 20140916°0512]
   this.BgColor = 'Transparent';                       // string - background color as RGB or webcolor [prop 20140916°0513]
   this.Color = 'Silver';                              // [prop 20140916°0514] string - RGB or webcolor
   this.Color2 = 'Gray';                               // [prop 20140916°0515] string - RGB or webcolor 
   this.Color3 = 'SlateGray';                          // string - RGB or webcolor (nowhere used?) [prop 20140916°0516]
   this.Hertz = 0.1;        ;                          // number - frequency in Hz [prop 20140916°0517]
   this.Ide = null;                                    // string - canvas ID, read from HTML [prop 20140926°0311]
   this.ShiftX = 0;                                    // int - horizontal offset (in pixel) [prop 20140916°0518]
   this.ShiftY = 0;                                    // int - vertical offset (in pixel) [prop 20140916°0522]
   this.SizeFactor = 1;                                // number - enlarge/reduce relative to automatic size [prop 20190328°0831]
   // this.Speed = null;                               // number - might complement Hertz [prop 20140916°0523]

   // constant properties, set from the canvas HTML attributes
   // // this.Diameter;                                // number - canvas size (in meter) [var 20140926°1331]
   this.Height = null;                                 // int - canvas height (in pixel) [prop 20140916°0524]
   this.Width = null;                                  // int - canvas width (in pixel) [prop 20140916°0525]

   // runtime private properties, set program internally
   this.Angle = 0;                                     // private [prop 20140916°0527]
   this.Canvas = null;                                 // object - the canvas tag DOM element [prop 20140916°0528]
   this.CmdsHash = null;                               // object/array - the commandline as an associative array [var 20140926°0651]
   this.Command = ''; // null;                         // string - the commandline as read from the html comment [prop 20140916°0532]
   this.Context = null;                                // object - attached to canvas [prop 20140916°0533]
   this.DrawNumberLimit = 1;                           // Draw frame one time, 0 means forever [prop 20190401°0433]
   this.iDrawCount = 0;                                // integer how often the icon is drawn completely [prop 20140916°0534]
   this.bIsDefaultSettingDone = false;                 // [prop 20190330°0353] important moment, now the icon is available
   this.iFrameDelay = 0;                               // [prop 20190401°0453] See finding 20190401°0451 'frame delay with pulled-behind canvases'
};

/**
 * This class represents one straight line
 *
 * @id 20140901°0511
 * @callers • function algoLines()
 * @status experimental, embryonic
 * @param {number} iX1 — x position start
 * @param {number} iY1 — y position start
 * @param {number} iX2 — x position end
 * @param {number} iY2 — y position end
 * @param {string} sColor — The web color name (see func 20140831°0321 Webcolors)
 * @param {number} iWidth — Optional, width in pixel
 */
Cvgr.Objs.Line = function(iX1, iY1, iX2, iY2, sColor, iThick)
{
   // workaround for missing default parameter [seq 20190312°0253]
   //  Remember issue 20190312°0251 'IE fails with default params'
   if (iWidth === undefined) {
       var iWidth = 2;
   }

   this.X1 = iX1;
   this.Y1 = iY1;
   this.X2 = iX2;
   this.Y2 = iY2;
   this.Colo = Trekta.Util2.colorNameToHex(sColor);
   this.Width = iThick;
};

/**
 * This class represents a two-dimensional point object
 *
 * @id 20140815°1221
 * @see ref 20140926°1231 'tutorial : write class in js'
 * @see ref 20140926°1413 'stoyan : define javascript class'
 * @see Book ref 20111031°1322 'Harms & Diaz : JavaScript object orientation ..'
 * @note This function is named similar instead exactly 'Point', just to text-search it more distinctively.
 * @callers • None yet
 * @param {number} nX — The x positon of the point
 * @param {number} nY — The y positon of the point
 */
Cvgr.Objs.Pojnt = function(nX, nY)
{
    this.X = nX;
    this.Y = nY;
    this.Colhor = "red";
    this.getIt = function()
    {
        return this.Colhor + ' ' + this.x + '/' + this.Y + ' apple';
    };
};

// Some 'static' variables for below function startCanvasGear()
Cvgr.Vars.icos = new Array();                          // [var 20140815°1246]
Cvgr.Vars.iFrameNo = 0;                                // [var 20140815°1247]

/**
 * This function starts CanvasGear
 *
 * @id 20140815°1241
 * @callers The page's body tag onload event or the onload event daisychain.
 *
 */
Cvgr.startCanvasGear = function()
{

   /**
    * This anonymous function might register the test radiobutton click handler.
    *
    * @id 20140819°1811
    * @see todo 20190330°0121 'register test buttons cleanup'
    * @note Does not work as expected. We need still onclick in HTML.
    * @note This can also be defined outside this function on script level.
    * @note Experimental shutdown 20170302°0321 did not work as expected
    * @todo 20160612°0341 : This function will destroy any already existing
    *     onload handlers. Use func 20160614°0331 windowOnloadDaisychain!
    */
   window.onload = function()
   {
      var bt1 = document.getElementById("i20140819o1821");
      var bt2 = document.getElementById("i20140819o1822");
      bt1.onclick = Cvgr.Func.setRadiobutton;
      bt2.onclick = Cvgr.Func.setRadiobutton;
   };

   // seq 20140815°0651 'workaround for missing requestAnimFrame'
   //  This provides a fallback for possibly missing requestAnimationFrame method.
   // see : issue 20140815°0641 'browser is missing requestAnimationFrame'
   // see : ref 20140815°0634 'paul irish : requestAnimationFrame'
   // see : ref 20140815°0635 'paul irish : requestAnimationFrame shim'
   //--------------------------------------------------
   // shim layer with setTimeout fallback
   window.requestAnimFrame = (function()
   {
      return window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
               || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame
                 || function( callback )
                    {
                       window.setTimeout(callback, 1000 / 60);
                    };
   })();
   //--------------------------------------------------

   // retrieve all canvases [seq 20140815°0941]
   var canvases = document.getElementsByTagName("canvas");
   // note : canvases is of type 'HTMLCollection[]' now

   // () loop over canvases and provide an Ikon object for each [seq 20140815°0942]
   for (var i = 0; i < canvases.length; i++)
   {
      // () possibly skip this canvas [seq 20140815°0943]
      // if the string 'skipthis' is found in the canvas HTML element
      if (canvases[i].outerHTML.indexOf("skipthis") > -1 ) {
         continue;
      }

      // () create Ikon object for this one canvas [seq 20140815°0944]
      var ico = new Cvgr.Objs.Ikon();

      // () basic properties setting [seq 20140815°0945]
      //  The values which are known from the canvas
      ico.Canvas = canvases[i];
      ico.Context = canvases[i].getContext('2d');
      ico.Ide = canvases[i].id;
      ico.Width = ico.Canvas.width;
      ico.Height = ico.Canvas.height;

      // () read commandline [line 20140830°0311 v 20180619°0211]
      ico.Command = ico.Canvas['attributes']['data-cvgr'].value;
      // Now ico.Command is known, e.g. "algo=pulse hertz=111 color=orange"

      // () parse commandline [line 20140815°0946]
      ico.CmdsHash = Trekta.Util2.CmdlinParser.parse(ico.Command, true);

      // set AlgoName in advance [line 20190330°0221]
      ico.AlgoName = ( ( 'algo' in ico.CmdsHash ) && (ico.CmdsHash['algo'] !== '') )
                    ? ico.CmdsHash['algo']
                     : 'pulse'
                      ;

      // (O) put it on array of canvases [line 20140904°0656]
      Cvgr.Vars.icos.push(ico);
   }

   // [line 20140904°0657]
   canvases = null; // deleting a canvas is no good idea, better set it null

   // ignit continuous drawing [seq 20140815°0947]
   Cvgr.Func.executeFrame();
};

/**
 * This array stores the AlgoName of the pulled-behind script
 *
 * Important: All three aPull* arrays have their indices in parallel
 *
 * @id 20190330°0341
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyAlgoNames = [];

/**
 * This array stores the module names for the second pullbehind attempt
 *
 * @id 20190331°0315
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyModuleNamesTwo = [];

/**
 * The callback stockpile array is the brute force helper for
 *  solving issue 20190330°0355 'callback parameters useless'
 *
 * @id [var 20190330°0415]
 * @note Remember todo 20190330°0423 'catch callback stockpile array overflow'
 * @see todo 20190401°0523 'combine piggy variables'
 * @type {Array}
 */
Cvgr.Vars.aPiggyCallbacks = [];
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 0 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 0 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 0 ); } )
                                   , ( function() { Cvgr.Func.pullbehind_onError( 0 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 1 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 1 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 1 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 1 ); } )
                                    ]);

Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 2 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 2 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 2 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 2 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 3 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 3 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 3 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 3 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 4 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 4 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 4 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 4 ); } )
                                    ]);
/* */
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 5 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 5 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 5 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 5 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 6 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 6 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 6 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 6 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 7 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 7 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 7 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 7 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 8 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 8 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 8 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 8 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 9 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 9 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 9 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 9 ); } )
                                    ]);
/* */

/**
 * This array stores error flags associated with the pullback attempts
 *
 * @id 20190331°0313
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyFlags4Avail = [];

/**
 * This array stores error flags associated with the pullback attempts
 *
 * @id 20190331°0311
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyFlags4OnError2 = [];

/**
 * This array stores success flags associated with the pullback attempts
 *
 * @id 20190329°0431
 * @see todo 20190401°0523 'combine piggy variables'
 * @note Not yet used, isn't it?
 */
Cvgr.Vars.aPiggyFlags4OnLoad1 = [];

/**
 * This array stores success flags associated with the pullback attempts
 *
 * @id 20190329°0432
 * @see todo 20190401°0523 'combine piggy variables'
 * @note Not yet used, isn't it?
 */
Cvgr.Vars.aPiggyFlags4OnError1 = [];

/**
 * This are the flags for the second pull-behind attempt
 *
 * @id 
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyIconArrays = [];

/**
 * This array stores the timers to examine the non-immediate algorithms
 *
 * @id 20190329°0433
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyTimers = [];

// helper variables for browser independend angle calculation
Cvgr.Vars.iFramesInLastTwoSeconds = 0;                 // [var 20140815°0934]
Cvgr.Vars.iFramesPerTowSeconds = 0;                    // [var 20140815°0935]
Cvgr.Vars.iMarkLastTwoSecond = 0;                      // [var 20140815°0932]
Cvgr.Vars.iMarkLastTwoSecondFrame = 0;                 // [var 20140815°0933]
Cvgr.Vars.nIncTurnsPerFrame = 0;                       // [var 20140815°0937] increment turns per frame for 1 Hz
Cvgr.Vars.nTrueAngleTurns = 0;                         // [var 20140815°0936] wanted browser independend angle in turns for 1 Hz

Cvgr.Vars.sDebugPageHelper = ''; // [var 20190330°0411]

/**
 * This function is called when pulling-behind a non-immediate algorithm, it
 *  examines success, and in case of failure cares for a replacement algorithm.
 *
 * This is some late quality control, because I do not (yet) trust the
 *  onload and onerror event handlers. All what is known and done here, should
 *  already have been known and done in either onload or onerror event handler.
 *
 * @id 20190329°0451
 * @todo 20190330°0441 : The two parameters iNdxPiggy and iko seem
 *     redundant, one of them should suffice. Does it`?
 * @param {Integer} iNdxPiggy — The index into the piggy arrays
 * @param {object} iko — The specific Ikon which's algo shall be examined
 */
Cvgr.Func.examineAlgo = function(iNdxPiggy, iko)
{

   // is algorithm available now? [condi 20190329°0453]
   var sAlgoNameOrg = iko.AlgoName;
   if ( iko.AlgoName in Cvgr.Algos ) {
      Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] = true;
   }
   else {
      // rider not found [seq 20190331°0345]
      // note : This is identical with seq 20190331°0343, it should be superfluous
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].AlgoName = 'pulse';
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Rpx ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.settleAlgoProperties(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }

   // debug output
   Cvgr.Vars.sDebugPageHelper += '<br /> — examineAlgo :' + ' piggy ' + iNdxPiggy + ' &nbsp;'
                       + ' onLoad = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy] + ' &nbsp;'
                        + ' onError1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] + ' &nbsp;'
                         + ' onError2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy] + ' &nbsp;'
                          + ' avail = ' + Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] + ' &nbsp;'
                           + ' algo = ' + sAlgoNameOrg + ' / ' + iko.AlgoName
                            ;
};

/**
 * This function prints to the Cvgr_CanvasAttachedInfoPara field
 *
 * @id 20190329°0921
 * @callers Only • executeFrame()
 * @param {Integer} iNdx
 */
Cvgr.Func.executeFram_PrintInfoCanvas = function(iNdx)
{
   // (x) output canvas status [seq 20140815°1251]
   // The ID of the output element has to be the ID of the canvas with added '.info'.
   // See ref 20190329°0513 'stackoverflow : convert float number to whole'
   var sIde = Cvgr.Vars.icos[iNdx].Ide + '.info'; // Cvgr_CanvasAttachedInfoPara
   var el = document.getElementById(sIde);
   if (el !== null)
   {
      // prepare print variable [seq 20140815°1311]
      var sOut = '<small>Canvas Debug Info :';

      // print fixed value set [seq 20140815°1313]
      sOut += "<br />iko.AlgoName = " + Cvgr.Vars.icos[iNdx].AlgoName + ' '
            + "<br />frame no = " + Cvgr.Vars.iFrameNo + ' '
            + "<br />iko.Angle = " + Cvgr.Vars.icos[iNdx].Angle.toFixed(9) + ' '
             +  "<br />iko.Color = " + Cvgr.Vars.icos[iNdx].Color
              + "<br />iko.Height = " + Cvgr.Vars.icos[iNdx].Height
               + "<br />iko.Mode = " + (Cvgr.Vars.bFlagTipTopTest ? 'Top' : 'Tip')
                + "<br />iko.Width = " + Cvgr.Vars.icos[iNdx].Width
                 ;

      // print commandline args [seq 20140815°1315]
      for ( var ki in Cvgr.Vars.icos[iNdx].CmdsHash )
      {
         var sValEscaped = Trekta.Utils.htmlEscape(Cvgr.Vars.icos[iNdx].CmdsHash[ki]);
         sOut += "<br /> [cmd] " + ki + " = " + sValEscaped;
      }

      // finish printing [seq 20140815°1317]
      sOut += "</small>";
      el.innerHTML = sOut;
   }
};

/**
 * This function prints to the page debug info
 *
 * @id 20190329°0931
 * @callers Only • executeFrame()
 */
Cvgr.Func.executeFram_PrintInfoPage = function ( iTimeCurr
                                                , iElapsedTwoSeconds
                                                 , iFramesPerSecondTotal
                                                  )
{
   // (.4) output Page Debug Info [seq 20140916°1032]
   var elDbg = document.getElementById("Cvgr_DebugPageOutputArea");
   if (elDbg !== null)
   {
      var s = "<b>CanvasGear Page Debug Info</b> :";
      s += " AlgoMode = " + (Cvgr.Vars.bFlagTipTopTest ? 'Top' : 'Tip') + "; ";
      s += " Frame number = " + Cvgr.Vars.iFrameNo + ";";
      s += "<br />Start time = " + Cvgr.Vars.iTimeStart + " = " + Cvgr.Vars.iTimeStart.valueOf() + ";";
      s += "<br />Current time = " + iTimeCurr;
      s += "<br />Elapsed seconds (every two) = " + iElapsedTwoSeconds + ";";
      s += "<br />Frames per seconds (total, average since start) = " + iFramesPerSecondTotal.toFixed(9);
      s += "<br />Frames per seconds (for the last two seconds) = " + Cvgr.Vars.iFramesPerTowSeconds.toFixed(9);
      s += "<br />True angle for 1 Hz (turns) = " + Cvgr.Vars.nTrueAngleTurns.toFixed(9) + ";";
      s += "<br />Increment per frame (turns) = " + Cvgr.Vars.nIncTurnsPerFrame.toFixed(9) + ";";
      s += "<br />" + Cvgr.Vars.sDebugPageHelper;
      elDbg.innerHTML = s;
   }
};

/**
 * This function performs the continuous drawing
 *
 * @id 20140815°1221
 * @callers • once from function Cvgr.startCanvasGear()
 *           • then periodically via requestAnimFrame()
 */
Cvgr.Func.executeFrame = function()
{

   // (P) output page status [seq 20140815°1247]
   // (P.1) calculate each frame [seq 20140815°1252]
   Cvgr.Vars.iFrameNo++;
   var iTimeCurr = new Date();
   iTimeCurr.getTime();
   var iElapsedMs = iTimeCurr - Cvgr.Vars.iTimeStart;
   var iFramesPerSecondTotal = Cvgr.Vars.iFrameNo / iElapsedMs * 1000;
   var iElapsedTwoSeconds = Math.floor( iElapsedMs / 2000 ) * 2;

   // (P.2) perform periodic measurment [seq 20140815°1253]
   if ( Cvgr.Vars.iMarkLastTwoSecond < iElapsedTwoSeconds )
   {
      Cvgr.Vars.iMarkLastTwoSecond = iElapsedTwoSeconds;
      Cvgr.Vars.iFramesInLastTwoSeconds = Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame;
      Cvgr.Vars.iFramesPerTowSeconds = (Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame) / 2;
      Cvgr.Vars.iMarkLastTwoSecondFrame = Cvgr.Vars.iFrameNo;
   }

   // (P.3) calculate true angle
   // (P.3.1) handle border situation [seq 20140815°1254]
   // On start no two-second measurement does exist, so use the first available
   //  value. This is imprecise, sometime half, sometime double the final value.
   if (Cvgr.Vars.iFramesPerTowSeconds < 0.001)
   {
      Cvgr.Vars.iFramesPerTowSeconds = iFramesPerSecondTotal * 2;
   }

   // (P.3.2) calculate increment per frame [seq 20140815°1255]
   // Remember note 20140916°1031 'known cornerstone values'
   Cvgr.Vars.nTrueAngleTurns = Cvgr.Vars.nTrueAngleTurns + (1 / Cvgr.Vars.iFramesPerTowSeconds);
   if (Cvgr.Vars.nTrueAngleTurns > 1)
   {
      Cvgr.Vars.nTrueAngleTurns = Cvgr.Vars.nTrueAngleTurns - 1;
   }
   Cvgr.Vars.nIncTurnsPerFrame = 1 / Cvgr.Vars.iFramesPerTowSeconds;

   // (P.4) debug output page status [line 20190329°0933] Cvgr_DebugPageOutputArea
   Cvgr.Func.executeFram_PrintInfoPage ( iTimeCurr
                                        , iElapsedTwoSeconds
                                         , iFramesPerSecondTotal
                                          );
   
   // process each Ikon on the page [seq 20140815°1256]
   for (var iNdx = 0; iNdx < Cvgr.Vars.icos.length; iNdx++)
   {
      // convenience [seq 20190330°0327]
      var iko = Cvgr.Vars.icos[iNdx];

      if ( iko.AlgoName === 'Template' ) {
         var sAlgo = sAlgo;
      }

      // process DrawNumberLimit flag [seq 20190401°0431]
      // Remeber issue 20190401°0435 'hamster appears multiple times'
      // Remember finding 20190401°0451 'frame delay with pulled-behind canvases'
      if ( ( ! iko.DrawNumberLimit < 1 )
          && ( ( Cvgr.Vars.iFrameNo - iko.iFrameDelay ) > iko.DrawNumberLimit )
           ) {
         continue;
      }

      // () debug output canvas status [line 20190329°0923]
      Cvgr.Func.executeFram_PrintInfoCanvas(iNdx);

      // () execute algorithm [seq 20140815°1257]
      //  Remember issue 20140828°0751 'Algo calling params quirk' — is it solved?
      // (.1) convenience
      var sAlgo = iko.AlgoName;

      // (.2) [condition 20190329°0411]
      // note : The condition got tricky with feature 20190330°0141 'external algo
      //  overwrites built-in one'. Before, it was plain "if (sAlgo in Cvgr.Algos)".
      if ( ( (sAlgo in Cvgr.Algos) && ( (sAlgo !== 'Template') || Cvgr.Vars.bTemplateSearchFinished ) )
          || ( iko.bIsDefaultSettingDone )
           )
      {
         // (2.1) immediate call [seq 20190329°0413]
         if ( ! iko.bIsDefaultSettingDone ) {
            Cvgr.Func.initializeCanvas(iko); // initialize icon
         }
         try {
            // execute icon
            Cvgr.Algos[sAlgo].executeAlgorithm(iko);
         } catch(err) {
            // it is e.g. the non-existent 'Oha' algorithm, note yet
            //  exchanged to the default algo. Just skip this.
            Cvgr.Vars.sDebugPageHelper += '<br />↯ executeAlgorithm failed:'
                            + 'Ide = ' + iko.Ide + ' algo = ' + sAlgo
                             + ' (should never happen'
                              ;
         }
      }
      else
      {
         // the wanted algorithm is *not* present in canvasgear.js itself

         // (2.2) try loading algo
         // (2.2.1) was this algo already processed? [seq 20190330°0343]
         var iNdxPiggy = Cvgr.Vars.aPiggyAlgoNames.indexOf(sAlgo);
         if ( iNdxPiggy >= 0 ) {
            // pull-behind requests are only done in the first round [condition 20190330°0431]
            if (Cvgr.Vars.iFrameNo < 2 ) {
               Cvgr.Vars.aPiggyIconArrays[iNdxPiggy].push(iko);
            }
            continue;
         }

         // () paranoia — prefabricated callback on stock? [seq 20190331°0611]
         if (Cvgr.Vars.aPiggyAlgoNames.length > (Cvgr.Vars.aPiggyCallbacks.length - 1)) {
            // No more prefabricated callback, immediately assign substitution algorithm
            Cvgr.Vars.sDebugPageHelper += '<br />*** Prefabricated callbacks finished : ' + Cvgr.Vars.aPiggyAlgoNames.length;

            iko.AlgoName = 'pulse';
            iko.CmdsHash['text'] = ('Substitute');
            continue;
         }

         // (2.2.2) load buddy module [seq 20190329°0415]
         var sPathAbs = Trekta.Utils.retrieveScriptFolderAbs('canvasgear.js'); // e.g. "http://localhost/canvasgear/"
         var sModuleNameOne = sPathAbs + 'riders/canvasgear.' + sAlgo + '.js';
         var sModuleNameTwo = sPathAbs + 'canvasgear.' + sAlgo + '.js';
         var iModuleIndex = Cvgr.Vars.aPiggyAlgoNames.length;

         // create piggy array set [seq 20190330°0344]
         // This helps to solve issue 20190330°0331 'pull-behind only per algo'
         // See todo 20190401°0523 'combine piggy variables'
         Cvgr.Vars.aPiggyAlgoNames.push(sAlgo);
         var ar = [];
         ar.push(iko);
         Cvgr.Vars.aPiggyIconArrays.push(ar);
         Cvgr.Vars.aPiggyFlags4Avail.push(false);
         Cvgr.Vars.aPiggyFlags4OnError2.push(false);
         Cvgr.Vars.aPiggyFlags4OnLoad1.push(false);
         Cvgr.Vars.aPiggyFlags4OnError1.push(false);
         Cvgr.Vars.aPiggyTimers.push ( setTimeout ( Cvgr.Func.examineAlgo
                                      , 1444                           // to be tuned
                                       , Cvgr.Vars.aPiggyTimers.length // index into the piggy arrays
                                        , Cvgr.Vars.icos[iNdx]         // why this?
                                         ));
         Cvgr.Vars.aPiggyModuleNamesTwo.push(sModuleNameTwo);

         // output debug message [line 20190330°0416]
         Cvgr.Vars.sDebugPageHelper += '<br /> — pullScriptBehind ' + iModuleIndex + ' ' + sAlgo;

         // try loading the wanted script [line 20190330°0417]
         // Heureka, with the hardcoded callback stockpile, the parameters work individually
         // Remember brute force debug issue 20190330°0355 'callback parameter useless'
         Trekta.Utils.pullScriptBehind ( sModuleNameOne
                                        , Cvgr.Vars.aPiggyCallbacks[iModuleIndex][0]
                                         , Cvgr.Vars.aPiggyCallbacks[iModuleIndex][1]
                                          );
      } // immediate-versus-load condition finished
   } // single canvas processing finished

   // setup for animation [line 20140815°1258]
   window.requestAnimFrame(Cvgr.Func.executeFrame);
};

/**
 * This function sets the algorithm properties, reading first the built-in
 *  default values, then overwriting them with the commandline values
 *
 * @id 20190330°0241
 * @note ref 20140926°0352 'Stackoverflow : Check key in object'
 * @note ref 20140926°0351 'Stacko : For-each on array'
 * @note ref 20111031°1322 'Harms & Diaz : JavaScript object oriented ...'
 * @see note 20190329°1043 'the icon properties so far'
 * @callers Two places •• each before Cvgr.Algos[sAlgo].executeAlgorithm
 * @param {Object} iko — The Ikon to be processed
 */
Cvgr.Func.initializeCanvas = function(iko)
{
   // (A) process properties [seq 20190330°0311]
   // (A.) translate tokens to property names [seq 20190330°0313]
   var oTokToProp = {
      algo : 'AlgoName'
      , bgcolor : 'BgColor'
      , color : 'Color'
      , color2 : 'Color2'
      , color3 : 'Color3'
      , height : 'Height'
      , hertz : 'Hertz'
      , shiftx : 'ShiftX'
      , shifty : 'ShiftY'
      , width : 'Width'
   };

   // (A.) get possible default properties [line 20190330°0242]
   // About JavaScript syntax — Curiously, here it causes no error, if the
   //  algorithm namespace has no defaultProperties defined, not even in IE9.
   var oDefaults = Cvgr.Algos[iko.AlgoName].defaultProperties;

   // (A.) first apply default values to Ikon object [line 20190330°0243]
   for (var sKey in oDefaults) {
      iko[sKey] = oDefaults[sKey];
   }

   // (A.) then overwrite with commandline values [seq 20190330°0244]
   for ( var sKeySrc in iko.CmdsHash) {

      // (A.) do not restore the algo name [seq 20190331°0321]
      //  Any not-found algo might have switched it to default algo ('pulse')
      if (sKeySrc === 'algo') {
         continue;
      }

      // (A.) translate [seq 20190330°0245]
      var sKeyTgt = sKeySrc;
      if (sKeySrc in oTokToProp) {
         sKeyTgt = oTokToProp[sKeySrc];
      }

      // (A.) write [seq 20190330°0246]
      iko[sKeyTgt] = iko.CmdsHash[sKeySrc];
   }

   // (B) process events [seq 20190401°0911]
   var sAlgo = iko.AlgoName;
   var bProcessCursor = false;
   var bProcessKeyboard = false;
   if ( 'pickupCursor' in Cvgr.Algos[sAlgo]) {
      bProcessCursor = true;
   }
   if ( 'pickupKeyboard' in Cvgr.Algos[sAlgo]) {
      bProcessKeyboard = true;
   }

   // (B.1) cursor [seq 20190401°0921]
   if ( bProcessCursor ) {

      //alert ("processing cursor");

      ////document.onmousemove = doPaint;
      ////document.onmouseup = stopPaint;
      iko.Canvas.onmousemove = Cvgr.Algos[sAlgo].pickupCursor;
      //document.onmouseup = stopPaint;
   }

   // (B.2) keyboard [seq 20190401°0931]
   if (bProcessKeyboard) {
      //
   }


   // (C) set signal [line 20190330°0344]
   iko.bIsDefaultSettingDone = true;
};

/**
 * This function is an event handler for the script onerror event.
 *   It is possibly called after wanted script pulled-behind failed.
 *
 * @id 20190331°0251
 * @note This code shall be pretty similar to func 20190329°0451 examineAlgo
 * @todo Check — Having the error feedback now, might make function examineAlgo superfluous.
 * @see ref 20190331°0238 'stackoverflow: tell if script faild to load'
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_onError = function(iNdxPiggy)
{
   if ( Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] === 'Template' ) {
      var xDbg = xDbg;
   }

   // was the second attempt already done? [condition 20190329°0434]
   if ( Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] === false ) {

      // pullbehind second attempt [line 20190331°0413]
      // See feature 20190331°0411 'rider scripts in two folders'
      Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] = true;
      Trekta.Utils.pullScriptBehind ( Cvgr.Vars.aPiggyModuleNamesTwo[iNdxPiggy]
                                     , Cvgr.Vars.aPiggyCallbacks[iNdxPiggy][0] // [2]
                                      , Cvgr.Vars.aPiggyCallbacks[iNdxPiggy][1] // [3]
                                       );
      Cvgr.Vars.sDebugPageHelper += '<br /> — pullScript_Second :'
                     + ' &nbsp; piggy ' + iNdxPiggy
                      + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] + '"'
                       + ' &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy]
                        + ' &nbsp; onerror1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy]
                         + ' &nbsp; onerror2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy]
                          ;
      return;
   }

   // main job [line 20190331°0253]
   Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy] = true;

   // is algorithm available now? [condi 20190329°0453]
   if ( Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] in Cvgr.Algos ) {

      // [seq 20190331°0333]
      Cvgr.Vars.bTemplateSearchFinished = true;
      Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] = true;

      // this should be the run only by 'Template', does it? [seq 20190401°0531]
      // So far, only Template is searched external, although it were available internal.
      // todo : Sequence is redundant with just below. Somehow merge the two.
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Template intern ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }
   else {
      // rider not found, switch to default algo [seq 20190331°0343 (like 20190331°0345)]
      // loop over this canvases
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         // switch this canvas to substitute algo
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].AlgoName = 'pulse';
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Rp ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }

   // debug output [seq 20190331°0255]
   Cvgr.Vars.sDebugPageHelper += '<br /> — pullbehind_onError :'
                     + ' &nbsp; piggy ' + iNdxPiggy
                      + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] + '"'
                       + ' &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy]
                        + ' &nbsp; onerror1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy]
                         + ' &nbsp; onerror2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy]
                          ;
};

/**
 * This function is called only after wanted script was pulled-behind
 *
 * @id 20190329°0211
 * @note Remember issue 20190330°0355 'callback parameter useless'
 * @note Curiously, the program works pretty well also without this
 *    function here. Does it really? Why? Is this function superfluous?
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_onLoad = function(iNdxPiggy)
{
   // main job [line 20190331°0323]
   Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy] = true;

   // fulfill [seq 20190330°0345] issue 20190330°0331 'pull-behind only per algo'
   var sAlgoNam = Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy];
   Cvgr.Vars.sDebugPageHelper += '<br /> — pullbehind_onLoad : piggy ' + iNdxPiggy;

   // [seq 20190330°0433]
   var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
   Cvgr.Vars.sDebugPageHelper += ' &nbsp; algo "' + aIcos[0].AlgoName
                               + '" &nbsp; count = ' + aIcos.length
                                ;

   // process all icons of this one algorithm [seq 20190330°0435]
   for (var i = 0; i < aIcos.length; i++) {

      // convenience [line 20190330°0437]
      var iko = aIcos[i];
      Cvgr.Vars.sDebugPageHelper += '<br /> — &nbsp; &nbsp; &nbsp; &nbsp; iko.Ide = ' + iko.Ide;

      // the algo might be not yet ready [condi 20190329°0213]
      // note : With the both requestAnimFrame plus pullScriptBehind
      //    intertweened, the exact callings may get a bit complicated.
      if (sAlgoNam in Cvgr.Algos) {
         // finally do the wanted algo [line 20190329°0215]
         if ( ! iko.bIsDefaultSettingDone ) {
            Cvgr.Func.initializeCanvas(iko);
         }
         iko.iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Algos[iko.AlgoName].executeAlgorithm(iko);
      }
   }
};

/**
 * This function constitutes the radiobuttons 'onClick' event handler
 *
 * @id 20140819°1751
 * @status Dummy function
 * @callers This is called when selecting a radiobutton
 */
Cvgr.Func.setRadiobutton = function()
{
   // toggle [seq 20140819°1753]
   var sMsg = '[Debug 20140926°1131]\n\nNow radio-button algo-mode = ';
   if (document.FormAlgoMode.AlgoMode[0].checked)
   {
      Cvgr.Vars.bFlagTipTopTest = false;
      sMsg += document.FormAlgoMode.AlgoMode[0].value;
   }
   else
   {
      Cvgr.Vars.bFlagTipTopTest = true;
      sMsg += document.FormAlgoMode.AlgoMode[1].value;
   }

   // debuge [seq 20140819°1755]
   if ( Cvgr.Const.bShow_Debug_Dialogs )
   {
      alert(sMsg);
   }

   return;
};

﻿/*! - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This section provides algorithm 'Ballist'
 *
 * id 20140916°0411 namespace
 * version : 0.x.x — 20190330°0757..
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the Ballist algorithm
 *
 * @id 20180619°0121
 */
Cvgr.Algos.Ballist = {

   /*
    * This function provides a hit object for the Ballist algorithm
    *
    * @id 20140916°0741
    * @param nRingval {}
    * @param nMinutes {}
    */
   Hit : function(nRingval, nMinutes) { // Cvgr.Algos.Ballist.Hit

      'use strict'; // [line 20190329°0843`14]

      // set source values
      this.ringval = nRingval;                            // number - the ring value (assumed from 1.0 to 10.9)
      this.minutes = nMinutes;                            // number - which minute on the clock

      // calculate cartesian coordinates
      var angle = this.minutes / 60 * Math.PI * 2;        // preliminary guess
      angle = angle + Math.PI * 1.5;                      // shift the 0-Minute from east position to north position

      // invert ring to radius
      // note 20140917°0311 : The final coordinates can only be calculated
      //    if the size of the target and the size of the canvas is known.
      var nRadi = 10.9 - this.ringval;                    // invert ring value to a radius number
      // //nRadi = nRadi * 0.2;                           // they calc from 1 to 10, we need from 1.1 to 10.9

      var nEmpricHelper = 0.20;
      var x = nRadi * Math.cos(angle) * nEmpricHelper;    // ELIMINATE empirical factor
      var y = nRadi * Math.sin(angle) * nEmpricHelper;    // ELIMINATE empirical factor

      this.X = x;                                         // number - calculated
      this.Y = y;                                         // number - calculated
   }

   /**
    * This class provides a ring object for the Ballist algorithm
    *
    * @id 20140815°1221
    * @param sRingName {}
    * @param nRadiusAbs {}
    * @param sColorRing {}
    * @param sColorSpace {}
    */
   , Ring : function(sRingName, nRadiusAbs, sColorRing, sColorSpace ) { // Cvgr.Algos.Ballist.Ring

      'use strict'; // [line 20190329°0843`12]

      // guarantee default values
      // note : not sure this sequence yet works properly
      if (sRingName === null) {
         sRingName ='?';
      }
      if (nRadiusAbs === null) {
         nRadiusAbs = 0.987;
      }
      if (sColorRing === null) {
         sColorRing = 'gray';
      }
      if (sColorSpace === null) {
         sColorSpace = 'white';
      }

      // set public properties
      this.ringname = sRingName;                          // string e.g. '1', '2', ..
      this.radiusAbs = nRadiusAbs;                        // number - radius absolute in meter
      this.colorRing = sColorRing;                        // string - color of the ring, RGB or webcolor
      this.colorSpace = sColorSpace;                      // string - color of the space for the ring RGB or webcolor
   }

   /*
    * This class provides a target object for the Ballist algorithm
    *
    * @id 20140916°0911
    * @param nRadius {} The target's radius in m, usually goes with lowest ring.
    */
   , Target : function() { // Cvgr.Algos.Ballist.Target

      'use strict'; // [line 20190329°0843`13]

      this.Diameter = 0.1;                                // diameter in meter [var 20140926°1151] the canvas scale shall be based on this
      this.Naame = '<n/a>';                               // the discipline name
      this.Shortnam = '<n/a>';                            //
      this.rings = new Array();                           // array of rings, to be filled by somebody
   }

   /**
    * This function .. is a test function
    *
    * @id 20140926°1211
    * @callers Only • func 20140916°0421 executeAlgorithm
    * @param {object} iko ...
    */
   , executeAlgo_drawDiagonal : function(iko) // Cvgr.Algos.Ballist.executeAlgo_drawDiagonal
   {
      'use strict'; // [line 20190329°0843`16]

      // preparation [seq 20140926°1212]
      var nHeight = iko.Height;                           // pixel — remember issue 20140901°0933 'Opera 10 peculiar about capitals'
      var nWidth = iko.Width;                             // pixel
      var nDist1 = 11;                                    // distance to the canvas border in pixel
      var nDistTwo = nDist1 / 2;                          // half distance

      // scale endpoints [seq 20140926°1213]
      var nX1 = nDist1;
      var nY1 = nHeight - nDist1;
      var nX2 = nWidth - nDist1;
      var nY2 = nHeight - nDist1;

      // draw [seq 20140926°1221]
      // note : Sequence written after sequence in Cvgr.Func.algoTriangle().
      iko.Context.beginPath();

      // do bulk work [seq 20140926°1214]
      // Remember issue 20140901°0933 'Opera 10 peculiar about capitals'
      iko.Context.moveTo(nX1, nY1);
      iko.Context.lineTo(nX2, nY2);

      iko.Context.moveTo(nX1, nY2 + nDistTwo);
      iko.Context.lineTo(nX1, nY2 - nDistTwo);

      iko.Context.moveTo(nX2, nY2 + nDistTwo);
      iko.Context.lineTo(nX2, nY2 - nDistTwo);

      iko.Context.strokeStyle = iko.Color;                             // ?
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();

      iko.Context.closePath();

      iko.Context.strokeStyle = 'turquoise';                           // 'lightgreen'
      iko.Context.lineWidth = 3;
      iko.Context.stroke();

      // add ruler part one [seq 20140926°1215]
      var s = "~0.11 m";
      iko.Context.font = "1.2em Arial";                                // e.g. "20px Times Roman", "1.2em Arial", "bold 14px verdana, sans-serif"
      iko.Context.fillStyle = "turquoise";                             // "aquamarine" // "#ff0000"
      iko.Context.fillText(s, nX1 + nDistTwo, nY1 - nDistTwo);         // IE8 Error 'Object doesn't support this property or method' (see issue 20160416°1321)

      /*
      todo 20140926°1341
      do : Outsource below sequence to a dedicated algorithm e.g. 'writetext'
      status : open
      */

      // add ruler part two [seq 20140926°1216 parent]
      // note : Remember issue 20140926°1321 'IE8 fails with Context.fillText' finished
      // Compare seq 20190331°0521 'write text'
      if (iko.CmdsHash['text']) {
         iko.Context.fillStyle = "#102030";
         iko.Context.font = "1.2em Arial";                     // e.g. "20px Times Roman", "1.2em Arial"
         iko.Context.fillText(iko.CmdsHash['text'], 10, 20);   // e.g. "Hello.."
      }
   }

   /**
    * This function .. is a private helper function
    * @id 20140926°0911
    * @status
    * @callers Only Cvgr.Algos.Ballist.executeAlgorithm
    * @param sSeries {} ..
    */
   , executeAlgo_getSeries : function(sSeries) // Cvgr.Algos.Ballist.executeAlgo_getSeries
   {
      'use strict'; // [line 20190329°0843`17]

      var hits = new Array();

      if (( typeof sSeries === 'undefined' ) || (sSeries.length < 1)) {

         // hardcoded default hitlist [seq 20140916°0751]
         var h = new Cvgr.Algos.Ballist.Hit(10.7, 55); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(9.3, 43); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.1, 0); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.2, 1); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.3, 3); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.4, 6); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.5, 10); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.6, 20); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.7, 30); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.8, 40); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.9, 50); hits.push(h);

         // retrieve series details ring-decimal/minutes-on-clock
         // Commandlines e.g.:
         //   - algo=Ballist series="10.7/55 9.3/43 8.5/39 6.2/43 3.3/33 1.0/11" id="i20140916o0731"
         //   - <!-- algo=Ballist series="9.3/43 8.5/39 8.0/45 8.9/51 8.5/56 9.7/29 9.9/27 8.5/17 8.3/42 6.3/43 9.7/1 9.9/45 9.8/47 7.8/41 6.2/43 10.0/16 10.2/44 9.8/7 8.1/47 7.9/20 10.1/7 9.4/11 9.4/14 9.6/32 7/8/48 9.0/20 8.1/3 8.9/32 6.2/28 6.5/39" id="i20140914o1330" -->
         //   - <!-- algo=Ballist series="10.4/40 10.3/42 10.6/47 10.3/56 9.2/11 9.7/16 9.6/34 9.1/39 9.9/54 9.9/58 8.4/48 8.6/50 8.6/53 7.4/54 6.5/55" id="i20140926o203021" -->

         // read series from commandline [line 20140926°0851]
         // // var a = iko.CmdsHash['series'];
         // sSeries ..

      }
      else {

         // read from somewhere
         // .. parse ..
         var a1 = sSeries.split(" ");
         for (var i = 0; i < a1.length; i++) {
            var a2 = a1[i].split("/");
            var h = new Cvgr.Algos.Ballist.Hit(a2[0], a2[1]); hits.push(h);
         }
      }

      return hits;
   }

   /**
    * This function delivers a target object depending on the given name
    *
    * @id 20140916°0921
    * @status Under construction
    * @note function Cvgr.Algos.Ballist.Ring(sRingName, nRadiusAbs, sColorRing, sColorSpace )
    * @note The details are still be to adjusted.
    * @param sTargetName {string} ..
    */
   , executeAlgo_getTarget : function(sTargetName) // Cvgr.Algos.Ballist.executeAlgo_getTarget
   {
      'use strict'; // [line 20190329°0843`18]

      var target = new Cvgr.Algos.Ballist.Target();

      if (sTargetName === 'kkspp') {
         // ref : http://commons.wikimedia.org/wiki/Category:Targets?uselang=de#mediaviewer/File:25_Meter_Precision_and_50_Meter_Pistol_Target.svg (20140926°1331)
         target.Diameter = 0.500;
         target.Naame = "Sportpistole 25 m Präzision";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.025, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.075, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.125, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.150, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.175, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.200, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.225, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'white'));
      }
      else if (sTargetName === 'kkspd') {
         target.Diameter = 0.500;
         target.Naame = "Sportpistole 25 m Duell";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.150, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.200, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'black'));
      }
      else if (sTargetName === 'lg10m') {
         target.Diameter = 0.050;
         target.Naame = "Luftgewehr 10 m";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0025, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0075, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0125, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0150, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0175, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0200, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0225, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0250, 'blue' , 'white'));
      }
      else if (sTargetName === 'lgdt10m') {
         target.Diameter = 0.0100;
         target.Naame = "Deutsche Luftgewehr-Scheibe 10 m";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0005, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0010, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0015, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0020, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0025, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0030, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0035, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0040, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0045, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0050, 'blue' , 'white'));
      }
      else {
         target.Diameter = 0.1500;
         target.Naame = "Luftpistole 10 m";
         target.Shortnam = 'lupi10m';
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0055, 'black', 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0135, 'black', 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0215, 'gray' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0295, 'gray' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0375, 'gray' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0455, 'gray' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0535, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0615, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0695, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0775, 'red'  , 'white'));
      }

      return target;
   }

   /**
    * This function implements the drawing algorithm
    *
    * @id 20140916°0421
    * @status under construction
    * @note The statement 'fill() includes closePath()' is true only to some
    *         degree, e.g. *not* for drawing the final line to origin.
    * @note Compatibility: Seems not to work with IE8
    * @callers • Cvgr.Func.executeFrame
    * @param {array} icos — This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param {number} iNdx — The index into the Cvgr.Vars.icos array.
    */
   , executeAlgorithm : function(iko) // Cvgr.Algos.Ballist.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`15]

      // retrieve target [seq 20140916°0433]
      var tgt = Cvgr.Algos.Ballist.executeAlgo_getTarget();

      // retrieve series [seq 20140916°0434]
      var hits = Cvgr.Algos.Ballist.executeAlgo_getSeries(iko.CmdsHash['series']);

      // prepare canvas [seq 20140916°0435]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // (.) calculate center point from canvas length and height [seq 20140916°0436]
      // note : The calculation is redundant to 'iSize'.
      var iCenterPoint = (iko.Width + iko.Height) / 4; // this is half iSize

      // (.) adjust center position from possible shift [seq 20140916°0437]
      var iRadiX = iCenterPoint;
      var iRadiY = iCenterPoint;
      if (iko.ShiftX !== null) {
         var iRadiX = iCenterPoint + parseInt(iko.ShiftX, 10);
      }
      if (iko.ShiftY !== null) {
         var iRadiY = iCenterPoint + parseInt(iko.ShiftY, 10);
      }

      // (.) paint rings [seq 20140916°0442]
      for (var iLoop = 0; iLoop < tgt.rings.length; iLoop++) {

         // (.) calculate current radius [seq 20140916°0443]
         // todo: Replace fixed factor by calculated factor
         var radius = iCenterPoint * tgt.rings[iLoop].radiusAbs * 12;

         // (.) draw [seq 20140916°0444]
         iko.Context.beginPath();                         // circle
         iko.Context.arc ( iRadiX                         // x coordinate, e.g. 90
                          , iRadiY                        // y coordinate, e.g. 90
                           , radius                       // radius, e.g. 90
                            , 0                           // starting point angle in radians, starting east
                             , Math.PI * 2                // endpoint angle in radians
                              , false                     // clockwise
                               );

         // (.) finish [seq 20140916°0445]
         iko.Context.closePath();
         iko.Context.strokeStyle = Trekta.Util2.colorNameToHex(tgt.rings[iLoop].colorRing);
         iko.Context.lineWidth = 1;
         iko.Context.stroke();
      }

      // (.) paint hits [seq 20140916°0446]
      for (var i = 0; i < hits.length; i++) {

         // (.) calculate radius [seq 20140916°0447]
         radius = 6;

         // (.) [seq 20140916°0448]
         var iRadiX = iCenterPoint + hits[i].X * 50 + parseInt(iko.ShiftX, 10);
         var iRadiY = iCenterPoint + hits[i].Y * 50 + parseInt(iko.ShiftY, 10);

         // (.) draw hit [seq 20140916°0452]
         iko.Context.beginPath();                      // circle
         iko.Context.arc ( iRadiX                      // x coordinate
                          , iRadiY                     // y coordinate
                           , radius                    // radius, e.g. 90
                            , 0                        // starting point angle in radians, starting east
                             , Math.PI * 2             // endpoint angle in radians
                              , false                  // clockwise
                               );

         // (.) finish [seq 20140916°0453]
         iko.Context.closePath();

         iko.Context.strokeStyle = '#4169e1'; // 'royalblue';
         iko.Context.lineWidth = 1;
         iko.Context.stroke();
      }

      // [seq 20140916°0454]
      Cvgr.Algos.Ballist.executeAlgo_drawDiagonal(iko);

      // progress [seq 20140916°0455]
      // note : Ballist algo is static anyway, progression is useless.
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI * 4) {
         iko.Angle = iko.Angle - Math.PI * 4;
      }
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190401°0423
    */
   , defaultProperties : {                             // [Cvgr.Algos.Ballist.defaultProperties]
   }
};
//- - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -

﻿/*! ^ ^ ^ ✂ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
 * This section provides the internal Template algorithm
 *
 * id : module 20190329°0611
 * version : 0.x.x — 20190330°0757..
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the Template algorithm, or any renamed one
 *
 * Usage. This is a template to spawn algorithm modules from.
 *  If you have copied canvasgear.Template.js to another file,
 *  e.g. canvasgear.MyAlgo.js, then rename this namespace and
 *  it's members respectively, e.g. Cvgr.Algos.MyAlgo etc.
 *
 * @id 20190330°0131 (after 20190329°0623)
 */
Cvgr.Algos.Template = Cvgr.Algos.Template || {};

/**
 * This function implements the drawing algorithm
 *
 * @id 201910329°0631
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
   var nRadius = ( (iko.Width + iko.Height) / 4) * 0.66;

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

   // add text [parent seq 20190331°0521 'write text']
   // See howto 20190331°0541 'about linebreaks in canvas'
   var sText = "Template intern";
   if (iko.CmdsHash['text']) {
      sText = iko.CmdsHash['text'];                    // e.g. "Hello.."
   }
   iko.Context.fillStyle = 'MediumVioletRed'; // "#102030";
   iko.Context.font = "0.9em Arial";                   // e.g. "20px Times Roman", "1.2em Arial"
   iko.Context.fillText(sText, 3, 21);

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
 * @id 201910329°0641
 */
Cvgr.Algos.Template.defaultProperties = {
   DrawNumberLimit : 0
};
// ^ ^ ^ ✂ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

/*! ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * This section holds the develop algorithm
 *
 * id : section 20140901°0511
 */

// Formal integration [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace represents the 'develop' algorithm
 *
 * @id 20140901°0513
 */
Cvgr.Algos.develop = {

   /**
    * This function executes the drawing
    *
    * @id 20140901°0521 ✱
    * @status Under construction
    * @callers Only • Cvgr.Func.executeFrame
    * @param {Object} iko — This is Cvgr.Vars.icos[iNdx] from the caller
    */
   executeAlgorithm : function(iko) // [Cvgr.Algos.develop.executeAlgorithm]
   {
      'use strict';

      // preparation [seq 20140901°0531]
      var iSize = (iko.Width + iko.Height) / 2;

      // prepare canvas [seq 20140901°0533]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // build some lines [seq 20140901°0535]
      var aLins = new Array();
      var oLin1 = new Cvgr.Objs.Line(3, 3, iSize -3, 3, iko.Color);
      var oLin2 = new Cvgr.Objs.Line(4, iSize - 4, iSize - 4, iSize - 4, iko.Color2);
      var oLin3 = new Cvgr.Objs.Line(5, iSize - 7, iSize - 5, 7, iko.Color3);
      aLins.push(oLin1);
      aLins.push(oLin2);
      aLins.push(oLin3);

      // draw the built lines [seq 20140901°0537]
      for (var i = 0; i < aLins.length; i++)
      {
         iko.Context.beginPath();
         iko.Context.moveTo(aLins[i].X1, aLins[i].Y1);
         iko.Context.lineTo(aLins[i].X2, aLins[i].Y2);
         iko.Context.lineWidth = 3;
         iko.Context.strokeStyle = aLins[i].Colo;
         iko.Context.stroke();
      }
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20140901°0541
    */
   , defaultProperties : { // [Cvgr.Algos.develop.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral' // Red
      , Color2 : 'PaleGreen' // Green
      , Color3 : 'LightBlue' // Blue
   }
};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

/*! + + + ✂ + + + + + + + + + + + + + + + + + + + + + + + + + +
 * This section provides the oblongrose algorithm
 *
 * id : module 20190329°0721
 * version :
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration of cut-out into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the 'oblongrose' algorithm
 *
 * @id 20190329°0722
 */
Cvgr.Algos.oblongrose = {

   /**
    * This function implements a drawing algorithm to draw a rose
    *
    * @id 20140828°1411
    * @status Not yet animated
    * @ref http://gnuzoo.org/rose/index.htm [20140815°0521]
    * @param {number} icos — This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param {number} iNdx — The index into the icos array.
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.oblongrose.executeAlgorithm
   {
      'use strict';

      // preparatory calculations [seq 20140916°0822]
      var iWhole = (iko.Width + iko.Height) / 2;
      var iHalf = iWhole / 2; // mostly not the whole is wanted but the half

      // prepare canvas [line 20140828°1423]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // set colors [seq 20140828°1424]
      iko.Context.strokeStyle = iko.Color;
      iko.Context.fillStyle = 'Yellow';                                // not applied below

      // rotate wrapper open [line 20190401°0442]
      // set registration point [line 20140828°1425]
      // Remember note 20190401°0441 'about rotation center point'
      // Remember issue 20190401°0435 'hamster appears multiple times'
      iko.Context.translate(iHalf, iHalf);

      // loop [seq 20140828°1426]
      var iNums = 16;
      var nRotate = 0;
      var nRotTotal = 0;
      for (var i = 0; i < iNums; i++)
      {
         // rotate [line 20140828°1427]
         nRotate = 1.7 * Math.PI / iNums;
         iko.Context.rotate(nRotate);
         nRotTotal += nRotate;

         // draw [line 20140828°1428]
         iko.Context.strokeRect ( iHalf * 0.1, iHalf * 0.1
                                 , iHalf * 0.3 , iHalf * 0.7
                                  );
      }

      // rotate wrapper close [line 20190401°0443]
      iko.Context.rotate(nRotTotal * -1);
      iko.Context.translate(iHalf * -1, iHalf * -1);
 
   }

   /**
    * This object defines default properties for this algorithm.
    *
    * @id 20190401°0421
    */
   , defaultProperties : { // [Cvgr.Algos.oblongrose.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral' // Red
      , Color2 : 'PaleGreen' // Green
      , Color3 : 'LightBlue' // Blue
      , DrawNumberLimit : 5
   }
};
// + + + ✂ + + + + + + + + + + + + + + + + + + + + + + + + + +

// -- -- ✂ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
/**
 * This namespace holds the 'pulse' algorithm
 *
 * @id 20190329°0731
 */
Cvgr.Algos.pulse = {

   /**
    * This function implements the pulse drawing algorithm
    *
    * @id 20140829°0511
    * @descript Features are:
    *    • Adjust the drawing size relative to the canvas size
    *    • Allow parameters 'shiftx' and 'shifty'
    *    • Use parameter 'hertz' instead of the old 'speed'
    * @status
    * @param {Array} icos — Array of icon objects, Cvgr.Vars.icos[iNdx] at the caller
    * @param {Integer} iNdx — The index into the array
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.pulse.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`24]

      // (.) calculate size [seq 20140829°0514]
      var nRadiFull = (iko.Width + iko.Height) / 2;
      nRadiFull = nRadiFull / 2;
      nRadiFull = nRadiFull * iko.SizeFactor;

      // (.) calculate position [seq 20140829°0516]
      var nPosX = (iko.Width / 2) + parseInt(iko.ShiftX, 9);
      var nPosY = (iko.Height / 2) + parseInt(iko.ShiftY, 9);

      // (.) calculate current radius [seq 20140829°0515]
      var nRadiCurr = 0;
      nRadiCurr = nRadiFull * Math.abs(Math.cos(iko.Angle));

      // (.) prepare canvas [seq 20140829°0513]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = "#f0f0f0";
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // (.) draw [seq 20140829°0517]
      iko.Context.beginPath();
      iko.Context.arc ( nPosX                             // center point x
                       , nPosY                            // center point y
                        , nRadiCurr                       // radius
                         , 0                              // starting point angle in radians, starting east
                          , Math.PI * 2                   // endpoint angle in radians
                           , false                        // clockwise
                            );

      // (.) finish [seq 20140829°0518]
      iko.Context.closePath();
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();

      // possibly add text [seq 20190331°0551] (after parent 20190331°0521 'write text')
      if ( iko.CmdsHash['text'] ) {
         var sText = iko.CmdsHash['text'];
         iko.Context.fillStyle = 'MediumVioletRed';
         iko.Context.font = "0.9em Arial";                   // e.g. "20px Times Roman", "1.2em Arial"
         iko.Context.fillText(sText, 3, 21);                // text, start pos x, start pos y
      }

      // (.) seq 20140829°0519 'calculate progression'
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI) {
         iko.Angle = iko.Angle - Math.PI;
      }
   }

   /**
    * This object defines default properties for this algorithm.
    *
    * @id 20140829°0523
    */
   , defaultProperties : { // [Cvgr.Algos.pulse.defaultProperties]
      BgColor : 'LightCyan'
      , DrawNumberLimit : 0
   }
};
// -- -- ✂ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

// ~~ ~~ ✂ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~
/**
 * This namespace holds the 'triangle' algorithm
 *
 * @id 20190329°0741
 */
Cvgr.Algos.triangle = {

   /**
    * This function implements a drawing algorithm for an ikon
    *
    * @id 20140828o°0851
    * @status proof-of-concept
    * @see ref 20140828°0911 'MDN: Drawing shapes with canvas'
    * @see ref 20140901°0321 'William Malone: rotate canvas'
    * @param icos {Object} This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param iNdx {Integer} The index into the icon objects array
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.triangle.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`25]

      // preparatory calculations [seq 20140916°0823]
      // Remember issue 20140901°0331 'IE8 demands extra plus sign'
      var iSize = (iko.Width + iko.Height) / 2;
      var iPt1x = iSize * 0.5;
      var iPt1y = iSize * 0.01;
      var iPt2x = iSize * 0.8;
      var iPt2y = iSize * 0.9;
      var iPt3x = iSize * 0.2;
      var iPt3y = iPt2y;

      // prepare canvas
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);   // Opera works fine

      // (.) rotation
      // (.1) set registration point
      iko.Context.translate(iSize / 2, iSize / 2);
      // (.2) rotate 1 degree
      iko.Context.rotate(Cvgr.Vars.nIncTurnsPerFrame * 4 * iko.Hertz);    // 'Cvgr.Vars.nIncTurnsPerFrame * 4' is 1 rotation per second
      // (.3) move registration point back to the top left corner of canvas
      iko.Context.translate(-iSize / 2, -iSize / 2);

      // note : Remember issue 20140901°0911 'Opera fillRect() fail'

      // set background
      iko.Context.fillStyle = iko.BgColor;
      // (20140901°0912) try envelope against issue 20140901°0911 'Opera fillRect() fail'
      try
      {
         // Opera may throw 'object DOMException' here (issue 20140901°0911)
         iko.Context.fillRect(0, 0, iko.Width, iko.Height);
      }
      catch (e)
      {
         if ( Cvgr.Const.bShow_Debug_Dialogs )                            // toggle debug
         {
            alert('[debug 20140901°0913]\nException "' + e + '"');
         }
      }

      // draw
      iko.Context.beginPath();

      // (why the try see issue 20140901°0933)
      try
      {
         iko.Context.moveTo(iPt1x, iPt1y);
      }
      catch (e)
      {
         if ( Cvgr.Const.bShow_Debug_Dialogs )                            // debug toggle
         {
            alert('[debug 20140901°0932]\nException "' + e + '"');
         }
      }
      iko.Context.lineTo(iPt2x, iPt2y);
      iko.Context.lineTo(iPt3x, iPt3y);
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();
      iko.Context.closePath();
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190330°0451
    */
   , defaultProperties : { // [Cvgr.Algos.develop.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral'                           // Red
      , Color2 : 'PaleGreen'                           // Green
      , Color3 : 'LightBlue'                           // Blue
      , DrawNumberLimit : 0                            // unlimited
   }
};
// ~~ ~~ ✂ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~

// ' ' ' ✂ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '
/**
 * This namespace holds the 'triangulum' algorithm
 *
 * @id 20190329°0751
 */
Cvgr.Algos.triangulum = {

   /**
    * This function implements the line drawing algorithm
    *
    * @id 20140828°1431
    * @status under construction
    * @see ref 20140831°0743 'mysamplecode.com → canvas draw → width and color'
    * @see ref 20140831°0742 'Alex Gheorghiu → Advanced context path painting' ✱
    * @see ref 20140831°0741 'stackoverflow → Canvas drawing multicolored lines'
    * @see ref 20140828°1422 'MDN → Stile und Farben verwenden'
    * @see ref 20140828°1421 'Quaese → Pfad-Schnittstelle stroke'
    * @see ref 20140828°1221 'Peter Kröner → Eine kleine Canvas-Einführung'
    * @note The statement 'fill() includes closePath()' is true only to some degree,
    *         e.g. *not* for drawing the final line to origin.
    * @param icos This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param iNdx The index into the icos array.
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.triangulum.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`26]

      // preparatory calculations [seq 20140916°0824]
      // Remember issue 20140901°0331 'IE8 demands extra plus sign'
      var iSize = (iko.Width + iko.Height) / 2;

      var nCurrAngle = iko.Angle;
      nCurrAngle = Math.sin (iko.Angle) * (iSize - 4) / 2 + iSize / 2;

      // prepare canvas
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // draw triangle
      iko.Context.beginPath();
      iko.Context.moveTo(3, 3);
      iko.Context.lineTo(iSize - 3, 3);
      iko.Context.lineTo(nCurrAngle, iSize - 5);
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();
      iko.Context.closePath();
      iko.Context.lineWidth = 2;
      iko.Context.strokeStyle = iko.Color2;
      iko.Context.stroke();

      // draw line
      iko.Context.beginPath();
      iko.Context.moveTo(2, iSize - 2);
      iko.Context.lineTo(iSize - 2, iSize - 2);
      iko.Context.lineWidth = 3;
      iko.Context.strokeStyle = iko.Color3;
      iko.Context.stroke();

      // maintain progress
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI * 4) {
         iko.Angle = iko.Angle - Math.PI * 4;
      }
   }
};
// ' ' ' ✂ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '

// - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
// id : block 20190329°0131
// version : 20190329°0912 20190329°0141
// summary : This block is to be shared by scripts via cutnpaste
// callers : So far only • canvasgear.js
// note : Other commandline parser exist e.g. in terminal.js

/**
 * @id 20190329°0111 (root 20190106°0311)
 */
var Trekta = Trekta || {};

/**
 * @id 20190329°0113 (root 20190106°0313)
 */
Trekta.Util2 = Trekta.Util2 || {};


/**
 * This object defines webcolors
 *
 * @id 20140831°0321
 * @status Working
 * @callers Only function 20140831°0331 Trekta.Util2.colorNameToHex
 * @ref http://en.wikipedia.org/wiki/Web_colors [ws 20140831°0311]
 */
Trekta.Util2.Webcolors = function()
{
   'use strict'; // [line 20190329°0845`12]

   // Pink colors
   this.pink                 = '#ffc0cb';      // Pink                  FF C0 CB    255 192 203
   this.lightpink            = '#ffb6c1';      // LightPink             FF B6 C1    255 182 193
   this.hotpink              = '#ff69b4';      // HotPink               FF 69 B4    255 105 180
   this.deeppink             = '#ff1493';      // DeepPink              FF 14 93    255  20 147
   this.palevioletred        = '#db7093';      // PaleVioletRed         DB 70 93    219 112 147
   this.mediumvioletred      = '#c71585';      // MediumVioletRed       C7 15 85    199  21 133

   // Red colors
   this.lightsalmon          = '#ffa07a';      // LightSalmon           FF A0 7A    255 160 122
   this.salmon               = '#fa8072';      // Salmon                FA 80 72    250 128 114
   this.darksalmon           = '#e9967a';      // DarkSalmon            E9 96 7A    233 150 122
   this.lightcoral           = '#f08080';      // LightCoral            F0 80 80    240 128 128
   this.indianred            = '#cd5c5c';      // IndianRed             CD 5C 5C    205  92  92
   this.crimson              = '#dc143c';      // Crimson               DC 14 3C    220  20  60
   this.firebrick            = '#b22222';      // FireBrick             B2 22 22    178  34  34
   this.darkred              = '#8b0000';      // DarkRed               8B 00 00    139   0   0
   this.red                  = '#ff0000';      // Red                   FF 00 00    255   0   0

   // Orange colors
   this.orangered            = '#ff4500';      // OrangeRed             FF 45 00    255  69   0
   this.tomato               = '#ff6347';      // Tomato                FF 63 47    255  99  71
   this.coral                = '#ff7f50';      // Coral                 FF 7F 50    255 127  80
   this.darkorange           = '#ff8c00';      // DarkOrange            FF 8C 00    255 140   0
   this.orange               = '#ffa500';      // Orange                FF A5 00    255 165   0

   // Yellow colors
   this.yellow               = '#ffff00';      // Yellow                FF FF 00    255 255   0
   this.lightyellow          = '#ffffe0';      // LightYellow           FF FF E0    255 255 224
   this.lemonchiffon         = '#fffacd';      // LemonChiffon          FF FA CD    255 250 205
   this.lightgoldenrodyellow = '#fafad2';      // LightGoldenrodYellow  FA FA D2    250 250 210
   this.papayawhip           = '#ffefd5';      // PapayaWhip            FF EF D5    255 239 213
   this.moccasin             = '#ffe4b5';      // Moccasin              FF E4 B5    255 228 181
   this.peachpuff            = '#ffdab9';      // PeachPuff             FF DA B9    255 218 185
   this.palegoldenrod        = '#eee8aa';      // PaleGoldenrod         EE E8 AA    238 232 170
   this.khaki                = '#f0e68c';      // Khaki                 F0 E6 8C    240 230 140
   this.darkkhaki            = '#bdb76b';      // DarkKhaki             BD B7 6B    189 183 107
   this.gold                 = '#ffd700';      // Gold                  FF D7 00    255 215   0

   // Brown colors
   this.cornsilk             = '#fff8dc';      // Cornsilk              FF F8 DC    255 248 220
   this.blanchedalmond       = '#ffebcd';      // BlanchedAlmond        FF EB CD    255 235 205
   this.bisque               = '#ffe4c4';      // Bisque                FF E4 C4    255 228 196
   this.navajowhite          = '#ffdead';      // NavajoWhite           FF DE AD    255 222 173
   this.wheat                = '#f5deb3';      // Wheat                 F5 DE B3    245 222 179
   this.burlywood            = '#deb887';      // BurlyWood             DE B8 87    222 184 135
   this.tan                  = '#d2b48c';      // Tan                   D2 B4 8C    210 180 140
   this.rosybrown            = '#bc8f8f';      // RosyBrown             BC 8F 8F    188 143 143
   this.sandybrown           = '#f4a460';      // SandyBrown            F4 A4 60    244 164  96
   this.goldenrod            = '#daa520';      // Goldenrod             DA A5 20    218 165  32
   this.darkgoldenrod        = '#b8860b';      // DarkGoldenrod         B8 86 0B    184 134  11
   this.peru                 = '#cd853f';      // Peru                  CD 85 3F    205 133  63
   this.chocolate            = '#d2691e';      // Chocolate             D2 69 1E    210 105  30
   this.saddlebrown          = '#8b4513';      // SaddleBrown           8B 45 13    139  69  19
   this.sienna               = '#a0522d';      // Sienna                A0 52 2D    160  82  45
   this.brown                = '#a52a2a';      // Brown                 A5 2A 2A    165  42  42
   this.maroon               = '#800000';      // Maroon                80 00 00    128   0   0

   // Green colors
   this.darkolivegreen       = '#556b2f';      // DarkOliveGreen        55 6B 2F     85 107  47
   this.olive                = '#808000';      // Olive                 80 80 00    128 128   0
   this.olivedrab            = '#6b8e23';      // OliveDrab             6B 8E 23    107 142  35
   this.yellowgreen          = '#9acd32';      // YellowGreen           9A CD 32    154 205  50
   this.limegreen            = '#32cd32';      // LimeGreen             32 CD 32     50 205  50
   this.lime                 = '#00ff00';      // Lime                  00 FF 00      0 255   0
   this.lawngreen            = '#7cfc00';      // LawnGreen             7C FC 00    124 252   0
   this.chartreuse           = '#7fff00';      // Chartreuse            7F FF 00    127 255   0
   this.greenyellow          = '#adff2f';      // GreenYellow           AD FF 2F    173 255  47
   this.springgreen          = '#00ff7f';      // SpringGreen           00 FF 7F      0 255 127
   this.mediumspringgreen    = '#00fa9a';      // MediumSpringGreen     00 FA 9A      0 250 154
   this.lightgreen           = '#90ee90';      // LightGreen            90 EE 90    144 238 144
   this.palegreen            = '#98fb98';      // PaleGreen             98 FB 98    152 251 152
   this.darkseagreen         = '#8fbc8f';      // DarkSeaGreen          8F BC 8F    143 188 143
   this.mediumseagreen       = '#3cb371';      // MediumSeaGreen        3C B3 71     60 179 113
   this.seagreen             = '#2e8b57';      // SeaGreen              2E 8B 57     46 139  87
   this.forestgreen          = '#228b22';      // ForestGreen           22 8B 22     34 139  34
   this.green                = '#008000';      // Green                 00 80 00      0 128   0
   this.darkgreen            = '#006400';      // DarkGreen             00 64 00      0 100   0

   // Cyan colors
   this.mediumaquamarine     = '#66cdaa';      // MediumAquamarine      66 CD AA    102 205 170
   this.aqua                 = '#00ffff';      // Aqua                  00 FF FF      0 255 255
   this.cyan                 = '#00ffff';      // Cyan                  00 FF FF      0 255 255
   this.lightcyan            = '#e0ffff';      // LightCyan             E0 FF FF    224 255 255
   this.paleturquoise        = '#afeeee';      // PaleTurquoise         AF EE EE    175 238 238
   this.aquamarine           = '#7fffd4';      // Aquamarine            7F FF D4    127 255 212
   this.turquoise            = '#40e0d0';      // Turquoise             40 E0 D0     64 224 208
   this.mediumturquoise      = '#48d1cc';      // MediumTurquoise       48 D1 CC     72 209 204
   this.darkturquoise        = '#00ced1';      // DarkTurquoise         00 CE D1      0 206 209
   this.lightseagreen        = '#20b2aa';      // LightSeaGreen         20 B2 AA     32 178 170
   this.cadetblue            = '#5f9ea0';      // CadetBlue             5F 9E A0     95 158 160
   this.darkcyan             = '#008b8b';      // DarkCyan              00 8B 8B      0 139 139
   this.teal                 = '#008080';      // Teal                  00 80 80      0 128 128

   // Blue colors
   this.lightsteelblue       = '#b0c4de';      // LightSteelBlue        B0 C4 DE    176 196 222
   this.powderblue           = '#b0e0e6';      // PowderBlue            B0 E0 E6    176 224 230
   this.lightblue            = '#add8e6';      // LightBlue             AD D8 E6    173 216 230
   this.skyblue              = '#87ceeb';      // SkyBlue               87 CE EB    135 206 235
   this.lightskyblue         = '#87cefa';      // LightSkyBlue          87 CE FA    135 206 250
   this.deepskyblue          = '#00bfff';      // DeepSkyBlue           00 BF FF      0 191 255
   this.dodgerblue           = '#1e90ff';      // DodgerBlue            1E 90 FF     30 144 255
   this.cornflowerblue       = '#6495ed';      // CornflowerBlue        64 95 ED    100 149 237
   this.steelblue            = '#4682b4';      // SteelBlue             46 82 B4     70 130 180
   this.royalblue            = '#4169e1';      // RoyalBlue             41 69 E1     65 105 225
   this.blue                 = '#0000ff';      // Blue                  00 00 FF      0   0 255
   this.mediumblue           = '#0000cd';      // MediumBlue            00 00 CD      0   0 205
   this.darkblue             = '#00008b';      // DarkBlue              00 00 8B      0   0 139
   this.navy                 = '#000080';      // Navy                  00 00 80      0   0 128
   this.midnightblue         = '#191970';      // MidnightBlue          19 19 70     25  25 112

   // Purple colors
   this.lavender             = '#e6e6fa';      // Lavender              E6 E6 FA    230 230 250
   this.thistle              = '#d8bfd8';      // Thistle               D8 BF D8    216 191 216
   this.plum                 = '#dda0dd';      // Plum                  DD A0 DD    221 160 221
   this.violet               = '#ee82ee';      // Violet                EE 82 EE    238 130 238
   this.orchid               = '#da70d6';      // Orchid                DA 70 D6    218 112 214
   this.fuchsia              = '#ff00ff';      // Fuchsia               FF 00 FF    255   0 255
   this.magenta              = '#ff00ff';      // Magenta               FF 00 FF    255   0 255
   this.mediumorchid         = '#ba55d3';      // MediumOrchid          BA 55 D3    186  85 211
   this.mediumpurple         = '#9370db';      // MediumPurple          93 70 DB    147 112 219
   this.blueviolet           = '#8a2be2';      // BlueViolet            8A 2B E2    138  43 226
   this.darkviolet           = '#9400d3';      // DarkViolet            94 00 D3    148   0 211
   this.darkorchid           = '#9932cc';      // DarkOrchid            99 32 CC    153  50 204
   this.darkmagenta          = '#8b008b';      // DarkMagenta           8B 00 8B    139   0 139
   this.purple               = '#800080';      // Purple                80 00 80    128   0 128
   this.indigo               = '#4b0082';      // Indigo                4B 00 82     75   0 130
   this.darkslateblue        = '#483d8b';      // DarkSlateBlue         48 3D 8B     72  61 139
   this.slateblue            = '#6a5acd';      // SlateBlue             6A 5A CD    106  90 205
   this.mediumslateblue      = '#7b68ee';      // MediumSlateBlue       7B 68 EE    123 104 238

   // White colors
   this.white                = '#ffffff';      // White                 FF FF FF    255 255 255
   this.snow                 = '#fffafa';      // Snow                  FF FA FA    255 250 250
   this.honeydew             = '#f0fff0';      // Honeydew              F0 FF F0    240 255 240
   this.mintcream            = '#f5fffa';      // MintCream             F5 FF FA    245 255 250
   this.azure                = '#f0ffff';      // Azure                 F0 FF FF    240 255 255
   this.aliceblue            = '#f0f8ff';      // AliceBlue             F0 F8 FF    240 248 255
   this.ghostwhite           = '#f8f8ff';      // GhostWhite            F8 F8 FF    248 248 255
   this.whitesmoke           = '#f5f5f5';      // WhiteSmoke            F5 F5 F5    245 245 245
   this.seashell             = '#fff5ee';      // Seashell              FF F5 EE    255 245 238
   this.beige                = '#f5f5dc';      // Beige                 F5 F5 DC    245 245 220
   this.oldlace              = '#fdf5e6';      // OldLace               FD F5 E6    253 245 230
   this.floralwhite          = '#fffaf0';      // FloralWhite           FF FA F0    255 250 240
   this.ivory                = '#fffff0';      // Ivory                 FF FF F0    255 255 240
   this.antiquewhite         = '#faebd7';      // AntiqueWhite          FA EB D7    250 235 215
   this.linen                = '#faF0e6';      // Linen                 FA F0 E6    250 240 230
   this.lavenderblush        = '#fff0f5';      // LavenderBlush         FF F0 F5    255 240 245
   this.mistyrose            = '#ffe4e1';      // MistyRose             FF E4 E1    255 228 225

   // Gray/Black colors
   this.gainsboro            = '#dcdcdc';      // Gainsboro             DC DC DC    220 220 220
   this.lightgrey            = '#d3d3d3';      // LightGrey             D3 D3 D3    211 211 211
   this.silver               = '#c0c0c0';      // Silver                C0 C0 C0    192 192 192
   this.darkgray             = '#a9a9a9';      // DarkGray              A9 A9 A9    169 169 169
   this.gray                 = '#808080';      // Gray                  80 80 80    128 128 128
   this.dimgray              = '#696969';      // DimGray               69 69 69    105 105 105
   this.lightslategray       = '#778899';      // LightSlateGray        77 88 99    119 136 153
   this.slategray            = '#708090';      // SlateGray             70 80 90    112 128 144
   this.darkslategray        = '#2f4f4f';      // DarkSlateGray         2F 4F 4F     47  79  79
   this.black                = '#000000';      // Black                 00 00 00      0   0   0

   // Additional colors
   this.rebeccapurple        = '#663399';      // Rebeccapurple         66 33 99    102  51 152

   // Custom colors
   this.verydarkviolett      = '#d000d0';      // (custom color 20140903°0341)
};

/**
 * This function translates a X11 web color name to it's hex value
 *
 * @id 20140831°0331
 * @status Working
 * @callers Only • CanvasGear
 * @note This helps to use webcolors with IE8.
 * @todo 20140926°1323 : Implement some validations because e.g. a color '1'
 *           as Cvgr.Algos.Ballist.Ring.color causes difficult to debug failures.
 * @todo 20180618°0731 : Shift this function into class Webcolors
 * @returns The wanted color hex value, e.g. '#FF0000' for 'red', or '#C0C0C0' silver for wrong names.
 * @param {string} sName — The name of the wanted color
 */
Trekta.Util2.colorNameToHex = function(sName) {

   'use strict'; // [line 20190329°0845`13]

   var cols = new Trekta.Util2.Webcolors;
   var sCol = '';

   sName = sName.toLowerCase();

   if (cols[sName]) {
      sCol = cols[sName];
   }
   else {
      sCol = '#C0C0C0'; // silver for unknown color names
   }

   return sCol;
};

/**
 * This ~static ~class provides a method to parse a commandstring
 *
 * @id 20140926°0641
 * @status Works fine for key/value pairs only. Limitation: This detects
 *    only key/value pairs, but not single command options.
 * @callers So far only • CanvasGear
 * @note Code inspired by ref 20140926°0621 'Krasimir: Simple command line parser in JS'
 * @note See also ref 20140828°0832 'majstro: tokenizing with split'
 * @note Test input
 *    - <!-- algo="triangle" color=mediumspringgreen hertz=0.1 -->
 *    - <!-- algo=Ballist series="10.7/55 9.3/43 8.5/39 6.2/43 3.3/33 1.0/11" shiftx=20 shifty=20 id="i20140916o0731" -->
 *    - <!-- algo=pulse color=orange hertz=0.2 shiftx=11 shifty=11 -->
 *    -
 */
Trekta.Util2.CmdlinParser = ( function()
{

   'use strict'; // [line 20190329°0845`14]
   var parse = null; // wanted with strict mode [line 20190329°0853]

   /**
    * This function parses a commandline
    *
    * @id 20140926°0642
    * @todo 20180618°0751 In NetBeans Navigator, this function is listed on
    *    script level. Make it appear inside the Daf.Utilis.CmdlinParser level.
    * @param sCmdlin {string} The string to be parsed
    * @param bProcessQuotes {boolean} Flag whether to process quotes or not
    * @returns
    */
   parse = function(sCmdlin, bProcessQuotes)
   {
      // paranoia — advisably
      if (sCmdlin === undefined) {
         sCmdlin = '';
      }

      var args = [];
      var bQuoteReading = false;
      var sToken = '';
      for ( var i = 0; i < sCmdlin.length; i++)
      {
         // look for token delimiter
         if ( ((sCmdlin.charAt(i) === ' ') || (sCmdlin.charAt(i) === '=')) && (! bQuoteReading) ) {

            // look for token delimiter found, finish token
            args.push(sToken);
            sToken = '';

            // re-supplement equal sign
            if (sCmdlin.charAt(i) === '=') {
               args.push('=');
            }
         }
         else {

            // no token delimiter, continue with token
            if (( sCmdlin.charAt(i) === '\"') && bProcessQuotes ) {
               bQuoteReading = (! bQuoteReading);
            }
            else {
               sToken += sCmdlin.charAt(i);
            }
         }
      }
      args.push(sToken);
      // now the plain token array is ready, the equal sign is also a token.

      // There are two parsing modes: (1) plain parse and (2) kvp parse.
      var bParsePlain = true; // (flag 20140926°1121)
      if (! bParsePlain) {

         // (a) The old and proven mode. It reads only the equations
         //  and is just dropping single commands [seq 20140926°06322]
         // note : This algo points to an equal sign, and then it processes
         //   the elements above and below.

         // (a.1) loop over the token array and assemble key/value pairs from the equal signs
         var kvps = [];
         for (var i = 0; i < args.length; i++) {
            if (i === 0) {
               continue;
            }

            if (i >= (args.length - 1)) {
               continue;
            }

            // assemble key/value pair
            if (args[i] === '=') {
               kvps[args[i-1]] = args[i+1];
               i++;                                                    // better do two or three increments?
            }
         }
      }
      else
      {
         // (b) parsing algo next version [seq 20140926°1111]
         // summary : This algo points to the first token, then looks ahead for
         //  an equal sign. This has the advantage, that any solitary token is
         //  treated like a key as well, just later it will no more receive a value.
         // hint : One loop finishes one CmdsHash element/cell.

         // (b.1) loop over the token array and assemble key/value pairs from the equal signs
         var kvps = [];
         var sCurrKey = '';
         for (var i = 0; i < args.length; i++) {

            // (b.2) possibly skip empty elements
            // note : This cleaning could be done separately before the loop. As
            //    well it is not yet exactly clear, what happens with blank values.
            if (args[i] === '') {                                      // experimental
               continue;
            }

            // (b.3) read key name and create key with empty value
            sCurrKey = args[i];
            kvps[sCurrKey] = '<n/a>';                                  // '<n/a>' is a maker, may be replaced by null or the like

            // (b.4) is next token an equal sign?
            if (args[i + 1] === '=') {
               // complete current key/value pair with value
               kvps[sCurrKey] = args[i + 2];
               sCurrKey = '<n?a>';                                     // reset

               i++;                                                    // forward to equal sign
               i++;                                                    // forward to this value
               continue;                                               // forward to next key
            }
            else {
               continue;                                               // forward to next key
            }
         }
      }
      return kvps;
   };

   // Curiously, if you place the curly bracket behind return on the
   //  next line, the script will be broken (note 20160416°1311)
   return {
      parse : parse
   };
})();
// - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -

// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// summary : This area is shared via cutnpaste by those scripts:
//            • dafutils.js • canvasgear.js • slidegear.js
// id : area 20190106°0307
// version : 20190331°0242 // 20190329°0913

/**
 * This namespace shall be root namespace
 *
 * @id 20190106°0311
 * @callers
 */
var Trekta = Trekta || {};

/**
 * This namespace shall provide some general basic functionalities.
 *
 *  The section between ~~~ Schnippel ~~~ and ~~~ Schnappel ~~~ can be cut
 *  and pasted to other scripts to provide them independent standalone basics.
 *
 * @id 20190106°0313
 */
Trekta.Utils = Trekta.Utils || {

   /**
    * This function retrieves the filename of the page to be edited
    *
    * @id 20110820°1741
    * @note Remember issue 20110901°1741 'get self filename for default page'
    * @callers • 20120827°1511 getFilenamePlain • 20150411°0651 featuresWorkoff_1_loopAll
    *      • 20150515°1241 sitmapWorkoff_process_Cakecrumbs1 • 20120830°0451 editFinishTransmit
    * @returns {String} e.g. 'daftari/daftari/login.html' (with Firefox)
    */
   getFileNameFull : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`12]

      // read URL of this page
      // Values are e.g.
      //    • 'http://localhost/eps/index.html?XDEBUG_SESSION_START=netbeans-xdebug#'
      //    • 'file:///G:/work/daftaridev/trunk/daftari/moonbouncy.html' (not yet working)
      var sUrl = document.location.href;

      // remove possible query after the file name
      sUrl = sUrl.substring(0, (sUrl.indexOf('?') === -1) ? sUrl.length : sUrl.indexOf('?'));

      // remove possible anchor at the end
      sUrl = sUrl.substring(0, (sUrl.indexOf('#') === -1) ? sUrl.length : sUrl.indexOf('#'));

      return sUrl;
   }

   /**
    * This function gets the plain filename of the page, e.g. 'help.html'
    *
    * @id 20120827°1511
    * @callers E.g. • dafdispatch.js::workoff_Cake_0_go
    * @returns {String} The plainfilename, e.g. 'help.html'
    */
   , getFilenamePlain : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`13]

      var sUrl = Trekta.Utils.getFileNameFull(); // e.g 'daftari/daftari/login.html' (in FF)

      // fix issue 20181228°0931 'slideshow fails' [seq 20181228°0935]
      if ( sUrl.indexOf('/', sUrl.length - 1) !== -1 ) { // 'endswith' replacement, see howto 20181228°0936
         sUrl += 'index.html';
      }

      var a = sUrl.split('/');
      sUrl = a[a.length - 1];
      return sUrl;
   }

   /**
    * This helper function delivers an XMLHttp object
    *
    * @id : 20110816°1622
    * @ref : 20110816°1421 'first simple ajax example'
    * @note 20150515°173101 : This function seems to work even with IE8
    * @note : Any AJAX request might be easier done with jQuery, e.g. like $.ajax()
    * @callers : • readTextFile1 • MakeRequest
    * @note :
    */
   , getXMLHttp : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`14]

      var xmlHttp;

      // () seqence 20150515°1612 'browser switch'
      // note : Heureka, now we can read the XML file in dafdispatch.js.
      //    This solves issue 20150515°1411 'jquery get() fails in IE8'.
      // note : We do not use variable Trekta.Utils.bIs_Browser_Explorer anymore,
      //    so this function can be used without .. daftari.js, e.g. in fadeinfiles.js.
      // note : Tested only with IE8, not yet with any higher IE version.
      if ( ! Trekta.Utils.bIs_Browser_Explorer ) {

         // Firefox, Opera 8.0+, Safari
         // todo 20190209°0836 : Implement feature detect and notify if not
         //    available. Then it will be different, what exactly the XMLHttpRequest
         //    object does handle. See ref 20190209°0853 'MDN → Using XMLHttpRequest'.
         xmlHttp = new XMLHttpRequest();

         // [seq 20160616°0231] experimentally preserved from throwaway old sequence
         // note : Does it make sense to keep this sequence here? Not really.
         //  It might make a bit sense, if we distrust above condition from the
         //  DafUtils library, and we want make our own opinion. And second,
         //  this statement is may ubiquitous appear in JS, like a watchdog,
         //  or perhaps like human speakers often use 'aeh'.
         var bFlag_SnipArchival_NaviAppNamExplo = false; // flag 20160616°0251

         // () condition 20160616°0241
         if (bFlag_SnipArchival_NaviAppNamExplo) {
            if ( Trekta.Utils.bIs_Browser_Explorer ) {
               throw 'The browser is IE';
            }
         }
      }
      else {
         // Internet Explorer (IE8)
         // todo 20190209°0835 : Switch off this sequence, this seems
         //    to be for Internet Exporer 5 and 6.
         try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
         }
         catch(e) {
            try {
               xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch(e) {
               alert('Sorry, your browser does not support AJAX [message 20160613°0421]');
               return false;
            }
         }
      }
      return xmlHttp;
   }

   /**
    * This function escapes a string to be used as HTML output
    *
    * @id : 20140926°1431
    * @callers : • Cvgr.Func.executeFrame
    * @todo  In FadeInFiles seq 20151106°1822 and seq 20151106°1821
    *            shall use this function here. [todo 20190328°0943]
    * @param sHtml {String} The HTML fragment to be escaped
    * @returns {String} The wanted escaped HTML fragment
    */
   , htmlEscape : function(sHtml) // [Trekta.Utils.htmlEscape]
   {
      'use strict'; // [line 20190329°0847`15]

      sHtml = sHtml.replace(/</g, '&lt;'); // g = replace all hits, not only the first
      sHtml = sHtml.replace(/>/g, '&gt;');

      return sHtml;
   }

   /**
    * This function tests, whether the given script is already loaded or not.
    *
    * @id 20160503°0231
    * @status
    * @callers ..
    * @param {string} sWantedScript — The plain name of the wanted script (not a complete path)
    * @returns {boolean} Flag telling whether the script is loaded or not.
    */
   , isScriptAlreadyLoaded : function (sWantedScript) // [Trekta.Utils.isScriptAlreadyLoaded]
   {
      'use strict'; // [line 20190329°0847`16]

      var regexp = null;

      // build the appropriate regex variable [seq 20160623°0311]
      // note : See howto 20160621°0141 'programmatically build regex'
      // note : "/" seems automatically replaced by "\/"!
      var s = sWantedScript.replace(/\./g, "\\.");                     // e.g. '/slidegear.js' to '/slidegear\.js$'
      s = s + '$';
      regexp = new RegExp(s, '');                                      // e.g. /dafutils\.js$/

      // algo 20160503°0241 (compare algo 20110820°2042)
      var scripts = document.getElementsByTagName('SCRIPT');
      if (scripts && scripts.length > 0) {
         for (var i in scripts) {
            if (scripts[i].src) {
               if (scripts[i].src.match(regexp)) {
                  return true;
               }
            }
         }
      }
      return false;
   }

   /**
    * This function loads the given script then calls the given function
    *
    * @id 20110821°0121
    * @version 20190331°0241 added parameter for onError callback
    * @version 20181229°1941 now with parameter for onload callback function
    * @status works
    * @chain project 20181230°0211 http://www.trekta.biz/svn/demosjs/trunk/pullbehind
    * @note About how exactly to call function(s) in the loaded script, see
    *    e.g. issue 20160503°0211 and seq 20160624°0411 'pull-behind fancytree'.
    * @note See howto 20181229°1943 'summary on pullbehind'
    * @callers • dafstart.js::callCanarySqueak • daftari.js::pull-behind slides
    *    • daftari.js::pull-behind fancytree • canvasgear.js::..
    * @param {String} sScriptToLoad The path from page to script, e.g. "./../../daftari/js/daftaro/dafcanary.js", 'js/daftaro/dafcanary.js'
    * @param {Function} callbackOnload The callback function for the script onload event
    * @param {Function} callbackOnerror The callback function for the script onerror event
    * @returns {Boolean}  Success flag (just a dummy always true)
    */
   , pullScriptBehind : function ( sScriptToLoad, callbackOnload, callbackOnerror )
   {
      'use strict'; // [line 20190329°0847`17]

      // avoid multiple loading [seq 20110821°0122]
      if ( Trekta.Utils.isScriptAlreadyLoaded(sScriptToLoad) ) {
         if ( Trekta.Utils.bShow_Debug_Dialogs ) {
            alert ("[Debug]\n\nScript is already loaded:\n\n" + sScriptToLoad);
         }
         callbackOnload();
         return;
      }

      // workaround against workaround [condition 20190329°0151]
      if ( typeof DafStart !== 'undefined' ) {

         // bad workaround for s_DaftariBaseFolderRel mismatch [seq 20190211°0131]
         //  The reason is, that s_DaftariBaseFolderRel is the folder where
         //  the calling script resides, not the Daftari base folder.
         var sScriptSource = DafStart.Conf.s_DaftariBaseFolderRel + sScriptToLoad;
         if ( sScriptToLoad.indexOf('showdown/showdown' ) > 0) {
            sScriptSource = sScriptToLoad; // e.g. "http://localhost/workspaces/daftaridev/trunk/daftari/js.libs/showdown/showdown.min.js"
         }
      }
      else {
         // call from • CanvasGear
         sScriptSource = sScriptToLoad;
      }

      // prepare the involved elements [seq 20110821°0123]
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');

      // set the trivial properties [seq 20110821°0124]
      script.type = 'text/javascript';
      script.src = sScriptSource; // DafStart.Conf.s_DaftariBaseFolderRel + sScriptToLoad;

      // set the non-trivial but crucial property [line 20181229°1932]
      // note : Remember todo 20181229°1931 'make pullbehind state-of-the-art'
      script.onload = callbackOnload;

      // [condition 20190331°0242]
      if ((typeof callbackOnerror !== 'undefined') && (callbackOnerror !== null)) {
         script.onerror = callbackOnerror;
      }

      // ignit the pulling [seq 20110821°0125]
      head.appendChild(script);

      return true;
   }

   /**
    * This function reads a file via Ajax
    *
    * @id 20140704°1011
    * @status productive
    * @note 20150515°173102 : This function seems to work even with IE8
    * @note Remember issue 20140713°1121 'read file via filesystem protocol'
    * @note Remember todo 20150517°0121 'implement local file reading after Dean Edwards 20150516°0612'
    * @note This function does now work via filesystem protocol with Chrome.
    * @ref http://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript [20160611°0341]
    * @ref http://stackoverflow.com/questions/6338797/jquery-to-load-text-file-data [20140625°1731]
    * @ref http://stackoverflow.com/questions/18440241/load-div-content-from-one-page-and-show-it-to-another [20140627°1111]
    * @ref http://stackoverflow.com/questions/14446447/javascript-read-local-text-file [20140704°0842]
    * @todo 20190211°0151 : Make all requests asynchronous (param bAsync = true).
    * @callers
    *     • Func 20190106°0615 slidegear.js::o2ReadSetup_ImageList : *.json
    *     • daflingos.js::getLangFromCrumb                    : sitmaplangs.json // fails with async
    *     • dafsitmap.js::sitmapWorkoff_process_Cakecrumbs1   : sitmapdaf.xml
    *     • fadeinfiles.js::fadeInFiles_fillBehind           : given textfile
    *     • fadeinfiles.js::fadeInFiles_fillPre()             : given textfile
    * @param sFilename {String} — Path to file to be read
    * @param bAsync {Boolean} — Request flavour flag (prefere asynchronous)
    * @returns {String} The content of the wanted file
    */
   , readTextFile1 : function(sFilename, bAsync) // [Trekta.Utils.readTextFile1]
   {
      'use strict'; // [line 20190329°0847`18]

      // () preparation
      var sRead = '';

      // () use a wrapper instead direct XMLHttpRequest
      var xmlHttp = Trekta.Utils.getXMLHttp();

      // () set request parameters
      // See issue 20180304°0611 'Synchronous XMLHttpRequest deprecated'. But
      //  async = 'true' works not for all, see issue 20181229°1911 'make async work'
      if (bAsync) {
         xmlHttp.open("GET", sFilename, true); // [line 20190211°0147]
      }
      else {
         xmlHttp.open("GET", sFilename, false); // [line 20180304°0614]
      }

      // () probe the ongoing
      xmlHttp.onreadystatechange = function () {
         if ( xmlHttp.readyState === 4 ) {
            if ( xmlHttp.status === 200 || xmlHttp.status === 0 ) {
               sRead = xmlHttp.responseText;
            }
         }
      };

      // () finally perform the request
      try {
         // If file to read does not exist, we get exception "Failed to load
         //  resource: the server responded with a status of 404 (Not Found)"
         // See issue 20181228°0937 'try to look for file but without error 404'
         xmlHttp.send(null);
      }
      catch (ex)
      {
         // note 20160624°0131 : To test below error messages, browse pages
         // - file:///X:/.../daftari/manual/fadeinfiles.html with Firefox
         // - file:///X:/.../daftari/manual/slideshow.html with Chrome
         var sMsg = "<b>Sorry, some feature on this page does not work.</b>"
                   + '\n File <tt>' + sFilename + '</tt> could not be read.' // [info 20160622°0131]
                   + "\nYour browser said: "
                    + '<tt>' + ex.message + '</tt>.' // e.g. "A network error occurred".
                     ;

         // ref : screenshot 20160911°1221 'Chrome debugger showing exception'
         // ref : issue 20150516°0531 'Chrome cannot load local files'
         if ( Trekta.Utils.bIs_Browser_Chrome && (location.protocol === 'file:') ) {
            sMsg += "\nYour browser seems to be Chrome, and this does not read files via file protocol."
                 + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE"
                 + "\nor (2) view this page from <tt>localhost</tt> with a HTTP server."
                  ;
         }
         else if ( Trekta.Utils.bIs_Browser_Firefox && (location.protocol === 'file:') ) {
            sMsg += "\nYour browser seems to be <b>Firefox</b>, and this does not read files"
                 + "\nwith a path going below the current directory via file protocol."
                 + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE"
                 + "\nor (2)  view this page from <tt>localhost</tt> with a HTTP server."
                  ;
         }
         else {
            sMsg += '\n [info 20160622°0131] Failed reading file ' + sFilename + '.';
         }
      }

      return sRead;
   }

   /**
    * This function returns the path to the given script .. using regex
    *
    * @id 20110820°2041
    * @status working
    * @callers • CanvasGear func 20140815°1221 executeFrame
    * @param sScriptName {String} The name of the canary script, e.g. 'sitmapdaf.js'.
    * @returns {String} The wanted path, where the given script resides, but
    *    there are browser differences, e.g.
    *     - FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
    *     - IE     : scripts[i].src = '../daftari/daftari.js'
    */
   , retrieveScriptFolderAbs : function (sScriptName) // [Trekta.Utils.retrieveScriptFolderAbs]
   {
      'use strict'; // [line 20190329°0847`22]

      var s = '';

      // () prepare regex [seq 20160621°0142]
      var regexMatch = / /;                                               // space between slashes prevents a syntax error
      var regexReplace = / /;
      s = sScriptName.replace(/\./g, "\\.") + "$";                        // e.g. 'dafutils.js' to 'dafutils\.js$'
      regexMatch = new RegExp(s, '');                                     // e.g. /dafutils\.js$/
      s = '(.*)' + s;                                                     // prepend group
      regexReplace = new RegExp(s, '');                                   // e.g. /(.*)dafutils\.js$/ ('/' seems automatically replaced by '\/')

      // () algo 20110820°2042 do the job (compare algo 20160503°0241)
      var path = '';
      var scripts = document.getElementsByTagName('SCRIPT');              // or 'script'
      if (scripts && scripts.length > 0) {
         for (var i in scripts) {
            // note : There are browser differences, e.g.
            //    • FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
            //    • IE     : scripts[i].src = '../daftari/daftari.js'
            if (scripts[i].src) {
               if (scripts[i].src.match(regexMatch)) {                    // e.g. /dafstart\.js$/
                  path = scripts[i].src.replace(regexReplace, '$1');      // e.g. /(.*)dafstart.js$/
               }
            }
         }
      }

      return path; // e.g. "http://localhost/daftaridev/trunk/daftari/js/daftaro/"
   }

   /**
    * This function tells the relative path from the page to the given given script
    *
    * This function is useful if the script uses resources, e.g. images,
    *  which are located relative to the script, as typically is the case
    *  within a project folder structure.
    *
    * @id 20160501°1611
    * @ref See howto 20190209°0131 'retrieve this script path'
    * @todo 20190316°0141 'call retrieveScriptFolderRel without canary'
    *     Implement the possibility to call the function
    *     without parameter. Then we have no canary to seach for in the script
    *     tags, but we use the last from the list. This is the last one loaded,
    *     and mostly means the calling script itself.
    * @callers • dafstart.js from scriptlevel
    * @param sCanary {String} Trailing part of the wanted script, e.g. '/js/daftaro/dafutils.js'
    * @returns {String} The path to the folder where the given script resides
                *           , e.g. "'/js/daftaro/dafutils.js'"
    */
   , retrieveScriptFolderRel : function (sCanary)
   {
      'use strict'; // [line 20190329°0847`23]

      var s = '';

      // () get the script tags list
      var scripts = document.getElementsByTagName('script');

      // () find the canary script tag
      var script = null;
      var bFound = false;
      for (var i = 0; i < scripts.length; i++) {
         if (scripts[i].src.indexOf(sCanary) > 0) {
            script = scripts[i];
            bFound = true;
            break;
         }
      }

      // paranoia
      if (! bFound) {
         s = '[20160501°1631] Fatal error'
            + '\n' + 'The wanted script could not be found.'
             + '\n' + 'It looks like the search string is wrong.'
              + '\n\n' + 'search string = ' + sCanary
               ;
         alert(s);
         return '';
      }

      // (.1) get the DOM internal absolute path
      //  This is just for fun, not finally wanted.
      s = script.src;
      s = s.substring(0, (s.length - sCanary.length));         // used as canary is '/js/daftaro/dafutils.js'
      Trekta.Utils.s_DaftariBaseFolderAbs = s;                 // e.g. "file:///G:/work/downtown/daftaridev/trunk/daftari/"

      // (.2) get the script tag's literal path (algo 20111225°1251)
      var sPathLiteral = '';
      for (var i = 0; i < script.attributes.length; i++) {
         if (script.attributes[i].name === 'src') {
            sPathLiteral = script.attributes[i].value;
            break;
         }
      }

      // reduce from canary script path to folder only path [seq 20190316°0131]
      // E.g. for sCanary "/js/daftaro/dafutils.js" :
      //    • "./../../daftari/js/daftaro/dafutils.js" ⇒ "./../../daftari/"
      //    • "./daftari/js/daftaro/dafutils.js"       ⇒ "./daftari/"
      var sPathOnly = sPathLiteral.substring ( 0 , ( sPathLiteral.length - sCanary.length + 1 ) );

      return sPathOnly;
   }

   /**
    * This function daisychains the given function on the windows.onload events
    *
    * @id 20160614°0331
    * @note Remember ref 20190328°0953 'mdn → addEventListener'
    * @callers
    * @param funczion {function} The function to be appended to the window.onload event
    * @returns nothing
    */
   , windowOnloadDaisychain : function(funczion) // [Trekta.Utils.windowOnloadDaisychain]
   {
      'use strict'; // [line 20190329°0847`24]

      // is the onload handler already used?
      if ( window.onload ) {
         // preserve existing function(s) and append our additional function
         var ld = window.onload;
         window.onload = function() {
            ld();
            funczion();
         };
      }
      else {
         // no other handlers are registered yet
         window.onload = function() {
            funczion();
         };
      }
   }

   /**
    * This ~constant provides a flag whether the browser is Chrome or not
    *
    *  Explanation. The plain expression "navigator.appName.match(/Chrome/)"
    *  results in either True or Null. But I prefere the result being either
    *  True or False. This is achieved by wrapping the expression in the
    *  ternary operator, manually replacing Null by false.
    *
    * @todo 20190209°0833 : For browser detection, Inconsequently for some we use
    *    navigator.userAgent, for some we use navigator.appName. Standardize this.
    * @id 20160622°0221
    * @type Boolean
    */
   , bIs_Browser_Chrome : ( navigator.userAgent.match(/Chrome/) ? true : false ) // [Trekta.Utils.bIs_Browser_Chrome]

   /**
    * This ~constant provides a flag whether the browser is Internet Exporer or not
    *
    * @id 20150209°0941
    * @todo 20190209°0837 : Refine algo. Formerly we used the plain
    *    comparison 'if ( navigator.appName === "Microsoft Internet Explorer" )'.
    *    For code, compare function getBrowserInfo() in jquery.fancytree.logger.js.
    *    For code, compare function getIEVersion() in canvasgearexcanvas.js.
    * @type Boolean
    */
   , bIs_Browser_Explorer : ( navigator.appName.match(/Explorer/) ? true : false ) // [Trekta.Utils.bIs_Browser_Explorer]

   /**
    * This ~constant provides a flag whether the browser is Firefox or not
    *
    * @id 20160624°0121
    * @type Boolean
    */
   , bIs_Browser_Firefox : ( navigator.userAgent.match(/Firefox/) ? true : false ) // [Trekta.Utils.bIs_Browser_Firefox]

   /**
    * This property provides a flag whether the browser is Opera or not.
    *  Just nice to know, Opera seems to need no more extras anymore (2019).
    *
    * @note 20190314°0411 : Opera 58 seem to need no more extra treatment.
    * @note 20190314°0413 : In Opera 58 I saw this userAgent string
    *     • "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
    *       (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36 OPR/58.0.3135.118"
    * @id 20190107°0821
    * @type Boolean
    */
   , bIs_Browser_Opera : ( navigator.userAgent.match(/(Opera)|(OPR)/) ? true : false ) // [Trekta.Utils.bIs_Browser_Opera]

   /**
    * This ~constant tells whether to pop up debug messages or not
    *
    * @id 20190311°1521
    * @type Boolean
    */
   , bShow_Debug_Dialogs : false // [Trekta.Utils.bShow_Debug_Dialogs]

};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// start mechanism [line 20190316°0231]
Trekta.Utils.windowOnloadDaisychain(Cvgr.startCanvasGear);

/* eof */
