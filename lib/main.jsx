const Board = require('./board');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  let game = new Game();
  board.setUpRound();
  game.play();
  window.canvas = document.getElementById('testCanvas');
  window.stage = board.stage;
  // init();
});
