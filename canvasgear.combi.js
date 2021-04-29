/*
 This script paints animated icons on HTML5 canvases

 file : 20140815°1213 canvasgear/canvasgear.js
 version : 0.2.5 20210428°1041
 license : GNU LGPL v3 or later https://www.gnu.org/licenses/lgpl.html
 copyright : (c) 2014 - 2021 Norbert C. Maier https://github.com/normai/canvasgear/
 note : Minimized with Google Closure Compiler
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, g) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, g) : $jscomp.polyfillUnisolated(a, b, d, g));
};
$jscomp.polyfillUnisolated = function(a, b, d, g) {
  d = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in d)) {
      return;
    }
    d = d[h];
  }
  a = a[a.length - 1];
  g = d[a];
  b = b(g);
  b != g && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, g) {
  var h = a.split(".");
  a = 1 === h.length;
  g = h[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var q = h[m];
    if (!(q in g)) {
      return;
    }
    g = g[q];
  }
  h = h[h.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[h] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(b, d, g) {
    var h = this.length || 0;
    0 > d && (d = Math.max(0, h + d));
    if (null == g || g > h) {
      g = h;
    }
    g = Number(g);
    0 > g && (g = Math.max(0, h + g));
    for (d = Number(d || 0); d < g; d++) {
      this[d] = b;
    }
    return this;
  };
}, "es6", "es3");
$jscomp.typedArrayFill = function(a) {
  return a ? a : Array.prototype.fill;
};
$jscomp.polyfill("Int8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8ClampedArray.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float64Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Number.parseInt", function(a) {
  return a || parseInt;
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(h, m) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = 0, g = function(h) {
    if (this instanceof g) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (h || "") + "_" + d++, h);
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var g = $jscomp.global[b[d]];
    "function" === typeof g && "function" != typeof g.prototype[a] && $jscomp.defineProperty(g.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, b) {
  a instanceof String && (a += "");
  var d = 0, g = !1, h = {next:function() {
    if (!g && d < a.length) {
      var m = d++;
      return {value:b(m, a[m]), done:!1};
    }
    g = !0;
    return {done:!0, value:void 0};
  }};
  h[Symbol.iterator] = function() {
    return h;
  };
  return h;
};
$jscomp.polyfill("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(b) {
      return b;
    });
  };
}, "es6", "es3");
var Cvgr = {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Const = {versionnumber:"0.2.5", versiontimestamp:"20210428°1041", bShow_Debug_Dialogs:!1, sB64Dopiaza_Bonk_Mp3:"data:audio/mp3;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/44LE/wAAA0gAAAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", 
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
Cvgr.Objs.Line = function(a, b, d, g, h, m) {
  "undefined" === typeof m && (m = 2);
  this.X1 = a;
  this.Y1 = b;
  this.X2 = d;
  this.Y2 = g;
  this.Colo = Trekta.Util2.colorNameToHex(h);
  this.Width = m;
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
    var g = document.getElementById("i20140819o1821"), h = document.getElementById("i20140819o1822");
    g.onclick = Cvgr.Func.setRadiobutton;
    h.onclick = Cvgr.Func.setRadiobutton;
  };
  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(g) {
      window.setTimeout(g, 1000 / 60);
    };
  }();
  for (var a = document.getElementsByTagName("canvas"), b = 0; b < a.length; b++) {
    if (!(-1 < a[b].outerHTML.indexOf("skipthis"))) {
      var d = new Cvgr.Objs.Ikon;
      d.Canvas = a[b];
      d.Context = a[b].getContext("2d");
      d.Ide = a[b].id;
      d.Width = d.Canvas.width;
      d.Height = d.Canvas.height;
      d.Command = d.Canvas.attributes["data-cvgr"].value;
      d.CmdsHash = Trekta.Utils.CmdlinParser.parse(d.Command);
      d.AlgoName = "algo" in d.CmdsHash && "" !== d.CmdsHash.algo ? d.CmdsHash.algo : "pulse";
      Cvgr.Vars.icos.push(d);
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
  var d = b.AlgoName;
  if (b.AlgoName in Cvgr.Algos) {
    Cvgr.Vars.aPiggyFlags4Avail[a] = !0;
  } else {
    for (var g = Cvgr.Vars.aPiggyIconArrays[a], h = 0; h < g.length; h++) {
      Cvgr.Vars.aPiggyIconArrays[a][h].AlgoName = "pulse", Cvgr.Vars.aPiggyIconArrays[a][h].CmdsHash.text = "Rpx " + h, Cvgr.Vars.aPiggyIconArrays[a][h].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][h]);
    }
  }
  Cvgr.Vars.sDebugPageHelper += "<br /> — examineAlgo : piggy " + a + " &nbsp; onLoad = " + Cvgr.Vars.aPiggyFlags4OnLoad1[a] + " &nbsp; onError1 = " + Cvgr.Vars.aPiggyFlags4OnError1[a] + " &nbsp; onError2 = " + Cvgr.Vars.aPiggyFlags4OnError2[a] + " &nbsp; avail = " + Cvgr.Vars.aPiggyFlags4Avail[a] + " &nbsp; algo = " + d + " / " + b.AlgoName;
};
Cvgr.Func.executeFram_PrintInfoCanvas = function(a) {
  var b = document.getElementById(Cvgr.Vars.icos[a].Ide + ".info");
  if (null !== b) {
    var d = "<small>Canvas Debug Info :<br />iko.AlgoName = " + (Cvgr.Vars.icos[a].AlgoName + " <br />frame no = " + Cvgr.Vars.iFrameNo + " <br />iko.Angle = " + Cvgr.Vars.icos[a].Angle.toFixed(9) + " <br />iko.Color = " + Cvgr.Vars.icos[a].Color + "<br />iko.Height = " + Cvgr.Vars.icos[a].Height + "<br />iko.Mode = " + (Cvgr.Vars.bFlagTipTopTest ? "Top" : "Tip") + "<br />iko.Width = " + Cvgr.Vars.icos[a].Width);
    for (var g in Cvgr.Vars.icos[a].CmdsHash) {
      if (Cvgr.Vars.icos[a].CmdsHash.hasOwnProperty(g)) {
        var h = Trekta.Utils.htmlEscape(Cvgr.Vars.icos[a].CmdsHash[g]);
        d += "<br /> [cmd] " + g + " = " + h;
      }
    }
    b.innerHTML = d + "</small>";
  }
};
Cvgr.Func.executeFram_PrintInfoPage = function(a, b, d) {
  var g = document.getElementById("Cvgr_DebugPageOutputArea");
  if (null !== g) {
    var h = "<b>CanvasGear Page Debug Info</b> : AlgoMode = " + ((Cvgr.Vars.bFlagTipTopTest ? "Top" : "Tip") + "; ");
    h += " Frame number = " + Cvgr.Vars.iFrameNo + ";";
    h += "<br />Start time = " + Cvgr.Vars.iTimeStart + " = " + Cvgr.Vars.iTimeStart.valueOf() + ";";
    h = h + ("<br />Current time = " + a) + ("<br />Elapsed seconds (every two) = " + b + ";<br />Frames per seconds (total, average since start) = ") + d.toFixed(9);
    h += "<br />Frames per seconds (for the last two seconds) = " + Cvgr.Vars.iFramesPerTowSeconds.toFixed(9);
    h += "<br />True angle for 1 Hz (turns) = " + Cvgr.Vars.nTrueAngleTurns.toFixed(9) + ";";
    h += "<br />Increment per frame (turns) = " + Cvgr.Vars.nIncTurnsPerFrame.toFixed(9) + ";";
    h += "<br />" + Cvgr.Vars.sDebugPageHelper;
    g.innerHTML = h;
  }
};
Cvgr.Func.executeFrame = function() {
  Cvgr.Vars.iFrameNo++;
  var a = new Date;
  a.getTime();
  var b = a - Cvgr.Vars.iTimeStart, d = Cvgr.Vars.iFrameNo / b * 1000;
  b = 2 * Math.floor(b / 2000);
  Cvgr.Vars.iMarkLastTwoSecond < b && (Cvgr.Vars.iMarkLastTwoSecond = b, Cvgr.Vars.iFramesInLastTwoSeconds = Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame, Cvgr.Vars.iFramesPerTowSeconds = (Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame) / 2, Cvgr.Vars.iMarkLastTwoSecondFrame = Cvgr.Vars.iFrameNo);
  0.001 > Cvgr.Vars.iFramesPerTowSeconds && (Cvgr.Vars.iFramesPerTowSeconds = 2 * d);
  Cvgr.Vars.nTrueAngleTurns += 1 / Cvgr.Vars.iFramesPerTowSeconds;
  1 < Cvgr.Vars.nTrueAngleTurns && --Cvgr.Vars.nTrueAngleTurns;
  Cvgr.Vars.nIncTurnsPerFrame = 1 / Cvgr.Vars.iFramesPerTowSeconds;
  Cvgr.Func.executeFram_PrintInfoPage(a, b, d);
  for (a = 0; a < Cvgr.Vars.icos.length; a++) {
    if (d = Cvgr.Vars.icos[a], !(0 < d.DrawNumberLimit && Cvgr.Vars.iFrameNo - d.iFrameDelay > d.DrawNumberLimit)) {
      if (Cvgr.Func.executeFram_PrintInfoCanvas(a), b = d.AlgoName, b in Cvgr.Algos && ("Template" !== b || Cvgr.Vars.bTemplateSearchFinished) || d.bIsDefaultSettingDone) {
        d.bIsDefaultSettingDone || Cvgr.Func.initializeCanvas(d);
        try {
          Cvgr.Algos[b].executeAlgorithm(d);
        } catch (r) {
          Cvgr.Vars.sDebugPageHelper += "<br /> [Err 20190329°0412] ↯ executeAlgorithm failed :Ide = " + d.Ide + " algo = " + b + " (should never happen)";
        }
      } else {
        var g = Cvgr.Vars.aPiggyAlgoNames.indexOf(b);
        if (0 <= g) {
          2 > Cvgr.Vars.iFrameNo && Cvgr.Vars.aPiggyIconArrays[g].push(d);
        } else {
          if (Cvgr.Vars.aPiggyAlgoNames.length > Cvgr.Vars.aPiggyCallbacks.length - 1) {
            Cvgr.Vars.sDebugPageHelper += "<br />*** Prefabricated callbacks finished : " + Cvgr.Vars.aPiggyAlgoNames.length, d.AlgoName = "pulse", d.CmdsHash.text = "Substitute";
          } else {
            var h = Trekta.Utils.retrieveDafBaseFolderAbs("/canvasgear.combi.js");
            "" === h && (h = Trekta.Utils.retrieveDafBaseFolderAbs("/canvasgear.js"));
            g = h + "/riders/canvasgear." + b + ".js";
            h = h + "/canvasgear." + b + ".js";
            var m = Cvgr.Vars.aPiggyAlgoNames.length;
            Cvgr.Vars.aPiggyAlgoNames.push(b);
            var q = [];
            q.push(d);
            Cvgr.Vars.aPiggyIconArrays.push(q);
            Cvgr.Vars.aPiggyFlags4Avail.push(!1);
            Cvgr.Vars.aPiggyFlags4OnError2.push(!1);
            Cvgr.Vars.aPiggyFlags4OnLoad1.push(!1);
            Cvgr.Vars.aPiggyFlags4OnError1.push(!1);
            Cvgr.Vars.aPiggyTimers.push(setTimeout(Cvgr.Func.examineAlgo, 1444, Cvgr.Vars.aPiggyTimers.length, Cvgr.Vars.icos[a]));
            Cvgr.Vars.aPiggyModuleNamesTwo.push(h);
            Cvgr.Vars.sDebugPageHelper += "<br /> — pullScriptBehind " + m + " " + b;
            Trekta.Utils.pullScriptBehind(g, Cvgr.Vars.aPiggyCallbacks[m][0], Cvgr.Vars.aPiggyCallbacks[m][1], null);
          }
        }
      }
    }
  }
  window.requestAnimFrame(Cvgr.Func.executeFrame);
};
Cvgr.Func.initializeCanvas = function(a) {
  var b = {algo:"AlgoName", bgcolor:"BgColor", color:"Color", color2:"Color2", color3:"Color3", height:"Height", hertz:"Hertz", shiftx:"ShiftX", shifty:"ShiftY", width:"Width"}, d = Cvgr.Algos[a.AlgoName].defaultProperties, g;
  for (g in d) {
    d.hasOwnProperty(g) && (a[g] = d[g]);
  }
  for (var h in a.CmdsHash) {
    a.CmdsHash.hasOwnProperty(h) && "algo" !== h && (d = h, h in b && (d = b[h]), a[d] = a.CmdsHash[h]);
  }
  b = a.AlgoName;
  "pickupOnKeyDown" in Cvgr.Algos[b] && (document.onkeydown = Cvgr.Algos[b].pickupOnKeyDown);
  "pickupOnMouseMove" in Cvgr.Algos[b] && (a.Canvas.onmousemove = Cvgr.Algos[b].pickupOnMouseMove);
  "pickupOnMouseDown" in Cvgr.Algos[b] && (a.Canvas.onmousedown = Cvgr.Algos[b].pickupOnMouseDown);
  "pickupOnMouseUp" in Cvgr.Algos[b] && (a.Canvas.onmouseup = Cvgr.Algos[b].pickupOnMouseUp);
  "pickupOnTouchMove" in Cvgr.Algos[b] && (a.Canvas.ontouchmove = Cvgr.Algos[b].pickupOnTouchMove);
  "pickupOnTouchStart" in Cvgr.Algos[b] && (a.Canvas.ontouchstart = Cvgr.Algos[b].pickupOnTouchStart);
  "yes" === a.PlaySound && (Cvgr.Vars.bSoundLibraryLoading = !0, b = Trekta.Utils.retrieveDafBaseFolderAbs("/canvasgear.combi.js"), "" === b && (b = Trekta.Utils.retrieveDafBaseFolderAbs("/canvasgear.js")), Trekta.Utils.pullScriptBehind(b + "/howler/howler.min.js", Cvgr.Func.pullbehind_soundOnLoad("howler"), Cvgr.Func.pullbehind_soundOnError("howler"), null));
  a.bIsDefaultSettingDone = !0;
};
Cvgr.Func.pullbehind_onError = function(a) {
  if (!1 === Cvgr.Vars.aPiggyFlags4OnError1[a]) {
    Cvgr.Vars.aPiggyFlags4OnError1[a] = !0, Trekta.Utils.pullScriptBehind(Cvgr.Vars.aPiggyModuleNamesTwo[a], Cvgr.Vars.aPiggyCallbacks[a][0], Cvgr.Vars.aPiggyCallbacks[a][1], null), Cvgr.Vars.sDebugPageHelper += "<br /> — pullScript_Second : &nbsp; piggy " + a + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[a] + '" &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[a] + " &nbsp; onerror1 = " + Cvgr.Vars.aPiggyFlags4OnError1[a] + " &nbsp; onerror2 = " + Cvgr.Vars.aPiggyFlags4OnError2[a];
  } else {
    Cvgr.Vars.aPiggyFlags4OnError2[a] = !0;
    if (Cvgr.Vars.aPiggyAlgoNames[a] in Cvgr.Algos) {
      Cvgr.Vars.bTemplateSearchFinished = !0;
      Cvgr.Vars.aPiggyFlags4Avail[a] = !0;
      var b = Cvgr.Vars.aPiggyIconArrays[a];
      for (var d = 0; d < b.length; d++) {
        Cvgr.Vars.aPiggyIconArrays[a][d].CmdsHash.text = "Template intern " + d, Cvgr.Vars.aPiggyIconArrays[a][d].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][d]);
      }
    } else {
      for (b = Cvgr.Vars.aPiggyIconArrays[a], d = 0; d < b.length; d++) {
        Cvgr.Vars.aPiggyIconArrays[a][d].AlgoName = "pulse", Cvgr.Vars.aPiggyIconArrays[a][d].CmdsHash.text = "Rp " + d, Cvgr.Vars.aPiggyIconArrays[a][d].iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[a][d]);
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
  for (var d = 0; d < a.length; d++) {
    var g = a[d];
    Cvgr.Vars.sDebugPageHelper += "<br /> — &nbsp; &nbsp; &nbsp; &nbsp; iko.Ide = " + g.Ide;
    b in Cvgr.Algos && (g.bIsDefaultSettingDone || Cvgr.Func.initializeCanvas(g), g.iFrameDelay = Cvgr.Vars.iFrameNo - 1, Cvgr.Algos[g.AlgoName].executeAlgorithm(g));
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
  var d = b * Math.sin(a) * 0.20;
  this.X = b * Math.cos(a) * 0.20;
  this.Y = d;
}, Ring:function(a, b, d, g) {
  null === a && (a = "?");
  null === b && (b = 0.987);
  null === d && (d = "gray");
  null === g && (g = "white");
  this.ringname = a;
  this.radiusAbs = b;
  this.colorRing = d;
  this.colorSpace = g;
}, Target:function() {
  this.Diameter = 0.1;
  this.Shortnam = this.Naame = "<n/a>";
  this.rings = [];
}, executeAlgo_drawDiagonal:function(a) {
  var b = a.Height, d = b - 11, g = a.Width - 11;
  b -= 11;
  a.Context.beginPath();
  a.Context.moveTo(11, d);
  a.Context.lineTo(g, b);
  a.Context.moveTo(11, b + 5.5);
  a.Context.lineTo(11, b - 5.5);
  a.Context.moveTo(g, b + 5.5);
  a.Context.lineTo(g, b - 5.5);
  a.Context.strokeStyle = a.Color;
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.Context.closePath();
  a.Context.strokeStyle = "turquoise";
  a.Context.lineWidth = 3;
  a.Context.stroke();
  a.Context.font = "1.2em Arial";
  a.Context.fillStyle = "turquoise";
  a.Context.fillText("~0.11 m", 16.5, d - 5.5);
  a.CmdsHash.text && (a.Context.fillStyle = "#102030", a.Context.font = "1.2em Arial", a.Context.fillText(a.CmdsHash.text, 10, 20));
}, executeAlgo_getSeries:function(a) {
  var b = [];
  if ("undefined" === typeof a || 1 > a.length) {
    a = new Cvgr.Algos.Ballist.Hit(10.7, 55), b.push(a), a = new Cvgr.Algos.Ballist.Hit(9.3, 43), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.1, 0), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.2, 1), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.3, 3), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.4, 6), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.5, 10), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.6, 20), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.7, 30), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.8, 
    40), b.push(a), a = new Cvgr.Algos.Ballist.Hit(2.9, 50), b.push(a);
  } else {
    a = a.split(" ");
    for (var d = 0; d < a.length; d++) {
      var g = a[d].split("/");
      g = new Cvgr.Algos.Ballist.Hit(g[0], g[1]);
      b.push(g);
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
  var b = Cvgr.Algos.Ballist.executeAlgo_getTarget(), d = Cvgr.Algos.Ballist.executeAlgo_getSeries(a.CmdsHash.series);
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var g = (a.Width + a.Height) / 4, h = g, m = g;
  null !== a.ShiftX && (h = g + parseInt(a.ShiftX, 10));
  null !== a.ShiftY && (m = g + parseInt(a.ShiftY, 10));
  for (var q = 0; q < b.rings.length; q++) {
    var r = g * b.rings[q].radiusAbs * 12;
    a.Context.beginPath();
    a.Context.arc(h, m, r, 0, 2 * Math.PI, !1);
    a.Context.closePath();
    a.Context.strokeStyle = Trekta.Util2.colorNameToHex(b.rings[q].colorRing);
    a.Context.lineWidth = 1;
    a.Context.stroke();
  }
  for (b = 0; b < d.length; b++) {
    nRadius2 = 6, h = g + 50 * d[b].X + parseInt(a.ShiftX, 10), m = g + 50 * d[b].Y + parseInt(a.ShiftY, 10), a.Context.beginPath(), a.Context.arc(h, m, nRadius2, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.strokeStyle = "#4169e1", a.Context.lineWidth = 1, a.Context.stroke();
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
  var b = a.Width / 2, d = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  d = null !== a.ShiftY ? d + parseInt(a.ShiftY, 10) : d;
  var g = (a.Width + a.Height) / 4 * 0.66;
  a.Context.beginPath();
  a.Context.arc(b, d, g, 0.1 + a.Angle, 1.6 * Math.PI + a.Angle, !1);
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
  var d = [], g = new Cvgr.Objs.Line(3, 3, b - 3, 3, a.Color), h = new Cvgr.Objs.Line(4, b - 4, b - 4, b - 4, a.Color2);
  b = new Cvgr.Objs.Line(5, b - 7, b - 5, 7, a.Color3);
  d.push(g);
  d.push(h);
  d.push(b);
  for (g = 0; g < d.length; g++) {
    a.Context.beginPath(), a.Context.moveTo(d[g].X1, d[g].Y1), a.Context.lineTo(d[g].X2, d[g].Y2), a.Context.lineWidth = 3, a.Context.strokeStyle = d[g].Colo, a.Context.stroke();
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
  for (var d, g = 0, h = 0; 16 > h; h++) {
    d = 1.7 * Math.PI / 16, a.Context.rotate(d), g += d, a.Context.strokeRect(0.1 * b, 0.1 * b, 0.3 * b, 0.7 * b);
  }
  a.Context.rotate(-1 * g);
  a.Context.translate(-1 * b, -1 * b);
}, defaultProperties:{BgColor:"LightCyan", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:5}};
Cvgr.Algos.pulse = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  b = b / 2 * a.SizeFactor;
  var d = a.Width / 2 + parseInt(a.ShiftX, 9), g = a.Height / 2 + parseInt(a.ShiftY, 9);
  b *= Math.abs(Math.cos(a.Angle));
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = "#f0f0f0";
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.beginPath();
  a.Context.arc(d, g, b, 0, 2 * Math.PI, !1);
  a.Context.closePath();
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.CmdsHash.text && (d = a.CmdsHash.text, a.Context.fillStyle = "MediumVioletRed", a.Context.font = "0.9em Arial", a.Context.fillText(d, 3, 21));
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > Math.PI && (a.Angle -= Math.PI);
}, defaultProperties:{BgColor:"LightCyan", DrawNumberLimit:0}};
Cvgr.Algos.triangle = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2, d = 0.5 * b, g = 0.01 * b, h = 0.8 * b, m = 0.9 * b, q = 0.2 * b;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.translate(b / 2, b / 2);
  a.Context.rotate(4 * Cvgr.Vars.nIncTurnsPerFrame * a.Hertz);
  a.Context.translate(-b / 2, -b / 2);
  a.Context.fillStyle = a.BgColor;
  try {
    a.Context.fillRect(0, 0, a.Width, a.Height);
  } catch (r) {
    Cvgr.Const.bShow_Debug_Dialogs && alert('[debug 20140901°0913]\nException "' + r + '"');
  }
  a.Context.beginPath();
  try {
    a.Context.moveTo(d, g);
  } catch (r) {
    Cvgr.Const.bShow_Debug_Dialogs && alert('[debug 20140901°0932]\nException "' + r + '"');
  }
  a.Context.lineTo(h, m);
  a.Context.lineTo(q, m);
  a.Context.fillStyle = a.Color;
  a.Context.fill();
  a.Context.closePath();
}, defaultProperties:{BgColor:"LightCyan", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:0}};
Cvgr.Algos.triangulum = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  var d = Math.sin(a.Angle) * (b - 4) / 2 + b / 2;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.beginPath();
  a.Context.moveTo(3, 3);
  a.Context.lineTo(b - 3, 3);
  a.Context.lineTo(d, b - 5);
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
Trekta.Utils = Trekta.Utils || {getCookie:function(a) {
  var b, d = "";
  if (0 < document.cookie.length) {
    var g = document.cookie.split(";");
    for (b = 0; b < g.length; b++) {
      var h = g[b].substr(0, g[b].indexOf("="));
      var m = g[b].substr(g[b].indexOf("=") + 1);
      h = h.replace(/^\s+|\s+$/g, "");
      if (h === a) {
        d = decodeURI(m);
        break;
      }
    }
  } else {
    d = localStorage.getItem(a);
  }
  return d;
}, getCookieBool:function(a, b) {
  b = b || !1;
  a = Trekta.Utils.getCookie(a);
  return "true" === a ? !0 : "false" === a ? !1 : b;
}, getCookieInt:function(a, b) {
  b = b || 0;
  a = Trekta.Utils.getCookie(a);
  "" !== a && (b = parseInt(a, 10));
  return b;
}, getFileNameFull:function() {
  var a = document.location.href;
  a = a.substring(0, -1 === a.indexOf("?") ? a.length : a.indexOf("?"));
  a = a.substring(0, -1 === a.indexOf("#") ? a.length : a.indexOf("#"));
  -1 !== a.indexOf("/", a.length - 1) && (a += "index.html");
  return a;
}, getFilenamePlain:function() {
  var a = Trekta.Utils.getFileNameFull();
  a = a.split("/");
  return a = a[a.length - 1];
}, htmlEscape:function(a) {
  a = a.replace(/</g, "&lt;");
  return a = a.replace(/>/g, "&gt;");
}, isScriptAlreadyLoaded:function(a) {
  a = a.replace(/\./g, "\\.");
  a = new RegExp(a + "$", "");
  var b = document.getElementsByTagName("SCRIPT");
  if (b && 0 < b.length) {
    for (var d in b) {
      var g = Number.parseInt(d, 10);
      if (b[g] && b[g].src.match(a)) {
        return !0;
      }
    }
  }
  return !1;
}, outDbgMsg:function(a) {
  if (Trekta.Utils.getCookieBool("checkbox_yellowdebugpane", null)) {
    if ("complete" !== document.readyState) {
      Trekta.Utils.InitialMessageCache.push(a);
    } else {
      Trekta.Utils.outDbgMsg_GuaranteeParentElement();
      Date.now || (Date.now = function() {
        return (new Date).getTime();
      });
      var b = Math.floor(Date.now() / 1000);
      b = b.toString();
      if (0 < Trekta.Utils.InitialMessageCache.length) {
        for (var d = "", g = Trekta.Utils.InitialMessageCache.length - 1; 0 <= g; g--) {
          "" !== d && (d = "\n\n" + d), d = Trekta.Utils.InitialMessageCache[g] + d;
        }
        Trekta.Utils.InitialMessageCache.length = 0;
        a = '<div style="background-color:LightGreen; margin:1.1em; padding:0.7em;">' + d + "</div>\n\n" + a;
      }
      a = a.replace(/\n/g, "<br />");
      b = '<p><span style="font-size:72%;">' + (b + "</span> ") + a + "</p>";
      document.getElementById(Daf.Dspat.Config.sFurniture_OutputArea_Id).insertAdjacentHTML("beforeend", "\n" + b);
    }
  }
}, outDbgMsg_GuaranteeParentElement:function() {
  var a = Daf.Dspat.Config.sFurniture_OutputArea_Id, b = document.getElementById(a);
  if (!b) {
    b = '<div id="' + a + '" class="dafBoxDebugOutput"><p>[Msg 20150325°0211] Loading dafmenu.js (1/x).\n<br />&nbsp; Here comes the yellow Standard Output Box. Some page values are :' + Daf.Mnu.Jsi.getJsiIntroDebugMessage(!0) + "</p></div>";
    var d = document.getElementsByTagName("body")[0], g = document.createElement("div");
    g.innerHTML = b;
    d.appendChild(g);
    b = document.getElementById(a);
  }
  return b;
}, pullScriptBehind:function(a, b, d, g) {
  if (Trekta.Utils.bUseMinified) {
    var h = /.*\/fadeinfiles.combi.js$/.test(a), m = /.*\/highlight.pack.js$/.test(a), q = /.*\/showdown.min.js$/.test(a), r = /.*\/sitmapdaf.js$/.test(a), t = /.*\/sitmaplangs.js$/.test(a), y = /.*\/canvasgear.combi.js$/.test(a);
    h || m || q || r || t || y || (a = a.replace(/\.js$/, ".min.js"));
  }
  if (0 <= Trekta.Utils.aPulled.indexOf(a)) {
    b(a, g, !0);
  } else {
    h = document.getElementsByTagName("head")[0];
    m = document.createElement("script");
    m.type = "text/javascript";
    m.src = a;
    if ("undefined" !== typeof b) {
      var c = function() {
        b(a, g, !1);
      };
      m.onload = function() {
        Trekta.Utils.pullScript_onload(a, c);
      };
    }
    d = d || null;
    null !== d && (m.onerror = function() {
      d(a, g);
    });
    h.appendChild(m);
    return !0;
  }
}, pullScript_onload:function(a, b) {
  Trekta.Utils.aPulled.push(a);
  b();
}, readTextFile2:function(a, b, d) {
  Trekta.Utils.ajax3Send("GET", a, "", b, d);
}, ajax3Send:function(a, b, d, g, h) {
  g = "undefined" === typeof g ? null : g;
  h = "undefined" === typeof h ? null : h;
  var m = new XMLHttpRequest;
  m.open(a, b, !0);
  m.onreadystatechange = function() {
    if (0 !== m.readyState && 1 !== m.readyState && 2 !== m.readyState && 3 !== m.readyState && 4 === m.readyState) {
      var q = !1;
      switch(m.status) {
        case 0:
          q = !0;
          break;
        case 200:
          q = !0;
      }
      q ? g(m.responseText) : h(m.responseText);
    }
  };
  try {
    m.send(null);
  } catch (q) {
    a = "<b>Sorry, some feature on this page does not work.</b>\nFile <tt>" + b + "</tt> ~~could not be read.\nYour browser said: <tt>" + q.message + "</tt>.", a = Trekta.Utils.bIs_Browser_Chrome && "file:" === location.protocol ? a + "\nYour browser seems to be Chrome, and this does not ~~read files via file protocol.\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE\nor (2) view this page from <tt>localhost</tt> with a HTTP server." : Trekta.Utils.bIs_Browser_Firefox && 
    "file:" === location.protocol ? a + "\nYour browser seems to be <b>Firefox</b>, and this does not ~~read files\nwith a path going below the current directory via file protocol.\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE\nor (2)  view this page from <tt>localhost</tt> with a HTTP server." : a + ("\n [info 20160622°0131] Failed sending request " + b + "."), g(a);
  }
}, retrieveDafBaseFolderAbs:function(a) {
  if (Trekta.Utils.bUseMinified) {
    var b = /.*\/fadeinfiles.combi.js$/.test(a), d = /.*\/highlight.pack.js$/.test(a), g = /.*\/showdown.min.js$/.test(a), h = /.*\/sitmapdaf.js$/.test(a), m = /.*\/sitmaplangs.js$/.test(a), q = /.*\/canvasgear.combi.js$/.test(a);
    b || d || g || h || m || q || (a = a.replace(/\.js$/, ".min.js"));
  }
  b = a.replace(/\./g, "\\.") + "$";
  a = new RegExp(b, "");
  b = new RegExp("(.*)" + b, "");
  d = "";
  if ((g = document.getElementsByTagName("SCRIPT")) && 0 < g.length) {
    for (var r in g) {
      h = Number.parseInt(r, 10), g[h] && g[h].src.match(a) && (d = g[h].src.replace(b, "$1"));
    }
  }
  return d;
}, sConfine:function(a, b) {
  var d = "";
  a.length > b && (d = a.substring(0, b / 2) + " … " + a.substring(a.length - b / 2));
  d = d.split("\n").join("☼");
  d = d.split("<").join("&lt;");
  return d = d.split(">").join("&gt;");
}, setCookie:function(a, b, d) {
  var g = new Date;
  g.setDate(g.getDate() + d);
  d = encodeURI(b) + (null === d ? "" : "; Expires = " + g.toUTCString());
  document.cookie = a + "=" + d + "; path=/";
  1 > document.cookie.length && localStorage.setItem(a, b);
}, windowOnloadDaisychain:function(a) {
  if (window.onload) {
    var b = window.onload;
    window.onload = function() {
      b(null);
      a();
    };
  } else {
    window.onload = function() {
      a();
    };
  }
}, InitialMessageCache:[], aPulled:[], bIs_Browser_Chrome:navigator.userAgent.match(/Chrome/) ? !0 : !1, bIs_Browser_Edge:navigator.userAgent.match(/Edge/) ? !0 : !1, bIs_Browser_Explorer:navigator.appName.match(/Explorer/) || window.msCrypto ? !0 : !1, bIs_Browser_Firefox:navigator.userAgent.match(/Firefox/) ? !0 : !1, bIs_Browser_Opera:navigator.userAgent.match(/(Opera)|(OPR)/) ? !0 : !1, bShow_Debug_Dialogs:!1, bToggle_FALSE:!1, bToggle_TRUE:!0, bUseMinified:!1, sFurniture_OutputArea_Id:"i20150321o0231_StandardOutputDiv", 
s_DaftariBaseFolderAbs:"", s_DaftariBaseFolderRel:""};
Trekta.Utils.CmdlinParser = function() {
  Trekta.Utils.parse = function(a) {
    "undefined" === typeof a && (a = "");
    for (var b = [], d = "", g = "", h = 0; h < a.length; h++) {
      var m = a.charAt(h);
      " " === m && "" === d ? "" !== g && (b.push(g), g = "") : "=" === m && "" === d ? ("" !== g && (b.push(g), g = ""), b.push("=")) : "'" === m || '"' === m ? d = "" === d ? m : "" : g += m;
    }
    b.push(g);
    a = [];
    for (g = 0; g < b.length; g++) {
      "" !== b[g] && (d = b[g], a[d] = "<n/a>", "=" === b[g + 1] && (a[d] = b[g + 2], g++, g++));
    }
    return a;
  };
  return {parse:Trekta.Utils.parse};
}();
Trekta.Utils.windowOnloadDaisychain(Cvgr.startCanvasGear);
/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script provides a CanvasGear algorithm

 file : 20190401°0311
 version : 0.2.5
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2021 Norbert C. Maier https://github.com/normai/canvasgear/
*/
Cvgr = Cvgr || {};
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
  a.bezierCurveTo(-220.42, 14.513000000, -215.43, 14.479000000, -215.17, 14.873000000);
  a.bezierCurveTo(-214.77, 15.477, -215.47, 15.936000000, -215.83, 16.404);
  a.bezierCurveTo(-218.88, 20.392, -223.85, 30.793, -222.61, 38.091);
  a.bezierCurveTo(-222.11, 37.749, -219.53, 32.903, -218.98, 33.185);
  a.bezierCurveTo(-217.95, 39.260000000, -216.76, 46.214, -212.36, 51.185);
  a.bezierCurveTo(-212.26, 51.009, -210.65, 46.072, -210.51, 45.935);
  a.bezierCurveTo(-209.09, 50.483000000, -206.4, 57.279, -202.3, 59.31);
  a.bezierCurveTo(-202.21, 57.259, -202.61, 54.951, -201.36, 55.31);
  a.bezierCurveTo(-199.63, 56.031, -197.24, 58.214, -195.51, 58.841);
  a.bezierCurveTo(-195.39, 58.604, -195.76, 57.1, -195.61, 57.029);
  a.bezierCurveTo(-194.2, 56.656000000, -192.22, 58.641000000, -190.86, 58.998000000);
  a.bezierCurveTo(-190.97, 58.128000000, -191.19, 57.294000000, -190.2, 57.31);
  a.bezierCurveTo(-189.3, 57.308, -187.96, 59.910000000, -187.14, 60.06);
  a.bezierCurveTo(-187.28, 59.201, -187.07, 58.877, -186.08, 59.091);
  a.bezierCurveTo(-185.74, 59.135, -185.47, 59.719, -185.14, 59.748000000);
  a.bezierCurveTo(-184.19, 59.198000000, -182.45, 60.140000000, -181.67, 61.185);
  a.bezierCurveTo(-180.74, 60.406, -179.3, 60.666000000, -178.08, 60.935);
  a.bezierCurveTo(-177.78, 61.361000000, -177.39, 61.008, -176.92, 60.81);
  a.bezierCurveTo(-174.98, 60.026, -176.02, 60.414, -175.39, 60.873000000);
  a.bezierCurveTo(-175.34, 60.872000000, -175.28, 60.878000000, -175.23, 60.873000000);
  a.bezierCurveTo(-174.57, 60.800000000, -173.7, 60.360000000, -172.98, 61.216000000);
  a.bezierCurveTo(-172.92, 61.160000000, -172.87, 61.082000000, -172.8, 61.029000000);
  a.bezierCurveTo(-172.74, 60.976000000, -172.67, 60.951000000, -172.61, 60.904000000);
  a.bezierCurveTo(-171.69, 60.198000000, -170.09, 60.114000000, -169.26, 60.591000000);
  a.bezierCurveTo(-168.93, 60.562000000, -168.76, 59.135000000, -168.42, 59.091000000);
  a.bezierCurveTo(-167.43, 58.877000000, -167.25, 59.201000000, -167.39, 60.060000000);
  a.bezierCurveTo(-166.57, 59.910000000, -165.29, 56.558000000, -164.39, 56.560000000);
  a.bezierCurveTo(-163.4, 56.544000000, -163.52, 58.128000000, -163.64, 58.998000000);
  a.bezierCurveTo(-162.27, 58.641000000, -159.92, 53.594000000, -158.51, 53.966000000);
  a.bezierCurveTo(-158.36, 54.038000000, -158.14, 55.854000000, -158.01, 56.091000000);
  a.bezierCurveTo(-156.29, 55.464000000, -154.59, 52.281000000, -152.86, 51.560000000);
  a.bezierCurveTo(-151.6, 51.201000000, -151.35, 54.509000000, -151.26, 56.560000000);
  a.bezierCurveTo(-148.89, 54.807000000, -146.4, 50.755000000, -144.36, 48.279000000);
  a.bezierCurveTo(-143.91, 47.827000000, -143.18, 47.144000000, -142.58, 47.623000000);
  a.bezierCurveTo(-142.44, 47.760000000, -141.3, 50.884000000, -141.2, 51.060000000);
  a.bezierCurveTo(-137.49, 46.548000000, -136.28, 39.184000000, -135.98, 34.404000000);
  a.bezierCurveTo(-135.44, 34.122000000, -131.45, 37.624000000, -130.95, 37.966000000);
  a.bezierCurveTo(-130.16, 32.264000000, -134.33, 21.828000000, -138.08, 18.623000000);
  a.bezierCurveTo(-138.52, 18.239000000, -139.1, 17.696000000, -138.7, 17.091000000);
  a.bezierCurveTo(-138.44, 16.698000000, -133.06, 14.419000000, -132.36, 14.279000000);
  a.bezierCurveTo(-135.79, 9.619600000, -147.41, 10.966000000, -149.58, 10.216000000);
  a.bezierCurveTo(-152.55, 6.657900000, -152.86, 0.231900000, -152.73, -4.720999999);
  a.bezierCurveTo(-152.96, -8.068999999, -151.46, -14.366999999, -147.23, -16.720999999);
  a.bezierCurveTo(-147.64, -16.686999999, -148.05, -16.652999999, -148.48, -16.564999999);
  a.bezierCurveTo(-150.07, -16.269999999, -151.57, -15.601999999, -152.92, -14.720999999);
  a.bezierCurveTo(-154.98, -13.389999999, -157.42, -10.077999999, -159.55, -9.096099999);
  a.bezierCurveTo(-159.56, -8.920699999, -160.57, -11.125999999, -161.14, -11.658999999);
  a.bezierCurveTo(-161.51, -12.003999999, -160.86, -10.618999999, -161.39, -10.939999999);
  a.bezierCurveTo(-162.65, -11.697999999, -164.76, -11.191999999, -165.7, -10.876999999);
  a.bezierCurveTo(-167.61, -10.240999999, -167.16, -12.064999999, -168.42, -13.095999999);
  a.bezierCurveTo(-169.5, -13.980999999, -172.81, -12.096999999, -173.8, -12.158999999);
  a.bezierCurveTo(-175.04, -12.235999999, -175.52, -13.435999999, -176.14, -13.689999999);
  a.bezierCurveTo(-176.76, -13.435999999, -179.24, -11.016999999, -180.48, -10.939999999);
  a.bezierCurveTo(-181.47, -10.877999999, -183.81, -14.105999999, -184.89, -13.220999999);
  a.bezierCurveTo(-186.15, -12.189999999, -187.3, -10.896999999, -189.2, -11.533999999);
  a.bezierCurveTo(-190.14, -11.847999999, -191.26, -10.853999999, -192.51, -10.095999999);
  a.bezierCurveTo(-193.05, -9.775699999, -192.78, -12.554999999, -193.05, -12.126999999);
  a.bezierCurveTo(-193.45, -11.488999999, -195.14, -10.213999999, -195.23, -10.533999999);
  a.bezierCurveTo(-195.39, -10.417999999, -195.58, -10.422999999, -195.8, -10.689999999);
  a.bezierCurveTo(-197.78, -11.938999999, -199.57, -13.500999999, -201.58, -14.720999999);
  a.bezierCurveTo(-202.93, -15.601999999, -204.42, -16.269999999, -206.01, -16.564999999);
  a.bezierCurveTo(-206.44, -16.652999999, -206.86, -16.686999999, -207.26, -16.720999999);
  a.closePath();
  a.moveTo(-209.42, -16.001999999);
  a.bezierCurveTo(-211.2, -15.738999999, -212.56, -13.549999999, -212.45, -11.314999999);
  a.bezierCurveTo(-212.76, -7.729099999, -211.47, -4.986299999, -210.11, -1.752399999);
  a.bezierCurveTo(-209.17, 0.413300000, -207.81, 4.008600000, -206.92, 5.278900000);
  a.bezierCurveTo(-206.55, 4.779000000, -206.21, 4.244300000, -205.89, 3.716400000);
  a.bezierCurveTo(-208.62, -1.622199999, -213.25, -8.394599999, -211.8, -13.283599999);
  a.bezierCurveTo(-211.27, -14.963599999, -210.04, -15.988599999, -208.61, -15.970599999);
  a.bezierCurveTo(-208.76, -15.996599999, -208.93, -16.002599999, -209.08, -16.001599999);
  a.bezierCurveTo(-209.2, -16.001599999, -209.3, -16.019599999, -209.42, -16.001599999);
  a.closePath();
  a.moveTo(-145.45, -16.001599999);
  a.bezierCurveTo(-145.67, -16.002599999, -145.88, -15.968599999, -146.11, -15.908599999);
  a.bezierCurveTo(-144.6, -15.815599999, -143.28, -14.503599999, -142.73, -12.751599999);
  a.bezierCurveTo(-141.28, -7.845899999, -145.97, -1.713599999, -148.7, 3.623400000);
  a.bezierCurveTo(-148.37, 4.191600000, -147.98, 4.742700000, -147.58, 5.279300000);
  a.bezierCurveTo(-146.07, 2.367800000, -145.33, 0.413700000, -144.39, -1.751999999);
  a.bezierCurveTo(-143.03, -4.985899999, -141.76, -7.384999999, -142.08, -10.970599999);
  a.bezierCurveTo(-142.43, -13.523599999, -143.33, -15.224599999, -145.45, -16.001599999);
  a.closePath();
  a.moveTo(-184.39, -14.470599999);
  a.bezierCurveTo(-184.38, -14.446599999, -184.34, -14.382599999, -184.3, -14.314599999);
  a.bezierCurveTo(-184.28, -14.295599999, -184.27, -14.272599999, -184.26, -14.251599999);
  a.bezierCurveTo(-184.25, -14.311599999, -184.25, -14.381599999, -184.3, -14.439599999);
  a.bezierCurveTo(-184.3, -14.449599999, -184.29, -14.460599999, -184.3, -14.470599999);
  a.bezierCurveTo(-184.31, -14.472599999, -184.34, -14.470599999, -184.36, -14.470599999);
  a.bezierCurveTo(-184.4, -14.471599999, -184.39, -14.465599999, -184.39, -14.470599999);
  a.closePath();
  a.moveTo(-142.2, 49.998400000);
  a.bezierCurveTo(-142.24, 50.0264, -142.29, 50.059400000, -142.33, 50.091400000);
  a.bezierCurveTo(-142.31, 50.084400000, -142.28, 50.088400000, -142.26, 50.091400000);
  a.bezierCurveTo(-142.23, 50.097400000, -142.22, 50.096400000, -142.2, 50.123400000);
  a.bezierCurveTo(-142.17, 50.180400000, -142.12, 50.2314, -142.08, 50.2794);
  a.bezierCurveTo(-142.13, 50.1454, -142.16, 50.0634, -142.2, 49.998400000);
  a.closePath();
  a.moveTo(-158.7, 56.2794);
  a.bezierCurveTo(-158.67, 56.3814, -158.63, 56.467400000, -158.61, 56.5604);
  a.bezierCurveTo(-158.6, 56.6144, -158.56, 56.647400000, -158.55, 56.6854);
  a.bezierCurveTo(-158.58, 56.5494, -158.61, 56.3954, -158.67, 56.2794);
  a.bezierCurveTo(-158.68, 56.2734, -158.69, 56.2834, -158.7, 56.2794);
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
  a.bezierCurveTo(-209.85, -16.909999999, -209.96, -16.872999999, -210.07, -16.83);
  a.lineTo(-210.09, -16.820999999);
  a.bezierCurveTo(-211.06, -16.438999999, -211.92, -15.684999999, -212.42, -14.787999999);
  a.bezierCurveTo(-213.83, -12.277999999, -213.79, -10.110999999, -212.7, -5.150899999);
  a.bezierCurveTo(-211.28, -.955899999, -210.36, 2.663300000, -208.2, 6.512100000);
  a.lineTo(-209.01, 6.715200000);
  a.bezierCurveTo(-211.68, 7.643500000, -217.83, 8.225600000, -221.41, 13.848000000);
  a.lineTo(-221.95, 14.688000000);
  a.lineTo(-221, 14.991000000);
  a.bezierCurveTo(-220.13, 15.267000000, -219.77, 15.579000000, -219.69, 15.700000000);
  a.bezierCurveTo(-219.61, 15.820000000, -219.61, 15.787000000, -219.72, 15.973000000);
  a.bezierCurveTo(-223.1, 21.69, -224.64, 32.079000000, -223.24, 38.199);
  a.lineTo(-222.9, 39.675);
  a.lineTo(-221.91, 38.525999999);
  a.bezierCurveTo(-221.53, 38.083999999, -221.24, 37.876, -221.11, 37.818);
  a.bezierCurveTo(-221.08, 37.806999999, -221.07, 37.799, -221.06, 37.793);
  a.lineTo(-221.07, 37.784);
  a.bezierCurveTo(-221.07, 37.783, -221.05, 37.778999999, -221.05, 37.778999999);
  a.bezierCurveTo(-221.05, 37.781, -221.05, 37.788, -221.06, 37.793);
  a.bezierCurveTo(-221.04, 37.822, -220.73, 38.281, -220.52, 38.859);
  a.lineTo(-220.5, 38.927);
  a.lineTo(-220.46, 38.986);
  a.bezierCurveTo(-217.66, 43.644999999, -216.01, 48.643, -212.9, 51.352);
  a.lineTo(-211.95, 52.181999999);
  a.lineTo(-211.65, 50.950999999);
  a.bezierCurveTo(-211.54, 50.472999999, -211.42, 50.240999999, -211.34, 50.110999999);
  a.bezierCurveTo(-211.28, 50.159999999, -211.24, 50.187999999, -211.14, 50.286999999);
  a.bezierCurveTo(-211, 50.443999999, -210.92, 50.594999999, -210.64, 50.808999999);
  a.bezierCurveTo(-210.03, 51.286999999, -207.95, 55.780999999, -206.12, 57.287999999);
  a.bezierCurveTo(-205.2, 58.040999999, -204.34, 58.711999999, -203.66, 59.129999999);
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
  a.bezierCurveTo(-186.36, 60.164999999, -186.35, 60.166999999, -186.35, 60.165999999);
  a.bezierCurveTo(-185.94, 60.206999999, -185.43, 60.376999999, -185.12, 60.507999999);
  a.bezierCurveTo(-184.95, 60.302999999, -184.44, 61.073999999, -184.16, 61.010999999);
  a.bezierCurveTo(-183.82, 60.937999999, -183.34, 60.855999999, -182.76, 60.829999999);
  a.bezierCurveTo(-182.73, 60.828999999, -181.47, 61.800999999, -181.39, 62.192999999);
  a.bezierCurveTo(-180.95, 61.710999999, -180.58, 61.893999999, -179.25, 61.401999999);
  a.bezierCurveTo(-177.94, 60.916999999, -178.09, 62.135999999, -177.33, 62.315999999);
  a.bezierCurveTo(-176.21, 61.266999999, -174.85, 60.691999999, -174.13, 61.230999999);
  a.bezierCurveTo(-173.4, 61.777999999, -173.69, 61.850999999, -173.51, 61.904999999);
  a.bezierCurveTo(-173.45, 62.519999999, -173.1, 60.845999999, -171.51, 60.829999999);
  a.bezierCurveTo(-170.93, 60.855999999, -170.45, 60.937999999, -170.1, 61.010999999);
  a.bezierCurveTo(-169.82, 61.073999999, -169.43, 61.157999999, -169.27, 61.362999999);
  a.bezierCurveTo(-168.96, 61.231999999, -168.58, 60.206999999, -168.16, 60.165999999);
  a.bezierCurveTo(-167.96, 60.362999999, -167.74, 60.519999999, -167.55, 60.722999999);
  a.bezierCurveTo(-166.93, 60.416999999, -166.18, 58.991999999, -165.45, 58.899999999);
  a.bezierCurveTo(-165.31, 58.857999999, -164.82, 58.812999999, -164.47, 58.831999999);
  a.bezierCurveTo(-164.22, 59.088999999, -163.99, 59.382999999, -163.82, 59.715999999);
  a.bezierCurveTo(-163.42, 59.589999999, -163.14, 59.448999999, -162.84, 59.388999999);
  a.bezierCurveTo(-162.24, 59.267999999, -161.54, 59.052999999, -161.22, 58.982999999);
  a.bezierCurveTo(-160.69, 58.882999999, -159.13, 55.959999999, -158.66, 56.281999999);
  a.bezierCurveTo(-158.55, 56.513999999, -158.57, 56.912999999, -158.4, 56.969999999);
  a.bezierCurveTo(-157.83, 56.927999999, -157.23, 56.693999999, -156.67, 56.520999999);
  a.bezierCurveTo(-155.1, 55.926999999, -153.48, 55.338999999, -151.95, 54.654999999);
  a.bezierCurveTo(-151.86, 55.419999999, -151.71, 56.099999999, -151.6, 57.140999999);
  a.bezierCurveTo(-151.17, 57.087999999, -150.23, 56.592999999, -149.89, 56.383999999);
  a.bezierCurveTo(-149.21, 55.965999999, -148.35, 55.295999999, -147.44, 54.541999999);
  a.bezierCurveTo(-145.6, 53.034999999, -143.53, 51.169999999, -142.91, 50.691999999);
  a.bezierCurveTo(-142.64, 50.477999999, -142.56, 50.326999999, -142.41, 50.168999999);
  a.bezierCurveTo(-142.32, 50.070999999, -142.27, 50.042999999, -142.21, 49.992999999);
  a.bezierCurveTo(-142.13, 50.123999999, -142.02, 50.354999999, -141.9, 50.833999999);
  a.lineTo(-141.61, 52.064999999);
  a.lineTo(-140.66, 51.233999999);
  a.bezierCurveTo(-137.55, 48.525999999, -135.89, 43.527999999, -133.09, 38.867999999);
  a.lineTo(-133.06, 38.809999999);
  a.lineTo(-133.03, 38.740999999);
  a.bezierCurveTo(-132.82, 38.163999999, -132.52, 37.704999999, -132.49, 37.675999999);
  a.bezierCurveTo(-132.5, 37.670999999, -132.5, 37.663999999, -132.5, 37.661999999);
  a.bezierCurveTo(-132.49, 37.661999999, -132.48, 37.664999999, -132.49, 37.665999999);
  a.lineTo(-132.49, 37.675999999);
  a.bezierCurveTo(-132.48, 37.681999999, -132.47, 37.688999999, -132.45, 37.700999999);
  a.bezierCurveTo(-132.32, 37.758999999, -132.02, 37.966999999, -131.64, 38.408999999);
  a.lineTo(-130.65, 39.556999999);
  a.lineTo(-130.32, 38.081999999);
  a.bezierCurveTo(-128.92, 31.961999999, -130.45, 21.572999999, -133.83, 15.855999999);
  a.bezierCurveTo(-133.94, 15.669999999, -133.94, 15.702999999, -133.86, 15.581999999);
  a.bezierCurveTo(-133.78, 15.461999999, -133.42, 15.149999999, -132.55, 14.873999999);
  a.lineTo(-131.61, 14.570999999);
  a.lineTo(-132.14, 13.730999999);
  a.bezierCurveTo(-135.72, 8.108299999, -143.05, 7.418399999, -145.73, 6.490099999);
  a.lineTo(-145.8, 5.785399999);
  a.bezierCurveTo(-144.1, 1.698199999, -143.68, 0.811899999, -142.2, -3.3754);
  a.bezierCurveTo(-141.09, -6.3816, -140.29, -11.515, -141.69, -14.0264);
  a.bezierCurveTo(-142.2, -14.9234, -143.45, -16.4394, -144.42, -16.8214);
  a.lineTo(-144.44, -16.8304);
  a.bezierCurveTo(-144.55, -16.8734, -144.66, -16.9104, -144.77, -16.9434);
  a.lineTo(-145.17, -17.0804);
  a.bezierCurveTo(-145.74, -17.0994, -146.25, -17.1104, -146.73, -17.1044);
  a.bezierCurveTo(-148.17, -17.0884, -149.34, -16.9294, -150.99, -16.4544);
  a.bezierCurveTo(-153.9, -15.4844, -156.43, -13.6994, -159.09, -12.2234);
  a.bezierCurveTo(-159.13, -12.1894, -159.18, -12.1604, -159.24, -12.1304);
  a.lineTo(-159.24, -12.1694);
  a.bezierCurveTo(-159.56, -11.9034, -160.58, -11.9014, -160.25, -13.7874);
  a.bezierCurveTo(-160.18, -14.1594, -161.8, -12.6214, -162.14, -12.4874);
  a.bezierCurveTo(-162.55, -12.3234, -164.84, -14.0114, -164.66, -13.0054);
  a.bezierCurveTo(-164.54, -12.2924, -169.23, -13.8424, -170.2, -14.4274);
  a.bezierCurveTo(-171.83, -15.4114, -173.42, -13.1784, -175.27, -14.1094);
  a.bezierCurveTo(-176.51, -14.7344, -175.36, -15.3664, -175.82, -15.2964);
  a.bezierCurveTo(-176.55, -15.4164, -178.64, -14.4924, -179.24, -14.1094);
  a.bezierCurveTo(-180.91, -12.8914, -185.1, -15.5624, -184.31, -14.4274);
  a.bezierCurveTo(-183.66, -13.4994, -189.97, -12.2924, -189.84, -13.0054);
  a.bezierCurveTo(-189.66, -14.0114, -191.96, -12.3234, -192.37, -12.4874);
  a.bezierCurveTo(-192.71, -12.6214, -192.5, -13.3184, -192.29, -13.6694);
  a.bezierCurveTo(-191.29, -15.3694, -195.14, -11.4934, -195.27, -12.3314);
  a.lineTo(-195.27, -12.1304);
  a.bezierCurveTo(-195.33, -12.1614, -195.38, -12.1894, -195.42, -12.2234);
  a.bezierCurveTo(-198.08, -13.6994, -200.61, -15.4844, -203.52, -16.4544);
  a.bezierCurveTo(-205.17, -16.9294, -206.34, -17.0884, -207.78, -17.1044);
  a.closePath();
  a.moveTo(-207.26, -16.7234);
  a.bezierCurveTo(-206.86, -16.6894, -206.45, -16.6404, -206.02, -16.5524);
  a.bezierCurveTo(-204.43, -16.2574, -202.94, -15.5904, -201.59, -14.7104);
  a.bezierCurveTo(-199.58, -13.4904, -197.79, -11.9484, -195.8, -10.6994);
  a.bezierCurveTo(-195.58, -10.4324, -195.4, -10.4324, -195.25, -10.5474);
  a.bezierCurveTo(-195.15, -10.2274, -193.46, -11.5024, -193.06, -12.1404);
  a.bezierCurveTo(-192.79, -12.5674, -193.06, -9.7812, -192.53, -10.1014);
  a.bezierCurveTo(-191.27, -10.8594, -190.15, -11.8534, -189.21, -11.5384);
  a.bezierCurveTo(-187.3, -10.9024, -186.14, -12.1934, -184.88, -13.2254);
  a.bezierCurveTo(-183.799999999, -14.1094, -181.46, -10.8644, -180.47, -10.9254);
  a.bezierCurveTo(-179.23, -11.0034, -176.77, -13.4504, -176.15, -13.7044);
  a.bezierCurveTo(-175.53, -13.4504, -175.03, -12.2514, -173.79, -12.1734);
  a.bezierCurveTo(-172.799999999, -12.1124, -169.489999999, -13.9874, -168.41, -13.1034);
  a.bezierCurveTo(-167.15, -12.0714, -167.62, -10.2364, -165.71, -10.8734);
  a.bezierCurveTo(-164.77, -11.1874, -162.65, -11.6914, -161.4, -10.9334);
  a.bezierCurveTo(-160.86, -10.6134, -161.51, -11.9974, -161.14, -11.6514);
  a.bezierCurveTo(-160.58, -11.1194, -159.56, -8.9286, -159.55, -9.104);
  a.bezierCurveTo(-157.42, -10.0864, -154.98, -13.3794, -152.92, -14.7104);
  a.bezierCurveTo(-151.58, -15.5904, -150.08, -16.2574, -148.49, -16.5524);
  a.bezierCurveTo(-148.06, -16.6404, -147.65, -16.6894, -147.25, -16.7234);
  a.bezierCurveTo(-151.48, -14.3694, -152.98, -8.0618, -152.74, -4.7134);
  a.bezierCurveTo(-152.87, 0.238999999, -152.55, 6.653599999, -149.58, 10.211599999);
  a.bezierCurveTo(-147.41, 10.960599999, -135.8, 9.608299999, -132.37, 14.267599999);
  a.bezierCurveTo(-133.07, 14.407599999, -138.45, 16.696599999, -138.71, 17.090599999);
  a.bezierCurveTo(-139.11, 17.694599999, -138.51, 18.245599999, -138.06, 18.629599999);
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
  a.bezierCurveTo(-168.76, 59.129599999, -168.92, 60.566599999, -169.25, 60.595599999);
  a.bezierCurveTo(-170.2, 60.045599999, -172.19, 60.195599999, -172.97, 61.240599999);
  a.bezierCurveTo(-173.74, 60.292599999, -174.7, 60.873599999, -175.38, 60.883599999);
  a.bezierCurveTo(-176.01, 60.424599999, -174.97, 60.030599999, -176.91, 60.815599999);
  a.bezierCurveTo(-177.38, 61.013599999, -177.799999999, 61.362599999, -178.09, 60.937599999);
  a.bezierCurveTo(-179.31, 60.668599999, -180.75, 60.397599999, -181.68, 61.176599999);
  a.bezierCurveTo(-182.46, 60.131599999, -184.19, 59.190599999, -185.14, 59.740599999);
  a.bezierCurveTo(-185.47, 59.711599999, -185.75, 59.129599999, -186.08, 59.085599999);
  a.bezierCurveTo(-187.08, 58.871599999, -187.27, 59.199599999, -187.13, 60.057599999);
  a.bezierCurveTo(-187.95, 59.907599999, -189.31, 57.300599999, -190.21, 57.302599999);
  a.bezierCurveTo(-191.2, 57.285599999, -190.99, 58.137599999, -190.87, 59.007599999);
  a.bezierCurveTo(-192.24, 58.651599999, -194.21, 56.640599999, -195.61, 57.013599999);
  a.bezierCurveTo(-195.77, 57.084599999, -195.4, 58.589599999, -195.53, 58.826599999);
  a.bezierCurveTo(-197.25, 58.198599999, -199.63, 56.020599999, -201.36, 55.299599999);
  a.bezierCurveTo(-202.61, 54.940599999, -202.2, 57.263599999, -202.28, 59.315599999);
  a.bezierCurveTo(-206.38, 57.284599999, -209.09, 50.471599999, -210.51, 45.923599999);
  a.bezierCurveTo(-210.65, 46.061599999, -212.26, 50.999599999, -212.36, 51.175599999);
  a.bezierCurveTo(-216.76, 46.203599999, -217.96, 39.265599999, -218.99, 33.190599999);
  a.bezierCurveTo(-219.54, 32.908599999, -222.11, 37.743599999, -222.61, 38.086599999);
  a.bezierCurveTo(-223.85, 30.787599999, -218.88, 20.404599999, -215.83, 16.416599999);
  a.bezierCurveTo(-215.47, 15.948599999, -214.78, 15.482599999, -215.18, 14.877599999);
  a.bezierCurveTo(-215.44, 14.484599999, -220.49, 14.525599999, -221.18, 14.384599999);
  a.bezierCurveTo(-217.75, 9.725599999, -208.43, 10.295599999, -206.27, 9.546099999);
  a.bezierCurveTo(-203.02, 6.036899999, -202.15, 0.089299999, -201.77, -4.7139);
  a.bezierCurveTo(-201.54, -8.0618, -203.03, -14.3694, -207.26, -16.7239);
  a.closePath();
  a.moveTo(-209.07, -16.0159);
  a.bezierCurveTo(-208.92, -16.0159, -208.77, -16.0029, -208.62, -15.9759);
  a.bezierCurveTo(-210.05, -15.9939, -211.28, -14.9599, -211.8, -13.2789);
  a.bezierCurveTo(-213.25, -8.3906, -208.62, -1.6149, -205.89, 3.723099999);
  a.bezierCurveTo(-206.21, 4.251299999, -206.55, 4.767499999, -206.92, 5.267399999);
  a.bezierCurveTo(-207.82, 3.997099999, -209.18, 0.412099999, -210.12, -1.7536);
  a.bezierCurveTo(-211.48, -4.9875, -212.76, -7.7442, -212.44, -11.3299);
  a.bezierCurveTo(-212.56, -13.7139, -211.02, -16.0129, -209.07, -16.0159);
  a.closePath();
  a.moveTo(-145.44, -16.0159);
  a.bezierCurveTo(-143.32, -15.2379, -142.43, -13.5119, -142.07, -10.9589);
  a.bezierCurveTo(-141.76, -7.3735, -143.03, -4.9875, -144.39, -1.7536);
  a.bezierCurveTo(-145.33, 0.412099999, -146.08, 2.355899999, -147.59, 5.267399999);
  a.bezierCurveTo(-147.99, 4.730799999, -148.35, 4.174799999, -148.69, 3.606199999);
  a.bezierCurveTo(-145.96, -1.7301, -141.29, -7.8458, -142.75, -12.7518);
  a.bezierCurveTo(-143.29, -14.5038, -144.61, -15.8298, -146.11, -15.9228);
  a.bezierCurveTo(-145.89, -15.9828, -145.66, -16.0158, -145.44, -16.0158);
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
  a.translate(-473.715, -299.55);
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
  a.translate(-473.715, -299.55);
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
  a.translate(-473.715, -299.55);
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
  a.transform(0.82383, 0.57721, -.47591, 0.65771, 231.9, -173.35);
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
  a.translate(-473.715, -299.55);
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
  a.translate(-473.715, -299.55);
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
  a.transform(-.70901, 0, 0, 0.69463, 959.52, 76.977);
  a.beginPath();
  a.moveTo(505.67, 299.55);
  a.translate(473.715000000, 299.55);
  a.rotate(0);
  a.scale(0.884631357, 1);
  a.arc(0, 0, 36.122391243, 0, 3.141592653, 0);
  a.scale(1.130414371, 1);
  a.rotate(0);
  a.translate(-473.715, -299.55);
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
  a.transform(0.82383, 0.57721, -.47591, 0.65771, 359.57, -189.05);
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
  a.bezierCurveTo(-191.71, 30.249, -192.04, 30.22, -192.66, 30.216);
  a.bezierCurveTo(-192.96, 30.214000000, -193.29, 29.94, -193.74, 29.720000000);
  a.bezierCurveTo(-204.28, 23.539, -222.92, 17.429000000, -240.98, 25.201);
  a.bezierCurveTo(-236.59, 22.284, -222.35, 19.969, -217.26, 20.444000000);
  a.bezierCurveTo(-208.62, 21.400000000, -200.25, 24.424000000, -192.8, 28.869000000);
  a.bezierCurveTo(-192.57, 29.01, -192.34, 29.152000000, -192.11, 29.293000000);
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
  a.bezierCurveTo(-171.45, 31.404, -171.12, 31.375, -170.5, 31.371000000);
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
  a.bezierCurveTo(-152.74, 30.682, -161.59, 31.601999999, -169.89, 34.123);
  a.bezierCurveTo(-170.15, 34.204, -170.41, 34.285, -170.67, 34.367);
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
  a.bezierCurveTo(-155.18, 41.499000000, -161.98, 39.544000000, -169.01, 39.233000000);
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
  a.moveTo(-189.51, -.32858);
  a.bezierCurveTo(-194.69, -.71036, -195.14, 1.03052, -195.239999999, -.82752);
  a.bezierCurveTo(-195.26, -1.0544, -195.529999999, -1.1606, -195.209999999, -1.1465);
  a.bezierCurveTo(-196.339999999, -2.3994, -185.239999999, -.0403, -187.459999999, -.49671);
  a.bezierCurveTo(-184.339999999, 0.347099999, -184.369999999, 0.049729999, -189.51, -.32858);
  a.closePath();
  a.fill();
  a.stroke();
  a.restore();
  a.save();
  a.fillStyle = "#ffffff";
  a.transform(0.1791, -.030636, 0.03191, 0.18655, -294.95, -32.312);
  a.beginPath();
  a.moveTo(553.29, 441.56);
  a.translate(541.319999999, 441.672367616);
  a.rotate(0);
  a.scale(1, 0.513506515);
  a.arc(0, 0, 11.972, -.01827901, 3.159871664, 0);
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
  a.bezierCurveTo(-206.63, -16.542, -204.56, -15.989, -200.56, -12.859);
  a.bezierCurveTo(-195.73, -9.0695, -196.47, -4.9012, -196.83, -3.5961);
  a.bezierCurveTo(-196.55, -4.3448, -194.8, -9.0649, -193.86, -9.0649);
  a.bezierCurveTo(-192.84, -9.0649, -191.11, -8.994, -189.36, -10.065);
  a.bezierCurveTo(-187.61, -11.136, -186.8, -10.18, -184.08, -9.5961);
  a.bezierCurveTo(-181.35, -9.012, -179.15, -9.5811, -176.86, -10.409);
  a.bezierCurveTo(-174.57, -11.236, -171.99, -10.8, -169.61, -11.19);
  a.bezierCurveTo(-167.22, -11.579, -167.67, -10.127, -165.48, -10.127);
  a.bezierCurveTo(-163.29, -10.127, -162.73, -9.84, -158.89, -6.6274);
  a.bezierCurveTo(-158.31, -6.1439, -158.11, -5.962, -157.8, -5.6899);
  a.lineTo(-159.33, -9.2211);
  a.bezierCurveTo(-159.4, -9.1831, -159.47, -9.1291, -159.55, -9.0961);
  a.bezierCurveTo(-159.55, -9.0084, -159.81, -9.535, -160.14, -10.127);
  a.bezierCurveTo(-160.39, -10.589, -160.67, -11.046, -160.92, -11.377);
  a.bezierCurveTo(-161, -11.488, -161.07, -11.592, -161.14, -11.659);
  a.bezierCurveTo(-161.18, -11.702, -161.21, -11.725, -161.23, -11.721);
  a.bezierCurveTo(-161.25, -11.716, -161.27, -11.678, -161.26, -11.627);
  a.bezierCurveTo(-161.26, -11.437, -161.06, -10.91, -161.23, -10.877);
  a.bezierCurveTo(-161.27, -10.871, -161.32, -10.9, -161.39, -10.94);
  a.bezierCurveTo(-161.7, -11.125, -162.07, -11.228, -162.45, -11.284);
  a.bezierCurveTo(-162.46, -11.285, -162.47, -11.282, -162.48, -11.284);
  a.bezierCurveTo(-162.87, -11.338, -163.27, -11.35, -163.67, -11.315);
  a.bezierCurveTo(-164.47, -11.244, -165.23, -11.035, -165.7, -10.877);
  a.bezierCurveTo(-166.18, -10.718, -166.52, -10.716, -166.76, -10.815);
  a.bezierCurveTo(-167.02, -10.915, -167.15, -11.114, -167.3, -11.377);
  a.bezierCurveTo(-167.43, -11.631, -167.57, -11.914, -167.73, -12.221);
  a.bezierCurveTo(-167.82, -12.374, -167.9, -12.543, -168.01, -12.69);
  a.bezierCurveTo(-168.13, -12.838, -168.26, -12.967, -168.42, -13.096);
  a.bezierCurveTo(-168.55, -13.207, -168.72, -13.282, -168.92, -13.315);
  a.bezierCurveTo(-169.12, -13.348, -169.34, -13.34, -169.58, -13.315);
  a.bezierCurveTo(-170.05, -13.264, -170.6, -13.116, -171.14, -12.94);
  a.bezierCurveTo(-171.68, -12.764, -172.24, -12.563, -172.7, -12.409);
  a.bezierCurveTo(-173.15, -12.261, -173.55, -12.144, -173.8, -12.159);
  a.bezierCurveTo(-174.11, -12.178, -174.38, -12.281, -174.61, -12.409);
  a.bezierCurveTo(-174.84, -12.54, -175.02, -12.701, -175.2, -12.877);
  a.bezierCurveTo(-175.38, -13.043, -175.55, -13.2, -175.7, -13.346);
  a.bezierCurveTo(-175.71, -13.351, -175.7, -13.372, -175.7, -13.377);
  a.bezierCurveTo(-175.85, -13.527, -175.98, -13.626, -176.14, -13.69);
  a.bezierCurveTo(-176.52, -13.531, -177.65, -12.542, -178.73, -11.784);
  a.bezierCurveTo(-179.16, -11.48, -179.58, -11.214, -179.95, -11.065);
  a.bezierCurveTo(-180.14, -10.99, -180.33, -10.95, -180.48, -10.94);
  a.bezierCurveTo(-180.61, -10.932, -180.73, -10.952, -180.89, -11.034);
  a.bezierCurveTo(-180.9, -11.039, -180.91, -11.059, -180.92, -11.065);
  a.bezierCurveTo(-181.4, -11.317, -182.02, -11.869, -182.64, -12.377);
  a.bezierCurveTo(-182.86, -12.557, -183.08, -12.727, -183.3, -12.877);
  a.bezierCurveTo(-183.61, -13.095, -183.9, -13.272, -184.17, -13.346);
  a.bezierCurveTo(-184.44, -13.422, -184.69, -13.387, -184.89, -13.221);
  a.bezierCurveTo(-185.2, -12.963, -185.51, -12.696, -185.83, -12.44);
  a.bezierCurveTo(-186.14, -12.184, -186.45, -11.937999999, -186.8, -11.751999999);
  a.bezierCurveTo(-187.14, -11.565999999, -187.49, -11.424999999, -187.89, -11.376999999);
  a.bezierCurveTo(-188.29, -11.323999999, -188.71, -11.370999999, -189.2, -11.533999999);
  a.bezierCurveTo(-189.32, -11.572999999, -189.45, -11.594999999, -189.58, -11.595999999);
  a.bezierCurveTo(-189.82, -11.598999999, -190.06, -11.520999999, -190.33, -11.408999999);
  a.bezierCurveTo(-190.74, -11.241, -191.15, -10.988999999, -191.61, -10.69);
  a.bezierCurveTo(-191.9, -10.495, -192.2, -10.286, -192.51, -10.096);
  a.bezierCurveTo(-192.91, -9.8588, -192.86, -11.336, -192.92, -11.94);
  a.lineTo(-192.92, -11.971);
  a.lineTo(-192.92, -12.002);
  a.bezierCurveTo(-192.93, -12.079, -192.97, -12.129, -192.98, -12.159);
  a.bezierCurveTo(-192.99, -12.167, -193.01, -12.155, -193.01, -12.159);
  a.bezierCurveTo(-193.02, -12.151, -193.04, -12.143, -193.05, -12.127);
  a.bezierCurveTo(-193.35, -11.649, -194.39, -10.818, -194.92, -10.565);
  a.bezierCurveTo(-195.1, -10.48, -195.21, -10.454, -195.23, -10.534);
  a.bezierCurveTo(-195.39, -10.418, -195.58, -10.423, -195.8, -10.69);
  a.bezierCurveTo(-197.78, -11.939, -199.57, -13.501, -201.58, -14.721);
  a.bezierCurveTo(-202.93, -15.602, -204.42, -16.27, -206.01, -16.565);
  a.bezierCurveTo(-206.36, -16.635, -206.69, -16.657, -207.01, -16.69);
  a.lineTo(-207.2, -16.69);
  a.closePath();
  a.moveTo(-157.8, -5.69);
  a.lineTo(-157.67, -5.4087);
  a.bezierCurveTo(-157.67, -5.4087, -157.03, -4.9123, -156.86, -4.815);
  a.bezierCurveTo(-156.93, -4.8928, -157.34, -5.2981, -157.8, -5.69);
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
    var b = a.CmdsHash.text;
    b = Cvgr.Vars.iFrameNo - a.iFrameDelay + " " + b;
    a.Context.fillStyle = "Teal";
    a.Context.font = "1.9em Arial";
    a.Context.fillText(b, 0.4 * a.Height, -.27 * a.Height);
  }
};
Cvgr.Algos.Hamster.defaultProperties = {DrawNumberLimit:5};
/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script supplements a CanvasGear algorithm [file 20190329°1111]

 version : 0.2.5
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2021 Norbert C. Maier https://github.com/normai/canvasgear/
*/
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.MyAlgo = {};
Cvgr.Algos.MyAlgo.executeAlgorithm = function(a) {
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = a.Width / 2, d = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  d = null !== a.ShiftY ? d + parseInt(a.ShiftY, 10) : d;
  var g = (a.Width + a.Height) / 4 * 0.44;
  a.Context.beginPath();
  a.Context.arc(b, d, g, 0.1 + a.Angle, 1.6 * Math.PI + a.Angle, !1);
  a.Context.strokeStyle = a.Color;
  a.Context.lineWidth = 6;
  a.Context.stroke();
  a.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * a.Hertz;
  a.Angle > 2 * Math.PI && (a.Angle -= 2 * Math.PI);
};
Cvgr.Algos.MyAlgo.defaultProperties = {DrawNumberLimit:0};
/*
 ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 This section holds the Noisy1 figure

 id : file 20190401°0711 (after 20140901°0511)
*/
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Noisy1 = {executeAlgorithm:function(a) {
  var b = (a.Width + a.Height) / 2;
  Cvgr.Algos.Noisy1.oIko = a;
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var d = [], g = new Cvgr.Objs.Line(2, b / 2, b / 2, 2, a.Color), h = new Cvgr.Objs.Line(b / 2, 2, b / 2, b - 2, a.Color2);
  b = new Cvgr.Objs.Line(b / 2, b - 2, b - 2, b / 2, a.Color3);
  d.push(g);
  d.push(h);
  d.push(b);
  for (g = 0; g < d.length; g++) {
    a.Context.beginPath(), a.Context.moveTo(d[g].X1, d[g].Y1), a.Context.lineTo(d[g].X2, d[g].Y2), a.Context.lineWidth = 9, a.Context.strokeStyle = d[g].Colo, a.Context.stroke();
  }
  if (null !== Cvgr.Algos.Noisy1.iCursorPosX) {
    for (a.Context.beginPath(), a.Context.arc(Cvgr.Algos.Noisy1.iCursorPosX, Cvgr.Algos.Noisy1.iCursorPosY, 16, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.fillStyle = "DeepPink", a.Context.fill(), d = 0; d < Cvgr.Algos.Noisy1.aPoints.length; d++) {
      g = Cvgr.Algos.Noisy1.aPoints[d], a.Context.beginPath(), a.Context.arc(g.ptX, g.ptY, 9, 0, 2 * Math.PI, !1), a.Context.closePath(), a.Context.fillStyle = "LightSlateGray", a.Context.fill();
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
}, settle_cursorPos:function(a, b) {
  var d = document.documentElement.scrollLeft || document.body.scrollLeft, g = document.documentElement.scrollTop || document.body.scrollTop, h = Cvgr.Algos.Noisy1.getElementPositionOnPage(Cvgr.Algos.Noisy1.oIko.Canvas);
  b = b - h.top + g;
  Cvgr.Algos.Noisy1.iCursorPosX = a - h.left + d;
  Cvgr.Algos.Noisy1.iCursorPosY = b;
}, aPoints:[], iCursorPosX:null, iCursorPosY:null, iPtsNdx:null, oIko:null, sKeyboard:"", defaultProperties:{BgColor:"AntiqueWhite", Color:"LightCoral", Color2:"PaleGreen", Color3:"LightBlue", DrawNumberLimit:0, PlaySound:"yes", TailLength:32}};
/*
 - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 This script serves as template to spawn CanvasGear algorithms

 id : file 20190329°0611
 version : 0.2.5
 license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 copyright : (c) 2014 - 2021 Norbert C. Maier https://github.com/normai/canvasgear/
*/
Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};
Cvgr.Algos.Template = {executeAlgorithm:function(a) {
  a.Context.clearRect(0, 0, a.Canvas.width, a.Canvas.height);
  a.Context.fillStyle = a.BgColor;
  a.Context.fillRect(0, 0, a.Canvas.width, a.Canvas.height);
  var b = a.Width / 2, d = a.Height / 2;
  b = null !== a.ShiftX ? b + parseInt(a.ShiftX, 10) : b;
  d = null !== a.ShiftY ? d + parseInt(a.ShiftY, 10) : d;
  var g = (a.Width + a.Height) / 4 * 0.55;
  a.Context.beginPath();
  a.Context.arc(b, d, g, 0.1 + a.Angle, 1.9 * Math.PI + a.Angle, !1);
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
/*
 howler.js v2.1.2 | (c) 2013-2019, James Simpson of GoldFire Studios | MIT License | howlerjs.com  Spatial Plugin */
!function() {
  var a = function() {
    this.init();
  };
  a.prototype = {init:function() {
    var c = this || b;
    return c._counter = 1e3, c._html5AudioPool = [], c.html5PoolSize = 10, c._codecs = {}, c._howls = [], c._muted = !1, c._volume = 1, c._canPlayEvent = "canplaythrough", c._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, c.masterGain = null, c.noAudio = !1, c.usingWebAudio = !0, c.autoSuspend = !0, c.ctx = null, c.autoUnlock = !0, c._setup(), c;
  }, volume:function(c) {
    var e = this || b;
    if (c = parseFloat(c), e.ctx || y(), void 0 !== c && 0 <= c && 1 >= c) {
      if (e._volume = c, e._muted) {
        return e;
      }
      e.usingWebAudio && e.masterGain.gain.setValueAtTime(c, b.ctx.currentTime);
      for (var f = 0; f < e._howls.length; f++) {
        if (!e._howls[f]._webAudio) {
          for (var k = e._howls[f]._getSoundIds(), l = 0; l < k.length; l++) {
            var n = e._howls[f]._soundById(k[l]);
            n && n._node && (n._node.volume = n._volume * c);
          }
        }
      }
      return e;
    }
    return e._volume;
  }, mute:function(c) {
    var e = this || b;
    e.ctx || y();
    e._muted = c;
    e.usingWebAudio && e.masterGain.gain.setValueAtTime(c ? 0 : e._volume, b.ctx.currentTime);
    for (var f = 0; f < e._howls.length; f++) {
      if (!e._howls[f]._webAudio) {
        for (var k = e._howls[f]._getSoundIds(), l = 0; l < k.length; l++) {
          var n = e._howls[f]._soundById(k[l]);
          n && n._node && (n._node.muted = !!c || n._muted);
        }
      }
    }
    return e;
  }, unload:function() {
    for (var c = this || b, e = c._howls.length - 1; 0 <= e; e--) {
      c._howls[e].unload();
    }
    return c.usingWebAudio && c.ctx && void 0 !== c.ctx.close && (c.ctx.close(), c.ctx = null, y()), c;
  }, codecs:function(c) {
    return (this || b)._codecs[c.replace(/^x-/, "")];
  }, _setup:function() {
    var c = this || b;
    if (c.state = c.ctx ? c.ctx.state || "suspended" : "suspended", c._autoSuspend(), !c.usingWebAudio) {
      if ("undefined" != typeof Audio) {
        try {
          var e = new Audio;
          void 0 === e.oncanplaythrough && (c._canPlayEvent = "canplay");
        } catch (f) {
          c.noAudio = !0;
        }
      } else {
        c.noAudio = !0;
      }
    }
    try {
      e = new Audio, e.muted && (c.noAudio = !0);
    } catch (f) {
    }
    return c.noAudio || c._setupCodecs(), c;
  }, _setupCodecs:function() {
    var c = this || b, e = null;
    try {
      e = "undefined" != typeof Audio ? new Audio : null;
    } catch (l) {
      return c;
    }
    if (!e || "function" != typeof e.canPlayType) {
      return c;
    }
    var f = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), k = c._navigator && c._navigator.userAgent.match(/OPR\/([0-6].)/g);
    k = k && 33 > parseInt(k[0].split("/")[1], 10);
    return c._codecs = {mp3:!(k || !f && !e.canPlayType("audio/mp3;").replace(/^no$/, "")), mpeg:!!f, opus:!!e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg:!!e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), oga:!!e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav:!!e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), aac:!!e.canPlayType("audio/aac;").replace(/^no$/, ""), caf:!!e.canPlayType("audio/x-caf;").replace(/^no$/, ""), m4a:!!(e.canPlayType("audio/x-m4a;") || 
    e.canPlayType("audio/m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4:!!(e.canPlayType("audio/x-mp4;") || e.canPlayType("audio/mp4;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""), weba:!!e.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), webm:!!e.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), dolby:!!e.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""), flac:!!(e.canPlayType("audio/x-flac;") || e.canPlayType("audio/flac;")).replace(/^no$/, 
    "")}, c;
  }, _unlockAudio:function() {
    var c = this || b;
    if (!c._audioUnlocked && c.ctx) {
      c._audioUnlocked = !1;
      c.autoUnlock = !1;
      c._mobileUnloaded || 44100 === c.ctx.sampleRate || (c._mobileUnloaded = !0, c.unload());
      c._scratchBuffer = c.ctx.createBuffer(1, 1, 22050);
      var e = function(f) {
        for (f = 0; f < c.html5PoolSize; f++) {
          try {
            var k = new Audio;
            k._unlocked = !0;
            c._releaseHtml5Audio(k);
          } catch (u) {
            c.noAudio = !0;
          }
        }
        for (f = 0; f < c._howls.length; f++) {
          if (!c._howls[f]._webAudio) {
            k = c._howls[f]._getSoundIds();
            for (var l = 0; l < k.length; l++) {
              var n = c._howls[f]._soundById(k[l]);
              n && n._node && !n._node._unlocked && (n._node._unlocked = !0, n._node.load());
            }
          }
        }
        c._autoResume();
        var p = c.ctx.createBufferSource();
        p.buffer = c._scratchBuffer;
        p.connect(c.ctx.destination);
        void 0 === p.start ? p.noteOn(0) : p.start(0);
        "function" == typeof c.ctx.resume && c.ctx.resume();
        p.onended = function() {
          p.disconnect(0);
          c._audioUnlocked = !0;
          document.removeEventListener("touchstart", e, !0);
          document.removeEventListener("touchend", e, !0);
          document.removeEventListener("click", e, !0);
          for (var u = 0; u < c._howls.length; u++) {
            c._howls[u]._emit("unlock");
          }
        };
      };
      return document.addEventListener("touchstart", e, !0), document.addEventListener("touchend", e, !0), document.addEventListener("click", e, !0), c;
    }
  }, _obtainHtml5Audio:function() {
    var c = this || b;
    if (c._html5AudioPool.length) {
      return c._html5AudioPool.pop();
    }
    c = (new Audio).play();
    return c && "undefined" != typeof Promise && (c instanceof Promise || "function" == typeof c.then) && c.catch(function() {
      console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
    }), new Audio;
  }, _releaseHtml5Audio:function(c) {
    var e = this || b;
    return c._unlocked && e._html5AudioPool.push(c), e;
  }, _autoSuspend:function() {
    var c = this;
    if (c.autoSuspend && c.ctx && void 0 !== c.ctx.suspend && b.usingWebAudio) {
      for (var e = 0; e < c._howls.length; e++) {
        if (c._howls[e]._webAudio) {
          for (var f = 0; f < c._howls[e]._sounds.length; f++) {
            if (!c._howls[e]._sounds[f]._paused) {
              return c;
            }
          }
        }
      }
      return c._suspendTimer && clearTimeout(c._suspendTimer), c._suspendTimer = setTimeout(function() {
        c.autoSuspend && (c._suspendTimer = null, c.state = "suspending", c.ctx.suspend().then(function() {
          c.state = "suspended";
          c._resumeAfterSuspend && (delete c._resumeAfterSuspend, c._autoResume());
        }));
      }, 3E4), c;
    }
  }, _autoResume:function() {
    var c = this;
    if (c.ctx && void 0 !== c.ctx.resume && b.usingWebAudio) {
      return "running" === c.state && c._suspendTimer ? (clearTimeout(c._suspendTimer), c._suspendTimer = null) : "suspended" === c.state ? (c.ctx.resume().then(function() {
        c.state = "running";
        for (var e = 0; e < c._howls.length; e++) {
          c._howls[e]._emit("resume");
        }
      }), c._suspendTimer && (clearTimeout(c._suspendTimer), c._suspendTimer = null)) : "suspending" === c.state && (c._resumeAfterSuspend = !0), c;
    }
  }};
  var b = new a, d = function(c) {
    if (!c.src || 0 === c.src.length) {
      return void console.error("An array of source files must be passed with any new Howl.");
    }
    this.init(c);
  };
  d.prototype = {init:function(c) {
    var e = this;
    return b.ctx || y(), e._autoplay = c.autoplay || !1, e._format = "string" != typeof c.format ? c.format : [c.format], e._html5 = c.html5 || !1, e._muted = c.mute || !1, e._loop = c.loop || !1, e._pool = c.pool || 5, e._preload = "boolean" != typeof c.preload || c.preload, e._rate = c.rate || 1, e._sprite = c.sprite || {}, e._src = "string" != typeof c.src ? c.src : [c.src], e._volume = void 0 !== c.volume ? c.volume : 1, e._xhrWithCredentials = c.xhrWithCredentials || !1, e._duration = 0, e._state = 
    "unloaded", e._sounds = [], e._endTimers = {}, e._queue = [], e._playLock = !1, e._onend = c.onend ? [{fn:c.onend}] : [], e._onfade = c.onfade ? [{fn:c.onfade}] : [], e._onload = c.onload ? [{fn:c.onload}] : [], e._onloaderror = c.onloaderror ? [{fn:c.onloaderror}] : [], e._onplayerror = c.onplayerror ? [{fn:c.onplayerror}] : [], e._onpause = c.onpause ? [{fn:c.onpause}] : [], e._onplay = c.onplay ? [{fn:c.onplay}] : [], e._onstop = c.onstop ? [{fn:c.onstop}] : [], e._onmute = c.onmute ? [{fn:c.onmute}] : 
    [], e._onvolume = c.onvolume ? [{fn:c.onvolume}] : [], e._onrate = c.onrate ? [{fn:c.onrate}] : [], e._onseek = c.onseek ? [{fn:c.onseek}] : [], e._onunlock = c.onunlock ? [{fn:c.onunlock}] : [], e._onresume = [], e._webAudio = b.usingWebAudio && !e._html5, void 0 !== b.ctx && b.ctx && b.autoUnlock && b._unlockAudio(), b._howls.push(e), e._autoplay && e._queue.push({event:"play", action:function() {
      e.play();
    }}), e._preload && e.load(), e;
  }, load:function() {
    var c = null;
    if (b.noAudio) {
      return void this._emit("loaderror", null, "No audio support.");
    }
    "string" == typeof this._src && (this._src = [this._src]);
    for (var e = 0; e < this._src.length; e++) {
      var f;
      if (this._format && this._format[e]) {
        var k = this._format[e];
      } else {
        if ("string" != typeof(f = this._src[e])) {
          this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
          continue;
        }
        (k = /^data:audio\/([^;,]+);/i.exec(f)) || (k = /\.([^.]+)$/.exec(f.split("?", 1)[0]));
        k && (k = k[1].toLowerCase());
      }
      if (k || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), k && b.codecs(k)) {
        c = this._src[e];
        break;
      }
    }
    return c ? (this._src = c, this._state = "loading", "https:" === window.location.protocol && "http:" === c.slice(0, 5) && (this._html5 = !0, this._webAudio = !1), new g(this), this._webAudio && m(this), this) : void this._emit("loaderror", null, "No codec support for selected audio sources.");
  }, play:function(c, e) {
    var f = this, k = null;
    if ("number" == typeof c) {
      k = c, c = null;
    } else {
      if ("string" == typeof c && "loaded" === f._state && !f._sprite[c]) {
        return null;
      }
      if (void 0 === c && (c = "__default", !f._playLock)) {
        for (var l = 0, n = 0; n < f._sounds.length; n++) {
          f._sounds[n]._paused && !f._sounds[n]._ended && (l++, k = f._sounds[n]._id);
        }
        1 === l ? c = null : k = null;
      }
    }
    var p = k ? f._soundById(k) : f._inactiveSound();
    if (!p) {
      return null;
    }
    if (k && !c && (c = p._sprite || "__default"), "loaded" !== f._state) {
      p._sprite = c;
      p._ended = !1;
      var u = p._id;
      return f._queue.push({event:"play", action:function() {
        f.play(u);
      }}), u;
    }
    if (k && !p._paused) {
      return e || f._loadQueue("play"), p._id;
    }
    f._webAudio && b._autoResume();
    var w = Math.max(0, 0 < p._seek ? p._seek : f._sprite[c][0] / 1E3), x = Math.max(0, (f._sprite[c][0] + f._sprite[c][1]) / 1E3 - w), z = 1E3 * x / Math.abs(p._rate), F = f._sprite[c][0] / 1E3, C = (f._sprite[c][0] + f._sprite[c][1]) / 1E3, G = !(!p._loop && !f._sprite[c][2]);
    p._sprite = c;
    p._ended = !1;
    var B = function() {
      p._paused = !1;
      p._seek = w;
      p._start = F;
      p._stop = C;
      p._loop = G;
    };
    if (w >= C) {
      return void f._ended(p);
    }
    var v = p._node;
    if (f._webAudio) {
      k = function() {
        f._playLock = !1;
        B();
        f._refreshBuffer(p);
        v.gain.setValueAtTime(p._muted || f._muted ? 0 : p._volume, b.ctx.currentTime);
        p._playStart = b.ctx.currentTime;
        void 0 === v.bufferSource.start ? p._loop ? v.bufferSource.noteGrainOn(0, w, 86400) : v.bufferSource.noteGrainOn(0, w, x) : p._loop ? v.bufferSource.start(0, w, 86400) : v.bufferSource.start(0, w, x);
        z !== 1 / 0 && (f._endTimers[p._id] = setTimeout(f._ended.bind(f, p), z));
        e || setTimeout(function() {
          f._emit("play", p._id);
          f._loadQueue();
        }, 0);
      }, "running" === b.state ? k() : (f._playLock = !0, f.once("resume", k), f._clearTimer(p._id));
    } else {
      var D = function() {
        v.currentTime = w;
        v.muted = p._muted || f._muted || b._muted || v.muted;
        v.volume = p._volume * b.volume();
        v.playbackRate = p._rate;
        try {
          var A = v.play();
          if (A && "undefined" != typeof Promise && (A instanceof Promise || "function" == typeof A.then) ? (f._playLock = !0, B(), A.then(function() {
            f._playLock = !1;
            v._unlocked = !0;
            e || (f._emit("play", p._id), f._loadQueue());
          }).catch(function() {
            f._playLock = !1;
            f._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
            p._ended = !0;
            p._paused = !0;
          })) : e || (f._playLock = !1, B(), f._emit("play", p._id), f._loadQueue()), v.playbackRate = p._rate, v.paused) {
            return void f._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
          }
          "__default" !== c || p._loop ? f._endTimers[p._id] = setTimeout(f._ended.bind(f, p), z) : (f._endTimers[p._id] = function() {
            f._ended(p);
            v.removeEventListener("ended", f._endTimers[p._id], !1);
          }, v.addEventListener("ended", f._endTimers[p._id], !1));
        } catch (H) {
          f._emit("playerror", p._id, H);
        }
      };
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === v.src && (v.src = f._src, v.load());
      k = window && window.ejecta || !v.readyState && b._navigator.isCocoonJS;
      if (3 <= v.readyState || k) {
        D();
      } else {
        f._playLock = !0;
        var E = function() {
          D();
          v.removeEventListener(b._canPlayEvent, E, !1);
        };
        v.addEventListener(b._canPlayEvent, E, !1);
        f._clearTimer(p._id);
      }
    }
    return p._id;
  }, pause:function(c, e) {
    var f = this;
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"pause", action:function() {
        f.pause(c);
      }}), f;
    }
    for (var k = f._getSoundIds(c), l = 0; l < k.length; l++) {
      f._clearTimer(k[l]);
      var n = f._soundById(k[l]);
      if (n && !n._paused && (n._seek = f.seek(k[l]), n._rateSeek = 0, n._paused = !0, f._stopFade(k[l]), n._node)) {
        if (f._webAudio) {
          if (!n._node.bufferSource) {
            continue;
          }
          void 0 === n._node.bufferSource.stop ? n._node.bufferSource.noteOff(0) : n._node.bufferSource.stop(0);
          f._cleanBuffer(n._node);
        } else {
          isNaN(n._node.duration) && n._node.duration !== 1 / 0 || n._node.pause();
        }
      }
      e || f._emit("pause", n ? n._id : null);
    }
    return f;
  }, stop:function(c, e) {
    var f = this;
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"stop", action:function() {
        f.stop(c);
      }}), f;
    }
    for (var k = f._getSoundIds(c), l = 0; l < k.length; l++) {
      f._clearTimer(k[l]);
      var n = f._soundById(k[l]);
      n && (n._seek = n._start || 0, n._rateSeek = 0, n._paused = !0, n._ended = !0, f._stopFade(k[l]), n._node && (f._webAudio ? n._node.bufferSource && (void 0 === n._node.bufferSource.stop ? n._node.bufferSource.noteOff(0) : n._node.bufferSource.stop(0), f._cleanBuffer(n._node)) : isNaN(n._node.duration) && n._node.duration !== 1 / 0 || (n._node.currentTime = n._start || 0, n._node.pause(), n._node.duration === 1 / 0 && f._clearSound(n._node))), e || f._emit("stop", n._id));
    }
    return f;
  }, mute:function(c, e) {
    var f = this;
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"mute", action:function() {
        f.mute(c, e);
      }}), f;
    }
    if (void 0 === e) {
      if ("boolean" != typeof c) {
        return f._muted;
      }
      f._muted = c;
    }
    for (var k = f._getSoundIds(e), l = 0; l < k.length; l++) {
      var n = f._soundById(k[l]);
      n && (n._muted = c, n._interval && f._stopFade(n._id), f._webAudio && n._node ? n._node.gain.setValueAtTime(c ? 0 : n._volume, b.ctx.currentTime) : n._node && (n._node.muted = !!b._muted || c), f._emit("mute", n._id));
    }
    return f;
  }, volume:function() {
    var c, e, f = this, k = arguments;
    if (0 === k.length) {
      return f._volume;
    }
    1 === k.length || 2 === k.length && void 0 === k[1] ? 0 <= f._getSoundIds().indexOf(k[0]) ? e = parseInt(k[0], 10) : c = parseFloat(k[0]) : 2 <= k.length && (c = parseFloat(k[0]), e = parseInt(k[1], 10));
    var l;
    if (!(void 0 !== c && 0 <= c && 1 >= c)) {
      return l = e ? f._soundById(e) : f._sounds[0], l ? l._volume : 0;
    }
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"volume", action:function() {
        f.volume.apply(f, k);
      }}), f;
    }
    void 0 === e && (f._volume = c);
    e = f._getSoundIds(e);
    for (var n = 0; n < e.length; n++) {
      (l = f._soundById(e[n])) && (l._volume = c, k[2] || f._stopFade(e[n]), f._webAudio && l._node && !l._muted ? l._node.gain.setValueAtTime(c, b.ctx.currentTime) : l._node && !l._muted && (l._node.volume = c * b.volume()), f._emit("volume", l._id));
    }
    return f;
  }, fade:function(c, e, f, k) {
    var l = this;
    if ("loaded" !== l._state || l._playLock) {
      return l._queue.push({event:"fade", action:function() {
        l.fade(c, e, f, k);
      }}), l;
    }
    c = parseFloat(c);
    e = parseFloat(e);
    f = parseFloat(f);
    l.volume(c, k);
    for (var n = l._getSoundIds(k), p = 0; p < n.length; p++) {
      var u = l._soundById(n[p]);
      if (u) {
        if (k || l._stopFade(n[p]), l._webAudio && !u._muted) {
          var w = b.ctx.currentTime, x = w + f / 1E3;
          u._volume = c;
          u._node.gain.setValueAtTime(c, w);
          u._node.gain.linearRampToValueAtTime(e, x);
        }
        l._startFadeInterval(u, c, e, f, n[p], void 0 === k);
      }
    }
    return l;
  }, _startFadeInterval:function(c, e, f, k, l, n) {
    var p = this, u = e, w = f - e;
    l = Math.abs(w / .01);
    l = Math.max(4, 0 < l ? k / l : k);
    var x = Date.now();
    c._fadeTo = f;
    c._interval = setInterval(function() {
      var z = (Date.now() - x) / k;
      x = Date.now();
      u += w * z;
      u = Math.max(0, u);
      u = Math.min(1, u);
      u = Math.round(100 * u) / 100;
      p._webAudio ? c._volume = u : p.volume(u, c._id, !0);
      n && (p._volume = u);
      (f < e && u <= f || f > e && u >= f) && (clearInterval(c._interval), c._interval = null, c._fadeTo = null, p.volume(f, c._id), p._emit("fade", c._id));
    }, l);
  }, _stopFade:function(c) {
    var e = this._soundById(c);
    return e && e._interval && (this._webAudio && e._node.gain.cancelScheduledValues(b.ctx.currentTime), clearInterval(e._interval), e._interval = null, this.volume(e._fadeTo, c), e._fadeTo = null, this._emit("fade", c)), this;
  }, loop:function() {
    var c, e, f, k = arguments;
    if (0 === k.length) {
      return this._loop;
    }
    if (1 === k.length) {
      if ("boolean" != typeof k[0]) {
        return !!(f = this._soundById(parseInt(k[0], 10))) && f._loop;
      }
      this._loop = c = k[0];
    } else {
      2 === k.length && (c = k[0], e = parseInt(k[1], 10));
    }
    e = this._getSoundIds(e);
    for (k = 0; k < e.length; k++) {
      (f = this._soundById(e[k])) && (f._loop = c, this._webAudio && f._node && f._node.bufferSource && (f._node.bufferSource.loop = c, c && (f._node.bufferSource.loopStart = f._start || 0, f._node.bufferSource.loopEnd = f._stop)));
    }
    return this;
  }, rate:function() {
    var c, e, f = this, k = arguments;
    0 === k.length ? e = f._sounds[0]._id : 1 === k.length ? 0 <= f._getSoundIds().indexOf(k[0]) ? e = parseInt(k[0], 10) : c = parseFloat(k[0]) : 2 === k.length && (c = parseFloat(k[0]), e = parseInt(k[1], 10));
    var l;
    if ("number" != typeof c) {
      return l = f._soundById(e), l ? l._rate : f._rate;
    }
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"rate", action:function() {
        f.rate.apply(f, k);
      }}), f;
    }
    void 0 === e && (f._rate = c);
    e = f._getSoundIds(e);
    for (var n = 0; n < e.length; n++) {
      if (l = f._soundById(e[n])) {
        f.playing(e[n]) && (l._rateSeek = f.seek(e[n]), l._playStart = f._webAudio ? b.ctx.currentTime : l._playStart);
        l._rate = c;
        f._webAudio && l._node && l._node.bufferSource ? l._node.bufferSource.playbackRate.setValueAtTime(c, b.ctx.currentTime) : l._node && (l._node.playbackRate = c);
        var p = f.seek(e[n]);
        p = 1E3 * ((f._sprite[l._sprite][0] + f._sprite[l._sprite][1]) / 1E3 - p) / Math.abs(l._rate);
        !f._endTimers[e[n]] && l._paused || (f._clearTimer(e[n]), f._endTimers[e[n]] = setTimeout(f._ended.bind(f, l), p));
        f._emit("rate", l._id);
      }
    }
    return f;
  }, seek:function() {
    var c, e, f = this, k = arguments;
    0 === k.length ? e = f._sounds[0]._id : 1 === k.length ? 0 <= f._getSoundIds().indexOf(k[0]) ? e = parseInt(k[0], 10) : f._sounds.length && (e = f._sounds[0]._id, c = parseFloat(k[0])) : 2 === k.length && (c = parseFloat(k[0]), e = parseInt(k[1], 10));
    if (void 0 === e) {
      return f;
    }
    if ("loaded" !== f._state || f._playLock) {
      return f._queue.push({event:"seek", action:function() {
        f.seek.apply(f, k);
      }}), f;
    }
    var l = f._soundById(e);
    if (l) {
      if (!("number" == typeof c && 0 <= c)) {
        return f._webAudio ? (c = f.playing(e) ? b.ctx.currentTime - l._playStart : 0, l._seek + ((l._rateSeek ? l._rateSeek - l._seek : 0) + c * Math.abs(l._rate))) : l._node.currentTime;
      }
      var n = f.playing(e);
      n && f.pause(e, !0);
      l._seek = c;
      l._ended = !1;
      f._clearTimer(e);
      f._webAudio || !l._node || isNaN(l._node.duration) || (l._node.currentTime = c);
      var p = function() {
        f._emit("seek", e);
        n && f.play(e, !0);
      };
      if (n && !f._webAudio) {
        var u = function() {
          f._playLock ? setTimeout(u, 0) : p();
        };
        setTimeout(u, 0);
      } else {
        p();
      }
    }
    return f;
  }, playing:function(c) {
    if ("number" == typeof c) {
      return c = this._soundById(c), !!c && !c._paused;
    }
    for (c = 0; c < this._sounds.length; c++) {
      if (!this._sounds[c]._paused) {
        return !0;
      }
    }
    return !1;
  }, duration:function(c) {
    var e = this._duration;
    c = this._soundById(c);
    return c && (e = this._sprite[c._sprite][1] / 1E3), e;
  }, state:function() {
    return this._state;
  }, unload:function() {
    for (var c = this._sounds, e = 0; e < c.length; e++) {
      c[e]._paused || this.stop(c[e]._id), this._webAudio || (this._clearSound(c[e]._node), c[e]._node.removeEventListener("error", c[e]._errorFn, !1), c[e]._node.removeEventListener(b._canPlayEvent, c[e]._loadFn, !1), b._releaseHtml5Audio(c[e]._node)), delete c[e]._node, this._clearTimer(c[e]._id);
    }
    e = b._howls.indexOf(this);
    0 <= e && b._howls.splice(e, 1);
    c = !0;
    for (e = 0; e < b._howls.length; e++) {
      if (b._howls[e]._src === this._src || 0 <= this._src.indexOf(b._howls[e]._src)) {
        c = !1;
        break;
      }
    }
    return h && c && delete h[this._src], b.noAudio = !1, this._state = "unloaded", this._sounds = [], null;
  }, on:function(c, e, f, k) {
    c = this["_on" + c];
    return "function" == typeof e && c.push(k ? {id:f, fn:e, once:k} : {id:f, fn:e}), this;
  }, off:function(c, e, f) {
    var k = this["_on" + c];
    if ("number" == typeof e && (f = e, e = null), e || f) {
      for (c = 0; c < k.length; c++) {
        var l = f === k[c].id;
        if (e === k[c].fn && l || !e && l) {
          k.splice(c, 1);
          break;
        }
      }
    } else {
      if (c) {
        this["_on" + c] = [];
      } else {
        for (e = Object.keys(this), c = 0; c < e.length; c++) {
          0 === e[c].indexOf("_on") && Array.isArray(this[e[c]]) && (this[e[c]] = []);
        }
      }
    }
    return this;
  }, once:function(c, e, f) {
    return this.on(c, e, f, 1), this;
  }, _emit:function(c, e, f) {
    for (var k = this["_on" + c], l = k.length - 1; 0 <= l; l--) {
      k[l].id && k[l].id !== e && "load" !== c || (setTimeout(function(n) {
        n.call(this, e, f);
      }.bind(this, k[l].fn), 0), k[l].once && this.off(c, k[l].fn, k[l].id));
    }
    return this._loadQueue(c), this;
  }, _loadQueue:function(c) {
    if (0 < this._queue.length) {
      var e = this._queue[0];
      e.event === c && (this._queue.shift(), this._loadQueue());
      c || e.action();
    }
    return this;
  }, _ended:function(c) {
    var e = c._sprite;
    if (!this._webAudio && c._node && !c._node.paused && !c._node.ended && c._node.currentTime < c._stop) {
      return setTimeout(this._ended.bind(this, c), 100), this;
    }
    e = !(!c._loop && !this._sprite[e][2]);
    if (this._emit("end", c._id), !this._webAudio && e && this.stop(c._id, !0).play(c._id), this._webAudio && e) {
      this._emit("play", c._id);
      c._seek = c._start || 0;
      c._rateSeek = 0;
      c._playStart = b.ctx.currentTime;
      var f = 1E3 * (c._stop - c._start) / Math.abs(c._rate);
      this._endTimers[c._id] = setTimeout(this._ended.bind(this, c), f);
    }
    return this._webAudio && !e && (c._paused = !0, c._ended = !0, c._seek = c._start || 0, c._rateSeek = 0, this._clearTimer(c._id), this._cleanBuffer(c._node), b._autoSuspend()), this._webAudio || e || this.stop(c._id, !0), this;
  }, _clearTimer:function(c) {
    if (this._endTimers[c]) {
      if ("function" != typeof this._endTimers[c]) {
        clearTimeout(this._endTimers[c]);
      } else {
        var e = this._soundById(c);
        e && e._node && e._node.removeEventListener("ended", this._endTimers[c], !1);
      }
      delete this._endTimers[c];
    }
    return this;
  }, _soundById:function(c) {
    for (var e = 0; e < this._sounds.length; e++) {
      if (c === this._sounds[e]._id) {
        return this._sounds[e];
      }
    }
    return null;
  }, _inactiveSound:function() {
    this._drain();
    for (var c = 0; c < this._sounds.length; c++) {
      if (this._sounds[c]._ended) {
        return this._sounds[c].reset();
      }
    }
    return new g(this);
  }, _drain:function() {
    var c = this._pool, e = 0, f;
    if (!(this._sounds.length < c)) {
      for (f = 0; f < this._sounds.length; f++) {
        this._sounds[f]._ended && e++;
      }
      for (f = this._sounds.length - 1; 0 <= f && !(e <= c); f--) {
        this._sounds[f]._ended && (this._webAudio && this._sounds[f]._node && this._sounds[f]._node.disconnect(0), this._sounds.splice(f, 1), e--);
      }
    }
  }, _getSoundIds:function(c) {
    if (void 0 === c) {
      c = [];
      for (var e = 0; e < this._sounds.length; e++) {
        c.push(this._sounds[e]._id);
      }
      return c;
    }
    return [c];
  }, _refreshBuffer:function(c) {
    return c._node.bufferSource = b.ctx.createBufferSource(), c._node.bufferSource.buffer = h[this._src], c._panner ? c._node.bufferSource.connect(c._panner) : c._node.bufferSource.connect(c._node), c._node.bufferSource.loop = c._loop, c._loop && (c._node.bufferSource.loopStart = c._start || 0, c._node.bufferSource.loopEnd = c._stop || 0), c._node.bufferSource.playbackRate.setValueAtTime(c._rate, b.ctx.currentTime), this;
  }, _cleanBuffer:function(c) {
    var e = b._navigator && 0 <= b._navigator.vendor.indexOf("Apple");
    if (b._scratchBuffer && c.bufferSource && (c.bufferSource.onended = null, c.bufferSource.disconnect(0), e)) {
      try {
        c.bufferSource.buffer = b._scratchBuffer;
      } catch (f) {
      }
    }
    return c.bufferSource = null, this;
  }, _clearSound:function(c) {
    /MSIE |Trident\//.test(b._navigator && b._navigator.userAgent) || (c.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
  }};
  var g = function(c) {
    this._parent = c;
    this.init();
  };
  g.prototype = {init:function() {
    var c = this._parent;
    return this._muted = c._muted, this._loop = c._loop, this._volume = c._volume, this._rate = c._rate, this._seek = 0, this._paused = !0, this._ended = !0, this._sprite = "__default", this._id = ++b._counter, c._sounds.push(this), this.create(), this;
  }, create:function() {
    var c = this._parent, e = b._muted || this._muted || this._parent._muted ? 0 : this._volume;
    return c._webAudio ? (this._node = void 0 === b.ctx.createGain ? b.ctx.createGainNode() : b.ctx.createGain(), this._node.gain.setValueAtTime(e, b.ctx.currentTime), this._node.paused = !0, this._node.connect(b.masterGain)) : (this._node = b._obtainHtml5Audio(), this._errorFn = this._errorListener.bind(this), this._node.addEventListener("error", this._errorFn, !1), this._loadFn = this._loadListener.bind(this), this._node.addEventListener(b._canPlayEvent, this._loadFn, !1), this._node.src = c._src, 
    this._node.preload = "auto", this._node.volume = e * b.volume(), this._node.load()), this;
  }, reset:function() {
    var c = this._parent;
    return this._muted = c._muted, this._loop = c._loop, this._volume = c._volume, this._rate = c._rate, this._seek = 0, this._rateSeek = 0, this._paused = !0, this._ended = !0, this._sprite = "__default", this._id = ++b._counter, this;
  }, _errorListener:function() {
    this._parent._emit("loaderror", this._id, this._node.error ? this._node.error.code : 0);
    this._node.removeEventListener("error", this._errorFn, !1);
  }, _loadListener:function() {
    var c = this._parent;
    c._duration = Math.ceil(10 * this._node.duration) / 10;
    0 === Object.keys(c._sprite).length && (c._sprite = {__default:[0, 1E3 * c._duration]});
    "loaded" !== c._state && (c._state = "loaded", c._emit("load"), c._loadQueue());
    this._node.removeEventListener(b._canPlayEvent, this._loadFn, !1);
  }};
  var h = {}, m = function(c) {
    var e = c._src;
    if (h[e]) {
      return c._duration = h[e].duration, void t(c);
    }
    if (/^data:[^;]+;base64,/.test(e)) {
      for (var f = atob(e.split(",")[1]), k = new Uint8Array(f.length), l = 0; l < f.length; ++l) {
        k[l] = f.charCodeAt(l);
      }
      r(k.buffer, c);
    } else {
      var n = new XMLHttpRequest;
      n.open("GET", e, !0);
      n.withCredentials = c._xhrWithCredentials;
      n.responseType = "arraybuffer";
      n.onload = function() {
        var p = (n.status + "")[0];
        if ("0" !== p && "2" !== p && "3" !== p) {
          return void c._emit("loaderror", null, "Failed loading audio file with status: " + n.status + ".");
        }
        r(n.response, c);
      };
      n.onerror = function() {
        c._webAudio && (c._html5 = !0, c._webAudio = !1, c._sounds = [], delete h[e], c.load());
      };
      q(n);
    }
  }, q = function(c) {
    try {
      c.send();
    } catch (e) {
      c.onerror();
    }
  }, r = function(c, e) {
    var f = function() {
      e._emit("loaderror", null, "Decoding audio data failed.");
    }, k = function(l) {
      l && 0 < e._sounds.length ? (h[e._src] = l, t(e, l)) : f();
    };
    "undefined" != typeof Promise && 1 === b.ctx.decodeAudioData.length ? b.ctx.decodeAudioData(c).then(k).catch(f) : b.ctx.decodeAudioData(c, k, f);
  }, t = function(c, e) {
    e && !c._duration && (c._duration = e.duration);
    0 === Object.keys(c._sprite).length && (c._sprite = {__default:[0, 1E3 * c._duration]});
    "loaded" !== c._state && (c._state = "loaded", c._emit("load"), c._loadQueue());
  }, y = function() {
    if (b.usingWebAudio) {
      try {
        "undefined" != typeof AudioContext ? b.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? b.ctx = new webkitAudioContext : b.usingWebAudio = !1;
      } catch (f) {
        b.usingWebAudio = !1;
      }
      b.ctx || (b.usingWebAudio = !1);
      var c = /iP(hone|od|ad)/.test(b._navigator && b._navigator.platform), e = b._navigator && b._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      e = e ? parseInt(e[1], 10) : null;
      c && e && 9 > e && (c = /safari/.test(b._navigator && b._navigator.userAgent.toLowerCase()), (b._navigator && b._navigator.standalone && !c || b._navigator && !b._navigator.standalone && !c) && (b.usingWebAudio = !1));
      b.usingWebAudio && (b.masterGain = void 0 === b.ctx.createGain ? b.ctx.createGainNode() : b.ctx.createGain(), b.masterGain.gain.setValueAtTime(b._muted ? 0 : 1, b.ctx.currentTime), b.masterGain.connect(b.ctx.destination));
      b._setup();
    }
  };
  "function" == typeof define && define.amd && define([], function() {
    return {Howler:b, Howl:d};
  });
  "undefined" != typeof exports && (exports.Howler = b, exports.Howl = d);
  "undefined" != typeof window ? (window.HowlerGlobal = a, window.Howler = b, window.Howl = d, window.Sound = g) : "undefined" != typeof global && (global.HowlerGlobal = a, global.Howler = b, global.Howl = d, global.Sound = g);
}();
!function() {
  HowlerGlobal.prototype._pos = [0, 0, 0];
  HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
  HowlerGlobal.prototype.stereo = function(b) {
    if (!this.ctx || !this.ctx.listener) {
      return this;
    }
    for (var d = this._howls.length - 1; 0 <= d; d--) {
      this._howls[d].stereo(b);
    }
    return this;
  };
  HowlerGlobal.prototype.pos = function(b, d, g) {
    return this.ctx && this.ctx.listener ? (d = "number" != typeof d ? this._pos[1] : d, g = "number" != typeof g ? this._pos[2] : g, "number" != typeof b ? this._pos : (this._pos = [b, d, g], void 0 !== this.ctx.listener.positionX ? (this.ctx.listener.positionX.setTargetAtTime(this._pos[0], Howler.ctx.currentTime, .1), this.ctx.listener.positionY.setTargetAtTime(this._pos[1], Howler.ctx.currentTime, .1), this.ctx.listener.positionZ.setTargetAtTime(this._pos[2], Howler.ctx.currentTime, .1)) : this.ctx.listener.setPosition(this._pos[0], 
    this._pos[1], this._pos[2]), this)) : this;
  };
  HowlerGlobal.prototype.orientation = function(b, d, g, h, m, q) {
    if (!this.ctx || !this.ctx.listener) {
      return this;
    }
    var r = this._orientation;
    return d = "number" != typeof d ? r[1] : d, g = "number" != typeof g ? r[2] : g, h = "number" != typeof h ? r[3] : h, m = "number" != typeof m ? r[4] : m, q = "number" != typeof q ? r[5] : q, "number" != typeof b ? r : (this._orientation = [b, d, g, h, m, q], void 0 !== this.ctx.listener.forwardX ? (this.ctx.listener.forwardX.setTargetAtTime(b, Howler.ctx.currentTime, .1), this.ctx.listener.forwardY.setTargetAtTime(d, Howler.ctx.currentTime, .1), this.ctx.listener.forwardZ.setTargetAtTime(g, 
    Howler.ctx.currentTime, .1), this.ctx.listener.upX.setTargetAtTime(b, Howler.ctx.currentTime, .1), this.ctx.listener.upY.setTargetAtTime(d, Howler.ctx.currentTime, .1), this.ctx.listener.upZ.setTargetAtTime(g, Howler.ctx.currentTime, .1)) : this.ctx.listener.setOrientation(b, d, g, h, m, q), this);
  };
  Howl.prototype.init = function(b) {
    return function(d) {
      return this._orientation = d.orientation || [1, 0, 0], this._stereo = d.stereo || null, this._pos = d.pos || null, this._pannerAttr = {coneInnerAngle:void 0 !== d.coneInnerAngle ? d.coneInnerAngle : 360, coneOuterAngle:void 0 !== d.coneOuterAngle ? d.coneOuterAngle : 360, coneOuterGain:void 0 !== d.coneOuterGain ? d.coneOuterGain : 0, distanceModel:void 0 !== d.distanceModel ? d.distanceModel : "inverse", maxDistance:void 0 !== d.maxDistance ? d.maxDistance : 1e4, panningModel:void 0 !== d.panningModel ? 
      d.panningModel : "HRTF", refDistance:void 0 !== d.refDistance ? d.refDistance : 1, rolloffFactor:void 0 !== d.rolloffFactor ? d.rolloffFactor : 1}, this._onstereo = d.onstereo ? [{fn:d.onstereo}] : [], this._onpos = d.onpos ? [{fn:d.onpos}] : [], this._onorientation = d.onorientation ? [{fn:d.onorientation}] : [], b.call(this, d);
    };
  }(Howl.prototype.init);
  Howl.prototype.stereo = function(b, d) {
    var g = this;
    if (!g._webAudio) {
      return g;
    }
    if ("loaded" !== g._state) {
      return g._queue.push({event:"stereo", action:function() {
        g.stereo(b, d);
      }}), g;
    }
    var h = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
    if (void 0 === d) {
      if ("number" != typeof b) {
        return g._stereo;
      }
      g._stereo = b;
      g._pos = [b, 0, 0];
    }
    for (var m = g._getSoundIds(d), q = 0; q < m.length; q++) {
      var r = g._soundById(m[q]);
      if (r) {
        if ("number" != typeof b) {
          return r._stereo;
        }
        r._stereo = b;
        r._pos = [b, 0, 0];
        r._node && (r._pannerAttr.panningModel = "equalpower", r._panner && r._panner.pan || a(r, h), "spatial" === h ? void 0 !== r._panner.positionX ? (r._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), r._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), r._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : r._panner.setPosition(b, 0, 0) : r._panner.pan.setValueAtTime(b, Howler.ctx.currentTime));
        g._emit("stereo", r._id);
      }
    }
    return g;
  };
  Howl.prototype.pos = function(b, d, g, h) {
    var m = this;
    if (!m._webAudio) {
      return m;
    }
    if ("loaded" !== m._state) {
      return m._queue.push({event:"pos", action:function() {
        m.pos(b, d, g, h);
      }}), m;
    }
    if (d = "number" != typeof d ? 0 : d, g = "number" != typeof g ? -.5 : g, void 0 === h) {
      if ("number" != typeof b) {
        return m._pos;
      }
      m._pos = [b, d, g];
    }
    for (var q = m._getSoundIds(h), r = 0; r < q.length; r++) {
      var t = m._soundById(q[r]);
      if (t) {
        if ("number" != typeof b) {
          return t._pos;
        }
        t._pos = [b, d, g];
        t._node && (t._panner && !t._panner.pan || a(t, "spatial"), void 0 !== t._panner.positionX ? (t._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(d, Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(g, Howler.ctx.currentTime)) : t._panner.setPosition(b, d, g));
        m._emit("pos", t._id);
      }
    }
    return m;
  };
  Howl.prototype.orientation = function(b, d, g, h) {
    var m = this;
    if (!m._webAudio) {
      return m;
    }
    if ("loaded" !== m._state) {
      return m._queue.push({event:"orientation", action:function() {
        m.orientation(b, d, g, h);
      }}), m;
    }
    if (d = "number" != typeof d ? m._orientation[1] : d, g = "number" != typeof g ? m._orientation[2] : g, void 0 === h) {
      if ("number" != typeof b) {
        return m._orientation;
      }
      m._orientation = [b, d, g];
    }
    for (var q = m._getSoundIds(h), r = 0; r < q.length; r++) {
      var t = m._soundById(q[r]);
      if (t) {
        if ("number" != typeof b) {
          return t._orientation;
        }
        t._orientation = [b, d, g];
        t._node && (t._panner || (t._pos || (t._pos = m._pos || [0, 0, -.5]), a(t, "spatial")), void 0 !== t._panner.orientationX ? (t._panner.orientationX.setValueAtTime(b, Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(d, Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(g, Howler.ctx.currentTime)) : t._panner.setOrientation(b, d, g));
        m._emit("orientation", t._id);
      }
    }
    return m;
  };
  Howl.prototype.pannerAttr = function() {
    var b, d, g = arguments;
    if (!this._webAudio) {
      return this;
    }
    if (0 === g.length) {
      return this._pannerAttr;
    }
    if (1 === g.length) {
      if ("object" != typeof g[0]) {
        return d = this._soundById(parseInt(g[0], 10)), d ? d._pannerAttr : this._pannerAttr;
      }
      var h = g[0];
      void 0 === b && (h.pannerAttr || (h.pannerAttr = {coneInnerAngle:h.coneInnerAngle, coneOuterAngle:h.coneOuterAngle, coneOuterGain:h.coneOuterGain, distanceModel:h.distanceModel, maxDistance:h.maxDistance, refDistance:h.refDistance, rolloffFactor:h.rolloffFactor, panningModel:h.panningModel}), this._pannerAttr = {coneInnerAngle:void 0 !== h.pannerAttr.coneInnerAngle ? h.pannerAttr.coneInnerAngle : this._coneInnerAngle, coneOuterAngle:void 0 !== h.pannerAttr.coneOuterAngle ? h.pannerAttr.coneOuterAngle : 
      this._coneOuterAngle, coneOuterGain:void 0 !== h.pannerAttr.coneOuterGain ? h.pannerAttr.coneOuterGain : this._coneOuterGain, distanceModel:void 0 !== h.pannerAttr.distanceModel ? h.pannerAttr.distanceModel : this._distanceModel, maxDistance:void 0 !== h.pannerAttr.maxDistance ? h.pannerAttr.maxDistance : this._maxDistance, refDistance:void 0 !== h.pannerAttr.refDistance ? h.pannerAttr.refDistance : this._refDistance, rolloffFactor:void 0 !== h.pannerAttr.rolloffFactor ? h.pannerAttr.rolloffFactor : 
      this._rolloffFactor, panningModel:void 0 !== h.pannerAttr.panningModel ? h.pannerAttr.panningModel : this._panningModel});
    } else {
      2 === g.length && (h = g[0], b = parseInt(g[1], 10));
    }
    b = this._getSoundIds(b);
    for (g = 0; g < b.length; g++) {
      if (d = this._soundById(b[g])) {
        var m = d._pannerAttr;
        m = {coneInnerAngle:void 0 !== h.coneInnerAngle ? h.coneInnerAngle : m.coneInnerAngle, coneOuterAngle:void 0 !== h.coneOuterAngle ? h.coneOuterAngle : m.coneOuterAngle, coneOuterGain:void 0 !== h.coneOuterGain ? h.coneOuterGain : m.coneOuterGain, distanceModel:void 0 !== h.distanceModel ? h.distanceModel : m.distanceModel, maxDistance:void 0 !== h.maxDistance ? h.maxDistance : m.maxDistance, refDistance:void 0 !== h.refDistance ? h.refDistance : m.refDistance, rolloffFactor:void 0 !== h.rolloffFactor ? 
        h.rolloffFactor : m.rolloffFactor, panningModel:void 0 !== h.panningModel ? h.panningModel : m.panningModel};
        var q = d._panner;
        q ? (q.coneInnerAngle = m.coneInnerAngle, q.coneOuterAngle = m.coneOuterAngle, q.coneOuterGain = m.coneOuterGain, q.distanceModel = m.distanceModel, q.maxDistance = m.maxDistance, q.refDistance = m.refDistance, q.rolloffFactor = m.rolloffFactor, q.panningModel = m.panningModel) : (d._pos || (d._pos = this._pos || [0, 0, -.5]), a(d, "spatial"));
      }
    }
    return this;
  };
  Sound.prototype.init = function(b) {
    return function() {
      var d = this._parent;
      this._orientation = d._orientation;
      this._stereo = d._stereo;
      this._pos = d._pos;
      this._pannerAttr = d._pannerAttr;
      b.call(this);
      this._stereo ? d.stereo(this._stereo) : this._pos && d.pos(this._pos[0], this._pos[1], this._pos[2], this._id);
    };
  }(Sound.prototype.init);
  Sound.prototype.reset = function(b) {
    return function() {
      var d = this._parent;
      return this._orientation = d._orientation, this._stereo = d._stereo, this._pos = d._pos, this._pannerAttr = d._pannerAttr, this._stereo ? d.stereo(this._stereo) : this._pos ? d.pos(this._pos[0], this._pos[1], this._pos[2], this._id) : this._panner && (this._panner.disconnect(0), this._panner = void 0, d._refreshBuffer(this)), b.call(this);
    };
  }(Sound.prototype.reset);
  var a = function(b, d) {
    "spatial" === (d || "spatial") ? (b._panner = Howler.ctx.createPanner(), b._panner.coneInnerAngle = b._pannerAttr.coneInnerAngle, b._panner.coneOuterAngle = b._pannerAttr.coneOuterAngle, b._panner.coneOuterGain = b._pannerAttr.coneOuterGain, b._panner.distanceModel = b._pannerAttr.distanceModel, b._panner.maxDistance = b._pannerAttr.maxDistance, b._panner.refDistance = b._pannerAttr.refDistance, b._panner.rolloffFactor = b._pannerAttr.rolloffFactor, b._panner.panningModel = b._pannerAttr.panningModel, 
    void 0 !== b._panner.positionX ? (b._panner.positionX.setValueAtTime(b._pos[0], Howler.ctx.currentTime), b._panner.positionY.setValueAtTime(b._pos[1], Howler.ctx.currentTime), b._panner.positionZ.setValueAtTime(b._pos[2], Howler.ctx.currentTime)) : b._panner.setPosition(b._pos[0], b._pos[1], b._pos[2]), void 0 !== b._panner.orientationX ? (b._panner.orientationX.setValueAtTime(b._orientation[0], Howler.ctx.currentTime), b._panner.orientationY.setValueAtTime(b._orientation[1], Howler.ctx.currentTime), 
    b._panner.orientationZ.setValueAtTime(b._orientation[2], Howler.ctx.currentTime)) : b._panner.setOrientation(b._orientation[0], b._orientation[1], b._orientation[2])) : (b._panner = Howler.ctx.createStereoPanner(), b._panner.pan.setValueAtTime(b._stereo, Howler.ctx.currentTime));
    b._panner.connect(b._node);
    b._paused || b._parent.pause(b._id, !0).play(b._id, !0);
  };
}();

