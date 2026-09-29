import { Entity } from './entity.js';
import {
  ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT, ALIEN_BULLET_SPEED, CANVAS_HEIGHT, COLORS,
} from '../constants.js';

// Alien bullet. (x, y) passed in is the bottom-centre of the alien that fired.
export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x - ALIEN_BULLET_WIDTH / 2, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
  }

  update(dt) {
    this.y += ALIEN_BULLET_SPEED * (dt / 1000);
    if (this.y > CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = COLORS.alienBullet;
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}