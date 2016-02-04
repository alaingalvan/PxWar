import {GameObject, Scene, Input, MathEx} from '../lib/engine';
import {Enemy} from './enemy';

export class Boss extends Enemy {
    public sprite = new Image();
  constructor(public position: { x: number, y: number }) {
    super(1, position);
    // Edit Stats
    this.spdMax = this.spdMax * 0.5; //He moves at half the spd as other ships.
    this.hpMax = 1000;

    // Adjust hitbox
    this.hitbox.width = 128;
    this.hitbox.height = 128;
    this.hitbox.x = -64;
    this.hitbox.y = -64;

    // Sprite
    this.sprite.src = 'sprites/boss.png';
  }
  update(scene: Scene, i, deltaTime: number) {
    super.update(scene, i, deltaTime);
  }
  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.rotation * (Math.PI / 180));
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    context.restore();
  }
}
