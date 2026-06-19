import {
  CANVAS_WIDTH, CANVAS_HEIGHT,
  ALIEN_ROWS, ALIEN_COLS, ALIEN_WIDTH, ALIEN_HEIGHT,
  ALIEN_SPEED_X, ALIEN_SPEED_Y,
  LIVES, RESPAWN_DELAY, INVULNERABLE_DURATION,
  SHIELD_COUNT, SHIELD_WIDTH, SHIELD_Y,
  UFO_MIN_INTERVAL, UFO_MAX_INTERVAL,
} from './constants.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';
import audio from './audio.js';

const ALIEN_ROW_STEP = ALIEN_HEIGHT + 15; // pixels per wave descent (matches spawnAliens gap)
const MAX_WAVE_DESCENT = ALIEN_ROW_STEP * 3; // cap at 3 rows so aliens don't start inside shields

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.state = 'START';
    this.lastTime = 0;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.alienShootInterval = 1500;

    this.init();
    document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    requestAnimationFrame((t) => this.mainLoop(t));
  }

  init() {
    this.entities = [];
    this.score = 0;
    this.hiScore = parseInt(localStorage.getItem('invaders-hi-score') || '0', 10);
    this.lives = LIVES;
    this.wave = 1;
    this.waveYOffset = 0;
    this.waveTransitionTimer = 0;
    this.alienDirection = 1;
    this.alienShootTimer = this.alienShootInterval;
    this.marchTimer = 800;
    this.marchStep = 0;
    this.marchInterval = 800;
    this.ufoTimer = this._randomUFOInterval();
    this.respawnTimer = 0;

    audio.stopUFO();

    this.player = new Player(CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT - 50, this);
    this.entities.push(this.player);
    this.spawnAliens();
    this.spawnShields();

    document.getElementById('score').textContent = '0';
    document.getElementById('hi-score').textContent = this.hiScore;
    this._updateLivesUI();
    this._updateWaveUI();
  }

  restart() {
    document.getElementById('message-screen').classList.add('hidden');
    this.init();
    this.state = 'PLAYING';
  }

  start() {
    this.state = 'PLAYING';
  }

  mainLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (this.state === 'PLAYING') {
      this.update(deltaTime);
      this.draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this.waveTransitionTimer -= deltaTime;
      this.draw();
      this._drawWaveMessage();
      if (this.waveTransitionTimer <= 0) {
        this._startNextWave();
        this.state = 'PLAYING';
      }
    }

    requestAnimationFrame((t) => this.mainLoop(t));
  }

  aliens() {
    return this.entities.filter(e => e instanceof Alien && !e.dead);
  }

  update(deltaTime) {
    const aliveAliens = this.aliens();

    // Move all aliens as a coordinated group.
    // Speed scales up as aliens are killed — faithful to the original hardware
    // accident where fewer aliens meant faster loop cycles.
    const total = ALIEN_ROWS * ALIEN_COLS;
    const alienSpeed = Math.min(
      ALIEN_SPEED_X * 5,
      ALIEN_SPEED_X * Math.sqrt(total / Math.max(1, aliveAliens.length))
    );
    let hitWall = false;
    for (const alien of aliveAliens) {
      const nextX = alien.x + alienSpeed * this.alienDirection;
      if (nextX <= 0 || nextX + alien.width >= CANVAS_WIDTH) { hitWall = true; break; }
    }
    if (hitWall) {
      aliveAliens.forEach(a => { a.y += ALIEN_SPEED_Y; });
      this.alienDirection *= -1;
    } else {
      aliveAliens.forEach(a => { a.x += alienSpeed * this.alienDirection; });
    }

    // Alien shooting
    this.alienShootTimer -= deltaTime;
    if (this.alienShootTimer <= 0 && aliveAliens.length > 0) {
      const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
      this.entities.push(new AlienBullet(shooter.x + shooter.width / 2 - 2, shooter.y + shooter.height));
      this.alienShootTimer = this.alienShootInterval;
    }

    // Alien march sound — tempo scales with remaining aliens
    this.marchTimer -= deltaTime;
    if (this.marchTimer <= 0 && aliveAliens.length > 0) {
      audio.playMarch(this.marchStep % 4);
      this.marchStep++;
      this.marchInterval = Math.max(100, 800 * (aliveAliens.length / (ALIEN_ROWS * ALIEN_COLS)));
      this.marchTimer = this.marchInterval;
    }

    // UFO spawn
    this.ufoTimer -= deltaTime;
    if (this.ufoTimer <= 0 && !this.entities.some(e => e instanceof UFO && !e.dead)) {
      const direction = Math.random() < 0.5 ? 1 : -1;
      this.entities.push(new UFO(direction));
      audio.startUFO();
      this.ufoTimer = this._randomUFOInterval();
    }

    // Update all entities
    this.entities.forEach(e => e.update(deltaTime));

    // Stop UFO audio if it flew off screen
    const dyingUFO = this.entities.find(e => e instanceof UFO && e.dead);
    if (dyingUFO) audio.stopUFO();

    // Remove dead entities
    this.entities = this.entities.filter(e => !e.dead);

    this.checkCollisions();
    this.checkGameConditions();

    // Respawn countdown
    if (this.player.dead && this.lives > 0) {
      this.respawnTimer -= deltaTime;
      if (this.respawnTimer <= 0) this._respawnPlayer();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.entities.forEach(e => e.draw(this.ctx));
  }

  _drawWaveMessage() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = 'bold 48px "Courier New", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.ctx.textAlign = 'left';
  }

  spawnAliens() {
    const gap = 15;
    const totalWidth = ALIEN_COLS * ALIEN_WIDTH + (ALIEN_COLS - 1) * gap;
    const offsetX = (CANVAS_WIDTH - totalWidth) / 2;
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        const x = offsetX + col * (ALIEN_WIDTH + gap);
        const y = 60 + this.waveYOffset + row * (ALIEN_HEIGHT + gap);
        this.entities.push(new Alien(x, y, row));
      }
    }
  }

  spawnShields() {
    const spacing = CANVAS_WIDTH / (SHIELD_COUNT + 1);
    for (let i = 0; i < SHIELD_COUNT; i++) {
      const x = Math.round(spacing * (i + 1) - SHIELD_WIDTH / 2);
      this.entities.push(new Shield(x, SHIELD_Y));
    }
  }

  overlaps(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }

  checkCollisions() {
    const playerBullets = this.entities.filter(e => e instanceof Bullet && !e.dead);
    const alienBullets = this.entities.filter(e => e instanceof AlienBullet && !e.dead);
    const aliveAliens = this.aliens();
    const shields = this.entities.filter(e => e instanceof Shield);
    const ufo = this.entities.find(e => e instanceof UFO && !e.dead);

    // Player bullets vs aliens
    for (const bullet of playerBullets) {
      if (bullet.dead) continue;
      for (const alien of aliveAliens) {
        if (alien.dead) continue;
        if (this.overlaps(bullet, alien)) {
          bullet.dead = true;
          alien.dead = true;
          this._addScore(alien.scoreValue);
          audio.playAlienDeath();
          this.entities.push(new Explosion(alien.x, alien.y, alien.width, alien.height, alien.color, 8, 500));
        }
      }
    }

    // Player bullets vs UFO
    if (ufo) {
      for (const bullet of playerBullets) {
        if (bullet.dead) continue;
        if (this.overlaps(bullet, ufo)) {
          bullet.dead = true;
          ufo.dead = true;
          this._addScore(ufo.scoreValue);
          audio.playUFODeath();
          this.entities.push(new Explosion(ufo.x, ufo.y, ufo.width, ufo.height, '#f55', 10, 600));
        }
      }
    }

    // Aliens erode shield blocks they overlap as they descend
    for (const alien of aliveAliens) {
      for (const shield of shields) {
        if (this.overlaps(alien, shield)) {
          shield.eraseOverlap(alien.x, alien.y, alien.width, alien.height);
        }
      }
    }

    // Bullets vs shields
    for (const bullet of [...playerBullets, ...alienBullets]) {
      if (bullet.dead) continue;
      for (const shield of shields) {
        if (shield.hitTest(bullet.x, bullet.y, bullet.width, bullet.height)) {
          bullet.dead = true;
          break;
        }
      }
    }

    // Alien bullets vs player
    if (!this.player.dead && !this.player.invulnerable) {
      for (const bullet of alienBullets) {
        if (bullet.dead) continue;
        if (this.overlaps(bullet, this.player)) {
          bullet.dead = true;
          this.player.dead = true;
          this.lives--;
          this._updateLivesUI();
          audio.playPlayerDeath();
          this.entities.push(new Explosion(this.player.x, this.player.y, this.player.width, this.player.height, '#0f0', 12, 800));
          if (this.lives > 0) this.respawnTimer = RESPAWN_DELAY;
        }
      }
    }
  }

  checkGameConditions() {
    if (this.player.dead && this.lives <= 0) {
      this.endGame('GAME OVER');
      return;
    }
    const aliveAliens = this.aliens();
    if (aliveAliens.length === 0) {
      // Clear any orphaned alien bullets before transitioning
      this.entities = this.entities.filter(e => !(e instanceof AlienBullet));
      audio.stopUFO();
      this.wave++;
      this._updateWaveUI();
      this.state = 'WAVE_TRANSITION';
      this.waveTransitionTimer = 1500;
      return;
    }
    for (const alien of aliveAliens) {
      if (alien.y + alien.height >= CANVAS_HEIGHT - 60) {
        this.endGame('GAME OVER');
        return;
      }
    }
  }

  _startNextWave() {
    // Aliens start one row lower each wave, capped so they don't spawn inside shields
    this.waveYOffset = Math.min(this.waveYOffset + ALIEN_ROW_STEP, MAX_WAVE_DESCENT);

    // Shields persist — only remove aliens, bullets, UFOs, and finished explosions
    this.entities = this.entities.filter(e => e instanceof Shield || e instanceof Player || e instanceof Explosion);

    this.alienDirection = 1;
    this.alienShootTimer = this.alienShootInterval;
    this.marchTimer = 800;
    this.marchStep = 0;
    this.marchInterval = 800;
    this.ufoTimer = this._randomUFOInterval();

    this.spawnAliens();
  }

  _respawnPlayer() {
    this.player = new Player(CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT - 50, this);
    this.player.invulnerable = true;
    this.player.invulnerableTimer = INVULNERABLE_DURATION;
    this.entities.push(this.player);
  }

  _updateLivesUI() {
    document.getElementById('lives-count').textContent = this.lives;
  }

  _updateWaveUI() {
    document.getElementById('wave-count').textContent = this.wave;
  }

  _addScore(points) {
    this.score += points;
    document.getElementById('score').textContent = this.score;
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      localStorage.setItem('invaders-hi-score', this.hiScore);
      document.getElementById('hi-score').textContent = this.hiScore;
    }
  }

  _randomUFOInterval() {
    return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
  }

  endGame(text) {
    this.state = 'GAMEOVER';
    audio.stopUFO();
    const isNewHi = this.score > 0 && this.score >= this.hiScore;
    document.getElementById('message-text').textContent = text;
    document.getElementById('final-score-text').textContent = isNewHi
      ? `NEW HI SCORE: ${this.score}`
      : `Score: ${this.score}  Hi: ${this.hiScore}`;
    document.getElementById('message-screen').classList.remove('hidden');
  }
}

const engine = new GameEngine('gameCanvas');
engine.start();
