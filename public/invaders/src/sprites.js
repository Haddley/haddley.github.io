export const PLAYER_PIXELS = [
  '     X     ',
  '    XXX    ',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  ' X       X ',
];

// Top 2 rows — squid
export const ALIEN_A = [
  [
    '  X     X  ',
    '   X   X   ',
    '  XXXXXXX  ',
    ' XX XXX XX ',
    'XXXXXXXXXXX',
    ' X XXXXX X ',
    ' X X   X X ',
    '    X X    ',
  ],
  [
    '  X     X  ',
    'X  X   X  X',
    'X XXXXXXX X',
    'XXX XXX XXX',
    'XXXXXXXXXXX',
    '  XXXXXXX  ',
    ' X       X ',
    'X         X',
  ],
];

// Middle 2 rows — crab
export const ALIEN_B = [
  [
    ' X       X ',
    '  X     X  ',
    '  XXXXXXX  ',
    ' XX X X XX ',
    'XXXXXXXXXXX',
    'XX X   X XX',
    'X  XXXXX  X',
    '   X   X   ',
  ],
  [
    ' X       X ',
    'X X     X X',
    'X XXXXXXX X',
    ' XXX X XXX ',
    'XXXXXXXXXXX',
    ' X XXXXX X ',
    '  XX   XX  ',
    ' X       X ',
  ],
];

// Bottom row — octopus
export const ALIEN_C = [
  [
    '   X   X   ',
    '    X X    ',
    '   XXXXX   ',
    '  XX X XX  ',
    ' XXXXXXXXX ',
    'X X     X X',
    'X         X',
    ' X X   X X ',
  ],
  [
    '   X   X   ',
    '  X     X  ',
    '   XXXXX   ',
    '  XX X XX  ',
    ' XXXXXXXXX ',
    ' XX     XX ',
    'X  X   X  X',
    '   X   X   ',
  ],
];

// Classic flying saucer — 12 wide × 5 tall
export const UFO_PIXELS = [
  '   XXXXXX   ',
  ' XXXXXXXXXX ',
  'XX XXXXXX XX',
  ' XXXXXXXXXX ',
  '  XX    XX  ',
];

export function drawSprite(ctx, x, y, w, h, pixels, color) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const pixelSize = 3;
  const ox = Math.floor((w - cols * pixelSize) / 2);
  const oy = Math.floor((h - rows * pixelSize) / 2);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pixels[r][c] === 'X') {
        ctx.fillRect(x + ox + c * pixelSize, y + oy + r * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}
