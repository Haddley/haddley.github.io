# Product Design Document — Space Invaders

**Version:** 2.0
**Date:** 2026-09-29
**Status:** Ready to build. The source code in Appendix A was run in Chrome and passed every check in `PRD.md` section 9.
**Companion files:** `PRD.md` (what to build) and `ARCHITECTURE.md` (file layout and build order)

---

## 0. How to use this document

- This document explains **how** every part of the game works, then gives the **complete source code** for every file in Appendix A.
- The code in Appendix A is the design. Copy each file **exactly**, character for character. Do not rename anything, do not "improve" anything, and do not merge or split files.
- Sections 1–13 explain *why* the code is written the way it is. Read them so that you do not accidentally "fix" something that is deliberate.
- Section 14 lists every bug that earlier builds of this game actually hit. Each one is already prevented by the code in Appendix A. Do not reintroduce them.
- The file list, the import/export contract, and the build order are in `ARCHITECTURE.md`. They are not repeated here.

---

## 1. Conventions used everywhere

| Topic | Rule |
|---|---|
| Coordinates | Canvas pixels. (0, 0) is the **top-left** corner. x grows to the right, y grows **downwards**. |
| Entity position | `x, y` is the **top-left corner** of the entity's rectangle, never its centre. |
| Time | All times are in **milliseconds (ms)**. |
| `dt` | Milliseconds since the previous frame. It is passed to every `update(dt)`. |
| Speeds | All speeds are in **pixels per second**. Movement is always `speed * (dt / 1000)`. Never use "pixels per frame". |
| Constants | Every tuning number lives in `src/constants.js`. Other files import constants by their exact name. |
| Death | An entity is removed by setting `entity.dead = true`. The engine removes it later. Nothing else deletes entities. |
| Strings | The four states are the exact strings `'START'`, `'PLAYING'`, `'WAVE_TRANSITION'`, `'GAMEOVER'`. |
| Imports | Relative paths that start with `./` or `../` and **end in `.js`**. The browser will not guess the extension. |

---

## 2. Layout (all positions pre-computed)

These values come from `src/constants.js`. They are listed so you can check the result on screen.

| Item | Value |
|---|---|
| Canvas | 800 × 600 |
| HUD text baseline | y = 24 |
| Ground line | y = 560 (drawn at 560.5 so the 1 px line is sharp) |
| Lives display | text `LIVES` at (10, 586); cannon icons 26 × 16 at x = 70, 104, 138, y = 570 |
| Alien size | 36 × 24, gap 16 horizontally and 16 vertically, so one column step is 52 px and one row step is 40 px |
| Formation width | 10 × 52 − 16 = 504 px, so the first column starts at x = (800 − 504) / 2 = 148 |
| Alien rows, wave 1 | y = 80, 120, 160, 200, 240 |
| Alien rows, later waves | add 40 × `waveYOffset` (0 for wave 1, then 1, 2, 3, and it stays at 3) |
| UFO | 48 × 21 at y = 48, starts at x = −48 (moving right) or x = 800 (moving left) |
| Shields | each 72 × 36 at y = 492; x = 102, 277, 451, 626 |
| Player cannon | 40 × 24 at y = 532; starts at x = 380 |
| "Alien reached the bottom" line | an alien's bottom edge (`y + height`) ≥ 532 |

---

## 3. Entity system

- Every game object is a class that `extends Entity`. `Entity` has `x`, `y`, `width`, `height`, `dead`, and the empty methods `update(dt)` and `draw(ctx)`.
- `entity.js` also exports `overlaps(a, b)`, the one and only rectangle-overlap test.
- The engine keeps **every** entity in **one** array, `this.entities`. There are no separate arrays per type.
- To find one type, the engine filters by class, for example `this.entities.filter(e => e instanceof Alien && !e.dead)`. The helpers `_aliens()`, `_shields()`, `_bullets()`, `_alienBullets()` and `_ufos()` do exactly this.
- Dead entities are removed once per frame by `_removeDeadEntities()`:

```js
this.entities = this.entities.filter(e => e === this.player || !e.dead);
```

**The player is never removed from the array.** When the cannon is hit, `player.dead` becomes `true`, so it is not drawn and cannot move, but it stays in the array so that `player.respawn()` can bring it back. (An earlier build removed the player here and the cannon never came back.)

| Class | File | Constructor | Notes |
|---|---|---|---|
| `Player` | `entities/player.js` | `new Player()` | Reads the keyboard itself. Has `respawn()` and `isInvulnerable()`. |
| `Alien` | `entities/alien.js` | `new Alien(x, y, row, col)` | `update()` is **empty on purpose**. The engine moves aliens. Has `score`, `row`, `col`, `frames`. |
| `Bullet` | `entities/bullet.js` | `new Bullet(tipX, tipY)` | Player bullet. `tipX, tipY` = top-centre of the cannon. Moves up. |
| `AlienBullet` | `entities/alienBullet.js` | `new AlienBullet(x, y)` | `x, y` = bottom-centre of the alien that fired. Moves down. |
| `Explosion` | `entities/explosion.js` | `new Explosion(x, y, width, height)` | Takes the **rectangle** of the thing that exploded (not its centre). Dies after 400 ms. |
| `Shield` | `entities/shield.js` | `new Shield(x, y)` | Has `blocks[row][col]`, `hitTest(x, y, w, h)` and `eraseOverlap(x, y, w, h)`. |
| `UFO` | `entities/ufo.js` | `new UFO()` | Chooses its own side and score. Dies when fully off screen. |

