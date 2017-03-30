const Timer = require('./timer');

class Game {
  constructor(board, timer) {
    //check to see if we are running in a browser with touch support
    // create stage and point it to the canvas:
    this.board = board;
    this.stage = this.board.stage;
    this.answer = document.getElementById("answer");
    this.canvas = document.getElementById('testCanvas');
    this.timer = timer;
    // this.board.displayQuote();
    this.score = 0;
    this.answers = ["George Washington", "Thomas Jefferson"];
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

    this.canvas.onmousedown = function(e) {
      this.stage.removeChild(instructionsContainer);
      this.stage.update();
      this.displayQuote();
    }.bind(this);
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
