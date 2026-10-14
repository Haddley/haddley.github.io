import { Entity } from './entity.js';
import {
  PLAYER_BULLET_SPEED,
  PLAYER_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT
} from './constants.js';

export class Bullet extends Entity {
  constructor(x, y) {
    super(x, y, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT);
    this.x = x - this.width / 2;
  }

  update(dt) {
    this.y -= PLAYER_BULLET_SPEED * dt;
    if (this.y + this.height < 0) {
      this.dead = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}