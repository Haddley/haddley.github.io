import { Entity } from './entity.js';
import * as C from '../constants.js';

// The player's bullet: travels up, dies once it leaves the top of the canvas.
export class Bullet extends Entity {
  constructor(x, y) {
    super(x, y, C.BULLET_WIDTH, C.BULLET_HEIGHT);
  }

  update(dt) {
    this.y -= C.BULLET_SPEED * (dt / 1000);
    if (this.y + this.h < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.w, this.h);
  }
}
