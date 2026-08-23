// ---------------------------------------------------------------------------
// ufo.js — the mystery UFO. Flies across the top of the screen; each spawn
// carries a random bonus score.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import {
  CANVAS_WIDTH,
  UFO_WIDTH,
  UFO_HEIGHT,
  UFO_SPEED,
  UFO_SCORES,
  COLORS,
} from '../constants.js';
import { drawSprite, SPRITES } from '../sprites.js';

export class Ufo extends Entity {
  /** direction is +1 (left → right) or -1 (right → left). */
  constructor(x, y, direction) {
    super(x, y, UFO_WIDTH, UFO_HEIGHT);
    this.direction = direction;
    this.score = UFO_SCORES[Math.floor(Math.random() * UFO_SCORES.length)];
  }

  update(dt) {
    this.x += UFO_SPEED * this.direction * dt;
    if (this.x + this.width < 0 || this.x > CANVAS_WIDTH) this.dead = true;
  }

  draw(ctx) {
    const frame = Math.floor(Date.now() / 250) % 2; // lights blink faster than aliens
    drawSprite(ctx, this.x, this.y, this.width, this.height, SPRITES.ufo[frame], COLORS.ufo);
  }
}
