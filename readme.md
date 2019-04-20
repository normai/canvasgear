# CanvasGear v0.2.2.c <sup><sub><sub>20190401°1437..</sub></sub></sup>

**Slogan** : Draw animated canvases by specifying parameters in a data attribute

**Features** :
- Paints canvases after parameters in a data attribute
- Provides a framework for writing canvas graphics
- Provides mechanism for cyclically animated canvases
- Interactivity is possible (reads mouse and keyboard)
- Sound is possible (e.g. play MP3 files)
- Browser compatibility from IE 9 up
- Small footprint
- No dependencies

**Status** : Works, but has only few boring algorithms on board

**Demos** : [http://www.trekta.biz/../canvasgear/doc/index.html](http://www.trekta.biz/svn/canvasgeardev/trunk/canvasgear/doc/index.html).

**Installation** :
- Copy [`canvasgear.min.js`](./canvasgear.min.js) to your web folder
- Equip your HTML file like follows :
```
      <head>
         ...
         <script src="./canvasgear.min.js"></script>          <!-- 1. load script -->
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
- Now the defined canvas should appear on the page
- If you like experimenting, additionally copy [`canvasgear.Template.js`](./canvasgear.Template.js)

**License** : GNU LGPL v3 or later [opensource.org/licenses/LGPL-3.0](https://opensource.org/licenses/LGPL-3.0)

Have fun

2019-April-20

<sup><sub>[file 20140815°0121, project 20140815°0111]</sub></sup>
