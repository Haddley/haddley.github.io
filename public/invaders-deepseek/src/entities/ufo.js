import { Entity } from './entity.js';
import { UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, UFO_Y, CANVAS_WIDTH, UFO_BONUS_SCORES } from '../constants.js';
import { drawSprite, UFO_SPRITE } from '../sprites.js';

export class UFO extends Entity {
    constructor(direction) {
        const x = direction === 1 ? -UFO_WIDTH : CANVAS_WIDTH;
        super(x, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
        this.direction = direction;
        this.bonusScore = UFO_BONUS_SCORES[Math.floor(Math.random() * UFO_BONUS_SCORES.length)];
        this.active = true;
    }

    update(deltaTime) {
        if (!this.active) return;
        this.x += UFO_SPEED * this.direction * deltaTime;

        if (this.direction === 1 && this.x > CANVAS_WIDTH) {
            this.dead = true;
        } else if (this.direction === -1 && this.x + this.width < 0) {
            this.dead = true;
        }
    }

    draw(ctx) {
        if (this.dead || !this.active) return;
        drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, '#ff0000');
    }
}
