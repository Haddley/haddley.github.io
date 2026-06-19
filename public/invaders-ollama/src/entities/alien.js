/**
 * src/entities/alien.js - Alien entity extending the base Entity class.
 */
(function(global) {
  'use strict';

  // Dependency setup (assuming global scope now holds constants and utilities)
  var CANVAS_WIDTH = global.GAME_CONSTANTS ? global.GAME_CONSTANTS.CANVAS_WIDTH : 800;
  var CANVAS_HEIGHT = global.GAME_CONSTANTS ? global.GAME_CONSTANTS.CANVAS_HEIGHT : 600;

  // Get reference to parent Entity (safely)
  var ParentEntity = global.Entity || function() {
    // Fallback empty constructor if Entity doesn't exist
  };

  // Alien class definition
  var Alien = function(x, y, typeIndex) {
    // Default parameter fallback
    typeIndex = typeIndex || 0;
    
    // Dimensions
    this.width = 30;
    this.height = 15;
    
    // Call parent constructor
    ParentEntity.call(this, x, y, this.width, this.height);
    
    // Alien-specific properties
    this.type = typeIndex; // 0=squid, 1=crab, 2=octopus
    this.direction = 1; // 1 = right, -1 = left
    this.frame = 0;
    this.dead = false;
    this.initialX = x;
  };

  // Set up inheritance chain (proper way)
  Alien.prototype = Object.create(ParentEntity.prototype);
  Alien.prototype.constructor = Alien;

  // Update method
  Alien.prototype.update = function(deltaTime) {
    this.frame = Math.floor(Date.now() / 500) % 2;
  };

  // Draw method
  Alien.prototype.draw = function(ctx) {
    var colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
    ctx.fillStyle = colors[this.type] || '#fff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  // Take hit method
  Alien.prototype.takeHit = function() {
    if (!this.dead) {
      this.dead = true;
      
      // Trigger an explosion entity spawn or signal death event
      if (global.GameEvents && typeof global.GameEvents.trigger === 'function') {
        global.GameEvents.trigger('alienDestroyed', {
          x: this.x,
          y: this.y,
          type: this.type
        });
      }
      
      // Award points based on alien type
      var points = [30, 20, 10][this.type] || 10;
      if (global.GameState && typeof global.GameState.addScore === 'function') {
        global.GameState.addScore(points);
      }
    }
  };

  // Reset method (optional - useful for wave resets)
  Alien.prototype.reset = function() {
    this.dead = false;
    this.x = this.initialX;
    this.direction = 1;
    this.frame = 0;
  };

  // Expose Alien globally
  global.Alien = Alien;

})(typeof window !== 'undefined' ? window : this);