/*
 This script paints animated icons on HTML5 canvases

 version : 0.2.3.d — 20190408°0212
 license : GNU LGPL v3 or later https://www.gnu.org/licenses/lgpl.html
 copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 note : Minimized with Google Closure Compiler
 This area Trekta.Utils holds low level functions for standalone scripts

 version : 20190408°0212
 copyright : © 2019 Norbert C. Maier
 license : GNU AGPL v3
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, c, d) {
    var b = this.length || 0;
    0 > c && (c = Math.max(0, b + c));
    if (null == d || d > b) {
      d = b;
    }
    d = Number(d);
    0 > d && (d = Math.max(0, b + d));
    for (c = Number(c || 0); c < d; c++) {
      this[c] = a;
    }
    return this;
  };
}, "es6", "es3");
var Cvgr = {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Const = {versionnumber:"0.2.3.d", versiontimestamp:"20190402°0641..", bShow_Debug_Dialogs:!1, sB64Dopiaza_Bonk_Mp3:"data:audio/mp3;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/44LE/wAAA0gAAAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", 
sB64Dopiaza_Fingerplop2_Mp3:"data:audio/mp3;base64,//uQbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAIKABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgICAgICAgICAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP////////////////////////////////8AAAA5TEFNRTMuOTcgAaoAAAAALBcAABSAJAXNTgAAgAAACChX+laoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQbAAAA00Qzg1h4AAtwRmipIwAEXFZjblqMBkXGq93KKICAFL8CjNKzSNcQIQcrHRSkTEgFIdVYdg8FJeJgREFICoHA4Kct5Oy5nWoFYrHkSkRg+D4Pg+CAIAgUBMHwffBAEAQOCQEIPg+4HwfKAmD5/DCz/y4IHOUBAEHawff4IS4P3+XygIfUcKAh9SoBsnkgFCBAQAgAMAYGw2T6ogOQfB8P+Xf8uH0fX4nqB9///n/iB3/g+f/ghQsBgMBgNRgMBQJAwEABhMDmAAZrRgcA4jgfFdDzHA0Ls8Az/BnKvA/G8DlYfAouCAOAUB/C0AcAjQZKr8GxwVENsAEIgZMF/4nEMcEGh+oIh4IhP/42gQiwahCmGJCDJ//5IBqwphc4PBNidBHhM62//xQAyhLFgdJWNU5UMf///MEGcuFxNlus+jVgOBwMBwOBwOBgKBAAAEBAc/wQCAMiCrwNRcBZo1o9ET4KhXLfk4+Ki1/qSEhKf/541EiTjz/84gISY9G//7qe6Fy//A/YkmQIjbLbbLrdpXbLbdW6uhNGS/T//uSbAoAA+ZhXO4lYARAilqqxYgADnFZPl2RgAjWg+lrkiAAxULmnaKsWNEmpHs4wfU1UVHbE2k0xNadXVXdvOnEpOTNdvfw+y917v2vr/+Lbf1df/x26Yafs5NJb2FoIxv2z90Zu6KqnzPJsfqJi/lGYbtrf3ctN7e2uo/8wAcggCZQ8dj+X/dOPwmgAAAADCAcBgVjAVjiZdpiM8gKYBO4DR8NJ9P/bN/vn/+YQRW//7Uv//qWhy7687E/73JM63///+xHcERpVzGhqsAkaAT4qRtm8rkspbycR3MIdF40hTwZHgFhXlpCFkKghIybnBUKC6c8mHKWAjUEDfTEEaWGjvYxBWc8MjJlLXPa02mC4vOewEtnf86Uzd9aVIjI7OFCU0uxNXXPFBQh9NMMKFMYbT33LXpB/BpThx3+dk6gNABEhWmnay9qtkrM4bFAlJXM2e9T/8gfETjK1dRT9f1Ega8kGf/8b6/2D2gkTH73qYSWArHVM5R7LZ2vTT4wuketlSHIVcWiQRK3OhKbRA9GFn6s4pAiYYH4jh6MhGuZxP/7kmwVgAPKQU2FYQACTsxaPKQIAQ8NQTk5NoABLZrrtwSAAnQeLiOOGCxLEM4cmrTkGjMaS8rrmp20IrV9afbeq8y6Dlgw6BnaXTQtpaDyx1U2wz7H4ioy2jgJph6M3wD1Xc5se6X3fb5ALjetuqxM9UElAJugcg2xdVxrJociwQpcQizJM6nIr////h0XyTJY5cj3UmQmdv6097rRHsiI3e1n7Xn6USZO2Sh7Z0u+qXWbVrISiX6OlpmuLd4K7RYAADBDwCBBSAAA0RAWL2NUcwaodFgdksDcQn7BtD1JIpZ0glxFZd7lh8cpQJE8beaoFE2Hokkuj8oIEufKJkcRYypfol9IxcyK00kq2/yktIvmh41Nytaklo9X/JQkSaYoGsooJr1+tH/+dcRARkRlG3rOqJM/ywJNhoFDYSC4Wi0Wi0WAADHKXBCKYmZ8G4qAMFvSaXX+yZQwVQW/ximFkQ3r/70pd8L///jfiZ5j9r//x6kU8Cp4wOh0JCX0gy4YPI5VADPoAUKpMKbUMBCjCgImAWVL3GPpUUksCINEyYr/+5JsDo/zETAjtw0gAi+jRHHgiABAAAGkAAAAIAAANIAAAARRb//5SLAkGmwqCJKkFhSSocWRNKksxSKYLImrVRImtVQxpFkpeMY+oqxySIqDf//CGgpIJd/6imhRwMN6blkdFdSK4diQBhDEIUxCFCFEJv9SlmMZSm/ugYzlASwgV0Js0F4N6FHArB3//xTQp4v//8jorqVMQU1FMy45N1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", 
sB64Dopiaza_Fingerplop_Mp3:"data:audio/mp3;base64,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efylByZY7VOoeGw+evSVFHrS+/23c9rtL1YEd+vxh66l7f+f/////BEOCGtsO2SmKnwNlRamiyCHgkiRmyf5URQRkv9JHIznbmhpdEGGNDKc763JIS9Kz4fwv7TPpF/l6925GrEimzjgqpRxDI2yV/X/xLr5/Q67z1PC7v0a57eq62OCP1CE0Vu2ttkjjGyqroWC3Oh5lczsavVTSIZixhWK2dAcXLKkzyN8A4TZkaQiKcjoSRyrKhhxAL1w6WUbijCgaEFINnrKIfz9i0CCgZlC8i1C1eXGziUgFwyZC6n/+5JsXAAC8kJJCw8YUkdoef0UI8kLxEskx7DASSgO5nQRGS3S86WO0vuPVG5KV06afybaIaLxx5TqaK5EChIScErf9UxVhwSdf6h2KpWXoNGe4FlyN+88W9zZtmokxUUli/fn2qy//fN/7C3alx1oJtwUXWuKEkCvacxK8YcnvYySuVEGq0Mc68OfJr79x/kJwfl0b3hMLGniyrWwYFgqy4um5z+Py4//KyycWOhcfllxr/8VYrvpvZYGiTLVwp9prlR2xLpVKZJK5BIgCDCRYYKNMTRJCS0Epa1EjS0FonPCRpcXlTGzLPGzTt9llZ/VHZyojlRblMlvojs6o7GRbt//+n9n9kVnKYKpHKis5VuyLf2fp/RVT+qKR2MUMCHOACmJqp22XZ82Wdv7DJlkcmuZSGrVBwEMCDoOJBkVJP2gIWNBUkaZ////oAopTEFNRTMuOTdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSbHQP8zNoQIMGE3Itg7gxGANyAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==", 
sB64Dopiaza_MouseOverMp3:"data:audio/mp3;base64,//tQZAAAAFwA4fUAAAgAAA0goAABEX2nRBh6AAAAADSDAAAADgAADwAAAAAuf+GBGB94Awi+D0AXyaHO8ZYho5v4ypDhzhW3+Q0c0VqQ4XN/4rYhouUQqOUK2//ELDGigQ+EY4PiDI3/+K6GRQtBD9guGBtIBwMDFDQGgv9av+WQMH3A0jkDAlgMmIBs8LSGAQyyOoUEOoDSWC2i35DQNzLJH/FzENGZIKUiBE8sumqjZNaP////6mnUpkoHd3iZh3+21gm2hkZGZBEmmBBNS//7YGQKCPOtRFD/BoACAAANIOAAAQltFymgj7dAAAA0gAAABFLUt3Z2dnQWtS1d2Z2qWpalLs7OzugtS1LVZ2dnQTQUtS1LdndnZNBalrUt2dnZBNBNS1LSSR3ZaC1qEIQudA7TYAJMI+cxNiav/UDC1VAyqq/6Wf2mmkYqqjpoquqqt9VQAtH/9gj///+vn/hl8sjw7/zI/WWpwy6Cl8H9k/I72yz///vZLmTLLZ//upX1RuoleYMAscsrwZPAIJAurA1+G5RT4fLCwq65v9eRAAAAF4H8rCH///381//keC2yai2+D/6t+vu5af+n1evb//hL4pIm7INggBwwIwrTLUYdMP/7IGQaDPIvRcroIva4AAANIAAAAQhZFypgi9ygAAA0gAAABMUGUwFAFCy6KjEHHikv//7f0j/6wBf///XzX+/mdMnsEw1gwevqMv1tTdE/9frk7//8p1+muqYioAgUAfBIXxiaNeGCWDsYAACqSzc4u+Uinf///J0AAAATb//IJ///+0BkBIjyXkZKaCLvIAAADSAAAAEJbRsroIucgAAANIAAAAT//f6XT5aMlyyvzoal2UlXUbSiMzrQ+tCN/56EZTv959wiEVn2YL9SjBATm4sbmVAHiQRwDPM7k/yiwJ7BOfDH//W4AXf/+kFf///WWeuT+UdGL1IoU2T8xWcpUMM3R5Wmf0Mpf/mNKWZ64/Wpq8Zcm6skMApZc7kQTGoXDAQiMyqGIejVuls4lLHg1//0KgAAAP/7QGQBiPJuRspoIeTwAAANIAAAAQixFSmhB55AAAA0gAAABLdv/oQX///Lvnp44/HBjLSfaNlMGtqCOSyeyj+cCH/5sBjJDz7Uqy+ITrW2kr/WgYKDhzGvKMA4JoJH9cSIwPGMbZCEQIC5Bn/+QAt///zDn//++341fy++m6Omf0dErdUTqCElfkculqL/85GF0z/XbtypuAmUwEIQKZGgoOBK4moxKMRqhLFceEBdn/+p+2oA//tAZACAAt5Hym0CoAgAAA0goAABBjUvM/gJgAAAADSDAAAAAAAUb/2AAfS/0Okrakgtukq66KkE0W1XSdHSXscR916Vf1JLR/6kaTosp9SSyKlwc4eg/UZIPZAUDIGARkBhFvAZZBgBoEE5hbEnhWpCE0VjE1U86HQ0RT//pAAAAAAYAcAgH/HvwAAAoAr+g36m/X9L3/t6X1/Zv///////oA2NlT/WHMN/8awCpiAVAAAHA///+xBkAo/wvEPSHwBACAAADSDgAAEAAAH+AAAAIAAANIAAAAT////////////////yhQEBARJVTEFNRTMuOThVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGQYj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"};
Cvgr.Func = {};
Cvgr.Objs = {};
Cvgr.Vars = {bFlagTipTopTest:!1, bSoundLibraryFailed:!1, bSoundLibraryLoaded:!1, bSoundLibraryLoading:!1, bSoundLibraryReady:!1, bTemplateSearchFinished:!1, fNoise:null, iTimeStart:0, iTimeStartMs:0};
Cvgr.Vars.iTimeStart = new Date;
Cvgr.Vars.iTimeStart.getTime();
Cvgr.Vars.iTimeStartMs = Cvgr.Vars.iTimeStart.getMilliseconds();
Cvgr.Vars.radiobuttn = document.getElementById("i20140819o1822");
null !== Cvgr.Vars.radiobuttn && (Cvgr.Vars.radiobuttn.checked = !0);
Cvgr.Objs.Algo = function() {
  this.Ikon = this.Funktion = this.Context = this.Canvas = null;
  this.draw = function() {
  };
};
Cvgr.Objs.Ikon = function() {
  this.AlgoName = "";
  this.BgColor = "Transparent";
  this.Color = "Silver";
  this.Color2 = "Gray";
  this.Color3 = "SlateGray";
  this.Hertz = 0.1;
  this.Ide = null;
  this.ShiftY = this.ShiftX = 0;
  this.SizeFactor = 1;
  this.Width = this.Height = null;
  this.Angle = 0;
  this.CmdsHash = this.Canvas = null;
  this.Command = "";
  this.Context = null;
  this.DrawNumberLimit = 1;
  this.iDrawCount = 0;
  this.bIsDefaultSettingDone = !1;
  this.iFrameDelay = 0;
};
Cvgr.Objs.Line = function(a, b, c, d, e, f) {
  "undefined" === typeof f && (f = 2);
  this.X1 = a;
  this.Y1 = b;
  this.X2 = c;
  this.Y2 = d;
  this.Colo = Trekta.Util2.colorNameToHex(e);
  this.Width = f;
};
Cvgr.Objs.Pojnt = function(a, b) {
  this.ptX = a;
  this.ptY = b;
  this.Colhor = "Red";
  this.getIt = function() {
    return "Pojnt  " + this.x + "/" + this.Y + this.Colhor + " apple";
  };
};
Cvgr.Vars.icos = [];
Cvgr.Vars.iFrameNo = 0;
Cvgr.startCanvasGear = function() {
  window.onload = function() {
    var a = document.getElementById("i20140819o1821"), b = document.getElementById("i20140819o1822");
    a.onclick = Cvgr.Func.setRadiobutton;
    b.onclick = Cvgr.Func.setRadiobutton;
  };
  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
      window.setTimeout(a, 1000 / 60);
    };
  }();
  for (var a = document.getElementsByTagName("canvas"), b = 0; b < a.length; b++) {
    if (!(-1 < a[b].outerHTML.indexOf("skipthis"))) {
      var c = new Cvgr.Objs.Ikon;
      c.Canvas = a[b];
      c.Context = a[b].getContext("2d");
      c.Ide = a[b].id;
      c.Width = c.Canvas.width;
      c.Height = c.Canvas.height;
      c.Command = c.Canvas.attributes["data-cvgr"].value;
      c.CmdsHash = Trekta.Utils.CmdlinParser.parse(c.Command);
      c.AlgoName = "algo" in c.CmdsHash && "" !== c.CmdsHash.algo ? c.CmdsHash.algo : "pulse";
      Cvgr.Vars.icos.push(c);
    }
  }
  a = null;
  Cvgr.Func.executeFrame();
};
Cvgr.Vars.aPiggyAlgoNames = [];
Cvgr.Vars.aPiggyModuleNamesTwo = [];
Cvgr.Vars.aPiggyCallbacks = [];
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(0);
}, function() {
  Cvgr.Func.pullbehind_onError(0);
}, function() {
  Cvgr.Func.pullbehind_onLoad(0);
}, function() {
  Cvgr.Func.pullbehind_onError(0);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(1);
}, function() {
  Cvgr.Func.pullbehind_onError(1);
}, function() {
  Cvgr.Func.pullbehind_onLoad(1);
}, function() {
  Cvgr.Func.pullbehind_onError(1);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(2);
}, function() {
  Cvgr.Func.pullbehind_onError(2);
}, function() {
  Cvgr.Func.pullbehind_onLoad(2);
}, function() {
  Cvgr.Func.pullbehind_onError(2);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(3);
}, function() {
  Cvgr.Func.pullbehind_onError(3);
}, function() {
  Cvgr.Func.pullbehind_onLoad(3);
}, function() {
  Cvgr.Func.pullbehind_onError(3);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(4);
}, function() {
  Cvgr.Func.pullbehind_onError(4);
}, function() {
  Cvgr.Func.pullbehind_onLoad(4);
}, function() {
  Cvgr.Func.pullbehind_onError(4);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(5);
}, function() {
  Cvgr.Func.pullbehind_onError(5);
}, function() {
  Cvgr.Func.pullbehind_onLoad(5);
}, function() {
  Cvgr.Func.pullbehind_onError(5);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(6);
}, function() {
  Cvgr.Func.pullbehind_onError(6);
}, function() {
  Cvgr.Func.pullbehind_onLoad(6);
}, function() {
  Cvgr.Func.pullbehind_onError(6);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(7);
}, function() {
  Cvgr.Func.pullbehind_onError(7);
}, function() {
  Cvgr.Func.pullbehind_onLoad(7);
}, function() {
  Cvgr.Func.pullbehind_onError(7);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(8);
}, function() {
  Cvgr.Func.pullbehind_onError(8);
}, function() {
  Cvgr.Func.pullbehind_onLoad(8);
}, function() {
  Cvgr.Func.pullbehind_onError(8);
}]);
Cvgr.Vars.aPiggyCallbacks.push([function() {
  Cvgr.Func.pullbehind_onLoad(9);
}, function() {
  Cvgr.Func.pullbehind_onError(9);
}, function() {
  Cvgr.Func.pullbehind_onLoad(9);
}, function() {
  Cvgr.Func.pullbehind_onError(9);
}]);
Cvgr.Vars.aPiggyFlags4Avail = [];
Cvgr.Vars.aPiggyFlags4OnError2 = [];
Cvgr.Vars.aPiggyFlags4OnLoad1 = [];
Cvgr.Vars.aPiggyFlags4OnError1 = [];
Cvgr.Vars.aPiggyIconArrays = [];
Cvgr.Vars.aPiggyTimers = [];
Cvgr.Vars.iFramesInLastTwoSeconds = 0;
Cvgr.Vars.iFramesPerTowSeconds = 0;
Cvgr.Vars.iMarkLastTwoSecond = 0;
Cvgr.Vars.iMarkLastTwoSecondFrame = 0;
Cvgr.Vars.nIncTurnsPerFrame = 0;
Cvgr.Vars.nTrueAngleTurns = 0;
Cvgr.Vars.sDebugPageHelper = "";
Cvgr.Vars.tHelper = null;
Cvgr.Func.examineAlgo = function(a, b) {
  var c = b.AlgoName;
  if (b.AlgoName in Cvgr.Algos) {
    Cvgr.Vars.aPiggyFlags4Avail[a] = !0;
  } else {
    for (var d = Cvgr.Vars.aPiggyIconArrays[a], e = 0; e < d.length; e++) {
      Cvgr.Vars.aPiggyIconArrays[a][e].AlgoName = "pulse", Cvgr.Vars.aPiggyIconArrays[a][e].CmdsHash.text = "Rpx " + e, Cvgr.Vars.aPiggyIconArrays[a][e].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][e]);
    }
  }
  Cvgr.Vars.sDebugPageHelper += "<br /> — examineAlgo : piggy " + a + " &nbsp; onLoad = " + Cvgr.Vars.aPiggyFlags4OnLoad1[a] + " &nbsp; onError1 = " + Cvgr.Vars.aPiggyFlags4OnError1[a] + " &nbsp; onError2 = " + Cvgr.Vars.aPiggyFlags4OnError2[a] + " &nbsp; avail = " + Cvgr.Vars.aPiggyFlags4Avail[a] + " &nbsp; algo = " + c + " / " + b.AlgoName;
};
Cvgr.Func.executeFram_PrintInfoCanvas = function(a) {
  var b = document.getElementById(Cvgr.Vars.icos[a].Ide + ".info");
  if (null !== b) {
    var c = "<small>Canvas Debug Info :" + ("<br />iko.AlgoName = " + Cvgr.Vars.icos[a].AlgoName + " <br />frame no = " + Cvgr.Vars.iFrameNo + " <br />iko.Angle = " + Cvgr.Vars.icos[a].Angle.toFixed(9) + " <br />iko.Color = " + Cvgr.Vars.icos[a].Color + "<br />iko.Height = " + Cvgr.Vars.icos[a].Height + "<br />iko.Mode = " + (Cvgr.Vars.bFlagTipTopTest ? "Top" : "Tip") + "<br />iko.Width = " + Cvgr.Vars.icos[a].Width);
    for (var d in Cvgr.Vars.icos[a].CmdsHash) {
      if (Cvgr.Vars.icos[a].CmdsHash.hasOwnProperty(d)) {
        var e = Trekta.Utils.htmlEscape(Cvgr.Vars.icos[a].CmdsHash[d]);
        c += "<br /> [cmd] " + d + " = " + e;
      }
    }
    b.innerHTML = c + "</small>";
  }
};
Cvgr.Func.executeFram_PrintInfoPage = function(a, b, c) {
  var d = document.getElementById("Cvgr_DebugPageOutputArea");
  if (null !== d) {
    var e = "<b>CanvasGear Page Debug Info</b> :" + (" AlgoMode = " + (Cvgr.Vars.bFlagTipTopTest ? "Top" : "Tip") + "; ");
    e += " Frame number = " + Cvgr.Vars.iFrameNo + ";";
    e += "<br />Start time = " + Cvgr.Vars.iTimeStart + " = " + Cvgr.Vars.iTimeStart.valueOf() + ";";
    e = e + ("<br />Current time = " + a) + ("<br />Elapsed seconds (every two) = " + b + ";") + ("<br />Frames per seconds (total, average since start) = " + c.toFixed(9));
    e += "<br />Frames per seconds (for the last two seconds) = " + Cvgr.Vars.iFramesPerTowSeconds.toFixed(9);
    e += "<br />True angle for 1 Hz (turns) = " + Cvgr.Vars.nTrueAngleTurns.toFixed(9) + ";";
    e += "<br />Increment per frame (turns) = " + Cvgr.Vars.nIncTurnsPerFrame.toFixed(9) + ";";
    e += "<br />" + Cvgr.Vars.sDebugPageHelper;
    d.innerHTML = e;
  }
};
Cvgr.Func.executeFrame = function() {
  Cvgr.Vars.iFrameNo++;
  var a = new Date;
  a.getTime();
  var b = a - Cvgr.Vars.iTimeStart, c = Cvgr.Vars.iFrameNo / b * 1000;
  b = 2 * Math.floor(b / 2000);
  Cvgr.Vars.iMarkLastTwoSecond < b && (Cvgr.Vars.iMarkLastTwoSecond = b, Cvgr.Vars.iFramesInLastTwoSeconds = Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame, Cvgr.Vars.iFramesPerTowSeconds = (Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame) / 2, Cvgr.Vars.iMarkLastTwoSecondFrame = Cvgr.Vars.iFrameNo);
  0.001 > Cvgr.Vars.iFramesPerTowSeconds && (Cvgr.Vars.iFramesPerTowSeconds = 2 * c);
  Cvgr.Vars.nTrueAngleTurns += 1 / Cvgr.Vars.iFramesPerTowSeconds;
  1 < Cvgr.Vars.nTrueAngleTurns && --Cvgr.Vars.nTrueAngleTurns;
  Cvgr.Vars.nIncTurnsPerFrame = 1 / Cvgr.Vars.iFramesPerTowSeconds;
  Cvgr.Func.executeFram_PrintInfoPage(a, b, c);
  for (a = 0; a < Cvgr.Vars.icos.length; a++) {
    if (c = Cvgr.Vars.icos[a], !(0 < c.DrawNumberLimit && Cvgr.Vars.iFrameNo - c.iFrameDelay > c.DrawNumberLimit)) {
      if (Cvgr.Func.executeFram_PrintInfoCanvas(a), b = c.AlgoName, b in Cvgr.Algos && ("Template" !== b || Cvgr.Vars.bTemplateSearchFinished) || c.bIsDefaultSettingDone) {
        c.bIsDefaultSettingDone || Cvgr.Func.initializeCanvas(c);
        try {
          Cvgr.Algos[b].executeAlgorithm(c);
        } catch (h) {
          Cvgr.Vars.sDebugPageHelper += "<br /> [Err 20190329°0412] ↯ executeAlgorithm failed :Ide = " + c.Ide + " algo = " + b + " (should never happen)";
        }
      } else {
        var d = Cvgr.Vars.aPiggyAlgoNames.indexOf(b);
        if (0 <= d) {
          2 > Cvgr.Vars.iFrameNo && Cvgr.Vars.aPiggyIconArrays[d].push(c);
        } else {
          if (Cvgr.Vars.aPiggyAlgoNames.length > Cvgr.Vars.aPiggyCallbacks.length - 1) {
            Cvgr.Vars.sDebugPageHelper += "<br />*** Prefabricated callbacks finished : " + Cvgr.Vars.aPiggyAlgoNames.length, c.AlgoName = "pulse", c.CmdsHash.text = "Substitute";
          } else {
            var e = Trekta.Utils.retrieveScriptFolderAbs("/canvasgear.combined.js");
            "" === e && (e = Trekta.Utils.retrieveScriptFolderAbs("/canvasgear.js"));
            d = e + "/riders/canvasgear." + b + ".js";
            e = e + "/canvasgear." + b + ".js";
            var f = Cvgr.Vars.aPiggyAlgoNames.length;
            Cvgr.Vars.aPiggyAlgoNames.push(b);
            var g = [];
            g.push(c);
            Cvgr.Vars.aPiggyIconArrays.push(g);
            Cvgr.Vars.aPiggyFlags4Avail.push(!1);
            Cvgr.Vars.aPiggyFlags4OnError2.push(!1);
            Cvgr.Vars.aPiggyFlags4OnLoad1.push(!1);
            Cvgr.Vars.aPiggyFlags4OnError1.push(!1);
            Cvgr.Vars.aPiggyTimers.push(setTimeout(Cvgr.Func.examineAlgo, 1444, Cvgr.Vars.aPiggyTimers.length, Cvgr.Vars.icos[a]));
            Cvgr.Vars.aPiggyModuleNamesTwo.push(e);
            Cvgr.Vars.sDebugPageHelper += "<br /> — pullScriptBehind " + f + " " + b;
            Trekta.Utils.pullScriptBehind(d, Cvgr.Vars.aPiggyCallbacks[f][0], Cvgr.Vars.aPiggyCallbacks[f][1]);
          }
        }
      }
    }
  }
  window.requestAnimFrame(Cvgr.Func.executeFrame);
};
Cvgr.Func.initializeCanvas = function(a) {
  var b = {algo:"AlgoName", bgcolor:"BgColor", color:"Color", color2:"Color2", color3:"Color3", height:"Height", hertz:"Hertz", shiftx:"ShiftX", shifty:"ShiftY", width:"Width"}, c = Cvgr.Algos[a.AlgoName].defaultProperties, d;
  for (d in c) {
    c.hasOwnProperty(d) && (a[d] = c[d]);
  }
  for (var e in a.CmdsHash) {
    a.CmdsHash.hasOwnProperty(e) && "algo" !== e && (c = e, e in b && (c = b[e]), a[c] = a.CmdsHash[e]);
  }
  b = a.AlgoName;
  "pickupOnKeyDown" in Cvgr.Algos[b] && (document.onkeydown = Cvgr.Algos[b].pickupOnKeyDown);
  "pickupOnMouseMove" in Cvgr.Algos[b] && (a.Canvas.onmousemove = Cvgr.Algos[b].pickupOnMouseMove);
  "pickupOnMouseDown" in Cvgr.Algos[b] && (a.Canvas.onmousedown = Cvgr.Algos[b].pickupOnMouseDown);
  "pickupOnMouseUp" in Cvgr.Algos[b] && (a.Canvas.onmouseup = Cvgr.Algos[b].pickupOnMouseUp);
  "pickupOnTouchMove" in Cvgr.Algos[b] && (a.Canvas.ontouchmove = Cvgr.Algos[b].pickupOnTouchMove);
  "pickupOnTouchStart" in Cvgr.Algos[b] && (a.Canvas.ontouchstart = Cvgr.Algos[b].pickupOnTouchStart);
  "yes" === a.PlaySound && (Cvgr.Vars.bSoundLibraryLoading = !0, b = Trekta.Utils.retrieveScriptFolderAbs("/canvasgear.combined.js"), "" === b && (b = Trekta.Utils.retrieveScriptFolderAbs("/canvasgear.js")), Trekta.Utils.pullScriptBehind(b + "/libs/howler/howler.min.js", Cvgr.Func.pullbehind_soundOnLoad("howler"), Cvgr.Func.pullbehind_soundOnError("howler")));
  a.bIsDefaultSettingDone = !0;
};
Cvgr.Func.pullbehind_onError = function(a) {
  if (!1 === Cvgr.Vars.aPiggyFlags4OnError1[a]) {
    Cvgr.Vars.aPiggyFlags4OnError1[a] = !0, Trekta.Utils.pullScriptBehind(Cvgr.Vars.aPiggyModuleNamesTwo[a], Cvgr.Vars.aPiggyCallbacks[a][0], Cvgr.Vars.aPiggyCallbacks[a][1]), Cvgr.Vars.sDebugPageHelper += "<br /> — pullScript_Second : &nbsp; piggy " + a + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[a] + '" &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[a] + " &nbsp; onerror1 = " + Cvgr.Vars.aPiggyFlags4OnError1[a] + " &nbsp; onerror2 = " + Cvgr.Vars.aPiggyFlags4OnError2[a];
  } else {
    Cvgr.Vars.aPiggyFlags4OnError2[a] = !0;
    if (Cvgr.Vars.aPiggyAlgoNames[a] in Cvgr.Algos) {
      Cvgr.Vars.bTemplateSearchFinished = !0;
      Cvgr.Vars.aPiggyFlags4Avail[a] = !0;
      var b = Cvgr.Vars.aPiggyIconArrays[a];
      for (var c = 0; c < b.length; c++) {
        Cvgr.Vars.aPiggyIconArrays[a][c].CmdsHash.text = "Template intern " + c, Cvgr.Vars.aPiggyIconArrays[a][c].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][c]);
      }
    } else {
      for (b = Cvgr.Vars.aPiggyIconArrays[a], c = 0; c < b.length; c++) {
        Cvgr.Vars.aPiggyIconArrays[a][c].AlgoName = "pulse", Cvgr.Vars.aPiggyIconArrays[a][c].CmdsHash.text = "Rp " + c, Cvgr.Vars.aPiggyIconArrays[a][c].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][c]);
      }
    }
    Cvgr.Vars.sDebugPageHelper += "<br /> — pullbehind_onError : &nbsp; piggy " + a + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[a] + '" &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[a] + " &nbsp; onerror1 = " + Cvgr.Vars.aPiggyFlags4OnError1[a] + " &nbsp; onerror2 = " + Cvgr.Vars.aPiggyFlags4OnError2[a];
  }
};
Cvgr.Func.pullbehind_onLoad = function(a) {
  Cvgr.Vars.aPiggyFlags4OnLoad1[a] = !0;
  var b = Cvgr.Vars.aPiggyAlgoNames[a];
  Cvgr.Vars.sDebugPageHelper += "<br /> — pullbehind_onLoad : piggy " + a;
  a = Cvgr.Vars.aPiggyIconArrays[a];
  Cvgr.Vars.sDebugPageHelper += ' &nbsp; algo "' + a[0].AlgoName + '" &nbsp; count = ' + a.length;
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    Cvgr.Vars.sDebugPageHelper += "<br /> — &nbsp; &nbsp; &nbsp; &nbsp; iko.Ide = " + d.Ide;
    b in Cvgr.Algos && (d.bIsDefaultSettingDone || Cvgr.Func.initializeCanvas(d), d.iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Algos[d.AlgoName].executeAlgorithm(d));
  }
};
Cvgr.Func.pullbehind_soundOnError = function(a) {
  "soundman2" !== a && "howler" !== a ? alert('Theoretically not possible:\n\nPullbehind onError wanted = "' + a + '"') : Cvgr.Vars.bSoundLibraryFailed = !0;
};
Cvgr.Func.pullbehind_soundOnLoad = function(a) {
  "soundman2" !== a && "howler" !== a ? alert('Theoretically not possible:\n\nPullbehind onLoad wanted = "' + a + '"') : (Cvgr.Vars.bSoundLibraryLoaded = !0, Cvgr.Vars.tHelper = setTimeout(Cvgr.Func.pullbehind_soundOnLoaded, 1456));
};
Cvgr.Func.pullbehind_soundOnLoaded = function() {
  Cvgr.Vars.sound = new Howl({src:[Cvgr.Const.sB64Dopiaza_MouseOverMp3], loop:!1});
  Cvgr.Vars.bSoundLibraryReady = !0;
};
Cvgr.Func.setRadiobutton = function() {
  var a = "[Debug 20140926°1131]\n\nNow radio-button algo-mode = ";
  document.FormAlgoMode.AlgoMode[0].checked ? (Cvgr.Vars.bFlagTipTopTest = !1, a += document.FormAlgoMode.AlgoMode[0].value) : (Cvgr.Vars.bFlagTipTopTest = !0, a += document.FormAlgoMode.AlgoMode[1].value);
  Cvgr.Const.bShow_Debug_Dialogs && alert(a);
};
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Ballist = {Hit:function(a, b) {
  this.ringval = a;
  this.minutes = b;
  a = this.minutes / 60 * Math.PI * 2;
  a += 1.5 * Math.PI;
  b = 10.9 - this.ringval;
  var c = b * Math.sin(a) * 0.20;
  this.X = b * Math.cos(a) * 0.20;
  this.Y = c;
}, Ring:function(a, b, c, d) {
  null === a && (a = "?");
  null === b && (b = 0.987);
  null === c && (c = "gray");
  null === d && (d = "white");
  this.ringname = a;
  this.radiusAbs = b;
  this.colorRing = c;
  this.colorSpace = d;
}, Target:function() {
  this.Diameter = 0.1;
  this.Shortnam = this.Naame = "<n/a>";
  this.rings = [];
}, executeAlgo_drawDiagonal:function(a) {
  var b = a.Height, c = b - 11, d = a.Width - 11;
  b -= 11;
  a.Context.beginPath();
  a.Context.moveTo(11, c);
  a.Context.lineTo(d, b);
  a.Context.moveTo(11, b + 5.5);
  a.Context.lineTo(11, b - 5.5);
  a.Context.moveTo(d, b + 5.5);
  a.Context.lineTo(d, b - 5.5);
  a.Context.strokeStyle = a.Color;
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.Context.closePath();
  a.Context.strokeStyle = "turquoise";
  a.Context.lineWidth = 3;
  a.Context.stroke();
  a.Context.font = "1.2em Arial";
  a.Context.fillStyle = "turquoise";
  a.Context.fillText("~0.11 m", 16.5, c - 5.5);
  a.CmdsHash.text && (a.Context.fillStyle = "#102030", a.Context.font = "1.2em Arial", a.Context.fillText(a.CmdsHash.text, 10, 20));
}, executeAlgo_getSeries:function(a) {
  var b = [];
  if ("undefined" === typeof a || 1 > a.length) {
    a = new Cvgr.Algos.Ballist.Hit(10.7, 55), b.push(a), a = new Cvgr.Algos.Ballist.Hit(9.3, 43), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.1, 0), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.2, 1), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.3, 3), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.4, 6), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.5, 10), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.6, 20), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.7, 30), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.8, 
    40), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.9, 50), b.push(a);
  } else {
    a = a.split(" ");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].split("/");
      d = new Cvgr.Algos.Ballist.Hit(d[0], d[1]);
      b.push(d);
    }
  }
  return b;
}, executeAlgo_getTarget:function(a) {
  var b = new Cvgr.Algos.Ballist.Target;
  "kkspp" === a ? (b.Diameter = 0.500, b.Naame = "Sportpistole 25 m Präzision", b.Shortnam = a, b.rings.push(new Cvgr.Algos.Ballist.Ring("10", 0.025, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("9", 0.050, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("8", 0.075, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("7", 0.100, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("6", 0.125, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("5", 
  0.150, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("4", 0.175, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("3", 0.200, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("2", 0.225, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("1", 0.250, "blue", "white"))) : "kkspd" === a ? (b.Diameter = 0.500, b.Naame = "Sportpistole 25 m Duell", b.Shortnam = a, b.rings.push(new Cvgr.Algos.Ballist.Ring("5", 0.050, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("4", 
  0.100, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("3", 0.150, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("2", 0.200, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("1", 0.250, "blue", "black"))) : "lg10m" === a ? (b.Diameter = 0.050, b.Naame = "Luftgewehr 10 m", b.Shortnam = a, b.rings.push(new Cvgr.Algos.Ballist.Ring("10", 0.0025, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("9", 0.0050, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("8", 
  0.0075, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("7", 0.0100, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("6", 0.0125, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("5", 0.0150, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("4", 0.0175, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("3", 0.0200, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("2", 0.0225, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("1", 
  0.0250, "blue", "white"))) : "lgdt10m" === a ? (b.Diameter = 0.0100, b.Naame = "Deutsche Luftgewehr-Scheibe 10 m", b.Shortnam = a, b.rings.push(new Cvgr.Algos.Ballist.Ring("10", 0.0005, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("9", 0.0010, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("8", 0.0015, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("7", 0.0020, "blue", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("6", 0.0025, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("5", 
  0.0030, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("4", 0.0035, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("3", 0.0040, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("2", 0.0045, "blue", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("1", 0.0050, "blue", "white"))) : (b.Diameter = 0.1500, b.Naame = "Luftpistole 10 m", b.Shortnam = "lupi10m", b.rings.push(new Cvgr.Algos.Ballist.Ring("10", 0.0055, "black", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("9", 
  0.0135, "black", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("8", 0.0215, "gray", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("7", 0.0295, "gray", "black")), b.rings.push(new Cvgr.Algos.Ballist.Ring("6", 0.0375, "gray", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("5", 0.0455, "gray", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("4", 0.0535, "red", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("3", 0.0615, "red", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("2", 
  0.0695, "red", "white")), b.rings.push(new Cvgr.Algos.Ballist.Ring("1", 0.0775, "red", "white")));
  return b;
}, executeAlgorithm:function(a) {
  var b = Cvgr.Algos.Ballist.executeAlgo_getTarget(), c = Cvgr.Algos.Ballist.executeAlgo_getSeries(a.CmdsHash.series);
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var d = (a.Width + a.Height) / 4, e = d, f = d;
  null !== a.ShiftX && (e = d + parseInt(a.ShiftX, 10));
  null !== a.ShiftY && (f = d + parseInt(a.ShiftY, 10));
  for (var g = 0; g < b.rings.length; g++) {
    var h = d * b.rings[g].radiusAbs * 12;
    a.Context.beginPath();
    a.Context.arc(e, f, h, 0, 2 * Math.PI, !1);
    a.Context.closePath();
    a.Context.strokeStyle = Trekta.Util2.colorNameToHex(b.rings[g].colorRing);
    a.Context.lineWidth = 1;
    a.Context.stroke();
  }
  for (b = 0; b < c.length; b++) {
    nRadius2 = 6, e = d + 50 * c[b].X + parseInt(a.ShiftX, 10), f = d + 50 * c[b].Y + parseInt(a.ShiftY, 10), a.Context.beginPath(), a.Context.arc(e, f, nRadius2, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.strokeStyle = "#4169e1", a.Context.lineWidth = 1, a.Context.stroke();
  }
  Cvgr.Algos.Ballist.executeAlgo_drawDiagonal(a);
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 4 * Math.PI && (a.Angle -= 4 * Math.PI);
}, defaultProperties:{}};
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Template = Cvgr.Algos.Template || {};
Cvgr.Algos.Template.executeAlgorithm = function(a) {
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = a.Width / 2, c = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  c = null !== a.ShiftY ? c + parseInt(a.ShiftY, 10) : c;
  var d = (a.Width + a.Height) / 4 * 0.66;
  a.Context.beginPath();
  a.Context.arc(b, c, d, 0.1 + a.Angle, 1.6 * Math.PI + a.Angle, !1);
  a.Context.strokeStyle = a.Color;
  a.Context.lineWidth = 6;
  a.Context.stroke();
  b = "Template intern";
  a.CmdsHash.text && (b = a.CmdsHash.text);
  a.Context.fillStyle = "MediumVioletRed";
  a.Context.font = "0.9em Arial";
  a.Context.fillText(b, 3, 21);
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 2 * Math.PI && (a.Angle -= 2 * Math.PI);
};
Cvgr.Algos.Template.defaultProperties = {DrawNumberLimit:0};
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.develop = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var c = [], d = new Cvgr.Objs.Line(3, 3, b - 3, 3, a.Color), e = new Cvgr.Objs.Line(4, b - 4, b - 4, b - 4, a.Color2);
  b = new Cvgr.Objs.Line(5, b - 7, b - 5, 7, a.Color3);
  c.push(d);
  c.push(e);
  c.push(b);
  for (d = 0; d < c.length; d++) {
    a.Context.beginPath(), a.Context.moveTo(c[d].X1, c[d].Y1), a.Context.lineTo(c[d].X2, c[d].Y2), a.Context.lineWidth = 3, a.Context.strokeStyle = c[d].Colo, a.Context.stroke();
  }
}, defaultProperties:{BgColor:"LightCyan", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue"}};
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.oblongrose = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2 / 2;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.strokeStyle = a.Color;
  a.Context.fillStyle = "Yellow";
  a.Context.translate(b, b);
  for (var c, d = 0, e = 0; 16 > e; e++) {
    c = 1.7 * Math.PI / 16, a.Context.rotate(c), d += c, a.Context.strokeRect(0.1 * b, 0.1 * b, 0.3 * b, 0.7 * b);
  }
  a.Context.rotate(-1 * d);
  a.Context.translate(-1 * b, -1 * b);
}, defaultProperties:{BgColor:"LightCyan", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:5}};
Cvgr.Algos.pulse = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  b = b / 2 * a.SizeFactor;
  var c = a.Width / 2 + parseInt(a.ShiftX, 9), d = a.Height / 2 + parseInt(a.ShiftY, 9);
  b *= Math.abs(Math.cos(a.Angle));
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = "#f0f0f0";
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.beginPath();
  a.Context.arc(c, d, b, 0, 2 * Math.PI, !1);
  a.Context.closePath();
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.CmdsHash.text && (c = a.CmdsHash.text, a.Context.fillStyle = "MediumVioletRed", a.Context.font = "0.9em Arial", a.Context.fillText(c, 3, 21));
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > Math.PI && (a.Angle -= Math.PI);
}, defaultProperties:{BgColor:"LightCyan", DrawNumberLimit:0}};
Cvgr.Algos.triangle = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2, c = 0.5 * b, d = 0.01 * b, e = 0.8 * b, f = 0.9 * b, g = 0.2 * b;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.translate(b / 2, b / 2);
  a.Context.rotate(4 * Cvgr.Vars.nIncTurnsPerFrame * a.Hertz);
  a.Context.translate(-b / 2, -b / 2);
  a.Context.fillStyle = a.BgColor;
  try {
    a.Context.fillRect(0, 0, a.Width, a.Height);
  } catch (h) {
    Cvgr.Const.bShow_Debug_Dialogs && alert('[debug 20140901°0913]\nException "' + h + '"');
  }
  a.Context.beginPath();
  try {
    a.Context.moveTo(c, d);
  } catch (h) {
    Cvgr.Const.bShow_Debug_Dialogs && alert('[debug 20140901°0932]\nException "' + h + '"');
  }
  a.Context.lineTo(e, f);
  a.Context.lineTo(g, f);
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.Context.closePath();
}, defaultProperties:{BgColor:"LightCyan", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:0}};
Cvgr.Algos.triangulum = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  var c = Math.sin(a.Angle) * (b - 4) / 2 + b / 2;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.beginPath();
  a.Context.moveTo(3, 3);
  a.Context.lineTo(b - 3, 3);
  a.Context.lineTo(c, b - 5);
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.Context.closePath();
  a.Context.lineWidth = 2;
  a.Context.strokeStyle = a.Color2;
  a.Context.stroke();
  a.Context.beginPath();
  a.Context.moveTo(2, b - 2);
  a.Context.lineTo(b - 2, b - 2);
  a.Context.lineWidth = 3;
  a.Context.strokeStyle = a.Color3;
  a.Context.stroke();
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 4 * Math.PI && (a.Angle -= 4 * Math.PI);
}, defaultProperties:{DrawNumberLimit:0}};
var Trekta = Trekta || {};
Trekta.Util2 = Trekta.Util2 || {};
Trekta.Util2.Webcolors = function() {
  this.pink = "#ffc0cb";
  this.lightpink = "#ffb6c1";
  this.hotpink = "#ff69b4";
  this.deeppink = "#ff1493";
  this.palevioletred = "#db7093";
  this.mediumvioletred = "#c71585";
  this.lightsalmon = "#ffa07a";
  this.salmon = "#fa8072";
  this.darksalmon = "#e9967a";
  this.lightcoral = "#f08080";
  this.indianred = "#cd5c5c";
  this.crimson = "#dc143c";
  this.firebrick = "#b22222";
  this.darkred = "#8b0000";
  this.red = "#ff0000";
  this.orangered = "#ff4500";
  this.tomato = "#ff6347";
  this.coral = "#ff7f50";
  this.darkorange = "#ff8c00";
  this.orange = "#ffa500";
  this.yellow = "#ffff00";
  this.lightyellow = "#ffffe0";
  this.lemonchiffon = "#fffacd";
  this.lightgoldenrodyellow = "#fafad2";
  this.papayawhip = "#ffefd5";
  this.moccasin = "#ffe4b5";
  this.peachpuff = "#ffdab9";
  this.palegoldenrod = "#eee8aa";
  this.khaki = "#f0e68c";
  this.darkkhaki = "#bdb76b";
  this.gold = "#ffd700";
  this.cornsilk = "#fff8dc";
  this.blanchedalmond = "#ffebcd";
  this.bisque = "#ffe4c4";
  this.navajowhite = "#ffdead";
  this.wheat = "#f5deb3";
  this.burlywood = "#deb887";
  this.tan = "#d2b48c";
  this.rosybrown = "#bc8f8f";
  this.sandybrown = "#f4a460";
  this.goldenrod = "#daa520";
  this.darkgoldenrod = "#b8860b";
  this.peru = "#cd853f";
  this.chocolate = "#d2691e";
  this.saddlebrown = "#8b4513";
  this.sienna = "#a0522d";
  this.brown = "#a52a2a";
  this.maroon = "#800000";
  this.darkolivegreen = "#556b2f";
  this.olive = "#808000";
  this.olivedrab = "#6b8e23";
  this.yellowgreen = "#9acd32";
  this.limegreen = "#32cd32";
  this.lime = "#00ff00";
  this.lawngreen = "#7cfc00";
  this.chartreuse = "#7fff00";
  this.greenyellow = "#adff2f";
  this.springgreen = "#00ff7f";
  this.mediumspringgreen = "#00fa9a";
  this.lightgreen = "#90ee90";
  this.palegreen = "#98fb98";
  this.darkseagreen = "#8fbc8f";
  this.mediumseagreen = "#3cb371";
  this.seagreen = "#2e8b57";
  this.forestgreen = "#228b22";
  this.green = "#008000";
  this.darkgreen = "#006400";
  this.mediumaquamarine = "#66cdaa";
  this.cyan = this.aqua = "#00ffff";
  this.lightcyan = "#e0ffff";
  this.paleturquoise = "#afeeee";
  this.aquamarine = "#7fffd4";
  this.turquoise = "#40e0d0";
  this.mediumturquoise = "#48d1cc";
  this.darkturquoise = "#00ced1";
  this.lightseagreen = "#20b2aa";
  this.cadetblue = "#5f9ea0";
  this.darkcyan = "#008b8b";
  this.teal = "#008080";
  this.lightsteelblue = "#b0c4de";
  this.powderblue = "#b0e0e6";
  this.lightblue = "#add8e6";
  this.skyblue = "#87ceeb";
  this.lightskyblue = "#87cefa";
  this.deepskyblue = "#00bfff";
  this.dodgerblue = "#1e90ff";
  this.cornflowerblue = "#6495ed";
  this.steelblue = "#4682b4";
  this.royalblue = "#4169e1";
  this.blue = "#0000ff";
  this.mediumblue = "#0000cd";
  this.darkblue = "#00008b";
  this.navy = "#000080";
  this.midnightblue = "#191970";
  this.lavender = "#e6e6fa";
  this.thistle = "#d8bfd8";
  this.plum = "#dda0dd";
  this.violet = "#ee82ee";
  this.orchid = "#da70d6";
  this.magenta = this.fuchsia = "#ff00ff";
  this.mediumorchid = "#ba55d3";
  this.mediumpurple = "#9370db";
  this.blueviolet = "#8a2be2";
  this.darkviolet = "#9400d3";
  this.darkorchid = "#9932cc";
  this.darkmagenta = "#8b008b";
  this.purple = "#800080";
  this.indigo = "#4b0082";
  this.darkslateblue = "#483d8b";
  this.slateblue = "#6a5acd";
  this.mediumslateblue = "#7b68ee";
  this.white = "#ffffff";
  this.snow = "#fffafa";
  this.honeydew = "#f0fff0";
  this.mintcream = "#f5fffa";
  this.azure = "#f0ffff";
  this.aliceblue = "#f0f8ff";
  this.ghostwhite = "#f8f8ff";
  this.whitesmoke = "#f5f5f5";
  this.seashell = "#fff5ee";
  this.beige = "#f5f5dc";
  this.oldlace = "#fdf5e6";
  this.floralwhite = "#fffaf0";
  this.ivory = "#fffff0";
  this.antiquewhite = "#faebd7";
  this.linen = "#faF0e6";
  this.lavenderblush = "#fff0f5";
  this.mistyrose = "#ffe4e1";
  this.gainsboro = "#dcdcdc";
  this.lightgrey = "#d3d3d3";
  this.silver = "#c0c0c0";
  this.darkgray = "#a9a9a9";
  this.gray = "#808080";
  this.dimgray = "#696969";
  this.lightslategray = "#778899";
  this.slategray = "#708090";
  this.darkslategray = "#2f4f4f";
  this.black = "#000000";
  this.rebeccapurple = "#663399";
  this.verydarkviolett = "#d000d0";
};
Trekta.Util2.colorNameToHex = function(a) {
  var b = new Trekta.Util2.Webcolors;
  a = a.toLowerCase();
  return b[a] ? b[a] : "#C0C0C0";
};
Trekta = Trekta || {};
Trekta.Utils = Trekta.Utils || {getFileNameFull:function() {
  var a = document.location.href;
  a = a.substring(0, -1 === a.indexOf("?") ? a.length : a.indexOf("?"));
  return a = a.substring(0, -1 === a.indexOf("#") ? a.length : a.indexOf("#"));
}, getFilenamePlain:function() {
  var a = Trekta.Utils.getFileNameFull();
  -1 !== a.indexOf("/", a.length - 1) && (a += "index.html");
  a = a.split("/");
  return a = a[a.length - 1];
}, getXMLHttp:function() {
  if (Trekta.Utils.bIs_Browser_Explorer) {
    try {
      var a = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (b) {
      try {
        a = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (c) {
        return alert("Sorry, your browser does not support AJAX [message 20160613°0421]"), !1;
      }
    }
  } else {
    a = new XMLHttpRequest;
  }
  return a;
}, htmlEscape:function(a) {
  a = a.replace(/</g, "&lt;");
  return a = a.replace(/>/g, "&gt;");
}, isScriptAlreadyLoaded:function(a) {
  a = a.replace(/\./g, "\\.");
  a = new RegExp(a + "$", "");
  var b = document.getElementsByTagName("SCRIPT");
  if (b && 0 < b.length) {
    for (var c in b) {
      if (b[c].src && b[c].src.match(a)) {
        return !0;
      }
    }
  }
  return !1;
}, pullScriptBehind:function(a, b, c, d) {
  if (Trekta.Utils.bUseMinified) {
    var e = /.*\/highlight.pack.js$/.test(a), f = /.*\/showdown.min.js$/.test(a), g = /.*\/sitmapdaf.js$/.test(a), h = /.*\/tree.js$/.test(a);
    e || f || g || h || (a = a.replace(/\.js$/, ".min.js"));
  }
  if (0 <= Trekta.Utils.aPulled.indexOf(a)) {
    b(a, d, !0);
  } else {
    e = document.getElementsByTagName("head")[0];
    f = document.createElement("script");
    f.type = "text/javascript";
    f.src = a;
    if ("undefined" !== typeof b) {
      var k = function() {
        b(a, d, !1);
      };
      f.onload = function() {
        Trekta.Utils.pullScript_onload(a, k);
      };
    }
    c = c || null;
    null !== c && (f.onerror = function() {
      c(a, d);
    });
    e.appendChild(f);
    return !0;
  }
}, pullScript_onload:function(a, b) {
  Trekta.Utils.aPulled.push(a);
  b();
}, readTextFile1:function(a, b) {
  var c = "", d = Trekta.Utils.getXMLHttp();
  b ? d.open("GET", a, !0) : d.open("GET", a, !1);
  d.onreadystatechange = function() {
    4 !== d.readyState || 200 !== d.status && 0 !== d.status || (c = d.responseText);
  };
  try {
    d.send(null);
  } catch (e) {
  }
  return c;
}, readTextFile2:function(a, b) {
  b = "undefined" === typeof b ? null : b;
  var c = Trekta.Utils.getXMLHttp();
  c.open("GET", a, !0);
  c.onreadystatechange = function() {
    4 !== c.readyState || 200 !== c.status && 0 !== c.status || b(c.responseText);
  };
  try {
    c.send(null);
  } catch (e) {
    var d = "<b>Sorry, some feature on this page does not work.</b>\n File <tt>" + a + "</tt> could not be read.\nYour browser said: <tt>" + e.message + "</tt>.";
    d = Trekta.Utils.bIs_Browser_Chrome && "file:" === location.protocol ? d + "\nYour browser seems to be Chrome, and this does not read files via file protocol.\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE\nor (2) view this page from <tt>localhost</tt> with a HTTP server." : Trekta.Utils.bIs_Browser_Firefox && "file:" === location.protocol ? d + "\nYour browser seems to be <b>Firefox</b>, and this does not read files\nwith a path going below the current directory via file protocol.\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE\nor (2)  view this page from <tt>localhost</tt> with a HTTP server." : 
    d + ("\n [info 20160622°0131] Failed reading file " + a + ".");
    b(d);
  }
}, retrieveScriptFolderAbs:function(a) {
  if (Trekta.Utils.bUseMinified) {
    var b = /.*\/highlight.pack.js$/.test(a), c = /.*\/showdown.min.js$/.test(a), d = /.*\/sitmapdaf.js$/.test(a), e = /.*\/tree.js$/.test(a);
    b || c || d || e || (a = a.replace(/\.js$/, ".min.js"));
  }
  b = a.replace(/\./g, "\\.") + "$";
  a = new RegExp(b, "");
  b = new RegExp("(.*)" + b, "");
  c = "";
  if ((d = document.getElementsByTagName("SCRIPT")) && 0 < d.length) {
    for (var f in d) {
      d[f].src && d[f].src.match(a) && (c = d[f].src.replace(b, "$1"));
    }
  }
  return c;
}, windowOnloadDaisychain:function(a) {
  if (window.onload) {
    var b = window.onload;
    window.onload = function() {
      b();
      a();
    };
  } else {
    window.onload = function() {
      a();
    };
  }
}, aPulled:[], bIs_Browser_Chrome:navigator.userAgent.match(/Chrome/) ? !0 : !1, bIs_Browser_Explorer:navigator.appName.match(/Explorer/) ? !0 : !1, bIs_Browser_Firefox:navigator.userAgent.match(/Firefox/) ? !0 : !1, bIs_Browser_Opera:navigator.userAgent.match(/(Opera)|(OPR)/) ? !0 : !1, bShow_Debug_Dialogs:!1, bToggle_FALSE:!1, bToggle_TRUE:!0, bUseMinified:!1};
Trekta.Utils.CmdlinParser = function() {
  Trekta.Utils.parse = function(a) {
    "undefined" === typeof a && (a = "");
    for (var b = [], c = "", d = "", e = 0; e < a.length; e++) {
      var f = a.charAt(e);
      " " === f && "" === c ? "" !== d && (b.push(d), d = "") : "=" === f && "" === c ? ("" !== d && (b.push(d), d = ""), b.push("=")) : "'" === f || '"' === f ? c = "" === c ? f : "" : d += f;
    }
    b.push(d);
    a = [];
    for (d = 0; d < b.length; d++) {
      "" !== b[d] && (c = b[d], a[c] = "<n/a>", "=" === b[d + 1] && (a[c] = b[d + 2], d++, d++));
    }
    return a;
  };
  return {parse:Trekta.Utils.parse};
}();
Trekta.Utils.windowOnloadDaisychain(Cvgr.startCanvasGear);

/* *** append _min.canvasgear.Hamster.js at pos 55363 *** */

