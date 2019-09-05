export const FRAME_RATE = 200;
export const WIDTH = 20;
export const HEIGHT = 20;

const height = typeof window !== 'undefined' ? window.innerHeight : 100;

export const PIXEL = ((height / HEIGHT) * 0.6) | 0;
