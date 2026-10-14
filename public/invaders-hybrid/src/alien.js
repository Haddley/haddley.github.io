import { Entity } from './entity.js';
import {
  ALIEN_WIDTH,
  ALIEN_HEIGHT,
  SQUID_SCORE,
  CRAB_SCORE,
  OCTOPUS_SCORE
} from './constants.js';
import {
  ALIEN_SQUID_A,
  ALIEN_SQUID_B,
  ALIEN_CRAB_A,
  ALIEN_CRAB_B,
  ALIEN_OCTOPUS_A,
  ALIEN_OCTOPUS_B,
  drawSprite
} from './sprites.js';

export class Alien extends Entity {
  constructor(x, y, row) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    
    // Determine the visual type and score from row
    if (row <= 1) {
      this.type = 'squid';
      this.score = SQUID_SCORE;
    } else if (row <= 3) {
      this.type = 'crab';
      this.score = CRAB_SCORE;
    } else {
      this.type = 'octopus';
      this.score = OCTOPUS_SCORE;
    }
    
    this.row = row;
  }

  update(dt) {
    // No-op - alien movement is managed by the engine
  }

  draw(ctx) {
    // Pick frame A or B using Math.floor(Date.now() / 500) % 2 (toggles every 500 ms)
    const frame = Math.floor(Date.now() / 500) % 2;
    
    // Choose the sprite by type and frame
    let sprite;
    switch (this.type) {
      case 'squid':
        sprite = frame === 0 ? ALIEN_SQUID_A : ALIEN_SQUID_B;
        break;
      case 'crab':
        sprite = frame === 0 ? ALIEN_CRAB_A : ALIEN_CRAB_B;
        break;
      case 'octopus':
        sprite = frame === 0 ? ALIEN_OCTOPUS_A : ALIEN_OCTOPUS_B;
        break;
    }
    
    // All aliens are green (or white for classic look)
    const color = '#ffffff'; // Using white for classical arcade look
    
    drawSprite(ctx, this.x, this.y, this.width, this.height, sprite, color);
  }
}