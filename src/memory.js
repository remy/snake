import { WIDTH, HEIGHT } from './config.js';

export const memory = new Uint8Array(WIDTH * HEIGHT);
export const pages = [Uint8Array.from(memory)];

export const loadMemory = test => {
  reset();
  const lines = test.split('\n');
  let ctr = memory.length - 1;
  for (let i = lines.length - 1; i >= 0; i--) {
    for (let k = lines[i].length - 1; k >= 0; k--) {
      const chr = lines[i][k];
      if (chr !== '0') {
        memory[ctr] = chr.charCodeAt(0);
      } else {
        memory[ctr] = 0;
      }
      ctr--;
    }
  }

  pages.push(Uint8Array.from(memory));
};

export const reset = () => {
  pages.length = 0;
  memory.fill(0);
};

export const forEach = cb => memory.forEach(cb);

export const getIndexForXY = (x, y, width = WIDTH) => {
  if (x < 0) {
    throw new Error(`out of bounds: x(${x}) < 0`);
  }

  if (x >= WIDTH) {
    throw new Error(`out of bounds: x(${x}) > WIDTH(${WIDTH})`);
  }

  if (y < 0) {
    throw new Error(`out of bounds: y(${y}) < 0`);
  }

  if (y >= HEIGHT) {
    throw new Error(`out of bounds: y(${y}) > HEIGHT(${HEIGHT})`);
  }

  return width * y + x;
};

export const getXYForIndex = i => {
  const x = i % WIDTH;
  const y = (i / WIDTH) | 0;

  return { x, y };
};

export const toString = (source = memory) =>
  source
    .reduce((acc, curr, i) => {
      const { y } = getXYForIndex(i);
      if (!acc[y]) acc[y] = '';
      acc[y] += curr ? String.fromCharCode(curr === 1 ? 88 : curr) : ' ';
      return acc;
    }, [])
    .join('\n');

export const write = (user, value = 1) => {
  const {
    x,
    y,
  } = user;

  // ordering is important so we can jump straight to the shape value
  let i = getIndexForXY(x, y);
  memory[i] = value; // char.charCodeAt(1); // (ignored for now)

  pages.push(Uint8Array.from(memory));
};

export const test = user => {
  const { x, y } = user;

  let hit = false;
  let i = getIndexForXY(x, y);
  if (memory[i]) hit = true;

  return { hit };
};

export const isFree = user => {
  try {
    return !test(user).hit;
  } catch (E) {
    // console.log(E);
    return false;
  }
};