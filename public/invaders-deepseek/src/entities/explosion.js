import { Entity } from './entity.js';

const LIFETIME = 1000;
const MAX_RADIUS = 30;

export class Explosion extends Entity {
    constructor(x, y) {
        super(x - MAX_RADIUS, y - MAX_RADIUS, MAX_RADIUS * 2, MAX_RADIUS * 2);
        this.startTime = Date.now();
        this.radius = 5;
    }

    update(deltaTime) {
        const elapsed = Date.now() - this.startTime;
        if (elapsed >= LIFETIME) {
            this.dead = true;
        } else {
            this.radius = 5 + ((MAX_RADIUS - 5) * (elapsed / LIFETIME));
        }
    }

    draw(ctx) {
        if (this.dead) return;
        const elapsed = Date.now() - this.startTime;
        const alpha = 1 - (elapsed / LIFETIME);
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        ctx.fillStyle = `rgba(255, 165, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
        ctx.fill();

        const innerAlpha = alpha * 0.7;
        ctx.fillStyle = `rgba(255, 255, 0, ${innerAlpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        const outerAlpha = alpha * 0.3;
        ctx.fillStyle = `rgba(255, 0, 0, ${outerAlpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, this.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}
