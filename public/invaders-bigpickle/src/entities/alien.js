import Entity from './entity.js';
import {
  ALIEN_WIDTH,
  ALIEN_HEIGHT,
  ALIEN_SPACING_X,
  ALIEN_SPACING_Y,
  CANVAS_WIDTH,
} from '../constants.js';
import {
  ALIEN_SQUID_FRAME_0,
  ALIEN_SQUID_FRAME_1,
  ALIEN_CRAB_FRAME_0,
  ALIEN_CRAB_FRAME_1,
  ALIEN_OCTOPUS_FRAME_0,
  ALIEN_OCTOPUS_FRAME_1,
  drawSprite,
} from '../sprites.js';

class Alien extends Entity {
  constructor(col, row, startX, startY) {
    super(startX + col * ALIEN_SPACING_X, startY + row * ALIEN_SPACING_Y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.row = row;
    this.col = col;
    this.baseX = this.x;
    this.baseY = this.y;
    if (row <= 1) {
      this.type = 'squid';
      this.score = 30;
      this.frames = [ALIEN_SQUID_FRAME_0, ALIEN_SQUID_FRAME_1];
      this.color = '#ff4444';
    } else if (row <= 3) {
      this.type = 'crab';
      this.score = 20;
      this.frames = [ALIEN_CRAB_FRAME_0, ALIEN_CRAB_FRAME_1];
      this.color = '#44aaff';
    } else {
      this.type = 'octopus';
      this.score = 10;
      this.frames = [ALIEN_OCTOPUS_FRAME_0, ALIEN_OCTOPUS_FRAME_1];
      this.color = '#44ff88';
    }
  }

  update(deltaTime) {}

  draw(ctx) {
    const frameIndex = Math.floor(Date.now() / 500) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[frameIndex], this.color);
  }
}

export default Alien;
