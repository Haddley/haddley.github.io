import { Entity } from './entity.js';
import { UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, UFO_COLOR } from '../constants.js';
import { drawSprite, UFO_SPRITE } from '../sprites.js';

export class UFO extends Entity {
  constructor(x, y, direction, score) {
    super(x, y, UFO_WIDTH, UFO_HEIGHT);
    this.direction = direction; // +1 or -1
    this.score = score; // bonus awarded on hit
  }

  update(deltaMs) {
    this.x += this.direction * UFO_SPEED * (deltaMs / 1000);
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, UFO_COLOR);
  }
}
