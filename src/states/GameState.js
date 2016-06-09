import Brick from './objects/Brick'
import Ball from './objects/Ball'

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
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.initBackground();

    this.bricks = this.add.group()
    // this.bricks.enableBody = true
    // this.bricks.physicsBodyType = Phaser.Physics.ARCADE

    for (let i = 0; i < 50; i++) {
      let brick = new Brick(this, 0, 0, 1, 0xff0000)
      // this.world.add(brick)
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
        brick.revive()
      }
    }

    this.ball = new Ball(this, 100, 100)
    this.world.add(this.ball)

    this.input.onDown.add(()=> {
      this.physics.arcade.moveToPointer(this.ball, 800)
    })

    this.physics.arcade.enable([this.ball,
      this.topLine,
      this.bottomLine])

    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
    this.topLine.body.immovable = true
    this.bottomLine.body.immovable = true

  }

  update() {
    this.physics.arcade.collide(this.ball, this.bricks, (ball, brick)=> {
      brick.onHit()
    });

    this.physics.arcade.collide(this.topLine, this.ball)
    this.physics.arcade.collide(this.bottomLine, this.ball, (line, ball)=> {
      ball.body.velocity.setTo(0, 0)
    })

  }


  initBackground() {
    var heads = this.add.image(this.world.centerX, 0, 'heads')
    heads.anchor.set(0.5, 0)
    this.topLine = this.add.sprite(0, heads.height + 1, 'line')

    var frame = this.add.image(this.world.centerX, this.world.height, 'frame')
    frame.anchor.set(0.5, 1)
    var feet = this.add.image(this.world.centerX, this.world.height - frame.height, 'feet')
    feet.anchor.set(0.5, 1)
    this.bottomLine = this.add.sprite(0, this.world.height - frame.height - feet.height, 'line')
  }

  render() {
    // this.game.debug.inputInfo(50, 400);
    // this.game.debug.spriteInfo(this.ball,50,50)
    this.game.debug.body(this.topLine)
  }

}

export default GameState;
