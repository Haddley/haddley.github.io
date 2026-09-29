import { Entity } from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED, COLORS } from '../constants.js';

// Player bullet. (x, y) passed in is the TIP of the cannon; the bullet is centred on x.
export class Bullet extends Entity {
  constructor(x, y) {
    super(x - BULLET_WIDTH / 2, y - BULLET_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT);
  }

  update(dt) {
    this.y -= BULLET_SPEED * (dt / 1000);
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = COLORS.white;
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}