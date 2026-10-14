// ASCII pixel-art definitions. 'X' = filled pixel, ' ' = empty.
import { PIXEL_SIZE } from './constants.js';

// Squid (small invader) — 8 × 8
export const SQUID_A = [
  '   XX   ',
  '  X  X  ',
  '  X  X  ',
  ' XX  XX ',
  'XXXXXXXX',
  'X XXXX X',
  'X X  X X',
  '   XX   ',
];
export const SQUID_B = [
  '   XX   ',
  '  X  X  ',
  '  X  X  ',
  ' XX  XX ',
  'XXXXXXXX',
  'X XXXX X',
  'X X  X X',
  '  X  X  ',
];

// Crab (medium invader) — 11 × 8
export const CRAB_A = [
  '  X     X  ',
  '   X   X   ',
  '  XXXXXXX  ',
  ' XX XXX XX ',
  'XXXXXXXXXXX',
  'X XXXXXXX X',
  'X X     X X',
  '   XX XX   ',
];
export const CRAB_B = [
  '  X     X  ',
  '   X   X   ',
  '  XXXXXXX  ',
  ' XX XXX XX ',
  'XXXXXXXXXXX',
  'X XXXXXXX X',
  'X X     X X',
  '  X  X  X  ',
];

// Octopus (large invader) — 12 × 8
export const OCTOPUS_A = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXX  XX  XXX',
  'XXXXXXXXXXXX',
  '   XX  XX   ',
  '  XX XX XX  ',
  'XX        XX',
];
export const OCTOPUS_B = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXX  XX  XXX',
  'XXXXXXXXXXXX',
  '   XX  XX   ',
  '  XX XX XX  ',
  '  XX    XX  ',
];

// Player cannon — 13 × 8
export const PLAYER_SPRITE = [
  '      X      ',
  '     XXX     ',
  '     XXX     ',
  '  XXXXXXXXX  ',
  ' XXXXXXXXXXX ',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
];

// Mystery UFO — 16 × 7
export const UFO_SPRITE = [
  '     XXXXXX     ',
  '   XXXXXXXXXX   ',
  '  XXXXXXXXXXXX  ',
  ' XX  XX  XX  XX ',
  'XXXXXXXXXXXXXXXX',
  '  XXX  XX  XXX  ',
  '   X        X   ',
];

/**
 * Draw a sprite defined as an array of strings, centered inside a w × h box.
 * Each 'X' is rendered as a `pixel × pixel` filled rectangle.
 */
export function drawSprite(ctx, x, y, w, h, pixels, color, pixel = PIXEL_SIZE) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const sw = cols * pixel;
  const sh = rows * pixel;
  // Snap to the pixel grid so fractional entity positions do not smear sprites.
  const ox = Math.round(x + (w - sw) / 2);
  const oy = Math.round(y + (h - sh) / 2);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    const line = pixels[r];
    for (let c = 0; c < cols; c++) {
      if (line[c] === 'X') {
        ctx.fillRect(ox + c * pixel, oy + r * pixel, pixel, pixel);
      }
    }
  }
}
