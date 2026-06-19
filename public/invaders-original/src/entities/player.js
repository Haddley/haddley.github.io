import { Entity } from './entity.js';
import { PLAYER_SPEED, CANVAS_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants.js';
import input from '../input.js';
import { Bullet } from './bullet.js';
import { PLAYER_PIXELS, drawSprite } from '../sprites.js';
import audio from '../audio.js';

export class Player extends Entity {
  constructor(x, y, engine) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.engine = engine;
    this.dead = false;
    this.lastShotTime = 0;
    this.shootDelay = 500;
    this.invulnerable = false;
    this.invulnerableTimer = 0;
  }

  update(deltaTime) {
    if (this.dead) return;

    if (this.invulnerable) {
      this.invulnerableTimer -= deltaTime;
      if (this.invulnerableTimer <= 0) this.invulnerable = false;
    }

    if (input.isPressed('ArrowLeft')) this.x -= PLAYER_SPEED;
    if (input.isPressed('ArrowRight')) this.x += PLAYER_SPEED;

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;

    const now = Date.now();
    if (input.isPressed('Space') && now - this.lastShotTime > this.shootDelay) {
      this.engine.entities.push(new Bullet(this.x + this.width / 2 - 2, this.y));
      this.lastShotTime = now;
      audio.playShoot();
    }
  }

  draw(ctx) {
    if (this.dead) return;
    if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_PIXELS, '#0f0');
  }
}
