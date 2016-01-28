import {Renderer} from './lib/renderer';

import {Back} from './menu/back';
import {Menu} from './menu/menu';
import {Player} from './ships/player';
import {Enemy} from './ships/enemy';
var renderer;

function start() {
  renderer = new Renderer();
  document.getElementById('game').appendChild(renderer.canvas);
}

function createScene() {
var player = new Player(0, {
  x: Math.floor(Math.random() * renderer.scene.width),
  y: Math.floor(Math.random() * renderer.scene.height)
});
console.log(player);

  renderer.scene.add(new Back());

  renderer.scene.add(player);
  for (var i = 0; i < 10; i++)
  renderer.scene.add(new Enemy( 1, {
    x: Math.floor(Math.random() * renderer.scene.width),
    y: Math.floor(Math.random() * renderer.scene.height)
  }));
}

function animate() {
  renderer.update();
  renderer.render();
  requestAnimationFrame(animate);
}

start();
createScene();
animate();
