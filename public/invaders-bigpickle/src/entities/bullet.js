import Entity from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, PLAYER_BULLET_SPEED } from '../constants.js';

class Bullet extends Entity {
  constructor(x, y) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT);
    this.speed = PLAYER_BULLET_SPEED;
  }

  update(deltaTime) {
    this.y -= this.speed * (deltaTime / 16);
    if (this.y + this.height < 0) {
      this.dead = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Bullet;
