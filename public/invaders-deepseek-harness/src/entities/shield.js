// ---------------------------------------------------------------------------
// shield.js — a destructible bunker. A boolean block grid is erased
// block-by-block by bullets and by aliens descending into it.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  SHIELD_WIDTH,
  SHIELD_HEIGHT,
  SHIELD_BLOCK,
  COLORS,
} from '../constants.js';
import { SPRITES } from '../sprites.js';

const ROWS = SPRITES.shield.length;
const COLS = SPRITES.shield[0].length;

export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
    this.rows = ROWS;
    this.cols = COLS;
    this.blocks = [];
    for (let r = 0; r < ROWS; r++) {
      this.blocks[r] = [];
      for (let c = 0; c < COLS; c++) {
        this.blocks[r][c] = SPRITES.shield[r][c] === 'X';
      }
    }
  }

  /**
   * Erase every block covered by the rect (x, y, w, h) and report whether
   * anything was actually removed. `hitTest` is used for bullet impacts
   * (the caller stops the bullet), `eraseOverlap` for alien descent erosion.
   */
  _eraseRect(x, y, w, h) {
    let hit = false;
    const c0 = Math.max(0, Math.floor((x - this.x) / SHIELD_BLOCK));
    const c1 = Math.min(this.cols - 1, Math.floor((x + w - this.x - 1) / SHIELD_BLOCK));
    const r0 = Math.max(0, Math.floor((y - this.y) / SHIELD_BLOCK));
    const r1 = Math.min(this.rows - 1, Math.floor((y + h - this.y - 1) / SHIELD_BLOCK));
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        if (this.blocks[r][c]) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  hitTest(x, y, w, h) {
    return this._eraseRect(x, y, w, h);
  }

  eraseOverlap(x, y, w, h) {
    this._eraseRect(x, y, w, h);
  }

  draw(ctx) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!this.blocks[r][c]) continue;
        const bx = this.x + c * SHIELD_BLOCK;
        const by = this.y + r * SHIELD_BLOCK;
        ctx.fillStyle = (r + c) % 2 === 0 ? COLORS.shieldA : COLORS.shieldB;
        ctx.fillRect(bx, by, SHIELD_BLOCK, SHIELD_BLOCK);
      }
    }
  }
}
