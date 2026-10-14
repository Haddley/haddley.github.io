# Architecture & Build Plan — Space Invaders (invaders-hybrid)

This is the step-by-step build plan. Each step names the exact files, the exported
names, and a check to run. All layout numbers below are the **single source of
truth** and are cross-checked so they agree with each other.

## Layout contract (numbers must agree)

Canvas is **800 × 600**. All coordinates are in canvas pixels.

| Quantity | Value |
|---|---|
| Canvas size | 800 × 600 |
| HUD band (score / hi-score / wave / lives) | y ∈ [0, 40) |
| **Ground line** `GROUND_Y` | **560** |
| Player cannon size | 39 × 24 |
| Player cannon position | bottom on the ground line: `y = GROUND_Y − PLAYER_HEIGHT = 536`, start x = 380 (centred) |
| Alien formation | 5 rows × 10 cols |
| Alien bounding box | 36 × 24 |
| Alien gaps | 12 px between columns, 16 px between rows (row pitch = 40) |
| Alien formation origin | top y = 64, left x = 166 |
| Alien row *i* top | `64 + 40·i` (rows 0–4 → 64, 104, 144, 184, 224) |
| Alien formation bottom (wave 0) | `64 + 4·40 + 24 = 248` |
| Max wave descent | 3 rows → lowest alien bottom `248 + 120 = 368` |
| Shield size | 72 × 36 (12 cols × 6 rows of 6×6 px blocks) |
| Shield y | 440 (bottom 476) |
| Shield x (left edges, 4 shields) | 106, 278, 450, 622 |
| UFO box | 48 × 20, y = 56 |
| Player bullet | 4 × 12, travels up |
| Alien bullet | 4 × 12, travels down |

**Invariants that prove the numbers agree:**
- Player bottom = 560 (on the ground line, never below it).
- Lowest alien bottom at max descent (368) is above shield top (440) → 72 px clearance.
- Shield bottom (476) is above player top (536) → 60 px clearance.
- Rightmost shield right edge `622 + 72 = 694` < 800; leftmost `106` > 0.

---

## Step 1 — Scaffold + all tuning constants

**Files:** `package.json`, `src/constants.js`

**Exports (constants.js, named):**
`CANVAS_WIDTH`, `CANVAS_HEIGHT`, `HUD_HEIGHT`, `GROUND_Y`,
`PLAYER_WIDTH`, `PLAYER_HEIGHT`, `PLAYER_START_X`, `PLAYER_SPEED`,
`PLAYER_LIVES`, `RESPAWN_DELAY`, `INVULNERABLE_DURATION`,
`PLAYER_BULLET_SPEED`, `PLAYER_BULLET_WIDTH`, `PLAYER_BULLET_HEIGHT`,
`ALIEN_COLS`, `ALIEN_ROWS`, `ALIEN_WIDTH`, `ALIEN_HEIGHT`,
`ALIEN_COL_GAP`, `ALIEN_ROW_GAP`, `ALIEN_FORMATION_TOP`, `ALIEN_FORMATION_LEFT`,
`ALIEN_SPEED_X`, `ALIEN_SPEED_MAX`, `ALIEN_SPEED_Y`, `ALIEN_WALL_MARGIN`,
`MAX_WAVE_DESCENT`, `ALIEN_SHOOT_INTERVAL`,
`ALIEN_BULLET_SPEED`, `ALIEN_BULLET_WIDTH`, `ALIEN_BULLET_HEIGHT`,
`SHIELD_COUNT`, `SHIELD_ROWS`, `SHIELD_COLS`, `SHIELD_BLOCK`,
`SHIELD_WIDTH`, `SHIELD_HEIGHT`, `SHIELD_Y`, `SHIELD_GAP`, `SHIELD_LEFT`,
`UFO_MIN_INTERVAL`, `UFO_MAX_INTERVAL`, `UFO_WIDTH`, `UFO_HEIGHT`, `UFO_Y`,
`UFO_SPEED`, `UFO_SCORES`,
`SQUID_SCORE`, `CRAB_SCORE`, `OCTOPUS_SCORE`, `MARCH_BASE_INTERVAL`.

