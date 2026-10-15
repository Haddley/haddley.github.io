import { Entity } from './entity.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR } from '../constants.js';
import { drawSprite, PLAYER_SPRITE } from '../sprites.js';
import InputHandlerInstance from '../input.js';
import { playerXAfterMove } from '../movement.js';

export class Player extends Entity {
  constructor(x, y) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.invulnerable = false;
    this.invulnTimer = 0; // ms remaining
  }

  update(deltaMs) {
    const dir = (InputHandlerInstance.right() ? 1 : 0) - (InputHandlerInstance.left() ? 1 : 0);
    this.x = playerXAfterMove(this.x, dir, deltaMs);
    if (this.invulnerable) {
      this.invulnTimer -= deltaMs;
      if (this.invulnTimer <= 0) this.invulnerable = false;
    }
  }

  draw(ctx) {
    // Blink while invulnerable: skip drawing every other 100 ms window.
    if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, PLAYER_COLOR);
  }
}
