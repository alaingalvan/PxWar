import {GameObject} from './gameobject';
import {Scene} from './scene';
import {Input} from './input';
import {Clock} from './clock';

import {Viewport} from './viewport';

/**
 * Manages rendering objects on canvas.
 */
export class Renderer {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public input: Input;
  public scene: Scene;
  public clock: Clock;
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.tabIndex = 1;
    this.canvas.width = 640;
    this.canvas.height = 360;

    this.context = this.canvas.getContext('2d');

    //Initialize Singletons
    this.input = new Input(this.canvas);
    this.scene = new Scene(new Viewport(), 800, 800);
    this.clock = new Clock();
  }

  //Refreshes the screen with everything in the scene.
  render() {
    var deltaTime = this.clock.deltaTime();
    this.scene.array.map((o) => {
      if ('update' in o)
        o.update(this.scene, this.input, deltaTime);
    });

    this.context.save();
    //Viewport
    this.context.translate(-this.scene.viewport.position.x, -this.scene.viewport.position.y);
    this.context.clearRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.width, this.scene.viewport.height);

    //Render Scene
    this.scene.array.map((o) => {
      if (o !== undefined)
        o.render(this.context);
    });

    this.context.restore();
  }
}
