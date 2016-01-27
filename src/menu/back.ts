import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';

export class Back extends GameObject {
  private scene: Scene;
  public backImage: HTMLImageElement;
  constructor() {
    super();
    this.backImage = new Image();
    this.backImage.src ='sprites/stars.png';
  }
  update(scene: Scene) {
    this.scene = scene;
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0, 0, this.scene.width, this.scene.height);
    ctx.drawImage(this.backImage, 0, 0);

  }
}
