# CanvasGear v0.1.8.. <sup><sub><sub>20190330°0711..</sub></sub></sup>

**Slogan** : Draw animated canvases by just specifying some parameters in a data attribute

**Features** :
- Provide easy way to add canvases to the page
- Comes with some predefined parameter-controlled graphic algorithms
- Acts as framework for algorithms to be added easliy (not ready)
- No dependencies

**Demos** : [http://www.trekta.biz/../canvasgear/doc/index.html](http://www.trekta.biz/svn/canvasgeardev/trunk/canvasgear/doc/index.html).

**Status** : Proof-of-concept

**Installation** :
- Copy [`canvasgear.min.js`](./canvasgear.js) to your web folder
- Equip your HTML file with the following elements :
```
      <head>
         ...
         <script src="./canvasgear.min.js"></script>          <!-- (1) load script -->
         ...
      </head>
      <body>
         ...
         <canvas                                              <!-- (2) Put a canvas tag -->
             data-cvgr="algo=pulse color=hotpink hertz=0.197" <!-- (3) Put the data-cvgr attribute -->
             width="123" height="123"                         <!-- (4) Put width and height attribute -->
             id="myCanvas44">                                 <!-- (5) Put an ID attribute -->
         </canvas>
         ...
      </body>
```
- Now the defined canvas should appear on your page

Have fun

2019-April-11..

<sup><sub><sub>(file 20140815°0121) (project 20140815°0111)</sub></sub></sup>
