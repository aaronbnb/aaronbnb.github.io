class Board {
  constructor() {
    this.canvas = document.getElementById('testCanvas');
    // create stage and point it to the canvas:
    this.stage = new createjs.Stage('testCanvas');
    this.reaction;
  	this.mouseTarget;	// the display object currently under the mouse, or being dragged
  	this.dragStarted;	// indicates whether we are currently in a drag operation
  	this.offset;
  	this.update = true;

	  createjs.Touch.enable(this.stage);
	// enabled mouse over / out events
		this.stage.enableMouseOver(10);
		this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
	// load the source image:
		this.image = new Image();
		this.image.src = "./book.png";
  }

  setUpRound(round, hints) {
		const container = new createjs.Container();
		  for (var i = 0; i < 3; i++) {
			  let text = new createjs.Text();
  			text.font = "20px Arial";
  			text.x = this.canvas.width * Math.random() | 0;
  			text.y = this.canvas.height * Math.random() | 0;
  			text.text = hints[round][i];
  			this.stage.addChild(text);
		  }
      this.stage.update();
    this.stage.addChild(container);

  	for (var i = 0; i < 30; i++) {
  		let bitmap = new createjs.Bitmap(this.image);
  		container.addChild(bitmap);
  		bitmap.x = .9 * this.canvas.width * Math.random() | 0;
  		bitmap.y = .9 * this.canvas.height * Math.random() | 0;
  		bitmap.rotation = 360 * Math.random() | 0;
  		bitmap.regX = bitmap.image.width / 2 | 0;
  		bitmap.regY = bitmap.image.height / 2 | 0;
  		bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
  		bitmap.name = "bmp_" + i;
  		bitmap.cursor = "pointer";
  		// assign the hit area:
  		// bitmap.hitArea = hitArea;
  		bitmap.addEventListener("mousedown", function (evt) {
  			// bump the target in front of its siblings:
  			var o = evt.target;
  			o.parent.addChild(o);
  			o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
  		}.bind(this));
  		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
  		bitmap.addEventListener("pressmove", function (evt) {
  			var o = evt.target;
  			o.x = evt.stageX + o.offset.x;
  			o.y = evt.stageY + o.offset.y;
  			// indicate that the stage should be updated on the next tick:
  			this.update = true;
  		}.bind(this));
  		bitmap.addEventListener("rollover", function (evt) {
  			var o = evt.target;
  			o.scaleX = o.scaleY = o.scale * 1.2;
  			this.update = true;
  		}.bind(this));
  		bitmap.addEventListener("rollout", function (evt) {
  			var o = evt.target;
  			o.scaleX = o.scaleY = o.scale;
  			this.update = true;
  		}.bind(this));
  	}
    this.stage.update();
  	createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  }

  stop() {
	   createjs.Ticker.removeEventListener("tick", this.tick.bind(this));
  }
//
  tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	  if (this.update) {
		  this.update = false; // only update once
		  this.stage.update(event);
	  }
  }

  displayWin(speaker) {
    this.reaction = new createjs.Container();
    let winText = new createjs.Text();
    winText.font = "20px Arial";
    winText.x = 245;
    winText.y = 310;
    winText.color = "#FFFFFF";
    winText.text = `You're right. ${speaker} said it.\n\nPress enter for next round`;

    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(240,300,420,100,10,10,10,10);
    this.reaction.addChild(roundRect);
    this.reaction.addChild(winText);
    // container.addChild(enterText);
    this.stage.addChild(this.reaction);
    this.stage.update();
    if (this.update) {
      this.update = false; // only update once
    }
    //
  }

  incorrectGuess() {
    this.reaction = new createjs.Container();
    let winText = new createjs.Text();
    winText.font = "20px Arial";
    winText.x = 255;
    winText.y = 325;
    winText.color = "#FFFFFF";
    winText.text = "You're incorrect\n\nKeep guessing or press enter for next round";


    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(240,300,420,100,10,10,10,10);
    this.reaction.addChild(roundRect);
    this.reaction.addChild(winText);
    // container.addChild(enterText);
    this.stage.addChild(this.reaction);
    this.stage.update();
    if (this.update) {
      this.update = false; // only update once
    }
  }

  displayQuote(round) {
    const quoteContainer = new createjs.Container();
    let quote = new createjs.Text();
    quote.font = "20px Arial";
    quote.x = 110;
    quote.y = 125;
    quote.color = "#FFFFFF";
    quote.text = this.quotes[round];
    var roundRect = new createjs.Shape();
    roundRect.graphics.beginFill("black").drawRoundRect(100,50,500,100,10,10,10,10);
    quoteContainer.addChild(roundRect);
    quoteContainer.addChild(quote);
    // container.addChild(enterText);
    this.stage.addChild(quoteContainer);
    this.stage.update();
  }
}
module.exports = Board;
