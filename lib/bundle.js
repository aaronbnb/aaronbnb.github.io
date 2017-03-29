/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById("testCanvas");
	  const game = new Game();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.canvas = document.getElementById("testCanvas");
	    //check to see if we are running in a browser with touch support
	    this.stage = new createjs.Stage(this.canvas);
	    var circle = new createjs.Shape();
	    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	    circle.x = 100;
	    circle.y = 100;
	    this.stage.addChild(circle);
	  }
	//     this.mouseTarget;	// the display object currently under the mouse, or being dragged
	//     this.dragStarted;	// indicates whether we are currently in a drag operation
	//     this.offset;
	//     this.update = true;
	//     this.canvas = document.getElementById("testCanvas");
	//     //check to see if we are running in a browser with touch support
	//     this.stage = new createjs.Stage(this.canvas);
	//     // enable touch interactions if supported on the current device:
	//     createjs.Touch.enable(this.stage);
	//     // enabled mouse over / out events
	//     stage.enableMouseOver(10);
	//     stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
	//     // load the source image:
	//     var image = new Image();
	//     image.src = "./book.png";
	//
	//     const container = new createjs.Container();
	//
	//     var roundRect = new createjs.Shape();
	//     roundRect.graphics.beginStroke("black").drawRoundRect(150,150,100,100,0,0,5,5);
	//     stage.addChild(roundRect);
	//     const hints = ["Said in 1776", "He owned slaves", "From Virginia"]
	//     for (var i = 0; i < 3; i++) {
	//       text = new createjs.Text();
	//       text.font = "20px Arial";
	//       text.x = canvas.width * Math.random() | 0;
	//       text.y = canvas.height * Math.random() | 0;
	//       text.text = hints[i];
	//       stage.addChild(text);
	//     }
	//
	//
	//
	//     stage.addChild(container);
	//
	//     for (var i = 0; i < 10; i++) {
	//       bitmap = new createjs.Bitmap(image);
	//       container.addChild(bitmap);
	//       bitmap.x = canvas.width * Math.random() | 0;
	//       bitmap.y = canvas.height * Math.random() | 0;
	//       bitmap.rotation = 360 * Math.random() | 0;
	//       bitmap.regX = bitmap.image.width / 2 | 0;
	//       bitmap.regY = bitmap.image.height / 2 | 0;
	//       bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
	//       bitmap.name = "bmp_" + i;
	//       bitmap.cursor = "pointer";
	//       // assign the hit area:
	//       // bitmap.hitArea = hitArea;
	//       bitmap.addEventListener("mousedown", function (evt) {
	//         // bump the target in front of its siblings:
	//         var o = evt.target;
	//         o.parent.addChild(o);
	//         o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
	//       });
	//       // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	//       bitmap.addEventListener("pressmove", function (evt) {
	//         var o = evt.target;
	//         o.x = evt.stageX + o.offset.x;
	//         o.y = evt.stageY + o.offset.y;
	//         // indicate that the stage should be updated on the next tick:
	//         update = true;
	//       });
	//       bitmap.addEventListener("rollover", function (evt) {
	//         var o = evt.target;
	//         o.scaleX = o.scaleY = o.scale * 1.2;
	//         update = true;
	//       });
	//       bitmap.addEventListener("rollout", function (evt) {
	//         var o = evt.target;
	//         o.scaleX = o.scaleY = o.scale;
	//         update = true;
	//       });
	//     }
	//     createjs.Ticker.addEventListener("tick", tick);
	//   }
	//
	//
	// stop() {
	//   createjs.Ticker.removeEventListener("tick", tick);
	// }
	//
	// tick(event) {
	//   // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	//   if (update) {
	//     update = false; // only update once
	//     stage.update(event);
	//   }
	// }
	
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map