import { Entity } from './entity.js';
import { ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT, ALIEN_BULLET_SPEED, CANVAS_HEIGHT } from '../constants.js';

export class AlienBullet extends Entity {
    constructor(x, y) {
        super(x, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
    }

    update(deltaTime) {
        this.y += ALIEN_BULLET_SPEED * deltaTime;
        if (this.y > CANVAS_HEIGHT) {
            this.dead = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
