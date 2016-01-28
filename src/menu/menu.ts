import {GameObject} from '../lib/gameobject';
import {Scene} from '../lib/scene';
import {Easing} from '../lib/math/easing';
import {Clock} from '../lib/clock';
import {Input} from '../lib/input';

import {Player} from '../ships/player';
import {Enemy} from '../ships/enemy';

export class Menu extends GameObject {
  private logo: HTMLImageElement;

  private scene: Scene;
  private clock: Clock = new Clock();
  private alpha = 0;
  private startgame = false;
  constructor() {
    super();
    this.logo = new Image();
    this.logo.src = 'sprites/logo.png';
  }

  update(scene: Scene, input: Input) {
    this.scene = scene;

    if (!this.startgame && input.mouseClick()) {
      this.startgame = true;
      this.clock = new Clock();
    }

    // Fade in and Fade out
    if (this.startgame) {
      this.alpha = Easing.easeOutExpo(1 - this.clock.getElapsedTime(), 0, 1, 1);
      if (this.alpha <= 0) {
        this.alpha = 0;
        scene.destroy(this);
      }
    }
    else {
      this.alpha = Easing.easeOutExpo(this.clock.getElapsedTime(), 0, 1, 1);
    }
  }

  render(context: CanvasRenderingContext2D) {
    var vx = this.scene.viewport.position.x + (this.scene.viewport.width / 2);
    var vy = this.scene.viewport.position.y + (this.scene.viewport.height / 2);
    context.save();
    context.globalAlpha = this.alpha;
    context.drawImage(this.logo,
      vx - (this.logo.width / 2),
      vy - (this.logo.height / 2));
    context.fillStyle = "#ffffff";
    context.font = "12px 'PixelFont'";
    context.textAlign = "center";
    context.fillText("Click to Start", vx, vy + 64, 128);

    // Background
    var my_gradient = context.createLinearGradient(0, 0, 0, 360);
    my_gradient.addColorStop(0, "rgba(0,0,0,0)");
    my_gradient.addColorStop(1, "rgba(0,0,0,0.1)");
    context.fillStyle = my_gradient;
    context.fillRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.position.x + this.scene.viewport.width, this.scene.viewport.position.y + this.scene.viewport.height);
    context.restore();
  }
}
