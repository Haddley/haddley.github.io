import { Entity } from './entity.js';
import {
  ALIEN_BULLET_WIDTH,
  ALIEN_BULLET_HEIGHT,
  ALIEN_BULLET_SPEED,
  ALIEN_BULLET_COLOR,
  CANVAS_HEIGHT,
} from '../constants.js';

// An alien's bullet (travels down).
export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
  }

  update(deltaMs) {
    this.y += ALIEN_BULLET_SPEED * (deltaMs / 1000);
    if (this.y > CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = ALIEN_BULLET_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
