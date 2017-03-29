
class Game {
  constructor() {
    //check to see if we are running in a browser with touch support
    this.canvas = document.getElementById('answerField');
    // create stage and point it to the canvas:
    this.stage = new createjs.Stage('answerField');
    this.answer = document.getElementById("answer");
    this.answer.onchange = this.evaluateGuess.bind(this);
  }

  play() {
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,200,200,10,10,10,10);
    this.stage.setChildIndex( roundRect, this.stage.getNumChildren()-1);
    this.stage.update();
    this.evaluateGuess();
  }

  evaluateGuess() {
    debugger;
    if (this.answer === 'Thomas Jefferson' || this.answer === 'Jefferson') {
      this.displayWin();
    }
    debugger;
  }

  displayWin() {
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,200,200,10,10,10,10);
    this.stage.setChildIndex( roundRect, this.stage.getNumChildren()-1);
    this.stage.update();
  }

}
module.exports = Game;
