import {GameObject, Scene, Input, MathEx} from '../lib/engine';

import {Bullet} from './bullet';
import {Timer} from '../lib/time/timer';
/**
 * The player ship.
 */
export class Ship extends GameObject {

  public nextRotation = Math.random() * 360;
  public moving = false;
  public shooting = false;

  //Ship Kinematics/Stats
  public hp = 100;
  public hpMax = this.hp;
  public spd = 0;
  public acc = 128;
  public deacc = 160;
  public spdMax = 256;
  public handling = 10;
  private prevDir = 1;

  //Ship Guns
  public timer = new Timer();
  public gunReloadTime: number = .1;
  public gunDamage = 1;
  constructor(public team = 0, position: { x: number, y: number }) {
    super();
    this.team = team;
    //Transform
    this.position = position;

    //Sprites
    this.sprite = new Image();
    this.sprite.src = 'sprites/ship.png';

    this.timer.addTimer('shoot', this.gunReloadTime);
  }

  update(scene: Scene, input: Input, deltaTime: number) {
    // Update Timer
    this.timer.update(deltaTime);

    //Ship Controls
    if (this.shooting) {
      if (this.timer.done('shoot')) {
        this.timer.reset('shoot');
        var bullet = new Bullet(this.team, this.position.x, this.position.y, Math.cos(this.rotation * (Math.PI / 180)), -Math.sin(this.rotation * (Math.PI / 180)), this.gunDamage);
        scene.add(bullet);
      }
    }

    if (this.moving) {
      this.spd = MathEx.clamp(this.spd + (deltaTime * this.acc), 0, this.spdMax);
      this.rotation += MathEx.angleDifference(this.nextRotation, this.rotation) / (this.spd / this.handling);
      this.prevDir = this.velocity.x > 0 ? 1 : -1;
    } else {
      this.spd = MathEx.clamp(this.spd - (deltaTime * this.deacc), 0, this.spdMax);
    }

    // Apply Kinematics
    this.velocity.x = deltaTime * this.spd * Math.cos(this.rotation * (Math.PI / 180));
    this.velocity.y = deltaTime * this.spd * -Math.sin(this.rotation * (Math.PI / 180));
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //Keep in bounds
    this.position.x = MathEx.clamp(this.position.x, 0, scene.width);
    this.position.y = MathEx.clamp(this.position.y, 0, scene.height);

    // Apply Death
    this.hp = MathEx.clamp(this.hp, 0, this.hpMax);

    if (this.hp <= 0) {
      scene.destroy(this);
    }
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.rotation * (Math.PI / 180));
    context.drawImage(this.sprite, 64 * this.team, 0, 64, 64, -32, -32, 64, 64);
    context.restore();
  }
}