/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script provides a CanvasGear algorithm

 file : 20190401°0311
 version : 0.2.3.d
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, b, d) {
    var c = this.length || 0;
    0 > b && (b = Math.max(0, c + b));
    if (null == d || d > c) {
      d = c;
    }
    d = Number(d);
    0 > d && (d = Math.max(0, c + d));
    for (b = Number(b || 0); b < d; b++) {
      this[b] = a;
    }
    return this;
  };
}, "es6", "es3");
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Hamster = {};
Cvgr.Algos.Hamster.draw = function(a) {
  a.save();
  a.translate(0, 0);
  a.translate(0, 0);
  a.scale(1, 1);
  a.translate(0, 0);
  a.strokeStyle = "rgba(0,0,0,0)";
  a.lineCap = "butt";
  a.lineJoin = "miter";
  a.miterLimit = 4;
  a.save();
  a.restore();
  a.save();
  a.translate(-13.991, -29.024);
  a.save();
  a.transform(2.2924, 0, 0, 2.2924, 566.41, 68.237);
  a.save();
  a.fillStyle = "#ffcc00";
  a.beginPath();
  a.moveTo(-207.26, -16.721);
  a.bezierCurveTo(-203.03, -14.367, -201.53, -8.069, -201.76, -4.721);
  a.bezierCurveTo(-202.14, 0.082200000, -203.019999999, 6.051, -206.26, 9.56);
  a.bezierCurveTo(-208.429999999, 10.309000000, -217.679999999, 9.7133, -221.12, 14.373000000);
  a.bezierCurveTo(-220.420000000, 14.513000000, -215.43, 14.479000000, -215.170000000, 14.873000000);
  a.bezierCurveTo(-214.77, 15.477, -215.470000000, 15.936000000, -215.83, 16.404);
  a.bezierCurveTo(-218.880000000, 20.392, -223.850000000, 30.793, -222.61, 38.091);
  a.bezierCurveTo(-222.11, 37.749, -219.53, 32.903, -218.980000000, 33.185);
  a.bezierCurveTo(-217.950000000, 39.260000000, -216.760000000, 46.214, -212.36, 51.185);
  a.bezierCurveTo(-212.260000000, 51.009, -210.65, 46.072, -210.510000000, 45.935);
  a.bezierCurveTo(-209.090000000, 50.483000000, -206.4, 57.279, -202.3, 59.31);
  a.bezierCurveTo(-202.21, 57.259, -202.61, 54.951, -201.36, 55.31);
  a.bezierCurveTo(-199.630000000, 56.031, -197.24, 58.214, -195.510000000, 58.841);
  a.bezierCurveTo(-195.390000000, 58.604, -195.760000000, 57.1, -195.61, 57.029);
  a.bezierCurveTo(-194.200000000, 56.656000000, -192.220000000, 58.641000000, -190.86, 58.998000000);
  a.bezierCurveTo(-190.970000000, 58.128000000, -191.190000000, 57.294000000, -190.200000000, 57.31);
  a.bezierCurveTo(-189.3, 57.308, -187.96, 59.910000000, -187.140000000, 60.06);
  a.bezierCurveTo(-187.28, 59.201, -187.070000000, 58.877, -186.08, 59.091);
  a.bezierCurveTo(-185.74, 59.135, -185.47, 59.719, -185.140000000, 59.748000000);
  a.bezierCurveTo(-184.190000000, 59.198000000, -182.450000000, 60.140000000, -181.670000000, 61.185);
  a.bezierCurveTo(-180.74, 60.406, -179.3, 60.666000000, -178.08, 60.935);
  a.bezierCurveTo(-177.78, 61.361000000, -177.390000000, 61.008, -176.920000000, 60.81);
  a.bezierCurveTo(-174.980000000, 60.026, -176.02, 60.414, -175.390000000, 60.873000000);
  a.bezierCurveTo(-175.34, 60.872000000, -175.28, 60.878000000, -175.230000000, 60.873000000);
  a.bezierCurveTo(-174.570000000, 60.800000000, -173.700000000, 60.360000000, -172.980000000, 61.216000000);
  a.bezierCurveTo(-172.920000000, 61.160000000, -172.87, 61.082000000, -172.8, 61.029000000);
  a.bezierCurveTo(-172.74, 60.976000000, -172.670000000, 60.951000000, -172.61, 60.904000000);
  a.bezierCurveTo(-171.690000000, 60.198000000, -170.09, 60.114000000, -169.260000000, 60.591000000);
  a.bezierCurveTo(-168.93, 60.562000000, -168.760000000, 59.135000000, -168.420000000, 59.091000000);
  a.bezierCurveTo(-167.43, 58.877000000, -167.250000000, 59.201000000, -167.390000000, 60.060000000);
  a.bezierCurveTo(-166.570000000, 59.910000000, -165.290000000, 56.558000000, -164.390000000, 56.560000000);
  a.bezierCurveTo(-163.4, 56.544000000, -163.52, 58.128000000, -163.640000000, 58.998000000);
  a.bezierCurveTo(-162.27, 58.641000000, -159.920000000, 53.594000000, -158.510000000, 53.966000000);
  a.bezierCurveTo(-158.36, 54.038000000, -158.140000000, 55.854000000, -158.010000000, 56.091000000);
  a.bezierCurveTo(-156.290000000, 55.464000000, -154.590000000, 52.281000000, -152.86, 51.560000000);
  a.bezierCurveTo(-151.600000000, 51.201000000, -151.350000000, 54.509000000, -151.260000000, 56.560000000);
  a.bezierCurveTo(-148.890000000, 54.807000000, -146.4, 50.755000000, -144.36, 48.279000000);
  a.bezierCurveTo(-143.910000000, 47.827000000, -143.18, 47.144000000, -142.58, 47.623000000);
  a.bezierCurveTo(-142.440000000, 47.760000000, -141.3, 50.884000000, -141.200000000, 51.060000000);
  a.bezierCurveTo(-137.49, 46.548000000, -136.280000000, 39.184000000, -135.980000000, 34.404000000);
  a.bezierCurveTo(-135.440000000, 34.122000000, -131.450000000, 37.624000000, -130.950000000, 37.966000000);
  a.bezierCurveTo(-130.160000000, 32.264000000, -134.33, 21.828000000, -138.08, 18.623000000);
  a.bezierCurveTo(-138.52, 18.239000000, -139.100000000, 17.696000000, -138.700000000, 17.091000000);
  a.bezierCurveTo(-138.440000000, 16.698000000, -133.060000000, 14.419000000, -132.36, 14.279000000);
  a.bezierCurveTo(-135.790000000, 9.619600000, -147.410000000, 10.966000000, -149.58, 10.216000000);
  a.bezierCurveTo(-152.55, 6.657900000, -152.86, 0.231900000, -152.730000000, -4.720999999);
  a.bezierCurveTo(-152.96, -8.068999999, -151.46, -14.366999999, -147.230000000, -16.720999999);
  a.bezierCurveTo(-147.640000000, -16.686999999, -148.05, -16.652999999, -148.480000000, -16.564999999);
  a.bezierCurveTo(-150.070000000, -16.269999999, -151.570000000, -15.601999999, -152.920000000, -14.720999999);
  a.bezierCurveTo(-154.980000000, -13.389999999, -157.420000000, -10.077999999, -159.55, -9.096099999);
  a.bezierCurveTo(-159.56, -8.920699999, -160.570000000, -11.125999999, -161.140000000, -11.658999999);
  a.bezierCurveTo(-161.510000000, -12.003999999, -160.86, -10.618999999, -161.390000000, -10.939999999);
  a.bezierCurveTo(-162.65, -11.697999999, -164.760000000, -11.191999999, -165.700000000, -10.876999999);
  a.bezierCurveTo(-167.61, -10.240999999, -167.160000000, -12.064999999, -168.420000000, -13.095999999);
  a.bezierCurveTo(-169.500000000, -13.980999999, -172.81, -12.096999999, -173.8, -12.158999999);
  a.bezierCurveTo(-175.040000000, -12.235999999, -175.52, -13.435999999, -176.140000000, -13.689999999);
  a.bezierCurveTo(-176.760000000, -13.435999999, -179.24, -11.016999999, -180.480000000, -10.939999999);
  a.bezierCurveTo(-181.470000000, -10.877999999, -183.810000000, -14.105999999, -184.890000000, -13.220999999);
  a.bezierCurveTo(-186.15, -12.189999999, -187.3, -10.896999999, -189.200000000, -11.533999999);
  a.bezierCurveTo(-190.140000000, -11.847999999, -191.260000000, -10.853999999, -192.510000000, -10.095999999);
  a.bezierCurveTo(-193.05, -9.775699999, -192.780000000, -12.554999999, -193.05, -12.126999999);
  a.bezierCurveTo(-193.450000000, -11.488999999, -195.140000000, -10.213999999, -195.230000000, -10.533999999);
  a.bezierCurveTo(-195.390000000, -10.417999999, -195.58, -10.422999999, -195.8, -10.689999999);
  a.bezierCurveTo(-197.78, -11.938999999, -199.570000000, -13.500999999, -201.58, -14.720999999);
  a.bezierCurveTo(-202.93, -15.601999999, -204.420000000, -16.269999999, -206.010000000, -16.564999999);
  a.bezierCurveTo(-206.440000000, -16.652999999, -206.86, -16.686999999, -207.260000000, -16.720999999);
  a.closePath();
  a.moveTo(-209.420000000, -16.001999999);
  a.bezierCurveTo(-211.200000000, -15.738999999, -212.56, -13.549999999, -212.450000000, -11.314999999);
  a.bezierCurveTo(-212.760000000, -7.729099999, -211.470000000, -4.986299999, -210.11, -1.752399999);
  a.bezierCurveTo(-209.170000000, 0.413300000, -207.81, 4.008600000, -206.920000000, 5.278900000);
  a.bezierCurveTo(-206.55, 4.779000000, -206.21, 4.244300000, -205.890000000, 3.716400000);
  a.bezierCurveTo(-208.62, -1.622199999, -213.250000000, -8.394599999, -211.8, -13.283599999);
  a.bezierCurveTo(-211.27, -14.963599999, -210.040000000, -15.988599999, -208.61, -15.970599999);
  a.bezierCurveTo(-208.760000000, -15.996599999, -208.93, -16.002599999, -209.08, -16.001599999);
  a.bezierCurveTo(-209.200000000, -16.001599999, -209.3, -16.019599999, -209.420000000, -16.001599999);
  a.closePath();
  a.moveTo(-145.450000000, -16.001599999);
  a.bezierCurveTo(-145.670000000, -16.002599999, -145.880000000, -15.968599999, -146.11, -15.908599999);
  a.bezierCurveTo(-144.600000000, -15.815599999, -143.28, -14.503599999, -142.730000000, -12.751599999);
  a.bezierCurveTo(-141.280000000, -7.845899999, -145.970000000, -1.713599999, -148.700000000, 3.623400000);
  a.bezierCurveTo(-148.37, 4.191600000, -147.980000000, 4.742700000, -147.58, 5.279300000);
  a.bezierCurveTo(-146.070000000, 2.367800000, -145.33, 0.413700000, -144.390000000, -1.751999999);
  a.bezierCurveTo(-143.03, -4.985899999, -141.760000000, -7.384999999, -142.08, -10.970599999);
  a.bezierCurveTo(-142.43, -13.523599999, -143.33, -15.224599999, -145.450000000, -16.001599999);
  a.closePath();
  a.moveTo(-184.390000000, -14.470599999);
  a.bezierCurveTo(-184.380000000, -14.446599999, -184.34, -14.382599999, -184.3, -14.314599999);
  a.bezierCurveTo(-184.28, -14.295599999, -184.27, -14.272599999, -184.260000000, -14.251599999);
  a.bezierCurveTo(-184.250000000, -14.311599999, -184.250000000, -14.381599999, -184.3, -14.439599999);
  a.bezierCurveTo(-184.3, -14.449599999, -184.290000000, -14.460599999, -184.3, -14.470599999);
  a.bezierCurveTo(-184.31, -14.472599999, -184.34, -14.470599999, -184.36, -14.470599999);
  a.bezierCurveTo(-184.4, -14.471599999, -184.390000000, -14.465599999, -184.390000000, -14.470599999);
  a.closePath();
  a.moveTo(-142.200000000, 49.998400000);
  a.bezierCurveTo(-142.24, 50.0264, -142.290000000, 50.059400000, -142.33, 50.091400000);
  a.bezierCurveTo(-142.31, 50.084400000, -142.28, 50.088400000, -142.260000000, 50.091400000);
  a.bezierCurveTo(-142.230000000, 50.097400000, -142.220000000, 50.096400000, -142.200000000, 50.123400000);
  a.bezierCurveTo(-142.170000000, 50.180400000, -142.12, 50.2314, -142.08, 50.2794);
  a.bezierCurveTo(-142.130000000, 50.1454, -142.160000000, 50.0634, -142.200000000, 49.998400000);
  a.closePath();
  a.moveTo(-158.700000000, 56.2794);
  a.bezierCurveTo(-158.670000000, 56.3814, -158.630000000, 56.467400000, -158.61, 56.5604);
  a.bezierCurveTo(-158.600000000, 56.6144, -158.56, 56.647400000, -158.55, 56.6854);
  a.bezierCurveTo(-158.58, 56.5494, -158.61, 56.3954, -158.670000000, 56.2794);
  a.bezierCurveTo(-158.68, 56.2734, -158.690000000, 56.2834, -158.700000000, 56.2794);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffac00";
  a.beginPath();
  a.moveTo(-204.17, 6.3101);
  a.bezierCurveTo(-204.73, 7.518100000, -205.399999999, 8.6288, -206.26, 9.5601);
  a.bezierCurveTo(-207.609999999, 10.028, -211.75, 9.9612, -215.51, 10.998000000);
  a.bezierCurveTo(-215.72, 11.055000000, -215.929999999, 11.121, -216.14, 11.185);
  a.bezierCurveTo(-216.429999999, 11.282, -216.7, 11.379000000, -216.98, 11.498000000);
  a.bezierCurveTo(-218.28, 12.039000000, -220.359999999, 12.889000000, -221.209999999, 14.420000000);
  a.bezierCurveTo(-219.339999999, 15.073000000, -216.76, 14.570000000, -215.73, 14.716000000);
  a.bezierCurveTo(-215.45, 14.762, -215.209999999, 14.805000000, -215.17, 14.873000000);
  a.bezierCurveTo(-214.769999999, 15.477, -215.47, 15.936000000, -215.829999999, 16.404);
  a.bezierCurveTo(-218.499999999, 19.893, -222.64, 28.285, -222.799999999, 35.216);
  a.bezierCurveTo(-222.82, 36.207, -222.76, 37.179, -222.609999999, 38.091);
  a.bezierCurveTo(-222.109999999, 37.749, -219.529999999, 32.903, -218.98, 33.185);
  a.bezierCurveTo(-217.95, 39.260000000, -216.76, 46.214, -212.359999999, 51.185);
  a.bezierCurveTo(-212.26, 51.009, -210.649999999, 46.072, -210.51, 45.935);
  a.bezierCurveTo(-209.45, 49.346000000, -207.67, 54.012, -205.109999999, 56.998000000);
  a.bezierCurveTo(-204.959999999, 57.161, -204.82, 57.345000000, -204.67, 57.498000000);
  a.bezierCurveTo(-204.6, 57.571000000, -204.519999999, 57.645, -204.45, 57.716000000);
  a.bezierCurveTo(-203.78, 58.387000000, -203.06, 58.929000000, -202.299999999, 59.310000000);
  a.bezierCurveTo(-202.209999999, 57.259000000, -202.609999999, 54.951000000, -201.359999999, 55.310000000);
  a.bezierCurveTo(-201.32, 55.327000000, -201.269999999, 55.354000000, -201.23, 55.373000000);
  a.bezierCurveTo(-201.16, 55.392000000, -201.07, 55.412000000, -200.98, 55.466000000);
  a.bezierCurveTo(-200.97, 55.473000000, -200.959999999, 55.491000000, -200.95, 55.498000000);
  a.bezierCurveTo(-199.269999999, 56.350000000, -197.109999999, 58.260000000, -195.51, 58.841000000);
  a.bezierCurveTo(-195.39, 58.604000000, -195.76, 57.100000000, -195.609999999, 57.029000000);
  a.bezierCurveTo(-194.2, 56.656000000, -192.22, 58.641000000, -190.859999999, 58.998000000);
  a.bezierCurveTo(-190.97, 58.128000000, -191.19, 57.294000000, -190.2, 57.310000000);
  a.bezierCurveTo(-189.299999999, 57.308000000, -187.959999999, 59.910000000, -187.14, 60.060000000);
  a.bezierCurveTo(-187.279999999, 59.201000000, -187.07, 58.877000000, -186.079999999, 59.091000000);
  a.bezierCurveTo(-185.739999999, 59.135000000, -185.469999999, 59.719000000, -185.14, 59.748000000);
  a.bezierCurveTo(-184.19, 59.198000000, -182.45, 60.140000000, -181.67, 61.185);
  a.bezierCurveTo(-180.739999999, 60.406, -179.299999999, 60.666000000, -178.079999999, 60.935);
  a.bezierCurveTo(-177.779999999, 61.361000000, -177.39, 61.008, -176.92, 60.81);
  a.bezierCurveTo(-174.98, 60.026, -176.019999999, 60.414, -175.39, 60.873000000);
  a.bezierCurveTo(-174.709999999, 60.863000000, -173.76, 60.300000000, -172.98, 61.248000000);
  a.bezierCurveTo(-172.2, 60.203, -170.209999999, 60.042, -169.26, 60.591000000);
  a.bezierCurveTo(-168.929999999, 60.562000000, -168.76, 59.135000000, -168.42, 59.091000000);
  a.bezierCurveTo(-167.429999999, 58.877000000, -167.25, 59.201000000, -167.39, 60.060000000);
  a.bezierCurveTo(-166.57, 59.910000000, -165.29, 56.558000000, -164.39, 56.560000000);
  a.bezierCurveTo(-163.399999999, 56.544000000, -163.519999999, 58.128000000, -163.64, 58.998000000);
  a.bezierCurveTo(-162.269999999, 58.641000000, -159.92, 53.594000000, -158.51, 53.966000000);
  a.bezierCurveTo(-158.359999999, 54.038000000, -158.14, 55.854000000, -158.01, 56.091000000);
  a.bezierCurveTo(-156.29, 55.464000000, -154.59, 52.281000000, -152.859999999, 51.560000000);
  a.bezierCurveTo(-152.26, 51.390000000, -151.899999999, 52.043000000, -151.67, 52.998000000);
  a.bezierCurveTo(-151.589999999, 53.072000000, -151.549999999, 53.340000000, -151.549999999, 53.654000000);
  a.bezierCurveTo(-151.38, 54.606000000, -151.299999999, 55.687000000, -151.26, 56.560000000);
  a.bezierCurveTo(-150.67, 56.122000000, -150.079999999, 55.537000000, -149.48, 54.873000000);
  a.bezierCurveTo(-149.42, 54.803000000, -149.359999999, 54.725000000, -149.299999999, 54.654000000);
  a.bezierCurveTo(-149.29, 54.642000000, -149.269999999, 54.635000000, -149.26, 54.623000000);
  a.bezierCurveTo(-148.16, 53.251000000, -146.989999999, 51.561000000, -145.89, 50.216000000);
  a.bezierCurveTo(-145.82, 50.130000000, -145.739999999, 50.081000000, -145.67, 49.998000000);
  a.bezierCurveTo(-145.22, 49.395, -144.769999999, 48.784000000, -144.359999999, 48.279);
  a.bezierCurveTo(-143.91, 47.827000000, -143.179999999, 47.144000000, -142.579999999, 47.623000000);
  a.bezierCurveTo(-142.44, 47.760000000, -141.299999999, 50.884000000, -141.2, 51.06);
  a.bezierCurveTo(-140.04, 49.650000000, -139.109999999, 47.955000000, -138.39, 46.154);
  a.bezierCurveTo(-138.38, 46.132000000, -138.369999999, 46.113000000, -138.359999999, 46.091);
  a.bezierCurveTo(-138.22, 45.729, -138.109999999, 45.417, -137.98, 45.06);
  a.bezierCurveTo(-137.959999999, 45.007000000, -137.94, 44.957, -137.92, 44.904);
  a.bezierCurveTo(-136.67, 41.27, -136.17, 37.348000000, -135.98, 34.404);
  a.bezierCurveTo(-135.44, 34.122000000, -131.45, 37.624, -130.95, 37.966);
  a.bezierCurveTo(-130.16, 32.264, -134.329999999, 21.828, -138.079999999, 18.623);
  a.bezierCurveTo(-138.519999999, 18.239, -139.1, 17.696, -138.7, 17.091);
  a.bezierCurveTo(-138.649999999, 17.018, -138.39, 16.866, -138.049999999, 16.685000000);
  a.bezierCurveTo(-138.029999999, 16.674000000, -138.029999999, 16.665000000, -138.01, 16.654000000);
  a.bezierCurveTo(-137.37, 16.064000000, -136.06, 15.602000000, -134.829999999, 15.216000000);
  a.bezierCurveTo(-133.69, 14.740000000, -132.63, 14.334000000, -132.359999999, 14.279000000);
  a.bezierCurveTo(-135.79, 9.619600000, -147.41, 10.966000000, -149.579999999, 10.216000000);
  a.bezierCurveTo(-150.26, 9.398700000, -150.799999999, 8.408300000, -151.23, 7.341400000);
  a.bezierCurveTo(-151.92, 9.834700000, -146.67, 15.098000000, -144.14, 14.873000000);
  a.bezierCurveTo(-142.429999999, 16.472000000, -142.079999999, 20.792000000, -139.76, 22.904000000);
  a.bezierCurveTo(-138.25, 25.437000000, -134.34, 28.392000000, -138.51, 30.185000000);
  a.bezierCurveTo(-141.39, 33.891000000, -138.859999999, 39.799000000, -142.609999999, 42.966);
  a.bezierCurveTo(-146.249999999, 43.88, -148.76, 47.655, -152.67, 47.591);
  a.bezierCurveTo(-155.679999999, 47.357, -158.01, 49.968, -160.92, 50.404);
  a.bezierCurveTo(-166.39, 53.134, -171.829999999, 57.720000000, -178.329999999, 56.529);
  a.bezierCurveTo(-183.79, 56.246, -188.63, 52.229000000, -194.23, 53.154);
  a.bezierCurveTo(-197.54, 51.860000000, -201.75, 51.628, -204.26, 49.341);
  a.bezierCurveTo(-205.899999999, 46.272, -205.1, 41.449, -208.859999999, 39.873000000);
  a.bezierCurveTo(-212.94, 40.462, -213.82, 36.479000000, -213.95, 33.123000000);
  a.bezierCurveTo(-214.579999999, 30.503000000, -217.2, 28.437000000, -215.829999999, 25.466000000);
  a.bezierCurveTo(-214.579999999, 21.731000000, -211.369999999, 18.988000000, -210.48, 15.091000000);
  a.bezierCurveTo(-207.79, 12.978000000, -204.16, 12.498000000, -203.67, 8.247600000);
  a.bezierCurveTo(-203.7, 7.054800000, -203.89, 6.443400000, -204.17, 6.310100000);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-207.78, -17.104);
  a.bezierCurveTo(-208.26, -17.11, -208.77, -17.099, -209.34, -17.08);
  a.lineTo(-209.74, -16.942999999);
  a.bezierCurveTo(-209.850000000, -16.909999999, -209.96, -16.872999999, -210.070000000, -16.83);
  a.lineTo(-210.090000000, -16.820999999);
  a.bezierCurveTo(-211.060000000, -16.438999999, -211.920000000, -15.684999999, -212.420000000, -14.787999999);
  a.bezierCurveTo(-213.830000000, -12.277999999, -213.790000000, -10.110999999, -212.700000000, -5.150899999);
  a.bezierCurveTo(-211.280000000, -0.955899999, -210.360000000, 2.663300000, -208.200000000, 6.512100000);
  a.lineTo(-209.010000000, 6.715200000);
  a.bezierCurveTo(-211.680000000, 7.643500000, -217.830000000, 8.225600000, -221.410000000, 13.848000000);
  a.lineTo(-221.950000000, 14.688000000);
  a.lineTo(-221.000000000, 14.991000000);
  a.bezierCurveTo(-220.130000000, 15.267000000, -219.770000000, 15.579000000, -219.690000000, 15.700000000);
  a.bezierCurveTo(-219.610000000, 15.820000000, -219.610000000, 15.787000000, -219.720000000, 15.973000000);
  a.bezierCurveTo(-223.100000000, 21.69, -224.640000000, 32.079000000, -223.240000000, 38.199);
  a.lineTo(-222.900000000, 39.675);
  a.lineTo(-221.910000000, 38.525999999);
  a.bezierCurveTo(-221.530000000, 38.083999999, -221.240000000, 37.876, -221.110000000, 37.818);
  a.bezierCurveTo(-221.080000000, 37.806999999, -221.070000000, 37.799, -221.060000000, 37.793);
  a.lineTo(-221.070000000, 37.784);
  a.bezierCurveTo(-221.070000000, 37.783, -221.05, 37.778999999, -221.05, 37.778999999);
  a.bezierCurveTo(-221.05, 37.781, -221.05, 37.788, -221.06, 37.793);
  a.bezierCurveTo(-221.04, 37.822, -220.73, 38.281, -220.52, 38.859);
  a.lineTo(-220.5, 38.927);
  a.lineTo(-220.46, 38.986);
  a.bezierCurveTo(-217.66, 43.644999999, -216.010000000, 48.643, -212.9, 51.352);
  a.lineTo(-211.950000000, 52.181999999);
  a.lineTo(-211.65, 50.950999999);
  a.bezierCurveTo(-211.54, 50.472999999, -211.420000000, 50.240999999, -211.34, 50.110999999);
  a.bezierCurveTo(-211.28, 50.159999999, -211.24, 50.187999999, -211.140000000, 50.286999999);
  a.bezierCurveTo(-211.000000000, 50.443999999, -210.920000000, 50.594999999, -210.640000000, 50.808999999);
  a.bezierCurveTo(-210.03, 51.286999999, -207.950000000, 55.780999999, -206.12, 57.287999999);
  a.bezierCurveTo(-205.200000000, 58.040999999, -204.34, 58.711999999, -203.66, 59.129999999);
  a.bezierCurveTo(-203.32, 59.338999999, -202.38, 59.833999999, -201.95, 59.886999999);
  a.bezierCurveTo(-201.85, 58.845999999, -201.69, 58.165999999, -201.6, 57.399999999);
  a.bezierCurveTo(-200.07, 58.083999999, -198.45, 58.672999999, -196.88, 59.266999999);
  a.bezierCurveTo(-196.329999999, 59.438999999, -195.73, 59.673999999, -195.16, 59.715999999);
  a.bezierCurveTo(-194.99, 59.658999999, -195.01, 59.259999999, -194.89, 59.026999999);
  a.bezierCurveTo(-194.429999999, 58.704999999, -193.82, 58.882999999, -193.29, 58.982999999);
  a.bezierCurveTo(-192.97, 59.052999999, -192.269999999, 59.267999999, -191.67, 59.388999999);
  a.bezierCurveTo(-191.369999999, 59.448999999, -191.089999999, 59.589999999, -190.69, 59.715999999);
  a.bezierCurveTo(-190.56, 59.402999999, -190.32, 59.111999999, -190.04, 58.860999999);
  a.bezierCurveTo(-190.03, 58.853999999, -190.04, 58.841999999, -190.04, 58.831999999);
  a.bezierCurveTo(-189.69, 58.812999999, -189.2, 58.857999999, -189.06, 58.899999999);
  a.bezierCurveTo(-188.33, 58.991999999, -187.58, 60.416999999, -186.96, 60.722999999);
  a.bezierCurveTo(-186.85, 60.577999999, -186.66, 60.425999999, -186.53, 60.336999999);
  a.bezierCurveTo(-186.47, 60.297999999, -186.41, 60.233999999, -186.36, 60.165999999);
  a.bezierCurveTo(-186.36, 60.164999999, -186.350000000, 60.166999999, -186.350000000, 60.165999999);
  a.bezierCurveTo(-185.940000000, 60.206999999, -185.430000000, 60.376999999, -185.120000000, 60.507999999);
  a.bezierCurveTo(-184.950000000, 60.302999999, -184.440000000, 61.073999999, -184.160000000, 61.010999999);
  a.bezierCurveTo(-183.820000000, 60.937999999, -183.340000000, 60.855999999, -182.760000000, 60.829999999);
  a.bezierCurveTo(-182.730000000, 60.828999999, -181.470000000, 61.800999999, -181.390000000, 62.192999999);
  a.bezierCurveTo(-180.950000000, 61.710999999, -180.58, 61.893999999, -179.250000000, 61.401999999);
  a.bezierCurveTo(-177.940000000, 60.916999999, -178.090000000, 62.135999999, -177.330000000, 62.315999999);
  a.bezierCurveTo(-176.210000000, 61.266999999, -174.850000000, 60.691999999, -174.130000000, 61.230999999);
  a.bezierCurveTo(-173.400000000, 61.777999999, -173.690000000, 61.850999999, -173.510000000, 61.904999999);
  a.bezierCurveTo(-173.450000000, 62.519999999, -173.100000000, 60.845999999, -171.510000000, 60.829999999);
  a.bezierCurveTo(-170.930000000, 60.855999999, -170.450000000, 60.937999999, -170.100000000, 61.010999999);
  a.bezierCurveTo(-169.820000000, 61.073999999, -169.430000000, 61.157999999, -169.270000000, 61.362999999);
  a.bezierCurveTo(-168.960000000, 61.231999999, -168.580000000, 60.206999999, -168.160000000, 60.165999999);
  a.bezierCurveTo(-167.960000000, 60.362999999, -167.740000000, 60.519999999, -167.55, 60.722999999);
  a.bezierCurveTo(-166.93, 60.416999999, -166.18, 58.991999999, -165.450000000, 58.899999999);
  a.bezierCurveTo(-165.310000000, 58.857999999, -164.820000000, 58.812999999, -164.470000000, 58.831999999);
  a.bezierCurveTo(-164.220000000, 59.088999999, -163.990000000, 59.382999999, -163.820000000, 59.715999999);
  a.bezierCurveTo(-163.420000000, 59.589999999, -163.140000000, 59.448999999, -162.840000000, 59.388999999);
  a.bezierCurveTo(-162.240000000, 59.267999999, -161.540000000, 59.052999999, -161.220000000, 58.982999999);
  a.bezierCurveTo(-160.690000000, 58.882999999, -159.130000000, 55.959999999, -158.660000000, 56.281999999);
  a.bezierCurveTo(-158.55, 56.513999999, -158.570000000, 56.912999999, -158.400000000, 56.969999999);
  a.bezierCurveTo(-157.830000000, 56.927999999, -157.230000000, 56.693999999, -156.670000000, 56.520999999);
  a.bezierCurveTo(-155.100000000, 55.926999999, -153.480000000, 55.338999999, -151.950000000, 54.654999999);
  a.bezierCurveTo(-151.860000000, 55.419999999, -151.710000000, 56.099999999, -151.600000000, 57.140999999);
  a.bezierCurveTo(-151.170000000, 57.087999999, -150.230000000, 56.592999999, -149.890000000, 56.383999999);
  a.bezierCurveTo(-149.210000000, 55.965999999, -148.350000000, 55.295999999, -147.440000000, 54.541999999);
  a.bezierCurveTo(-145.600000000, 53.034999999, -143.530000000, 51.169999999, -142.910000000, 50.691999999);
  a.bezierCurveTo(-142.640000000, 50.477999999, -142.560000000, 50.326999999, -142.410000000, 50.168999999);
  a.bezierCurveTo(-142.320000000, 50.070999999, -142.270000000, 50.042999999, -142.210000000, 49.992999999);
  a.bezierCurveTo(-142.130000000, 50.123999999, -142.020000000, 50.354999999, -141.900000000, 50.833999999);
  a.lineTo(-141.610000000, 52.064999999);
  a.lineTo(-140.660000000, 51.233999999);
  a.bezierCurveTo(-137.550000000, 48.525999999, -135.890000000, 43.527999999, -133.090000000, 38.867999999);
  a.lineTo(-133.060000000, 38.809999999);
  a.lineTo(-133.030000000, 38.740999999);
  a.bezierCurveTo(-132.820000000, 38.163999999, -132.520000000, 37.704999999, -132.490000000, 37.675999999);
  a.bezierCurveTo(-132.500000000, 37.670999999, -132.500000000, 37.663999999, -132.500000000, 37.661999999);
  a.bezierCurveTo(-132.490000000, 37.661999999, -132.480000000, 37.664999999, -132.490000000, 37.665999999);
  a.lineTo(-132.490000000, 37.675999999);
  a.bezierCurveTo(-132.480000000, 37.681999999, -132.470000000, 37.688999999, -132.450000000, 37.700999999);
  a.bezierCurveTo(-132.320000000, 37.758999999, -132.020000000, 37.966999999, -131.640000000, 38.408999999);
  a.lineTo(-130.650000000, 39.556999999);
  a.lineTo(-130.320000000, 38.081999999);
  a.bezierCurveTo(-128.920000000, 31.961999999, -130.450000000, 21.572999999, -133.830000000, 15.855999999);
  a.bezierCurveTo(-133.940000000, 15.669999999, -133.940000000, 15.702999999, -133.860000000, 15.581999999);
  a.bezierCurveTo(-133.780000000, 15.461999999, -133.420000000, 15.149999999, -132.550000000, 14.873999999);
  a.lineTo(-131.610000000, 14.570999999);
  a.lineTo(-132.140000000, 13.730999999);
  a.bezierCurveTo(-135.720000000, 8.108299999, -143.050000000, 7.418399999, -145.730000000, 6.490099999);
  a.lineTo(-145.800000000, 5.785399999);
  a.bezierCurveTo(-144.100000000, 1.698199999, -143.680000000, 0.811899999, -142.200000000, -3.375400000);
  a.bezierCurveTo(-141.090000000, -6.381600000, -140.290000000, -11.515000000, -141.690000000, -14.026400000);
  a.bezierCurveTo(-142.200000000, -14.923400000, -143.450000000, -16.439400000, -144.420000000, -16.821400000);
  a.lineTo(-144.440000000, -16.830400000);
  a.bezierCurveTo(-144.550000000, -16.873400000, -144.660000000, -16.910400000, -144.770000000, -16.943400000);
  a.lineTo(-145.170000000, -17.080400000);
  a.bezierCurveTo(-145.740000000, -17.099400000, -146.250000000, -17.110400000, -146.730000000, -17.104400000);
  a.bezierCurveTo(-148.170000000, -17.088400000, -149.340000000, -16.929400000, -150.990000000, -16.454400000);
  a.bezierCurveTo(-153.900000000, -15.484400000, -156.430000000, -13.699400000, -159.090000000, -12.223400000);
  a.bezierCurveTo(-159.130000000, -12.189400000, -159.180000000, -12.160400000, -159.240000000, -12.130400000);
  a.lineTo(-159.240000000, -12.169400000);
  a.bezierCurveTo(-159.560000000, -11.903400000, -160.580000000, -11.901400000, -160.250000000, -13.787400000);
  a.bezierCurveTo(-160.180000000, -14.159400000, -161.800000000, -12.621400000, -162.140000000, -12.487400000);
  a.bezierCurveTo(-162.550000000, -12.323400000, -164.840000000, -14.011400000, -164.660000000, -13.005400000);
  a.bezierCurveTo(-164.540000000, -12.292400000, -169.230000000, -13.842400000, -170.200000000, -14.427400000);
  a.bezierCurveTo(-171.830000000, -15.411400000, -173.420000000, -13.178400000, -175.270000000, -14.109400000);
  a.bezierCurveTo(-176.510000000, -14.734400000, -175.360000000, -15.366400000, -175.820000000, -15.296400000);
  a.bezierCurveTo(-176.550000000, -15.416400000, -178.640000000, -14.492400000, -179.240000000, -14.109400000);
  a.bezierCurveTo(-180.910000000, -12.891400000, -185.100000000, -15.562400000, -184.310000000, -14.427400000);
  a.bezierCurveTo(-183.660000000, -13.499400000, -189.970000000, -12.292400000, -189.840000000, -13.005400000);
  a.bezierCurveTo(-189.660000000, -14.011400000, -191.960000000, -12.323400000, -192.370000000, -12.487400000);
  a.bezierCurveTo(-192.710000000, -12.621400000, -192.500000000, -13.318400000, -192.290000000, -13.669400000);
  a.bezierCurveTo(-191.290000000, -15.369400000, -195.140000000, -11.493400000, -195.270000000, -12.331400000);
  a.lineTo(-195.270000000, -12.130400000);
  a.bezierCurveTo(-195.330000000, -12.161400000, -195.380000000, -12.189400000, -195.420000000, -12.223400000);
  a.bezierCurveTo(-198.080000000, -13.699400000, -200.610000000, -15.484400000, -203.520000000, -16.454400000);
  a.bezierCurveTo(-205.170000000, -16.929400000, -206.340000000, -17.088400000, -207.780000000, -17.104400000);
  a.closePath();
  a.moveTo(-207.260000000, -16.723400000);
  a.bezierCurveTo(-206.86, -16.689400000, -206.450000000, -16.640400000, -206.02, -16.552400000);
  a.bezierCurveTo(-204.43, -16.257400000, -202.94, -15.590400000, -201.59, -14.710400000);
  a.bezierCurveTo(-199.58, -13.490400000, -197.79, -11.948400000, -195.8, -10.699400000);
  a.bezierCurveTo(-195.58, -10.432400000, -195.4, -10.432400000, -195.25, -10.547400000);
  a.bezierCurveTo(-195.15, -10.227400000, -193.46, -11.502400000, -193.06, -12.140400000);
  a.bezierCurveTo(-192.79, -12.567400000, -193.06, -9.781200000, -192.53, -10.101400000);
  a.bezierCurveTo(-191.27, -10.859400000, -190.15, -11.853400000, -189.21, -11.538400000);
  a.bezierCurveTo(-187.3, -10.902400000, -186.140000000, -12.193400000, -184.88, -13.225400000);
  a.bezierCurveTo(-183.799999999, -14.109400000, -181.46, -10.864400000, -180.47, -10.925400000);
  a.bezierCurveTo(-179.23, -11.003400000, -176.77, -13.450400000, -176.15, -13.704400000);
  a.bezierCurveTo(-175.53, -13.450400000, -175.03, -12.251400000, -173.79, -12.173400000);
  a.bezierCurveTo(-172.799999999, -12.112400000, -169.489999999, -13.987400000, -168.41, -13.103400000);
  a.bezierCurveTo(-167.15, -12.071400000, -167.62, -10.236400000, -165.71, -10.873400000);
  a.bezierCurveTo(-164.77, -11.187400000, -162.65, -11.691400000, -161.4, -10.933400000);
  a.bezierCurveTo(-160.86, -10.613400000, -161.510000000, -11.997400000, -161.140000000, -11.651400000);
  a.bezierCurveTo(-160.58, -11.119400000, -159.56, -8.928600000, -159.55, -9.104000000);
  a.bezierCurveTo(-157.420000000, -10.086400000, -154.980000000, -13.379400000, -152.920000000, -14.710400000);
  a.bezierCurveTo(-151.58, -15.590400000, -150.08, -16.257400000, -148.49, -16.552400000);
  a.bezierCurveTo(-148.06, -16.640400000, -147.65, -16.689400000, -147.25, -16.723400000);
  a.bezierCurveTo(-151.48, -14.369400000, -152.98, -8.061800000, -152.74, -4.713400000);
  a.bezierCurveTo(-152.87, 0.238999999, -152.55, 6.653599999, -149.58, 10.211599999);
  a.bezierCurveTo(-147.410000000, 10.960599999, -135.8, 9.608299999, -132.37, 14.267599999);
  a.bezierCurveTo(-133.07, 14.407599999, -138.450000000, 16.696599999, -138.71, 17.090599999);
  a.bezierCurveTo(-139.11, 17.694599999, -138.510000000, 18.245599999, -138.06, 18.629599999);
  a.bezierCurveTo(-134.32, 21.834599999, -130.16, 32.266599999, -130.95, 37.968599999);
  a.bezierCurveTo(-131.45, 37.626599999, -135.429999999, 34.122599999, -135.97, 34.404599999);
  a.bezierCurveTo(-136.27, 39.184599999, -137.48, 46.545599999, -141.2, 51.058599999);
  a.bezierCurveTo(-141.299999999, 50.882599999, -142.429999999, 47.773599999, -142.57, 47.636599999);
  a.bezierCurveTo(-143.17, 47.157599999, -143.91, 47.839599999, -144.359999999, 48.291599999);
  a.bezierCurveTo(-146.399999999, 50.767599999, -148.899999999, 54.816599999, -151.269999999, 56.569599999);
  a.bezierCurveTo(-151.359999999, 54.518599999, -151.6, 51.195599999, -152.859999999, 51.553599999);
  a.bezierCurveTo(-154.589999999, 52.274599999, -156.299999999, 55.452599999, -158.019999999, 56.080599999);
  a.bezierCurveTo(-158.149999999, 55.843599999, -158.369999999, 54.025599999, -158.519999999, 53.954599999);
  a.bezierCurveTo(-159.929999999, 53.581599999, -162.269999999, 58.651599999, -163.64, 59.007599999);
  a.bezierCurveTo(-163.519999999, 58.137599999, -163.39, 56.536599999, -164.38, 56.553599999);
  a.bezierCurveTo(-165.29, 56.551599999, -166.56, 59.907599999, -167.38, 60.057599999);
  a.bezierCurveTo(-167.24, 59.199599999, -167.43, 58.871599999, -168.43, 59.085599999);
  a.bezierCurveTo(-168.760000000, 59.129599999, -168.920000000, 60.566599999, -169.25, 60.595599999);
  a.bezierCurveTo(-170.2, 60.045599999, -172.19, 60.195599999, -172.97, 61.240599999);
  a.bezierCurveTo(-173.74, 60.292599999, -174.7, 60.873599999, -175.38, 60.883599999);
  a.bezierCurveTo(-176.01, 60.424599999, -174.97, 60.030599999, -176.91, 60.815599999);
  a.bezierCurveTo(-177.38, 61.013599999, -177.799999999, 61.362599999, -178.09, 60.937599999);
  a.bezierCurveTo(-179.31, 60.668599999, -180.75, 60.397599999, -181.68, 61.176599999);
  a.bezierCurveTo(-182.46, 60.131599999, -184.19, 59.190599999, -185.140000000, 59.740599999);
  a.bezierCurveTo(-185.470000000, 59.711599999, -185.750000000, 59.129599999, -186.08, 59.085599999);
  a.bezierCurveTo(-187.08, 58.871599999, -187.27, 59.199599999, -187.130000000, 60.057599999);
  a.bezierCurveTo(-187.950000000, 59.907599999, -189.310000000, 57.300599999, -190.210000000, 57.302599999);
  a.bezierCurveTo(-191.200000000, 57.285599999, -190.990000000, 58.137599999, -190.870000000, 59.007599999);
  a.bezierCurveTo(-192.240000000, 58.651599999, -194.210000000, 56.640599999, -195.610000000, 57.013599999);
  a.bezierCurveTo(-195.770000000, 57.084599999, -195.400000000, 58.589599999, -195.530000000, 58.826599999);
  a.bezierCurveTo(-197.250000000, 58.198599999, -199.630000000, 56.020599999, -201.360000000, 55.299599999);
  a.bezierCurveTo(-202.610000000, 54.940599999, -202.200000000, 57.263599999, -202.280000000, 59.315599999);
  a.bezierCurveTo(-206.380000000, 57.284599999, -209.090000000, 50.471599999, -210.510000000, 45.923599999);
  a.bezierCurveTo(-210.65, 46.061599999, -212.260000000, 50.999599999, -212.36, 51.175599999);
  a.bezierCurveTo(-216.760000000, 46.203599999, -217.96, 39.265599999, -218.99, 33.190599999);
  a.bezierCurveTo(-219.540000000, 32.908599999, -222.11, 37.743599999, -222.61, 38.086599999);
  a.bezierCurveTo(-223.850000000, 30.787599999, -218.880000000, 20.404599999, -215.83, 16.416599999);
  a.bezierCurveTo(-215.47, 15.948599999, -214.78, 15.482599999, -215.18, 14.877599999);
  a.bezierCurveTo(-215.44, 14.484599999, -220.49, 14.525599999, -221.18, 14.384599999);
  a.bezierCurveTo(-217.75, 9.725599999, -208.43, 10.295599999, -206.27, 9.546099999);
  a.bezierCurveTo(-203.02, 6.036899999, -202.15, 0.089299999, -201.77, -4.713900000);
  a.bezierCurveTo(-201.540000000, -8.061800000, -203.03, -14.369400000, -207.260000000, -16.723900000);
  a.closePath();
  a.moveTo(-209.070000000, -16.015900000);
  a.bezierCurveTo(-208.920000000, -16.015900000, -208.77, -16.002900000, -208.620000000, -15.975900000);
  a.bezierCurveTo(-210.050000000, -15.993900000, -211.280000000, -14.959900000, -211.800000000, -13.278900000);
  a.bezierCurveTo(-213.250000000, -8.390600000, -208.620000000, -1.614900000, -205.890000000, 3.723099999);
  a.bezierCurveTo(-206.210000000, 4.251299999, -206.550000000, 4.767499999, -206.920000000, 5.267399999);
  a.bezierCurveTo(-207.820000000, 3.997099999, -209.180000000, 0.412099999, -210.120000000, -1.753600000);
  a.bezierCurveTo(-211.480000000, -4.987500000, -212.760000000, -7.744200000, -212.440000000, -11.329900000);
  a.bezierCurveTo(-212.560000000, -13.713900000, -211.020000000, -16.012900000, -209.070000000, -16.015900000);
  a.closePath();
  a.moveTo(-145.440000000, -16.015900000);
  a.bezierCurveTo(-143.320000000, -15.237900000, -142.430000000, -13.511900000, -142.070000000, -10.958900000);
  a.bezierCurveTo(-141.760000000, -7.373500000, -143.030000000, -4.987500000, -144.390000000, -1.753600000);
  a.bezierCurveTo(-145.33, 0.412099999, -146.08, 2.355899999, -147.59, 5.267399999);
  a.bezierCurveTo(-147.99, 4.730799999, -148.35, 4.174799999, -148.69, 3.606199999);
  a.bezierCurveTo(-145.96, -1.730100000, -141.29, -7.845800000, -142.75, -12.751800000);
  a.bezierCurveTo(-143.29, -14.503800000, -144.61, -15.829800000, -146.11, -15.922800000);
  a.bezierCurveTo(-145.890000000, -15.982800000, -145.660000000, -16.015800000, -145.440000000, -16.015800000);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.translate(-291.1, -54.078);
  a.save();
  a.fillStyle = "#000000";
  a.transform(0.19271, 0, 0, 0.19271, 7.775, 8.907);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.transform(0.15635, 0, 0, 0.15635, 23.107, 21.475);
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(1.0812, 0, 0, 1.0812, -23.51, -32.725);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.transform(0.70901, 0, 0, 0.69463, 160.37, 90.977);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(0.82383, 0.57721, -0.47591, 0.65771, 231.9, -173.35);
  a.beginPath();
  a.moveTo(477.25, 282.83);
  a.translate(474.26, 282.83);
  a.rotate(0);
  a.scale(0.377354914, 1);
  a.arc(0, 0, 7.923575087, 0, 3.141592653, 0);
  a.scale(2.650025113, 1);
  a.rotate(0);
  a.translate(-474.26, -282.83);
  a.translate(474.26, 282.83);
  a.rotate(0);
  a.scale(0.377354914, 1);
  a.arc(0, 0, 7.923575087, 3.141592653, 6.283185307, 0);
  a.scale(2.650025113, 1);
  a.rotate(0);
  a.translate(-474.26, -282.83);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.restore();
  a.restore();
  a.save();
  a.transform(0.19769, 0, 0, 0.19769, -295.55, -42.22);
  a.save();
  a.fillStyle = "#000000";
  a.transform(-1.2326, 0, 0, 1.2326, 1218, -94.387);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(-1.0812, 0, 0, 1.0812, 1143.4, -46.725);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.transform(-0.70901, 0, 0, 0.69463, 959.52, 76.977);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715000000, -299.55);
  a.translate(473.715, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 3.141592653, 6.283185307, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(0.82383, 0.57721, -0.47591, 0.65771, 359.57, -189.05);
  a.beginPath();
  a.moveTo(477.25, 282.83);
  a.translate(474.26, 282.83);
  a.rotate(0);
  a.scale(0.377354914, 1);
  a.arc(0, 0, 7.923575087, 0, 3.141592653, 0);
  a.scale(2.650025113, 1);
  a.rotate(0);
  a.translate(-474.26, -282.83);
  a.translate(474.26, 282.83);
  a.rotate(0);
  a.scale(0.377354914, 1);
  a.arc(0, 0, 7.923575087, 3.141592653, 6.283185307, 0);
  a.scale(2.650025113, 1);
  a.rotate(0);
  a.translate(-474.26, -282.83);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-192.11, 29.293);
  a.bezierCurveTo(-191.71, 30.249, -192.040000000, 30.22, -192.660000000, 30.216);
  a.bezierCurveTo(-192.960000000, 30.214000000, -193.290000000, 29.94, -193.740000000, 29.720000000);
  a.bezierCurveTo(-204.280000000, 23.539, -222.920000000, 17.429000000, -240.980000000, 25.201);
  a.bezierCurveTo(-236.590000000, 22.284, -222.350000000, 19.969, -217.260000000, 20.444000000);
  a.bezierCurveTo(-208.620000000, 21.400000000, -200.250000000, 24.424000000, -192.800000000, 28.869000000);
  a.bezierCurveTo(-192.570000000, 29.01, -192.340000000, 29.152000000, -192.110000000, 29.293000000);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-193.26, 34.367);
  a.bezierCurveTo(-192.64, 35.198, -192.97, 35.25, -193.57, 35.394999999);
  a.bezierCurveTo(-193.859999999, 35.464999999, -194.25, 35.278999999, -194.739999999, 35.174);
  a.bezierCurveTo(-206.459999999, 31.713, -223.459999999, 29.875999999, -233.76, 38.022999999);
  a.bezierCurveTo(-230.2, 34.133999999, -224.859999999, 32.599999999, -219.799999999, 31.834999999);
  a.bezierCurveTo(-211.19, 30.682, -202.339999999, 31.601999999, -194.04, 34.123);
  a.bezierCurveTo(-193.78, 34.204, -193.519999999, 34.285, -193.26, 34.367);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-193.48, 37.672);
  a.bezierCurveTo(-192.7, 38.238, -192.92, 38.388999999, -193.299999999, 38.711999999);
  a.bezierCurveTo(-193.48, 38.868999999, -193.839999999, 38.821, -194.239999999, 38.879999999);
  a.bezierCurveTo(-204.14, 39.41, -217.219999999, 43.096, -221.459999999, 53.824999999);
  a.bezierCurveTo(-220.42, 49.132, -217.149999999, 46.036999999, -213.779999999, 43.738);
  a.bezierCurveTo(-207.979999999, 39.958, -201.179999999, 38.004, -194.14, 37.692);
  a.bezierCurveTo(-193.92, 37.686, -193.7, 37.679, -193.48, 37.672);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-171.05, 30.448);
  a.bezierCurveTo(-171.450000000, 31.404, -171.12, 31.375, -170.5, 31.371000000);
  a.bezierCurveTo(-170.2, 31.369000000, -169.87, 31.095000000, -169.42, 30.875000000);
  a.bezierCurveTo(-152.54, 20.940000000, -134.609999999, 20.695000000, -122.639999999, 26.121000000);
  a.bezierCurveTo(-127.039999999, 23.205000000, -140.799999999, 21.125, -145.899999999, 21.6);
  a.bezierCurveTo(-154.539999999, 22.555, -162.909999999, 25.579, -170.349999999, 30.024);
  a.bezierCurveTo(-170.589999999, 30.166, -170.819999999, 30.307000000, -171.049999999, 30.448);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-170.67, 34.367);
  a.bezierCurveTo(-171.29, 35.198, -170.959999999, 35.25, -170.359999999, 35.394999999);
  a.bezierCurveTo(-170.07, 35.464999999, -169.679999999, 35.278999999, -169.19, 35.174);
  a.bezierCurveTo(-157.47, 31.713, -140.47, 29.875999999, -130.16, 38.022999999);
  a.bezierCurveTo(-133.73, 34.133999999, -139.07, 32.599999999, -144.12, 31.834999999);
  a.bezierCurveTo(-152.74, 30.682, -161.59, 31.601999999, -169.890000000, 34.123);
  a.bezierCurveTo(-170.15, 34.204, -170.410000000, 34.285, -170.670000000, 34.367);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-169.67, 39.212);
  a.bezierCurveTo(-170.459999999, 39.778000000, -170.239999999, 39.930000000, -169.859999999, 40.252);
  a.bezierCurveTo(-169.679999999, 40.409, -169.32, 40.362, -168.92, 40.42);
  a.bezierCurveTo(-159.019999999, 40.95, -145.94, 44.637, -141.69, 55.365);
  a.bezierCurveTo(-142.73, 50.672000000, -146, 47.578, -149.37, 45.278000000);
  a.bezierCurveTo(-155.18, 41.499000000, -161.980000000, 39.544000000, -169.01, 39.233000000);
  a.lineTo(-169.67, 39.212);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.transform(0.15635, 0, 0, 0.10471, -268.44, -10.665);
  a.beginPath();
  a.moveTo(608.29, 437.49);
  a.translate(560.265, 437.49);
  a.rotate(0);
  a.scale(1, 0.846136226);
  a.arc(0, 0, 48.024999999, 0, 3.141592653, 0);
  a.scale(1, 1.181842791);
  a.rotate(0);
  a.translate(-560.265, -437.49);
  a.translate(560.265, 437.49);
  a.rotate(0);
  a.scale(1, 0.846136226);
  a.arc(0, 0, 48.024999999, 3.141592653, 6.283185307, 0);
  a.scale(1, 1.181842791);
  a.rotate(0);
  a.translate(-560.265, -437.49);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-171.88, 42.888);
  a.bezierCurveTo(-172.09, 42.900999999, -174.01, 42.704, -170.519999999, 43.62);
  a.bezierCurveTo(-169.92, 43.776999999, -169.399999999, 43.921, -168.909999999, 44.053999999);
  a.bezierCurveTo(-168.999999999, 44.630999999, -169.519999999, 45.373999999, -170.499999999, 46.102);
  a.bezierCurveTo(-176.699999999, 50.162, -186.769999999, 49.779999999, -192.939999999, 46.303);
  a.bezierCurveTo(-193.719999999, 46.181, -193.829999999, 46.096999999, -193.219999999, 46.4);
  a.bezierCurveTo(-186.499999999, 50.492, -177.619999999, 49.849, -174.739999999, 49.074999999);
  a.bezierCurveTo(-171.369999999, 48.224, -168.73, 47.166, -166.429999999, 44.55);
  a.bezierCurveTo(-165.95, 44.69, -164.29, 45.446999999, -163.869999999, 45.248999999);
  a.bezierCurveTo(-163.239999999, 44.950999999, -163.379999999, 45.147, -163.17, 44.885);
  a.bezierCurveTo(-166.519999999, 43.263999999, -167.549999999, 43.616, -171.88, 42.888);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-174.22, -7.5192);
  a.bezierCurveTo(-168.07, -10.263, -166.89, -6.9475, -167.44, -10.709);
  a.bezierCurveTo(-167.5, -11.17, -167.2, -11.488999999, -167.59, -11.337);
  a.bezierCurveTo(-166.66, -14.280999999, -179.29, -5.312799999, -176.76, -7.076099999);
  a.bezierCurveTo(-180.239999999, -4.192699999, -180.31, -4.800699999, -174.22, -7.5192);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#000000";
  a.beginPath();
  a.moveTo(-189.51, -0.32858);
  a.bezierCurveTo(-194.69, -0.71036, -195.14, 1.03052, -195.239999999, -0.82752);
  a.bezierCurveTo(-195.26, -1.0544, -195.529999999, -1.1606, -195.209999999, -1.1465);
  a.bezierCurveTo(-196.339999999, -2.3994, -185.239999999, -0.0403, -187.459999999, -0.496710000);
  a.bezierCurveTo(-184.339999999, 0.347099999, -184.369999999, 0.049729999, -189.51, -0.328580000);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(0.1791, -0.030636, 0.03191, 0.18655, -294.95, -32.312);
  a.beginPath();
  a.moveTo(553.29, 441.56);
  a.translate(541.319999999, 441.672367616);
  a.rotate(0);
  a.scale(1, 0.513506515);
  a.arc(0, 0, 11.972, -0.018279010, 3.159871664, 0);
  a.scale(1, 1.947394960);
  a.rotate(0);
  a.translate(-541.319999999, -441.672367616);
  a.translate(541.319999999, 441.447632383);
  a.rotate(0);
  a.scale(1, 0.513506515);
  a.arc(0, 0, 11.972, 3.123313642, 6.301464317, 0);
  a.scale(1, 1.947394960);
  a.rotate(0);
  a.translate(-541.319999999, -441.447632383);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffac00";
  a.beginPath();
  a.moveTo(-147.5, -16.726);
  a.bezierCurveTo(-147.5, -16.726, -150.63, -16.506, -153.34, -14.440999999);
  a.bezierCurveTo(-154.65, -13.443, -156.81, -11.055, -157.4, -10.546999999);
  a.bezierCurveTo(-157.99, -10.04, -159.09, -9.447299999, -159.52, -9.277999999);
  a.lineTo(-156.72, -2.507399999);
  a.bezierCurveTo(-156.72, -2.507399999, -156.98, -5.892699999, -156.22, -8.0931);
  a.bezierCurveTo(-154.95, -12.974, -150.92, -14.882, -147.5, -16.726);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffac00";
  a.beginPath();
  a.moveTo(-207.2, -16.69);
  a.bezierCurveTo(-206.63, -16.542, -204.56, -15.989, -200.56, -12.859000000);
  a.bezierCurveTo(-195.73, -9.069500000, -196.47, -4.901200000, -196.83, -3.596100000);
  a.bezierCurveTo(-196.55, -4.344800000, -194.8, -9.064900000, -193.86, -9.064900000);
  a.bezierCurveTo(-192.84, -9.064900000, -191.11, -8.994000000, -189.36, -10.065000000);
  a.bezierCurveTo(-187.61, -11.136000000, -186.8, -10.180000000, -184.08, -9.596100000);
  a.bezierCurveTo(-181.350000000, -9.012000000, -179.15, -9.581100000, -176.86, -10.409000000);
  a.bezierCurveTo(-174.570000000, -11.236000000, -171.99, -10.800000000, -169.61, -11.190000000);
  a.bezierCurveTo(-167.220000000, -11.579000000, -167.670000000, -10.127000000, -165.480000000, -10.127000000);
  a.bezierCurveTo(-163.290000000, -10.127000000, -162.730000000, -9.840000000, -158.890000000, -6.627400000);
  a.bezierCurveTo(-158.31, -6.143900000, -158.11, -5.962000000, -157.8, -5.689900000);
  a.lineTo(-159.33, -9.221100000);
  a.bezierCurveTo(-159.4, -9.183100000, -159.47, -9.129100000, -159.55, -9.096100000);
  a.bezierCurveTo(-159.55, -9.008400000, -159.81, -9.535000000, -160.140000000, -10.127000000);
  a.bezierCurveTo(-160.390000000, -10.589000000, -160.670000000, -11.046000000, -160.920000000, -11.377000000);
  a.bezierCurveTo(-161.000000000, -11.488000000, -161.070000000, -11.592000000, -161.140000000, -11.659000000);
  a.bezierCurveTo(-161.18, -11.702000000, -161.21, -11.725000000, -161.230000000, -11.721000000);
  a.bezierCurveTo(-161.250000000, -11.716000000, -161.27, -11.678000000, -161.260000000, -11.627000000);
  a.bezierCurveTo(-161.260000000, -11.437000000, -161.060000000, -10.910000000, -161.230000000, -10.877000000);
  a.bezierCurveTo(-161.27, -10.871000000, -161.320000000, -10.900000000, -161.390000000, -10.940000000);
  a.bezierCurveTo(-161.700000000, -11.125000000, -162.070000000, -11.228000000, -162.450000000, -11.284000000);
  a.bezierCurveTo(-162.46, -11.285000000, -162.470000000, -11.282000000, -162.480000000, -11.284000000);
  a.bezierCurveTo(-162.87, -11.338000000, -163.27, -11.350000000, -163.670000000, -11.315000000);
  a.bezierCurveTo(-164.470000000, -11.244000000, -165.230000000, -11.035000000, -165.700000000, -10.877000000);
  a.bezierCurveTo(-166.18, -10.718000000, -166.52, -10.716000000, -166.760000000, -10.815000000);
  a.bezierCurveTo(-167.02, -10.915000000, -167.15, -11.114000000, -167.3, -11.377000000);
  a.bezierCurveTo(-167.43, -11.631000000, -167.570000000, -11.914000000, -167.730000000, -12.221000000);
  a.bezierCurveTo(-167.820000000, -12.374000000, -167.9, -12.543000000, -168.010000000, -12.690000000);
  a.bezierCurveTo(-168.130000000, -12.838000000, -168.260000000, -12.967, -168.420000000, -13.096000000);
  a.bezierCurveTo(-168.55, -13.207000000, -168.720000000, -13.282000000, -168.920000000, -13.315000000);
  a.bezierCurveTo(-169.12, -13.348, -169.34, -13.340000000, -169.58, -13.315000000);
  a.bezierCurveTo(-170.05, -13.264000000, -170.600000000, -13.116000000, -171.140000000, -12.940000000);
  a.bezierCurveTo(-171.68, -12.764000000, -172.24, -12.563, -172.700000000, -12.409);
  a.bezierCurveTo(-173.15, -12.261000000, -173.55, -12.144, -173.8, -12.159);
  a.bezierCurveTo(-174.11, -12.178, -174.380000000, -12.281, -174.61, -12.409);
  a.bezierCurveTo(-174.84, -12.540000000, -175.02, -12.701, -175.200000000, -12.877);
  a.bezierCurveTo(-175.380000000, -13.043000000, -175.55, -13.200000000, -175.700000000, -13.346);
  a.bezierCurveTo(-175.71, -13.351, -175.700000000, -13.372, -175.700000000, -13.377);
  a.bezierCurveTo(-175.850000000, -13.527000000, -175.980000000, -13.626000000, -176.140000000, -13.690000000);
  a.bezierCurveTo(-176.52, -13.531, -177.65, -12.542000000, -178.730000000, -11.784);
  a.bezierCurveTo(-179.160000000, -11.48, -179.58, -11.214, -179.950000000, -11.065000000);
  a.bezierCurveTo(-180.140000000, -10.990000000, -180.33, -10.950000000, -180.480000000, -10.940000000);
  a.bezierCurveTo(-180.61, -10.932000000, -180.730000000, -10.952000000, -180.890000000, -11.034);
  a.bezierCurveTo(-180.9, -11.039000000, -180.910000000, -11.059000000, -180.920000000, -11.065000000);
  a.bezierCurveTo(-181.4, -11.317000000, -182.02, -11.869000000, -182.640000000, -12.377);
  a.bezierCurveTo(-182.86, -12.557, -183.08, -12.727, -183.3, -12.877);
  a.bezierCurveTo(-183.61, -13.095, -183.9, -13.272, -184.170000000, -13.346);
  a.bezierCurveTo(-184.440000000, -13.422, -184.690000000, -13.387, -184.890000000, -13.221);
  a.bezierCurveTo(-185.200000000, -12.963000000, -185.510000000, -12.696, -185.83, -12.44);
  a.bezierCurveTo(-186.140000000, -12.184, -186.450000000, -11.937999999, -186.8, -11.751999999);
  a.bezierCurveTo(-187.140000000, -11.565999999, -187.49, -11.424999999, -187.890000000, -11.376999999);
  a.bezierCurveTo(-188.290000000, -11.323999999, -188.71, -11.370999999, -189.200000000, -11.533999999);
  a.bezierCurveTo(-189.320000000, -11.572999999, -189.450000000, -11.594999999, -189.58, -11.595999999);
  a.bezierCurveTo(-189.820000000, -11.598999999, -190.06, -11.520999999, -190.33, -11.408999999);
  a.bezierCurveTo(-190.74, -11.241, -191.15, -10.988999999, -191.61, -10.69);
  a.bezierCurveTo(-191.9, -10.495, -192.200000000, -10.286, -192.510000000, -10.096);
  a.bezierCurveTo(-192.910000000, -9.8588, -192.86, -11.336, -192.920000000, -11.94);
  a.lineTo(-192.920000000, -11.971);
  a.lineTo(-192.920000000, -12.002);
  a.bezierCurveTo(-192.93, -12.079, -192.970000000, -12.129000000, -192.980000000, -12.159);
  a.bezierCurveTo(-192.99, -12.167, -193.010000000, -12.155000000, -193.010000000, -12.159);
  a.bezierCurveTo(-193.02, -12.151000000, -193.040000000, -12.143, -193.05, -12.127);
  a.bezierCurveTo(-193.350000000, -11.649000000, -194.390000000, -10.818000000, -194.920000000, -10.565000000);
  a.bezierCurveTo(-195.100000000, -10.48, -195.21, -10.454, -195.230000000, -10.534);
  a.bezierCurveTo(-195.390000000, -10.418000000, -195.58, -10.423, -195.8, -10.690000000);
  a.bezierCurveTo(-197.78, -11.939000000, -199.570000000, -13.501000000, -201.58, -14.721);
  a.bezierCurveTo(-202.93, -15.602, -204.420000000, -16.27, -206.010000000, -16.565);
  a.bezierCurveTo(-206.36, -16.635, -206.690000000, -16.657, -207.010000000, -16.69);
  a.lineTo(-207.200000000, -16.69);
  a.closePath();
  a.moveTo(-157.8, -5.690000000);
  a.lineTo(-157.670000000, -5.408700000);
  a.bezierCurveTo(-157.670000000, -5.408700000, -157.030000000, -4.912300000, -156.86, -4.815000000);
  a.bezierCurveTo(-156.93, -4.892800000, -157.34, -5.298100000, -157.8, -5.690000000);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.restore();
  a.restore();
  a.save();
  a.restore();
  a.restore();
};
Cvgr.Algos.Hamster.executeAlgorithm = function(a) {
  Cvgr.Algos.Hamster.draw(a.Context);
  a.Context.translate(111, 144);
  a.Context.scale(0.77, 0.77);
  if (a.CmdsHash.text) {
    var c = a.CmdsHash.text;
    c = Cvgr.Vars.iFrameNo - a.iFrameDelay + " " + c;
    a.Context.fillStyle = "Teal";
    a.Context.font = "1.9em Arial";
    a.Context.fillText(c, 0.4 * a.Height, -0.27 * a.Height);
  }
};
Cvgr.Algos.Hamster.defaultProperties = {DrawNumberLimit:5};

