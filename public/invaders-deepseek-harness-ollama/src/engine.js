import {
  CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_Y, MAX_FRAME_TIME,
  ALIEN_ROWS, ALIEN_COLS, ALIEN_WIDTH, ALIEN_HEIGHT, ALIEN_GAP_X, ALIEN_GAP_Y,
  ALIEN_START_Y, ALIEN_SPEED_X, ALIEN_MAX_SPEED_X, ALIEN_SPEED_Y, ALIEN_SHOOT_INTERVAL,
  PLAYER_Y, LIVES, RESPAWN_DELAY,
  SHIELD_COUNT, SHIELD_COLS, SHIELD_BLOCK_SIZE, SHIELD_Y,
  UFO_MIN_INTERVAL, UFO_MAX_INTERVAL,
  WAVE_TRANSITION_DURATION, MAX_WAVE_DESCENT, RESTART_DELAY,
  HISCORE_KEY, COLORS,
} from './constants.js';
import { drawSprite, PLAYER_SPRITE } from './sprites.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { overlaps } from './entities/entity.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';

const TOTAL_ALIENS = ALIEN_ROWS * ALIEN_COLS;

function loadHiScore() {
  try {
    return parseInt(localStorage.getItem(HISCORE_KEY) || '0', 10) || 0;
  } catch (e) {
    return 0;
  }
}

function saveHiScore(value) {
  try {
    localStorage.setItem(HISCORE_KEY, String(value));
  } catch (e) {
    // storage blocked: ignore
  }
}

