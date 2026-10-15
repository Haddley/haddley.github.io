// Small pure helpers. See CONVENTIONS.md for units/naming.

/**
 * Clamp `value` to the inclusive range [min, max].
 * Returns `min` when value < min, `max` when value > max, otherwise `value`.
 * Assumes min <= max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Return true if two axis-aligned rectangles overlap (share any interior area).
 * Each rectangle is an object {x, y, width, height} in pixels (top-left origin).
 * Touching edges (exactly equal) count as NOT overlapping.
 * @param {{x:number,y:number,width:number,height:number}} a
 * @param {{x:number,y:number,width:number,height:number}} b
 * @returns {boolean}
 */
export function overlaps(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
