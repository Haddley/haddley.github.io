import { Entity } from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED } from '../constants.js';

export class Bullet extends Entity {
  constructor(x, y) {
    super(x - BULLET_WIDTH / 2, y, BULLET_WIDTH, BULLET_HEIGHT);
  }

  update(dt) {
    this.y -= BULLET_SPEED * (dt / 1000);
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}
