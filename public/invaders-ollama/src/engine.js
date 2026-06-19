/**
 * src/engine.js - The main Game Engine loop and game state machine coordinator.
 * Vanilla JS version (no modules) – uses globals.
 */

(function() {
    'use strict';

    // All dependencies are assumed to be globally available:
    // CANVAS_WIDTH, CANVAS_HEIGHT, ALIEN_ROWS, ALIEN_COLS,
    // PLAYER_WIDTH, SHIELD_COUNT,
    // Player, Alien, Shield, Bullet, UFO, InputHandler, audioManager

    function GameEngine() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.state = 'START';
        this.lastTime = 0;
        this.deltaTime = 0;
        this.transitionEndTime = 0;

        // Core Components
        this.inputHandler = new InputHandler(this.canvas);
        this.audioManager = audioManager; // global

        // Entity storage
        this.entities = [];
        this.bullets = [];
        this.alienBullets = [];
        this.explosions = [];

        // Game state
        this.player = null;
        this.shields = [];
        this.currentWave = 0;
        this.gameOvered = false;

        // Bind mainLoop to keep `this` correct
        this.mainLoop = this.mainLoop.bind(this);
    }

    // --- State Transitions & Setup ---

    GameEngine.prototype.start = function() {
        if (this.state !== 'START') return;
        this.resetGame();
        this.state = 'PLAYING';
        window.requestAnimationFrame(this.mainLoop);
    };

    GameEngine.prototype.resetGame = function() {
        this.entities = [];
        this.bullets = [];
        this.alienBullets = [];
        this.explosions = [];
        this.shields = [];
        this.gameOvered = false;

        // Player
        var initialPlayerX = (CANVAS_WIDTH / 2) - (PLAYER_WIDTH / 2);
        this.player = new Player(initialPlayerX, CANVAS_HEIGHT - 60);
        this.entities.push(this.player);

        // Shields
        for (var i = 0; i < SHIELD_COUNT; i++) {
            var x = 50 + i * 120;
            var shield = new Shield(x, CANVAS_HEIGHT - 80);
            this.shields.push(shield);
            this.entities.unshift(shield);
        }

        this._startNextWave();
    };

    GameEngine.prototype._startNextWave = function() {
        this.currentWave++;
        console.log('Starting Wave ' + this.currentWave);

        var baseAlienX = (CANVAS_WIDTH - (ALIEN_COLS * 32)) / 2;
        var baseAlienY = this.shields.length > 0 ? this.shields[0].y - 40 : 100;

        for (var r = 0; r < ALIEN_ROWS; r++) {
            for (var c = 0; c < ALIEN_COLS; c++) {
                var x = baseAlienX + c * 32;
                var y = baseAlienY - r * 25;
                var typeIndex = (r < 2) ? 0 : (r <= 3 ? 1 : 2);
                this.entities.push(new Alien(x, y, typeIndex));
            }
        }
    };

    // --- Game Loop ---

    GameEngine.prototype.mainLoop = function(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (this.state === 'PLAYING') {
            this.update(this.deltaTime);
            this.draw();
        } else if (this.state === 'WAVE_TRANSITION') {
            this.handleWaveTransition();
            this.draw();
        }

        window.requestAnimationFrame(this.mainLoop);
    };

    GameEngine.prototype.update = function(deltaTime) {
        // Update all entities (except static shields – they get updated separately if needed)
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (!entity.dead && !(entity instanceof Shield)) {
                entity.update(deltaTime);
            }
        }

        // Player and aliens might need separate handling
        this.player.update(deltaTime);
        for (var j = 0; j < this.entities.length; j++) {
            var e = this.entities[j];
            if (e instanceof Alien) {
                e.update(deltaTime);
            }
        }

        this._handleAlienMovement();
        this._spawnUFOIfNeeded(deltaTime);
        this.checkCollisions();

        // Check game over / wave transition
        if (this._isLastAlienDead()) {
            this.state = 'WAVE_TRANSITION';
            this.transitionEndTime = performance.now() + 1500;
        } else if (this.player.lives <= 0 && !this.gameOvered) {
            this.state = 'GAMEOVER';
            this.gameOvered = true;
        }
    };

    GameEngine.prototype.draw = function() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw shields
        for (var i = 0; i < this.shields.length; i++) {
            this.shields[i].draw(this.ctx);
        }

        // Draw all non‑shield entities
        for (var j = 0; j < this.entities.length; j++) {
            var entity = this.entities[j];
            if (!(entity instanceof Shield)) {
                entity.draw(this.ctx);
            }
        }

        // Draw bullets, alien bullets, explosions (if stored separately)
        for (var k = 0; k < this.bullets.length; k++) {
            this.bullets[k].draw(this.ctx);
        }
        for (var l = 0; l < this.alienBullets.length; l++) {
            this.alienBullets[l].draw(this.ctx);
        }
        for (var m = 0; m < this.explosions.length; m++) {
            this.explosions[m].draw(this.ctx);
        }
    };

    // --- Helper methods (placeholders) ---

    GameEngine.prototype._handleAlienMovement = function() {
        // TODO: implement alien group movement
    };

    GameEngine.prototype.checkCollisions = function() {
        // TODO: implement AABB collision checks
    };

    GameEngine.prototype.handleWaveTransition = function() {
        var now = performance.now();
        if (now > this.transitionEndTime) {
            this._startNextWave();
            this.state = 'PLAYING';
        }
    };

    GameEngine.prototype._spawnUFOIfNeeded = function(deltaTime) {
        // TODO: implement UFO spawning
    };

    GameEngine.prototype._isLastAlienDead = function() {
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            if (e instanceof Alien && !e.dead) {
                return false;
            }
        }
        return true;
    };

    GameEngine.prototype.getState = function() {
        return this.state;
    };

    // --- Instantiate and expose globally ---

    var game = new GameEngine();
    window.game = game;
    game.start();

    document.addEventListener('click', function() {
        if (audioManager && audioManager.initializeContext) {
            audioManager.initializeContext();
        }
    }, { once: true });

})();