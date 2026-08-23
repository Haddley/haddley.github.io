// ---------------------------------------------------------------------------
// sprites.js — ASCII pixel-art definitions + drawSprite().
//
// 'X' = filled pixel, ' ' = empty. Each 'X' renders as a 3×3 px rect by
// default (see cellSize param), centered inside the entity bounding box.
// Aliens and the UFO carry two animation frames.
// ---------------------------------------------------------------------------

const SQUID_A = [
  '..X.....X..',
  '...X...X...',
  '..XXXXXXX..',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
];

const SQUID_B = [
  '..X.....X..',
  '...X...X...',
  '..XXXXXXX..',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  '..X.....X..',
  '..XX...XX..',
];

const CRAB_A = [
  '.X.......X.',
  '..X.....X..',
  '..XX...XX..',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
];

const CRAB_B = [
  '.X.......X.',
  '..X.....X..',
  '..XX...XX..',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'XX.XXXXX.XX',
  'X.X.....X.X',
  '...XX.XX...',
];

const OCTOPUS_A = [
  '....X.X....',
  '...XXXXX...',
  '..XX...XX..',
  '.XX.XXX.XX.',
  'XXXXXXXXXXX',
  'X.XXXXXXX.X',
  'X.X.....X.X',
  '...XX.XX...',
];

const OCTOPUS_B = [
  '....X.X....',
  '...XXXXX...',
  '..XX...XX..',
  '.XX.XXX.XX.',
  'XXXXXXXXXXX',
  'XX.XXXXX.XX',
  'X.X.....X.X',
  '...XX.XX...',
];

const UFO_A = [
  '.....XXXXXX.....',
  '...XXXXXXXXXX...',
  '..XXXXXXXXXXXX..',
  '.XXXXXXXXXXXXXX.',
  'XXXXXXXXXXXXXXXX',
  'X.XXXXXXXXXXXX.X',
  '..X..........X..',
];

const UFO_B = [
  '.....XXXXXX.....',
  '...XXXXXXXXXX...',
  '..XXXXXXXXXXXX..',
  '.XXXXXXXXXXXXXX.',
  'XXXXXXXXXXXXXXXX',
  'X.XXXXXXXXXXXX.X',
  '...X........X...',
];

const PLAYER = [
  '......X......',
  '.....XXX.....',
  '....XXXXX....',
  '...XXXXXXX...',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
];

const MINI_CANNON = [
  '.....X.....',
  '....XXX....',
  '....XXX....',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
];

const PLAYER_BULLET = ['XXX', 'XXX', 'XXX', 'XXX'];

const ALIEN_BULLET = [
  '..X',
  '.X.',
  'X..',
  'X..',
  '.X.',
  '..X',
  '.X.',
];

// Shield silhouette: 6 rows × 12 cols, bottom notch like the arcade original.
const SHIELD_SHAPE = [
  '.XXXXXXXXXX.',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXX......XXX',
];

export const SPRITES = {
  squid: [SQUID_A, SQUID_B],
  crab: [CRAB_A, CRAB_B],
  octopus: [OCTOPUS_A, OCTOPUS_B],
  ufo: [UFO_A, UFO_B],
  player: PLAYER,
  miniCannon: MINI_CANNON,
  playerBullet: PLAYER_BULLET,
  alienBullet: ALIEN_BULLET,
  shield: SHIELD_SHAPE,
};

/**
 * Resolve a sprite to a single frame. Accepts either a bare pixel array
 * (one frame) or an array of frames.
 */
export function getFrame(pixels, index) {
  if (!pixels || pixels.length === 0) return [];
  if (typeof pixels[0] === 'string') return pixels;
  return pixels[index % pixels.length];
}

/**
 * Render a pixel-art sprite centered in the (x, y, w, h) box.
 * Each 'X' cell is a cellSize × cellSize filled rect.
 */
export function drawSprite(ctx, x, y, w, h, pixels, color, cellSize = 3) {
  const frame = getFrame(pixels, 0);
  if (!frame || frame.length === 0) return;
  const rows = frame.length;
  const cols = frame[0].length;
  const pxW = cols * cellSize;
  const pxH = rows * cellSize;
  const ox = Math.round(x + (w - pxW) / 2);
  const oy = Math.round(y + (h - pxH) / 2);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    const row = frame[r];
    for (let c = 0; c < cols; c++) {
      if (row[c] === 'X') {
        ctx.fillRect(ox + c * cellSize, oy + r * cellSize, cellSize, cellSize);
      }
    }
  }
}
