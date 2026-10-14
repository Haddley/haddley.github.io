import { Entity } from './entity.js';
import * as C from '../constants.js';
import { PLAYER_SPRITE, drawSprite } from '../sprites.js';
import { input } from '../input.js';

export class Player extends Entity {
  constructor(x, y) {
    super(x, y, C.PLAYER_WIDTH, C.PLAYER_HEIGHT);
  }

  update(dt) {
    const dir = (input.isRight() ? 1 : 0) - (input.isLeft() ? 1 : 0);
    this.x += dir * C.PLAYER_SPEED * (dt / 1000);
    this.x = Math.max(0, Math.min(C.CANVAS_WIDTH - this.w, this.x));
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.w, this.h, PLAYER_SPRITE, '#4dff4d');
  }
}
