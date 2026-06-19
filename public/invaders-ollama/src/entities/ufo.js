/**
 * src/entities/ufo.js 
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
     * UFO class definition simulating the export pattern.
     */
    class UFO extends Entity {
        /**
         * @param {number} y Y coordinate
         */
        constructor(y) {
            super(CANVAS_WIDTH * 0.1, y, CANVAS_WIDTH * 0.8, 30); // Large patrolling size
            this.isFlying = true;
            this.targetX = Math.random() * (CANVAS_WIDTH - this.width);
        }

        update(deltaTime) {
            if (!this.isFlying) return;

            const speedFactor = deltaTime / 100; // Normalize speed update with time
             // Implement smooth horizontal movement towards a target or along a path.
            let newX = this.x + Math.sin((Date.now() / 400)) * speedFactor;
            this.x = Math.max(Math.min(newX, CANVAS_WIDTH - this.width), CANVAS_WIDTH * 0.1);
        }

        draw(ctx) {
            ctx.fillStyle = '#f00';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    // Make UFO available globally or assign it to a variable 
    // so the calling code can retrieve it. 
    const name = 'UFO'; // Use the class name for assignment
    window[name] = UFO;

})();