---

## 4. State machine

```
            Space/Enter                    last alien dies
  START ──────────────────► PLAYING ────────────────────────► WAVE_TRANSITION
                              ▲  │                                   │
                              │  │ lives = 0, or alien at y ≥ 532    │ after 1500 ms
                              │  ▼                                   │
                              │ GAMEOVER                              │
                              │  │                                   │
                              └──┘ Space/Enter, only after 1000 ms   │
                              ▲                                      │
                              └──────────────────────────────────────┘
```

| State | Every frame the loop does |
|---|---|
| `START` | `_drawStart()` only. Nothing moves. |
| `PLAYING` | `_update(dt)` then `_draw()`. |
| `WAVE_TRANSITION` | `_updateWaveTransition(dt)` (explosions finish, cannon can move), `_draw()`, then `_drawWaveOverlay()` if still in this state. |
| `GAMEOVER` | Add `dt` to `gameOverClock`, `_draw()` (frozen scene), then `_drawGameOver()`. |

Only four methods change `state`: `_startGame()` (to `PLAYING`), `_beginWaveTransition()` (to `WAVE_TRANSITION`), `_startNextWave()` (to `PLAYING`) and `_endGame()` (to `GAMEOVER`).

**Starting and restarting.** The engine listens for `keydown` itself (`_onKeyDown`). It ignores `e.repeat` events. In `START`, Space or Enter calls `_startGame()`. In `GAMEOVER`, it calls `_startGame()` only when `gameOverClock >= RESTART_DELAY` (1000 ms), so a player who is still holding Space when they die does not restart by accident. `_startGame()` resets **everything** (score, lives, wave, shields, player, aliens, timers), so restart and first start are the same code.

---

## 5. Game loop and frame order

```js
_loop(timestamp) {
  const dt = Math.min(Math.max(0, timestamp - this.lastTime), MAX_FRAME_TIME);
  this.lastTime = timestamp;
  // ... per-state work from section 4 ...
  requestAnimationFrame(ts => this._loop(ts));
}
```

- `this.lastTime` starts as `performance.now()`, **not** `0`. `requestAnimationFrame` timestamps use the same clock, so the first `dt` is small. (Starting at `0` gave one earlier build a huge first `dt` that broke the game.)
- `dt` is clamped to `MAX_FRAME_TIME` (50 ms). When the browser tab is hidden and shown again, nothing teleports.
- `requestAnimationFrame` is called at the **end** of every frame, in **every** state, so the loop never stops.

Inside `_update(dt)` (the `PLAYING` state) the order is fixed:

1. `firePressed = input.consumePress('Space')`. Read on every frame, even when the result is not used, so presses do not pile up.
2. `e.update(dt)` for every entity (player moves, bullets fly, UFO flies, explosions age).
3. If the player is dead: count down `respawnTimer`, and call `player.respawn()` when it reaches 0. Aliens, alien fire and player fire are all paused.
   Otherwise: `_moveAliens(dt)`, `_alienShoot(dt)`, and `_playerShoot()` if `firePressed`.
4. `_ufoSpawn(dt)`.
5. `_checkCollisions()`.
6. `_removeDeadEntities()`.
7. `_checkGameConditions()`.

---

## 6. Alien movement (engine-managed)

`Alien.update()` does nothing. The engine moves all living aliens as one block, so they can never drift apart:

```js
const speed = Math.min(ALIEN_MAX_SPEED_X, ALIEN_SPEED_X * Math.sqrt(TOTAL_ALIENS / aliens.length));
const dx = speed * (dt / 1000) * this.alienDirection;
// If ANY alien's NEXT x would leave the canvas: reverse direction and drop every alien ALIEN_SPEED_Y.
// Otherwise: move every alien by dx.
```

- The wall test uses the **next** position (`a.x + dx`). On a wall hit, the aliens drop **instead of** moving sideways that frame, so they never end up outside the canvas and never get stuck bouncing.
- Speed with 50 alive is 60 px/s. With 1 alive the formula gives 424 px/s, capped at 240 px/s.
- After moving, every alien that overlaps a shield calls `shield.eraseOverlap(...)` (aliens chew through shields).
- Finally `audio.updateMarchTempo(aliens.length, TOTAL_ALIENS)` keeps the march beat in step.

**Alien fire.** `alienShootTimer` counts down from 1500 ms. When it reaches 0 it resets to 1500. The engine then picks a random living alien, uses the **lowest** living alien in that same column as the shooter (so bullets never come out of the middle of the formation), and spawns an `AlienBullet` at the shooter's bottom-centre. At the start of every wave, `alienShootTimer` is set to 1500, which gives the player a short grace period.

---

## 7. Collisions

All collisions are rectangle-overlap tests (`overlaps(a, b)`), done once per frame in `_checkCollisions()`, after movement.

| # | Check | Result |
|---|---|---|
| 1 | Player bullet vs alien | Bullet dead, alien dead, `score += alien.score`, explosion at the alien's rectangle, `audio.alienDie()` |
| 2 | Player bullet vs UFO | Bullet dead, UFO dead, `score += ufo.score`, explosion, `audio.stopUfo()`, `audio.ufoDie()` |
| 3 | Player bullet vs shield | If `shield.hitTest(...)` returns `true`: bullet dead (the blocks are already erased) |
| 4 | Alien bullet vs shield | Same as 3 |
| 5 | Alien bullet vs player | Only when the player is **not** dead and **not** invulnerable: bullet dead, `_killPlayer()` |
| 6 | Alien vs shield | Handled in `_moveAliens` (section 6) |

