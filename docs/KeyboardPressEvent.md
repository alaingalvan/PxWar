I know pausing is a bit tough, there's multiple ways to approach it though, <a href="https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AActor/CanEverTick/index.html">like stopping the renderer clock with a boolean flag on each gameobject that lets the renderer know if an object can update or not (Unreal does this)</a> or the approach you suggested.</p>

<p>JavaScript is a very forgiving language, <i>sometimes too forgiving</i>, so your code could have been interpreted differently then what you might have been thinking.</p>
<p>The renderer has a member variable called <code>input</code> that you would need to reference if you want to check the keyboard. When you used <code>this</code> in your code, the context of that <code>this</code> is the global context (so <code>this === window</code>)!

<pre><code>
function animate() {
  // store animation in a variable, so that if  player press P
  // cancelAnimationFrame will have the variable and do its thing to
  // pause the game. Player press P again to unpause the game

  // I changed it from F10 to P since F10 is for fullscreening your browser.
  var paused = renderer.input.getKey(KeyCode.KeyP);
   if (!paused) {
     renderer.update(sceneManager.current());
     renderer.render(sceneManager.current());
   }
   requestAnimationFrame(animate);
}
</code></pre>

<p>Now the problems I see with using this approach is that it'll only pause while you're pressing the key, since <code>Input.getKey(KeyCode.KeyP)</code> only check's the current key state at that frame, and the clock isn't paused. That's fine, but we can do better. ;D</p>

<h2>Modifing the Keyboard Checking System</h2>

<p>Unity, Game Maker Studio, and Unreal Engine 4 all share a certain keyboard check function that only fires once when a key has been pressed, and won't be fired till the key is pressed again. this is <code><a href="http://docs.unity3d.com/ScriptReference/Input.GetKeyDown.html">Input.GetKeyDown</a></code> or <code><a href="http://docs.yoyogames.com/source/dadiospice/002_reference/mouse,%20keyboard%20and%20other%20controls/keyboard%20input/keyboard_check_pressed.html">keyboard_check_pressed()</a></code> in Game Maker Studio. <strong>We need to make this functionality in the engine</strong></p>

<p>We're going to have to modify the Keyboard class to support checking if a key was pressed, if a key was released, and if a key is currently being pressed (which it already supports). So let's go to <code>lib/input/keyboard.ts</code> and go to the <code>function keyDownCallBack</code> and <code>function keyUpCallBack</code>.</p>

<pre><code>
  export class Keyboard {
    public keys: Object = {};
    constructor(public canvas: HTMLCanvasElement) {
      this.canvas.addEventListener('keydown', (e) => this.keyDownCallback(e));
      this.canvas.addEventListener('keyup', (e) => this.keyUpCallback(e));
    }
    keyDownCallback(event: KeyboardEvent) {
      this.keys[event.keyCode] = { down: true, pressed: true, released: false };
    }
    keyUpCallback(event) {
      this.keys[event.keyCode] = { down: false, pressed: false, released: true };
    }
    getKey(key: KeyCode) {
      return (this.keys[key] === undefined) ? false : this.keys[key].down;
    }
    getKeyPressed(key: KeyCode) {
      return (this.keys[key] === undefined) ? false : this.keys[key].pressed;
    }
    getKeyReleased(key: KeyCode) {
      return (this.keys[key] === undefined) ? false : this.keys[key].released;
    }
    update() {
      for (var e in this.keys) {
        this.keys[e].pressed = false;
        this.keys[e].released = false;
      }
    }
</code></pre>

<p>So we'll also need to change the Input class as well, which serves as a collection of different input APIs, and add those 3 functions.</p>

<pre><code>
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
  keyUpdate() {
    this.keyboard.update();
  }
</code></pre>

<p>And we'll need to modify the update cycle to take into account the clock and the keyboard changes. Let's go to <code>lib/core/renderer.ts</code> and add a keyboard update function.</p>

<pre><code>
  //Refreshes the screen with everything in the scene.
render(scene: Scene) {
  this.context.save();
  //Viewport
  this.context.translate(-scene.viewport.position.x, -scene.viewport.position.y);
  this.context.clearRect(scene.viewport.position.x, scene.viewport.position.y, scene.viewport.width, scene.viewport.height);

  //Render Scene
  scene.array.map((o) => {
    if ('render' in o)
      if (scene)
        o.render(this.context);
  });

  this.context.restore();
  this.input.keyUpdate();
}
</code></pre>

<p>Now all we need to do is flip a switch when you press P! <code>paused = !paused;</code></p>

<pre><code>
  var paused = false;
  function animate() {
    // store animation in a variable, so that if  player press F10
    // cancelAnimationFrame will have the variable and do its thing to
    // pause the game. Player press F10 again to unpause the game
    if (renderer.input.getKeyReleased(KeyCode.KeyP))
      paused = !pause;
     if (!paused) {
       renderer.update(sceneManager.current());
       renderer.render(sceneManager.current());
     }
     requestAnimationFrame(animate);
  }
</code></pre>

I've gone ahead and updated the github repo with these changes, so check it out if you want, just <code>git pull</code> or check out the github repo!
