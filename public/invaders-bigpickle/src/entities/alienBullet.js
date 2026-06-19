import Entity from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, ALIEN_BULLET_SPEED } from '../constants.js';

class AlienBullet extends Entity {
  constructor(x, y) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT);
    this.speed = ALIEN_BULLET_SPEED;
  }

  update(deltaTime) {
    this.y += this.speed * (deltaTime / 16);
    if (this.y > 600) {
      this.dead = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffff44';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default AlienBullet;
