// Base class for every game object. All entities live in one flat array.
export class Entity {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dead = false;
  }

  update(dt) {
    // no-op by default
  }

  draw(ctx) {
    // no-op by default
  }

  overlaps(other) {
    return overlaps(this, other);
  }
}

// Axis-aligned bounding-box intersection test.
export function overlaps(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}
