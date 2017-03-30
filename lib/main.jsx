const Board = require('./board');
const Game = require('./game');
const Timer = require('./timer');

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
