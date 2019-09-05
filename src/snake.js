import { WIDTH, HEIGHT} from './config.js';
import * as memory from './memory.js';

export default class Snake {
  head = { 
    x: WIDTH/2|0,
    y: HEIGHT/2|0,
  }

  tail = { 
    x: WIDTH/2|0,
    y: HEIGHT/2|0,
  }

  size = 1;

  constructor() {
    this.update();
  }

  grow() {
    this.size = this.size + 1;
  }

  update() {
    if (memory.isFree(this.head)) {
      memory.write(this.head);
    } else {
      throw new Error('game over');
    }
  }

  up() {
    memory.write(this.head, 0);
    this.head.y--;
    this.update();
  }

  down() {
    memory.write(this.head, 0);
    this.head.y++;
    this.update();
  }

  left() {
    memory.write(this.head, 0);
    this.head.x--;
    this.update();
  }

  right() {
    memory.write(this.head, 0);
    this.head.x++;
    this.update();
  }
}