import { Entity } from './entity.js';
import * as C from '../constants.js';

// An alien projectile: travels down, dies once it leaves the bottom of the canvas.
export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x, y, C.ALIEN_BULLET_WIDTH, C.ALIEN_BULLET_HEIGHT);
  }

  update(dt) {
    this.y += C.ALIEN_BULLET_SPEED * (dt / 1000);
    if (this.y > C.CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#ff4d4d';
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.w, this.h);
  }
}
