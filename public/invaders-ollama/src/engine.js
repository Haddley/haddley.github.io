/**
 * src/engine.js - The main Game Engine loop and game state machine coordinator.
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT, ALIEN_ROWS, ALIEN_COLS } from './constants.js';
import { InputHandler } from './input.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';
// Import all other entities...

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.state = 'START';
        this.lastTime = 0;
        this.deltaTime = 0;

        // Core Components Setup
        this.inputHandler = new InputHandler(this.canvas);
        this.audioManager = audioManager; // Assuming audioManager is imported globally or available here

        // Entity Storage (Flat array system: PDD Section 2)
        this.entities = [];
        this.bullets = [];
        this.alienBullets = [];
        this.explosions = [];

        // Game State Variables (PDD section 1, PRD sections 4/6)
        this.player = null;
        this.shields = [];
        this.currentWave = 0;
    }

    // --- State Transitions & Setup ---

    start() {
        if (this.state !== 'START') return;
        this.resetGame();
        this.state = 'PLAYING';
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }

    resetGame() {
        // 1. Clear entities and reset state variables
        this.entities = [];
        this.bullets = [];
        this.alienBullets = [];
        this.explosions = [];
        this.shields = [];

        // 2. Initialize Player and Shields
        const initialPlayerX = (CANVAS_WIDTH / 2) - (PLAYER_WIDTH / 2);
        this.player = new Player(initialPlayerX, CANVAS_HEIGHT - 60);
        this.entities.push(this.player);

        // Initialize 4 shields spread across the bottom area
        for (let i = 0; i < SHIELD_COUNT; i++) {
            const x = 50 + i * 120; // Example spacing
            this.shields.push(new Shield(x, CANVAS_HEIGHT - 80));
            this.entities.unshift(this.shields[this.shields.length - 1]); // Put shields at start of entity list? Depends on draw order. Use separate loop draw later.
        }

        // Initialize the first alien wave
        this._startNextWave();
    }

    _startNextWave() {
        this.currentWave++;
        console.log(`Starting Wave ${this.currentWave}`);

        const baseAlienX = CANVAS_WIDTH - (ALIEN_COLS * 32) / 2; // Assuming ~32px per alien
        const baseAlienY = this.shields.length > 0 ? this.shields[0].y - 40 : 100; // Spawn above shields

        // Create a new row of aliens (simplified for scaffolding)
        for (let r = 0; r < ALIEN_ROWS; r++) {
            for (let c = 0; c < ALIEN_COLS; c++) {
                const x = baseAlienX + c * 32;
                const y = baseAlienY - r * 25;
                // Assign types: squid(r=0,1), crab(r=2,3), octopus(r=4)
                let typeIndex = (r < 2) ? 0 : (r <= 3 ? 1 : 2); 
                this.entities.push(new Alien(x, y, typeIndex));
            }
        }

        // Check if this wave setup was successful and update the state machine logic?
    }


    // --- Game Loop Implementation (PDD Section 4) ---

    mainLoop = (timestamp) => {
        if (!this.lastTime) this.lastTime = timestamp;
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // State Machine logic controls flow
        if (this.state === 'PLAYING') {
            this.update(this.deltaTime);
            this.draw();
        } else if (this.state === 'WAVE_TRANSITION') {
            this.handleWaveTransition(); // Countdown logic for 1500ms
            this.draw();
        }
        // GAMEOVER state does nothing but let the loop run

        window.requestAnimationFrame(this.mainLoop);
    }


    update(deltaTime) {
        // 1. Update all entities (Player, Aliens, UFOs, etc.)
        for (const entity of this.entities) {
            if (!entity.dead && !(entity instanceof Shield)) { // Don't update static shields? Or do only erosion checks
                entity.update(deltaTime);
            }
        }

        // 2. Update dynamic elements
        this.player.update(deltaTime);
        for (const alien of this.entities.filter(e => e instanceof Alien)) {
             alien.update(deltaTime);
        }
        
        // 3. Handle Complex Logic
        this._handleAlienMovement(); // PDD Section 5
        this._spawnUFOIfNeeded(deltaTime);

        // 4. Collision Checks (PDD Section 6)
        this.checkCollisions();

        // 5. Check Game State Exit Conditions
        if (alienThisIsTheLastAlive()) {
            this.state = 'WAVE_TRANSITION';
            // This triggers the transition overlay (PRD section 4.7/6.2)
        } else if (this.player.lives <= 0 && !this.gameOvered) {
             this.state = 'GAMEOVER';
        }
    }

    draw() {
        // Clear canvas buffer
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw background or game grid aesthetics

        // Draw Shields (must be drawn before other entities that might pass through)
        ShieldsRenderer.drawAll(this.ctx, this.shields); // Use a dedicated renderer function/class

        // Draw all moving entities
        for (const entity of this.entities) {
            if (!(entity instanceof Shield)) { 
                entity.draw(this.ctx);
            }
        }
        // Also draw bullets and UFOs even if they aren't in the main 'entities' array pool
    }

    // --- Core Logic Helpers (Placeholder implementations for complex features) ---

    _handleAlienMovement() {
       // Implementation of PDD Section 5: Single group move using speed scaling formula.
       // This requires iterating over all ALIEN entities and calculating collective movement delta.
    }

    checkCollisions() {
        // Implements AABB checks for Bullets vs Aliens, Shields, UFOs (PDD Section 6)
        // Iterates through active bullets:
        // For each bullet B:
        //   1. Check against Alien rects: if match -> pop alien/bullet, spawn explosion, add score.
        //   2. Check against Shield rects: if hit -> pop block shield, pop bullet.
    }

    handleWaveTransition() {
        // Logic runs for 1500 ms (PDD section 3)
        const elapsed = Date.now();
        if (elapsed > this.transitionEndTime) {
            console.log("Wave transition complete, initiating next wave.");
            this._startNextWave();
            this.state = 'PLAYING'; // Transition back to PLAYING
        } else {
             // Draw "WAVE N" overlay
        }
    }

    _spawnUFOIfNeeded(deltaTime) {
        // PDD Section 10/PRD section 5.7: Timer for random UFO spawn interval.
    }


    getState() {
        return this.state;
    }
}


// --- Initialization and Global Access (The entry point!) ---

// Make sure the Audio Manager is initialized on first user interaction (required by PRD 4.8)
document.addEventListener('click', () => {
    audioManager.initializeContext();
}, { once: true });

window.game = new GameEngine();
// Exporting 'game' object to be accessible from global scripts or for testing.
export default window.game;
