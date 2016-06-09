

class Ball extends  Phaser.Sprite{
  constructor(game,x,y){
    super(game,x,y,'ball')
    this.scale.setTo(0.1)
  }
}

export default Ball