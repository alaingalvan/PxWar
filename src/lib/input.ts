import {Keyboard, KeyCode} from './input/keyboard';
import {Mouse} from './input/mouse';
import {Touch} from './input/touch';

export {KeyCode} from './input/keyboard';

/**
 * Manages all input events.
 */
export class Input {
  private keyboard: Keyboard;
  private mouse: Mouse;
  private touch: Touch;
  constructor(public canvas: HTMLCanvasElement) {
    this.keyboard = new Keyboard(canvas);
    this.mouse = new Mouse(canvas);
    this.touch = new Touch(canvas);
  }

  //Keyboard
  getKey(key: KeyCode) {
    return this.keyboard.getKey(key);
  }
  getKeyPressed(key: KeyCode) {
    return this.keyboard.getKeyPressed(key);
  }
  getKeyReleased(key: KeyCode) {
    return this.keyboard.getKeyReleased(key);
  }
  update() {
    this.keyboard.update();
  }
  //Mouse
  mousePosition() {
    return this.mouse.mousePosition;
  }
  mouseClick() {
    return this.mouse.mouseClick;
  }
  //Touch
  touches() {
    return this.touch.touches;
  }
}
