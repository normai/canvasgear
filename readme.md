# CanvasGear v0.1.9 <sup><sub><sub>20190330°0157</sub></sub></sup>

**Slogan** : Draw animated canvases by specifying parameters in a data attribute

**Features** :
- Paint canvases controlled by parameters in a data attribute
- Acts as framework to supplement new graphic algorithms easliy
- Provides the ready mechanisms for cyclically animated canvases
- No dependencies
- Browser compatibility from IE 9 up

**Status** : Works fine but has only a few boring algorithms on board

**Demos** : [http://www.trekta.biz/../canvasgear/doc/index.html](http://www.trekta.biz/svn/canvasgeardev/trunk/canvasgear/doc/index.html).

**Installation** :
- Copy [`canvasgear.min.js`](./canvasgear.js) to your web folder
- Equip your HTML file like follows :<span style="line-height:0.1em; font-family:monospace">
 <br>
 <br> &nbsp; &lt;head&gt;
 <br> &nbsp; &nbsp; &nbsp; . . .
 <br> &nbsp; &nbsp; &nbsp; <b>&lt;script src="./canvasgear.min.js"&gt;&lt;/script&gt;</b> &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- 1. load script --&gt;
 <br> &nbsp; &nbsp; &nbsp; . . .
 <br> &nbsp; &lt;/head&gt;
 <br> &nbsp; &lt;body&gt;
 <br> &nbsp; &nbsp; &nbsp; . . .
 <br> &nbsp; &nbsp; &nbsp; &lt;canvas &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- 2. Put a canvas tag --&gt;
 <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>data-cvgr="algo=pulse color=hotpink hertz=0.197"</b> &nbsp; &lt;!-- 3. Put the data-cvgr attribute --&gt;
 <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; width="123" height="123" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- 4. Put width and height attribute --&gt;
 <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id="myCanvas44"&gt; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- 5. Put an ID attribute --&gt;
 <br> &nbsp; &nbsp; &nbsp; &lt;/canvas&gt;
 <br> &nbsp; &nbsp; &nbsp; . . .
 <br> &nbsp; &lt;/body&gt;</span>

- Now the defined canvas should appear on the page
- If you like experimenting, additionally copy [`canvasgear.Template.js`](./canvasgear.Template.js)

Have fun

2019-April-14

<sup><sub>(file 20140815°0121) (project 20140815°0111)</sub></sup>
