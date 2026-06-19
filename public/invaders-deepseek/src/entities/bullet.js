import { Entity } from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED, CANVAS_HEIGHT } from '../constants.js';

export class Bullet extends Entity {
    constructor(x, y) {
        super(x, y, BULLET_WIDTH, BULLET_HEIGHT);
    }

    update(deltaTime) {
        this.y -= BULLET_SPEED * deltaTime;
        if (this.y + this.height < 0) {
            this.dead = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
