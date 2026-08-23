// ---------------------------------------------------------------------------
// entity.js — base class for all game objects + AABB overlap helper.
// ---------------------------------------------------------------------------

export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dead = false;
  }

  update(dt) {} // eslint-disable-line no-unused-vars

  draw(ctx) {} // eslint-disable-line no-unused-vars
}

export function overlaps(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
