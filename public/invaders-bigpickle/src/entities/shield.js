import Entity from './entity.js';
import { SHIELD_BLOCK_SIZE, SHIELD_ROWS, SHIELD_COLS, SHIELD_WIDTH, SHIELD_HEIGHT } from '../constants.js';

class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
    this.blocks = [];
    for (let r = 0; r < SHIELD_ROWS; r++) {
      this.blocks[r] = [];
      for (let c = 0; c < SHIELD_COLS; c++) {
        this.blocks[r][c] = true;
      }
    }
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.fillStyle = '#00ff88';
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(
            this.x + c * SHIELD_BLOCK_SIZE,
            this.y + r * SHIELD_BLOCK_SIZE,
            SHIELD_BLOCK_SIZE - 1,
            SHIELD_BLOCK_SIZE - 1
          );
        }
      }
    }
  }

  hitTest(x, y, w, h) {
    let hit = false;
    const left = Math.max(0, Math.floor((x - this.x) / SHIELD_BLOCK_SIZE));
    const right = Math.min(SHIELD_COLS - 1, Math.floor((x + w - this.x) / SHIELD_BLOCK_SIZE));
    const top = Math.max(0, Math.floor((y - this.y) / SHIELD_BLOCK_SIZE));
    const bottom = Math.min(SHIELD_ROWS - 1, Math.floor((y + h - this.y) / SHIELD_BLOCK_SIZE));
    for (let r = top; r <= bottom; r++) {
      for (let c = left; c <= right; c++) {
        if (this.blocks[r][c]) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  eraseOverlap(x, y, w, h) {
    const left = Math.max(0, Math.floor((x - this.x) / SHIELD_BLOCK_SIZE));
    const right = Math.min(SHIELD_COLS - 1, Math.floor((x + w - this.x) / SHIELD_BLOCK_SIZE));
    const top = Math.max(0, Math.floor((y - this.y) / SHIELD_BLOCK_SIZE));
    const bottom = Math.min(SHIELD_ROWS - 1, Math.floor((y + h - this.y) / SHIELD_BLOCK_SIZE));
    for (let r = top; r <= bottom; r++) {
      for (let c = left; c <= right; c++) {
        this.blocks[r][c] = false;
      }
    }
  }
}

export default Shield;
