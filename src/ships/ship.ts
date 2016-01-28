import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Input} from '../lib/input';
import {MathEx} from '../lib/math/mathex';
import {Bullet} from './bullet';

/**
 * The player ship.
 */
export class Ship extends GameObject {

  public nextRotation: number;
  public moving: boolean;
  public shooting: boolean;

  //Ship Kinematics/Stats
  public hp = 10;
  public spd = 0;
  public acc = 128;
  public deacc = 160;
  public spdMax = 256;
  public handling = 10;
  private prevDir = 1;

  //Ship Guns
  private gunTimer: number = 0;
  private gunReloadTime: number = .1;
  constructor(public team = 0, position: { x: number, y: number }) {
    super();
    this.team = team;
    //Transform
    this.position = position;

    //Sprites
    this.sprites = new Image();
    this.sprites.src = 'sprites/ship.png';
  }

  update(scene: Scene, input: Input, deltaTime: number) {
    //Ship Controls
    this.gunTimer -= deltaTime;
    if (this.shooting) {
      if (this.gunTimer < 0) {
        this.gunTimer = this.gunReloadTime;
        var bullet = new Bullet(this.team, this.position.x, this.position.y, Math.cos(this.rotation * (Math.PI / 180)), -Math.sin(this.rotation * (Math.PI / 180)));
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
    this.position.x =MathEx.clamp(this.position.x, 0, scene.width);
    this.position.y =MathEx.clamp(this.position.y, 0, scene.height);
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.rotation * (Math.PI / 180));
    context.drawImage(this.sprites, 64 * this.team, 0, 64, 64, -32, -32, 64, 64);
    context.restore();
  }
}
