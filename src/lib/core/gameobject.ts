import {Scene} from './scene';
import {Input} from '../input';
/**
 * Holds core parameters needed to render/manage a game object.
 */
export abstract class GameObject {
  public type = 'GameObject';

  public hitbox = {width: 64, height: 64, x: -32, y: -32};

  //Position of GameObject.
  public position = { x: 0, y: 0 };
  public velocity = { x: 0, y: 0 };

  //An angle in degrees.
  public rotation: number = 0;

  public depth: number = 0;

  public sprite: HTMLImageElement;

  abstract update(scene ?:Scene, input ?: Input, deltaTime ?:number);
  abstract render(context:CanvasRenderingContext2D);

  isColliding(target: GameObject) {
  if (target)
    return !(
      ((this.position.y + this.hitbox.y + this.hitbox.height) < (target.position.y + target.hitbox.y)) ||
      (this.position.y + this.hitbox.y > (target.position.y + target.hitbox.height + target.hitbox.y)) ||
    ((this.position.x + this.hitbox.x + this.hitbox.width) < target.position.x + target.hitbox.x) ||
    (this.position.x + this.hitbox.x > (target.position.x + target.hitbox.width + target.hitbox.y))
      );
    return false;
}
}
