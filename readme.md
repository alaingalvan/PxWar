![Screenshot](sprites/screenshot.gif)

# Canvas Bullet Hell Example

An example [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) game built with a custom engine influenced by [Phaser](https://github.com/photonstorm/phaser/), [Pixi](https://github.com/pixijs/pixi.js/), [Angular](http://angular.io/), [React](https://facebook.github.io/react/) and [Three](http://threejs.org/) libraries.

Run these commands on a bash like [Cmder](http://cmder.net/), cmd.exe, or bash to start. Make sure you have [Node](https://nodejs.org) installed as well.

```bash
npm run init # this will start everything you need.
```

## Design decisions

1. Every GameObject is responsible for handling how it is rendered. This *can be dangerous since you're in control of the draw stack* so most libraries would add helper methods you can use that then reference a given context, however this gives you more control.

2. Every GameObject is drawn in the order it has been added. In the future rendering can be influenced by the depth value of an object, then it's call order.

3. GameObjects have optional dependencies injected into them in the form of Scene and Input singletons. This would be better with `@decorators` to inject dependencies as you need them. Another approach could be signal based, for example a `GameObject.destroy()` abstract method, sends a signal up to the scene node to destroy its reference, rather than the GameObject referencing the scene and calling `scene.destroy(this)`. I modeled this design after Angular, however a signal approach would be more of a React design.

4. GameObjects could be made of components like Angular, Unity and Unreal, instead of being a class with a collection of attributes. This is a much simpler approach but provides less freedom. In addition, default inheritable objects could've been made, such as a `class Pawn` that has inputs already injected in.

4. Input function names are modeled after the [Unity Game Engine](http://unity3d.com/), however the code is modeled after the [official javascript spec](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode), a polyfill of the new draft of `KeyboardEvent.code`. Keyboard Events are still very fragmented, so this draft tried to unite them across browsers.

5. Keys are mapped to a JavaScript object. This could perform faster if you used another data structure (Set, Int32Array). This could also become full of garbage data after a while.

6. The Keyboard Event object property we're referencing is `event.code`, instead of say `event.key` (since code exists in both firefox and chrome), look at [MDN's KeyboardEvent docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) for more details. One possible improvement is to use polyfills for the latest implementation of the event for older browser support. A lot of other engines use [keycodes instead](https://github.com/randompast/Vitaman-Game) for older browser support.

7. Keys and Mouse events are all inside the input class. It would be better if there was a folder called `input/`, with `keyboard`, `mouse`, `gamepad`, etc. (`multitouch`, `pen`).

8. Vectors don't have operators. Depending on the glMatrix.js library or something similar would be better for the future.

9. Rendering is coupled to Canvas. In the future, this could be injectable, so you can choose your renderer, an abstact one, or one closer to the metal.

## Todo

1. Shoot like pixel wars automatic rifle.
2. Add a GUI to display health and energy.
3. Add a boss.
4. Add a main menu.
5. Add pausing.
6. Add music/sfx.
7. Add transitions.
8. Add Loading Screen.

## Appendix

 * [Keith Clark's Space Defender Game](http://keithclark.co.uk/articles/js1k-2015-defender/) - A canvas side scrolling space fighting game reminiscent of old games like [pixelships](http://www.pixelships.com/).

 * [Andrea Venuta's Endless Wireframe Tunnel Run](http://veeenu.github.io/2014/04/07/js1k-2014-post-mortem.html) - A WebGL endless tunnel reminiscent of games like [Super Hexagon](http://superhexagon.com/).

 * [Jeff Thomas's Gravity Cloud](http://codepen.io/aecend/pen/rabgvq) - A little game where thousands of particles follow your mouse.
