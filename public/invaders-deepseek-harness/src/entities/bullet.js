// ---------------------------------------------------------------------------
// bullet.js — the player's laser bolt.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  BULLET_WIDTH,
  BULLET_HEIGHT,
  PLAYER_BULLET_SPEED,
  COLORS,
} from '../constants.js';
import { drawSprite, SPRITES } from '../sprites.js';

export class PlayerBullet extends Entity {
  constructor(x, y) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT);
  }

  update(dt) {
    this.y -= PLAYER_BULLET_SPEED * dt;
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, SPRITES.playerBullet, COLORS.playerBullet);
  }
}
