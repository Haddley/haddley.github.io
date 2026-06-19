import { Entity } from './entity.js';
import { ALIEN_WIDTH, ALIEN_HEIGHT } from '../constants.js';
import { ALIEN_A, ALIEN_B, ALIEN_C, drawSprite } from '../sprites.js';

const ALIEN_TYPES = [
  { frames: ALIEN_A, color: '#0ff', score: 30 },
  { frames: ALIEN_A, color: '#0ff', score: 30 },
  { frames: ALIEN_B, color: '#ff0', score: 20 },
  { frames: ALIEN_B, color: '#ff0', score: 20 },
  { frames: ALIEN_C, color: '#f0f', score: 10 },
];

export class Alien extends Entity {
  constructor(x, y, row = 0) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.dead = false;
    const type = ALIEN_TYPES[Math.min(row, ALIEN_TYPES.length - 1)];
    this.frames = type.frames;
    this.color = type.color;
    this.scoreValue = type.score;
  }

  update(deltaTime) {
    // Movement is handled by the engine to keep aliens in sync as a group
  }

  draw(ctx) {
    if (this.dead) return;
    const frame = Math.floor(Date.now() / 500) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[frame], this.color);
  }
}
