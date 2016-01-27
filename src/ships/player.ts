import {Ship} from './ship';
import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Input} from '../lib/input';
import {MathEx} from '../lib/math/mathex';

export class Player extends Ship {
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
  }
  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);

    //Keyboard
    var l = input.getKey('ArrowLeft');
    var r = input.getKey('ArrowRight');
    var u = input.getKey('ArrowUp');
    var d = input.getKey('ArrowDown');

    this.nextRotation = MathEx.keyboardAngle(u, l, d, r);

    this.moving = (u || l || d || r);
    this.shooting = input.getKey('Space');

    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
  }
}
