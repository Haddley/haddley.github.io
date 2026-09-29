import { Entity } from './entity.js';
import { drawSprite, UFO_SPRITE } from '../sprites.js';
import {
  UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, UFO_Y, UFO_SCORES, CANVAS_WIDTH, COLORS,
} from '../constants.js';

// Mystery ship. Starts just off one side of the screen and flies to the other.
export class UFO extends Entity {
  constructor() {
    const goRight = Math.random() < 0.5;
    super(goRight ? -UFO_WIDTH : CANVAS_WIDTH, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
    this.direction = goRight ? 1 : -1;
    this.score = UFO_SCORES[Math.floor(Math.random() * UFO_SCORES.length)];
  }

  update(dt) {
    this.x += this.direction * UFO_SPEED * (dt / 1000);
    if (this.direction === 1 && this.x > CANVAS_WIDTH) this.dead = true;
    if (this.direction === -1 && this.x + this.width < 0) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, COLORS.red);
  }
}