import { Entity } from './entity.js';
import { SHIELD_COLS, SHIELD_ROWS, SHIELD_BLOCK_SIZE } from '../constants.js';

export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_COLS * SHIELD_BLOCK_SIZE, SHIELD_ROWS * SHIELD_BLOCK_SIZE);
    this.blocks = Array.from({ length: SHIELD_ROWS }, () => Array(SHIELD_COLS).fill(true));
  }

  hitTest(bx, by, bw, bh) {
    let hit = false;
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const px = this.x + c * SHIELD_BLOCK_SIZE;
        const py = this.y + r * SHIELD_BLOCK_SIZE;
        if (bx < px + SHIELD_BLOCK_SIZE && bx + bw > px &&
            by < py + SHIELD_BLOCK_SIZE && by + bh > py) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  eraseOverlap(rx, ry, rw, rh) {
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const px = this.x + c * SHIELD_BLOCK_SIZE;
        const py = this.y + r * SHIELD_BLOCK_SIZE;
        if (rx < px + SHIELD_BLOCK_SIZE && rx + rw > px &&
            ry < py + SHIELD_BLOCK_SIZE && ry + rh > py) {
          this.blocks[r][c] = false;
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#44ff44';
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(
            this.x + c * SHIELD_BLOCK_SIZE,
            this.y + r * SHIELD_BLOCK_SIZE,
            SHIELD_BLOCK_SIZE, SHIELD_BLOCK_SIZE
          );
        }
      }
    }
  }
}
