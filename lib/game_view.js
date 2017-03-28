class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();

    this.render();
  }

  render() {
    
  }
}

module.exports = GameView;