/* *** append _min.canvasgear.MyAlgo.js at pos 113713 *** */

/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script supplements a CanvasGear algorithm [file 20190329°1111]

 version : 0.2.3.d
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
*/
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.MyAlgo = {};
Cvgr.Algos.MyAlgo.executeAlgorithm = function(a) {
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = a.Width / 2, c = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  c = null !== a.ShiftY ? c + parseInt(a.ShiftY, 10) : c;
  var d = (a.Width + a.Height) / 4 * 0.44;
  a.Context.beginPath();
  a.Context.arc(b, c, d, 0.1 + a.Angle, 1.6 * Math.PI + a.Angle, !1);
  a.Context.strokeStyle = a.Color;
  a.Context.lineWidth = 6;
  a.Context.stroke();
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 2 * Math.PI && (a.Angle -= 2 * Math.PI);
};
Cvgr.Algos.MyAlgo.defaultProperties = {DrawNumberLimit:0};

/* *** append _min.canvasgear.Noisy1.js at pos 114935 *** */

/*
 ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 This section holds the Noisy1 figure

 id : file 20190401°0711 (after 20140901°0511)
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, c) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    c = b[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, b, c) {
    var d = this.length || 0;
    0 > b && (b = Math.max(0, d + b));
    if (null == c || c > d) {
      c = d;
    }
    c = Number(c);
    0 > c && (c = Math.max(0, d + c));
    for (b = Number(b || 0); b < c; b++) {
      this[b] = a;
    }
    return this;
  };
}, "es6", "es3");
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Noisy1 = {executeAlgorithm:function(a) {
  var d = (a.Width + a.Height) / 2;
  Cvgr.Algos.Noisy1.oIko = a;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = [], c = new Cvgr.Objs.Line(2, d / 2, d / 2, 2, a.Color), e = new Cvgr.Objs.Line(d / 2, 2, d / 2, d - 2, a.Color2);
  d = new Cvgr.Objs.Line(d / 2, d - 2, d - 2, d / 2, a.Color3);
  b.push(c);
  b.push(e);
  b.push(d);
  for (c = 0; c < b.length; c++) {
    a.Context.beginPath(), a.Context.moveTo(b[c].X1, b[c].Y1), a.Context.lineTo(b[c].X2, b[c].Y2), a.Context.lineWidth = 9, a.Context.strokeStyle = b[c].Colo, a.Context.stroke();
  }
  if (null !== Cvgr.Algos.Noisy1.iCursorPosX) {
    for (a.Context.beginPath(), a.Context.arc(Cvgr.Algos.Noisy1.iCursorPosX, Cvgr.Algos.Noisy1.iCursorPosY, 16, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.fillStyle = "DeepPink", a.Context.fill(), b = 0; b < Cvgr.Algos.Noisy1.aPoints.length; b++) {
      c = Cvgr.Algos.Noisy1.aPoints[b], a.Context.beginPath(), a.Context.arc(c.ptX, c.ptY, 9, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.fillStyle = "LightSlateGray", a.Context.fill();
    }
  }
  a.Context.fillStyle = "Teal";
  a.Context.font = "0.9em monospace";
  a.Context.fillText("scrollX   = " + (document.documentElement.scrollLeft || document.body.scrollLeft), 11, 28);
  a.Context.fillText("scrollY   = " + (document.documentElement.scrollTop || document.body.scrollTop), 11, 44);
  a.Context.fillText("curX      = " + Cvgr.Algos.Noisy1.iCursorPosX, 11, 60);
  a.Context.fillText("curY      = " + Cvgr.Algos.Noisy1.iCursorPosY, 11, 76);
  a.Context.fillText("ptsNdx    = " + Cvgr.Algos.Noisy1.iPtsNdx, 11, 92);
  a.Context.fillText("keyboard  = " + Cvgr.Algos.Noisy1.sKeyboard, 11, 108);
  a.Context.fillText("sm2loaded = " + Cvgr.Vars.bSoundLibraryLoaded, 11, 124);
  a.Context.fillText("sm2ready  = " + Cvgr.Vars.bSoundLibraryReady, 11, 140);
  a.Context.fillText("canvasX   = " + a.Canvas.offsetLeft, 11, 156);
  a.Context.fillText("canvasY   = " + a.Canvas.offsetTop, 11, 172);
}, getElementPositionOnPage:function(a) {
  a = a.getBoundingClientRect();
  return {top:a.top + (window.pageYOffset || document.documentElement.scrollTop), left:a.left + (window.pageXOffset || document.documentElement.scrollLeft)};
}, pickupOnKeyDown:function(a) {
  Cvgr.Algos.Noisy1.sKeyboard += " " + (a || window.event).key;
  17 < Cvgr.Algos.Noisy1.sKeyboard.length && (Cvgr.Algos.Noisy1.sKeyboard = Cvgr.Algos.Noisy1.sKeyboard.slice(Cvgr.Algos.Noisy1.sKeyboard.length - 17));
}, pickupOnMouseDown:function() {
}, pickupOnMouseMove:function(a) {
  Cvgr.Vars.bSoundLibraryReady && Cvgr.Vars.sound.play();
  Cvgr.Algos.Noisy1.settle_cursorPos(a.clientX, a.clientY);
  Cvgr.Algos.Noisy1.settle_ringbuffer();
}, pickupOnMouseUp:function() {
}, pickupOnTouchMove:function(a) {
  Cvgr.Algos.Noisy1.iCursorPosX = a.clientX;
  Cvgr.Algos.Noisy1.iCursorPosY = a.clientY;
}, pickupOnTouchStart:function() {
}, settle_ringbuffer:function() {
  null === Cvgr.Algos.Noisy1.iPtsNdx && (Cvgr.Algos.Noisy1.iPtsNdx = 0);
  Cvgr.Algos.Noisy1.iPtsNdx += 1;
  Cvgr.Algos.Noisy1.iPtsNdx > Cvgr.Algos.Noisy1.defaultProperties.TailLength - 1 && (Cvgr.Algos.Noisy1.iPtsNdx = 0);
  var a = new Cvgr.Objs.Pojnt(Cvgr.Algos.Noisy1.iCursorPosX, Cvgr.Algos.Noisy1.iCursorPosY);
  Cvgr.Algos.Noisy1.aPoints.length < Cvgr.Algos.Noisy1.iPtsNdx + 1 ? Cvgr.Algos.Noisy1.aPoints.push(a) : Cvgr.Algos.Noisy1.aPoints[Cvgr.Algos.Noisy1.iPtsNdx] = a;
}, settle_cursorPos:function(a, d) {
  var b = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, e = Cvgr.Algos.Noisy1.getElementPositionOnPage(Cvgr.Algos.Noisy1.oIko.Canvas);
  d = d - e.top + c;
  Cvgr.Algos.Noisy1.iCursorPosX = a - e.left + b;
  Cvgr.Algos.Noisy1.iCursorPosY = d;
}, aPoints:[], iCursorPosX:null, iCursorPosY:null, iPtsNdx:null, oIko:null, sKeyboard:"", defaultProperties:{BgColor:"AntiqueWhite", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:0, PlaySound:"yes", TailLength:32}};

/* *** append _min.canvasgear.Template.js at pos 120707 *** */

