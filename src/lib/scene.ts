import {GameObject} from './gameobject';
import {Viewport} from './viewport';
export class Scene {

  public array;
  constructor(public viewport: Viewport, public width: number, public height: number) {
    this.array = [];
  }
  //Destroys a given instance in the scene.
  destroy(gameObject:GameObject) {
    this.array = this.array.filter((v:GameObject) =>  v.id !== gameObject.id);
  }
  add(gameObject) {
    this.array.push(gameObject);
  }
}
