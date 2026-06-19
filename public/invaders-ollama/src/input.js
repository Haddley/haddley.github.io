/**
 * src/entities/input.js - Handles keyboard and mouse input events for the game.
 * Converted from ES Module to IIFE pattern.
 */

(function() {
    class InputHandler {
        constructor(canvas) {
            this.canvas = canvas;
            this.keys = {};
            window.addEventListener('keydown', this._handleKeyDown);
            window.addEventListener('keyup', this._handleKeyUp);
        }

        _handleKeyDown = (e) => {
            this.keys[e.key] = true;
            // Handle game start/unmute if necessary
        };

        _handleKeyUp = (e) => {
            this.keys[e.key] = false;
        };

        isPressed(key) {
            return !!this.keys[key];
        }
    }

    // Expose globally
    window.InputHandler = InputHandler;
})();