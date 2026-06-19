import {
    CANVAS_WIDTH, CANVAS_HEIGHT,
    PLAYER_Y, RESPAWN_DELAY,
    ALIEN_ROWS, ALIEN_COLS, ALIEN_COL_SPACING, ALIEN_ROW_SPACING,
    ALIEN_BASE_SPEED, ALIEN_MAX_SPEED, ALIEN_DROP, ALIEN_SHOOT_INTERVAL,
    SHIELD_COUNT, SHIELD_Y, SHIELD_WIDTH,
    UFO_MIN_INTERVAL, UFO_MAX_INTERVAL,
    SCORE_SQUID, SCORE_CRAB, SCORE_OCTOPUS,
    MARCH_MAX_INTERVAL, MARCH_MIN_INTERVAL,
    MAX_WAVE_DESCENT, WAVE_TRANSITION_MS,
    GROUND_Y,
} from './constants.js';
import { InputHandler } from './input.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';
import {
    playShootSound, playAlienDeathSound, playPlayerDeathSound,
    playMarchBeat, startUFOSound, stopUFOSound, playUFODeathSound,
    initAudioContext,
} from './audio.js';

const STATE = { START: 'START', PLAYING: 'PLAYING', WAVE_TRANSITION: 'WAVE_TRANSITION', GAMEOVER: 'GAMEOVER' };

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.input = new InputHandler();

        this.state = STATE.START;
        this.lastTime = 0;
        this.score = 0;
        this.hiScore = parseInt(localStorage.getItem('invadersHiScore') || '0', 10);
        this.wave = 0;
        this.waveYOffset = 0;
        this.entities = [];
        this.player = null;
        this.shields = [];
        this.ufo = null;

        this.alienDirection = 1;
        this.alienShootTimer = 0;
        this.ufoTimer = 0;
        this.ufoSpawnDelay = this._randomUFOInterval();
        this.respawnTimer = 0;
        this.marchTimer = 0;
        this.waveTransitionEnd = 0;

        this.mainLoop = this.mainLoop.bind(this);
        this._initAudio();
        this._startMainLoop();
    }

    _initAudio() {
        const handler = () => {
            initAudioContext();
            document.removeEventListener('keydown', handler);
            document.removeEventListener('click', handler);
        };
        document.addEventListener('keydown', handler, { once: true });
        document.addEventListener('click', handler, { once: true });
    }

    _startMainLoop() {
        requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (this.state !== STATE.START) return;
        this._resetGame();
        this.state = STATE.PLAYING;
    }

    _resetGame() {
        this.entities = [];
        this.score = 0;
        this.wave = 0;
        this.waveYOffset = 0;
        this.alienDirection = 1;
        this.alienShootTimer = 0;
        this.marchTimer = 0;
        this.respawnTimer = 0;
        this.ufo = null;
        stopUFOSound();

        this.player = new Player();
        this.entities.push(this.player);

        this.shields = [];
        const totalShieldW = SHIELD_COUNT * SHIELD_WIDTH;
        const gap = (CANVAS_WIDTH - totalShieldW) / (SHIELD_COUNT + 1);
        for (let i = 0; i < SHIELD_COUNT; i++) {
            const sx = gap + i * (SHIELD_WIDTH + gap);
            const shield = new Shield(sx, SHIELD_Y);
            this.shields.push(shield);
            this.entities.push(shield);
        }

        this._startNextWave();
    }

    _startNextWave() {
        this.wave++;
        this.waveYOffset = Math.min(this.wave - 1, MAX_WAVE_DESCENT) * ALIEN_ROW_SPACING;
        this.alienDirection = 1;

        this.entities = this.entities.filter(e => e instanceof Player || e instanceof Shield);

        const gridW = ALIEN_COLS * ALIEN_COL_SPACING;
        const baseX = (CANVAS_WIDTH - gridW) / 2;
        const baseY = 270 + this.waveYOffset;

        for (let row = 0; row < ALIEN_ROWS; row++) {
            const typeIndex = row < 2 ? 0 : (row <= 3 ? 1 : 2);
            for (let col = 0; col < ALIEN_COLS; col++) {
                const ax = baseX + col * ALIEN_COL_SPACING;
                const ay = baseY + row * ALIEN_ROW_SPACING;
                this.entities.push(new Alien(ax, ay, typeIndex));
            }
        }

        this.alienShootTimer = 0;
        this.ufo = null;
        this.ufoTimer = 0;
        this.ufoSpawnDelay = this._randomUFOInterval();
        stopUFOSound();
    }

    _randomUFOInterval() {
        return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
    }

    mainLoop(timestamp) {
        requestAnimationFrame(this.mainLoop);

        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = Math.min(timestamp - this.lastTime, 50);
        this.lastTime = timestamp;

        if (this.state === STATE.PLAYING) {
            this._update(deltaTime);
        } else if (this.state === STATE.WAVE_TRANSITION) {
            if (performance.now() >= this.waveTransitionEnd) {
                this._startNextWave();
                this.state = STATE.PLAYING;
            }
        }

        this._draw();

        if (this.state === STATE.START) {
            if (this.input.isPressed('Enter') || this.input.isPressed(' ')) {
                this.start();
            }
        }
    }

    _update(deltaTime) {
        if (!this.player.dead) {
            if (this.input.isPressed('ArrowLeft') || this.input.isPressed('a') || this.input.isPressed('A')) {
                this.player.moveLeft(deltaTime);
            }
            if (this.input.isPressed('ArrowRight') || this.input.isPressed('d') || this.input.isPressed('D')) {
                this.player.moveRight(deltaTime);
            }

            const hasBullet = this.entities.some(e => e instanceof Bullet && !e.dead);
            if (this.input.isPressed(' ') && !hasBullet) {
                const bx = this.player.x + this.player.width / 2 - 1.5;
                const by = this.player.y;
                this.entities.push(new Bullet(bx, by));
                playShootSound();
            }
        }

        for (const entity of this.entities) {
            if (!entity.dead) {
                entity.update(deltaTime);
            }
        }

        this._handleAlienMovement(deltaTime);
        this._handleAlienShooting(deltaTime);
        this._handleUFO(deltaTime);
        this._handleMarchSound(deltaTime);
        this._checkCollisions();
        this._handlePlayerRespawn(deltaTime);

        this._checkAlienGround();

        this.entities = this.entities.filter(e => !e.dead);

        this._checkWaveClear();
        this._checkGameOver();
    }

    _getAliveAliens() {
        return this.entities.filter(e => e instanceof Alien && !e.dead);
    }

    _handleAlienMovement(deltaTime) {
        const aliens = this._getAliveAliens();
        if (aliens.length === 0) return;

        const total = ALIEN_ROWS * ALIEN_COLS;
        const speed = Math.min(ALIEN_MAX_SPEED, ALIEN_BASE_SPEED * Math.sqrt(total / aliens.length));
        const moveX = speed * deltaTime * this.alienDirection;

        let hitWall = false;
        for (const a of aliens) {
            const newX = a.x + moveX;
            if (newX < 0 || newX + a.width > CANVAS_WIDTH) {
                hitWall = true;
                break;
            }
        }

        if (hitWall) {
            this.alienDirection *= -1;
            for (const a of aliens) {
                a.y += ALIEN_DROP;
            }
        } else {
            for (const a of aliens) {
                a.x += moveX;
            }
        }
    }

    _handleAlienShooting(deltaTime) {
        this.alienShootTimer += deltaTime;
        if (this.alienShootTimer < ALIEN_SHOOT_INTERVAL) return;
        this.alienShootTimer = 0;

        const aliens = this._getAliveAliens();
        if (aliens.length === 0) return;

        const cols = new Map();
        for (const a of aliens) {
            const colKey = Math.round(a.x);
            if (!cols.has(colKey) || a.y > cols.get(colKey).y) {
                cols.set(colKey, a);
            }
        }

        const bottomAliens = Array.from(cols.values());
        if (bottomAliens.length === 0) return;

        const shooter = bottomAliens[Math.floor(Math.random() * bottomAliens.length)];
        const bx = shooter.x + shooter.width / 2 - 1.5;
        const by = shooter.y + shooter.height;
        this.entities.push(new AlienBullet(bx, by));
    }

    _handleUFO(deltaTime) {
        if (this.ufo && this.ufo.dead) {
            stopUFOSound();
            this.ufo = null;
        }

        if (this.ufo) return;

        this.ufoTimer += deltaTime;
        if (this.ufoTimer >= this.ufoSpawnDelay) {
            this.ufoTimer = 0;
            this.ufoSpawnDelay = this._randomUFOInterval();
            const dir = Math.random() < 0.5 ? 1 : -1;
            this.ufo = new UFO(dir);
            this.entities.push(this.ufo);
            startUFOSound();
        }
    }

    _handleMarchSound(deltaTime) {
        const aliens = this._getAliveAliens();
        if (aliens.length === 0) return;

        const total = ALIEN_ROWS * ALIEN_COLS;
        const interval = Math.max(MARCH_MIN_INTERVAL, MARCH_MAX_INTERVAL * aliens.length / total);

        this.marchTimer += deltaTime;
        if (this.marchTimer >= interval) {
            this.marchTimer = 0;
            playMarchBeat();
        }
    }

    _checkCollisions() {
        const bullets = this.entities.filter(e => e instanceof Bullet && !e.dead);
        const alienBullets = this.entities.filter(e => e instanceof AlienBullet && !e.dead);
        const aliens = this.entities.filter(e => e instanceof Alien && !e.dead);

        for (const bullet of bullets) {
            for (const alien of aliens) {
                if (alien.dead) continue;
                if (bullet.overlaps(alien)) {
                    bullet.dead = true;
                    alien.dead = true;
                    const points = alien.type === 0 ? SCORE_SQUID : (alien.type === 1 ? SCORE_CRAB : SCORE_OCTOPUS);
                    this.score += points;
                    this.entities.push(new Explosion(alien.x + alien.width / 2, alien.y + alien.height / 2));
                    playAlienDeathSound();
                    break;
                }
            }

            if (bullet.dead) continue;

            for (const shield of this.shields) {
                if (shield.dead) continue;
                if (shield.hitTest(bullet)) {
                    bullet.dead = true;
                    break;
                }
            }

            if (bullet.dead) continue;

            if (this.ufo && !this.ufo.dead && this.ufo.active && bullet.overlaps(this.ufo)) {
                bullet.dead = true;
                this.ufo.dead = true;
                this.score += this.ufo.bonusScore;
                this.entities.push(new Explosion(this.ufo.x + this.ufo.width / 2, this.ufo.y + this.ufo.height / 2));
                stopUFOSound();
                playUFODeathSound();
            }
        }

        for (const ab of alienBullets) {
            if (ab.dead) continue;

            for (const shield of this.shields) {
                if (shield.dead) continue;
                if (shield.hitTest(ab)) {
                    ab.dead = true;
                    break;
                }
            }

            if (ab.dead) continue;

            if (!this.player.dead && !this.player.invulnerable && ab.overlaps(this.player)) {
                ab.dead = true;
                this._killPlayer();
            }
        }

        for (const alien of aliens) {
            if (alien.dead) continue;
            for (const shield of this.shields) {
                if (shield.dead) continue;
                shield.eraseOverlap(alien.x, alien.y, alien.width, alien.height);
            }
        }
    }

    _killPlayer() {
        playPlayerDeathSound();
        this.entities.push(new Explosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2));
        this.player.hit();
        if (this.player.lives > 0) {
            this.respawnTimer = RESPAWN_DELAY;
        }
        this.alienShootTimer = 0;
    }

    _handlePlayerRespawn(deltaTime) {
        if (!this.player.dead || this.player.lives <= 0) return;
        this.respawnTimer -= deltaTime;
        if (this.respawnTimer <= 0) {
            this.player.respawn();
            this.entities.push(this.player);
            this.respawnTimer = 0;
        }
    }

    _checkAlienGround() {
        const aliens = this._getAliveAliens();
        for (const a of aliens) {
            if (a.y + a.height >= GROUND_Y) {
                this._endGame();
                return;
            }
        }
    }

    _checkWaveClear() {
        const aliens = this._getAliveAliens();
        if (aliens.length === 0) {
            this.state = STATE.WAVE_TRANSITION;
            this.waveTransitionEnd = performance.now() + WAVE_TRANSITION_MS;
            this.entities = this.entities.filter(e => !(e instanceof Alien) && !(e instanceof Bullet) && !(e instanceof AlienBullet));
            this.ufo = null;
            stopUFOSound();
        }
    }

    _checkGameOver() {
        if (this.player.lives <= 0 && !this.entities.some(e => e instanceof Explosion && !e.dead)) {
            this._endGame();
        }
    }

    _endGame() {
        this.state = STATE.GAMEOVER;
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
            localStorage.setItem('invadersHiScore', String(this.hiScore));
        }
        stopUFOSound();
    }

    _draw() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (this.state === STATE.START) {
            this._drawStartScreen();
            return;
        }

        if (this.state === STATE.GAMEOVER) {
            this._drawGame();
            this._drawHUD();
            this._drawGameOverOverlay();
            this._checkRestart();
            return;
        }

        this._drawGame();
        this._drawHUD();

        if (this.state === STATE.WAVE_TRANSITION) {
            this._drawWaveOverlay();
        }
    }

    _drawGame() {
        for (const entity of this.entities) {
            if (!entity.dead) {
                entity.draw(this.ctx);
            }
        }
    }

    _drawHUD() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px monospace';

        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${String(this.score).padStart(4, '0')}`, 10, 20);

        this.ctx.textAlign = 'center';
        this.ctx.fillText(`HI-SCORE: ${String(this.hiScore).padStart(4, '0')}`, CANVAS_WIDTH / 2, 20);

        this.ctx.textAlign = 'right';
        this.ctx.fillText(`WAVE: ${this.wave}`, CANVAS_WIDTH - 10, 20);

        this.ctx.textAlign = 'left';
        for (let i = 0; i < this.player.lives; i++) {
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(10 + i * 20, CANVAS_HEIGHT - 18, 14, 6);
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('LIVES', CANVAS_WIDTH - 10, CANVAS_HEIGHT - 10);
    }

    _drawWaveOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '36px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    _drawStartScreen() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '36px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

        this.ctx.font = '14px monospace';
        this.ctx.fillText('SQUID = 30 PTS   CRAB = 20 PTS   OCTOPUS = 10 PTS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        this.ctx.fillText('← → or A/D TO MOVE   SPACE TO FIRE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);

        if (this.hiScore > 0) {
            this.ctx.font = '18px monospace';
            this.ctx.fillText(`HI-SCORE: ${String(this.hiScore).padStart(4, '0')}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
        }

        this.ctx.font = '20px monospace';
        const blink = Math.floor(Date.now() / 600) % 2 === 0;
        if (blink) {
            this.ctx.fillText('PRESS ENTER TO START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 110);
        }
    }

    _drawGameOverOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.ctx.fillStyle = '#ff0000';
        this.ctx.font = '36px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px monospace';
        this.ctx.fillText(`SCORE: ${String(this.score).padStart(4, '0')}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

        if (this.score >= this.hiScore && this.score > 0) {
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = '18px monospace';
            this.ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px monospace';
        const blink = Math.floor(Date.now() / 600) % 2 === 0;
        if (blink) {
            this.ctx.fillText('PRESS ENTER TO PLAY AGAIN', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
        }
    }

    _checkRestart() {
        if (this.input.isPressed('Enter') || this.input.isPressed(' ')) {
            this._resetGame();
            this.state = STATE.PLAYING;
        }
    }
}

new GameEngine();