- Always check `!b.dead` before testing a bullet again, so one bullet can never kill two things.
- The quick `overlaps(bullet, shield)` test runs first, and the block-by-block `hitTest` runs only when the bullet is inside the shield's outer rectangle.
- A bullet that passes through the **arch** (where there are no blocks) keeps flying, because `hitTest` returns `false`.

**`_killPlayer()`:** push an `Explosion` at the player's rectangle, `audio.playerDie()`, `lives -= 1`, `player.dead = true`, `respawnTimer = RESPAWN_DELAY` (1500), and mark every alien bullet dead (clears the screen).

**`player.respawn()`:** x back to the centre, `dead = false`, `invulnerable = INVULNERABLE_DURATION` (2000). `Player.update` counts `invulnerable` down. `Player.draw` skips drawing on alternate 150 ms slices while invulnerable, which makes it blink.

---

## 8. Game conditions, in this exact order

```js
_checkGameConditions() {
  if (this.lives <= 0) → _endGame(), stop
  if any living alien has y + height >= PLAYER_Y → _endGame(), stop
  if no living aliens → _beginWaveTransition()
}
```

Losing is checked **before** winning the wave. If the last alien and the player's last life are lost in the same frame, the game ends. (The version 1.0 order let the game continue with 0 lives.)

---

## 9. Waves

`_beginWaveTransition()`:
1. `audio.stopMarch()` and `audio.stopUfo()`.
2. Keep only shields, the player and explosions: `this.entities = this.entities.filter(e => e instanceof Shield || e === this.player || e instanceof Explosion)`. This removes all bullets and any UFO.
3. `wave += 1` and `waveYOffset = Math.min(waveYOffset + 1, MAX_WAVE_DESCENT)`.
4. `waveClock = 0` and `state = 'WAVE_TRANSITION'`.

`_updateWaveTransition(dt)` adds `dt` to `waveClock`, updates all entities, removes dead ones, and after 1500 ms calls `_startNextWave()`.

`_startNextWave()`: if the player is dead, `player.respawn()`. Then `_resetWaveTimers()` (direction = right, alien fire timer = 1500, UFO timer = 0 with a new random interval), `_spawnAliens()` (which also restarts the march), and `state = 'PLAYING'`.

`waveYOffset` is only ever increased in `_beginWaveTransition()`. It is 0 for wave 1. (One earlier build increased it before spawning wave 1, so wave 1 started a row too low.)

---

## 10. Mystery UFO

```js
_ufoSpawn(dt) {
  if (this._ufos().length > 0) return;   // one at a time
  audio.stopUfo();                        // no UFO alive → siren off. Runs EVERY frame.
  this.ufoTimer += dt;
  if (this.ufoTimer >= this.ufoInterval) { reset timer, new random interval, push new UFO(), audio.startUfo(); }
}
```

The siren is switched off by **state**, not by an event: on every frame with no living UFO, `stopUfo()` runs. `stopUfo()` does nothing when the siren is already off. So the siren always stops, whether the UFO was shot, flew off screen, or was removed at the end of a wave. (Two of the first three builds of this game left the siren playing forever after the UFO flew off screen, because they only stopped it when the UFO was shot.)

The UFO timer only runs while no UFO is alive, so the 15–25 s gap is measured from when the previous UFO disappeared.

---

## 11. Shields

- `blocks` is an array of 6 rows, and each row is an array of 12 booleans. `true` means the block exists.
- The arch: blocks in the bottom 2 rows (rows 4 and 5) at columns 4, 5, 6 and 7 start as `false`.
- `_erase(x, y, w, h)` walks every existing block, computes its rectangle (`this.x + col * 6`, `this.y + row * 6`, 6, 6), and sets it to `false` if it overlaps the given rectangle. It returns `true` if at least one block was erased.
- `hitTest(...)` is `_erase(...)` for bullets (its return value decides whether the bullet dies). `eraseOverlap(...)` is `_erase(...)` for aliens (return value ignored).
- `draw` fills one green 6 × 6 square per existing block.
- Shields are created only in `_startGame()`. The wave code keeps them.

---

## 12. Sprites

Sprites are arrays of strings. `'X'` is a lit pixel and `' '` (a space) is empty. **Every row of a sprite must have exactly the same length.** Uneven rows distort the drawing.

These are the original 1978 arcade bitmaps, transcribed pixel for pixel (both animation frames for each alien). Do not redraw them.

| Sprite | Size (cols × rows) | Drawn in box | Pixel size | Drawn size |
|---|---|---|---|---|
| `SQUID_A`, `SQUID_B` | 8 × 8 | 36 × 24 | 3 | 24 × 24, centred |
| `CRAB_A`, `CRAB_B` | 11 × 8 | 36 × 24 | 3 | 33 × 24, centred |
| `OCTOPUS_A`, `OCTOPUS_B` | 12 × 8 | 36 × 24 | 3 | 36 × 24 |
| `UFO_SPRITE` | 16 × 7 | 48 × 21 | 3 | 48 × 21 |
| `PLAYER_SPRITE` | 13 × 8 | 40 × 24 | 3 | 39 × 24, centred |
| `PLAYER_SPRITE` (lives icon) | 13 × 8 | 26 × 16 | 2 | 26 × 16 |

`drawSprite(ctx, x, y, w, h, pixels, color)` picks a whole-number pixel size, `Math.floor(Math.min(w / cols, h / rows))`, so pixels stay square and crisp, and centres the sprite inside the box. The collision rectangle is always the full box (for example 36 × 24 for every alien), not the lit pixels.

