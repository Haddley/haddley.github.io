import { Entity } from './entity.js';
import { 
  PLAYER_WIDTH, 
  PLAYER_HEIGHT, 
  PLAYER_START_X, 
  PLAYER_SPEED, 
  CANVAS_WIDTH, 
  GROUND_Y,
  INVULNERABLE_DURATION
} from './constants.js';
import { input } from './input.js';
import { PLAYER_SPRITE, drawSprite } from './sprites.js';

export class Player extends Entity {
  constructor() {
    super(PLAYER_START_X, GROUND_Y - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.invulnerableUntil = 0;
  }

  update(dt) {
    if (input.left()) {
      this.x -= PLAYER_SPEED * dt;
    }
    if (input.right()) {
      this.x += PLAYER_SPEED * dt;
    }
    
    // Clamp to canvas bounds
    this.x = Math.max(0, Math.min(this.x, CANVAS_WIDTH - this.width));
    
    // Y position never changes (stay on ground line)
    // this.y stays the same
  }

  respawn() {
    this.x = PLAYER_START_X;
    this.invulnerableUntil = Date.now() + INVULNERABLE_DURATION;
  }

  isInvulnerable() {
    return Date.now() < this.invulnerableUntil;
  }

  draw(ctx) {
    if (this.isInvulnerable()) {
      // Blink when invulnerable
      if (Math.floor(Date.now() / 100) % 2 === 0) {
        // Skip drawing during blink frame
        return;
      }
    }
    
    // Draw the cannon in green
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, '#00ff00');
  }
}