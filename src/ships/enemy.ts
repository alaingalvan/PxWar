import {Ship} from './ship';
import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Input} from '../lib/input';
import {MathEx} from '../lib/math/mathex';
import {Player} from './player';


export class Enemy extends Ship {
  public timer = 0;
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
  }
  update(scene: Scene, i, deltaTime:number) {
    super.update(scene, i, deltaTime);

    setInterval(this.changeTarget, 500);

   //The player is garaneteed to be the 2nd array entry.
    var player:Player = scene.array[1];

    this.nextRotation = MathEx.getAngleTwoPoints(this.position.x, this.position.y, player.position.x, player.position.y);
    this.moving = true;
    this.shooting = true;
  }

  changeTarget() {
    console.log(this);
  }
}
