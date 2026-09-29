import { Entity } from './entity.js';
import { EXPLOSION_DURATION, COLORS } from '../constants.js';

// A fading orange star. Takes the RECTANGLE of the thing that exploded.
export class Explosion extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.timer = 0;
  }

  update(dt) {
    this.timer += dt;
    if (this.timer >= EXPLOSION_DURATION) this.dead = true;
  }

  draw(ctx) {
    const progress = this.timer / EXPLOSION_DURATION;          // 0 -> 1
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const radius = (this.width / 2) * (1 + progress * 0.5);
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress);
    ctx.fillStyle = COLORS.explosion;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const len = radius * (0.5 + 0.5 * Math.sin(i * 3 + this.timer * 0.01));
      const px = cx + Math.cos(angle) * len;
      const py = cy + Math.sin(angle) * len;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}