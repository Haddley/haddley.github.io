const ALIEN_SQUID_FRAME_0 = [
  '    XXXX    ',
  '   XX  XX   ',
  '  XXXXXXXX  ',
  ' XX XX XX X ',
  ' XXXXXXXXXX ',
  ' X   XX   X ',
  '            ',
  '  XXXX  XXX ',
];

const ALIEN_SQUID_FRAME_1 = [
  '    XXXX    ',
  '   XX  XX   ',
  '  XXXXXXXX  ',
  ' XX XX XX X ',
  ' XXXXXXXXXX ',
  '     XX     ',
  '   XXXXXX   ',
  '  XX    XX  ',
];

const ALIEN_CRAB_FRAME_0 = [
  ' XXXXXXXXXX ',
  'X X  XX  X X',
  'XXXXXXXXXXXX',
  'XX X XXX X X',
  ' XXXXXXXXXX ',
  '    XXXX    ',
  '  XXXX  XXXX',
  'XXX         ',
];

const ALIEN_CRAB_FRAME_1 = [
  ' XXXXXXXXXX ',
  'X X  XX  X X',
  'XXXXXXXXXXXX',
  'XX X XXX X X',
  ' XXXXXXXXXX ',
  '    XXXX    ',
  '   X    X   ',
  '  XXX  XXX  ',
];

const ALIEN_OCTOPUS_FRAME_0 = [
  '   XXXXX    ',
  ' XXXXXXXX   ',
  'XX XXX XXXXX',
  'XXXXXXXXXXXX',
  ' XXX   XXX  ',
  '  XXX XXX   ',
  ' XXXX XXXX  ',
  'XXX     XXXX',
];

const ALIEN_OCTOPUS_FRAME_1 = [
  '   XXXXX    ',
  ' XXXXXXXX   ',
  'XX XXX XXXXX',
  'XXXXXXXXXXXX',
  ' XXX   XXX  ',
  '  XX X XX   ',
  '  XXX XXX   ',
  ' XXX   XXX  ',
];

const PLAYER_SPRITE = [
  '        X         ',
  '       XXX        ',
  '      XXXXX       ',
  '     XXXXXXX      ',
  '    XXXXXXXXXXX   ',
  '   XXXXXXXXXXXXX  ',
  '  XXXXXXXXXXXXXXX ',
  ' XXXXXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXXXXXX',
];

const UFO_SPRITE = [
  '         XXXX         ',
  '       XXXXXXXX       ',
  '     XXXXXXXXXXXX     ',
  '   XXXXXXXXXXXXXXXX   ',
  '  XXXXXXXXXXXXXXXXXX  ',
  ' XXXXXXXXXXXXXXXXXXXX ',
  'XXXXXXXXXXXXXXXXXXXXXX',
  ' XXXXXXXXXXXXXXXXXXXX ',
  '  XXXXXXXXXXXXXXXXXX  ',
  '    XXX   XXX   XXX   ',
];

const EXPLOSION_SPRITE = [
  '  XXXXXXXXXX  ',
  ' XXXXXXXXXXXX ',
  'XXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXX',
  ' XXXXXXXXXXXX ',
  '  XXXXXXXXXX  ',
  '   XXXXXXXX   ',
  '    XXXXXX    ',
  '     XXXX     ',
  '      XX      ',
];

function drawSprite(ctx, x, y, w, h, pixels, color) {
  ctx.fillStyle = color;
  const rows = pixels.length;
  const cols = pixels[0].length;
  const pixelW = w / cols;
  const pixelH = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pixels[r][c] === 'X') {
        ctx.fillRect(
          Math.floor(x + c * pixelW),
          Math.floor(y + r * pixelH),
          Math.ceil(pixelW),
          Math.ceil(pixelH)
        );
      }
    }
  }
}

export {
  ALIEN_SQUID_FRAME_0,
  ALIEN_SQUID_FRAME_1,
  ALIEN_CRAB_FRAME_0,
  ALIEN_CRAB_FRAME_1,
  ALIEN_OCTOPUS_FRAME_0,
  ALIEN_OCTOPUS_FRAME_1,
  PLAYER_SPRITE,
  UFO_SPRITE,
  EXPLOSION_SPRITE,
  drawSprite,
};
