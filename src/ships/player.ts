import {GameObject, Scene, Input, MathEx, KeyCode} from '../lib/engine';

import {Ship} from './ship';
import {Enemy} from './enemy';
export class Player extends Ship {
  public type = 'Player';
  public shootSound = new Audio();
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.shootSound.src = 'sounds/laser.wav';
    this.gunDamage = 10;
  }
  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);

    //Keyboard
    var l = input.getKey(KeyCode.ArrowLeft);
    var r = input.getKey(KeyCode.ArrowRight);
    var u = input.getKey(KeyCode.ArrowUp);
    var d = input.getKey(KeyCode.ArrowDown);

    this.nextRotation = MathEx.keyboardAngle(u, l, d, r);

    this.moving = (u || l || d || r);
    this.shooting = input.getKey(KeyCode.Space);

    // Check collisions with enemies
    scene.findObjectOfType('Enemy').map(
      (enemy: Enemy) => {
        if (this.isColliding(enemy)) {
          this.hp--;
          enemy.hp--;
        }
      }
    );

    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
  }
}
