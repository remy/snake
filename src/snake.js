import { WIDTH, HEIGHT } from './config.js';
import * as memory from './memory.js';

export default class Snake {
  head = {
    x: (WIDTH / 2) | 0,
    y: (HEIGHT / 2) | 0,
  };

  id = 1;

  x = 1;
  y = 0;

  tail = {
    x: (WIDTH / 2) | 0,
    y: (HEIGHT / 2) | 0,
  };

  points = [this.head];

  constructor() {
    this.update();
  }

  handlers = {};

  on(type, fn) {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(fn);
  }

  emit(type) {
    if (!this.handlers[type]) return;
    this.handlers[type].forEach(fn => setTimeout(fn, 0));
  }

  get size() {
    return this.points.length;
  }

  get score() {
    return this.points.length - 1;
  }

  grow() {
    this.points.push(this.head);
    this.emit('grow');
  }

  update({ x = this.head.x, y = this.head.y } = {}) {
    const peek = memory.peek({ x, y });

    if (peek === 0xff) {
      this.grow();
    } else if (peek || peek === -1) {
      this.emit('over');
      return;
    }

    const tail = this.points.shift();
    memory.write(tail, 0); // clr

    memory.write({ x, y });

    this.head = { x, y };
    this.points.push(this.head);
  }

  forward() {
    this.update({ x: this.head.x + this.x, y: this.head.y + this.y });
  }

  left() {
    if (this.y === 0) {
      // true if 1 or -1
      if (this.x === 1) {
        this.y = -1;
      } else {
        // x === -1
        this.y = 1;
      }

      this.x = 0;
    } else {
      if (this.y === 1) {
        this.x = 1;
      } else {
        this.x = -1;
      }

      this.y = 0;
    }
  }

  right() {
    if (this.y === 0) {
      if (this.x === 1) {
        this.y = 1;
      } else {
        // x === -1
        this.y = -1;
      }

      this.x = 0;
    } else {
      if (this.y === 1) {
        this.x = -1;
      } else {
        this.x = 1;
      }

      this.y = 0;
    }
  }
}
