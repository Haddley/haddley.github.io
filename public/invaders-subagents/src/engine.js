import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  FLOOR_HEIGHT,
  FLOOR_COLOR,
  BACKGROUND_COLOR,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_START_X,
  LIVES,
  RESPAWN_DELAY,
  INVULNERABLE_DURATION,
  PLAYER_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT,
  ALIEN_ROWS,
  ALIEN_COLS,
  ALIEN_WIDTH,
  ALIEN_HEIGHT,
  ALIEN_SPACING_X,
  ALIEN_SPACING_Y,
  FORMATION_TOP,
  FORMATION_LEFT,
  ALIEN_SPEED_Y,
  ALIEN_SHOOT_INTERVAL,
  SHIELD_COUNT,
  SHIELD_LEFT,
  SHIELD_Y,
  SHIELD_WIDTH,
  SHIELD_GAP,
  UFO_WIDTH,
  UFO_Y,
  WAVE_TRANSITION_DURATION,
} from './constants.js';
import { overlaps } from './utils.js';
import {
  alienSpeed,
  marchInterval,
  waveYOffset,
  randomUfoInterval,
  randomUfoScore,
  hasReachedGround,
  alienSweepHitsWall,
} from './movement.js';
import { scoreForRow } from './scoring.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';
import AudioManagerInstance from './audio.js';
import InputHandlerInstance from './input.js';
import { drawSprite, PLAYER_SPRITE } from './sprites.js';

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'START';
    this.entities = [];
    this.player = null;
    this.score = 0;
    this.hiScore = this._loadHiScore();
    this.newHiScore = false;
    this.wave = 1;
    this.lives = LIVES;
    this.alienDirection = 1;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;
    this.ufoTimer = randomUfoInterval();
    this.ufo = null;
    this.marchStep = 0;
    this.marchTimer = 0;
    this.respawnTimer = 0;
    this.waveTransitionTimer = 0;
    this.lastTime = 0;
    this._autotestFrames = 0;
    this._autotestDone = false;

    this.autotest = false;
    if (typeof location !== 'undefined') {
      try {
        this.autotest = new URLSearchParams(location.search).has('autotest');
      } catch (e) {
        this.autotest = false;
      }
    }

    this._boundClick = (e) => this._onClick(e);
    canvas.addEventListener('click', this._boundClick);

    this._buildShields();
    this._spawnAliens();
    this._spawnPlayer(false);
  }

  // ---- lifecycle ----------------------------------------------------------
  startLoop() {
    const loop = (ts) => {
      this._frame(ts);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  start() {
    if (this.state !== 'START') return;
    this.state = 'PLAYING';
  }

  restart() {
    AudioManagerInstance.ufoStop();
    this.entities = [];
    this.player = null;
    this.score = 0;
    this.newHiScore = false;
    this.wave = 1;
    this.lives = LIVES;
    this.alienDirection = 1;
    this.ufo = null;
    this.marchStep = 0;
    this._buildShields();
    this._spawnAliens();
    this._spawnPlayer(false);
    this.state = 'PLAYING';
  }

  // ---- persistence --------------------------------------------------------
  _loadHiScore() {
    try {
      return parseInt(localStorage.getItem('invaders-hi-score') || '0', 10) || 0;
    } catch (e) {
      return 0;
    }
  }

  _saveHiScore() {
    try {
      localStorage.setItem('invaders-hi-score', String(this.hiScore));
    } catch (e) {
      /* ignore */
    }
  }

  // ---- construction helpers ----------------------------------------------
  _buildShields() {
    for (let i = 0; i < SHIELD_COUNT; i++) {
      this.entities.push(new Shield(SHIELD_LEFT + i * (SHIELD_WIDTH + SHIELD_GAP), SHIELD_Y));
    }
  }

  _spawnAliens() {
    const offset = waveYOffset(this.wave);
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        const x = FORMATION_LEFT + c * ALIEN_SPACING_X;
        const y = FORMATION_TOP + offset + r * ALIEN_SPACING_Y;
        this.entities.push(new Alien(r, c, x, y));
      }
    }
  }

  _spawnPlayer(invulnerable) {
    const p = new Player(PLAYER_START_X, GROUND_Y - PLAYER_HEIGHT);
    if (invulnerable) {
      p.invulnerable = true;
      p.invulnTimer = INVULNERABLE_DURATION;
    }
    this.player = p;
    this.entities.push(p);
  }

  // ---- main loop ----------------------------------------------------------
  _frame(timestamp) {
    const dt = this.lastTime === 0 ? 0 : Math.min(timestamp - this.lastTime, 50);
    this.lastTime = timestamp;

    if (this.state === 'START') {
      if (InputHandlerInstance.consumeStart() || this.autotest) {
        this.start();
        if (this.autotest) this._firePlayerBullet();
      }
      this._draw();
    } else if (this.state === 'PLAYING') {
      this._update(dt);
      this._draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this.waveTransitionTimer -= dt;
      if (this.waveTransitionTimer <= 0) this._startNextWave();
      this._draw();
    } else if (this.state === 'GAMEOVER') {
      if (InputHandlerInstance.consumeStart()) this.restart();
      this._draw();
    }

    if (this.autotest && this.state === 'PLAYING' && !this._autotestDone) {
      this._autotestFrames += 1;
      if (this._autotestFrames >= 30) {
        this._writeAutotestReport();
        this._autotestDone = true;
      }
    }

    InputHandlerInstance.endFrame();
  }

  // ---- update -------------------------------------------------------------
  _update(dt) {
    if (this.player && InputHandlerInstance.consumeFire()) this._firePlayerBullet();

    this._moveAliens(dt);
    this._alienShoot(dt);
    this._updateUfo(dt);
    this._updateMarch(dt);

    if (!this.player && this.lives > 0) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) this._spawnPlayer(true);
    }

    for (const e of this.entities) e.update(dt);
    this.entities = this.entities.filter((e) => !e.dead);

    this._checkCollisions();
    this._checkGameConditions();
  }

  _moveAliens(dt) {
    const aliens = this.entities.filter((e) => e instanceof Alien && !e.dead);
    if (aliens.length === 0) return;
    const speed = alienSpeed(aliens.length, ALIEN_ROWS * ALIEN_COLS);
    const step = speed * (dt / 1000);
    const xs = aliens.map((a) => a.x);
    if (alienSweepHitsWall(xs, this.alienDirection, step, ALIEN_WIDTH, CANVAS_WIDTH)) {
      for (const a of aliens) a.y += ALIEN_SPEED_Y;
      this.alienDirection *= -1;
    } else {
      for (const a of aliens) a.x += step * this.alienDirection;
    }
  }

  _alienShoot(dt) {
    this.alienShootTimer -= dt;
    if (this.alienShootTimer > 0) return;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;
    const aliens = this.entities.filter((e) => e instanceof Alien && !e.dead);
    if (aliens.length === 0) return;
    // Lowest alien in a random non-empty column is the shooter.
    const byCol = new Map();
    for (const a of aliens) {
      const cur = byCol.get(a.col);
      if (!cur || a.row > cur.row) byCol.set(a.col, a);
    }
    const cols = Array.from(byCol.keys());
    const shooter = byCol.get(cols[Math.floor(Math.random() * cols.length)]);
    this.entities.push(
      new AlienBullet(
        shooter.x + shooter.width / 2 - PLAYER_BULLET_WIDTH / 2,
        shooter.y + shooter.height
      )
    );
  }

  _updateUfo(dt) {
    this.ufoTimer -= dt;
    if (this.ufoTimer <= 0) {
      this.ufoTimer = randomUfoInterval();
      if (!this.ufo) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const x = dir === 1 ? -UFO_WIDTH : CANVAS_WIDTH;
        this.ufo = new UFO(x, UFO_Y, dir, randomUfoScore());
        this.entities.push(this.ufo);
        AudioManagerInstance.ufoStart();
      }
    }
    if (this.ufo && !this.ufo.dead) {
      const offRight = this.ufo.direction === 1 && this.ufo.x > CANVAS_WIDTH;
      const offLeft = this.ufo.direction === -1 && this.ufo.x + UFO_WIDTH < 0;
      if (offRight || offLeft) {
        this.ufo.dead = true;
        this.ufo = null;
        AudioManagerInstance.ufoStop();
      }
    }
  }

  _updateMarch(dt) {
    const aliens = this.entities.filter((e) => e instanceof Alien && !e.dead);
    if (aliens.length === 0) return;
    const interval = marchInterval(aliens.length, ALIEN_ROWS * ALIEN_COLS);
    this.marchTimer -= dt;
    if (this.marchTimer <= 0) {
      this.marchTimer = interval;
      AudioManagerInstance.march(this.marchStep);
      this.marchStep = (this.marchStep + 1) % 4;
    }
  }

  _firePlayerBullet() {
    if (!this.player) return;
    if (this.entities.some((e) => e instanceof Bullet)) return; // one at a time
    this.entities.push(
      new Bullet(
        this.player.x + this.player.width / 2 - PLAYER_BULLET_WIDTH / 2,
        this.player.y - PLAYER_BULLET_HEIGHT
      )
    );
    AudioManagerInstance.shoot();
  }

  _spawnExplosion(x, y) {
    this.entities.push(new Explosion(x, y));
  }

  _killPlayer() {
    if (!this.player) return;
    this._spawnExplosion(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2
    );
    AudioManagerInstance.playerDeath();
    this.player.dead = true;
    this.player = null;
    this.lives -= 1;
    if (this.lives > 0) this.respawnTimer = RESPAWN_DELAY;
  }

  // ---- collisions ---------------------------------------------------------
  _checkCollisions() {
    const bullets = this.entities.filter((e) => e instanceof Bullet);
    const alienBullets = this.entities.filter((e) => e instanceof AlienBullet);
    const aliens = this.entities.filter((e) => e instanceof Alien);
    const shields = this.entities.filter((e) => e instanceof Shield);

    for (const b of bullets) {
      if (b.dead) continue;
      for (const a of aliens) {
        if (a.dead) continue;
        if (overlaps(b, a)) {
          b.dead = true;
          a.dead = true;
          this.score += scoreForRow(a.row);
          this._spawnExplosion(a.x + a.width / 2, a.y + a.height / 2);
          AudioManagerInstance.alienDeath();
          break;
        }
      }
      if (b.dead) continue;
      if (this.ufo && !this.ufo.dead && overlaps(b, this.ufo)) {
        b.dead = true;
        this.score += this.ufo.score;
        this._spawnExplosion(this.ufo.x + this.ufo.width / 2, this.ufo.y + this.ufo.height / 2);
        AudioManagerInstance.ufoDeath();
        AudioManagerInstance.ufoStop();
        this.ufo.dead = true;
        this.ufo = null;
        continue;
      }
      for (const s of shields) {
        if (s.hitTest(b.x, b.y, b.width, b.height)) {
          b.dead = true;
          break;
        }
      }
    }

    for (const ab of alienBullets) {
      if (ab.dead) continue;
      for (const s of shields) {
        if (s.hitTest(ab.x, ab.y, ab.width, ab.height)) {
          ab.dead = true;
          break;
        }
      }
      if (ab.dead) continue;
      if (this.player && !this.player.invulnerable && overlaps(ab, this.player)) {
        ab.dead = true;
        this._killPlayer();
      }
    }

    // Alien descent erosion: erase shield blocks the swarm touches.
    for (const a of aliens) {
      if (a.dead) continue;
      for (const s of shields) {
        if (overlaps(a, s)) s.eraseOverlap(a.x, a.y, a.width, a.height);
      }
    }
  }

  // ---- conditions & state transitions -------------------------------------
  _checkGameConditions() {
    for (const e of this.entities) {
      if (e instanceof Alien && !e.dead && hasReachedGround(e.y, e.height, GROUND_Y)) {
        this._endGame();
        return;
      }
    }
    if (this.lives <= 0 && !this.player) {
      this._endGame();
      return;
    }
    const aliens = this.entities.filter((e) => e instanceof Alien && !e.dead);
    if (aliens.length === 0) {
      this.wave += 1;
      this.state = 'WAVE_TRANSITION';
      this.waveTransitionTimer = WAVE_TRANSITION_DURATION;
    }
  }

  _startNextWave() {
    AudioManagerInstance.ufoStop();
    this.entities = this.entities.filter(
      (e) =>
        !(e instanceof Alien || e instanceof Bullet || e instanceof AlienBullet ||
          e instanceof Explosion || e instanceof UFO)
    );
    this.ufo = null;
    this.alienDirection = 1;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;
    this.ufoTimer = randomUfoInterval();
    this._spawnAliens();
    this.state = 'PLAYING';
  }

  _endGame() {
    AudioManagerInstance.ufoStop();
    this.newHiScore = this.score > this.hiScore;
    if (this.newHiScore) {
      this.hiScore = this.score;
      this._saveHiScore();
    }
    this.state = 'GAMEOVER';
  }

  // ---- input --------------------------------------------------------------
  _restartButtonRect() {
    return { x: 300, y: 420, w: 200, h: 50 };
  }

  _onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    AudioManagerInstance._unlock();
    if (this.state === 'START') {
      this.start();
      return;
    }
    if (this.state === 'GAMEOVER') {
      const b = this._restartButtonRect();
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) this.restart();
    }
  }

  // ---- draw ---------------------------------------------------------------
  _draw() {
    const ctx = this.ctx;
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = FLOOR_COLOR;
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, FLOOR_HEIGHT);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);

    for (const e of this.entities) e.draw(ctx);

    this._drawHud(ctx);

    if (this.state === 'START') this._drawStartOverlay(ctx);
    else if (this.state === 'WAVE_TRANSITION') this._drawWaveOverlay(ctx);
    else if (this.state === 'GAMEOVER') this._drawGameOverOverlay(ctx);
  }

  _drawHud(ctx) {
    ctx.fillStyle = '#00ff00';
    ctx.font = '20px monospace';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE ' + String(this.score).padStart(4, '0'), 20, 16);
    ctx.textAlign = 'center';
    ctx.fillText('HI-SCORE ' + String(this.hiScore).padStart(4, '0'), CANVAS_WIDTH / 2, 16);
    ctx.textAlign = 'right';
    ctx.fillText('WAVE ' + this.wave, CANVAS_WIDTH - 20, 16);
    ctx.textAlign = 'left';
    for (let i = 0; i < this.lives; i++) {
      drawSprite(ctx, 16 + i * 44, CANVAS_HEIGHT - 30, 39, 24, PLAYER_SPRITE, '#00ff00');
    }
  }

  _dim(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.62)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  _drawStartOverlay(ctx) {
    this._dim(ctx);
    ctx.fillStyle = '#00ff00';
    ctx.font = '48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, 280);
    ctx.font = '20px monospace';
    ctx.fillText('PRESS SPACE OR ENTER TO START', CANVAS_WIDTH / 2, 340);
  }

  _drawWaveOverlay(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('WAVE ' + this.wave, CANVAS_WIDTH / 2, 280);
  }

  _drawGameOverOverlay(ctx) {
    this._dim(ctx);
    ctx.fillStyle = '#ff0000';
    ctx.font = '48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 240);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px monospace';
    ctx.fillText('SCORE ' + this.score, CANVAS_WIDTH / 2, 292);
    if (this.newHiScore) {
      ctx.fillStyle = '#00ff00';
      ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, 330);
    }
    const b = this._restartButtonRect();
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = '#000000';
    ctx.font = '24px monospace';
    ctx.fillText('RESTART', b.x + b.w / 2, b.y + b.h / 2);
  }

  // ---- autotest -----------------------------------------------------------
  _autotestData() {
    const img = this.ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
    const sample = (x, y) => {
      const xi = Math.max(0, Math.min(CANVAS_WIDTH - 1, Math.round(x)));
      const yi = Math.max(0, Math.min(CANVAS_HEIGHT - 1, Math.round(y)));
      const i = (yi * CANVAS_WIDTH + xi) * 4;
      return [img[i], img[i + 1], img[i + 2], img[i + 3]];
    };
    const rect = (e) => ({ x: Math.round(e.x), y: Math.round(e.y), w: e.width, h: e.height });
    const shields = this.entities.filter((e) => e instanceof Shield);
    const aliens = this.entities.filter((e) => e instanceof Alien);
    const first = aliens[0];
    const player = this.player;
    return {
      state: this.state,
      wave: this.wave,
      lives: this.lives,
      score: this.score,
      alienCount: aliens.length,
      groundY: GROUND_Y,
      player: player ? rect(player) : null,
      playerBottom: player ? Math.round(player.y + player.height) : null,
      shields: shields.map(rect),
      shield0Block00: shields[0] ? sample(shields[0].x + 3, shields[0].y + 3) : null,
      firstAlien: first ? rect(first) : null,
      alienSample: first ? sample(first.x + 3, first.y + 4 * 3 + 1) : null,
      floorSample: sample(400, GROUND_Y + FLOOR_HEIGHT / 2),
      playerSample: player ? sample(player.x + player.width / 2, player.y + 4 * 3 + 1) : null,
      backgroundSample: sample(5, 5),
    };
  }

  _writeAutotestReport() {
    try {
      const el = document.createElement('pre');
      el.id = 'autotest-report';
      el.textContent = JSON.stringify(this._autotestData());
      document.body.appendChild(el);
    } catch (e) {
      /* ignore */
    }
  }
}
