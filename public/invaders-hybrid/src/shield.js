import { Entity } from './entity.js';
import { SHIELD_ROWS, SHIELD_COLS, SHIELD_BLOCK, SHIELD_WIDTH, SHIELD_HEIGHT } from './constants.js';

export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
    
    // Build 2D boolean array with all blocks initialized to true (intact)
    this.blocks = Array.from({length: SHIELD_ROWS}, () => new Array(SHIELD_COLS).fill(true));
    
    // Optionally carve the classic arcade shield shape (a small arch/notch in the bottom corners)
    // Keep top rows intact, remove a few blocks from bottom
    if (SHIELD_ROWS >= 2) {
      // Remove some blocks from bottom row to create a notch
      for (let col = 4; col <= 7; col++) {
        if (col < SHIELD_COLS) {
          this.blocks[SHIELD_ROWS - 1][col] = false;
        }
      }
    }
  }
  
  hitTest(x, y, w, h) {
    // No hit if the rectangle does not overlap this shield at all
    if (x + w <= this.x || x >= this.x + this.width ||
        y + h <= this.y || y >= this.y + this.height) {
      return false;
    }

    // Map rectangle coordinates to block coordinates
    let col0 = Math.floor((x - this.x) / SHIELD_BLOCK);
    let row0 = Math.floor((y - this.y) / SHIELD_BLOCK);
    let col1 = Math.floor((x + w - 1 - this.x) / SHIELD_BLOCK);
    let row1 = Math.floor((y + h - 1 - this.y) / SHIELD_BLOCK);

    // Clamp indices to valid range
    col0 = Math.max(0, Math.min(col0, SHIELD_COLS - 1));
    col1 = Math.max(0, Math.min(col1, SHIELD_COLS - 1));
    row0 = Math.max(0, Math.min(row0, SHIELD_ROWS - 1));
    row1 = Math.max(0, Math.min(row1, SHIELD_ROWS - 1));

    let hit = false;

    // Check each block in the rectangle
    for (let row = row0; row <= row1; row++) {
      for (let col = col0; col <= col1; col++) {
        if (this.blocks[row][col]) {
          this.blocks[row][col] = false;
          hit = true;
        }
      }
    }

    return hit;
  }
  
  eraseOverlap(x, y, w, h) {
    // Call hitTest to erase blocks covered by the rectangle
    this.hitTest(x, y, w, h);
  }
  
  draw(ctx) {
    // Draw each intact block
    for (let row = 0; row < SHIELD_ROWS; row++) {
      for (let col = 0; col < SHIELD_COLS; col++) {
        if (this.blocks[row][col]) {
          ctx.fillStyle = '#00ff00';
          ctx.fillRect(
            this.x + col * SHIELD_BLOCK,
            this.y + row * SHIELD_BLOCK,
            SHIELD_BLOCK,
            SHIELD_BLOCK
          );
        }
      }
    }
  }
}