class Board {
  constructor(game, ctx) {
    this.init();
  }

  init() {
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(300, 300, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
  }
}
