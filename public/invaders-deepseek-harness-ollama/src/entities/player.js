import { Entity } from './entity.js';
import { drawSprite, PLAYER_SPRITE } from '../sprites.js';
import {
  CANVAS_WIDTH, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_Y, PLAYER_SPEED,
  INVULNERABLE_DURATION, COLORS,
} from '../constants.js';
import { input } from '../input.js';

export class Player extends Entity {
  constructor() {
    super(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.invulnerable = 0;      // ms of invulnerability left
  }

  update(dt) {
    if (this.dead) return;
    const step = PLAYER_SPEED * (dt / 1000);
    if (input.isLeft()) this.x = Math.max(0, this.x - step);
    if (input.isRight()) this.x = Math.min(CANVAS_WIDTH - this.width, this.x + step);
    if (this.invulnerable > 0) this.invulnerable -= dt;
  }

  draw(ctx) {
    // Blink while invulnerable: hidden on every other 150 ms slice.
    if (this.invulnerable > 0 && Math.floor(Date.now() / 150) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, COLORS.green);
  }

  respawn() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.dead = false;
    this.invulnerable = INVULNERABLE_DURATION;
  }

  isInvulnerable() { return this.invulnerable > 0; }
}