Alien animation: `frame = Math.floor(Date.now() / 500) % 2` picks `frames[0]` or `frames[1]`. All aliens share the clock, so they step together.

Colours: aliens white `#ffffff`; cannon, shields, ground line and lives green `#44ff44`; UFO red `#ff0000`; player bullet white; alien bullet `#ff4444`; explosion orange `#ffaa00`. All colours are in `COLORS` in `constants.js`.

---

## 13. Audio

One `AudioManager` instance, exported as `audio`. Every method first checks `if (!this.ctx) return;`, so calling any sound before the first key press is silent and safe.

**Unlocking.** Browsers refuse to play sound until the user interacts with the page. `audio.unlock()` creates the `AudioContext` the first time and calls `resume()` if the context is `'suspended'`. The engine calls it on **every** `keydown` and `click`. Calling it again is harmless.

| Sound | Method | Recipe |
|---|---|---|
| Player shoot | `shoot()` | square wave, 800 → 200 Hz, 150 ms, volume 0.2 |
| Alien death | `alienDie()` | white noise through a bandpass filter at 600 Hz, 350 ms, volume 0.3 |
| Player death | `playerDie()` | white noise through a lowpass filter at 600 Hz, 900 ms, volume 0.4 |
| UFO death | `ufoDie()` | square wave, 700 → 80 Hz, 500 ms, volume 0.2 |
| March | `startMarch` / `stopMarch` / `updateMarchTempo` | `setInterval`. Each beat is an 80 ms square tone at the next of 320, 260, 220, 190 Hz, volume 0.15 |
| UFO siren | `startUfo()` / `stopUfo()` | 400 Hz sawtooth. An 8 Hz sine "LFO" oscillator, through a gain of 120, is connected to the sawtooth's `frequency`, so the pitch wobbles ±120 Hz. Volume 0.15. Runs until `stopUfo()` |

- Volume envelopes fade to `0.001`, **never to `0`**. `exponentialRampToValueAtTime` throws an error if the target value is 0.
- March tempo: `AudioManager.marchInterval(alive, total) = Math.max(100, Math.round(800 * alive / total))` ms. `updateMarchTempo` is called every frame, but it only restarts the `setInterval` when the interval value actually changes (or when the march is not running).
- The arcade's march notes were 160/130/110/100 Hz. They are doubled here because laptop speakers cannot reproduce sounds below about 200 Hz.
- `startUfo()` does nothing if the siren is already running, so it never stacks two sirens.

**Input** (`src/input.js`, one instance exported as `input`):
- `isLeft()` / `isRight()` say whether a key is **held** (used for movement).
- `consumePress('Space')` says whether Space was **pressed** since the last call, then forgets it (used for shooting). A press is recorded on `keydown` only when `e.repeat` is false. So holding Space fires once, and even a very quick tap that starts and ends between two frames is never missed.
- `preventDefault()` is called for Space and the arrow keys, so the page does not scroll.
- On window `blur` (the tab loses focus), all keys are forgotten, so the cannon does not keep sliding.
- `_startGame()` calls `input.consumePress('Space')`, so the Space press that started the game does not fire a bullet.

---

## 14. Lessons learned — bugs that earlier builds actually hit

This game has been built from a specification six times, by different models and harnesses. The code in Appendix A prevents every problem below. If you change the code, you will probably bring one of them back.

| # | Symptom | Cause | Prevention (already in Appendix A) |
|---|---|---|---|
| 1 | Blank page; console says a module was blocked by CORS | `index.html` opened as a `file://` URL | Serve over HTTP: `python3 -m http.server 8000` |
| 2 | Blank page; console says a module has the wrong MIME type | A home-made web server sent `.js` files as `text/html` | Never write your own server. Use `python3 -m http.server` |
| 3 | Nothing moves, or everything jumps, on the first frame | `lastTime = 0`, so the first `dt` was huge | `lastTime = performance.now()`, and `dt` clamped to 50 ms |
| 4 | UFO siren keeps playing forever | Siren stopped only when the UFO was shot, not when it flew away | `stopUfo()` runs on every frame that has no living UFO |
| 5 | Cannon never reappears after being hit | The dead-entity filter deleted the player | The filter always keeps `this.player` |
| 6 | `SyntaxError` in `audio.js`; no sound at all | A partial edit left a function body without its header | Write each file in full. Re-read a file after editing it |
| 7 | `The requested module does not provide an export named ...` | Imports used names that no file exported (invented constant names) | Use only the names in the `ARCHITECTURE.md` export table |
| 8 | Aliens move twice as fast on a 120 Hz screen | Speeds were in pixels per frame | All speeds are pixels per **second**, multiplied by `dt / 1000` |
| 9 | Wave 1 starts one row too low | `waveYOffset` was increased before wave 1 spawned | Only `_beginWaveTransition()` increases it |
| 10 | Game continues with 0 lives | Wave clear was checked before lives | `_checkGameConditions` checks lives first |
| 11 | Game restarts instantly after game over | A held Space key auto-repeats `keydown` | Ignore `e.repeat`, and wait `RESTART_DELAY` (1000 ms) |
| 12 | Page scrolls when pressing Space or the arrow keys | Default browser behaviour | `preventDefault()` in `input.js` |
| 13 | A bullet fires the moment the game starts | The start key was also read as a fire key | `_startGame()` calls `input.consumePress('Space')` |
| 14 | A quick tap of Space sometimes does not fire | The key was pressed and released between two frames, so "is it held?" was never true | Latched `consumePress()` instead of polling the held state |
| 15 | Console error from `exponentialRampToValueAtTime` | Ramp target of 0 | Ramp to `0.001` |
| 16 | No sound, and the console warns that the AudioContext was not allowed to start | Context created before any user gesture | Create or resume the context in `unlock()` on keydown or click |
| 17 | The game is created twice, or waits for two key presses | `index.html` created a `GameEngine` **and** `engine.js` created one too | `engine.js` is the only place a `GameEngine` is created. `index.html` has no JavaScript except the one `<script>` tag |
| 18 | Explosions appear in the wrong place | Mixed `Explosion(centerX, centerY)` and `Explosion(x, y, w, h)` calls | One signature: the rectangle `(x, y, width, height)` |
| 19 | Sprite looks skewed | Sprite rows had different lengths | Every sprite row has the same length (checked by the table in section 12) |
| 20 | One bullet kills two aliens | The bullet was not marked dead before the next test | Check `!b.dead` before every test |
| 21 | Cannon keeps sliding after switching tabs | `keyup` never arrived | Forget all keys on window `blur` |
| 22 | Build stalls halfway through `engine.js` | The model tried to write a very large file in one go and hit its output limit or a timeout | Write `engine.js` in the 4 parts marked in Appendix A.14 (see `ARCHITECTURE.md` step 15) |

