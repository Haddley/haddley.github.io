// ---------------------------------------------------------------------------
// explosion.js — short-lived animated burst shown on any death.
// ---------------------------------------------------------------------------

import { Entity } from './entity.js';
import { EXPLOSION_DURATION } from '../constants.js';

export class Explosion extends Entity {
  /** Centered on (cx, cy). */
  constructor(cx, cy) {
    super(cx - 18, cy - 18, 36, 36);
    this.timer = EXPLOSION_DURATION;
    this.max = EXPLOSION_DURATION;
  }

  update(dt) {
    this.timer -= dt * 1000;
    if (this.timer <= 0) this.dead = true;
  }

  draw(ctx) {
    const t = 1 - this.timer / this.max; // 0 → 1 over lifetime
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - t);
    ctx.fillStyle = '#ffffff';
    const core = 4 + t * 16;
    ctx.fillRect(cx - core / 2, cy - core / 2, core, core);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    const len = 8 + t * 26;
    for (let i = 0; i < 8; i++) {
      const ang = (Math.PI * 2 * i) / 8 + t;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
      ctx.stroke();
    }
    ctx.restore();
  }
}
