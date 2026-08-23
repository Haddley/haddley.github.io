// ---------------------------------------------------------------------------
// alienBullet.js — a descending alien projectile with a slight random speed
// variance, matching the original's uneven barrage.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  CANVAS_HEIGHT,
  ALIEN_BULLET_WIDTH,
  ALIEN_BULLET_HEIGHT,
  ALIEN_BULLET_SPEED,
  ALIEN_BULLET_SPEED_VARIANCE,
  COLORS,
} from '../constants.js';
import { drawSprite, SPRITES } from '../sprites.js';

export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
    this.speed =
      ALIEN_BULLET_SPEED * (1 + (Math.random() * 2 - 1) * ALIEN_BULLET_SPEED_VARIANCE);
  }

  update(dt) {
    this.y += this.speed * dt;
    if (this.y > CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, SPRITES.alienBullet, COLORS.alienBullet);
  }
}