---

## Appendix A — complete source code

Create each file at exactly the path shown, with exactly this content. The files are listed in build order.

### A.1 `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Space Invaders</title>
  <link rel="icon" href="data:," />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    canvas {
      display: block;
      image-rendering: pixelated;
    }
  </style>
</head>
<body>
  <canvas id="game" width="800" height="600"></canvas>
  <script type="module" src="src/engine.js"></script>
</body>
</html>
```

### A.2 `src/constants.js`

```js
// All tuning numbers live here. Times are in milliseconds (ms).
// Speeds are in pixels per SECOND and are always multiplied by (dt / 1000).

// Canvas and layout
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const HUD_HEIGHT = 40;
export const GROUND_Y = CANVAS_HEIGHT - 40;                    // 560
export const MAX_FRAME_TIME = 50;                              // clamp dt to this

// Aliens
export const ALIEN_ROWS = 5;
export const ALIEN_COLS = 10;
export const ALIEN_WIDTH = 36;
export const ALIEN_HEIGHT = 24;
export const ALIEN_GAP_X = 16;
export const ALIEN_GAP_Y = 16;
export const ALIEN_START_Y = HUD_HEIGHT + 40;                  // 80
export const ALIEN_SPEED_X = 60;                               // px/s with all 50 alive
export const ALIEN_MAX_SPEED_X = 240;                          // px/s cap
export const ALIEN_SPEED_Y = 10;                               // px dropped per wall hit
export const ALIEN_SHOOT_INTERVAL = 1500;                      // ms between alien shots
export const ALIEN_ANIM_INTERVAL = 500;                        // ms per walk frame

// Player
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 24;
export const PLAYER_Y = GROUND_Y - PLAYER_HEIGHT - 4;          // 532
export const PLAYER_SPEED = 200;                               // px/s
export const LIVES = 3;
export const RESPAWN_DELAY = 1500;                             // ms
export const INVULNERABLE_DURATION = 2000;                     // ms

// Bullets
export const BULLET_SPEED = 400;                               // px/s, moves up
export const BULLET_WIDTH = 3;
export const BULLET_HEIGHT = 12;
export const ALIEN_BULLET_SPEED = 200;                         // px/s, moves down
export const ALIEN_BULLET_WIDTH = 3;
export const ALIEN_BULLET_HEIGHT = 12;

// Shields
export const SHIELD_COUNT = 4;
export const SHIELD_COLS = 12;
export const SHIELD_ROWS = 6;
export const SHIELD_BLOCK_SIZE = 6;
export const SHIELD_Y = GROUND_Y - SHIELD_ROWS * SHIELD_BLOCK_SIZE - 32;   // 492

// UFO
export const UFO_SPEED = 120;                                  // px/s
export const UFO_WIDTH = 48;
export const UFO_HEIGHT = 21;
export const UFO_Y = 48;
export const UFO_MIN_INTERVAL = 15000;                         // ms
export const UFO_MAX_INTERVAL = 25000;                         // ms
export const UFO_SCORES = [50, 100, 150, 200, 300];

// Waves and game flow
export const WAVE_TRANSITION_DURATION = 1500;                  // ms
export const MAX_WAVE_DESCENT = 3;                             // rows
export const RESTART_DELAY = 1000;                             // ms before restart is allowed
export const EXPLOSION_DURATION = 400;                         // ms

// Scores
export const SCORE_SQUID = 30;
export const SCORE_CRAB = 20;
export const SCORE_OCTOPUS = 10;

// Storage
export const HISCORE_KEY = 'si_hi';

// Colours
export const COLORS = {
  background: '#000000',
  green: '#44ff44',
  white: '#ffffff',
  grey: '#aaaaaa',
  red: '#ff0000',
  alienBullet: '#ff4444',
  explosion: '#ffaa00',
  yellow: '#ffff00',
};
```

### A.3 `src/sprites.js`

```js
// Pixel art. 'X' = filled pixel, ' ' = empty.
// RULE: every row of one sprite must have exactly the same length.

