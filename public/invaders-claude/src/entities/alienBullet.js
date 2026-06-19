import { Entity } from './entity.js';
import { ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT, ALIEN_BULLET_SPEED, CANVAS_HEIGHT } from '../constants.js';

export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x - ALIEN_BULLET_WIDTH / 2, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
  }

  update(dt) {
    this.y += ALIEN_BULLET_SPEED * (dt / 1000);
    if (this.y > CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}
