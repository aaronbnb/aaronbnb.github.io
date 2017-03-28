
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);
  const circle = new createjs.Shape();
  stage.enableMouseOver(20);
  stage.mouseMoveOutside = true; // keep tracking the mouse even //when it leaves the canvas
  stage.mouseInBounds = true;

  circle.graphics.beginFill("DeepSkyBlue").drawCircle(100, 100, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
});
