// Base class for every game object. x, y is the TOP-LEFT corner.
export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dead = false;          // set to true to have the engine remove it
  }

  update(dt) {}
  draw(ctx) {}
}

// true when two rectangles overlap (AABB test).
export function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}