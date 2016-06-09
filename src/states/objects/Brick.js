'use strict'


class Brick extends Phaser.Sprite {
  constructor(game, x, y, hp, color) {
    super(game, x, y, 'brick')

    this.hpText = this.game.add.text(this.height / 2, this.width / 2,'', {
      font: "20px",
      fill: '#fff',
      align: 'center'
    })
    this.hpText.anchor.set(0.5)
    this.addChild(this.hpText)

    this.reset(x,y,hp,color)
  }

  reset(x,y,hp,color){
    this.position.setTo(x,y)
    this.maxHp = this.hp = hp
    this.startColor = this.color = color
    this.tint = this.color
    this.hpText.tint = this.color
    this.hpText.setText(this.hp.toString())
    this.revive()
  }

  onHit() {
    if (this.hp > 0) {
      this.hp -= 1
      if (this.hp <= 0) {
        return this.kill()
      }
      this.hpText.setText(this.hp.toString())
    }
  }

}

export default Brick