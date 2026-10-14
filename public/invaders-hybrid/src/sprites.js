export function drawSprite(ctx, x, y, w, h, pixels, color) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const cellWidth = w / cols;
  const cellHeight = h / rows;

  ctx.fillStyle = color;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pixels[row][col] === 'X') {
        ctx.fillRect(x + col * cellWidth, y + row * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

export const PLAYER_SPRITE = [
  '      X      ',
  '      X      ',
  '     XXX     ',
  '     XXX     ',
  '    XXXXX    ',
  '   XXXXXXX   ',
  '  XXXXXXXXX  ',
  'XXXXXXXXXXXXX'
];

export const ALIEN_SQUID_A = [
  '   X    X   ',
  '  XX    XX  ',
  '   XXXXXX   ',
  '  XXXXXXXX  ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XX  XXXX  XX',
  ' X        X '
];

export const ALIEN_SQUID_B = [
  '   X    X   ',
  '  XX    XX  ',
  '   XXXXXX   ',
  '  XXXXXXXX  ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  ' X  XXXX  X ',
  'X          X'
];

export const ALIEN_CRAB_A = [
  '  XX    XX  ',
  ' XXXX  XXXX ',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '  XXXXXXXX  ',
  '  XX    XX  ',
  ' XX      XX ',
  'XX        XX'
];

export const ALIEN_CRAB_B = [
  '  XX    XX  ',
  ' XXXX  XXXX ',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  '  XXXXXXXX  ',
  ' XX      XX ',
  'X X      X X',
  'XX        XX'
];

export const ALIEN_OCTOPUS_A = [
  '   XXXXXX   ',
  '  XXXXXXXX  ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XX   XX   XX',
  ' X X X X X  '
];

export const ALIEN_OCTOPUS_B = [
  '   XXXXXX   ',
  '  XXXXXXXX  ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  ' X X X X X  ',
  'XX   XX   XX'
];

export const UFO_SPRITE = [
  '      XXXX      ',
  '    XXXXXXXX    ',
  '   XXXXXXXXXX   ',
  '  XXXXXXXXXXXX  ',
  ' XXXXXXXXXXXXXX '
];