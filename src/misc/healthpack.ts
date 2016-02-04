import {GameObject, Scene, Input, MathEx, Timer} from '../lib/engine';

export class Healthpack extends GameObject {
  public type = 'Healthpack';
  public sprite = new Image();
  private timer = new Timer();
  constructor(position = { x: 0, y: 0 }, public heal = 25) {
    super();
    this.position = position;
    this.sprite.src = './sprites/healthball.png';
    this.hitbox.width = this.hitbox.height = 16;

    // Better Healthpack
    if (this.heal >= 25) {
      this.sprite.src = './sprites/healthpack.png';
      this.hitbox.width = this.hitbox.height = 64;
      this.timer.addTimer('destroy', 30);
    }

  }
  update(scene: Scene, i, deltaTime: number) {
    this.timer.update(deltaTime);
    var player = scene.findObjectOfType('Player')[0];

    if (this.isColliding(player)) {
      player.hp += this.heal;
    }

    if (this.isColliding(player) || this.timer.done('destroy')) {
      scene.destroy(this);
    }
  }
  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
  }
}
