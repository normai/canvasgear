# CanvasGear 0.1.2

_Slogan_ : CanvasGear is a JavaScript program to draw animated canvases by just specifying some parameters.

_Status_ : Proof-of-concept.

_Home_ : CanvasGear home is [downtown.trilo.de/svn/demosjs/trunk/canvasgear](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/index.html).

_Features_ : See chapter [Features](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/features.html).

_Demos_ : See chapter [Demo](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/demo.html).

### Quickstart

Copy [`canvasgear.js`](./canvasgear.js) and [`canvasgearexcanvas.js`](./canvasgearexcanvas.js)
to your web folder. Then add the following ingredients into your HTML file :

<br />`<span style="color:#c0c0c0;"<!DOCTYPE HTML></span>`
<br />`<span style="color:#c0c0c0;"<html></span>`
<br />` <span style="color:#c0c0c0;"<head></span>`
<br />` <script src="./canvasgear.js"></script><span style="color:#c0c0c0;">&lt!-- (1) load script --&gt</span>`
<br />` <!--[if lte IE 9]><script src="./canvasgearexcanvas.js"></script><![endif]--><span style="color:#c0c0c0;">&lt!-- (2) load helper script --&gt</span>`
<br />`<body onload="startCanvasGear();"><span style="color:#c0c0c0;">&lt!-- (3) start processing --&gt</span>`
<br />` <canvas id="myCanvas44" width="123" height="123"></canvas><span style="color:#c0c0c0;">&lt!-- (4) define canvas --&gt</span>`
<br />` <!-- algo=pulse color=hotpink hertz=0.2 --><span style="color:#c0c0c0;">&lt!-- (5) specify canvas parameters --&gt</span>`
<br />`<span style="color:#c0c0c0;"<body></span>`
<br />`<span style="color:#c0c0c0;"<html></span>`

 1. In the HTML header, insert the script tag for canvasgear.js.

 2. In the HTML header, insert the conditional script tag for canvasgearexcanvas.js.

 3. In the body tag, provide the attribute 'onload="startCanvasGear()"'.

 4. Inside the body, define one or more canvases.

 5. In a comment immediately behind each canvas, specify the canvas parameters.

Details about the installation you find in chapter [Installation](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/install.html).

[![CanvasGear Demo](img/20140829o0322.icondrawer-demo-cut.png)](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/demo.html)

<small>*(2014-Sept-03)*</small>
