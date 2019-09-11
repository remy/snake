export const FRAME_RATE = 100;
export const WIDTH = 50;
export const HEIGHT = 50;

const width = typeof window !== 'undefined' ? window.innerWidth : 100;

export const PIXEL = ((width / WIDTH) * 0.9) | 0;
