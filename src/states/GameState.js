import Brick from './objects/Brick'

import Shooter from './Shooter'


class GameState extends Phaser.State {

  preload() {
    this.load.image('heads', '../res/headers.png')
    this.load.image('feet', '../res/feet.png')
    this.load.image('frame', '../res/frame.png')
    this.load.image('line', '../res/line.png')
    this.load.image('brick', '../res/brick.png')
    this.load.image('ball', '../res/ball_1.png')
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  }

  create() {

    this.haveNBalls = this.needNBalls = 0
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.initGameBoard();

    this.nextShootingPoint = new Phaser.Point(this.world.centerX, this.boardBottom)

    this.shooter = new Shooter(this, this.nextShootingPoint.x, this.nextShootingPoint.y)
    this.world.add(this.shooter)

    this.bricks = this.add.group()
    for (let i = 0; i < 50; i++) {
      let brick = new Brick(this, 0, 0, 1, 0xff0000)
      this.physics.arcade.enable(brick)

      brick.body.immovable = true
      brick.kill()
      this.bricks.add(brick)
    }

    var gridSize = 70;
    var rowMax = 2, colMax = 6;
    var xOffset = 5
    for (let row = 1; row < rowMax; row++) {
      for (let i = 0; i < colMax; i++) {
        let brick = this.bricks.getFirstDead()
        brick.reset(xOffset + i * gridSize, 86 + row * gridSize,
          10, 0xff0000);
      }
    }

    this.input.onDown.add((to)=> {
      this.startToShoot(to);
    })
  }

  addBricks(hp) {
    var gridSize = 70;
    var rowMax = 1, colMax = 7;
    var xOffset = 5
    for (let row = 0; row < rowMax; row++) {
      for (let i = 0; i < colMax; i++) {
        let brick = this.bricks.getFirstDead()
        brick.reset(xOffset + i * gridSize, 86 + row * gridSize,
          hp, 0xff0000);
      }
    }

  }


  moveBrickBy(step) {
    this.bricks.forEachAlive( (brick)=>{
      var newY = brick.y + step
      var t = this.add.tween(brick).to({
        y: newY
      }, 500)
      t.start()
    })
  }

  startToShoot(to) {
    if (this.haveNBalls === this.needNBalls) {
      var from = this.nextShootingPoint.clone()
      this.shooter.shoot(from, to)
      this.nextShootingPoint = null

      this.haveNBalls = 0
      this.needNBalls = this.shooter.nBalls
    }
  }

  onBallHitBottom(bottomLine, ball) {
    ball.body.velocity.setTo(0, 0)
    this.haveNBalls += 1

    if (!this.nextShootingPoint) {
      var p = ball.position.clone()
      p.y = this.boardBottom
      this.nextShootingPoint = p
      this.shooter.position.setTo(p.x, p.y)
      ball.kill()
    } else {
      var tween = this.add.tween(ball)
        .to({
            x: this.shooter.x,
            y: this.shooter.y
          },
          100);
      tween.onComplete.add(function () {
        ball.kill()
      })
      tween.start()
    }

    if (this.haveNBalls === this.needNBalls) {
      this.addBricks(12)
      this.moveBrickBy(70)
    }

  };

  update() {
    this.physics.arcade.collide(this.shooter.balls, this.bricks, (ball, brick)=> {
      brick.onHit()
    });
    this.physics.arcade.collide(this.topLine, this.shooter.balls)
    this.physics.arcade.collide(this.bottomLine, this.shooter.balls, this.onBallHitBottom, null, this)
  }

  initGameBoard() {
    var heads = this.add.image(this.world.centerX, 0, 'heads')
    heads.anchor.set(0.5, 0)
    var frame = this.add.image(this.world.centerX, this.world.height, 'frame')
    frame.anchor.set(0.5, 1)
    var feet = this.add.image(this.world.centerX, this.world.height - frame.height, 'feet')
    feet.anchor.set(0.5, 1)

    this.topLine = this.add.sprite(0, heads.height + 1, 'line')
    this.bottomLine = this.add.sprite(0, this.world.height - frame.height - feet.height, 'line')

    this.physics.arcade.enable([this.topLine, this.bottomLine])
    this.topLine.body.immovable = true
    this.bottomLine.body.immovable = true

    this.boardBottom = this.bottomLine.position.y - 16
  }

  render() {
    // this.game.debug.inputInfo(50, 400);
    // this.game.debug.spriteInfo(this.ball,50,50)
    // this.game.debug.body(this.topLine)
  }

}

export default GameState;
