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
    this.round = 0;
    this.hints = [
      ["Known as the Great One", "Canadian Hockey Player", "His daughter Paulina!"],
      ["Senator from Massachusetts", "Face of the 1960s", "Captained PT109"],
      ["British Prime Minister", "World War II Leader", "Pudgy face"],
      ["Born in Stratford-upon-Avon", "Wrote 38 plays", "The GOAT of Theater"],
      ["Has self-titled $700 sneakers", "College Dropout...was he?", "Kim Kardashian's hubby"]

    ];
    this.answers = [
    "Wayne Gretzky",
    "John Kennedy",
    "Winston Churchill",
    "William Shakespeare",
    "Kanye West"

                    ];
    this.quotes = [
      "You miss 100% of the shots you don't take",
      "My fellow Americans, ask not what your country can \n\n"
      + "do for you, ask what you can do for your country",
      "He has all the virtues I dislike and none of the vices \n\n"
      + "I admire.",
      "All the world's a stage, and all the men and women merely players\n\n"
      + "they have their exits and their entrances; and one man in his time plays many parts",
      "Life is like a box of chocolate, my momma told go to school and get my doctorate"
    ];
    // this.board.displayQuote();
    this.score = 0;
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
    // this.gameStart = () => {
    //   this.stage.removeChild(instructionsContainer);
    //   this.stage.update();
    //   this.play();
    // };

    this.canvas.onmousedown = function(e) {
      this.stage.removeChild(instructionsContainer);
      this.stage.update();
      this.timer.startTimer();
      this.play();
    }.bind(this);

  }

  play() {
    if(this.round === 5) {
      this.displayScoreCard();
      return;
    }
    this.canvas.onmousedown = null;
    this.board.setUpRound(this.round, this.hints[this.round]);
    this.displayQuote(this.round);
    this.answer.onkeydown = function(e) {
      if (e.keyCode === 13) {
        this.stage.removeAllChildren();
        this.stage.update();
        this.round += 1;
        this.play();
      }
    }.bind(this);
  }

  displayQuote() {
    const quoteContainer = new createjs.Container();
    let quote = new createjs.Text();
    quote.font = "20px Arial";
    quote.x = 210;
    quote.y = 80;
    quote.color = "#FFFFFF";
    quote.text = this.quotes[this.round];
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,70,500,100,10,10,10,10);
    quoteContainer.addChild(roundRect);
    quoteContainer.addChild(quote);
    // container.addChild(enterText);
    this.stage.addChild(quoteContainer);
    this.stage.update();
  }

  evaluateGuess(e) {
    e.preventDefault();
    if (this.answer.value.toLowerCase() === (this.answers[this.round]).toLowerCase() ||
        this.answer.value.toLowerCase() === (this.answers[this.round].split(" ")[1]).toLowerCase()) {
        this.board.displayWin(this.answers[this.round]);
        this.score += 1;
        this.answer.value = "";
    }
    else {
      this.board.incorrectGuess();
    }
  }

  displayScoreCard() {
    const scoreContainer = new createjs.Container();
    let score = new createjs.Text();
    score.font = "20px Arial";
    score.x = 210;
    score.y = 80;
    score.color = "#FFFFFF";
    score.text = `You scored ${this.score} points`;
    if(this.score >= 4) {
      score.text = score.text + "!\n\nThat's really good. You don't need to hit the books."
      + "\n\nOr actually, you probably already did in the past";
    } else if (this.score >= 2){
      score.text = score.text + "\n\nThat's mediocre. Be better than mediocre.\n\n"
      + "Pick up a book, not just Facebook. Sorry for preachiness.";
    } else if (this.score === 1){
      score.text = score.text + "\n\nUmmm...c'mon, did you really try?"
    } else {
      score.text = score.text + "\n\nC'mon, you didn't know the JFK one?"
    }
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(200,50,500,350,10,10,10,10);
    scoreContainer.addChild(roundRect);
    scoreContainer.addChild(score);
    // container.addChild(enterText);
    this.stage.addChild(scoreContainer);
    this.stage.update();
  }


}
module.exports = Game;