Use the values in the layout contract above, plus: `HUD_HEIGHT=40`,
`PLAYER_SPEED=0.25` (px/ms), `PLAYER_LIVES=3`, `RESPAWN_DELAY=1500`,
`INVULNERABLE_DURATION=2000`, `PLAYER_BULLET_SPEED=0.45`,
`ALIEN_SPEED_X=0.04`, `ALIEN_SPEED_MAX=0.12`, `ALIEN_SPEED_Y=10`,
`ALIEN_WALL_MARGIN=20`, `MAX_WAVE_DESCENT=3`, `ALIEN_SHOOT_INTERVAL=1500`,
`ALIEN_BULLET_SPEED=0.12`, `SHIELD_ROWS=6`, `SHIELD_COLS=12`, `SHIELD_BLOCK=6`,
`SHIELD_WIDTH=72`, `SHIELD_HEIGHT=36`, `SHIELD_Y=440`, `SHIELD_GAP=100`,
`SHIELD_LEFT=106`, `UFO_MIN_INTERVAL=15000`, `UFO_MAX_INTERVAL=25000`,
`UFO_WIDTH=48`, `UFO_HEIGHT=20`, `UFO_Y=56`, `UFO_SPEED=0.12`,
`UFO_SCORES=[50,100,150,300]`, `SQUID_SCORE=30`, `CRAB_SCORE=20`,
`OCTOPUS_SCORE=10`, `MARCH_BASE_INTERVAL=800`.

`package.json` contains only `{"type":"module","name":"invaders-hybrid","private":true}`
(no dependencies, no scripts — needed so Node can `import` the ES modules for checks).

**Check:**
```bash
node --input-type=module -e '
const c = await import("./src/constants.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(c.CANVAS_WIDTH===800 && c.CANVAS_HEIGHT===600, "canvas 800x600");
ok(c.ALIEN_ROWS===5 && c.ALIEN_COLS===10, "5x10 formation");
ok(c.GROUND_Y===560, "ground line 560");
ok(c.GROUND_Y - c.PLAYER_HEIGHT === 536, "player top 536");
const pitch = c.ALIEN_HEIGHT + c.ALIEN_ROW_GAP;
const alienBottom = c.ALIEN_FORMATION_TOP + (c.ALIEN_ROWS-1)*pitch + c.ALIEN_HEIGHT;
ok(alienBottom + c.MAX_WAVE_DESCENT*pitch < c.SHIELD_Y, "aliens stay above shields at max descent");
ok(c.SHIELD_Y + c.SHIELD_HEIGHT < c.GROUND_Y - c.PLAYER_HEIGHT, "shields above player");
const lastRight = c.SHIELD_LEFT + (c.SHIELD_COUNT-1)*(c.SHIELD_WIDTH + c.SHIELD_GAP) + c.SHIELD_WIDTH;
ok(c.SHIELD_LEFT > 0 && lastRight < c.CANVAS_WIDTH, "shields inside canvas");
console.log("PASS");
'
```

---

## Step 2 — Pixel sprites + `drawSprite`

**File:** `src/sprites.js`

**Exports (named):**
`drawSprite(ctx, x, y, w, h, pixels, color)`, `PLAYER_SPRITE`,
`ALIEN_SQUID_A`, `ALIEN_SQUID_B`, `ALIEN_CRAB_A`, `ALIEN_CRAB_B`,
`ALIEN_OCTOPUS_A`, `ALIEN_OCTOPUS_B`, `UFO_SPRITE`.

