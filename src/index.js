import Snake from './snake.js';
import * as controller from './controller.js';
import * as memory from './memory.js';
import { FRAME_RATE, WIDTH, HEIGHT, PIXEL } from './config.js'

const game = {
  running: true,
  ticks: {
    last: null,
  },
  direction: 'right',
};

function reset() {
  memory.reset();
  game.canvas.width = WIDTH * PIXEL;
  game.canvas.height = HEIGHT * PIXEL;
  game.ctx.fillStyle = 'black';
  game.ctx.fillRect(0, 0, WIDTH * PIXEL, HEIGHT * PIXEL);
  game.ctx.fillStyle = 'white';

  game.user = new Snake();
  loop();
}

function draw() {
  const { ctx } = game;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH * PIXEL, HEIGHT * PIXEL);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  memory.forEach((point, i) => {
    if (!point) {
      return;
    }
    const { x, y } = memory.getXYForIndex(i);
    ctx.rect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
  })
  ctx.fill();
}

function loop(delta) {
  controller.update();
  if (game.running) {
    const { user } = game;
    // run at 60fps, not faster
    if (delta - game.ticks.last > FRAME_RATE) {
      game.ticks.last = delta;
      // check controls
      // 60 times per second - before the up occurs

      // update snake position
      ['down', 'up', 'left', 'right'].forEach(dir => {
        if (controller.isPressed(dir)) {
          game.direction = dir;
        }
      });
      user[game.direction]();

      draw();
    }
  }


  requestAnimationFrame(loop);
}

function main() {
  game.canvas = document.querySelector('canvas');
  game.ctx = game.canvas.getContext('2d');

  game.canvas.onclick = () => reset();

  setInterval(() => game.user.grow(), 1000)

  reset();
}

window.game = game;
window.memory = memory;

main();