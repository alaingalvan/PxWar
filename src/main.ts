// Game Engine
import {Renderer, SceneManager, Scene, KeyCode} from './lib/engine.js';

// Game Specific Stuff
import {Background} from './menu/background.js';
import {Menu} from './menu/menu.js';
import {GUI} from './menu/gui.js';


import {Player} from './ships/player.js';
import {Enemy} from './ships/enemy.js';
import {Boss} from './ships/boss.js';
import {Healthpack} from './misc/healthpack.js';
import {Portal} from './misc/portal.js';

var renderer: Renderer,
  sceneManager: SceneManager;

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  document.getElementById('game').appendChild(canvas);
  canvas.focus();

  // Create SceneManager and Levels
  sceneManager = new SceneManager();

  sceneManager.add(createMainMenu());

  for (var i = 0; i < 20; i++)
    sceneManager.add(createScene(i));

  // Add your victory level here.
}

// Edit this function to check which level you're in and make the game harder with it.
function createScene(level: number): Scene {
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
  scene.add(new Background());

  // You may want to DRY out this code.
  var player = new Player(0, {
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  });
  scene.add(player);

  scene.add(new GUI());

  // Add a Healthpack
  scene.add(new Healthpack({
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  }));

  // Past level 5 you need to spawn mini healthpacks

  scene.add(new Healthpack({
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  }, 5));


  // Add a Portal
  scene.add(new Portal({
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  }));

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
  return scene;
}

function createMainMenu() {
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
  scene.add(new Background());
  scene.add(new Menu());
  return scene;
}

function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());
  requestAnimationFrame(animate);
}

start();
animate();
