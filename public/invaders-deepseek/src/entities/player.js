import { Entity } from './entity.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_Y, CANVAS_WIDTH, LIVES, INVULNERABLE_DURATION } from '../constants.js';
import { drawSprite, PLAYER_SPRITE } from '../sprites.js';

export class Player extends Entity {
    constructor() {
        super((CANVAS_WIDTH - PLAYER_WIDTH) / 2, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.lives = LIVES;
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
    }

    update(deltaTime) {
        if (this.dead) return;

        if (this.invulnerable) {
            this.invulnerabilityTimer -= deltaTime;
            if (this.invulnerabilityTimer <= 0) {
                this.invulnerable = false;
            }
        }
    }

    moveLeft(deltaTime) {
        if (this.dead) return;
        this.x = Math.max(0, this.x - PLAYER_SPEED * deltaTime);
    }

    moveRight(deltaTime) {
        if (this.dead) return;
        this.x = Math.min(CANVAS_WIDTH - this.width, this.x + PLAYER_SPEED * deltaTime);
    }

    draw(ctx) {
        if (this.dead) return;
        if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) return;
        drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, '#00ff00');
    }

    hit() {
        if (this.invulnerable || this.dead) return false;
        this.lives--;
        this.dead = true;
        return true;
    }

    respawn() {
        this.x = (CANVAS_WIDTH - PLAYER_WIDTH) / 2;
        this.y = PLAYER_Y;
        this.dead = false;
        this.invulnerable = true;
        this.invulnerabilityTimer = INVULNERABLE_DURATION;
    }
}