function randomUfoInterval() {
  return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
}

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'START';                 // START | PLAYING | WAVE_TRANSITION | GAMEOVER
    this.entities = [];
    this.player = null;
    this.score = 0;
    this.hiScore = loadHiScore();
    this.newHiScore = false;
    this.lives = LIVES;
    this.wave = 1;
    this.waveYOffset = 0;                 // rows the formation starts lower (0..MAX_WAVE_DESCENT)
    this.alienDirection = 1;              // 1 = right, -1 = left
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = randomUfoInterval();
    this.respawnTimer = 0;
    this.waveClock = 0;
    this.gameOverClock = 0;
    this.lastTime = performance.now();    // NOT 0, or the first dt is huge

    window.addEventListener('keydown', e => this._onKeyDown(e));
    window.addEventListener('click', () => audio.unlock());
    requestAnimationFrame(ts => this._loop(ts));
  }

  _onKeyDown(e) {
    audio.unlock();
    if (e.repeat) return;                 // ignore auto-repeat from a held key
    if (e.code !== 'Space' && e.code !== 'Enter') return;
    if (this.state === 'START') {
      this._startGame();
    } else if (this.state === 'GAMEOVER' && this.gameOverClock >= RESTART_DELAY) {
      this._startGame();
    }
  }

  // ---------- helpers that return live entities of one type ----------
  _aliens() { return this.entities.filter(e => e instanceof Alien && !e.dead); }
  _shields() { return this.entities.filter(e => e instanceof Shield); }
  _bullets() { return this.entities.filter(e => e instanceof Bullet && !e.dead); }
  _alienBullets() { return this.entities.filter(e => e instanceof AlienBullet && !e.dead); }
  _ufos() { return this.entities.filter(e => e instanceof UFO && !e.dead); }

  // ---------- setup ----------
  _startGame() {
    this.entities = [];
    this.score = 0;
    this.newHiScore = false;
    this.lives = LIVES;
    this.wave = 1;
    this.waveYOffset = 0;
    this.respawnTimer = 0;
    this.gameOverClock = 0;
    input.consumePress('Space');          // the key that started the game must not fire

    this._spawnShields();
    this.player = new Player();
    this.entities.push(this.player);
    this._resetWaveTimers();
    this._spawnAliens();
    this.state = 'PLAYING';
  }

  _spawnShields() {
    const shieldWidth = SHIELD_COLS * SHIELD_BLOCK_SIZE;
    const spacing = (CANVAS_WIDTH - SHIELD_COUNT * shieldWidth) / (SHIELD_COUNT + 1);
    for (let i = 0; i < SHIELD_COUNT; i++) {
      const x = Math.round(spacing + i * (shieldWidth + spacing));
      this.entities.push(new Shield(x, SHIELD_Y));
    }
  }

  _spawnAliens() {
    const formationWidth = ALIEN_COLS * (ALIEN_WIDTH + ALIEN_GAP_X) - ALIEN_GAP_X;
    const startX = (CANVAS_WIDTH - formationWidth) / 2;
    const startY = ALIEN_START_Y + this.waveYOffset * (ALIEN_HEIGHT + ALIEN_GAP_Y);
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        const x = startX + col * (ALIEN_WIDTH + ALIEN_GAP_X);
        const y = startY + row * (ALIEN_HEIGHT + ALIEN_GAP_Y);
        this.entities.push(new Alien(x, y, row, col));
      }
    }
    audio.startMarch(TOTAL_ALIENS, TOTAL_ALIENS);
  }

  _resetWaveTimers() {
    this.alienDirection = 1;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;
    this.ufoTimer = 0;
    this.ufoInterval = randomUfoInterval();
  }
  // ---------- main loop ----------
  _loop(timestamp) {
    const dt = Math.min(Math.max(0, timestamp - this.lastTime), MAX_FRAME_TIME);
    this.lastTime = timestamp;

    if (this.state === 'START') {
      this._drawStart();
    } else if (this.state === 'PLAYING') {
      this._update(dt);
      this._draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this._updateWaveTransition(dt);
      this._draw();
      if (this.state === 'WAVE_TRANSITION') this._drawWaveOverlay();
    } else if (this.state === 'GAMEOVER') {
      this.gameOverClock += dt;
      this._draw();
      this._drawGameOver();
    }

    requestAnimationFrame(ts => this._loop(ts));
  }

  _update(dt) {
    const firePressed = input.consumePress('Space');   // read EVERY frame so presses never pile up
    for (const e of this.entities) e.update(dt);

    if (this.player.dead) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) this.player.respawn();
    } else {
      this._moveAliens(dt);
      this._alienShoot(dt);
      if (firePressed) this._playerShoot();
    }

    this._ufoSpawn(dt);
    this._checkCollisions();
    this._removeDeadEntities();
    this._checkGameConditions();
  }

  _removeDeadEntities() {
    // The player is NEVER removed. When dead it stays in the array with dead = true.
    this.entities = this.entities.filter(e => e === this.player || !e.dead);
  }

  _playerShoot() {
    if (this._bullets().length > 0) return;          // only one player bullet at a time
    this.entities.push(new Bullet(this.player.x + this.player.width / 2, this.player.y));
    audio.shoot();
  }

  _moveAliens(dt) {
    const aliens = this._aliens();
    if (aliens.length === 0) return;

    const speed = Math.min(ALIEN_MAX_SPEED_X, ALIEN_SPEED_X * Math.sqrt(TOTAL_ALIENS / aliens.length));
    const dx = speed * (dt / 1000) * this.alienDirection;

    let hitWall = false;
    for (const a of aliens) {
      const nextX = a.x + dx;
      if (nextX < 0 || nextX + a.width > CANVAS_WIDTH) {
        hitWall = true;
        break;
      }
    }

    if (hitWall) {
      this.alienDirection = -this.alienDirection;
      for (const a of aliens) a.y += ALIEN_SPEED_Y;
    } else {
      for (const a of aliens) a.x += dx;
    }

    for (const s of this._shields()) {
      for (const a of aliens) {
        if (overlaps(a, s)) s.eraseOverlap(a.x, a.y, a.width, a.height);
      }
    }

    audio.updateMarchTempo(aliens.length, TOTAL_ALIENS);
  }

  _alienShoot(dt) {
    this.alienShootTimer -= dt;
    if (this.alienShootTimer > 0) return;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;

    const aliens = this._aliens();
    if (aliens.length === 0) return;
    // Pick a random alien, then use the LOWEST alive alien in that column.
    const picked = aliens[Math.floor(Math.random() * aliens.length)];
    let shooter = picked;
    for (const a of aliens) {
      if (a.col === picked.col && a.y > shooter.y) shooter = a;
    }
    this.entities.push(new AlienBullet(shooter.x + shooter.width / 2, shooter.y + shooter.height));
  }

  _ufoSpawn(dt) {
    if (this._ufos().length > 0) return;  // one UFO at a time
    audio.stopUfo();                      // no UFO alive => siren must be silent (every frame)
    this.ufoTimer += dt;
    if (this.ufoTimer >= this.ufoInterval) {
      this.ufoTimer = 0;
      this.ufoInterval = randomUfoInterval();
      this.entities.push(new UFO());
      audio.startUfo();
    }
  }

  // ---------- collisions, game conditions, waves, game over ----------
  _checkCollisions() {
    const aliens = this._aliens();
    const shields = this._shields();
    const ufos = this._ufos();

    // 1. Player bullets: aliens, then UFO, then shields.
    for (const b of this._bullets()) {
      for (const a of aliens) {
        if (!b.dead && !a.dead && overlaps(b, a)) {
          b.dead = true;
          a.dead = true;
          this.score += a.score;
          this.entities.push(new Explosion(a.x, a.y, a.width, a.height));
          audio.alienDie();
        }
      }
      for (const u of ufos) {
        if (!b.dead && !u.dead && overlaps(b, u)) {
          b.dead = true;
          u.dead = true;
          this.score += u.score;
          this.entities.push(new Explosion(u.x, u.y, u.width, u.height));
          audio.stopUfo();
          audio.ufoDie();
        }
      }
      for (const s of shields) {
        if (!b.dead && overlaps(b, s) && s.hitTest(b.x, b.y, b.width, b.height)) {
          b.dead = true;
        }
      }
    }

    // 2. Alien bullets: shields first, then the player.
    for (const ab of this._alienBullets()) {
      for (const s of shields) {
        if (!ab.dead && overlaps(ab, s) && s.hitTest(ab.x, ab.y, ab.width, ab.height)) {
          ab.dead = true;
        }
      }
      if (!ab.dead && !this.player.dead && !this.player.isInvulnerable() && overlaps(ab, this.player)) {
        ab.dead = true;
        this._killPlayer();
      }
    }
  }

  _killPlayer() {
    const p = this.player;
    this.entities.push(new Explosion(p.x, p.y, p.width, p.height));
    audio.playerDie();
    this.lives -= 1;
    p.dead = true;
    this.respawnTimer = RESPAWN_DELAY;
    for (const ab of this._alienBullets()) ab.dead = true;   // clear the screen of alien shots
  }

  _checkGameConditions() {
    // Order matters: losing is checked BEFORE clearing the wave.
    if (this.lives <= 0) {
      this._endGame();
      return;
    }
    const aliens = this._aliens();
    for (const a of aliens) {
      if (a.y + a.height >= PLAYER_Y) {
        this._endGame();
        return;
      }
    }
    if (aliens.length === 0) {
      this._beginWaveTransition();
    }
  }

  _beginWaveTransition() {
    audio.stopMarch();
    audio.stopUfo();
    this.entities = this.entities.filter(e =>
      e instanceof Shield || e === this.player || e instanceof Explosion);
    this.wave += 1;
    this.waveYOffset = Math.min(this.waveYOffset + 1, MAX_WAVE_DESCENT);
    this.waveClock = 0;
    this.state = 'WAVE_TRANSITION';
  }

  _updateWaveTransition(dt) {
    this.waveClock += dt;
    for (const e of this.entities) e.update(dt);
    this._removeDeadEntities();
    if (this.waveClock >= WAVE_TRANSITION_DURATION) this._startNextWave();
  }

  _startNextWave() {
    if (this.player.dead) this.player.respawn();
    this._resetWaveTimers();
    this._spawnAliens();
    this.state = 'PLAYING';
  }

  _endGame() {
    audio.stopMarch();
    audio.stopUfo();
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      this.newHiScore = true;
      saveHiScore(this.hiScore);
    }
    this.gameOverClock = 0;
    this.state = 'GAMEOVER';
  }

  // ---------- drawing ----------
  _draw() {
    const ctx = this.ctx;
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = COLORS.green;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 0.5);
    ctx.lineTo(CANVAS_WIDTH, GROUND_Y + 0.5);
    ctx.stroke();

    for (const e of this.entities) {
      if (!e.dead) e.draw(ctx);
    }
    this._drawHUD();
  }

  _drawHUD() {
    const ctx = this.ctx;
    ctx.fillStyle = COLORS.white;
    ctx.font = '18px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${this.score}`, 10, 24);
    ctx.textAlign = 'center';
    ctx.fillText(`HI: ${this.hiScore}`, CANVAS_WIDTH / 2, 24);
    ctx.textAlign = 'right';
    ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH - 10, 24);

    ctx.fillStyle = COLORS.green;
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('LIVES', 10, CANVAS_HEIGHT - 14);
    for (let i = 0; i < this.lives; i++) {
      drawSprite(ctx, 70 + i * 34, CANVAS_HEIGHT - 30, 26, 16, PLAYER_SPRITE, COLORS.green);
    }
  }

  _drawStart() {
    const ctx = this.ctx;
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.green;
    ctx.font = 'bold 56px monospace';
    ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, 180);
    ctx.fillStyle = COLORS.white;
    ctx.font = '24px monospace';
    ctx.fillText('Press SPACE or ENTER to start', CANVAS_WIDTH / 2, 280);
    ctx.fillStyle = COLORS.grey;
    ctx.font = '16px monospace';
    ctx.fillText('Arrow keys / A-D to move   SPACE to shoot', CANVAS_WIDTH / 2, 330);
    ctx.fillStyle = COLORS.white;
    ctx.fillText(`HI: ${this.hiScore}`, CANVAS_WIDTH / 2, 370);

    const rows = [
      ['UFO', COLORS.red, '50-300 PTS'],
      ['SQUID', COLORS.white, '30 PTS'],
      ['CRAB', COLORS.white, '20 PTS'],
      ['OCTOPUS', COLORS.white, '10 PTS'],
    ];
    rows.forEach(([label, color, points], i) => {
      const y = 430 + i * 32;
      ctx.textAlign = 'left';
      ctx.fillStyle = color;
      ctx.fillText(label, CANVAS_WIDTH / 2 - 120, y);
      ctx.textAlign = 'right';
      ctx.fillStyle = COLORS.white;
      ctx.fillText(points, CANVAS_WIDTH / 2 + 120, y);
    });
  }

  _drawWaveOverlay() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }

  _drawGameOver() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.alienBullet;
    ctx.font = 'bold 56px monospace';
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 220);
    ctx.fillStyle = COLORS.white;
    ctx.font = '28px monospace';
    ctx.fillText(`Score: ${this.score}`, CANVAS_WIDTH / 2, 290);
    if (this.newHiScore) {
      ctx.fillStyle = COLORS.yellow;
      ctx.font = '20px monospace';
      ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, 330);
    }
    if (this.gameOverClock >= RESTART_DELAY) {
      ctx.fillStyle = COLORS.green;
      ctx.font = '22px monospace';
      ctx.fillText('Press SPACE or ENTER to restart', CANVAS_WIDTH / 2, 390);
    }
  }
}

// ---------- entry point (the ONLY place a GameEngine is created) ----------
const game = new GameEngine(document.getElementById('game'));
window.game = game;   // debug handle: type  game.state  in the browser console
