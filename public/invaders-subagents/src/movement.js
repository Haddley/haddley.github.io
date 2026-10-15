// Pure movement/timing helpers. Import constants only; no DOM access.
import {
  ALIEN_SPEED_X_BASE,
  ALIEN_SPEED_X_MAX,
  ALIEN_SPACING_Y,
  MARCH_NOTES,
  MARCH_INTERVAL_MAX,
  MARCH_INTERVAL_MIN,
  MAX_WAVE_DESCENT,
  PLAYER_MIN_X,
  PLAYER_MAX_X,
  PLAYER_SPEED,
  UFO_MIN_INTERVAL,
  UFO_MAX_INTERVAL,
  UFO_SCORES,
  ALIEN_FRAME_INTERVAL,
} from './constants.js';

/**
 * Horizontal speed of the alien swarm in px/s.
 * Formula: min(ALIEN_SPEED_X_MAX, ALIEN_SPEED_X_BASE * sqrt(totalCount / aliveCount)).
 * Both counts must be >= 1 (the engine never calls this with no aliens).
 * @param {number} aliveCount number of aliens still alive
 * @param {number} totalCount number of aliens the wave started with
 * @returns {number} speed in px/s
 */
export function alienSpeed(aliveCount, totalCount) {
  return Math.min(ALIEN_SPEED_X_MAX, ALIEN_SPEED_X_BASE * Math.sqrt(totalCount / aliveCount));
}

/**
 * Time between march notes in ms, scaling with remaining aliens.
 * Formula: max(MARCH_INTERVAL_MIN, MARCH_INTERVAL_MAX * aliveCount / totalCount).
 * Both counts must be >= 1.
 * @param {number} aliveCount
 * @param {number} totalCount
 * @returns {number} interval in ms
 */
export function marchInterval(aliveCount, totalCount) {
  return Math.max(MARCH_INTERVAL_MIN, MARCH_INTERVAL_MAX * aliveCount / totalCount);
}

/**
 * Frequency in Hz of the march note at the given step.
 * Cycles through MARCH_NOTES ([320, 260, 220, 190]) using step % notes.length.
 * @param {number} step non-negative integer beat index (0-based)
 * @returns {number} frequency in Hz
 */
export function marchNote(step) {
  return MARCH_NOTES[step % MARCH_NOTES.length];
}

/**
 * Vertical spawn offset in px for a given 1-based wave number.
 * Formula: min(wave - 1, MAX_WAVE_DESCENT) * ALIEN_SPACING_Y.
 * Wave 1 -> 0; wave 4 and beyond -> 3 * ALIEN_SPACING_Y (capped).
 * @param {number} wave 1-based wave number (>= 1)
 * @returns {number} offset in px
 */
export function waveYOffset(wave) {
  return Math.min(wave - 1, MAX_WAVE_DESCENT) * ALIEN_SPACING_Y;
}

/**
 * A random UFO spawn delay in ms, uniform in [UFO_MIN_INTERVAL, UFO_MAX_INTERVAL].
 * @returns {number} interval in ms
 */
export function randomUfoInterval() {
  return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
}

/**
 * A random UFO bonus score, chosen uniformly from UFO_SCORES.
 * @returns {number} one of [50, 100, 150, 300]
 */
export function randomUfoScore() {
  const index = Math.floor(Math.random() * UFO_SCORES.length);
  return UFO_SCORES[index];
}

/**
 * The alien animation frame (0 or 1) for a given timestamp in ms.
 * Formula: floor(timestamp / ALIEN_FRAME_INTERVAL) % 2.
 * @param {number} timestamp milliseconds since epoch (>= 0)
 * @returns {number} 0 or 1
 */
export function alienFrameIndex(timestamp) {
  return Math.floor(timestamp / ALIEN_FRAME_INTERVAL) % 2;
}

/**
 * New x position (px) of the player after moving `direction` for `deltaMs` ms.
 * step = PLAYER_SPEED * deltaMs / 1000; result = x + direction * step, clamped to
 * [PLAYER_MIN_X, PLAYER_MAX_X]. `direction` is -1 (left), 0, or +1 (right).
 * @param {number} x current left-edge x in px
 * @param {number} direction -1, 0, or 1
 * @param {number} deltaMs elapsed time in ms (>= 0)
 * @returns {number} clamped x in px
 */
export function playerXAfterMove(x, direction, deltaMs) {
  const step = PLAYER_SPEED * deltaMs / 1000;
  const result = x + direction * step;
  return Math.min(PLAYER_MAX_X, Math.max(PLAYER_MIN_X, result));
}

/**
 * True if an object whose top is `y` and height `height` has reached or passed the
 * ground line: y + height >= groundY.
 * @param {number} y top edge in px
 * @param {number} height in px
 * @param {number} groundY ground line y in px
 * @returns {boolean}
 */
export function hasReachedGround(y, height, groundY) {
  return y + height >= groundY;
}

/**
 * True if moving every alien left-edge in `xs` horizontally by `direction * stepPx` px
 * would put ANY alien's rect (width `width`) outside [0, canvasWidth]. Used to decide
 * whether the swarm should drop and reverse instead of stepping horizontally.
 * @param {number[]} xs left-edge x positions of alive aliens, in px
 * @param {number} direction +1 (right) or -1 (left)
 * @param {number} stepPx horizontal step in px (>= 0)
 * @param {number} width alien width in px
 * @param {number} canvasWidth canvas width in px
 * @returns {boolean}
 */
export function alienSweepHitsWall(xs, direction, stepPx, width, canvasWidth) {
  for (const x of xs) {
    const nextX = x + direction * stepPx;
    if (nextX < 0 || nextX + width > canvasWidth) {
      return true;
    }
  }
  return false;
}
