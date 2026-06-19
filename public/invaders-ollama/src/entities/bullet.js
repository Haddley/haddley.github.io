/**
 * src/entities/bullet.js 
 * Converted from ES Module structure to IIFE pattern.
 * NOTE: Dependencies must now be loaded using CommonJS require() or similar mechanism outside the module scope (e.g., `const { Entity } = require('./entity');`).
 */

(function() {
    // Simulate dependency loading assuming a non-module environment
    // REAL CODE CHANGE REQUIRED HERE TO ENSURE 'Entity' and constants are accessible in scope:
    // const { Entity } = require('./entity.js'); 
    // const { CANVAS_WIDTH, CANVAS_HEIGHT } = require('../constants.js');
    const Entity = window.Entity;

    /**
     * Bullet class definition simulating the export pattern.
     */
    class Bullet extends Entity {
        /**
         * @param {number} x X coordinate
         * @param {number} y Y coordinate
         * @param {number} velocityY Vertical speed
         */
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
    
    // Make Bullet available globally or assign it to a variable 
    // so the calling code can retrieve it. 
    const name = 'Bullet'; // Use the class name for assignment
    window[name] = Bullet;

})();
