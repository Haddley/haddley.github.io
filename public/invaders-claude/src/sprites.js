// Squid (rows 0-1): 30 pts
export const SQUID_A = [
  '   XXXX   ',
  ' XXXXXXXX ',
  'XXXXXXXXXX',
  'XXX XX XXX',
  'XXXXXXXXXX',
  '  XX  XX  ',
  ' X XXXX X ',
  'X        X',
];
export const SQUID_B = [
  '   XXXX   ',
  ' XXXXXXXX ',
  'XXXXXXXXXX',
  'XXX XX XXX',
  'XXXXXXXXXX',
  '   XXXX   ',
  '  X    X  ',
  ' X      X ',
];

// Crab (rows 2-3): 20 pts
export const CRAB_A = [
  '  X    X  ',
  'X  XXXX  X',
  'XXXXXXXXXX',
  'XX XXXX XX',
  'XXXXXXXXXX',
  ' XXXXXXXX ',
  '  X    X  ',
  ' X      X ',
];
export const CRAB_B = [
  '  X    X  ',
  '   XXXX   ',
  'XXXXXXXXXX',
  'XX XXXX XX',
  'XXXXXXXXXX',
  ' XXXXXXXX ',
  ' X      X ',
  'X        X',
];

// Octopus (row 4): 10 pts
export const OCTOPUS_A = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XX XX XX XX ',
  'XXXXXXXXXXXX',
  ' X XXXXXX X ',
  '    X  X    ',
  '   X    X   ',
];
export const OCTOPUS_B = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XX XX XX XX ',
  'XXXXXXXXXXXX',
  '  XXXXXXXX  ',
  ' X        X ',
  '  X      X  ',
];

export const UFO_SPRITE = [
  '    XXXXXX    ',
  ' XXXXXXXXXX  ',
  'XXXXXXXXXXXX ',
  ' XX  XX  XX  ',
];

export const PLAYER_SPRITE = [
  '    X    ',
  '   XXX   ',
  '   XXX   ',
  'XXXXXXXXX',
  'XXXXXXXXX',
  'XXXXXXXXX',
];

export function drawSprite(ctx, x, y, w, h, pixels, color) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const pw = w / cols;
  const ph = h / rows;
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pixels[r][c] === 'X') {
        ctx.fillRect(
          Math.round(x + c * pw),
          Math.round(y + r * ph),
          Math.max(1, Math.ceil(pw)),
          Math.max(1, Math.ceil(ph))
        );
      }
    }
  }
}
