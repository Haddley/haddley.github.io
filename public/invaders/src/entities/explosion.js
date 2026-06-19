import { Entity } from './entity.js';

export class Explosion extends Entity {
  constructor(x, y, w, h, color, count = 8, duration = 500) {
    super(x, y, w, h);
    this.dead = false;
    this.timer = 0;
    this.duration = duration;
    this.color = color;
    this.particles = [];
    const cx = w / 2;
    const cy = h / 2;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.4;
      this.particles.push({ x: cx, y: cy, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed });
    }
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.timer >= this.duration) { this.dead = true; return; }
    for (const p of this.particles) { p.x += p.dx; p.y += p.dy; }
  }

  draw(ctx) {
    ctx.globalAlpha = 1 - this.timer / this.duration;
    ctx.fillStyle = this.color;
    for (const p of this.particles) {
      ctx.fillRect(this.x + p.x - 2, this.y + p.y - 2, 4, 4);
    }
    ctx.globalAlpha = 1;
  }
}
