import { Entity } from './entity.js';
import { drawSprite, PLAYER_SPRITE } from '../sprites.js';
import {
  PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED,
  CANVAS_WIDTH, PLAYER_Y, INVULNERABLE_DURATION
} from '../constants.js';
import { input } from '../input.js';

export class Player extends Entity {
  constructor() {
    super(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.invulnerable = 0;
  }

  update(dt) {
    const dx = PLAYER_SPEED * (dt / 1000);
    if (input.isLeft()) this.x = Math.max(0, this.x - dx);
    if (input.isRight()) this.x = Math.min(CANVAS_WIDTH - this.width, this.x + dx);
    if (this.invulnerable > 0) this.invulnerable -= dt;
  }

  draw(ctx) {
    if (this.invulnerable > 0 && Math.floor(Date.now() / 150) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, '#44ff44');
  }

  respawn() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.invulnerable = INVULNERABLE_DURATION;
    this.dead = false;
  }

  isInvulnerable() { return this.invulnerable > 0; }
}
