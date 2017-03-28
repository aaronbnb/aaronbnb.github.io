const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});

// function init() {
//   // code here.
//   var stage = new createjs.Stage("demoCanvas");
//   var circle = new createjs.Shape();
//   circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
//   circle.x = 100;
//   circle.y = 100;
//   stage.addChild(circle);
//   stage.update();
// }
