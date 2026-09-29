import { Entity } from './entity.js';
import { SHIELD_COLS, SHIELD_ROWS, SHIELD_BLOCK_SIZE, COLORS } from '../constants.js';

// A bunker made of a grid of small blocks. blocks[row][col] === true means the block exists.
export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_COLS * SHIELD_BLOCK_SIZE, SHIELD_ROWS * SHIELD_BLOCK_SIZE);
    this.blocks = [];
    for (let r = 0; r < SHIELD_ROWS; r++) {
      const row = [];
      for (let c = 0; c < SHIELD_COLS; c++) {
        // Cut an arch out of the bottom middle: bottom 2 rows, columns 4 to 7.
        const isArch = r >= SHIELD_ROWS - 2 && c >= 4 && c <= 7;
        row.push(!isArch);
      }
      this.blocks.push(row);
    }
  }

  // Erases every block that overlaps the rectangle. Returns true if at least one was erased.
  _erase(x, y, w, h) {
    let hit = false;
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const bx = this.x + c * SHIELD_BLOCK_SIZE;
        const by = this.y + r * SHIELD_BLOCK_SIZE;
        if (x < bx + SHIELD_BLOCK_SIZE && x + w > bx &&
            y < by + SHIELD_BLOCK_SIZE && y + h > by) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  // For bullets: true means "a block was hit, kill the bullet".
  hitTest(x, y, w, h) { return this._erase(x, y, w, h); }

  // For aliens walking through the shield.
  eraseOverlap(x, y, w, h) { this._erase(x, y, w, h); }

  draw(ctx) {
    ctx.fillStyle = COLORS.green;
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(this.x + c * SHIELD_BLOCK_SIZE, this.y + r * SHIELD_BLOCK_SIZE,
                       SHIELD_BLOCK_SIZE, SHIELD_BLOCK_SIZE);
        }
      }
    }
  }
}