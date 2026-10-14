import { Entity } from './entity.js';
import * as C from '../constants.js';
import {
  SQUID_A,
  SQUID_B,
  CRAB_A,
  CRAB_B,
  OCTOPUS_A,
  OCTOPUS_B,
  drawSprite,
} from '../sprites.js';

// Rows 0–1 squid (30), rows 2–3 crab (20), row 4 octopus (10).
export class Alien extends Entity {
  constructor(x, y, row, col) {
    super(x, y, C.ALIEN_WIDTH, C.ALIEN_HEIGHT);
    this.row = row;
    this.col = col;
    if (row <= 1) {
      this.frames = [SQUID_A, SQUID_B];
      this.color = '#7fff7f';
    } else if (row <= 3) {
      this.frames = [CRAB_A, CRAB_B];
      this.color = '#7fdfff';
    } else {
      this.frames = [OCTOPUS_A, OCTOPUS_B];
      this.color = '#ff7fdf';
    }
  }

  // Movement is managed by the engine (the swarm moves as one group).
  update(dt) {}

  draw(ctx) {
    const frame = this.frames[Math.floor(Date.now() / C.ALIEN_FRAME_MS) % 2];
    drawSprite(ctx, this.x, this.y, this.w, this.h, frame, this.color);
  }
}
