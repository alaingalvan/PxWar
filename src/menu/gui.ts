import {GameObject, Scene} from '../lib/engine.js';

export class GUI extends GameObject {
  public myString;
  private player;
  private viewport;
  constructor() {
    super();
  }

  update(scene: Scene, input, deltaTime) {
    this.viewport = scene.viewport;
    this.player = scene.findObjectOfType('Player')[0];
    if (this.player)
      this.myString = "HP: " + this.player.hp;

  }
  render(context: CanvasRenderingContext2D) {
    context.fillStyle = "#ffffff";
    context.font = '16px PixelFont';
     if (this.viewport)
      context.fillText(this.myString, this.viewport.position.x + 16, this.viewport.position.y + 16);
  }
}
