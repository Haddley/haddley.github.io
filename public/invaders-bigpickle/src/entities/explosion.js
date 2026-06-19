import Entity from './entity.js';
import { EXPLOSION_SPRITE, drawSprite } from '../sprites.js';
import { EXPLOSION_DURATION } from '../constants.js';

class Explosion extends Entity {
  constructor(x, y, w, h, color) {
    super(x, y, w, h);
    this.color = color;
    this.timer = EXPLOSION_DURATION;
  }

  update(deltaTime) {
    this.timer -= deltaTime;
    if (this.timer <= 0) {
      this.dead = true;
    }
  }

  draw(ctx) {
    const progress = 1 - this.timer / EXPLOSION_DURATION;
    ctx.globalAlpha = 1 - progress;
    drawSprite(ctx, this.x - this.width * 0.3, this.y - this.height * 0.3, this.width * 1.6, this.height * 1.6, EXPLOSION_SPRITE, this.color);
    ctx.globalAlpha = 1;
  }
}

export default Explosion;
