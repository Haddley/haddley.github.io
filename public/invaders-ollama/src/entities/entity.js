/**
 * src/entities/entity.js - Base class for all game entities. 
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants.js';

export class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dead = false;
        this.initialX = x; // For relative positioning/movement calculation
    }

    update(deltaTime) {
        // Virtual method: must be overridden by subclasses
        throw new Error('Update method must be implemented.');
    }
    
    draw(ctx) {
        // Virtual method: must be overridden by subclasses, uses ctx.fillRect() usually
        throw new Error('Draw method must be implemented.');
    }

    overlaps(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
}
