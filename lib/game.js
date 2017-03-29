class Game {
  constructor(canvas) {
    this.canvas = canvas;
    //check to see if we are running in a browser with touch support
    this.stage = new createjs.Stage(this.canvas);

  }

  play() {
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,200,200,10,10,10,10);
    this.stage.setChildIndex( roundRect, this.stage.getNumChildren()-1);
    this.stage.update();
  }

  evaluateGuess() {
    const answer = document.getElementById("answer").value;
    if (answer === 'Thomas Jefferson' || answer === 'Jefferson') {
      this.displayWin();
    }
  }

  displayWin() {
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,100,200,200,10,10,10,10);
    this.stage.setChildIndex( roundRect, this.stage.getNumChildren()-1);
    this.stage.update();
  }

}
module.exports = Game;
