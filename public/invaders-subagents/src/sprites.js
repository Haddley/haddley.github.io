// ASCII pixel-art definitions + the shared sprite renderer.
// 'X' = filled pixel, ' ' = empty. Every row in a sprite is the same length.

export const SPRITE_SCALE = 3; // px per sprite character

// ---- Player cannon (13 x 8) ------------------------------------------------
export const PLAYER_SPRITE = [
  '......X......',
  '.....XXX.....',
  '.....XXX.....',
  '.XXXXXXXXXXX.',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
];

// ---- Aliens (11 x 8 each) --------------------------------------------------
export const SQUID_A = [
  '..X.....X..',
  '...X...X...',
  '..XXXXXXX..',
  '.XX.XXX.XX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
];

export const CRAB_A = [
  '..X.....X..',
  'X..X...X..X',
  'X.XXXXXXX.X',
  'XXX.XXX.XXX',
  'XXXXXXXXXXX',
  '.XXXXXXXXX.',
  '..X.....X..',
  '.X.......X.',
];

export const OCTOPUS_A = [
  '...XXXXX...',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'XXX.XXX.XXX',
  'XXXXXXXXXXX',
  '...X...X...',
  '..XX...XX..',
  '.XX.....XX.',
];

// The second animation frame is the first frame with the bottom two rows swapped,
// which gives the classic "tentacle wiggle".
function altFrame(pixels) {
  const rows = pixels.slice();
  const last = rows.length - 1;
  const tmp = rows[last];
  rows[last] = rows[last - 1];
  rows[last - 1] = tmp;
  return rows;
}

export const SQUID_B = altFrame(SQUID_A);
export const CRAB_B = altFrame(CRAB_A);
export const OCTOPUS_B = altFrame(OCTOPUS_A);

// ---- UFO (16 x 7) ----------------------------------------------------------
export const UFO_SPRITE = [
  '.....XXXXXX.....',
  '...XXXXXXXXXX...',
  '..XXXXXXXXXXXX..',
  '.XXXXXXXXXXXXXX.',
  'XXXXXXXXXXXXXXXX',
  '..X..X..X..X....',
  '...X..X..X..X...',
];

// ---- Renderer --------------------------------------------------------------
/**
 * Draw a sprite into `ctx`, rendering each 'X' as a SPRITE_SCALE x SPRITE_SCALE
 * filled rectangle in `color`. The whole sprite is centered inside the bounding box
 * (x, y, width, height). Does not clear or stroke; just fills pixels.
 */
export function drawSprite(ctx, x, y, width, height, pixels, color) {
  const rows = pixels.length;
  const cols = rows > 0 ? pixels[0].length : 0;
  const pixelW = cols * SPRITE_SCALE;
  const pixelH = rows * SPRITE_SCALE;
  const offX = (width - pixelW) / 2;
  const offY = (height - pixelH) / 2;
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    const line = pixels[r];
    for (let c = 0; c < cols; c++) {
      if (line[c] === 'X') {
        ctx.fillRect(
          x + offX + c * SPRITE_SCALE,
          y + offY + r * SPRITE_SCALE,
          SPRITE_SCALE,
          SPRITE_SCALE
        );
      }
    }
  }
}
