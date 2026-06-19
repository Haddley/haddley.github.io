import { Entity } from './entity.js';
import { drawSprite, SQUID_A, SQUID_B, CRAB_A, CRAB_B, OCTOPUS_A, OCTOPUS_B } from '../sprites.js';
import { ALIEN_WIDTH, ALIEN_HEIGHT, SCORE_SQUID, SCORE_CRAB, SCORE_OCTOPUS } from '../constants.js';

const TYPES = [
  { frames: [SQUID_A, SQUID_B], score: SCORE_SQUID, color: '#ffffff' },   // rows 0-1
  { frames: [CRAB_A, CRAB_B],   score: SCORE_CRAB,  color: '#ffffff' },   // rows 2-3
  { frames: [OCTOPUS_A, OCTOPUS_B], score: SCORE_OCTOPUS, color: '#ffffff' }, // row 4
];

export class Alien extends Entity {
  constructor(x, y, row) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    // rows 0-1 → squid, rows 2-3 → crab, row 4 → octopus
    const typeIdx = row <= 1 ? 0 : row <= 3 ? 1 : 2;
    this.type = TYPES[typeIdx];
    this.score = this.type.score;
    this.row = row;
  }

  update(dt) {}

  draw(ctx) {
    const frame = Math.floor(Date.now() / 500) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.type.frames[frame], this.type.color);
  }
}
