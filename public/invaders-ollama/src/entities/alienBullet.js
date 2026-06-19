// src/entities/alienBullet.js

import { Entity } from './entity.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants.js';

export class AlienBullet extends Entity {
    constructor(x, y, velocityY) {
        super(x, y, 3, 8); // Small bullet size example
        this.velocityY = velocityY;
        this.ownerId = 'alien';
    }

    update(deltaTime) {
        // Simple vertical movement (falling down towards player/shield)
        this.y += this.velocityY * (deltaTime / 50);
        if (this.y > CANVAS_HEIGHT + 10) {
            this.dead = true;
        }
    }

    draw(ctx) {
        // Draw a simple red/enemy colored rectangle bullet
        ctx.fillStyle = 'red'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
