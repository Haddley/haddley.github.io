// src/entities/player.js

(function (global) {
    // Dependencies – assume they are exposed globally (e.g., via other IIFE scripts)
    const Entity = global.Entity;
    const PLAYER_WIDTH = global.PLAYER_WIDTH;
    const PLAYER_HEIGHT = global.PLAYER_HEIGHT;

    class Player extends Entity {
        constructor(x, y) {
            super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
            this.lives = 3;
            this.invincible = false;
            this.invulnerabilityTimer = 0;
        }

        update(deltaTime) {
            // Basic movement logic based on InputHandler state...
        }

        draw(ctx) {
            ctx.fillStyle = this.invincible ? 'rgba(0,255,0,0.4)' : '#0f0';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        takeDamage() {
            // Decrease life and initiate respawn/invulnerability sequence
        }
    }

    // Expose Player to the global scope
    global.Player = Player;
})(typeof window !== 'undefined' ? window : this);