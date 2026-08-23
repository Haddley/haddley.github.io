// ---------------------------------------------------------------------------
// engine.js — GameEngine class + entry point.
//
// Owns the game-loop, the flat entity list, the alien swarm logic, collision
// resolution, wave progression, HUD and all overlays.
// ---------------------------------------------------------------------------

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ALIEN_ROWS,
  ALIEN_COLS,
  ALIEN_WIDTH,
  ALIEN_COL_SPACING,
  ALIEN_ROW_SPACING,
  ALIEN_START_Y,
  ALIEN_SPEED_X,
  ALIEN_MAX_SPEED,
  ALIEN_SPEED_Y,
  ALIEN_SHOOT_INTERVAL,
  MAX_WAVE_DESCENT,
  SCORE_SQUID,
  SCORE_CRAB,
  SCORE_OCTOPUS,
  PLAYER_WIDTH,
  BULLET_WIDTH,
  BULLET_HEIGHT,
  ALIEN_BULLET_WIDTH,
  SHIELD_COUNT,
  SHIELD_WIDTH,
  SHIELD_Y,
  UFO_WIDTH,
  UFO_Y,
  UFO_MIN_INTERVAL,
  UFO_MAX_INTERVAL,
  WAVE_TRANSITION_DURATION,
  GROUND_LINE,
  HI_SCORE_KEY,
  MARCH_MIN_INTERVAL,
  MARCH_BASE_INTERVAL,
  HUD_FONT,
  TITLE_FONT,
  OVERLAY_FONT,
  SMALL_FONT,
  COLORS,
} from './constants.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { drawSprite, SPRITES } from './sprites.js';
import { overlaps } from './entities/entity.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { PlayerBullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { Ufo } from './entities/ufo.js';

