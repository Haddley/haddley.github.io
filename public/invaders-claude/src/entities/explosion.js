import { Entity } from './entity.js';

export class Explosion extends Entity {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.timer = 0;
    this.duration = 400;
  }

  update(dt) {
    this.timer += dt;
    if (this.timer >= this.duration) this.dead = true;
  }

  draw(ctx) {
    const alpha = 1 - this.timer / this.duration;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffaa00';
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const r = (this.width / 2) * (1 + this.timer / this.duration * 0.5);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const len = r * (0.5 + 0.5 * Math.sin(i * 3 + this.timer * 0.01));
      const px = cx + Math.cos(angle) * len;
      const py = cy + Math.sin(angle) * len;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
