import { Entity } from './entity.js';

// A short-lived pixel burst. (x, y) is the center point.
export class Explosion extends Entity {
  constructor(x, y, color) {
    super(x, y, 4, 4);
    this.color = color;
    this.age = 0;
    this.duration = 400; // ms
  }

  update(dt) {
    this.age += dt;
    if (this.age >= this.duration) this.dead = true;
  }

  draw(ctx) {
    const t = this.age / this.duration;
    const s = 4 + t * 24;
    const cx = Math.round(this.x);
    const cy = Math.round(this.y);
    ctx.globalAlpha = 1 - t;
    ctx.fillStyle = this.color;
    ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    ctx.fillRect(cx - s, cy - s / 4, s / 2, s / 2);
    ctx.fillRect(cx + s / 2, cy - s / 4, s / 2, s / 2);
    ctx.globalAlpha = 1;
  }
}
