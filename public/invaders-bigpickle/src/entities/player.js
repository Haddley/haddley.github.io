import Entity from './entity.js';
import { PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, CANVAS_WIDTH } from '../constants.js';
import { PLAYER_SPRITE, drawSprite } from '../sprites.js';
import input from '../input.js';

class Player extends Entity {
  constructor(x, y) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.lives = 3;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
    this.isDead = false;
    this.respawnTimer = 0;
  }

  update(deltaTime) {
    if (this.isDead) {
      this.respawnTimer -= deltaTime;
      if (this.respawnTimer <= 0) {
        this.isDead = false;
        this.invulnerable = true;
        this.invulnerableTimer = 2000;
      }
      return;
    }
    if (this.invulnerable) {
      this.invulnerableTimer -= deltaTime;
      if (this.invulnerableTimer <= 0) {
        this.invulnerable = false;
      }
    }
    if (input.isDown('ArrowLeft') || input.isDown('a') || input.isDown('A')) {
      this.x = Math.max(10, this.x - PLAYER_SPEED * (deltaTime / 16));
    }
    if (input.isDown('ArrowRight') || input.isDown('d') || input.isDown('D')) {
      this.x = Math.min(CANVAS_WIDTH - this.width - 10, this.x + PLAYER_SPEED * (deltaTime / 16));
    }
  }

  draw(ctx) {
    if (this.isDead) return;
    if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, '#00ff00');
  }

  die() {
    this.isDead = true;
    this.respawnTimer = 1500;
  }
}

export default Player;
