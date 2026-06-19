/**
 * src/entities/entity.js - Base class for all game entities. 
 */
(function(global) {
  'use strict';

    // Global variables loaded from constants module (equivalent of import)
    const CANVAS_WIDTH = global.GAME_CONSTANTS.CANVAS_WIDTH;
    const CANVAS_HEIGHT = global.GAME_CONSTANTS.CANVAS_HEIGHT;

  /* Base Entity Constructor/Prototype Definition */
  var Entity = function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.dead = false;
      this.initialX = x; // For relative positioning/movement calculation
  };

  // Methods setup using prototype
  Entity.prototype.update = function(deltaTime) {
      throw new Error('Update method must be implemented.');
  };
  
  Entity.prototype.draw = function(ctx) {
      throw new Error('Draw method must be implemented.');
  };

  /**
   * Checks for overlap with another bounding box/entity.
   */
  Entity.prototype.overlaps = function(other) {
      return this.x < other.x + other.width &&
             this.x + this.width > other.x &&
             this.y < other.y + other.height &&
             this.y + this.height > other.y;
  };

  // Expose Entity Constructor/Class Globally (if multiple files use it)
  global.Entity = Entity; // Assuming global access for consistency with the pattern used in other modules

})(typeof window !== 'undefined' ? window : this);
