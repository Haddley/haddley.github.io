// ---------------------------------------------------------------------------
// alien.js — a single invader. Movement is managed by the engine (the swarm
// moves as one group), so update() is intentionally a no-op.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  ALIEN_WIDTH,
  ALIEN_HEIGHT,
  ALIEN_ANIM_INTERVAL,
  COLORS,
} from '../constants.js';
import { drawSprite, SPRITES } from '../sprites.js';

export class Alien extends Entity {
  constructor(x, y, col, type, score) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.col = col; // formation column, used to pick shooters
    this.type = type; // 'squid' | 'crab' | 'octopus'
    this.score = score;
    this.frames = SPRITES[type];
    this.color = COLORS[type];
  }

  update() {
    // No-op: the engine moves the whole formation as a group.
  }

  draw(ctx) {
    const frame = Math.floor(Date.now() / ALIEN_ANIM_INTERVAL) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[frame], this.color);
  }
}
