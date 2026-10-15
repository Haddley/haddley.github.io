import { Entity } from './entity.js';
import {
  PLAYER_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT,
  PLAYER_BULLET_SPEED,
  PLAYER_BULLET_COLOR,
} from '../constants.js';

// The player's bullet (travels up).
export class Bullet extends Entity {
  constructor(x, y) {
    super(x, y, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT);
  }

  update(deltaMs) {
    this.y -= PLAYER_BULLET_SPEED * (deltaMs / 1000);
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = PLAYER_BULLET_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
