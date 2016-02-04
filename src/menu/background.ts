import {GameObject, Scene} from '../lib/engine';

export class Background extends GameObject {
  private scene: Scene;
  public backImage: HTMLImageElement;
  constructor() {
    super();
    this.backImage = new Image();
    this.backImage.src = 'sprites/stars.png';
  }
  update(scene: Scene) {
    this.scene = scene;
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0, 0, 800, 800);
    ctx.drawImage(this.backImage, 0, 0);

  }
}