const TOTAL_ALIENS = ALIEN_ROWS * ALIEN_COLS;
const rand = (min, max) => min + Math.random() * (max - min);

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.state = 'START'; // START | PLAYING | WAVE_TRANSITION | GAMEOVER
    this.entities = [];
    this.player = new Player();

    this.score = 0;
    this.hiScore = this._loadHiScore();
    this.sessionStartHi = this.hiScore;
    this.wave = 0;

    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.marchTimer = 0;
    this.marchStep = 0;
    this.ufoTimer = 0;
    this.ufoInterval = rand(UFO_MIN_INTERVAL, UFO_MAX_INTERVAL);
    this.ufoLoopPlaying = false;
    this.waveTimer = 0;
    this.gameOverNewHi = false;
    this.restartRect = null;
    this.lastTime = 0;

    this._initStars();

    // Unlock audio on the first interaction.
    input.onAnyKey = () => audio.unlock();
    canvas.addEventListener('click', (e) => this._onCanvasClick(e));

    this.mainLoop = this.mainLoop.bind(this);
    requestAnimationFrame(this.mainLoop);
  }

  // ------------------------------------------------------------------ flow

  start() {
    audio.stopUfo();
    this.ufoLoopPlaying = false;
    this.score = 0;
    this.wave = 0;
    this.alienDirection = 1;
    this.entities = [];
    this.player = new Player();
    this.sessionStartHi = this.hiScore;
    this._spawnShields();
    this.state = 'PLAYING';
    this._startNextWave();
    input.clearFire();
  }

  restart() {
    this.start();
  }

  endGame() {
    if (this.state === 'GAMEOVER') return;
    audio.stopUfo();
    this.ufoLoopPlaying = false;
    this.state = 'GAMEOVER';
    this.gameOverNewHi = this.score > this.sessionStartHi;
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      this._saveHiScore();
    }
  }

  // ------------------------------------------------------------- main loop

  mainLoop(timestamp) {
    if (this.lastTime === 0) this.lastTime = timestamp;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    if (this.state === 'START') {
      if (input.consumeStart()) this.start();
    } else if (this.state === 'GAMEOVER') {
      if (input.consumeStart()) this.restart();
    } else if (this.state === 'WAVE_TRANSITION') {
      this.waveTimer -= dt * 1000;
      if (this.waveTimer <= 0) {
        this._startNextWave();
        this.state = 'PLAYING';
      }
    }

    if (this.state === 'PLAYING') this.update(dt);
    this.draw();

    requestAnimationFrame(this.mainLoop);
  }

  update(dt) {
    this.player.update(dt);
    for (const e of this.entities) e.update(dt);

    this._updateAlienGroup(dt);
    this._updateMarch(dt);
    this._updateAlienShooting(dt);
    this._updateUfo(dt);
    this._handlePlayerFire();
    this._checkCollisions();
    this._checkGameConditions();

    this.entities = this.entities.filter((e) => !e.dead);

    // Live hi-score tracking.
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      this._saveHiScore();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this._drawStars(ctx);
    this._drawHUD(ctx);
    for (const e of this.entities) e.draw(ctx);
    this.player.draw(ctx);

    if (this.state === 'START') this._drawStartOverlay(ctx);
    else if (this.state === 'WAVE_TRANSITION') this._drawWaveOverlay(ctx);
    else if (this.state === 'GAMEOVER') this._drawGameOverOverlay(ctx);
  }

  // ------------------------------------------------------------- spawning

  _spawnShields() {
    const gap = (CANVAS_WIDTH - SHIELD_COUNT * SHIELD_WIDTH) / (SHIELD_COUNT + 1);
    for (let i = 0; i < SHIELD_COUNT; i++) {
      this.entities.push(new Shield(gap + i * (SHIELD_WIDTH + gap), SHIELD_Y));
    }
  }

  _startNextWave() {
    this.wave += 1;
    // Aliens, bullets and UFOs reset; shields and the player persist.
    this.entities = this.entities.filter(
      (e) =>
        !(e instanceof Alien || e instanceof PlayerBullet || e instanceof AlienBullet || e instanceof Ufo)
    );
    const descent = Math.min(this.wave - 1, MAX_WAVE_DESCENT) * ALIEN_ROW_SPACING;
    this._spawnFormation(descent);
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.marchTimer = 0;
    this.marchStep = 0;
    this.ufoTimer = 0;
    this.ufoInterval = rand(UFO_MIN_INTERVAL, UFO_MAX_INTERVAL);
  }

  _spawnFormation(yOffset) {
    const gridWidth = (ALIEN_COLS - 1) * ALIEN_COL_SPACING + ALIEN_WIDTH;
    const startX = (CANVAS_WIDTH - gridWidth) / 2;
    const startY = ALIEN_START_Y + yOffset;
    for (let row = 0; row < ALIEN_ROWS; row++) {
      let type;
      let score;
      if (row < 2) {
        type = 'squid';
        score = SCORE_SQUID;
      } else if (row < 4) {
        type = 'crab';
        score = SCORE_CRAB;
      } else {
        type = 'octopus';
        score = SCORE_OCTOPUS;
      }
      for (let col = 0; col < ALIEN_COLS; col++) {
        this.entities.push(
          new Alien(startX + col * ALIEN_COL_SPACING, startY + row * ALIEN_ROW_SPACING, col, type, score)
        );
      }
    }
  }

  // ------------------------------------------------------- swarm behaviour

  _aliveAliens() {
    return this.entities.filter((e) => e instanceof Alien && !e.dead);
  }

  _updateAlienGroup(dt) {
    const aliens = this._aliveAliens();
    if (aliens.length === 0) return;

    // Speed scales with how thinned-out the swarm is.
    const speed = Math.min(ALIEN_MAX_SPEED, ALIEN_SPEED_X * Math.sqrt(TOTAL_ALIENS / aliens.length));

    let wallHit = false;
    for (const a of aliens) {
      const nx = a.x + speed * this.alienDirection * dt;
      if (nx < 0 || nx + a.width > CANVAS_WIDTH) {
        wallHit = true;
        break;
      }
    }

    if (wallHit) {
      this.alienDirection *= -1;
      for (const a of aliens) a.y += ALIEN_SPEED_Y;
    } else {
      for (const a of aliens) a.x += speed * this.alienDirection * dt;
    }
  }

  _updateMarch(dt) {
    const aliens = this._aliveAliens();
    if (aliens.length === 0) return;
    this.marchTimer += dt * 1000;
    const interval = Math.max(MARCH_MIN_INTERVAL, (MARCH_BASE_INTERVAL * aliens.length) / TOTAL_ALIENS);
    if (this.marchTimer >= interval) {
      this.marchTimer = 0;
      audio.playMarch(this.marchStep);
      this.marchStep = (this.marchStep + 1) % 4;
    }
  }

  _updateAlienShooting(dt) {
    this.alienShootTimer += dt * 1000;
    if (this.alienShootTimer < ALIEN_SHOOT_INTERVAL) return;
    this.alienShootTimer = 0;

    const aliens = this._aliveAliens();
    if (aliens.length === 0) return;

    // Pick a random column, then fire from its bottom-most survivor.
    const byCol = new Map();
    for (const a of aliens) {
      if (!byCol.has(a.col)) byCol.set(a.col, []);
      byCol.get(a.col).push(a);
    }
    const cols = [...byCol.keys()];
    const col = cols[Math.floor(Math.random() * cols.length)];
    const shooters = byCol.get(col);
    let shooter = shooters[0];
    for (const s of shooters) if (s.y > shooter.y) shooter = s;

    this.entities.push(
      new AlienBullet(shooter.x + shooter.width / 2 - ALIEN_BULLET_WIDTH / 2, shooter.y + shooter.height)
    );
  }

  // --------------------------------------------------------------- UFO

  _updateUfo(dt) {
    const ufoAlive = this.entities.some((e) => e instanceof Ufo && !e.dead);
    if (ufoAlive) return;
    if (this.ufoLoopPlaying) {
      audio.stopUfo();
      this.ufoLoopPlaying = false;
    }
    this.ufoTimer += dt * 1000;
    if (this.ufoTimer >= this.ufoInterval) {
      this.ufoTimer = 0;
      this.ufoInterval = rand(UFO_MIN_INTERVAL, UFO_MAX_INTERVAL);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const x = dir === 1 ? -UFO_WIDTH : CANVAS_WIDTH;
      this.entities.push(new Ufo(x, UFO_Y, dir));
      this.ufoLoopPlaying = true;
    }
  }

  // -------------------------------------------------------------- combat

  _handlePlayerFire() {
    if (!input.fireHeld) return;
    if (this.player.state !== 'ALIVE') return;
    // Only one player bullet in flight at a time.
    if (this.entities.some((e) => e instanceof PlayerBullet && !e.dead)) return;
    this.entities.push(
      new PlayerBullet(this.player.x + this.player.width / 2 - BULLET_WIDTH / 2, this.player.y - BULLET_HEIGHT)
    );
    audio.playShoot();
  }

  _playerHit() {
    audio.playPlayerDeath();
    this._spawnExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
    const gameOver = this.player.hit();
    if (gameOver) this.endGame();
  }

  _spawnExplosion(cx, cy) {
    this.entities.push(new Explosion(cx, cy));
  }

  _checkCollisions() {
    const aliens = this._aliveAliens();
    const shields = this.entities.filter((e) => e instanceof Shield);
    const ufos = this.entities.filter((e) => e instanceof Ufo && !e.dead);
    const bullets = this.entities.filter((e) => e instanceof PlayerBullet && !e.dead);
    const alienBullets = this.entities.filter((e) => e instanceof AlienBullet && !e.dead);

    // Player bullet vs aliens / UFO / shields
    for (const b of bullets) {
      for (const a of aliens) {
        if (overlaps(b, a)) {
          b.dead = true;
          a.dead = true;
          this.score += a.score;
          audio.playAlienDeath();
          this._spawnExplosion(a.x + a.width / 2, a.y + a.height / 2);
          break;
        }
      }
      if (b.dead) continue;
      for (const u of ufos) {
        if (overlaps(b, u)) {
          b.dead = true;
          u.dead = true;
          this.score += u.score;
          audio.playUfoDeath();
          this._spawnExplosion(u.x + u.width / 2, u.y + u.height / 2);
          break;
        }
      }
      if (b.dead) continue;
      for (const s of shields) {
        if (overlaps(b, s) && s.hitTest(b.x, b.y, b.width, b.height)) {
          b.dead = true;
          break;
        }
      }
    }

    // Alien bullet vs shields / player
    for (const ab of alienBullets) {
      for (const s of shields) {
        if (overlaps(ab, s) && s.hitTest(ab.x, ab.y, ab.width, ab.height)) {
          ab.dead = true;
          break;
        }
      }
      if (ab.dead) continue;
      if (
        this.player.state === 'ALIVE' &&
        !this.player.invulnerable &&
        overlaps(ab, this.player)
      ) {
        ab.dead = true;
        this._playerHit();
      }
    }

    // Alien descent erodes shields they physically touch.
    for (const a of aliens) {
      for (const s of shields) {
        if (overlaps(a, s)) s.eraseOverlap(a.x, a.y, a.width, a.height);
      }
    }
  }

  _checkGameConditions() {
    const aliens = this._aliveAliens();
    if (aliens.length === 0) {
      this.state = 'WAVE_TRANSITION';
      this.waveTimer = WAVE_TRANSITION_DURATION;
      return;
    }
    for (const a of aliens) {
      if (a.y + a.height >= GROUND_LINE) {
        this.endGame();
        return;
      }
    }
  }

  // ---------------------------------------------------------------- HUD

  _drawHUD(ctx) {
    ctx.textBaseline = 'top';
    ctx.fillStyle = COLORS.hud;
    ctx.font = HUD_FONT;

    ctx.textAlign = 'left';
    ctx.fillText(`SCORE ${String(this.score).padStart(4, '0')}`, 16, 12);

    ctx.textAlign = 'center';
    ctx.fillText(`HI ${String(this.hiScore).padStart(4, '0')}`, CANVAS_WIDTH / 2, 12);

    ctx.textAlign = 'right';
    ctx.fillText(`WAVE ${this.state === 'START' ? 1 : this.wave}`, CANVAS_WIDTH - 16, 12);

    // Lives as mini cannons, bottom-left.
    ctx.textAlign = 'left';
    ctx.font = SMALL_FONT;
    ctx.fillText('LIVES', 16, CANVAS_HEIGHT - 32);
    for (let i = 0; i < this.player.lives; i++) {
      drawSprite(ctx, 96 + i * 30, CANVAS_HEIGHT - 34, 22, 14, SPRITES.miniCannon, COLORS.player, 2);
    }
  }

  _drawStartOverlay(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = COLORS.hud;
    ctx.font = TITLE_FONT;
    ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, 110);

    const legend = [
      { sprite: SPRITES.squid[0], color: COLORS.squid, label: '= 30 PTS' },
      { sprite: SPRITES.crab[0], color: COLORS.crab, label: '= 20 PTS' },
      { sprite: SPRITES.octopus[0], color: COLORS.octopus, label: '= 10 PTS' },
      { sprite: SPRITES.ufo[0], color: COLORS.ufo, label: '= ? PTS' },
    ];
    ctx.font = OVERLAY_FONT;
    for (let i = 0; i < legend.length; i++) {
      const item = legend[i];
      const y = 200 + i * 52;
      drawSprite(ctx, CANVAS_WIDTH / 2 - 130, y, 48, 32, item.sprite, item.color, 3);
      ctx.textAlign = 'left';
      ctx.fillStyle = COLORS.hud;
      ctx.fillText(item.label, CANVAS_WIDTH / 2 - 60, y + 4);
    }

    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.hud;
      ctx.font = OVERLAY_FONT;
      ctx.fillText('PRESS SPACE TO START', CANVAS_WIDTH / 2, 430);
    }

    ctx.font = SMALL_FONT;
    ctx.fillStyle = COLORS.dim;
    ctx.fillText('← →  /  A D  MOVE        SPACE  FIRE', CANVAS_WIDTH / 2, 472);
  }

  _drawWaveOverlay(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = COLORS.hud;
    ctx.font = TITLE_FONT;
    ctx.fillText(`WAVE ${this.wave + 1}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
  }

  _drawGameOverOverlay(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = COLORS.hud;
    ctx.font = TITLE_FONT;
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 150);

    ctx.font = OVERLAY_FONT;
    ctx.fillText(`SCORE ${String(this.score).padStart(4, '0')}`, CANVAS_WIDTH / 2, 220);

    if (this.gameOverNewHi) {
      ctx.fillStyle = COLORS.warning;
      ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, 264);
    }

    const bw = 200;
    const bh = 54;
    const bx = CANVAS_WIDTH / 2 - bw / 2;
    const by = 330;
    this.restartRect = { x: bx, y: by, w: bw, h: bh };

    ctx.fillStyle = '#15201c';
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = COLORS.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);

    ctx.fillStyle = COLORS.accent;
    ctx.font = OVERLAY_FONT;
    ctx.fillText('RESTART', CANVAS_WIDTH / 2, by + 14);

    ctx.font = SMALL_FONT;
    ctx.fillStyle = COLORS.dim;
    ctx.fillText('OR PRESS SPACE', CANVAS_WIDTH / 2, by + bh + 26);
  }

  _onCanvasClick(e) {
    audio.unlock();
    if (this.state !== 'GAMEOVER') return;
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
    const r = this.restartRect;
    if (r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
      this.restart();
    }
  }

  // ------------------------------------------------------------ hi-score

  _loadHiScore() {
    try {
      return parseInt(localStorage.getItem(HI_SCORE_KEY) || '0', 10) || 0;
    } catch (_) {
      return 0;
    }
  }

  _saveHiScore() {
    try {
      localStorage.setItem(HI_SCORE_KEY, String(this.hiScore));
    } catch (_) {
      /* private mode etc. — ignore */
    }
  }

  // ------------------------------------------------------- ambience

  _initStars() {
    this.stars = [];
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let i = 0; i < 70; i++) {
      this.stars.push({ x: rnd() * CANVAS_WIDTH, y: rnd() * CANVAS_HEIGHT, s: rnd() < 0.3 ? 2 : 1 });
    }
  }

  _drawStars(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (const st of this.stars) ctx.fillRect(st.x, st.y, st.s, st.s);
  }
}

// ---------------------------------------------------------------------------
// Entry point.
// ---------------------------------------------------------------------------
const canvas = document.getElementById('game');
if (canvas) {
  const engine = new GameEngine(canvas);
  // Debug/test handle (also handy from the browser console).
  window.__invaders = engine;
}
