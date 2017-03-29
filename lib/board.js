class Board {
  constructor() {
    this.canvas = document.getElementById('testCanvas');
    // create stage and point it to the canvas:
    this.stage = new createjs.Stage('testCanvas');
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
		this.image.src = "./../book.png";
  }

  setUpRound() {
		const container = new createjs.Container();
		var roundRect = new createjs.Shape();
		roundRect.graphics.beginStroke("black").drawRoundRect(150,150,100,100,0,0,5,5);
		this.stage.addChild(roundRect);
		const hints = ["Said in 1776", "He owned slaves", "From Virginia"]
		  for (var i = 0; i < 3; i++) {
			  let text = new createjs.Text();
  			text.font = "20px Arial";
  			text.x = this.canvas.width * Math.random() | 0;
  			text.y = this.canvas.height * Math.random() | 0;
  			text.text = hints[i];
  			this.stage.addChild(text);
		  }
      this.stage.update();
    this.stage.addChild(container);

  	for (var i = 0; i < 10; i++) {
  		let bitmap = new createjs.Bitmap(this.image);
  		container.addChild(bitmap);
  		bitmap.x = this.canvas.width * Math.random() | 0;
  		bitmap.y = this.canvas.height * Math.random() | 0;
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
}
module.exports = Board;
