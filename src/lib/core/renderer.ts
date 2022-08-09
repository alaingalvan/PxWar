import {GameObject} from './gameobject.js';
import {Scene} from './scene.js';
import {Input} from '../input.js';
import {Clock} from '../time/clock.js';

/**
 * Manages rendering objects on canvas.
 */
export class Renderer {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public input: Input;
  public scene: Scene;
  public clock: Clock;

  // Initzalize Renderer
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.tabIndex = 1;
    this.canvas.width = 640;
    this.canvas.height = 360;

    this.context = this.canvas.getContext('2d');

    //Initialize Singletons
    this.input = new Input(this.canvas);
    this.clock = new Clock();
  }

  //Updates all the objects in the scene.
  update(scene: Scene) {
    var deltaTime = this.clock.deltaTime();
    scene.array.map((o) => {
      if ('update' in o)
        if (scene)
          o.update(scene, this.input, deltaTime);
    });
  }

  //Refreshes the screen with everything in the scene.
  render(scene: Scene) {
    this.context.save();
    //Viewport
    this.context.translate(-scene.viewport.position.x, -scene.viewport.position.y);
    this.context.clearRect(scene.viewport.position.x, scene.viewport.position.y, scene.viewport.width, scene.viewport.height);

    //Render Scene
    scene.array.map((o) => {
      if ('render' in o)
        if (scene)
          o.render(this.context);
    });

    this.context.restore();
    this.input.update();
  }
}
