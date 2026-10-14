import { Entity } from './entity.js';
import { UFO_WIDTH, UFO_HEIGHT, UFO_Y, UFO_SPEED, UFO_SCORES, CANVAS_WIDTH } from './constants.js';
import { drawSprite, UFO_SPRITE } from './sprites.js';

export class UFO extends Entity {
  constructor(direction = 1) {
    // Set the vertical position to UFO_Y (56)
    super(0, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
    
    // Store direction (1 = moving right, -1 = moving left)
    this.direction = direction;
    
    // Pick a random bonus score on spawn
    this.score = UFO_SCORES[Math.floor(Math.random() * UFO_SCORES.length)];
    
    // Set the horizontal start position
    if (direction === 1) {
      // Start just off the left edge
      this.x = -UFO_WIDTH;
    } else {
      // Start just off the right edge
      this.x = CANVAS_WIDTH;
    }
  }
  
  update(dt) {
    // Move horizontally
    this.x += this.direction * UFO_SPEED * dt;
    
    // When it has fully left the screen, set dead = true
    if ((this.direction === 1 && this.x > CANVAS_WIDTH) || 
        (this.direction === -1 && this.x + this.width < 0)) {
      this.dead = true;
    }
  }
  
  draw(ctx) {
    // Draw the saucer in red
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, '#ff0000');
  }
}