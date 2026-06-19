import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ALIEN_ROWS,
  ALIEN_COLS,
  ALIEN_SPEED_X,
  ALIEN_SPEED_Y,
  ALIEN_MAX_SPEED,
  ALIEN_SPACING_X,
  ALIEN_SPACING_Y,
  LIVES,
  SHIELD_COUNT,
  SHIELD_WIDTH,
  UFO_MIN_INTERVAL,
  UFO_MAX_INTERVAL,
  WAVE_TRANSITION_DURATION,
  MAX_WAVE_DESCENT,
  PLAYER_Y,
  PLAYER_BULLET_Y,
  ALIEN_SHOOT_INTERVAL,
  HI_SCORE_KEY,
} from './constants.js';
import audio from './audio.js';
import input from './input.js';
import Player from './entities/player.js';
import Alien from './entities/alien.js';
import Bullet from './entities/bullet.js';
import AlienBullet from './entities/alienBullet.js';
import Explosion from './entities/explosion.js';
import Shield from './entities/shield.js';
import UFO from './entities/ufo.js';

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.state = 'START';
    this.entities = [];
    this.score = 0;
    this.hiScore = parseInt(localStorage.getItem(HI_SCORE_KEY) || '0', 10);
    this.wave = 0;
    this.waveTimer = 0;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randomUfoInterval();
    this.lastTime = performance.now();
    this._bindEvents();
    this._loop(this.lastTime);
  }

  _bindEvents() {
    const unlock = () => {
      audio.unlock();
      if (this.state === 'START') {
        this.start();
      }
    };
    window.addEventListener('keydown', (e) => {
      unlock();
      if (this.state === 'GAMEOVER' && e.key === ' ') {
        this.restart();
      }
    }, { once: false });
    this.canvas.addEventListener('click', () => {
      unlock();
    });
  }

  start() {
    this.state = 'PLAYING';
    this.score = 0;
    this.wave = 0;
    this._startNextWave();
    this.lastTime = performance.now();
  }

  restart() {
    this.entities = [];
    this.score = 0;
    this.wave = 0;
    this.waveTimer = 0;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randomUfoInterval();
    this.state = 'PLAYING';
    this._startNextWave();
  }

  _startNextWave() {
    this.wave++;
    this.alienDirection = 1;
    this.entities = this.entities.filter(e => e instanceof Shield);
    if (this.entities.length === 0) {
      this._createShields();
    }
    const offsetY = Math.min(this.wave - 1, MAX_WAVE_DESCENT) * ALIEN_SPACING_Y;
    const startX = (CANVAS_WIDTH - (ALIEN_COLS - 1) * ALIEN_SPACING_X) / 2 - 20;
    const startY = 80 + offsetY;
    this.player = new Player(CANVAS_WIDTH / 2 - 25, PLAYER_Y);
    this.entities.push(this.player);
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        this.entities.push(new Alien(c, r, startX, startY));
      }
    }
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randomUfoInterval();
    audio.stopUFO();
    this._updateMarch();
  }

  _createShields() {
    const spacing = CANVAS_WIDTH / (SHIELD_COUNT + 1);
    for (let i = 0; i < SHIELD_COUNT; i++) {
      const x = spacing * (i + 1) - SHIELD_WIDTH / 2;
      const y = PLAYER_Y - 80;
      this.entities.push(new Shield(x, y));
    }
  }

  _updateMarch() {
    const aliens = this.entities.filter(e => e instanceof Alien);
    const total = ALIEN_ROWS * ALIEN_COLS;
    audio.startMarch(aliens.length, total, () => {});
  }

  _randomUfoInterval() {
    return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
  }

  _loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (this.state === 'PLAYING') {
      this._update(deltaTime);
      this._draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this.waveTimer += deltaTime;
      this._draw();
      this._drawWaveOverlay();
      if (this.waveTimer >= WAVE_TRANSITION_DURATION) {
        this.waveTimer = 0;
        this.state = 'PLAYING';
        this._startNextWave();
      }
    } else if (this.state === 'START') {
      this._drawStartScreen();
    } else if (this.state === 'GAMEOVER') {
      this._drawGameOverOverlay();
    }

    requestAnimationFrame((ts) => this._loop(ts));
  }

  _update(deltaTime) {
    for (const e of this.entities) {
      e.update(deltaTime);
    }
    const ufous = this.entities.filter(e => e instanceof UFO);
    for (const u of ufous) {
      if (u.dead) {
        audio.stopUFO();
      }
    }
    this.entities = this.entities.filter(e => !e.dead);
    this._moveAliens(deltaTime);
    this._alienShoot(deltaTime);
    this._spawnUfo(deltaTime);
    this._handlePlayerShoot();
    this._checkCollisions();
    this._checkGameConditions();
  }

  _moveAliens(deltaTime) {
    const aliens = this.entities.filter(e => e instanceof Alien);
    if (aliens.length === 0) return;
    const total = ALIEN_ROWS * ALIEN_COLS;
    const speed = Math.min(ALIEN_MAX_SPEED, ALIEN_SPEED_X * Math.sqrt(total / aliens.length));
    const dx = speed * this.alienDirection * (deltaTime / 16);
    let hitWall = false;
    for (const a of aliens) {
      if ((this.alienDirection === 1 && a.x + a.width + dx >= CANVAS_WIDTH - 10) ||
          (this.alienDirection === -1 && a.x + dx <= 10)) {
        hitWall = true;
        break;
      }
    }
    if (hitWall) {
      for (const a of aliens) {
        a.y += ALIEN_SPEED_Y;
      }
      this.alienDirection *= -1;
    } else {
      for (const a of aliens) {
        a.x += dx;
      }
    }
  }

  _alienShoot(deltaTime) {
    this.alienShootTimer += deltaTime;
    if (this.alienShootTimer >= ALIEN_SHOOT_INTERVAL) {
      this.alienShootTimer = 0;
      const aliens = this.entities.filter(e => e instanceof Alien);
      if (aliens.length > 0) {
        const shooter = aliens[Math.floor(Math.random() * aliens.length)];
        this.entities.push(new AlienBullet(shooter.x + shooter.width / 2, shooter.y + shooter.height));
      }
    }
  }

  _spawnUfo(deltaTime) {
    this.ufoTimer += deltaTime;
    if (this.ufoTimer >= this.ufoInterval) {
      this.ufoTimer = 0;
      this.ufoInterval = this._randomUfoInterval();
      const existingUfo = this.entities.find(e => e instanceof UFO);
      if (!existingUfo) {
        this.entities.push(new UFO());
        audio.startUFO();
      }
    }
  }

  _handlePlayerShoot() {
    if (!this.player || this.player.isDead) return;
    if (input.isDown(' ')) {
      const hasBullet = this.entities.some(e => e instanceof Bullet);
      if (!hasBullet) {
        this.entities.push(new Bullet(this.player.x + this.player.width / 2 - 2, PLAYER_BULLET_Y));
        audio.playerShoot();
        input.keys[' '] = false;
      }
    }
  }

  _checkCollisions() {
    const bullets = this.entities.filter(e => e instanceof Bullet);
    const alienBullets = this.entities.filter(e => e instanceof AlienBullet);
    const aliens = this.entities.filter(e => e instanceof Alien);
    const shields = this.entities.filter(e => e instanceof Shield);
    const ufous = this.entities.filter(e => e instanceof UFO);
    for (const b of bullets) {
      for (const a of aliens) {
        if (b.overlaps(a)) {
          b.dead = true;
          a.dead = true;
          this.score += a.score;
          this.entities.push(new Explosion(a.x, a.y, a.width, a.height, a.color));
          audio.alienDeath();
          this._updateMarch();
        }
      }
      for (const u of ufous) {
        if (b.overlaps(u)) {
          b.dead = true;
          u.dead = true;
          this.score += u.score;
          this.entities.push(new Explosion(u.x, u.y, u.width, u.height, '#ff00ff'));
          audio.ufoDeath();
          if (this.score > this.hiScore) {
            this.hiScore = this.score;
            localStorage.setItem(HI_SCORE_KEY, this.hiScore.toString());
          }
        }
      }
      for (const s of shields) {
        if (s.hitTest(b.x, b.y, b.width, b.height)) {
          b.dead = true;
        }
      }
    }
    for (const ab of alienBullets) {
      for (const s of shields) {
        if (s.hitTest(ab.x, ab.y, ab.width, ab.height)) {
          ab.dead = true;
        }
      }
      if (this.player && !this.player.isDead && !this.player.invulnerable && ab.overlaps(this.player)) {
        ab.dead = true;
        this._playerHit();
      }
    }
    for (const a of aliens) {
      for (const s of shields) {
        if (a.overlaps(s)) {
          s.eraseOverlap(a.x, a.y, a.width, a.height);
        }
      }
    }
  }

  _playerHit() {
    if (!this.player || this.player.isDead) return;
    this.player.die();
    this.player.lives--;
    this.entities.push(new Explosion(this.player.x, this.player.y, this.player.width, this.player.height, '#00ff00'));
    audio.playerDeath();
    if (this.player.lives <= 0) {
      this._endGame();
    }
  }

  _checkGameConditions() {
    const aliens = this.entities.filter(e => e instanceof Alien);
    if (aliens.length === 0 && this.state === 'PLAYING') {
      this.state = 'WAVE_TRANSITION';
      this.waveTimer = 0;
      audio.stopMarch();
      audio.stopUFO();
    }
    for (const a of aliens) {
      if (a.y + a.height >= PLAYER_Y) {
        this._endGame();
        return;
      }
    }
  }

  _endGame() {
    this.state = 'GAMEOVER';
    audio.stopMarch();
    audio.stopUFO();
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      localStorage.setItem(HI_SCORE_KEY, this.hiScore.toString());
    }
  }

  _draw() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const e of this.entities) {
      e.draw(this.ctx);
    }
    this._drawHUD();
  }

  _drawHUD() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`SCORE: ${this.score}`, 10, 20);
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`HI: ${this.hiScore}`, CANVAS_WIDTH / 2, 20);
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH - 80, 20);
    if (this.player) {
      this.ctx.fillText(`LIVES: ${this.player.lives}`, CANVAS_WIDTH - 10, 20);
    }
  }

  _drawStartScreen() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = '#00ff00';
    this.ctx.font = '48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
    this.ctx.font = '20px monospace';
    this.ctx.fillText('Press any key to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
    this.ctx.font = '14px monospace';
    this.ctx.fillStyle = '#888888';
    this.ctx.fillText('Arrow keys / A,D to move  |  Space to fire', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
  }

  _drawWaveOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = '#00ffff';
    this.ctx.font = '36px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }

  _drawGameOverOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = '#ff0000';
    this.ctx.font = '48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '24px monospace';
    this.ctx.fillText(`FINAL SCORE: ${this.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
    if (this.score >= this.hiScore) {
      this.ctx.fillStyle = '#ffff00';
      this.ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }
    this.ctx.fillStyle = '#888888';
    this.ctx.font = '16px monospace';
    this.ctx.fillText('Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
  }
}

const canvas = document.getElementById('game');
if (canvas) {
  const engine = new GameEngine('game');
  window.engine = engine;
}

export default GameEngine;
