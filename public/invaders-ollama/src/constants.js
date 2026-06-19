/**
 * src/constants.js - all numeric tuning values (for centralized management)
 */

// Global Constants Object (Replaces ES Module Exports)
window.GAME_CONSTANTS = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,

    // Entity Dimensions
    PLAYER_WIDTH: 40,
    PLAYER_HEIGHT: 15,

    // Game Grid Dimensions
    ALIEN_ROWS: 5,
    ALIEN_COLS: 10,
    SHIELD_COUNT: 4,
    SHOOTER_ROW: 580, // Approximate y-coordinate for the bottom shield line
    LIIVES: 3,

    // Timing & Physics (units are typically milliseconds or px)
    RESPON_DELAY: 1500,
    INVULNERABLE_DURATION: 2000,
    ALIEN_SPEED_Y: 10, // Vertical drop per wall hit
    INITIAL_ALIEN_SPEED_X: 1, // px/frame - will be calculated based on density

    // Scoring Constants (PRD: line 46)
    SCORE_SQUID: 30,    // Rows 0-1
    SCORE_CRAB: 20,     // Rows 2-3
    SCORE_OCTOPUS: 10,  // Row 4

    // UFO Intervals (PDD: line 191)
    UFO_MIN_INTERVAL: 15000, // ms
    UFO_MAX_INTERVAL: 25000, // ms

    // Audio Constants
    AUDIO_PITCH_STEP: [320, 260, 220, 190]
};

// Bare global aliases for direct reference in game modules (engine.js, player.js, bullet.js etc.)
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var PLAYER_WIDTH = 40;
var PLAYER_HEIGHT = 15;
var ALIEN_ROWS = 5;
var ALIEN_COLS = 10;
var SHIELD_COUNT = 4;
var SHOOTER_ROW = 580;
var LIIVES = 3;
var RESPON_DELAY = 1500;
var INVULNERABLE_DURATION = 2000;
var ALIEN_SPEED_Y = 10; 
var INITIAL_ALIEN_SPEED_X = 1;

var SCORE_SQUID = 30;    
var SCORE_CRAB = 20;     
var SCORE_OCTOPUS = 10;  

var UFO_MIN_INTERVAL = 15000; // ms
var UFO_MAX_INTERVAL = 25000; // ms

var AUDIO_PITCH_STEP = [320, 260, 220, 190];