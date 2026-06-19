import { Entity } from './entity.js';
import { CANVAS_WIDTH, UFO_WIDTH, UFO_HEIGHT, UFO_Y, UFO_SPEED } from '../constants.js';
import { UFO_PIXELS, drawSprite } from '../sprites.js';

const SCORE_VALUES = [50, 100, 150, 300];

export class UFO extends Entity {
  constructor(direction) {
    const x = direction === 1 ? -UFO_WIDTH : CANVAS_WIDTH;
    super(x, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
    this.dead = false;
    this.direction = direction;
    this.scoreValue = SCORE_VALUES[Math.floor(Math.random() * SCORE_VALUES.length)];
  }

  update(deltaTime) {
    this.x += UFO_SPEED * this.direction;
    if (this.x > CANVAS_WIDTH + this.width || this.x < -this.width) {
      this.dead = true;
    }
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_PIXELS, '#f55');
  }
}
