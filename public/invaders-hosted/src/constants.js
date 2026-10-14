// All numeric tuning values for Space Invaders, in one place.

// --- Canvas -------------------------------------------------------------
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// --- Layout -------------------------------------------------------------
// The line the player cannon stands on, and the line aliens must never cross.
export const GROUND_Y = 560;

// --- Player -------------------------------------------------------------
export const PLAYER_WIDTH = 39; // 13 cols × 3 px
export const PLAYER_HEIGHT = 24; // 8 rows × 3 px
export const PLAYER_SPEED = 300; // px/s
export const PLAYER_START_X = Math.floor((CANVAS_WIDTH - PLAYER_WIDTH) / 2);
// Cannon bottom sits exactly ON the ground line (not below it).
export const PLAYER_Y = GROUND_Y - PLAYER_HEIGHT; // 536
export const LIVES = 3;
export const RESPAWN_DELAY = 1500; // ms
export const INVULNERABLE_DURATION = 2000; // ms

// --- Bullets ------------------------------------------------------------
export const BULLET_WIDTH = 3;
export const BULLET_HEIGHT = 12;
export const BULLET_SPEED = 500; // px/s, up
export const ALIEN_BULLET_WIDTH = 4;
export const ALIEN_BULLET_HEIGHT = 12;
export const ALIEN_BULLET_SPEED = 220; // px/s, down

// --- Aliens -------------------------------------------------------------
export const ALIEN_ROWS = 5;
export const ALIEN_COLS = 10;
export const ALIEN_WIDTH = 36; // 12 cols × 3 px (uniform cell; sprites center inside)
export const ALIEN_HEIGHT = 24; // 8 rows × 3 px
export const ALIEN_COL_GAP = 20;
export const ALIEN_ROW_GAP = 16;
export const ALIEN_ROW_HEIGHT = ALIEN_HEIGHT + ALIEN_ROW_GAP; // 40
// Formation width = 10×36 + 9×20 = 540, centered in 800.
export const ALIEN_START_X = Math.floor(
  (CANVAS_WIDTH - (ALIEN_COLS * ALIEN_WIDTH + (ALIEN_COLS - 1) * ALIEN_COL_GAP)) / 2
); // 130
export const ALIEN_START_Y = 70;
export const ALIEN_SPEED_X = 1; // base horizontal speed, px per 60 fps frame
export const ALIEN_SPEED_X_MAX = 4; // cap, px per frame (sqrt scaling tops out here)
export const ALIEN_SPEED_Y = 10; // px dropped on each wall hit
export const ALIEN_FRAME_MS = 500; // animation frame toggle
export const ALIEN_SHOOT_INTERVAL = 1500; // ms between alien shots
// Score by row: squid (0–1) 30, crab (2–3) 20, octopus (4) 10.
export const ALIEN_SCORE = [30, 30, 20, 20, 10];
export const MAX_WAVE_DESCENT = 3; // max extra rows the formation descends

// --- Shields ------------------------------------------------------------
export const SHIELD_COUNT = 4;
export const SHIELD_ROWS = 6;
export const SHIELD_COLS = 12;
export const SHIELD_BLOCK = 6; // px per block
export const SHIELD_WIDTH = SHIELD_COLS * SHIELD_BLOCK; // 72
export const SHIELD_HEIGHT = SHIELD_ROWS * SHIELD_BLOCK; // 36
export const SHIELD_BOTTOM_GAP = 40; // gap from ground line to shield bottom
// Shield bottom = 520, player top = 536 → 16 px clear.
export const SHIELD_Y = GROUND_Y - SHIELD_BOTTOM_GAP - SHIELD_HEIGHT; // 484

// --- UFO -----------------------------------------------------------------
export const UFO_WIDTH = 48; // 16 cols × 3 px
export const UFO_HEIGHT = 21; // 7 rows × 3 px
export const UFO_Y = 40; // bottom = 61, alien top = 70 → clear
export const UFO_SPEED = 120; // px/s
export const UFO_MIN_INTERVAL = 15000; // ms
export const UFO_MAX_INTERVAL = 25000; // ms
export const UFO_SCORES = [50, 100, 150, 300];

// --- Timing -------------------------------------------------------------
export const FRAME_MS = 1000 / 60; // reference frame length for px/frame constants
export const WAVE_TRANSITION_DURATION = 1500; // ms
export const PIXEL_SIZE = 3; // default sprite pixel size in drawSprite
