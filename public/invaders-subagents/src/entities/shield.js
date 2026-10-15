import { Entity } from './entity.js';
import {
  SHIELD_ROWS,
  SHIELD_COLS,
  SHIELD_BLOCK_SIZE,
  SHIELD_WIDTH,
  SHIELD_HEIGHT,
  SHIELD_COLOR,
} from '../constants.js';

// A destructible barrier: a grid of SHIELD_ROWS x SHIELD_COLS boolean blocks, each
// SHIELD_BLOCK_SIZE x SHIELD_BLOCK_SIZE px. `true` = intact, `false` = destroyed.
export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
    this.blocks = [];
    for (let r = 0; r < SHIELD_ROWS; r++) {
      this.blocks.push(new Array(SHIELD_COLS).fill(true));
    }
  }

  update() {
    // Shields are static; damage is applied via hitTest / eraseOverlap.
  }

  draw(ctx) {
    ctx.fillStyle = SHIELD_COLOR;
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

  /**
   * Return the [row, col] indices of every block whose cell overlaps the given
   * world-space rectangle (x, y, width, height). Indices are always in-bounds; an
   * empty list means the rectangle is entirely outside the shield. Blocks are
   * SHIELD_BLOCK_SIZE px; block (r, c) covers
   * [this.x + c*B, this.x + (c+1)*B) x [this.y + r*B, this.y + (r+1)*B).
   * (Written by the main agent; used by hitTest / eraseOverlap.)
   */
  _blocksInRect(x, y, w, h) {
    const B = SHIELD_BLOCK_SIZE;
    const colStart = Math.max(0, Math.floor((x - this.x) / B));
    const colEnd = Math.min(SHIELD_COLS - 1, Math.floor((x + w - 1 - this.x) / B));
    const rowStart = Math.max(0, Math.floor((y - this.y) / B));
    const rowEnd = Math.min(SHIELD_ROWS - 1, Math.floor((y + h - 1 - this.y) / B));
    const out = [];
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        out.push([r, c]);
      }
    }
    return out;
  }

  /**
   * Erase (set to false) every intact block overlapped by the given world-space
   * rectangle (x, y, width, height), and return true if at least one block was
   * erased. Use `this._blocksInRect(x, y, w, h)` for the [row, col] indices and
   * `this.blocks[row][col]` for the boolean grid. Does not mutate blocks that are
   * already false.
   * @param {number} x @param {number} y @param {number} w @param {number} h
   * @returns {boolean} true if any block was erased
   */
  hitTest(x, y, w, h) {
    const blocks = this._blocksInRect(x, y, w, h);
    let hit = false;
    
    for (const [row, col] of blocks) {
      if (this.blocks[row][col]) {
        this.blocks[row][col] = false;
        hit = true;
      }
    }
    
    return hit;
  }

  /**
   * Erase (set to false) every intact block overlapped by the given world-space
   * rectangle (x, y, width, height), and return the number of blocks erased.
   * Use `this._blocksInRect(x, y, w, h)` for the [row, col] indices and
   * `this.blocks[row][col]` for the boolean grid. Does not count blocks already
   * false.
   * @param {number} x @param {number} y @param {number} w @param {number} h
   * @returns {number} count of blocks erased
   */
  eraseOverlap(x, y, w, h) {
    const blocks = this._blocksInRect(x, y, w, h);
    let count = 0;
    
    for (const [row, col] of blocks) {
      if (this.blocks[row][col]) {
        this.blocks[row][col] = false;
        count++;
      }
    }
    
    return count;
  }
}
