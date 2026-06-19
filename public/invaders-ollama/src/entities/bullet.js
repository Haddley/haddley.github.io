// src/entities/bullet.js

import { Entity } from './entity.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants.js';

export class Bullet extends Entity {
    constructor(x, y, velocityY) {
        super(x, y, 4, 12); // Small bullet size example
        this.velocityY = velocityY;
        this.ownerId = 'player'; // or 'alien'
    }

    update(deltaTime) {
        // Simple vertical movement
        this.y += this.velocityY * (deltaTime / 50); 
        if (this.y < 0 || this.y > CANVAS_HEIGHT) {
            this.dead = true;
        }
    }

    draw(ctx) {
        // Draw a simple rectangle bullet
        ctx.fillStyle = 'yellow'; // or specific color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
