# Build Plan — Space Invaders (vanilla ES Modules)

No build step, no dependencies. `index.html` loads `src/engine.js` (an ES Module), which imports
everything else. PDD architecture is followed file-for-file.

## Coordinate layout — the numbers that must agree

Canvas is **800 × 600**. Every position below is derived from a handful of constants so the pieces
cannot overlap or sit below the ground.

| Thing | Value | Where it comes from |
|---|---|---|
| Ground line `GROUND_Y` | **560** | fixed |
| Player height | 24 px (8 rows × 3 px) | `PLAYER_HEIGHT` |
| Player top `PLAYER_Y` | **536** | `GROUND_Y - PLAYER_HEIGHT` → cannon bottom = **560** = on the line, *not below it* |
| Player width | 39 px (13 cols × 3 px) | `PLAYER_WIDTH` |
| Shield block / grid | 6 px, 6 rows × 12 cols → **72 × 36** | `SHIELD_BLOCK/ROWS/COLS` |
| Shield top `SHIELD_Y` | **484** | `GROUND_Y - SHIELD_BOTTOM_GAP(40) - SHIELD_HEIGHT(36)` → bottom **520**, player top **536** (16 px clear) |
| Alien cell | **36 × 24**, gaps 20 (col) / 16 (row) | `ALIEN_WIDTH/HEIGHT/COL_GAP/ROW_GAP` |
| Alien row height | **40** | `ALIEN_HEIGHT + ALIEN_ROW_GAP` |
| Alien start `ALIEN_START_X/Y` | **130 / 70** | formation width `10×36 + 9×20 = 540`, centered |
| Alien bottom, wave 1 | **254** | `70 + 4×40 + 24` → above shields (484) ✓ |
| Alien bottom, max descent | **374** | `254 + 3×40` (cap `MAX_WAVE_DESCENT = 3`) → still above shields ✓ |
| UFO | **48 × 21**, y = 40 | `UFO_WIDTH/HEIGHT/Y`; bottom 61 < alien top 70 ✓ |

**Invariants checked in Step 2** (must all be `true`):
`PLAYER_Y + PLAYER_HEIGHT === GROUND_Y`,
`SHIELD_Y + SHIELD_HEIGHT < PLAYER_Y`,
`(alien bottom at max descent) < SHIELD_Y`,
`ALIEN_SCORE.length === ALIEN_ROWS`.

## Step-by-step plan

### Step 1 — `index.html`
DOM shell: `<canvas id="game" width="800" height="600">`, three overlays
(`#start-overlay`, `#wave-overlay` with `#wave-text`, `#gameover-overlay` with `#final-score`,
`#new-hiscore`, `#restart-button`), and `<script type="module" src="./src/engine.js">`.
HUD (score/hi-score/wave/lives) is drawn **on the canvas**; the DOM only hosts overlays.

**Check:** `python3 -m http.server` then `curl -s localhost:PORT | grep 'canvas id="game"'` matches.

### Step 2 — `src/constants.js`
Exports every numeric tuning value as a named `const`: `CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_Y,
PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_START_X, PLAYER_Y, LIVES, RESPAWN_DELAY,
INVULNERABLE_DURATION, BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED, ALIEN_BULLET_WIDTH,
ALIEN_BULLET_HEIGHT, ALIEN_BULLET_SPEED, ALIEN_ROWS, ALIEN_COLS, ALIEN_WIDTH, ALIEN_HEIGHT,
ALIEN_COL_GAP, ALIEN_ROW_GAP, ALIEN_ROW_HEIGHT, ALIEN_START_X, ALIEN_START_Y, ALIEN_SPEED_X,
ALIEN_SPEED_X_MAX, ALIEN_SPEED_Y, ALIEN_FRAME_MS, ALIEN_SHOOT_INTERVAL, ALIEN_SCORE,
MAX_WAVE_DESCENT, SHIELD_COUNT, SHIELD_ROWS, SHIELD_COLS, SHIELD_BLOCK, SHIELD_WIDTH,
SHIELD_HEIGHT, SHIELD_Y, SHIELD_BOTTOM_GAP, UFO_WIDTH, UFO_HEIGHT, UFO_Y, UFO_SPEED,
UFO_MIN_INTERVAL, UFO_MAX_INTERVAL, UFO_SCORES, FRAME_MS, WAVE_TRANSITION_DURATION, PIXEL_SIZE`.

**Check:** `node --input-type=module -e "const c=await import('./src/constants.js'); ..."` — print
`GROUND_Y`, `PLAYER_Y` and assert all four invariants above are `true`.

