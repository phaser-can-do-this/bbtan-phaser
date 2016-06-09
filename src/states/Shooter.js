import Ball from './objects/Ball'

class Shooter extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'ball')
    this.scale.setTo(0.1,0.1)

    this.nBalls = 10

    this.balls = game.add.group()
    this.balls = game.add.group()
    for (let i = 0; i < 200; i++) {
      var ball = new Ball(game, 0, 0);
      game.physics.arcade.enable(ball)
      ball.body.collideWorldBounds = true;
      ball.body.bounce.set(1);
      this.balls.add(ball)
      ball.kill()
    }
  }

  shoot(from, to) {
    var speed = Phaser.Point.subtract(to, from)
      .normalize()
      .setMagnitude(800)

    var b = this.balls.getFirstDead()
    b.revive()
    b.position.setTo(from.x, from.y)
    b.body.velocity.setTo(speed.x, speed.y)

    if (this.nBalls > 1) {
      game.time.events.repeat(200, this.nBalls - 1, ()=> {
        b = this.balls.getFirstDead()
        b.revive()
        b.position.setTo(from.x, from.y)
        b.body.velocity.setTo(speed.x, speed.y)
      })
    }
  }
}

export default Shooter