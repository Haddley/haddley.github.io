import { Entity } from './entity.js';
import { BULLET_SPEED, BULLET_WIDTH, BULLET_HEIGHT } from '../constants.js';

export class Bullet extends Entity {
  constructor(x, y) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT);
    this.velocity = -BULLET_SPEED;
    this.dead = false;
  }

  update(deltaTime) {
    this.y += this.velocity;
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