/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script serves as template to spawn CanvasGear algorithms

 id : file 20190329°0611
 version : 0.2.3.d
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
*/
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Template = {executeAlgorithm:function(a) {
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = a.Width / 2, c = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  c = null !== a.ShiftY ? c + parseInt(a.ShiftY, 10) : c;
  var d = (a.Width + a.Height) / 4 * 0.55;
  a.Context.beginPath();
  a.Context.arc(b, c, d, 0.1 + a.Angle, 1.9 * Math.PI + a.Angle, !1);
  a.Context.strokeStyle = a.Color;
  a.Context.lineWidth = 6;
  a.Context.stroke();
  b = "Template extern";
  a.CmdsHash.text && (b = a.CmdsHash.text);
  a.Context.fillStyle = "MediumVioletRed";
  a.Context.font = "0.9em Arial";
  a.Context.fillText(b, 3, 21);
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 2 * Math.PI && (a.Angle -= 2 * Math.PI);
}, defaultProperties:{DrawNumberLimit:0}};

/* *** append libs\howler\howler.min.js at pos 122088 *** */

/*! howler.js v2.1.2 | (c) 2013-2019, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),void 0!==e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&o.masterGain.gain.setValueAtTime(e,n.ctx.currentTime);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.volume=u._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&o.masterGain.gain.setValueAtTime(e?0:o._volume,n.ctx.currentTime);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.muted=!!e||u._muted)}return o},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"suspended":"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var o=new Audio;void 0===o.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var o=new Audio;o.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o=null;try{o="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||n;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var o=function(n){for(var t=0;t<e.html5PoolSize;t++)try{var r=new Audio;r._unlocked=!0,e._releaseHtml5Audio(r)}catch(n){e.noAudio=!0}for(var t=0;t<e._howls.length;t++)if(!e._howls[t]._webAudio)for(var a=e._howls[t]._getSoundIds(),u=0;u<a.length;u++){var i=e._howls[t]._soundById(a[u]);i&&i._node&&!i._node._unlocked&&(i._node._unlocked=!0,i._node.load())}e._autoResume();var d=e.ctx.createBufferSource();d.buffer=e._scratchBuffer,d.connect(e.ctx.destination),void 0===d.start?d.noteOn(0):d.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),d.onended=function(){d.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",o,!0),document.removeEventListener("touchend",o,!0),document.removeEventListener("click",o,!0);for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("unlock")}};return document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",o,!0),document.addEventListener("click",o,!0),e}},_obtainHtml5Audio:function(){var e=this||n;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var o=(new Audio).play();return o&&"undefined"!=typeof Promise&&(o instanceof Promise||"function"==typeof o.then)&&o.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var o=this||n;return e._unlocked&&o._html5AudioPool.push(e),o},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;if(!e.src||0===e.src.length)return void console.error("An array of source files must be passed with any new Howl.");n.init(e)};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._xhrWithCredentials=e.xhrWithCredentials||!1,o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._playLock=!1,o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._onunlock=e.onunlock?[{fn:e.onunlock}]:[],o._onresume=[],o._webAudio=n.usingWebAudio&&!o._html5,void 0!==n.ctx&&n.ctx&&n.autoUnlock&&n._unlockAudio(),n._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var u,i;if(e._format&&e._format[r])u=e._format[r];else{if("string"!=typeof(i=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(i),u||(u=/\.([^.]+)$/.exec(i.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&n.codecs(u)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e&&(e="__default",!t._playLock)){for(var a=0,u=0;u<t._sounds.length;u++)t._sounds[u]._paused&&!t._sounds[u]._ended&&(a++,r=t._sounds[u]._id);1===a?e=null:r=null}}var i=r?t._soundById(r):t._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),"loaded"!==t._state){i._sprite=e,i._ended=!1;var d=i._id;return t._queue.push({event:"play",action:function(){t.play(d)}}),d}if(r&&!i._paused)return o||t._loadQueue("play"),i._id;t._webAudio&&n._autoResume();var _=Math.max(0,i._seek>0?i._seek:t._sprite[e][0]/1e3),s=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-_),l=1e3*s/Math.abs(i._rate),c=t._sprite[e][0]/1e3,f=(t._sprite[e][0]+t._sprite[e][1])/1e3,p=!(!i._loop&&!t._sprite[e][2]);i._sprite=e,i._ended=!1;var m=function(){i._paused=!1,i._seek=_,i._start=c,i._stop=f,i._loop=p};if(_>=f)return void t._ended(i);var v=i._node;if(t._webAudio){var h=function(){t._playLock=!1,m(),t._refreshBuffer(i);var e=i._muted||t._muted?0:i._volume;v.gain.setValueAtTime(e,n.ctx.currentTime),i._playStart=n.ctx.currentTime,void 0===v.bufferSource.start?i._loop?v.bufferSource.noteGrainOn(0,_,86400):v.bufferSource.noteGrainOn(0,_,s):i._loop?v.bufferSource.start(0,_,86400):v.bufferSource.start(0,_,s),l!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l)),o||setTimeout(function(){t._emit("play",i._id),t._loadQueue()},0)};"running"===n.state?h():(t._playLock=!0,t.once("resume",h),t._clearTimer(i._id))}else{var y=function(){v.currentTime=_,v.muted=i._muted||t._muted||n._muted||v.muted,v.volume=i._volume*n.volume(),v.playbackRate=i._rate;try{var r=v.play();if(r&&"undefined"!=typeof Promise&&(r instanceof Promise||"function"==typeof r.then)?(t._playLock=!0,m(),r.then(function(){t._playLock=!1,v._unlocked=!0,o||(t._emit("play",i._id),t._loadQueue())}).catch(function(){t._playLock=!1,t._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),i._ended=!0,i._paused=!0})):o||(t._playLock=!1,m(),t._emit("play",i._id),t._loadQueue()),v.playbackRate=i._rate,v.paused)return void t._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||i._loop?t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l):(t._endTimers[i._id]=function(){t._ended(i),v.removeEventListener("ended",t._endTimers[i._id],!1)},v.addEventListener("ended",t._endTimers[i._id],!1))}catch(e){t._emit("playerror",i._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===v.src&&(v.src=t._src,v.load());var g=window&&window.ejecta||!v.readyState&&n._navigator.isCocoonJS;if(v.readyState>=3||g)y();else{t._playLock=!0;var A=function(){y(),v.removeEventListener(n._canPlayEvent,A,!1)};v.addEventListener(n._canPlayEvent,A,!1),t._clearTimer(i._id)}}return i._id},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused&&(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var o=this;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var a=o._soundById(t[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,o._stopFade(t[r]),a._node&&(o._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),o._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&o._clearSound(a._node))),n||o._emit("stop",a._id))}return o},mute:function(e,o){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if(void 0===o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),a=0;a<r.length;a++){var u=t._soundById(r[a]);u&&(u._muted=e,u._interval&&t._stopFade(u._id),t._webAudio&&u._node?u._node.gain.setValueAtTime(e?0:u._volume,n.ctx.currentTime):u._node&&(u._node.muted=!!n._muted||e),t._emit("mute",u._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]){t._getSoundIds().indexOf(r[0])>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var a;if(!(void 0!==e&&e>=0&&e<=1))return a=o?t._soundById(o):t._sounds[0],a?a._volume:0;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===o&&(t._volume=e),o=t._getSoundIds(o);for(var u=0;u<o.length;u++)(a=t._soundById(o[u]))&&(a._volume=e,r[2]||t._stopFade(o[u]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,n.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*n.volume()),t._emit("volume",a._id));return t},fade:function(e,o,t,r){var a=this;if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,o,t,r)}}),a;e=parseFloat(e),o=parseFloat(o),t=parseFloat(t),a.volume(e,r);for(var u=a._getSoundIds(r),i=0;i<u.length;i++){var d=a._soundById(u[i]);if(d){if(r||a._stopFade(u[i]),a._webAudio&&!d._muted){var _=n.ctx.currentTime,s=_+t/1e3;d._volume=e,d._node.gain.setValueAtTime(e,_),d._node.gain.linearRampToValueAtTime(o,s)}a._startFadeInterval(d,e,o,t,u[i],void 0===r)}}return a},_startFadeInterval:function(e,n,o,t,r,a){var u=this,i=n,d=o-n,_=Math.abs(d/.01),s=Math.max(4,_>0?t/_:t),l=Date.now();e._fadeTo=o,e._interval=setInterval(function(){var r=(Date.now()-l)/t;l=Date.now(),i+=d*r,i=Math.max(0,i),i=Math.min(1,i),i=Math.round(100*i)/100,u._webAudio?e._volume=i:u.volume(i,e._id,!0),a&&(u._volume=i),(o<n&&i<=o||o>n&&i>=o)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,u.volume(o,e._id),u._emit("fade",e._id))},s)},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o.volume(t._fadeTo,e),t._fadeTo=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(o=t._soundById(parseInt(r[0],10)))&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=t._getSoundIds(n),u=0;u<a.length;u++)(o=t._soundById(a[u]))&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e,e&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop)));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if("number"!=typeof e)return i=t._soundById(o),i?i._rate:t._rate;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===o&&(t._rate=e),o=t._getSoundIds(o);for(var d=0;d<o.length;d++)if(i=t._soundById(o[d])){t.playing(o[d])&&(i._rateSeek=t.seek(o[d]),i._playStart=t._webAudio?n.ctx.currentTime:i._playStart),i._rate=e,t._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.setValueAtTime(e,n.ctx.currentTime):i._node&&(i._node.playbackRate=e);var _=t.seek(o[d]),s=(t._sprite[i._sprite][0]+t._sprite[i._sprite][1])/1e3-_,l=1e3*s/Math.abs(i._rate);!t._endTimers[o[d]]&&i._paused||(t._clearTimer(o[d]),t._endTimers[o[d]]=setTimeout(t._ended.bind(t,i),l)),t._emit("rate",i._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):t._sounds.length&&(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if(void 0===o)return t;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var i=t._soundById(o);if(i){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var d=t.playing(o)?n.ctx.currentTime-i._playStart:0,_=i._rateSeek?i._rateSeek-i._seek:0;return i._seek+(_+d*Math.abs(i._rate))}return i._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),i._seek=e,i._ended=!1,t._clearTimer(o),t._webAudio||!i._node||isNaN(i._node.duration)||(i._node.currentTime=e);var l=function(){t._emit("seek",o),s&&t.play(o,!0)};if(s&&!t._webAudio){var c=function(){t._playLock?setTimeout(c,0):l()};setTimeout(c,0)}else l()}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++)o[t]._paused||e.stop(o[t]._id),e._webAudio||(e._clearSound(o[t]._node),o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1),n._releaseHtml5Audio(o[t]._node)),delete o[t]._node,e._clearTimer(o[t]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1);var u=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src||e._src.indexOf(n._howls[t]._src)>=0){u=!1;break}return r&&u&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],a=0;if("number"==typeof n&&(o=n,n=null),n||o)for(a=0;a<r.length;a++){var u=o===r[a].id;if(n===r[a].fn&&u||!n&&u){r.splice(a,1);break}}else if(e)t["_on"+e]=[];else{var i=Object.keys(t);for(a=0;a<i.length;a++)0===i[a].indexOf("_on")&&Array.isArray(t[i[a]])&&(t[i[a]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[a].fn),0),r[a].once&&t.off(e,r[a].fn,r[a].id));return t._loadQueue(e),t},_loadQueue:function(e){var n=this;if(n._queue.length>0){var o=n._queue[0];o.event===e&&(n._queue.shift(),n._loadQueue()),e||o.action()}return n},_ended:function(e){var o=this,t=e._sprite;if(!o._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(o._ended.bind(o,e),100),o;var r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),a)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id,!0),o},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var o=n._soundById(e);o&&o._node&&o._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if(void 0===e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,n.ctx.currentTime),o},_cleanBuffer:function(e){var o=this,t=n._navigator&&n._navigator.vendor.indexOf("Apple")>=0;if(n._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}return e.bufferSource=null,o},_clearSound:function(e){/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,o._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=n._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),a=0;a<o.length;++a)t[a]=o.charCodeAt(a);i(t.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.withCredentials=e._xhrWithCredentials,_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];if("0"!==n&&"2"!==n&&"3"!==n)return void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");i(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},u(_)}},u=function(e){try{e.send()}catch(n){e.onerror()}},i=function(e,o){var t=function(){o._emit("loaderror",null,"Decoding audio data failed.")},a=function(e){e&&o._sounds.length>0?(r[o._src]=e,d(o,e)):t()};"undefined"!=typeof Promise&&1===n.ctx.decodeAudioData.length?n.ctx.decodeAudioData(e).then(a).catch(t):n.ctx.decodeAudioData(e,a,t)},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){if(n.usingWebAudio){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}n.ctx||(n.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),o=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=o?parseInt(o[1],10):null;if(e&&t&&t<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!r||n._navigator&&!n._navigator.standalone&&!r)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.setValueAtTime(n._muted?0:1,n.ctx.currentTime),n.masterGain.connect(n.ctx.destination)),n._setup()}};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t)}();
/*! Spatial Plugin */
!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var r=this;return r.ctx&&r.ctx.listener?(n="number"!=typeof n?r._pos[1]:n,t="number"!=typeof t?r._pos[2]:t,"number"!=typeof e?r._pos:(r._pos=[e,n,t],void 0!==r.ctx.listener.positionX?(r.ctx.listener.positionX.setTargetAtTime(r._pos[0],Howler.ctx.currentTime,.1),r.ctx.listener.positionY.setTargetAtTime(r._pos[1],Howler.ctx.currentTime,.1),r.ctx.listener.positionZ.setTargetAtTime(r._pos[2],Howler.ctx.currentTime,.1)):r.ctx.listener.setPosition(r._pos[0],r._pos[1],r._pos[2]),r)):r},HowlerGlobal.prototype.orientation=function(e,n,t,r,o,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var s=a._orientation;return n="number"!=typeof n?s[1]:n,t="number"!=typeof t?s[2]:t,r="number"!=typeof r?s[3]:r,o="number"!=typeof o?s[4]:o,i="number"!=typeof i?s[5]:i,"number"!=typeof e?s:(a._orientation=[e,n,t,r,o,i],void 0!==a.ctx.listener.forwardX?(a.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),a.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),a.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),a.ctx.listener.upX.setTargetAtTime(e,Howler.ctx.currentTime,.1),a.ctx.listener.upY.setTargetAtTime(n,Howler.ctx.currentTime,.1),a.ctx.listener.upZ.setTargetAtTime(t,Howler.ctx.currentTime,.1)):a.ctx.listener.setOrientation(e,n,t,r,o,i),a)},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(n,t){var r=this;if(!r._webAudio)return r;if("loaded"!==r._state)return r._queue.push({event:"stereo",action:function(){r.stereo(n,t)}}),r;var o=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof n)return r._stereo;r._stereo=n,r._pos=[n,0,0]}for(var i=r._getSoundIds(t),a=0;a<i.length;a++){var s=r._soundById(i[a]);if(s){if("number"!=typeof n)return s._stereo;s._stereo=n,s._pos=[n,0,0],s._node&&(s._pannerAttr.panningModel="equalpower",s._panner&&s._panner.pan||e(s,o),"spatial"===o?void 0!==s._panner.positionX?(s._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),s._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),s._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):s._panner.setPosition(n,0,0):s._panner.pan.setValueAtTime(n,Howler.ctx.currentTime)),r._emit("stereo",s._id)}}return r},Howl.prototype.pos=function(n,t,r,o){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(n,t,r,o)}}),i;if(t="number"!=typeof t?0:t,r="number"!=typeof r?-.5:r,void 0===o){if("number"!=typeof n)return i._pos;i._pos=[n,t,r]}for(var a=i._getSoundIds(o),s=0;s<a.length;s++){var p=i._soundById(a[s]);if(p){if("number"!=typeof n)return p._pos;p._pos=[n,t,r],p._node&&(p._panner&&!p._panner.pan||e(p,"spatial"),void 0!==p._panner.positionX?(p._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),p._panner.positionZ.setValueAtTime(r,Howler.ctx.currentTime)):p._panner.setPosition(n,t,r)),i._emit("pos",p._id)}}return i},Howl.prototype.orientation=function(n,t,r,o){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(n,t,r,o)}}),i;if(t="number"!=typeof t?i._orientation[1]:t,r="number"!=typeof r?i._orientation[2]:r,void 0===o){if("number"!=typeof n)return i._orientation;i._orientation=[n,t,r]}for(var a=i._getSoundIds(o),s=0;s<a.length;s++){var p=i._soundById(a[s]);if(p){if("number"!=typeof n)return p._orientation;p._orientation=[n,t,r],p._node&&(p._panner||(p._pos||(p._pos=i._pos||[0,0,-.5]),e(p,"spatial")),void 0!==p._panner.orientationX?(p._panner.orientationX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),p._panner.orientationZ.setValueAtTime(r,Howler.ctx.currentTime)):p._panner.setOrientation(n,t,r)),i._emit("orientation",p._id)}}return i},Howl.prototype.pannerAttr=function(){var n,t,r,o=this,i=arguments;if(!o._webAudio)return o;if(0===i.length)return o._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return r=o._soundById(parseInt(i[0],10)),r?r._pannerAttr:o._pannerAttr;n=i[0],void 0===t&&(n.pannerAttr||(n.pannerAttr={coneInnerAngle:n.coneInnerAngle,coneOuterAngle:n.coneOuterAngle,coneOuterGain:n.coneOuterGain,distanceModel:n.distanceModel,maxDistance:n.maxDistance,refDistance:n.refDistance,rolloffFactor:n.rolloffFactor,panningModel:n.panningModel}),o._pannerAttr={coneInnerAngle:void 0!==n.pannerAttr.coneInnerAngle?n.pannerAttr.coneInnerAngle:o._coneInnerAngle,coneOuterAngle:void 0!==n.pannerAttr.coneOuterAngle?n.pannerAttr.coneOuterAngle:o._coneOuterAngle,coneOuterGain:void 0!==n.pannerAttr.coneOuterGain?n.pannerAttr.coneOuterGain:o._coneOuterGain,distanceModel:void 0!==n.pannerAttr.distanceModel?n.pannerAttr.distanceModel:o._distanceModel,maxDistance:void 0!==n.pannerAttr.maxDistance?n.pannerAttr.maxDistance:o._maxDistance,refDistance:void 0!==n.pannerAttr.refDistance?n.pannerAttr.refDistance:o._refDistance,rolloffFactor:void 0!==n.pannerAttr.rolloffFactor?n.pannerAttr.rolloffFactor:o._rolloffFactor,panningModel:void 0!==n.pannerAttr.panningModel?n.pannerAttr.panningModel:o._panningModel})}else 2===i.length&&(n=i[0],t=parseInt(i[1],10));for(var a=o._getSoundIds(t),s=0;s<a.length;s++)if(r=o._soundById(a[s])){var p=r._pannerAttr;p={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:p.coneInnerAngle,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:p.coneOuterAngle,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:p.coneOuterGain,distanceModel:void 0!==n.distanceModel?n.distanceModel:p.distanceModel,maxDistance:void 0!==n.maxDistance?n.maxDistance:p.maxDistance,refDistance:void 0!==n.refDistance?n.refDistance:p.refDistance,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:p.rolloffFactor,panningModel:void 0!==n.panningModel?n.panningModel:p.panningModel};var c=r._panner;c?(c.coneInnerAngle=p.coneInnerAngle,c.coneOuterAngle=p.coneOuterAngle,c.coneOuterGain=p.coneOuterGain,c.distanceModel=p.distanceModel,c.maxDistance=p.maxDistance,c.refDistance=p.refDistance,c.rolloffFactor=p.rolloffFactor,c.panningModel=p.panningModel):(r._pos||(r._pos=o._pos||[0,0,-.5]),e(r,"spatial"))}return o},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var e=function(e,n){n=n||"spatial","spatial"===n?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}();
/* eof */
