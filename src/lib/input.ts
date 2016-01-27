import {Keyboard} from './input/keyboard';
import {Mouse} from './input/mouse';
import {Touch} from './input/touch';
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
  getKey(key: string) {
    return this.keyboard.getKey(key);
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