// Squid (rows 0-1), 8 x 8
export const SQUID_A = [
  '   XX   ',
  '  XXXX  ',
  ' XXXXXX ',
  'XX XX XX',
  'XXXXXXXX',
  '  X  X  ',
  ' X XX X ',
  'X X  X X',
];
export const SQUID_B = [
  '   XX   ',
  '  XXXX  ',
  ' XXXXXX ',
  'XX XX XX',
  'XXXXXXXX',
  ' X XX X ',
  'X      X',
  ' X    X ',
];

// Crab (rows 2-3), 11 x 8
export const CRAB_A = [
  '  X     X  ',
  '   X   X   ',
  '  XXXXXXX  ',
  ' XX XXX XX ',
  'XXXXXXXXXXX',
  'X XXXXXXX X',
  'X X     X X',
  '   XX XX   ',
];
export const CRAB_B = [
  '  X     X  ',
  'X  X   X  X',
  'X XXXXXXX X',
  'XXX XXX XXX',
  'XXXXXXXXXXX',
  ' XXXXXXXXX ',
  '  X     X  ',
  ' X       X ',
];

// Octopus (row 4), 12 x 8
export const OCTOPUS_A = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXX  XX  XXX',
  'XXXXXXXXXXXX',
  '   XX  XX   ',
  '  XX XX XX  ',
  'XX        XX',
];
export const OCTOPUS_B = [
  '    XXXX    ',
  ' XXXXXXXXXX ',
  'XXXXXXXXXXXX',
  'XXX  XX  XXX',
  'XXXXXXXXXXXX',
  '  XXX  XXX  ',
  ' XX  XX  XX ',
  '  XX    XX  ',
];

// UFO, 16 x 7
export const UFO_SPRITE = [
  '     XXXXXX     ',
  '   XXXXXXXXXX   ',
  '  XXXXXXXXXXXX  ',
  ' XX XX XX XX XX ',
  'XXXXXXXXXXXXXXXX',
  '  XXX  XX  XXX  ',
  '   X        X   ',
];

// Player cannon, 13 x 8
export const PLAYER_SPRITE = [
  '      X      ',
  '     XXX     ',
  '     XXX     ',
  ' XXXXXXXXXXX ',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
  'XXXXXXXXXXXXX',
];

// Draws a sprite with square pixels, centred inside the box (x, y, w, h).
export function drawSprite(ctx, x, y, w, h, pixels, color) {
  const rows = pixels.length;
  const cols = pixels[0].length;
  const size = Math.max(1, Math.floor(Math.min(w / cols, h / rows)));
  const left = Math.round(x + (w - cols * size) / 2);
  const top = Math.round(y + (h - rows * size) / 2);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pixels[r][c] === 'X') {
        ctx.fillRect(left + c * size, top + r * size, size, size);
      }
    }
  }
}
```

### A.4 `src/input.js`

```js
// Keyboard state.
//   isLeft() / isRight()  -> is the key HELD right now? (for movement)
//   consumePress(code)    -> was the key PRESSED since the last call? (for shooting)
const GAME_KEYS = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export class InputHandler {
  constructor() {
    this.keys = {};             // code -> true while held
    this.pressed = {};          // code -> true once per real key press, until consumed
    window.addEventListener('keydown', e => {
      if (GAME_KEYS.includes(e.code)) e.preventDefault();   // stop page scrolling
      this.keys[e.code] = true;
      if (!e.repeat) this.pressed[e.code] = true;           // ignore auto-repeat
    });
    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });
    window.addEventListener('blur', () => {
      this.keys = {};                                       // forget keys when tab loses focus
      this.pressed = {};
    });
  }

  isDown(code) { return this.keys[code] === true; }
  isLeft() { return this.isDown('ArrowLeft') || this.isDown('KeyA'); }
  isRight() { return this.isDown('ArrowRight') || this.isDown('KeyD'); }

  consumePress(code) {
    const wasPressed = this.pressed[code] === true;
    this.pressed[code] = false;
    return wasPressed;
  }
}

export const input = new InputHandler();
```

### A.5 `src/audio.js`

```js
// All sound is synthesised with the Web Audio API. There are no audio files.
// Every public method is safe to call before unlock(): it simply does nothing.

const MARCH_FREQS = [320, 260, 220, 190];

export class AudioManager {
  constructor() {
    this.ctx = null;              // AudioContext, created by unlock()
    this.marchTimer = null;       // id returned by setInterval
    this.marchIntervalMs = 0;     // current beat length in ms
    this.marchStep = 0;           // which of the 4 notes plays next
    this.ufoOsc = null;           // UFO siren oscillator (null = silent)
    this.ufoLfo = null;           // UFO wobble oscillator
  }

