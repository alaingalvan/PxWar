/**
 * A collection of Scenes that let you go from scene to scene.
 */
import {Scene} from './scene';

export class SceneManager {
  public array = [];
  private index = 0;
  add(scene:Scene) {
    scene.scenemanager = this;
    this.array.push(scene);
  }
  current() {
    return this.array[this.index];
  }
  next() {
    this.index = Math.max(0, Math.min(this.index + 1, this.array.length));;
  }
  previous() {
    this.index = Math.max(0, Math.min(this.index - 1, this.array.length));;
  }

  goto(level: number) {
    this.index = Math.max(0, Math.min(level, this.array.length));;
  }

}
