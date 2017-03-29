
class Game {
  constructor(board) {
    //check to see if we are running in a browser with touch support
    // create stage and point it to the canvas:
    this.board = board;
    this.stage = this.board.stage;
    this.answer = document.getElementById("answer");
    this.answer.onchange = this.evaluateGuess.bind(this);
  }

  play() {
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,200,200,10,10,10,10);
    this.stage.setChildIndex( roundRect, this.stage.getNumChildren()-1);
    this.stage.addChild(roundRect);
    this.stage.update();
  }

  evaluateGuess() {
    if (this.answer.value === 'Thomas Jefferson' || this.answer.value === 'Jefferson') {
      this.board.displayWin();
      Ticker.TIMEOUT(5000);
    }
  }


}
module.exports = Game;
