import {GameObject} from './gameobject';
import {SceneManager} from './scenemanager';
interface Viewport {
  position: { x: number, y: number },
  width: number,
  height: number
}

export class Scene {

  public array: any[];
  public scenemanager: SceneManager;
  constructor(public viewport: Viewport, public width: number, public height: number) {
    this.array = [];
  }

  //Destroys a given instance in the scene.
  destroy(gameObject: GameObject) {
    this.array = this.array.filter((g: GameObject) => g !== gameObject);
  }

  // Adds a given object the the scene.
  add(gameObject) {
    this.array.push(gameObject);
  }

  // returns an array of all objects of a given type.
  findObjectOfType(type: string) {
    return this.array.filter((o) => 'type' in o && o.type === type);
  }

  // Delegating the Scene manager to control the current scene.
  next() {
    this.scenemanager.next();
  }

  previous() {
    this.scenemanager.previous();
  }
  goto(level) {
    this.scenemanager.goto(level);
  }

}
