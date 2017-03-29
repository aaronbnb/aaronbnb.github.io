const spaget = () => console.log('spaghet');
const Board = require('./board');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  window.spaget = spaget;
  let board = new Board();
  board.setUpRound();
  window.canvas = document.getElementById('testCanvas');
  window.makeCircle = board.makeCircle.bind(board);
  window.stage = board.stage;
  // init();
});
