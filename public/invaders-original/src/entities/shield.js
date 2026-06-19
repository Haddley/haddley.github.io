import { Entity } from './entity.js';
import { SHIELD_BLOCK_SIZE, SHIELD_COLS, SHIELD_ROWS, SHIELD_WIDTH, SHIELD_HEIGHT } from '../constants.js';

const SHIELD_SHAPE = [
  '  XXXXXXXX  ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXXXXXXXXXXX',
  'XXXX    XXXX',
  'XXXX    XXXX',
];

export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
    this.dead = false;
    this.blocks = SHIELD_SHAPE.map(row => row.split('').map(c => c === 'X'));
  }

  hitTest(bx, by, bw, bh) {
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const blockX = this.x + c * SHIELD_BLOCK_SIZE;
        const blockY = this.y + r * SHIELD_BLOCK_SIZE;
        if (bx < blockX + SHIELD_BLOCK_SIZE && bx + bw > blockX &&
            by < blockY + SHIELD_BLOCK_SIZE && by + bh > blockY) {
          this.blocks[r][c] = false;
          return true;
        }
      }
    }
    return false;
  }

  eraseOverlap(rx, ry, rw, rh) {
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const bx = this.x + c * SHIELD_BLOCK_SIZE;
        const by = this.y + r * SHIELD_BLOCK_SIZE;
        if (rx < bx + SHIELD_BLOCK_SIZE && rx + rw > bx &&
            ry < by + SHIELD_BLOCK_SIZE && ry + rh > by) {
          this.blocks[r][c] = false;
        }
      }
    }
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.fillStyle = '#0a0';
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(
            this.x + c * SHIELD_BLOCK_SIZE,
            this.y + r * SHIELD_BLOCK_SIZE,
            SHIELD_BLOCK_SIZE,
            SHIELD_BLOCK_SIZE
          );
        }
      }
    }
  }
}
