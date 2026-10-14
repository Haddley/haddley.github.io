import { Entity } from './entity.js';
import * as C from '../constants.js';
import { UFO_SPRITE, drawSprite } from '../sprites.js';

// The mystery UFO. `dir` is +1 (right) or -1 (left). Bonus score is random per spawn.
export class Ufo extends Entity {
  constructor(x, y, dir) {
    super(x, y, C.UFO_WIDTH, C.UFO_HEIGHT);
    this.dir = dir;
    this.bonus = C.UFO_SCORES[Math.floor(Math.random() * C.UFO_SCORES.length)];
  }

  update(dt) {
    this.x += this.dir * C.UFO_SPEED * (dt / 1000);
    if (this.dir > 0 && this.x > C.CANVAS_WIDTH) this.dead = true;
    if (this.dir < 0 && this.x + this.w < 0) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.w, this.h, UFO_SPRITE, '#ff4d4d');
  }
}
