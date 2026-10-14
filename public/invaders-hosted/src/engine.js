import * as C from './constants.js';
import { PLAYER_SPRITE, drawSprite } from './sprites.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { overlaps } from './entities/entity.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { Ufo } from './entities/ufo.js';

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'START';

    this.entities = [];
    this.player = null;
    this.score = 0;
    this.hiScore = Number(localStorage.getItem('spaceInvadersHiScore') || 0);
    this.wave = 1;
    this.lives = C.LIVES;

    this.elapsed = 0;
    this.lastTime = 0;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.marchTimer = 0;
    this.ufo = null;
    this.ufoTimer = this._randomUfoInterval();
    this.respawnAt = null;
    this.invulnUntil = 0;
    this.waveTransitionUntil = 0;

    this._resetAll();
    this._showStartOverlay();

    // Unlock audio on the first user gesture.
    const unlock = () => audio.unlock();
    window.addEventListener('keydown', unlock);
    window.addEventListener('pointerdown', unlock);

    document.getElementById('start-overlay').addEventListener('click', () => this.start());
    document.getElementById('restart-button').addEventListener('click', () => this.start());

    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  // --- Lifecycle --------------------------------------------------------

  start() {
    this._resetAll();
    this.state = 'PLAYING';
    this._hideOverlays();
    audio.unlock();
  }

  _resetAll() {
    this.entities = [];
    this.score = 0;
    this.wave = 1;
    this.lives = C.LIVES;
    this.elapsed = 0;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.marchTimer = 0;
    this.respawnAt = null;
    this.invulnUntil = 0;
    this._createShields();
    this._createPlayer();
    this._spawnAliens();
    this._stopUfo();
    this.ufo = null;
    this.ufoTimer = this._randomUfoInterval();
  }

  // --- Setup helpers ----------------------------------------------------

  _createShields() {
    const margin =
      (C.CANVAS_WIDTH - C.SHIELD_COUNT * C.SHIELD_WIDTH) / (C.SHIELD_COUNT + 1);
    for (let i = 0; i < C.SHIELD_COUNT; i++) {
      const x = Math.round(margin + i * (C.SHIELD_WIDTH + margin));
      this.entities.push(new Shield(x, C.SHIELD_Y));
    }
  }

  _createPlayer() {
    this.player = new Player(C.PLAYER_START_X, C.PLAYER_Y);
    this.entities.push(this.player);
  }

  _spawnAliens() {
    const waveYOffset =
      Math.min(this.wave - 1, C.MAX_WAVE_DESCENT) * C.ALIEN_ROW_HEIGHT;
    for (let r = 0; r < C.ALIEN_ROWS; r++) {
      for (let c = 0; c < C.ALIEN_COLS; c++) {
        const x = C.ALIEN_START_X + c * (C.ALIEN_WIDTH + C.ALIEN_COL_GAP);
        const y = C.ALIEN_START_Y + waveYOffset + r * C.ALIEN_ROW_HEIGHT;
        this.entities.push(new Alien(x, y, r, c));
      }
    }
  }

  _clearVolatile() {
    this.entities = this.entities.filter(
      (e) => e instanceof Shield || e === this.player
    );
  }

  // --- Main loop --------------------------------------------------------

  _loop(timestamp) {
    if (this.lastTime === 0) this.lastTime = timestamp;
    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (dt > 100) dt = 100; // clamp long tab-switch gaps

    if (this.state === 'START') {
      this.draw();
      if (input.consumeFire()) this.start();
    } else if (this.state === 'PLAYING') {
      this.elapsed += dt;
      this.update(dt);
      this.draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this.elapsed += dt;
      if (this.elapsed >= this.waveTransitionUntil) this._startNextWave();
      this.draw();
    } else if (this.state === 'GAMEOVER') {
      this.draw();
    }

    input.endFrame();
    requestAnimationFrame(this._loop);
  }

  update(dt) {
    // 1. Move every entity (aliens are moved as a group below; their update is a no-op).
    for (const e of this.entities) e.update(dt);

    // A UFO that flew off-screen must stop its loop and free the slot.
    if (this.ufo && this.ufo.dead) this._stopUfo();

    // 2. Player fire (one bullet at a time, edge-triggered so the start press
    //    does not also fire).
    if (input.consumeFire()) this._firePlayerBullet();

    // 3. Move the alien swarm.
    this._moveAliens(dt);

    // 4. Timers: alien shots, march beat, UFO, respawn.
    this._updateTimers(dt);

    // 5. Collisions.
    this._checkCollisions();

    // 6. Drop dead entities.
    this.entities = this.entities.filter((e) => !e.dead);

    // 7. Win / lose conditions.
    this._checkGameConditions();
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, C.CANVAS_WIDTH, C.CANVAS_HEIGHT);

    // Ground line.
    ctx.fillStyle = '#4dff4d';
    ctx.fillRect(0, C.GROUND_Y, C.CANVAS_WIDTH, 2);

    // Entities (shields are pushed first, so they render underneath).
    for (const e of this.entities) {
      if (
        e === this.player &&
        this.elapsed < this.invulnUntil &&
        Math.floor(this.elapsed / 120) % 2 === 0
      ) {
        continue; // invulnerability blink
      }
      e.draw(ctx);
    }

    this._drawHud(ctx);
  }

  // --- Movement ---------------------------------------------------------

  _moveAliens(dt) {
    const aliens = this.entities.filter((e) => e instanceof Alien);
    if (aliens.length === 0) return;
    const total = C.ALIEN_ROWS * C.ALIEN_COLS;
    // px per 60 fps frame, scaled by sqrt(total/alive), capped.
    const speedFrames = Math.min(
      C.ALIEN_SPEED_X_MAX,
      C.ALIEN_SPEED_X * Math.sqrt(total / aliens.length)
    );
    const speed = speedFrames * (1000 / C.FRAME_MS); // px/s
    const dx = speed * (dt / 1000) * this.alienDirection;

    let hitWall = false;
    if (this.alienDirection > 0) {
      const rightmost = Math.max(...aliens.map((a) => a.x + a.w));
      if (rightmost + dx > C.CANVAS_WIDTH) hitWall = true;
    } else {
      const leftmost = Math.min(...aliens.map((a) => a.x));
      if (leftmost + dx < 0) hitWall = true;
    }

    if (hitWall) {
      for (const a of aliens) a.y += C.ALIEN_SPEED_Y;
      this.alienDirection *= -1;
    } else {
      for (const a of aliens) a.x += dx;
    }
  }

  _firePlayerBullet() {
    if (!this.player) return;
    if (this.entities.some((e) => e instanceof Bullet)) return; // one at a time
    const x = this.player.x + this.player.w / 2 - C.BULLET_WIDTH / 2;
    this.entities.push(new Bullet(x, this.player.y - C.BULLET_HEIGHT));
    audio.shoot();
  }

  // --- Timers -----------------------------------------------------------

  _updateTimers(dt) {
    // Alien shots.
    this.alienShootTimer += dt;
    if (this.alienShootTimer >= C.ALIEN_SHOOT_INTERVAL) {
      this.alienShootTimer = 0;
      this._alienShoot();
    }

    // March beat, tempo scales with remaining aliens.
    const alive = this.entities.filter((e) => e instanceof Alien).length;
    if (alive > 0) {
      this.marchTimer += dt;
      const interval = Math.max(100, 800 * (alive / (C.ALIEN_ROWS * C.ALIEN_COLS)));
      if (this.marchTimer >= interval) {
        this.marchTimer = 0;
        audio.march();
      }
    }

    // UFO spawning.
    if (!this.ufo) {
      this.ufoTimer -= dt;
      if (this.ufoTimer <= 0) {
        this._spawnUfo();
        this.ufoTimer = this._randomUfoInterval();
      }
    }

    // Player respawn.
    if (
      !this.player &&
      this.lives > 0 &&
      this.respawnAt !== null &&
      this.elapsed >= this.respawnAt
    ) {
      this.respawnAt = null;
      this.invulnUntil = this.elapsed + C.INVULNERABLE_DURATION;
      this._createPlayer();
    }
  }

  _alienShoot() {
    const aliens = this.entities.filter((e) => e instanceof Alien);
    if (aliens.length === 0) return;
    // Pick a random column that still has aliens; shoot from its bottom-most alien.
    const columns = [];
    for (let c = 0; c < C.ALIEN_COLS; c++) {
      const colAliens = aliens.filter((a) => a.col === c);
      if (colAliens.length) columns.push(colAliens);
    }
    const col = columns[Math.floor(Math.random() * columns.length)];
    const shooter = col.reduce((a, b) => (a.y > b.y ? a : b));
    const x = shooter.x + C.ALIEN_WIDTH / 2 - C.ALIEN_BULLET_WIDTH / 2;
    this.entities.push(new AlienBullet(x, shooter.y + C.ALIEN_HEIGHT));
  }

  _randomUfoInterval() {
    return C.UFO_MIN_INTERVAL + Math.random() * (C.UFO_MAX_INTERVAL - C.UFO_MIN_INTERVAL);
  }

  _spawnUfo() {
    const fromLeft = Math.random() < 0.5;
    const x = fromLeft ? -C.UFO_WIDTH : C.CANVAS_WIDTH;
    const dir = fromLeft ? 1 : -1;
    this.ufo = new Ufo(x, C.UFO_Y, dir);
    this.entities.push(this.ufo);
    audio.ufoStart();
  }

  _stopUfo() {
    audio.ufoStop();
    this.ufo = null;
  }

  // --- Collisions -------------------------------------------------------

  _checkCollisions() {
    const aliens = this.entities.filter((e) => e instanceof Alien);
    const shields = this.entities.filter((e) => e instanceof Shield);
    const bullets = this.entities.filter((e) => e instanceof Bullet);
    const alienBullets = this.entities.filter((e) => e instanceof AlienBullet);

    // Player bullet vs aliens / UFO / shields.
    for (const b of bullets) {
      if (b.dead) continue;
      for (const a of aliens) {
        if (!a.dead && overlaps(b, a)) {
          b.dead = true;
          a.dead = true;
          this.score += C.ALIEN_SCORE[a.row];
          this._explode(a.x + a.w / 2, a.y + a.h / 2, '#ffd24d');
          audio.alienDeath();
          break;
        }
      }
      if (b.dead) continue;
      if (this.ufo && !this.ufo.dead && overlaps(b, this.ufo)) {
        b.dead = true;
        this.ufo.dead = true;
        this.score += this.ufo.bonus;
        this._explode(this.ufo.x + this.ufo.w / 2, this.ufo.y + this.ufo.h / 2, '#ff4d4d');
        audio.ufoDeath();
        this._stopUfo();
        continue;
      }
      for (const s of shields) {
        if (s.hitTest(b.x, b.y, b.w, b.h)) {
          b.dead = true;
          break;
        }
      }
    }

    // Alien bullet vs player / shields.
    for (const b of alienBullets) {
      if (b.dead) continue;
      if (
        this.player &&
        !this.player.dead &&
        this.elapsed >= this.invulnUntil &&
        overlaps(b, this.player)
      ) {
        b.dead = true;
        this._playerHit();
        continue;
      }
      for (const s of shields) {
        if (s.hitTest(b.x, b.y, b.w, b.h)) {
          b.dead = true;
          break;
        }
      }
    }

    // Aliens physically erode shields as they descend into them.
    for (const a of aliens) {
      for (const s of shields) {
        if (overlaps(a, s)) s.eraseOverlap(a.x, a.y, a.w, a.h);
      }
    }
  }

  _explode(x, y, color) {
    this.entities.push(new Explosion(x, y, color));
  }

  _playerHit() {
    this.lives--;
    this._explode(
      this.player.x + this.player.w / 2,
      this.player.y + this.player.h / 2,
      '#4dff4d'
    );
    audio.playerDeath();
    this.player.dead = true;
    this.player = null;
    if (this.lives <= 0) {
      this._endGame();
    } else {
      this.respawnAt = this.elapsed + C.RESPAWN_DELAY;
    }
  }

  // --- Game conditions --------------------------------------------------

  _checkGameConditions() {
    const aliens = this.entities.filter((e) => e instanceof Alien);

    // An alien reaching the ground line ends the game immediately.
    for (const a of aliens) {
      if (a.y + a.h >= C.GROUND_Y) {
        this._endGame();
        return;
      }
    }

    // All aliens cleared → wave transition.
    if (aliens.length === 0) {
      this.state = 'WAVE_TRANSITION';
      this.waveTransitionUntil = this.elapsed + C.WAVE_TRANSITION_DURATION;
      this._showWaveOverlay(this.wave + 1);
      this._stopUfo();
    }
  }

  _startNextWave() {
    this.wave++;
    this._clearVolatile();
    this._spawnAliens();
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = this._randomUfoInterval(); // re-randomised per wave
    this._hideOverlays();
    this.state = 'PLAYING';
  }

  _endGame() {
    this.state = 'GAMEOVER';
    let newHi = false;
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      localStorage.setItem('spaceInvadersHiScore', String(this.hiScore));
      newHi = true;
    }
    this._stopUfo();
    this._showGameOverOverlay(this.score, newHi);
  }

  // --- HUD & overlays ---------------------------------------------------

  _drawHud(ctx) {
    ctx.fillStyle = '#4dff4d';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE ' + String(this.score).padStart(4, '0'), 16, 12);
    ctx.textAlign = 'center';
    ctx.fillText(
      'HI-SCORE ' + String(this.hiScore).padStart(4, '0'),
      C.CANVAS_WIDTH / 2,
      12
    );
    ctx.textAlign = 'right';
    ctx.fillText('WAVE ' + this.wave, C.CANVAS_WIDTH - 16, 12);
    ctx.textAlign = 'left';

    // Lives as mini cannons in the floor strip, below the ground line.
    for (let i = 0; i < this.lives; i++) {
      drawSprite(ctx, 16 + i * 30, C.GROUND_Y + 8, 26, 16, PLAYER_SPRITE, '#4dff4d', 2);
    }
  }

  _showStartOverlay() {
    document.getElementById('start-overlay').classList.remove('hidden');
    document.getElementById('wave-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
  }

  _showWaveOverlay(n) {
    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('wave-overlay').classList.remove('hidden');
    document.getElementById('wave-text').textContent = 'WAVE ' + n;
    document.getElementById('gameover-overlay').classList.add('hidden');
  }

  _showGameOverOverlay(score, newHi) {
    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('wave-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.remove('hidden');
    document.getElementById('final-score').textContent =
      'SCORE ' + String(score).padStart(4, '0');
    const newHiEl = document.getElementById('new-hiscore');
    newHiEl.classList.toggle('hidden', !newHi);
  }

  _hideOverlays() {
    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('wave-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
  }
}

// Boot in the browser (guarded so the class is importable in Node for checks).
if (typeof document !== 'undefined') {
  const canvas = document.getElementById('game');
  window.game = new GameEngine(canvas);
}