  // Call on every keydown and click. Browsers only allow sound after a user gesture.
  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Short burst of filtered white noise.
  _noise(duration, filterType, filterFreq, volume) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const size = Math.ceil(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);   // never ramp to 0

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(now);
    source.stop(now + duration);
  }

  // Short tone that slides from startFreq to endFreq.
  _tone(type, startFreq, endFreq, duration, volume) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, now);
    if (endFreq !== startFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
    }
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  shoot()     { this._tone('square', 800, 200, 0.15, 0.2); }
  alienDie()  { this._noise(0.35, 'bandpass', 600, 0.3); }
  playerDie() { this._noise(0.9, 'lowpass', 600, 0.4); }
  ufoDie()    { this._tone('square', 700, 80, 0.5, 0.2); }

  // March beat: 800 ms with 50 aliens alive, down to 100 ms with 1 alive.
  static marchInterval(alive, total) {
    return Math.max(100, Math.round(800 * alive / total));
  }

  startMarch(alive, total) {
    this.stopMarch();
    this.marchIntervalMs = AudioManager.marchInterval(alive, total);
    this.marchTimer = setInterval(() => {
      if (!this.ctx) return;
      const freq = MARCH_FREQS[this.marchStep % 4];
      this._tone('square', freq, freq, 0.08, 0.15);
      this.marchStep++;
    }, this.marchIntervalMs);
  }

  stopMarch() {
    if (this.marchTimer !== null) {
      clearInterval(this.marchTimer);
      this.marchTimer = null;
    }
  }

  // Called every frame while playing. Restarts the timer only when the tempo changes.
  updateMarchTempo(alive, total) {
    const wanted = AudioManager.marchInterval(alive, total);
    if (this.marchTimer === null || wanted !== this.marchIntervalMs) {
      this.startMarch(alive, total);
    }
  }

  startUfo() {
    if (!this.ctx || this.ufoOsc) return;          // already playing
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    lfoGain.gain.value = 120;
    gain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    lfo.start();
    osc.start();
    this.ufoOsc = osc;
    this.ufoLfo = lfo;
  }

  // Safe to call many times, even when nothing is playing.
  stopUfo() {
    if (!this.ufoOsc) return;
    try { this.ufoOsc.stop(); } catch (e) { /* already stopped */ }
    try { this.ufoLfo.stop(); } catch (e) { /* already stopped */ }
    this.ufoOsc = null;
    this.ufoLfo = null;
  }
}

export const audio = new AudioManager();
```

### A.6 `src/entities/entity.js`

```js
// Base class for every game object. x, y is the TOP-LEFT corner.
export class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dead = false;          // set to true to have the engine remove it
  }

  update(dt) {}
  draw(ctx) {}
}

// true when two rectangles overlap (AABB test).
export function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}
```

### A.7 `src/entities/player.js`

```js
import { Entity } from './entity.js';
import { drawSprite, PLAYER_SPRITE } from '../sprites.js';
import {
  CANVAS_WIDTH, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_Y, PLAYER_SPEED,
  INVULNERABLE_DURATION, COLORS,
} from '../constants.js';
import { input } from '../input.js';

export class Player extends Entity {
  constructor() {
    super(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.invulnerable = 0;      // ms of invulnerability left
  }

  update(dt) {
    if (this.dead) return;
    const step = PLAYER_SPEED * (dt / 1000);
    if (input.isLeft()) this.x = Math.max(0, this.x - step);
    if (input.isRight()) this.x = Math.min(CANVAS_WIDTH - this.width, this.x + step);
    if (this.invulnerable > 0) this.invulnerable -= dt;
  }

  draw(ctx) {
    // Blink while invulnerable: hidden on every other 150 ms slice.
    if (this.invulnerable > 0 && Math.floor(Date.now() / 150) % 2 === 0) return;
    drawSprite(ctx, this.x, this.y, this.width, this.height, PLAYER_SPRITE, COLORS.green);
  }

  respawn() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.dead = false;
    this.invulnerable = INVULNERABLE_DURATION;
  }

  isInvulnerable() { return this.invulnerable > 0; }
}
```

### A.8 `src/entities/alien.js`

```js
import { Entity } from './entity.js';
import {
  drawSprite, SQUID_A, SQUID_B, CRAB_A, CRAB_B, OCTOPUS_A, OCTOPUS_B,
} from '../sprites.js';
import {
  ALIEN_WIDTH, ALIEN_HEIGHT, ALIEN_ANIM_INTERVAL,
  SCORE_SQUID, SCORE_CRAB, SCORE_OCTOPUS, COLORS,
} from '../constants.js';

const TYPES = [
  { frames: [SQUID_A, SQUID_B], score: SCORE_SQUID },       // rows 0-1
  { frames: [CRAB_A, CRAB_B], score: SCORE_CRAB },          // rows 2-3
  { frames: [OCTOPUS_A, OCTOPUS_B], score: SCORE_OCTOPUS }, // row 4
];

export class Alien extends Entity {
  constructor(x, y, row, col) {
    super(x, y, ALIEN_WIDTH, ALIEN_HEIGHT);
    this.row = row;
    this.col = col;
    const typeIndex = row <= 1 ? 0 : row <= 3 ? 1 : 2;
    this.frames = TYPES[typeIndex].frames;
    this.score = TYPES[typeIndex].score;
  }

  // Empty on purpose: the ENGINE moves all aliens together.
  update(dt) {}

  draw(ctx) {
    const frame = Math.floor(Date.now() / ALIEN_ANIM_INTERVAL) % 2;
    drawSprite(ctx, this.x, this.y, this.width, this.height, this.frames[frame], COLORS.white);
  }
}
```

### A.9 `src/entities/bullet.js`

```js
import { Entity } from './entity.js';
import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED, COLORS } from '../constants.js';

// Player bullet. (x, y) passed in is the TIP of the cannon; the bullet is centred on x.
export class Bullet extends Entity {
  constructor(x, y) {
    super(x - BULLET_WIDTH / 2, y - BULLET_HEIGHT, BULLET_WIDTH, BULLET_HEIGHT);
  }

