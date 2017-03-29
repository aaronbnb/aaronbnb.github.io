const Board = require('./board');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  board.setUpRound();
  board.populateBoard();
  window.canvas = document.getElementById('testCanvas');
  window.stage = board.stage;
  // init();
});
