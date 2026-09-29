// Pixel art. 'X' = filled pixel, ' ' = empty.
// RULE: every row of one sprite must have exactly the same length.

// Squid (rows 0-1), 8 x 8
export const SQUID_A = [
  '   XX   ',
  '  XXXX  ',
  ' XXXXXX ',
  'XX XX XX',
  'XXXXXXXX',
  '  X  X  ',
  ' X XX X ',
  'X X  X X',
];
export const SQUID_B = [
  '   XX   ',
  '  XXXX  ',
  ' XXXXXX ',
  'XX XX XX',
  'XXXXXXXX',
  ' X XX X ',
  'X      X',
  ' X    X ',
];

// Crab (rows 2-3), 11 x 8
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
  'X  X   X  X',
  'X XXXXXXX X',
  'XXX XXX XXX',
  'XXXXXXXXXXX',
  ' XXXXXXXXX ',
  '  X     X  ',
  ' X       X ',
];

// Octopus (row 4), 12 x 8
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
  '  XXX  XXX  ',
  ' XX  XX  XX ',
  '  XX    XX  ',
];

// UFO, 16 x 7
export const UFO_SPRITE = [
  '     XXXXXX     ',
  '   XXXXXXXXXX   ',
  '  XXXXXXXXXXXX  ',
  ' XX XX XX XX XX ',
  'XXXXXXXXXXXXXXXX',
  '  XXX  XX  XXX  ',
  '   X        X   ',
];

// Player cannon, 13 x 8
export const PLAYER_SPRITE = [
  '      X      ',
  '     XXX     ',
  '     XXX     ',
  ' XXXXXXXXXXX ',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
];

// Draws a sprite with square pixels, centred inside the box (x, y, w, h).
export function drawSprite(ctx, x, y, w, h, pixels, color) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const size = Math.max(1, Math.floor(Math.min(w / cols, h / rows)));
  const left = Math.round(x + (w - cols * size) / 2);
  const top = Math.round(y + (h - rows * size) / 2);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pixels[r][c] === 'X') {
        ctx.fillRect(left + c * size, top + r * size, size, size);
      }
    }
  }
}