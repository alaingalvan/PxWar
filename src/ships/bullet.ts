import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Player} from './player';

export class Bullet extends GameObject {
  xprev: number;
  yprev: number;
  spd = 1280;
  teamColor:string;
  constructor(public team: number, x: number, y: number, public xdir: number, public ydir: number) {
    super();
    this.position.x = x;
    this.position.y = y;
    this.xprev = x;
    this.yprev = y;

    switch(this.team) {
      case 0:
      this.teamColor = "148,228,255"
      break;
      case 1:
      case 2:
      this.teamColor = "245,89,81"
      break;
    }
  }

  update(scene: Scene, i, deltaTime:number) {
    this.xprev = this.position.x;
    this.yprev = this.position.y;
    this.position.x += this.xdir * this.spd * deltaTime;
    this.position.y += this.ydir * this.spd * deltaTime;

    // Out of scene bounds
    if (this.position.x < 0 || this.position.y < 0 || this.position.x > scene.width || this.position.y > scene.height) {
      scene.destroy(this);
    }
  }
  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    var gradient = context.createLinearGradient(this.position.x, this.position.y, this.xprev, this.yprev);

    gradient.addColorStop(0, "rgba(" + this.teamColor +",0)");
    gradient.addColorStop(0.2, "rgba(" + this.teamColor + ",1)");
    gradient.addColorStop(0.8, "rgba(" + this.teamColor +",1)");
    gradient.addColorStop(1, "rgba(" + this.teamColor +",0)");

    context.strokeStyle = gradient;
    context.lineWidth = 2;
    context.lineTo(this.xprev, this.yprev);
    context.lineTo(this.position.x, this.position.y);
    context.stroke();
  }
}
