// src/entities/ufo.js

import { Entity } from './entity.js'; 
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants.js';

export class UFO extends Entity {
    constructor(y) {
        super(CANVAS_WIDTH * 0.1, y, CANVAS_WIDTH * 0.8, 30); // Large patrolling size
        this.isFlying = true;
        this.targetX = Math.random() * (CANVAS_WIDTH - this.width);
    }

    update(deltaTime) {
        if (!this.isFlying) return;

        const speedFactor = deltaTime / 100; // Normalize speed update with time
        let newX = this.x + Math.sin((Date.now() / 400)) * speedFactor;

        // Implement smooth horizontal movement towards a target or along a path.
        this.x = Math.max(Math.min(newX, CANVAS_WIDTH - this.width), CANVAS_WIDTH * 0.1);
    }

    draw(ctx) {
       // Draw the U-shaped saucer sprite
       super.draw(ctx);
    }
}
