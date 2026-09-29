// All tuning numbers live here. Times are in milliseconds (ms).
// Speeds are in pixels per SECOND and are always multiplied by (dt / 1000).

// Canvas and layout
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const HUD_HEIGHT = 40;
export const GROUND_Y = CANVAS_HEIGHT - 40;                    // 560
export const MAX_FRAME_TIME = 50;                              // clamp dt to this

// Aliens
export const ALIEN_ROWS = 5;
export const ALIEN_COLS = 10;
export const ALIEN_WIDTH = 36;
export const ALIEN_HEIGHT = 24;
export const ALIEN_GAP_X = 16;
export const ALIEN_GAP_Y = 16;
export const ALIEN_START_Y = HUD_HEIGHT + 40;                  // 80
export const ALIEN_SPEED_X = 60;                               // px/s with all 50 alive
export const ALIEN_MAX_SPEED_X = 240;                          // px/s cap
export const ALIEN_SPEED_Y = 10;                               // px dropped per wall hit
export const ALIEN_SHOOT_INTERVAL = 1500;                      // ms between alien shots
export const ALIEN_ANIM_INTERVAL = 500;                        // ms per walk frame

// Player
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 24;
export const PLAYER_Y = GROUND_Y - PLAYER_HEIGHT - 4;          // 532
export const PLAYER_SPEED = 200;                               // px/s
export const LIVES = 3;
export const RESPAWN_DELAY = 1500;                             // ms
export const INVULNERABLE_DURATION = 2000;                     // ms

// Bullets
export const BULLET_SPEED = 400;                               // px/s, moves up
export const BULLET_WIDTH = 3;
export const BULLET_HEIGHT = 12;
export const ALIEN_BULLET_SPEED = 200;                         // px/s, moves down
export const ALIEN_BULLET_WIDTH = 3;
export const ALIEN_BULLET_HEIGHT = 12;

// Shields
export const SHIELD_COUNT = 4;
export const SHIELD_COLS = 12;
export const SHIELD_ROWS = 6;
export const SHIELD_BLOCK_SIZE = 6;
export const SHIELD_Y = GROUND_Y - SHIELD_ROWS * SHIELD_BLOCK_SIZE - 32;   // 492

// UFO
export const UFO_SPEED = 120;                                  // px/s
export const UFO_WIDTH = 48;
export const UFO_HEIGHT = 21;
export const UFO_Y = 48;
export const UFO_MIN_INTERVAL = 15000;                         // ms
export const UFO_MAX_INTERVAL = 25000;                         // ms
export const UFO_SCORES = [50, 100, 150, 200, 300];

// Waves and game flow
export const WAVE_TRANSITION_DURATION = 1500;                  // ms
export const MAX_WAVE_DESCENT = 3;                             // rows
export const RESTART_DELAY = 1000;                             // ms before restart is allowed
export const EXPLOSION_DURATION = 400;                         // ms

// Scores
export const SCORE_SQUID = 30;
export const SCORE_CRAB = 20;
export const SCORE_OCTOPUS = 10;

// Storage
export const HISCORE_KEY = 'si_hi';

// Colours
export const COLORS = {
  background: '#000000',
  green: '#44ff44',
  white: '#ffffff',
  grey: '#aaaaaa',
  red: '#ff0000',
  alienBullet: '#ff4444',
  explosion: '#ffaa00',
  yellow: '#ffff00',
};