import { Entity } from './entity.js';

export class Explosion extends Entity {
  constructor(x, y, width = 30, height = 30) {
    super(x, y, width, height);
    this.x = x - width / 2;
    this.y = y - height / 2;
    this.duration = 350;
    this.elapsed = 0;
  }

  update(dt) {
    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      this.dead = true;
    }
  }

  draw(ctx) {
    const t = this.elapsed / this.duration;
    
    // Save current globalAlpha
    const originalGlobalAlpha = ctx.globalAlpha;
    
    // Set alpha for fading effect
    ctx.globalAlpha = 1 - t;
    
    // Draw an X (two crossing lines) that expands with time
    ctx.strokeStyle = '#ffff00'; // Yellow color
    ctx.lineWidth = 3;
    
    // Calculate line length based on time (grows from 0 to full width)
    const lineLength = this.width * t;
    
    // Draw horizontal line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2 - lineLength / 2, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width / 2 + lineLength / 2, this.y + this.height / 2);
    ctx.stroke();
    
    // Draw vertical line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2 - lineLength / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2 + lineLength / 2);
    ctx.stroke();
    
    // Reset globalAlpha to original value
    ctx.globalAlpha = originalGlobalAlpha;
  }
}