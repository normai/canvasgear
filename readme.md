# CanvasGear 0.1.2

_Slogan_ : CanvasGear is a JavaScript application to draw icons on HTML5 canvases.

_Status_ : Proof-of-concept

_Home_ : CanvasGear home is [downtown.trilo.de/svn/demosjs/trunk/canvasgear](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/index.html).

_Features_ : See chapter [Features](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/features.html).

_Demos_ : See chapter [Demo](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/demo.html).

### Quickstart

This are the steps to get a canvas in a HTML page:

 - Copy canvasgear.js and canvasgearexcanvas.js to your web folder.

 - In the HTML header, insert the script tag for canvasgear.js.
<br />`<script src="./canvasgear.js"></script>`

 - In the HTML header, insert the script tag for canvasgearexcanvas.js inside IE conditional load.
<br />`<!--[if lte IE 9]><script src="./canvasgearexcanvas.js"></script><![endif]-->`

 - In the body tag, insert 'onload="startCanvasGear"'
<br />`<body onload="startCanvasGear();">`

 - Inside the body, define one or more canvases.
<br />`<canvas id="myCanvas44" width="123" height="123"></canvas>`

 - In a comment behind each canvas, specify the canvas parameters.
<br />`<!-- algo=pulse color=hotpink hertz=0.2 -->`

More details about the installation you find in chapter [Installation](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/install.html).

[![CanvasGear Demo](img/20140829o0322.icondrawer-demo-cut.png)](http://downtown.trilo.de/svn/demosjs/trunk/canvasgear/demo.html)

<small>*(2014-Sept-03)*</small>
