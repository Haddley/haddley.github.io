import { Entity } from './entity.js';
import * as C from '../constants.js';

// A destructible bunker: a grid of 6 × 6 px blocks. Damaged block-by-block,
// and physically eroded when an alien descends into it.
export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, C.SHIELD_WIDTH, C.SHIELD_HEIGHT);
    this.blocks = [];
    for (let r = 0; r < C.SHIELD_ROWS; r++) {
      this.blocks[r] = new Array(C.SHIELD_COLS).fill(true);
    }
  }

  // Map a rect (bullet) onto the block grid, erase covered blocks,
  // and report whether anything was hit.
  hitTest(x, y, w, h) {
    const c0 = Math.floor((x - this.x) / C.SHIELD_BLOCK);
    const c1 = Math.ceil((x + w - this.x) / C.SHIELD_BLOCK);
    const r0 = Math.floor((y - this.y) / C.SHIELD_BLOCK);
    const r1 = Math.ceil((y + h - this.y) / C.SHIELD_BLOCK);
    let hit = false;
    for (let r = Math.max(0, r0); r < Math.min(C.SHIELD_ROWS, r1); r++) {
      for (let c = Math.max(0, c0); c < Math.min(C.SHIELD_COLS, c1); c++) {
        if (this.blocks[r][c]) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  // Erase every block overlapped by a rect (alien descent). No return value.
  eraseOverlap(x, y, w, h) {
    const c0 = Math.floor((x - this.x) / C.SHIELD_BLOCK);
    const c1 = Math.ceil((x + w - this.x) / C.SHIELD_BLOCK);
    const r0 = Math.floor((y - this.y) / C.SHIELD_BLOCK);
    const r1 = Math.ceil((y + h - this.y) / C.SHIELD_BLOCK);
    for (let r = Math.max(0, r0); r < Math.min(C.SHIELD_ROWS, r1); r++) {
      for (let c = Math.max(0, c0); c < Math.min(C.SHIELD_COLS, c1); c++) {
        this.blocks[r][c] = false;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#4dff4d';
    const x0 = Math.round(this.x);
    const y0 = Math.round(this.y);
    for (let r = 0; r < C.SHIELD_ROWS; r++) {
      for (let c = 0; c < C.SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(
            x0 + c * C.SHIELD_BLOCK + 1,
            y0 + r * C.SHIELD_BLOCK + 1,
            C.SHIELD_BLOCK - 2,
            C.SHIELD_BLOCK - 2
          );
        }
      }
    }
  }
}
