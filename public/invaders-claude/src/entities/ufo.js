import { Entity } from './entity.js';
import { drawSprite, UFO_SPRITE } from '../sprites.js';
import { UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, CANVAS_WIDTH } from '../constants.js';

const UFO_SCORES = [50, 100, 150, 200, 300];

export class UFO extends Entity {
  constructor() {
    const goRight = Math.random() < 0.5;
    const x = goRight ? -UFO_WIDTH : CANVAS_WIDTH;
    super(x, 48, UFO_WIDTH, UFO_HEIGHT);
    this.goRight = goRight;
    this.score = UFO_SCORES[Math.floor(Math.random() * UFO_SCORES.length)];
  }

  update(dt) {
    this.x += (this.goRight ? 1 : -1) * UFO_SPEED * (dt / 1000);
    if (this.goRight && this.x > CANVAS_WIDTH) this.dead = true;
    if (!this.goRight && this.x + this.width < 0) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, '#ff0000');
  }
}
