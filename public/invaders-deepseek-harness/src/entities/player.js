// ---------------------------------------------------------------------------
// player.js — the player cannon: movement, lives, respawn, invulnerability.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  CANVAS_WIDTH,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_Y,
  PLAYER_SPEED,
  LIVES,
  RESPAWN_DELAY,
  INVULNERABLE_DURATION,
  COLORS,
} from '../constants.js';
import { drawSprite, SPRITES } from '../sprites.js';
import { input } from '../input.js';

export class Player extends Entity {
  constructor() {
    super((CANVAS_WIDTH - PLAYER_WIDTH) / 2, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.lives = LIVES;
    this.state = 'ALIVE'; // 'ALIVE' | 'RESPAWNING'
    this.stateTimer = 0; // ms remaining in the current state
    this.invulnTimer = 0; // ms of post-respawn invulnerability
  }

  get invulnerable() {
    return this.invulnTimer > 0;
  }

  update(dt) {
    if (this.state === 'RESPAWNING') {
      this.stateTimer -= dt * 1000;
      if (this.stateTimer <= 0) {
        this.state = 'ALIVE';
        this.invulnTimer = INVULNERABLE_DURATION;
        this.x = (CANVAS_WIDTH - PLAYER_WIDTH) / 2;
      }
      return;
    }

    if (this.invulnTimer > 0) this.invulnTimer -= dt * 1000;

    if (input.left) this.x -= PLAYER_SPEED * dt;
    if (input.right) this.x += PLAYER_SPEED * dt;
    this.x = Math.max(4, Math.min(CANVAS_WIDTH - PLAYER_WIDTH - 4, this.x));
  }

  /**
   * Register a hit. Returns true when this was the last life (game over).
   */
  hit() {
    this.lives -= 1;
    this.state = 'RESPAWNING';
    this.stateTimer = RESPAWN_DELAY;
    this.invulnTimer = 0;
    return this.lives <= 0;
  }

  draw(ctx) {
    if (this.state === 'RESPAWNING') return;
    // Blink while invulnerable.
    if (this.invulnTimer > 0 && Math.floor(performance.now() / 120) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, SPRITES.player, COLORS.player);
  }
}
