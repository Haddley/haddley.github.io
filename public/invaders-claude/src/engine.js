import {
  CANVAS_WIDTH, CANVAS_HEIGHT, HUD_HEIGHT, GROUND_Y,
  ALIEN_ROWS, ALIEN_COLS, ALIEN_WIDTH, ALIEN_HEIGHT, ALIEN_GAP_X, ALIEN_GAP_Y,
  ALIEN_SPEED_X, ALIEN_SPEED_Y, ALIEN_SHOOT_INTERVAL,
  LIVES, RESPAWN_DELAY, SHIELD_COUNT, SHIELD_COLS, SHIELD_ROWS, SHIELD_BLOCK_SIZE,
  UFO_MIN_INTERVAL, UFO_MAX_INTERVAL,
  WAVE_TRANSITION_DURATION, MAX_WAVE_DESCENT,
} from './constants.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { Player } from './entities/player.js';
import { Alien } from './entities/alien.js';
import { Bullet } from './entities/bullet.js';
import { AlienBullet } from './entities/alienBullet.js';
import { Explosion } from './entities/explosion.js';
import { Shield } from './entities/shield.js';
import { UFO } from './entities/ufo.js';

function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'START';
    this.score = 0;
    this.hiScore = parseInt(localStorage.getItem('si_hi') || '0', 10);
    this.lives = LIVES;
    this.wave = 1;
    this.waveYOffset = 0;
    this.entities = [];
    this.player = null;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randUfoInterval();
    this.waveClock = 0;
    this.respawnTimer = 0;
    this.playerDead = false;
    this.lastTime = 0;
    this.shootPressed = false;

    input.onUnlock = () => audio.unlock();
    window.addEventListener('keydown', e => {
      if (e.code === 'Space') audio.unlock();
      if (this.state === 'START' || this.state === 'GAMEOVER') {
        if (e.code === 'Space' || e.code === 'Enter') this._startGame();
      }
    });

    this._buildLevel();
    requestAnimationFrame(ts => this._loop(ts));
  }

  _randUfoInterval() {
    return UFO_MIN_INTERVAL + Math.random() * (UFO_MAX_INTERVAL - UFO_MIN_INTERVAL);
  }

  _buildLevel() {
    this.entities = [];
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randUfoInterval();

    // Shields
    const totalW = SHIELD_COLS * SHIELD_BLOCK_SIZE;
    const spacing = (CANVAS_WIDTH - SHIELD_COUNT * totalW) / (SHIELD_COUNT + 1);
    for (let i = 0; i < SHIELD_COUNT; i++) {
      const sx = spacing + i * (totalW + spacing);
      const sy = GROUND_Y - SHIELD_ROWS * SHIELD_BLOCK_SIZE - 32;
      this.entities.push(new Shield(sx, sy));
    }

    // Player
    this.player = new Player();
    this.entities.push(this.player);
    this.playerDead = false;
    this.lives = LIVES;
    this.score = 0;
    this.wave = 1;
    this.waveYOffset = 0;

    this._spawnAliens();
  }

  _spawnAliens() {
    const startX = (CANVAS_WIDTH - (ALIEN_COLS * (ALIEN_WIDTH + ALIEN_GAP_X) - ALIEN_GAP_X)) / 2;
    const startY = HUD_HEIGHT + 20 + this.waveYOffset * (ALIEN_HEIGHT + ALIEN_GAP_Y);

    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        const x = startX + col * (ALIEN_WIDTH + ALIEN_GAP_X);
        const y = startY + row * (ALIEN_HEIGHT + ALIEN_GAP_Y);
        this.entities.push(new Alien(x, y, row));
      }
    }

    const alive = this._aliens().length;
    audio.startMarch(alive, alive);
  }

  _startGame() {
    this._buildLevel();
    this.state = 'PLAYING';
  }

  _aliens() { return this.entities.filter(e => e instanceof Alien && !e.dead); }
  _shields() { return this.entities.filter(e => e instanceof Shield && !e.dead); }
  _bullets() { return this.entities.filter(e => e instanceof Bullet && !e.dead); }
  _alienBullets() { return this.entities.filter(e => e instanceof AlienBullet && !e.dead); }
  _ufos() { return this.entities.filter(e => e instanceof UFO && !e.dead); }

  _loop(timestamp) {
    const dt = Math.min(timestamp - this.lastTime, 50);
    this.lastTime = timestamp;

    if (this.state === 'PLAYING') {
      this._update(dt);
      this._draw();
    } else if (this.state === 'WAVE_TRANSITION') {
      this._updateWaveTransition(dt);
      this._draw();
      this._drawWaveOverlay();
    } else if (this.state === 'START') {
      this._drawStart();
    } else if (this.state === 'GAMEOVER') {
      this._draw();
      this._drawGameOver();
    }

    requestAnimationFrame(ts => this._loop(ts));
  }

  _update(dt) {
    // Respawn
    if (this.playerDead) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.player.respawn();
        this.playerDead = false;
      }
      this._updateEntities(dt);
      return;
    }

    this._updateEntities(dt);
    this._moveAliens(dt);
    this._alienShoot(dt);
    this._ufoSpawn(dt);
    this._checkCollisions();
    this._checkGameConditions();

    // Shoot
    const wantShoot = input.isShoot();
    if (wantShoot && !this.shootPressed && this._bullets().length === 0) {
      this.entities.push(new Bullet(this.player.x + this.player.width / 2, this.player.y));
      audio.shoot();
    }
    this.shootPressed = wantShoot;

    // Clean dead (player stays in array for respawn; dead flag hides it from draw)
    this.entities = this.entities.filter(e => e === this.player || !e.dead);
  }

  _updateEntities(dt) {
    for (const e of this.entities) e.update(dt);
  }

  _moveAliens(dt) {
    const aliens = this._aliens();
    if (aliens.length === 0) return;

    const total = ALIEN_ROWS * ALIEN_COLS;
    const speed = Math.min(4, ALIEN_SPEED_X * Math.sqrt(total / aliens.length));
    const dx = speed * this.alienDirection;

    let hitWall = false;
    for (const a of aliens) {
      const nx = a.x + dx;
      if (nx < 0 || nx + a.width > CANVAS_WIDTH) { hitWall = true; break; }
    }

    if (hitWall) {
      this.alienDirection *= -1;
      for (const a of aliens) a.y += ALIEN_SPEED_Y;
    } else {
      for (const a of aliens) a.x += dx;
    }

    // Erode shields as aliens descend
    for (const s of this._shields()) {
      for (const a of aliens) s.eraseOverlap(a.x, a.y, a.width, a.height);
    }

    // Update march tempo
    audio.updateMarchTempo(aliens.length, total);
  }

  _alienShoot(dt) {
    this.alienShootTimer -= dt;
    if (this.alienShootTimer > 0) return;
    this.alienShootTimer = ALIEN_SHOOT_INTERVAL;

    const aliens = this._aliens();
    if (aliens.length === 0) return;
    const shooter = aliens[Math.floor(Math.random() * aliens.length)];
    this.entities.push(new AlienBullet(shooter.x + shooter.width / 2, shooter.y + shooter.height));
  }

  _ufoSpawn(dt) {
    if (this._ufos().length > 0) { this.ufoTimer += dt; return; }
    audio.stopUfo();
    this.ufoTimer += dt;
    if (this.ufoTimer >= this.ufoInterval) {
      this.ufoTimer = 0;
      this.ufoInterval = this._randUfoInterval();
      this.entities.push(new UFO());
      audio.startUfo();
    }
  }

  _checkCollisions() {
    const player = this.player;
    const bullets = this._bullets();
    const alienBullets = this._alienBullets();
    const aliens = this._aliens();
    const shields = this._shields();
    const ufos = this._ufos();

    for (const b of bullets) {
      // vs aliens
      for (const a of aliens) {
        if (!b.dead && overlaps(b, a)) {
          b.dead = true;
          a.dead = true;
          this.score += a.score;
          this.entities.push(new Explosion(a.x, a.y, a.width, a.height));
          audio.alienDie();
        }
      }
      // vs UFO
      for (const u of ufos) {
        if (!b.dead && overlaps(b, u)) {
          b.dead = true;
          u.dead = true;
          this.score += u.score;
          this.entities.push(new Explosion(u.x, u.y, u.width, u.height));
          audio.stopUfo();
          audio.ufoDie();
        }
      }
      // vs shields
      if (!b.dead) {
        for (const s of shields) {
          if (overlaps(b, s) && s.hitTest(b.x, b.y, b.width, b.height)) {
            b.dead = true;
            break;
          }
        }
      }
    }

    // Alien bullets vs shields
    for (const ab of alienBullets) {
      for (const s of shields) {
        if (!ab.dead && overlaps(ab, s) && s.hitTest(ab.x, ab.y, ab.width, ab.height)) {
          ab.dead = true;
          break;
        }
      }
    }

    // Alien bullets vs player
    if (!player.isInvulnerable() && !this.playerDead) {
      for (const ab of alienBullets) {
        if (!ab.dead && overlaps(ab, player)) {
          ab.dead = true;
          this.entities.push(new Explosion(player.x, player.y, player.width, player.height));
          audio.playerDie();
          this.lives--;
          this.playerDead = true;
          this.respawnTimer = RESPAWN_DELAY;
          player.dead = true;
          break;
        }
      }
    }

  }

  _checkGameConditions() {
    const aliens = this._aliens();

    // All aliens dead → next wave
    if (aliens.length === 0) {
      audio.stopMarch();
      this.wave++;
      this.waveYOffset = Math.min(this.waveYOffset + 1, MAX_WAVE_DESCENT);
      this.state = 'WAVE_TRANSITION';
      this.waveClock = 0;
      return;
    }

    // Any alien reached ground
    for (const a of aliens) {
      if (a.y + a.height >= GROUND_Y) {
        this._endGame();
        return;
      }
    }

    // Out of lives
    if (this.lives <= 0) {
      this._endGame();
    }
  }

  _updateWaveTransition(dt) {
    this.waveClock += dt;
    if (this.waveClock >= WAVE_TRANSITION_DURATION) {
      this._startNextWave();
    }
    this._updateEntities(dt);
  }

  _startNextWave() {
    // Remove aliens, bullets, UFOs — keep shields and player
    this.entities = this.entities.filter(e =>
      e instanceof Shield || e === this.player || e instanceof Explosion
    );
    this.player.dead = false;
    this.playerDead = false;
    this.alienDirection = 1;
    this.alienShootTimer = 0;
    this.ufoTimer = 0;
    this.ufoInterval = this._randUfoInterval();
    audio.stopUfo();
    this._spawnAliens();
    this.state = 'PLAYING';
  }

  _endGame() {
    audio.stopMarch();
    audio.stopUfo();
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
      localStorage.setItem('si_hi', String(this.hiScore));
    }
    this.state = 'GAMEOVER';
  }

  _draw() {
    const ctx = this.ctx;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Ground line
    ctx.strokeStyle = '#44ff44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
    ctx.stroke();

    // Entities
    for (const e of this.entities) if (!e.dead) e.draw(ctx);

    // HUD
    this._drawHUD();
  }

  _drawHUD() {
    const ctx = this.ctx;
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${this.score}`, 10, 24);
    ctx.textAlign = 'center';
    ctx.fillText(`HI: ${this.hiScore}`, CANVAS_WIDTH / 2, 24);
    ctx.textAlign = 'right';
    ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH - 10, 24);

    // Lives
    ctx.fillStyle = '#44ff44';
    ctx.textAlign = 'left';
    ctx.font = '14px monospace';
    ctx.fillText(`LIVES: ${'▮'.repeat(Math.max(0, this.lives))}`, 10, CANVAS_HEIGHT - 10);
  }

  _drawWaveOverlay() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`WAVE ${this.wave}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }

  _drawStart() {
    const ctx = this.ctx;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#44ff44';
    ctx.font = 'bold 56px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px monospace';
    ctx.fillText('Press SPACE or ENTER to start', CANVAS_WIDTH / 2, 280);
    ctx.font = '16px monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Arrow keys / A-D to move   SPACE to shoot', CANVAS_WIDTH / 2, 340);

    // Score table
    const rows = [
      ['???', '#ff0000', '50-300 PTS'],
      ['SQUID', '#ffffff', '30 PTS'],
      ['CRAB', '#ffffff', '20 PTS'],
      ['OCTOPUS', '#ffffff', '10 PTS'],
    ];
    ctx.font = '16px monospace';
    rows.forEach(([label, color, pts], i) => {
      const y = 420 + i * 32;
      ctx.fillStyle = color;
      ctx.textAlign = 'left';
      ctx.fillText(label, CANVAS_WIDTH / 2 - 120, y);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'right';
      ctx.fillText(pts, CANVAS_WIDTH / 2 + 120, y);
    });
  }

  _drawGameOver() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 56px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 220);
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px monospace';
    ctx.fillText(`Score: ${this.score}`, CANVAS_WIDTH / 2, 290);
    if (this.score >= this.hiScore && this.score > 0) {
      ctx.fillStyle = '#ffff00';
      ctx.font = '20px monospace';
      ctx.fillText('NEW HI-SCORE!', CANVAS_WIDTH / 2, 330);
    }
    ctx.fillStyle = '#44ff44';
    ctx.font = '22px monospace';
    ctx.fillText('Press SPACE or ENTER to restart', CANVAS_WIDTH / 2, 390);
  }
}

// Entry point
const canvas = document.getElementById('game');
new GameEngine(canvas);
