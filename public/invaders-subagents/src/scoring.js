// Scoring helpers. See CONVENTIONS.md for units/naming.
import { SCORE_SQUID, SCORE_CRAB, SCORE_OCTOPUS } from './constants.js';

/**
 * Point value for an alien in the given 0-based row.
 * Rows 0-1 (squid) = 30, rows 2-3 (crab) = 20, row 4+ (octopus) = 10.
 * @param {number} row 0-based alien row (>= 0)
 * @returns {number} points
 */
export function scoreForRow(row) {
  if (row <= 1) {
    return SCORE_SQUID;
  } else if (row <= 3) {
    return SCORE_CRAB;
  } else {
    return SCORE_OCTOPUS;
  }
}
