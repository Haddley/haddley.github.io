/**
 * src/entities/explosion.js 
 * Converted from ES Module structure to IIFE pattern.
 * NOTE: Dependencies must now be loaded using CommonJS require() or similar mechanism outside the module scope (e.g., `const { Entity } = require('./entity');`).
 */

(function() {
    // Simulate dependency loading assuming a non-module environment
    // REAL CODE CHANGE REQUIRED HERE TO ENSURE 'Entity' and constants are accessible in scope:
    // const { Entity } = require('./entity.js'); 
    const Entity = window.Entity;

    /**
     * Explosion class definition simulating the export pattern.
     */
    class Explosion extends Entity {
        /**
         * @param {number} x X center coordinate
         * @param {number} y Y center coordinate
         */
        constructor(x, y) {
            super(x - 25, y - 25, 50, 50); // Setting bounding box for safe collision handling
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
    }

    // Make Explosion available globally or assign it to a variable 
    // so the calling code can retrieve it. 
    const name = 'Explosion'; // Use the class name for assignment
    window[name] = Explosion;

})();
