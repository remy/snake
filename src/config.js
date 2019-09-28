export const FRAME_RATE = 64;
export const WIDTH = 20;
export const HEIGHT = 20;

const width = typeof window !== 'undefined' ? window.innerWidth : 100;

export const PIXEL = ((width / WIDTH) * 0.95) | 0;
