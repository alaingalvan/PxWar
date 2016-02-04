![Screenshot](sprites/screenshot.gif)

# Canvas Bullet Hell Example

An example [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) game built with a custom engine influenced by [Phaser](https://github.com/photonstorm/phaser/), [Pixi](https://github.com/pixijs/pixi.js/), [Angular](http://angular.io/), [React](https://facebook.github.io/react/) and [Three](http://threejs.org/) libraries.

This was developed in TypeScript, a superset of JavaScript with beta features built in along with Types for [autocomplete](https://msdn.microsoft.com/en-us/library/hcw1s69b.aspx).

## Getting Started

Download the LTS (Long Time Support) version [Node](https://nodejs.org/en/download/) and run `npm install typescript --global` in the command line.

If you're on Windows and want a better command prompt, download [Cmder](http://cmder.net/) and put it in your program files (or anywhere you want).

Download [Gitub Atom](https://atom.io/) and download the [TypeScript plugin](https://atom.io/packages/atom-typescript) by pressing `Ctrl + Shift + P` and typing in `Install Packages and Themes`, and search for `TypeScript` in the search bar.

You can use another editor if you go to the directory where your code is with the command prompt, and type `tsc -w`, this will tell the compiler to watch for file changes and compile them automatically.

Make sure you have node installed, and then just `node server.js` and open up `localhost:3000` on your browser!

```javascript
import {Renderer, SceneManager, Scene} from './lib/engine';

import {Back} from './menu/back';
import {Menu} from './menu/menu';
import {Player} from './ships/player';
import {Enemy} from './ships/enemy';

var renderer;

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  document.getElementById('game').appendChild(canvas);
  canvas.focus();

  // Create SceneManager and Levels
  sceneManager = new SceneManager();
  for (var i = 0; i < 10; i++)
    sceneManager.add(createScene(i));
}
function createScene(level) {
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);

  // Add stuff to the scene.

  return scene;

}

function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());
  requestAnimationFrame(animate);
}

start();
animate();
```

## Quickstart

### Creating your own Objects

All you need to do is extend the GameObject class, and you're set! This assumes you created a new file at the `src/` folder.

```javascript
//Find the GameObject Class from the file in lib/gameobject.
import {GameObject} from './lib/engine';

//
class MyObject extends GameObject {
  constructor() {
    //Initialize your Object
  }
  update(scene, input, deltaTime) {
    //Manipulate the scene, access inputs, and get the change in time between each frame.
  }

  render(context) {
    //Draw whatever you need to with the render context.
  }
}
```

### Spawning

Anywhere you have a reference to a `scene`, all you need to do is call `scene.add(yourgameobject)`. For example, say you want to spawn a new bullet every time you press the space button.

```javascript
import {GameObject, KeyCode} from '../lib/engine';
import {Bullet} from './ships/bullet';

class MyObject extends GameObject {
  constructor() {

  }

update(scene, input, deltaTime) {
  if (input.getKey(KeyCode.KeyZ))
      scene.add(new Bullet(this.position.x, this.position.y, 1, 0)); //Shoots a bullet to the right.
  }
  render(context) {
  }
```

### Adding Images

You can add any image on the project by placing the files in the project. I've chosen to keep all the images in the `sprites/` folder.
From there you can just use the absolute directory of the file in your code like the following:

### Drawing

You can draw anything with the Canvas API, from images to lines, shapes, etc. Check out the [Canvas API here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Lets say there's a sprite called `healthpack.png` in our `sprites/` folder.

```javascript
import {GameObject, KeyCode} from '../lib/engine';
import {Bullet} from './ships/bullet';

class MyObject extends GameObject {
  public img;
  constructor() {
    this.img = new Image();
    this.img.src = 'sprites/healthpack.png';
  }

  update(scene, input, deltaTime) {
    if (input.getKey(KeyCode.KeyZ))
        scene.add(new Bullet(this.position.x, this.position.y, 1, 0)); //Shoots a bullet to the right.
    }
  render(context) {
    context.drawImage(this.img, 0, 0, 64, 64, -32, -32, 64, 64);
  }
```

Now you'll also find that there's an image called `healthpack.svg`. **As of now, you cannot load SVG images in canvas**, maybe this will change in the future though.

### Creating Timers

To create a timer, just instantiate one, and then add a timer to it!

```javascript
import {GameObject, KeyCode, Timer} from '../lib/engine';
import {Bullet} from './ships/bullet';

class MyObject extends GameObject {
  public img = new Image(); //less code is better. :)
  public timer = new Timer();
  constructor() {
    this.img.src = 'sprites/healthpack.png';
    // add a timer called destroy that finishes in 30 seconds.
    this.timer.addTimer('destroy', 30);
  }

  update(scene, input, deltaTime) {
    this.timer.update(deltaTime);

    if (input.getKey(KeyCode.KeyZ))
        scene.add(new Bullet(this.position.x, this.position.y, 1, 0)); //Shoots a bullet to the right.

    if (this.timer.done('destroy')) {
            scene.destroy(this);
    }

  }
  render(context) {
    context.drawImage(this.img, 0, 0, 64, 64, -32, -32, 64, 64);
}
```

### Looking for Objects

Sometimes you want to look for objects in a scene, so you can destroy them or access some member variables, so there's a method in the scene class for you to do just that:

```javascript
import {GameObject, Scene, Input, MathEx, Timer} from '../lib/engine';

export class Healthpack extends GameObject {
  public type = 'Healthpack';
  public sprite = new Image();
  public heal = 25;
  private timer = new Timer();
  constructor(position = { x: 0, y: 0 }) {
    super();
    this.position = position;
    this.sprite.src = './sprites/healthpack.png';
    this.timer.addTimer('destroy', 30);

  }
  update(scene: Scene, i, deltaTime: number) {
    this.timer.update(deltaTime);

    // Find a player in the scene.
    var player = scene.findObjectOfType('Player')[0];

    if (this.isColliding(player)) {
      player.hp += this.heal;
    }

    if (this.isColliding(player) || this.timer.done('destroy')) {
            scene.destroy(this);
    }
  }
  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, 64, 64, this.position.x, this.position.y, 64, 64);
  }
}

```

### Switching Levels

To go to another level in the game, just call `scene.next()`.

```javascript
import {GameObject, Scene} from '../lib/engine';

export class Portal extends GameObject {
  public type = 'Portal';
  public sprite = new Image();
  constructor(position = { x: 0, y: 0 }) {
    super();
    this.position = position;
    this.sprite.src = './sprites/portal.png';

  }
  update(scene: Scene, i, d) {
    // Find a player in the scene.
    var player = scene.findObjectOfType('Player')[0];

    if (this.isColliding(player)) {
      scene.next();
    }
  }
  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, 64, 64, this.position.x, this.position.y, 64, 64);
  }
}
```

## Going from Level 1 to a Boss

Every level has a portal that if the player goes through, will take them to the next level. So in the level creation function, we check if the current level we're making is an odd number, and spawn a boss in that level.

```javascript
// Even levels are enemies, odd levels are bosses.
if (level % 2 == 0) {
  for (var i = 0; i < 5; i++)
    scene.add(new Enemy(1, {
      x: Math.floor(Math.random() * scene.width),
      y: Math.floor(Math.random() * scene.height)
    }));
}
else {
  scene.add(new Boss({
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  }));
}
```

Between each level there's a boss fight. 

## Design decisions

1. Every GameObject is responsible for handling how it is rendered. This *can be dangerous since you're in control of the draw stack* so most libraries would add helper methods you can use that then reference a given context, however this gives you more control. Every GameObject is drawn in the order it has been added. In the future rendering can be influenced by the depth value of an object, then it's call order.

2. GameObjects have optional dependencies injected into them in the form of Scene and Input singletons. This would be better with `@decorators` to inject dependencies as you need them. Another approach could be signal based, for example a `GameObject.destroy()` abstract method, sends a signal up to the scene node to destroy its reference (Phaser does this), rather than the GameObject referencing the scene and calling `scene.destroy(this)`.

3. GameObjects could be made of components like [Angular](https://angular.io/docs/ts/latest/api/core/Component-decorator.html), [Unity](http://docs.unity3d.com/ScriptReference/Component.html) and [Unreal](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html), and these components would be responsible for rendering, movement, physics, etc. If they need to communicate between each other it would be easy to make references to each of them.

4. Input function names are modeled after the [Unity Game Engine](http://unity3d.com/), however the code is modeled after the [official javascript spec](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode), a polyfill of the new draft of `KeyboardEvent.code`. Keyboard Events are still very fragmented, so this `KeyboardEvent.code` tried to unite them across browsers. Keys are mapped to a JavaScript object. This could perform faster if you used another data structure (Set, Int32Array). This could also become full of garbage data after a while.

5. Vectors don't have operators. Depending on the glMatrix.js library or something similar would be better for the future.

6. Rendering is coupled to Canvas. In the future, this could be injectable, so you can choose your renderer, an abstact one, or one closer to the metal.

7. Runtime type checking has always been a bit iffy in JavaScript, so this project does "fake" type checking, there's a variable in every class that says it's type, and this type is a string, thus you can't infer classical type checking. [Three.js](https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js) takes this approach.

8. I've modeled the [classical hierarchy of GameObjects off Unreal Engine 4](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/index.html), where there's Actors that are placed in a scene, Pawns that are Actors that can be controlled, and AI or Players "Posess" the pawn, sorta like a puppet with strings, except the strings are keyboard keys or mouse or whatever.

9. Scene management is delegated to a SceneManager class.

## Appendix

 * [Keith Clark's Space Defender Game](http://keithclark.co.uk/articles/js1k-2015-defender/) - A canvas side scrolling space fighting game reminiscent of old games like [pixelships](http://www.pixelships.com/).

 * [Andrea Venuta's Endless Wireframe Tunnel Run](http://veeenu.github.io/2014/04/07/js1k-2014-post-mortem.html) - A WebGL endless tunnel reminiscent of games like [Super Hexagon](http://superhexagon.com/).

 * [Jeff Thomas's Gravity Cloud](http://codepen.io/aecend/pen/rabgvq) - A little game where thousands of particles follow your mouse.
