# CanvasGear v0.2.3.b <sup><sub><sub>— 20190402°0641..</sub></sub></sup>

**Slogan** : Draw animated canvases by specifying parameters in a data attribute

**Features** :
- Paint canvases after parameters in a data attribute
- Provide a framework for writing canvas graphics
- Provide mechanism for cyclically animated canvases
- Interaction with mouse and keyboard
- Sound from files or inline
- Browser compatibility from IE 9 up
- Small footprint
- No dependencies

**Status** : Works, but has only few boring algorithms on board

**Demos** : [http://www.trekta.biz/../canvasgear/doc/index.html](http://www.trekta.biz/svn/canvasgeardev/trunk/canvasgear/doc/index.html).

**Installation** :
- Copy [`canvasgear.combined.js`](./canvasgear.combined.js) to your web folder
- Equip your HTML file like follows :
```
      <head>
         ...
         <script src="./canvasgear.combined.js"></script>     <!-- 1. load script -->
         ...
      </head>
      <body>
         ...
         <canvas                                              <!-- 2. Put a canvas tag -->
            data-cvgr="algo=pulse color=hotpink hertz=0.197"  <!-- 3. Put the data-cvgr attribute -->
            width="123" height="123"                          <!-- 4. Put width and height attribute -->
            id="myCanvas44">                                  <!-- 5. Put an ID attribute -->
         </canvas>
         ...
      </body>
```
- Now the given canvas should appear on the page

**Programming** :
- To experiment with your own algorithm, copy file
   [`riders/canvasgear.Template.js`](./riders/canvasgear.Template.js)
   or any other rider file to one with your new algorithm name,
   e.g. `canvasgear.MyAlgo2.js`
   and edit this. It will be recognized automatically.
- To debug or edit CanvasGear itself, just use the plain `canvasgear.js` with
   the libs and riders folders behind, instead the standalone script `canvasgear.combined.js`

**License** : GNU LGPL v3 or later [opensource.org/licenses/LGPL-3.0](https://opensource.org/licenses/LGPL-3.0)

Have fun

2019-April-23

<sup><sub>[file 20140815°0121, project 20140815°0111]</sub></sup>
