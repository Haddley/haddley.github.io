// src/entities/explosion.js

import { Entity } from './entity.js';

export class Explosion extends Entity {
    constructor(x, y) {
        super(x, y, 50, 50); // Initial size for animation radius
        this.lifetime = 1000; // ms
        this.startTime = Date.now();
        this.radius = 10;
    }

    update(deltaTime) {
        const elapsed = Date.now() - this.startTime;
        if (elapsed > this.lifetime) {
            this.dead = true;
        } else {
            // Scale the radius over time for visual effect
            this.radius = Math.min(50, 10 + (elapsed / this.lifetime) * 40);
        }
    }

    draw(ctx) {
        const elapsed = Date.now() - this.startTime;
        if (!this.dead) {
             // Draw expanding circle effect. Requires partial rendering of the entity's bounding box.
            ctx.fillStyle = 'rgba(255, 165, 0, 1)'; // Orange
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

     // Note: We override the base 'overlaps' check to use circular detection for collision checks.
}
