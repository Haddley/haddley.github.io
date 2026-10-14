import { Entity } from './entity.js';
import {
  ALIEN_BULLET_SPEED,
  ALIEN_BULLET_WIDTH,
  ALIEN_BULLET_HEIGHT,
  CANVAS_HEIGHT
} from './constants.js';

export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
    this.x = x - this.width / 2;
  }

  update(dt) {
    this.y += ALIEN_BULLET_SPEED * dt;
    if (this.y > CANVAS_HEIGHT) {
      this.dead = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}