  update(dt) {
    this.y -= BULLET_SPEED * (dt / 1000);
    if (this.y + this.height < 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = COLORS.white;
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}
```

### A.10 `src/entities/alienBullet.js`

```js
import { Entity } from './entity.js';
import {
  ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT, ALIEN_BULLET_SPEED, CANVAS_HEIGHT, COLORS,
} from '../constants.js';

// Alien bullet. (x, y) passed in is the bottom-centre of the alien that fired.
export class AlienBullet extends Entity {
  constructor(x, y) {
    super(x - ALIEN_BULLET_WIDTH / 2, y, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
  }

  update(dt) {
    this.y += ALIEN_BULLET_SPEED * (dt / 1000);
    if (this.y > CANVAS_HEIGHT) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = COLORS.alienBullet;
    ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
  }
}
```

### A.11 `src/entities/explosion.js`

```js
import { Entity } from './entity.js';
import { EXPLOSION_DURATION, COLORS } from '../constants.js';

// A fading orange star. Takes the RECTANGLE of the thing that exploded.
export class Explosion extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.timer = 0;
  }

  update(dt) {
    this.timer += dt;
    if (this.timer >= EXPLOSION_DURATION) this.dead = true;
  }

  draw(ctx) {
    const progress = this.timer / EXPLOSION_DURATION;          // 0 -> 1
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const radius = (this.width / 2) * (1 + progress * 0.5);
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress);
    ctx.fillStyle = COLORS.explosion;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const len = radius * (0.5 + 0.5 * Math.sin(i * 3 + this.timer * 0.01));
      const px = cx + Math.cos(angle) * len;
      const py = cy + Math.sin(angle) * len;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
```

### A.12 `src/entities/shield.js`

```js
import { Entity } from './entity.js';
import { SHIELD_COLS, SHIELD_ROWS, SHIELD_BLOCK_SIZE, COLORS } from '../constants.js';

// A bunker made of a grid of small blocks. blocks[row][col] === true means the block exists.
export class Shield extends Entity {
  constructor(x, y) {
    super(x, y, SHIELD_COLS * SHIELD_BLOCK_SIZE, SHIELD_ROWS * SHIELD_BLOCK_SIZE);
    this.blocks = [];
    for (let r = 0; r < SHIELD_ROWS; r++) {
      const row = [];
      for (let c = 0; c < SHIELD_COLS; c++) {
        // Cut an arch out of the bottom middle: bottom 2 rows, columns 4 to 7.
        const isArch = r >= SHIELD_ROWS - 2 && c >= 4 && c <= 7;
        row.push(!isArch);
      }
      this.blocks.push(row);
    }
  }

  // Erases every block that overlaps the rectangle. Returns true if at least one was erased.
  _erase(x, y, w, h) {
    let hit = false;
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (!this.blocks[r][c]) continue;
        const bx = this.x + c * SHIELD_BLOCK_SIZE;
        const by = this.y + r * SHIELD_BLOCK_SIZE;
        if (x < bx + SHIELD_BLOCK_SIZE && x + w > bx &&
            y < by + SHIELD_BLOCK_SIZE && y + h > by) {
          this.blocks[r][c] = false;
          hit = true;
        }
      }
    }
    return hit;
  }

  // For bullets: true means "a block was hit, kill the bullet".
  hitTest(x, y, w, h) { return this._erase(x, y, w, h); }

  // For aliens walking through the shield.
  eraseOverlap(x, y, w, h) { this._erase(x, y, w, h); }

  draw(ctx) {
    ctx.fillStyle = COLORS.green;
    for (let r = 0; r < SHIELD_ROWS; r++) {
      for (let c = 0; c < SHIELD_COLS; c++) {
        if (this.blocks[r][c]) {
          ctx.fillRect(this.x + c * SHIELD_BLOCK_SIZE, this.y + r * SHIELD_BLOCK_SIZE,
                       SHIELD_BLOCK_SIZE, SHIELD_BLOCK_SIZE);
        }
      }
    }
  }
}
```

### A.13 `src/entities/ufo.js`

```js
import { Entity } from './entity.js';
import { drawSprite, UFO_SPRITE } from '../sprites.js';
import {
  UFO_WIDTH, UFO_HEIGHT, UFO_SPEED, UFO_Y, UFO_SCORES, CANVAS_WIDTH, COLORS,
} from '../constants.js';

// Mystery ship. Starts just off one side of the screen and flies to the other.
export class UFO extends Entity {
  constructor() {
    const goRight = Math.random() < 0.5;
    super(goRight ? -UFO_WIDTH : CANVAS_WIDTH, UFO_Y, UFO_WIDTH, UFO_HEIGHT);
    this.direction = goRight ? 1 : -1;
    this.score = UFO_SCORES[Math.floor(Math.random() * UFO_SCORES.length)];
  }

  update(dt) {
    this.x += this.direction * UFO_SPEED * (dt / 1000);
    if (this.direction === 1 && this.x > CANVAS_WIDTH) this.dead = true;
    if (this.direction === -1 && this.x + this.width < 0) this.dead = true;
  }

  draw(ctx) {
    drawSprite(ctx, this.x, this.y, this.width, this.height, UFO_SPRITE, COLORS.red);
  }
}
```

### A.14 `src/engine.js`

This is the largest file. If you cannot write it in one go, write Part 1 to create the file, then append Parts 2, 3 and 4 **in order** without changing them. Joined together, the four parts are the whole file.

#### Part 1 of 4 — imports, helper functions, constructor, key handling, setup

```js
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
```

#### Part 2 of 4 — main loop, update, movement, shooting, UFO

```js
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
```

#### Part 3 of 4 — collisions, game conditions, waves, game over

```js
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
```

#### Part 4 of 4 — drawing and the entry point

```js
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
```
