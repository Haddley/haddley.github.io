// src/entities/player.js

import { Entity } from './entity.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants.js';

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.lives = 3;
        this.invincible = false;
        this.invulnerabilityTimer = 0;
    }

    update(deltaTime) {
        // Basic movement logic based on InputHandler state...
    }

    draw(ctx) {
        // Draw the player cannon shape
        super.draw(ctx);
        if (!this.invincible) {
            // Use drawSprite here later if needed for detailed pixel art
        } else {
             // Blink implementation
        }
    }

    takeDamage() {
        // Decrease life and initiate respawn/invulnerability sequence
    }
}
