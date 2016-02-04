// Depending on the browser or keyboard layout,
// some KeyCodes can be different.
// This implentation doesn't include keys that can have multiple meanings.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
export enum KeyCode {
  Tab = 9,
  Enter = 13,
  ShiftLeft = 16,
  ShiftRight = 16,
  ControlLeft = 17,
  ControlRight = 17,
  AltLeft = 18,
  AltRight = 18,
  Escape = 27,
  Space = 32,
  End = 35,
  Home = 36,
  PageUp = 33,
  PageDown = 34,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
  Insert = 45,
  Delete = 46,
  Digit0 = 48,
  Digit1 = 49,
  Digit2 = 50,
  Digit3 = 51,
  Digit4 = 52,
  Digit5 = 53,
  Digit6 = 54,
  Digit7 = 55,
  Digit8 = 56,
  Digit9 = 57,
  KeyA = 65,
  KeyB = 66,
  KeyC = 67,
  KeyD = 68,
  KeyE = 69,
  KeyF = 70,
  KeyG = 71,
  KeyH = 72,
  KeyI = 73,
  KeyJ = 74,
  KeyK = 75,
  KeyL = 76,
  KeyM = 77,
  KeyN = 78,
  KeyO = 79,
  KeyP = 80,
  KeyQ = 81, // In Greece this is different
  KeyR = 82,
  KeyS = 83,
  KeyT = 84,
  KeyU = 85,
  KeyV = 86,
  KeyW = 87,
  KeyX = 88,
  KeyY = 89,
  KeyZ = 90,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  NumpadAdd = 107,
  NumpadEnter = 13,
  NumpadMultiply = 106,
  NumpadSubtract = 109,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 113,
  Comma = 188,
  Period = 190
}

export class Keyboard {
  public keys: Object = {};
  constructor(public canvas: HTMLCanvasElement) {
    this.canvas.addEventListener('keydown', (e) => this.keyDownCallback(e));
    this.canvas.addEventListener('keyup', (e) => this.keyUpCallback(e));
  }
  keyDownCallback(event: KeyboardEvent) {
    this.keys[event.keyCode] = true;
  }
  keyUpCallback(event) {
    this.keys[event.keyCode] = false;
  }
  getKey(key: KeyCode) {
    return (this.keys[key] === undefined || !this.keys[key]) ? false : true;
  }
}
