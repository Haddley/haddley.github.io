// Single source of truth for every tuning value. See ARCHITECTURE.md for the layout
// derivation and CONVENTIONS.md for units.

// ---- Canvas ---------------------------------------------------------------
export const CANVAS_WIDTH = 800; // px
export const CANVAS_HEIGHT = 600; // px

// ---- Floor / ground line --------------------------------------------------
export const GROUND_Y = 560; // px, top of floor; the cannon's bottom sits exactly here
export const FLOOR_HEIGHT = 40; // px, floor band from GROUND_Y to CANVAS_HEIGHT
export const FLOOR_COLOR = '#00a000';
export const BACKGROUND_COLOR = '#000000';

// ---- Player ---------------------------------------------------------------
export const PLAYER_WIDTH = 39; // px (13-col sprite * 3)
export const PLAYER_HEIGHT = 24; // px (8-row sprite * 3)
export const PLAYER_SPEED = 240; // px/s
export const PLAYER_MIN_X = 0; // px
export const PLAYER_MAX_X = CANVAS_WIDTH - PLAYER_WIDTH; // 761 px
export const PLAYER_START_X = Math.floor((CANVAS_WIDTH - PLAYER_WIDTH) / 2); // 380 px
export const PLAYER_COLOR = '#00ff00';
export const LIVES = 3;
export const RESPAWN_DELAY = 1500; // ms
export const INVULNERABLE_DURATION = 2000; // ms

// ---- Bullets --------------------------------------------------------------
export const PLAYER_BULLET_WIDTH = 3; // px
export const PLAYER_BULLET_HEIGHT = 12; // px
export const PLAYER_BULLET_SPEED = 480; // px/s, upward
export const PLAYER_BULLET_COLOR = '#ffffff';
export const ALIEN_BULLET_WIDTH = 3; // px
export const ALIEN_BULLET_HEIGHT = 12; // px
export const ALIEN_BULLET_SPEED = 160; // px/s, downward
export const ALIEN_BULLET_COLOR = '#ff4040';

// ---- Aliens ---------------------------------------------------------------
export const ALIEN_ROWS = 5;
export const ALIEN_COLS = 10;
export const ALIEN_WIDTH = 33; // px (11-col sprite * 3)
export const ALIEN_HEIGHT = 24; // px (8-row sprite * 3)
export const ALIEN_SPACING_X = 45; // px between alien left edges (33 + 12 gap)
export const ALIEN_SPACING_Y = 32; // px between alien top edges (24 + 8 gap)
export const FORMATION_TOP = 90; // px, top row top edge for wave 1
export const FORMATION_WIDTH = ALIEN_WIDTH + (ALIEN_COLS - 1) * ALIEN_SPACING_X; // 438 px
export const FORMATION_LEFT = Math.round((CANVAS_WIDTH - FORMATION_WIDTH) / 2); // 181 px
export const ALIEN_SPEED_X_BASE = 60; // px/s (≈ 1 px/frame at 60 fps)
export const ALIEN_SPEED_X_MAX = 300; // px/s
export const ALIEN_SPEED_Y = 10; // px, discrete vertical drop on wall hit
export const ALIEN_SHOOT_INTERVAL = 1500; // ms
export const ALIEN_FRAME_INTERVAL = 500; // ms, animation frame toggle
export const MAX_WAVE_DESCENT = 3; // rows
export const ALIEN_COLOR = '#ffffff';

// ---- Scoring --------------------------------------------------------------
export const SCORE_SQUID = 30; // rows 0-1
export const SCORE_CRAB = 20; // rows 2-3
export const SCORE_OCTOPUS = 10; // row 4
export const UFO_SCORES = [50, 100, 150, 300];

// ---- Shields --------------------------------------------------------------
export const SHIELD_COUNT = 4;
export const SHIELD_ROWS = 6;
export const SHIELD_COLS = 12;
export const SHIELD_BLOCK_SIZE = 6; // px per block (blocks are 6x6)
export const SHIELD_WIDTH = SHIELD_COLS * SHIELD_BLOCK_SIZE; // 72 px
export const SHIELD_HEIGHT = SHIELD_ROWS * SHIELD_BLOCK_SIZE; // 36 px
export const SHIELD_GAP = 64; // px between adjacent shields
export const SHIELD_LEFT =
  Math.round((CANVAS_WIDTH - (SHIELD_COUNT * SHIELD_WIDTH + (SHIELD_COUNT - 1) * SHIELD_GAP)) / 2); // 160 px
export const SHIELD_Y = 440; // px, top of every shield
export const SHIELD_COLOR = '#00ff00';

// ---- UFO ------------------------------------------------------------------
export const UFO_WIDTH = 48; // px (16-col sprite * 3)
export const UFO_HEIGHT = 21; // px (7-row sprite * 3)
export const UFO_Y = 40; // px
export const UFO_SPEED = 120; // px/s
export const UFO_MIN_INTERVAL = 15000; // ms
export const UFO_MAX_INTERVAL = 25000; // ms
export const UFO_COLOR = '#ff0000';

// ---- March audio ----------------------------------------------------------
export const MARCH_NOTES = [320, 260, 220, 190]; // Hz, 4-step sequence
export const MARCH_BEAT_MS = 80; // ms per note
export const MARCH_INTERVAL_MAX = 800; // ms/beat at full formation
export const MARCH_INTERVAL_MIN = 100; // ms/beat at last alien

// ---- Waves -----------------------------------------------------------------
export const WAVE_TRANSITION_DURATION = 1500; // ms
