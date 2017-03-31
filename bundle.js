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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.canvas = document.getElementById('testCanvas');
    // create stage and point it to the canvas:
    this.stage = new createjs.Stage('testCanvas');
    this.reaction;
  	this.mouseTarget;	// the display object currently under the mouse, or being dragged
  	this.dragStarted;	// indicates whether we are currently in a drag operation
  	this.offset;
  	this.update = true;

	  createjs.Touch.enable(this.stage);
	// enabled mouse over / out events
		this.stage.enableMouseOver(10);
		this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
	// load the source image:
		this.image = new Image();
		this.image.src = "./book.png";
  }

  setUpRound(round, hints) {
		const container = new createjs.Container();
		  for (var i = 0; i < 3; i++) {
			  let text = new createjs.Text();
  			text.font = "18px Arial";
  			text.x = this.canvas.width * Math.random() | 0;
  			text.y = this.canvas.height * Math.random() | 0;
  			text.text = hints[i];
  			this.stage.addChild(text);
		  }
      this.stage.update();
    this.stage.addChild(container);

  	for (var i = 0; i < 30; i++) {
  		let bitmap = new createjs.Bitmap(this.image);
  		container.addChild(bitmap);
  		bitmap.x = .9 * this.canvas.width * Math.random() | 0;
  		bitmap.y = .9 * this.canvas.height * Math.random() | 0;
  		bitmap.rotation = 360 * Math.random() | 0;
  		bitmap.regX = bitmap.image.width / 2 | 0;
  		bitmap.regY = bitmap.image.height / 2 | 0;
  		bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
  		bitmap.name = "bmp_" + i;
  		bitmap.cursor = "pointer";
  		// assign the hit area:
  		// bitmap.hitArea = hitArea;
  		bitmap.addEventListener("mousedown", function (evt) {
  			// bump the target in front of its siblings:
  			var o = evt.target;
  			o.parent.addChild(o);
  			o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
  		}.bind(this));
  		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  		bitmap.addEventListener("pressmove", function (evt) {
  			var o = evt.target;
  			o.x = evt.stageX + o.offset.x;
  			o.y = evt.stageY + o.offset.y;
  			// indicate that the stage should be updated on the next tick:
  			this.update = true;
  		}.bind(this));
  		bitmap.addEventListener("rollover", function (evt) {
  			var o = evt.target;
  			o.scaleX = o.scaleY = o.scale * 1.2;
  			this.update = true;
  		}.bind(this));
  		bitmap.addEventListener("rollout", function (evt) {
  			var o = evt.target;
  			o.scaleX = o.scaleY = o.scale;
  			this.update = true;
  		}.bind(this));
  	}
    this.stage.update();
  	createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  }

  stop() {
	   createjs.Ticker.removeEventListener("tick", this.tick.bind(this));
  }
//
  tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	  if (this.update) {
		  this.update = false; // only update once
		  this.stage.update(event);
	  }
  }

  displayWin(speaker) {
    this.reaction = new createjs.Container();
    let winText = new createjs.Text();
    winText.font = "20px Arial";
    winText.x = 245;
    winText.y = 310;
    winText.color = "#FFFFFF";
    winText.text = `You're right. ${speaker} said it.\n\nPress enter for next round`;

    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(240,300,420,100,10,10,10,10);
    this.reaction.addChild(roundRect);
    this.reaction.addChild(winText);
    // container.addChild(enterText);
    this.stage.addChild(this.reaction);
    this.stage.update();
    if (this.update) {
      this.update = false; // only update once
    }
    //
  }

  incorrectGuess() {
    this.reaction = new createjs.Container();
    let winText = new createjs.Text();
    winText.font = "20px Arial";
    winText.x = 255;
    winText.y = 325;
    winText.color = "#FFFFFF";
    winText.text = "You're incorrect\n\nKeep guessing or press enter for next round";


    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(240,300,420,100,10,10,10,10);
    this.reaction.addChild(roundRect);
    this.reaction.addChild(winText);
    // container.addChild(enterText);
    this.stage.addChild(this.reaction);
    this.stage.update();
    if (this.update) {
      this.update = false; // only update once
    }
  }

  displayQuote(round) {
    const quoteContainer = new createjs.Container();
    let quote = new createjs.Text();
    quote.font = "20px Arial";
    quote.x = 110;
    quote.y = 125;
    quote.color = "#FFFFFF";
    quote.text = this.quotes[round];
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(100,50,500,100,10,10,10,10);
    quoteContainer.addChild(roundRect);
    quoteContainer.addChild(quote);
    // container.addChild(enterText);
    this.stage.addChild(quoteContainer);
    this.stage.update();
  }
}
module.exports = Board;


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

const Timer = __webpack_require__(35);

class Game {
  constructor(board, timer) {
    //check to see if we are running in a browser with touch support
    // create stage and point it to the canvas:
    this.board = board;
    this.stage = this.board.stage;
    this.answer = document.getElementById("answer");
    this.canvas = document.getElementById('testCanvas');
    this.timer = timer;
    this.round = 0;
    this.hints = [
      ["Known as the Great One", "Canadian Hockey Player", "His daughter Paulina!"],
      ["Senator from Massachusetts", "Face of the 1960s", "Captained PT109"],
      ["British Prime Minister", "World War II Leader", "Pudgy face"],
      ["Born in Stratford-upon-Avon", "Wrote 38 plays", "The GOAT of Theater"],
      ["Has self-titled $700 sneakers", "College Dropout...was he?", "Kim Kardashian's hubby"]

    ];
    this.answers = [
    "Wayne Gretzky",
    "John Kennedy",
    "Winston Churchill",
    "William Shakespeare",
    "Kanye West"

                    ];
    this.quotes = [
      "You miss 100% of the shots you don't take",
      "My fellow Americans, ask not what your country can \n\n"
      + "do for you, ask what you can do for your country",
      "He has all the virtues I dislike and none of the vices \n\n"
      + "I admire.",
      "All the world's a stage, and all the men and women merely players\n\n"
      + "they have their exits and their entrances; and one man in his time plays many parts",
      "Life is like a box of chocolate, my momma told go to school and get my doctorate"
    ];
    // this.board.displayQuote();
    this.score = 0;
    this.answer.oninput=this.evaluateGuess.bind(this);

  }

