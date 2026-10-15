import { Entity } from './entity.js';

// A short-lived expanding circle. `x`/`y` are the CENTER (unlike other entities).
export class Explosion extends Entity {
  constructor(x, y) {
    super(x, y, 0, 0);
    this.age = 0; // ms
    this.duration = 400; // ms
  }

  update(deltaMs) {
    this.age += deltaMs;
    if (this.age >= this.duration) this.dead = true;
  }

  draw(ctx) {
    const p = Math.min(1, this.age / this.duration);
    const r = 4 + p * 10; // px
    ctx.fillStyle = p < 0.5 ? '#ffffff' : '#ffcc00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}
