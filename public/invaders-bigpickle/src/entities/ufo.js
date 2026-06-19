import Entity from './entity.js';
import { UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, CANVAS_WIDTH, UFO_Y } from '../constants.js';
import { UFO_SPRITE, drawSprite } from '../sprites.js';

class UFO extends Entity {
  constructor() {
    super(-UFO_WIDTH, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
    this.speed = UFO_SPEED;
    this.score = [50, 100, 150, 300][Math.floor(Math.random() * 4)];
    this.dir = Math.random() < 0.5 ? 1 : -1;
    if (this.dir === -1) {
      this.x = CANVAS_WIDTH;
    }
  }

  update(deltaTime) {
    this.x += this.speed * this.dir * (deltaTime / 16);
    if ((this.dir === 1 && this.x > CANVAS_WIDTH + this.width) ||
        (this.dir === -1 && this.x + this.width < 0)) {
      this.dead = true;
    }
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, '#ff00ff');
  }
}

export default UFO;
