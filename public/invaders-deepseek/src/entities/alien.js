import { Entity } from './entity.js';
import { ALIEN_WIDTH, ALIEN_HEIGHT, ANIMATION_INTERVAL } from '../constants.js';
import { drawSprite, ALIEN_SQUID_A, ALIEN_SQUID_B, ALIEN_CRAB_A, ALIEN_CRAB_B, ALIEN_OCTOPUS_A, ALIEN_OCTOPUS_B } from '../sprites.js';

const TYPE_SPRITES = [
    { a: ALIEN_SQUID_A, b: ALIEN_SQUID_B, color: '#ffffff' },
    { a: ALIEN_CRAB_A, b: ALIEN_CRAB_B, color: '#00ff00' },
    { a: ALIEN_OCTOPUS_A, b: ALIEN_OCTOPUS_B, color: '#ffff00' },
];

export class Alien extends Entity {
    constructor(x, y, typeIndex) {
        super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
        this.type = typeIndex;
        this.score = 0;
    }

    update(deltaTime) {
        if (this.dead) return;
    }

    draw(ctx) {
        if (this.dead) return;
        const frame = Math.floor(Date.now() / ANIMATION_INTERVAL) % 2;
        const sprites = TYPE_SPRITES[this.type];
        const pixels = frame === 0 ? sprites.a : sprites.b;
        drawSprite(ctx, this.x, this.y, this.width, this.height, pixels, sprites.color);
    }
}