  displayQuote() {
    this.board.displayQuote();
  }

  showTitle() {
    const titleContainer = new createjs.Container();
    let title = new createjs.Text();
    title.font = "20px Arial";
    title.x = 210;
    title.y = 125;
    title.color = "#FFFFFF";
    title.text = "Press any key or click the mouse\n\nBasically do anything to play!";
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("#aaaaaa").drawRoundRect(200,100,500,300,10,10,10,10);
    titleContainer.addChild(roundRect);
    titleContainer.addChild(title);
    // container.addChild(enterText);
    this.stage.addChild(titleContainer);
    this.stage.update();

    this.canvas.onmousedown = function(e) {
      this.stage.removeChild(titleContainer);
      this.stage.update();
      this.displayInstructions();
    }.bind(this);
  }

  displayInstructions() {
    const instructionsContainer = new createjs.Container();
    let instructions = new createjs.Text();
    instructions.font = "20px Arial";
    instructions.x = 210;
    instructions.y = 125;
    instructions.color = "#FFFFFF";
    instructions.text = "Here's how it works...\n\n" +
    "We'll give you a quote. Type in the speaker.\n\n" +
    "We'll be generous. Last name is good enough.\n\n" +
    "If you don't know, move the books to reveal hints";
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,500,300,10,10,10,10);
    instructionsContainer.addChild(roundRect);
    instructionsContainer.addChild(instructions);
    // container.addChild(enterText);
    this.stage.addChild(instructionsContainer);
    this.stage.update();
    // this.gameStart = () => {
    //   this.stage.removeChild(instructionsContainer);
    //   this.stage.update();
    //   this.play();
    // };

    this.canvas.onmousedown = function(e) {
      this.stage.removeChild(instructionsContainer);
      this.stage.update();
      this.timer.startTimer();
      this.play();
    }.bind(this);

  }

  play() {
    if(this.round === 5) {
      this.displayScoreCard();
      return;
    }
    this.canvas.onmousedown = null;
    this.board.setUpRound(this.round, this.hints[this.round]);
    this.displayQuote(this.round);
    this.answer.onkeydown = function(e) {
      if (e.keyCode === 13) {
        this.stage.removeAllChildren();
        this.stage.update();
        this.round += 1;
        this.play();
      }
    }.bind(this);
  }

  displayQuote() {
    const quoteContainer = new createjs.Container();
    let quote = new createjs.Text();
    quote.font = "20px Arial";
    quote.x = 210;
    quote.y = 80;
    quote.color = "#FFFFFF";
    quote.text = this.quotes[this.round];
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,70,500,100,10,10,10,10);
    quoteContainer.addChild(roundRect);
    quoteContainer.addChild(quote);
    // container.addChild(enterText);
    this.stage.addChild(quoteContainer);
    this.stage.update();
  }

  evaluateGuess(e) {
    e.preventDefault();
    if (this.answer.value.toLowerCase() === (this.answers[this.round]).toLowerCase() ||
        this.answer.value.toLowerCase() === (this.answers[this.round].split(" ")[1]).toLowerCase()) {
        this.board.displayWin(this.answers[this.round]);
        this.score += 1;
        this.answer.value = "";
    }
    else {
      this.board.incorrectGuess();
    }
  }

  displayScoreCard() {
    const scoreContainer = new createjs.Container();
    let score = new createjs.Text();
    score.font = "20px Arial";
    score.x = 210;
    score.y = 80;
    score.color = "#FFFFFF";
    score.text = `You scored ${this.score} points`;
    if(this.score >= 4) {
      score.text = score.text + "!\n\nThat's really good. You don't need to hit the books."
      + "\n\nOr actually, you probably already did in the past";
    } else if (this.score >= 2){
      score.text = score.text + "\n\nThat's mediocre. Be better than mediocre.\n\n"
      + "Pick up a book, not just Facebook. Sorry for preachiness.";
    } else if (this.score === 1){
      score.text = score.text + "\n\nUmmm...c'mon, did you really try?"
    } else {
      score.text = score.text + "\n\nC'mon, you didn't know the JFK one?"
    }
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,50,500,350,10,10,10,10);
    scoreContainer.addChild(roundRect);
    scoreContainer.addChild(score);
    // container.addChild(enterText);
    this.stage.addChild(scoreContainer);
    this.stage.update();
  }


}
module.exports = Game;


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);
const Game = __webpack_require__(1);
const Timer = __webpack_require__(35);

document.addEventListener('DOMContentLoaded', () => {
  window.scroll(0, 300);
  let board = new Board();
  let timer = new Timer(50);
  let game = new Game(board, timer);

  // game.showTitle();
    game.showTitle();
  // game.play();
  window.canvas = document.getElementById('testCanvas');
  window.stage = board.stage;
  // init();
});


/***/ }),

/***/ 35:
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/aaronfarber/aaronbnb.github.io/lib/timer.js Unexpected token (63:0)\nYou may need an appropriate loader to handle this file type.\n| // }\n| \n| module.exports = Timer;\n| ");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map