import Snake from './snake.js';
import * as controller from './controller.js';
import * as memory from './memory.js';
import { FRAME_RATE, WIDTH, HEIGHT, PIXEL } from './config.js';

const scoreEl = document.querySelector('#score');

const game = {
  running: true,
  ticks: {
    last: null,
  },
  direction: 'right',
};

function reset() {
  memory.reset();
  game.running = true;

  game.canvas.width = WIDTH * PIXEL;
  game.canvas.height = HEIGHT * PIXEL;

  game.ctx.fillStyle = 'black';
  game.ctx.fillRect(0, 0, WIDTH * PIXEL, HEIGHT * PIXEL);
  game.ctx.fillStyle = 'white';

  game.speed = FRAME_RATE;

  game.user = new Snake();

  game.user.on('grow', makeNewApple);
  game.user.on('grow', speedUp);

  game.user.on('over', gameOver);

  setTimeout(makeNewApple, 500);
  loop();
}

function gameOver() {
  game.running = false;
  scoreEl.innerHTML = 'GAME OVER ' + scoreEl.innerHTML;
}

function speedUp() {
  game.speed -= 32; // 30fps
  if (game.speed < 16) {
    game.speed = 16;
  }
}

function makeNewApple() {
  const mem = memory.memory;
  const length = mem.length;

  let i = (Math.random() * length) | 0;

  for (; i < mem; i++) {
    if (mem[i] === 0) {
      break;
    }
  }

  const { x, y } = memory.getXYForIndex(i);

  memory.write({ x, y }, 0xff);
}

function draw() {
  scoreEl.innerHTML = game.user.score;

  const { ctx } = game;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH * PIXEL, HEIGHT * PIXEL);
  ctx.fillStyle = 'white';

  const apples = [];

  // draw name
  ctx.beginPath();
  memory.forEach((point, i) => {
    if (!point) {
      return;
    }
    const { x, y } = memory.getXYForIndex(i);

    if (point === 0xff) {
      apples.push({ x, y });
      return;
    }
    ctx.rect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
  });
  ctx.fill();

  // draw apple
  ctx.beginPath();
  ctx.fillStyle = 'green';
  apples.forEach(({ x, y }) => {
    ctx.rect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
  });
  ctx.fill();
}

function loop(delta) {
  controller.update();

  // update snake position
  ['left', 'right'].forEach(dir => {
    if (controller.isPressed(dir)) {
      game.user[dir]();
      controller.needsRelease(dir);
    }
  });

  if (game.running) {
    const { user } = game;
    // run at 60fps, not faster
    if (delta - game.ticks.last > game.speed) {
      game.ticks.last = delta;
      // check controls
      // 60 times per second - before the up occurs

      user.forward();

      draw();
    }
  }

  requestAnimationFrame(loop);
}

function main() {
  game.canvas = document.querySelector('canvas');
  game.ctx = game.canvas.getContext('2d');

  controller.bindSelector('left', 'body');

  game.canvas.onclick = () => {
    if (!game.running) reset();
  };

  reset();
}

window.game = game;
window.memory = memory;

main();
