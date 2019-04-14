# CanvasGear v0.2.0.b <sup><sub><sub>20190330°0757..</sub></sub></sup>

**Slogan** : Draw animated canvases by specifying parameters in a data attribute

**Features** :
- Paints canvases after parameters in a data attribute
- Acts as framework for writing graphic algorithms
- Provides mechanism for cyclically animated canvases
- Has no dependencies
- Browser compatibility from IE 9 up

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

Have fun

2019-April-14

<sup><sub>(file 20140815°0121) (project 20140815°0111)</sub></sup>
