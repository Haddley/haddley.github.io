import { Entity } from './entity.js';
import {
  drawSprite, SQUID_A, SQUID_B, CRAB_A, CRAB_B, OCTOPUS_A, OCTOPUS_B,
} from '../sprites.js';
import {
  ALIEN_WIDTH, ALIEN_HEIGHT, ALIEN_ANIM_INTERVAL,
  SCORE_SQUID, SCORE_CRAB, SCORE_OCTOPUS, COLORS,
} from '../constants.js';

const TYPES = [
  { frames: [SQUID_A, SQUID_B], score: SCORE_SQUID },       // rows 0-1
  { frames: [CRAB_A, CRAB_B], score: SCORE_CRAB },          // rows 2-3
  { frames: [OCTOPUS_A, OCTOPUS_B], score: SCORE_OCTOPUS }, // row 4
];

export class Alien extends Entity {
  constructor(x, y, row, col) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.row = row;
    this.col = col;
    const typeIndex = row <= 1 ? 0 : row <= 3 ? 1 : 2;
    this.frames = TYPES[typeIndex].frames;
    this.score = TYPES[typeIndex].score;
  }

  // Empty on purpose: the ENGINE moves all aliens together.
  update(dt) {}

  draw(ctx) {
    const frame = Math.floor(Date.now() / ALIEN_ANIM_INTERVAL) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[frame], COLORS.white);
  }
}