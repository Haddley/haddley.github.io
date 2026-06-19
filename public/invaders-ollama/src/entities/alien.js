// src/entities/alien.js

import { Entity } from './entity.js';
import { drawSprite } from '../sprites.js'; 

export class Alien extends Entity {
    constructor(x, y, typeIndex = 0) {
        const width = 30; // Example width
        const height = 15; // Example height
        super(x, y, width, height);
        this.type = typeIndex; // 0=squid, 1=crab, 2=octopus
        this.direction = 1; // 1 = right, -1 = left
        this.frame = 0;
    }

    update(deltaTime) {
        // Handle synchronized group movement logic (horizontal shift/vertical drop on wall hit)
        super.update(deltaTime);
        this.frame = Math.floor(Date.now() / 500) % 2; // Animation toggle
    }

    draw(ctx) {
        // Use drawSprite with the pixel art definition based on 'type'
        // This needs access to ALIEN_SPRITES from sprites.js
        super.draw(ctx);
    }

    takeHit() {
        this.dead = true;
        // Trigger an explosion entity spawn or signal death event
    }
}
