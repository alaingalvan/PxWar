import {Renderer} from './lib/renderer';

import {Back} from './menu/back';
import {Menu} from './menu/menu';
import {Player} from './ships/player';

var renderer;

function start() {
  renderer = new Renderer();
  document.getElementById('game').appendChild(renderer.canvas);
}

function createScene() {
  renderer.scene.add(new Back());
  renderer.scene.add(new Menu());
}

function animate() {
  renderer.render();
  requestAnimationFrame(animate);
}

start();
createScene();
animate();
