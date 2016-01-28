import {GameObject} from './gameobject';
import {Viewport} from './viewport';
export class Scene {

  public array: any[];
  constructor(public viewport: Viewport, public width: number, public height: number) {
    this.array = [];
  }
  //Destroys a given instance in the scene.
  destroy(gameObject: GameObject) {
    this.array = this.array.filter((g: GameObject) => g !== gameObject);
  }
  add(gameObject) {
    this.array.push(gameObject);
  }
  find(gameObject: string) {
    return this.array.filter((g) => g.name === gameObject)[0];
  }
}
