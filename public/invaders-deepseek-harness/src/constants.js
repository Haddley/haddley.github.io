// ---------------------------------------------------------------------------
// constants.js — every tuning value in one place.
// ---------------------------------------------------------------------------

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// --- Aliens ----------------------------------------------------------------
export const ALIEN_ROWS = 5;
export const ALIEN_COLS = 10;
export const ALIEN_WIDTH = 33;      // 11 sprite cols × 3 px
export const ALIEN_HEIGHT = 24;     // 8 sprite rows × 3 px
export const ALIEN_COL_SPACING = 40;
export const ALIEN_ROW_SPACING = 32;
export const ALIEN_START_Y = 90;
export const ALIEN_SPEED_X = 60;        // px/sec (~1 px/frame at 60 fps)
export const ALIEN_MAX_SPEED = 220;     // px/sec cap from sqrt scaling
export const ALIEN_SPEED_Y = 10;        // px dropped per wall hit
export const ALIEN_SHOOT_INTERVAL = 1500; // ms between alien shots
export const ALIEN_ANIM_INTERVAL = 500;   // ms between walk frames
export const MAX_WAVE_DESCENT = 3;        // max rows the formation sinks per wave

export const SCORE_SQUID = 30;
export const SCORE_CRAB = 20;
export const SCORE_OCTOPUS = 10;
export const UFO_SCORES = [50, 100, 150, 300];

// --- Player ----------------------------------------------------------------
export const PLAYER_WIDTH = 39;   // 13 × 3
export const PLAYER_HEIGHT = 24;  // 8 × 3
export const PLAYER_Y = 545;
export const PLAYER_SPEED = 240;  // px/sec
export const LIVES = 3;
export const RESPAWN_DELAY = 1500;        // ms pause before respawn
export const INVULNERABLE_DURATION = 2000; // ms post-respawn grace
export const GROUND_LINE = 560;           // aliens reaching this end the game

// --- Bullets ---------------------------------------------------------------
export const BULLET_WIDTH = 9;
export const BULLET_HEIGHT = 12;
export const PLAYER_BULLET_SPEED = 420;   // px/sec
export const ALIEN_BULLET_WIDTH = 9;
export const ALIEN_BULLET_HEIGHT = 21;
export const ALIEN_BULLET_SPEED = 220;    // px/sec
export const ALIEN_BULLET_SPEED_VARIANCE = 0.25;

// --- Shields ---------------------------------------------------------------
export const SHIELD_COUNT = 4;
export const SHIELD_WIDTH = 72;   // 12 cols × 6 px
export const SHIELD_HEIGHT = 36;  // 6 rows × 6 px
export const SHIELD_Y = 470;
export const SHIELD_BLOCK = 6;

// --- UFO -------------------------------------------------------------------
export const UFO_WIDTH = 48;  // 16 × 3
export const UFO_HEIGHT = 21; // 7 × 3
export const UFO_Y = 48;
export const UFO_SPEED = 140;       // px/sec
export const UFO_MIN_INTERVAL = 15000;
export const UFO_MAX_INTERVAL = 25000;

// --- Explosion -------------------------------------------------------------
export const EXPLOSION_DURATION = 400; // ms

// --- March music -----------------------------------------------------------
export const MARCH_NOTES = [320, 260, 220, 190]; // doubled arcade pitch
export const MARCH_NOTE_DURATION = 80;  // ms per beat
export const MARCH_MIN_INTERVAL = 100;  // ms at one alien left
export const MARCH_BASE_INTERVAL = 800; // ms at full formation

// --- Game flow -------------------------------------------------------------
export const WAVE_TRANSITION_DURATION = 1500; // ms

// --- Persistence -----------------------------------------------------------
export const HI_SCORE_KEY = 'space-invaders-hi-score';

// --- HUD / typography ------------------------------------------------------
export const HUD_FONT = '700 18px "Courier New", monospace';
export const TITLE_FONT = '700 44px "Courier New", monospace';
export const OVERLAY_FONT = '700 28px "Courier New", monospace';
export const SMALL_FONT = '700 15px "Courier New", monospace';

// --- Colors ----------------------------------------------------------------
export const COLORS = {
  background: '#000000',
  hud: '#ffffff',
  player: '#ffffff',
  playerBullet: '#ffffff',
  alienBullet: '#ff8080',
  squid: '#ff4d4d',
  crab: '#66e0ff',
  octopus: '#66ff66',
  ufo: '#ff5fd7',
  shieldA: '#3dff6e',
  shieldB: '#2ee25f',
  accent: '#3dff6e',
  warning: '#ffd23f',
  dim: '#9aa5b5',
};
