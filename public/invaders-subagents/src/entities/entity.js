// Base class for every live game object. See CONVENTIONS.md for the lifecycle.
export class Entity {
  constructor(x, y, width, height) {
    this.x = x; // px, top-left
    this.y = y; // px, top-left
    this.width = width; // px
    this.height = height; // px
    this.dead = false; // set true to be filtered out by the engine
  }

  update(deltaMs) {} // px/s velocities use deltaMs in ms

  draw(ctx) {}
}
