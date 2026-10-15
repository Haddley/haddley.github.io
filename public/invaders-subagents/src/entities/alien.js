import { Entity } from './entity.js';
import { ALIEN_WIDTH, ALIEN_HEIGHT, ALIEN_COLOR } from '../constants.js';
import {
  drawSprite,
  SQUID_A,
  SQUID_B,
  CRAB_A,
  CRAB_B,
  OCTOPUS_A,
  OCTOPUS_B,
} from '../sprites.js';
import { alienFrameIndex } from '../movement.js';

export class Alien extends Entity {
  constructor(row, col, x, y) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.row = row; // 0-based
    this.col = col; // 0-based
    if (row <= 1) {
      this.type = 'squid';
      this.frames = [SQUID_A, SQUID_B];
    } else if (row <= 3) {
      this.type = 'crab';
      this.frames = [CRAB_A, CRAB_B];
    } else {
      this.type = 'octopus';
      this.frames = [OCTOPUS_A, OCTOPUS_B];
    }
  }

  update() {
    // No-op: the engine moves the whole swarm as one group.
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[alienFrameIndex(Date.now())], ALIEN_COLOR);
  }
}
