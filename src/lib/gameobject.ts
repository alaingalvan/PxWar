import * as uuid from 'node-uuid';
import {Scene} from './scene';
import {Input} from './input';
/**
 * Holds core parameters needed to render/manage a game object.
 */
export abstract class GameObject {

  public id: string = uuid.v4();

  //Position of GameObject.
  public position: { x: number, y: number } = { x: 0, y: 0 };

  public velocity: { x: number, y: number } = { x: 0, y: 0 };

  //An angle in degrees.
  public rotation: number = 0;

  public depth: number = 0;

  public sprites: HTMLImageElement;

  abstract update(scene ?:Scene, input ?: Input, deltaTime ?:number);
  abstract render(context:CanvasRenderingContext2D);
}
