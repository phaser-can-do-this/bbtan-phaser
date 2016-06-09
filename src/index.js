import GameState from './states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(500,800, Phaser.CANVAS, 'content', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

window.game = new Game();
