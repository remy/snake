export const FRAME_RATE = 100;
export const WIDTH = 50;
export const HEIGHT = 50;

const height = typeof window !== 'undefined' ? window.innerHeight : 100;

export const PIXEL = ((height / HEIGHT) * 0.6) | 0;
