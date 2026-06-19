/**
 * src/entities/alienBullet.js 
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
     * AlienBullet class definition simulating the export pattern.
     */
    class AlienBullet extends Entity {
        /**
         * @param {number} x X coordinate
         * @param {number} y Y coordinate
         * @param {number} velocityY Vertical speed
         */
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
    
    // Make AlienBullet available globally or assign it to a variable 
    // so the calling code can retrieve it. 
    const name = 'AlienBullet'; // Use the class name for assignment
    window[name] = AlienBullet;

})();
