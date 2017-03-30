
class Game {
  constructor(board) {
    //check to see if we are running in a browser with touch support
    // create stage and point it to the canvas:
    this.board = board;
    this.stage = this.board.stage;
    this.answer = document.getElementById("answer");
    // this.board.displayQuote();
    this.score = 0;
    this.answers = ["George Washington", "Thomas Jefferson"];
    this.answer.oninput=this.evaluateGuess.bind(this);
  }

  displayQuote() {
    this.board.displayQuote();
  }

  play() {
    let i = 0;
    while (i < 5) {
      this.board.displayHints();
      this.board.coverHints();
      this.board.displayQuote();
      this.evaluateGuess;
    }
  }

  evaluateGuess(e) {
    e.preventDefault();
    this.displayQuote();
    if (this.answer.value === 'Thomas Jefferson' || this.answer.value === 'Jefferson') {
      this.board.displayWin();
    } else {
      this.board.incorrectGuess();
    }
  }


}
module.exports = Game;