### Step 3 — `src/sprites.js`
Exports `SQUID_A, SQUID_B, CRAB_A, CRAB_B, OCTOPUS_A, OCTOPUS_B, PLAYER_SPRITE, UFO_SPRITE`
(arrays of strings) and `drawSprite(ctx, x, y, w, h, pixels, color, pixel = PIXEL_SIZE)` which
renders each `'X'` as a `pixel × pixel` rect centered inside the `w × h` box.

**Check:** node script imports, asserts every row in each sprite has the same length, and
`typeof drawSprite === 'function'`.

### Step 4 — `src/entities/entity.js`
Exports `class Entity` (constructor `x,y,w,h`; `dead=false`; `update(dt){}`; `draw(ctx){}`;
`overlaps(other)`) and `function overlaps(a, b)` (AABB).

**Check:** node script: two overlapping rects return `true`, two disjoint return `false`.

### Step 5 — `src/entities/player.js`
Exports `class Player extends Entity`. `update(dt)` reads the `input` singleton, moves by
`PLAYER_SPEED`, and clamps x to `[0, CANVAS_WIDTH - PLAYER_WIDTH]`. `draw` uses `PLAYER_SPRITE` green.

**Check:** node script constructs a `Player`, asserts `w===39`, `h===24`, and x clamps.

### Step 6 — `src/entities/alien.js`
Exports `class Alien extends Entity` (constructor `x,y,row,col`). Picks frames/color by row
(0–1 squid, 2–3 crab, 4 octopus). `update` is a no-op (engine moves the group); `draw` toggles
frames on `Date.now()/ALIEN_FRAME_MS % 2`.

**Check:** node script constructs one alien per row, asserts frame/color assignment.

### Step 7 — `src/entities/bullet.js` + `src/entities/alienBullet.js`
Exports `class Bullet` (moves up at `BULLET_SPEED`, dies off top, white) and
`class AlienBullet` (moves down at `ALIEN_BULLET_SPEED`, dies off bottom, red).

**Check:** node script asserts a Bullet's y decreases and an AlienBullet's y increases after `update(16)`.

### Step 8 — `src/entities/explosion.js`
Exports `class Explosion extends Entity` (constructor `x,y,color` = center); `age`/`duration=400`,
`dead` when done; `draw` expands a fading square.

**Check:** node script asserts `dead` false then true after `update(500)`.

### Step 9 — `src/entities/shield.js`
Exports `class Shield extends Entity`. `this.blocks[r][c]` boolean grid. `hitTest(x,y,w,h)` erases
covered blocks and returns `true` on any hit; `eraseOverlap(x,y,w,h)` erases silently; `draw` paints
6×6 green blocks (1 px inset).

**Check:** node script builds a shield, calls `hitTest` over its top-left, asserts it returns `true`
and `blocks[0][0] === false`.

### Step 10 — `src/entities/ufo.js`
Exports `class Ufo extends Entity` (constructor `x,y,dir`). Random `bonus` from `UFO_SCORES`.
`update` moves horizontally at `UFO_SPEED`, dies off-screen. `draw` uses `UFO_SPRITE` red.

**Check:** node script asserts width/height and a valid bonus in `UFO_SCORES`.

### Step 11 — `src/input.js`
Exports `class InputHandler` (tracks `down`/`pressed` sets; `isLeft()`, `isRight()`, `isFire()`,
`consumeFire()`, `endFrame()`) and singleton `const input`.

**Check:** browser check deferred to Step 14; node check confirms the file exports both symbols.

### Step 12 — `src/audio.js`
Exports `class AudioManager` (`unlock`, `shoot`, `alienDeath`, `playerDeath`, `march`, `ufoStart`,
`ufoStop`, `ufoDeath`) and singleton `const audio`. No `AudioContext` until `unlock()`.

**Check:** node script imports, asserts every method exists and `audio.ctx === null` before `unlock()`.

### Step 13 — `src/engine.js`
Exports `class GameEngine` (constructor takes the canvas and starts the RAF loop), plus a guarded
auto-boot `if (typeof document !== 'undefined') { window.game = new GameEngine(document.getElementById('game')) }`.
State machine `START → PLAYING → WAVE_TRANSITION → PLAYING` / `→ GAMEOVER`; engine moves the alien
group (`speed = min(MAX, BASE·√(total/alive))` px/frame → px/s), handles timers, collisions, scoring,
respawn, wave progression, UFO, and draws HUD + ground line on canvas.

**Check:** `node --check src/engine.js` passes; then headless Chrome loads it with no console errors.

### Step 14 — Headless Chrome end-to-end
Serve with `python3 -m http.server`, drive headless Chrome over CDP (Node built-in WebSocket),
`Page.captureScreenshot` the canvas **after dispatching Space (start) and Space again (fire)**.
Review the image against the PRD: formation on top, four shields mid-screen, cannon on the ground
line, HUD present. Fix any placement/overlap problems and re-screenshot.
