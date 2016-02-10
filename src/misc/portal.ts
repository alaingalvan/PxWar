import {GameObject, Scene} from '../lib/engine';

export class Portal extends GameObject {
  public type = 'Portal';
  public sprite = new Image();
  constructor(position = { x: 0, y: 0 }) {
    super();
    this.position = position;
    this.sprite.src = './sprites/portal.png';

    // Adjust hitbox
    this.hitbox.width = 128;
    this.hitbox.height = 128;
    this.hitbox.x = -64;
    this.hitbox.y = -64;

    this.rotation = Math.random() * 360;
  }
  update(scene: Scene, i, deltaTime) {
    // Find a player in the scene.
    var player = scene.findObjectOfType('Player')[0];

    if (this.isColliding(player)) {
      scene.next();
    }

    // Spin slowly
    this.rotation += deltaTime * 5;
  }
  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.rotation);
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    context.restore();

  }
}
