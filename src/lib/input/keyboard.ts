enum KeyCode {
  Escape = 27,
  Space = 32,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

export class Keyboard {
    public keys: Object = {};
    constructor(public canvas: HTMLCanvasElement) {
      this.canvas.addEventListener('keydown', (e) => this.keyDownCallback(e));
      this.canvas.addEventListener('keyup', (e) => this.keyUpCallback(e));
    }
    keyDownCallback(event: KeyboardEvent) {
      this.keys[KeyCode[event.keyCode]] = true;
    }
    keyUpCallback(event) {
      this.keys[KeyCode[event.keyCode]] = false;
    }
    getKey(key: string) {
      return (this.keys[key] === undefined || !this.keys[key]) ? false : true;
    }
}
