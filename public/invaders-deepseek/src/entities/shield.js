import { Entity } from './entity.js';
import { SHIELD_WIDTH, SHIELD_HEIGHT, SHIELD_BLOCK_SIZE, SHIELD_COLS, SHIELD_ROWS } from '../constants.js';

export class Shield extends Entity {
    constructor(x, y) {
        super(x, y, SHIELD_WIDTH, SHIELD_HEIGHT);
        this.blocks = [];
        for (let row = 0; row < SHIELD_ROWS; row++) {
            this.blocks[row] = [];
            for (let col = 0; col < SHIELD_COLS; col++) {
                this.blocks[row][col] = true;
            }
        }
    }

    hitTest(bullet) {
        let hit = false;
        for (let row = 0; row < SHIELD_ROWS; row++) {
            for (let col = 0; col < SHIELD_COLS; col++) {
                if (!this.blocks[row][col]) continue;
                const bx = this.x + col * SHIELD_BLOCK_SIZE;
                const by = this.y + row * SHIELD_BLOCK_SIZE;
                if (bullet.x < bx + SHIELD_BLOCK_SIZE &&
                    bullet.x + bullet.width > bx &&
                    bullet.y < by + SHIELD_BLOCK_SIZE &&
                    bullet.y + bullet.height > by) {
                    this.blocks[row][col] = false;
                    hit = true;
                }
            }
        }
        return hit;
    }

    eraseOverlap(rectX, rectY, rectW, rectH) {
        let erased = false;
        for (let row = 0; row < SHIELD_ROWS; row++) {
            for (let col = 0; col < SHIELD_COLS; col++) {
                if (!this.blocks[row][col]) continue;
                const bx = this.x + col * SHIELD_BLOCK_SIZE;
                const by = this.y + row * SHIELD_BLOCK_SIZE;
                if (rectX < bx + SHIELD_BLOCK_SIZE &&
                    rectX + rectW > bx &&
                    rectY < by + SHIELD_BLOCK_SIZE &&
                    rectY + rectH > by) {
                    this.blocks[row][col] = false;
                    erased = true;
                }
            }
        }
        return erased;
    }

    isEmpty() {
        for (let row = 0; row < SHIELD_ROWS; row++) {
            for (let col = 0; col < SHIELD_COLS; col++) {
                if (this.blocks[row][col]) return false;
            }
        }
        return true;
    }

    update(deltaTime) {}

    draw(ctx) {
        if (this.dead) return;
        ctx.fillStyle = '#00ff00';
        for (let row = 0; row < SHIELD_ROWS; row++) {
            for (let col = 0; col < SHIELD_COLS; col++) {
                if (this.blocks[row][col]) {
                    ctx.fillRect(
                        this.x + col * SHIELD_BLOCK_SIZE,
                        this.y + row * SHIELD_BLOCK_SIZE,
                        SHIELD_BLOCK_SIZE,
                        SHIELD_BLOCK_SIZE
                    );
                }
            }
        }
    }
}