Sprites are arrays of equal-length strings; `'X'` = filled, `' '` = empty.
`drawSprite` scales the character grid to fit the bounding box `w × h`
(render each `'X'` as a filled cell), centered within `(x, y, w, h)`.
Squid/crab/octopus each have two distinct frames (A/B). `UFO_SPRITE` is a
wide saucer shape. No image files; no DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const s = await import("./src/sprites.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
for (const k of ["PLAYER_SPRITE","ALIEN_SQUID_A","ALIEN_SQUID_B","ALIEN_CRAB_A","ALIEN_CRAB_B","ALIEN_OCTOPUS_A","ALIEN_OCTOPUS_B","UFO_SPRITE"]) {
  ok(Array.isArray(s[k]) && s[k].length>0, k+" is non-empty array");
  ok(s[k].every(r => r.length===s[k][0].length), k+" rows equal length");
}
ok(typeof s.drawSprite==="function", "drawSprite is function");
console.log("PASS");
'
```

---

## Step 3 — Base entity + AABB helper + input

**Files:** `src/entity.js`, `src/input.js`

**Exports:**
- `entity.js`: `class Entity { constructor(x,y,width,height); update(dt); draw(ctx); }`,
  and `overlaps(a, b)` (AABB test). `dead` defaults to `false`; `dead` entities
  are filtered by the engine, not here.
- `input.js`: `class InputHandler` with methods `left()`, `right()`,
  `consumeFire()` (edge-triggered: returns `true` once per Space press, then
  clears), plus the singleton `export const input = new InputHandler()`.
  Keys: ArrowLeft / `a` = left, ArrowRight / `d` = right, Space = fire.
  **Guard all `window.addEventListener` calls with `typeof window !== "undefined"`**
  so the module imports cleanly under Node (for checks). No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const e = await import("./src/entity.js");
const inp = await import("./src/input.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(typeof e.Entity==="function" && typeof e.overlaps==="function", "Entity + overlaps exported");
const a = new e.Entity(0,0,10,10), b = new e.Entity(5,5,10,10), c = new e.Entity(20,20,5,5);
ok(e.overlaps(a,b)===true && e.overlaps(a,c)===false, "AABB overlap works");
ok(a.dead===false && typeof a.update==="function" && typeof a.draw==="function", "Entity shape");
ok(typeof inp.input==="object" && typeof inp.input.left==="function" && typeof inp.input.consumeFire==="function", "input singleton");
console.log("PASS");
'
```

---

## Step 4 — Audio (all synthesized, Web Audio)

**File:** `src/audio.js`

**Exports:** `class AudioManager` and singleton `export const audio = new AudioManager()`.

Methods: `unlock()`, `playPlayerShoot()`, `playAlienDeath()`, `playPlayerDeath()`,
`playMarch(step)` (step 0–3 of the 4-note sequence), `startUfoLoop()`,
`stopUfoLoop()`, `playUfoDeath()`.

Synthesis per PDD §9: player shoot = square 800→200 Hz / 150 ms; alien death =
noise bandpass 600 Hz / 350 ms; player death = noise lowpass 600 Hz / 900 ms;
march = square 4 steps [320,260,220,190 Hz] / 80 ms each; UFO loop = sawtooth
400 Hz with 8 Hz sine LFO ±120 Hz; UFO death = square 700→80 Hz / 500 ms.
**Create the `AudioContext` lazily** (on `unlock()` / first play) and guard with
`typeof window !== "undefined"`, so the module imports cleanly under Node. No
audio files.

**Check:**
```bash
node --input-type=module -e '
const a = await import("./src/audio.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(typeof a.AudioManager==="function", "AudioManager exported");
const names = ["unlock","playPlayerShoot","playAlienDeath","playPlayerDeath","playMarch","startUfoLoop","stopUfoLoop","playUfoDeath"];
ok(names.every(n => typeof a.audio[n]==="function"), "all methods present");
console.log("PASS");
'
```

---

## Step 5 — Player cannon

**File:** `src/player.js`

**Exports:** `class Player extends Entity`.

- Constructor places the cannon so its **bottom rests exactly on the ground
  line**: `this.y = GROUND_Y - PLAYER_HEIGHT`, `this.x = PLAYER_START_X`.
- `update(dt)`: move left/right from `input` at `PLAYER_SPEED`, clamp to
  `[0, CANVAS_WIDTH - PLAYER_WIDTH]`. Track `invulnerableUntil` (blink by
  skipping draw on alternating 100 ms while invulnerable).
- `respawn()`: reset x to centre and set `invulnerableUntil = now + INVULNERABLE_DURATION`.
- `draw(ctx)`: render `PLAYER_SPRITE` with `drawSprite`.
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const P = await import("./src/player.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
const p = new P.Player();
ok(p.y + p.height === 560, "cannon bottom on ground line (560)");
ok(p.x + p.width <= 800 && p.x >= 0, "cannon inside canvas");
ok(typeof p.respawn==="function", "respawn exists");
console.log("PASS");
'
```

---

## Step 6 — Alien (type → score, two frames, no-op update)

**File:** `src/alien.js`

**Exports:** `class Alien extends Entity`.

- Constructor `(x, y, row)`: derive visual type and score from `row`:
  rows 0–1 → squid (30), rows 2–3 → crab (20), row 4 → octopus (10)
  (i.e. `type = Math.floor(row / 2)`).
- `update(dt)` is a **no-op** (movement is engine-managed per PDD §5).
- `draw(ctx)`: pick frame A/B via `Math.floor(Date.now()/500) % 2` and draw the
  matching sprite with `drawSprite`.
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const A = await import("./src/alien.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(new A.Alien(0,0,0).score===30 && new A.Alien(0,0,1).score===30, "rows 0-1 squid=30");
ok(new A.Alien(0,0,2).score===20 && new A.Alien(0,0,3).score===20, "rows 2-3 crab=20");
ok(new A.Alien(0,0,4).score===10, "row 4 octopus=10");
const al = new A.Alien(10,10,0); al.update(16); ok(al.x===10 && al.y===10, "update is no-op");
console.log("PASS");
'
```

---

## Step 7 — Bullets (player up, alien down)

**Files:** `src/bullet.js`, `src/alienBullet.js`

**Exports:** `class Bullet extends Entity` (player, moves up at `PLAYER_BULLET_SPEED`),
`class AlienBullet extends Entity` (moves down at `ALIEN_BULLET_SPEED`).

- `update(dt)`: move vertically; set `this.dead = true` when off the canvas
  (player bullet above y < 0; alien bullet below y > `CANVAS_HEIGHT`).
- `draw(ctx)`: small filled rectangle (player bullet white/cyan, alien bullet
  white — solid rectangle, not a sprite).
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const b = await import("./src/bullet.js");
const ab = await import("./src/alienBullet.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
const p = new b.Bullet(100,300); p.update(16); ok(p.y < 300, "player bullet moves up");
const e = new ab.AlienBullet(100,300); e.update(16); ok(e.y > 300, "alien bullet moves down");
ok(new b.Bullet(100,-50).dead===false, "not yet offscreen");
console.log("PASS");
'
```

---

## Step 8 — Explosion

**File:** `src/explosion.js`

**Exports:** `class Explosion extends Entity`.

- Timed lifetime (e.g. ~350 ms). `update(dt)`: advance timer; set `this.dead = true`
  when expired.
- `draw(ctx)`: an expanding/fading shape (concentric squares or shrinking
  cross) sized by remaining life. Small and self-contained.
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const E = await import("./src/explosion.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
const e = new E.Explosion(100,100);
ok(e.dead===false, "starts alive");
for (let i=0;i<1000;i++) e.update(16);
ok(e.dead===true, "expires");
console.log("PASS");
'
```

---

## Step 9 — Shield (block grid, hitTest, eraseOverlap)

**File:** `src/shield.js`

**Exports:** `class Shield extends Entity`.

- `this.blocks[row][col]` boolean grid of `SHIELD_ROWS × SHIELD_COLS`
  (6 × 12), each block `SHIELD_BLOCK` (6) px. Total 72 × 36.
- `hitTest(x, y, w, h)`: map a rect to block coords, erase overlapping blocks,
  return `true` if any block was erased (stops the bullet).
- `eraseOverlap(x, y, w, h)`: erase all blocks covered by a rect (alien descent).
- `draw(ctx)`: green filled blocks for live cells (arcade shield color).
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const S = await import("./src/shield.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
const sh = new S.Shield(106,440);
ok(sh.blocks.length===6 && sh.blocks[0].length===12, "6x12 grid");
ok(sh.width===72 && sh.height===36, "72x36 size");
const hit = sh.hitTest(106,440,6,6);
ok(hit===true && sh.blocks[0][0]===false, "hitTest erases block");
sh.eraseOverlap(106,440,72,36);
ok(sh.blocks.every(r=>r.every(c=>c===false)), "eraseOverlap clears all");
console.log("PASS");
'
```

---

## Step 10 — UFO

**File:** `src/ufo.js`

**Exports:** `class UFO extends Entity`.

- On construction pick `this.score` at random from `UFO_SCORES`
  (50/100/150/300). Spawn at `y = UFO_Y` (56), one side of the screen, moving
  horizontally at `UFO_SPEED`.
- `update(dt)`: move horizontally; `this.dead = true` when it leaves the canvas.
- `draw(ctx)`: render `UFO_SPRITE` with `drawSprite`.
- No DOM at import time.

**Check:**
```bash
node --input-type=module -e '
const U = await import("./src/ufo.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
for (let i=0;i<50;i++){ const u = new U.UFO(); ok([50,100,150,300].includes(u.score), "score in UFO_SCORES"); }
const u = new U.UFO(); const y0=u.y; u.update(16); ok(u.y===y0, "UFO stays at y"); 
console.log("PASS");
'
```

---

## Step 11 — GameEngine (state machine, loop, collisions, waves, HUD)

**File:** `src/engine.js`

**Exports:** `class GameEngine`. Methods: `init(canvas)`, `run()`, `start()`,
`restart()`, `update(dt)`, `draw()`, `checkCollisions()`, `checkGameConditions()`,
`endGame()`, `_startNextWave()`, `_spawnWave()`, `_spawnUfo()`, `_firePlayerBullet()`.

- State machine: `START → PLAYING → WAVE_TRANSITION → PLAYING`, and
  `PLAYING → GAMEOVER`. State is a string; `START` skips `update()`;
  `WAVE_TRANSITION` draws + "WAVE N" overlay for 1500 ms then `_startNextWave()`;
  `GAMEOVER` keeps `requestAnimationFrame` alive but stops update/draw.
- `mainLoop(ts)` uses `deltaTime = ts - lastTime` (ms) and passes it to every
  `update(dt)`.
- Store all live entities in one `this.entities` array; each frame update all,
  filter `dead`, then draw.
- `_spawnWave()`: build the 5×10 formation using `ALIEN_FORMATION_TOP/LEFT`,
  gaps, and `waveYOffset = min(wave, MAX_WAVE_DESCENT) * (ALIEN_HEIGHT + ALIEN_ROW_GAP)`;
  place 4 shields at `SHIELD_LEFT + i*(SHIELD_WIDTH + SHIELD_GAP)`, `y = SHIELD_Y`;
  keep shields **and** the player across waves (do not reset shields).
- Alien group movement (PDD §5): `speed = min(ALIEN_SPEED_MAX, ALIEN_SPEED_X * sqrt(total/alive))`;
  if any alive alien would cross the edge (within `ALIEN_WALL_MARGIN`), step all
  down by `ALIEN_SPEED_Y` and flip direction; else move all by `speed * direction`.
- Alien fire: every `ALIEN_SHOOT_INTERVAL` ms, pick a random bottom-row alive
  alien and spawn an `AlienBullet` from its centre.
- March sound: play 4-note march at interval `max(100, MARCH_BASE_INTERVAL * alive/total)` ms.
- Player fire: on `input.consumeFire()`, if no player bullet is in flight, spawn
  a `Bullet` from the cannon top; `playPlayerShoot()`.
- `checkCollisions()` per PDD §6 (bullet↔alien/UFO/shield, alienBullet↔shield/player,
  alien rect↔shield descent erosion); skip player collision while invulnerable;
  spawn `Explosion` + sounds; award `SQUID_SCORE/CRAB_SCORE/OCTOPUS_SCORE` or UFO score.
- `checkGameConditions()`: all aliens dead → `WAVE_TRANSITION`; any alien reaches
  `GROUND_Y` → `endGame()`; player hit → lose a life, `RESPAWN_DELAY` then respawn,
  `endGame()` when lives run out.
- UFO: spawn after `UFO_MIN_INTERVAL..UFO_MAX_INTERVAL`, at most one active;
  `startUfoLoop()` while alive, `stopUfoLoop()` + `playUfoDeath()` when shot.
- HUD (drawn every frame): score top-left, hi-score top-right (persist via
  `localStorage`, guarded `typeof localStorage !== "undefined"`), wave number
  centred, lives as small cannon icons. Hi-score updates live; game-over overlay
  (DOM) shows final score + new hi-score callout + Restart button.
- Audio unlock + `start()` on first keydown/click (guarded).
- **Auto-bootstrap only in the browser:** `if (typeof document !== "undefined") { … new GameEngine(); g.init(document.getElementById("game")); g.run(); }`
  so the module imports cleanly under Node.

**Check:**
```bash
node --input-type=module -e '
const E = await import("./src/engine.js");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(typeof E.GameEngine==="function", "GameEngine exported");
const g = new E.GameEngine();
for (const m of ["init","run","start","restart","update","draw","checkCollisions","checkGameConditions","endGame","_startNextWave","_spawnWave","_spawnUfo","_firePlayerBullet"]) {
  ok(typeof g[m]==="function", "method "+m);
}
console.log("PASS");
'
```

---

## Step 12 — Entry page `index.html`

**File:** `index.html`

- `<canvas id="game" width="800" height="600">` (800 × 600).
- `<script type="module" src="./src/engine.js"></script>` (single entry; no other scripts).
- DOM overlays: a "PRESS SPACE TO START" prompt and a game-over overlay with
  final score, optional new hi-score callout, and a **Restart** button. Minimal
  inline `<style>`. No CDN, no external files, no build step.

**Check:**
```bash
node --input-type=module -e '
const fs = await import("fs");
const html = fs.readFileSync("./index.html", "utf8");
const ok = (cond,msg) => { if(!cond){ console.error("FAIL:",msg); process.exit(1);} };
ok(html.includes("width=\"800\"") && html.includes("height=\"600\""), "canvas 800x600");
ok(html.includes("id=\"game\""), "canvas id");
ok(html.includes("type=\"module\"") && html.includes("src=\"./src/engine.js\""), "module entry");
ok(html.includes("id=\"start\"") && html.includes("id=\"game-over\"") && html.includes("id=\"restart\""), "overlay + button ids");
ok(html.includes("class=\"score\"") && html.includes("class=\"hi-score\"") && html.includes("class=\"new-hi-score\""), "overlay child classes");
ok(!/https?:\/\//.test(html), "no external URL");
const scripts = [...html.matchAll(/<script[^>]*>/g)].map(m=>m[0]);
ok(scripts.length === 1 && scripts[0].includes("type=\"module\"") && scripts[0].includes("src=\"./src/engine.js\""), "exactly one script = module entry");
console.log("PASS");
'
```

---

## Step 13 — Integration verification (headless Chrome screenshot)

Done by the reviewer (not a subagent): open `index.html` in headless Chrome,
press Space (dispatch a `keydown` Space event), capture a screenshot of the
canvas, and inspect it against the PRD — the 5×10 formation at the top, 4 green
shields, the cannon resting **on** the ground line (never below it), HUD text,
and no overlaps or misplaced objects. Fix any issues found by sending
corrections to subagents.
