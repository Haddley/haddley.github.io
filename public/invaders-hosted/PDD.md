# Product Design Document — Space Invaders

**Version:** 1.0 (retrospective)
**Date:** 2026-06-19
**Status:** Shipped

---

## 1. Architecture Overview

The game is a single-file entry point (`index.html`) loading one ES Module (`src/engine.js`), which imports everything else. There is no bundler and no build step.

```
index.html
└── src/engine.js          ← GameEngine class + entry point
    ├── src/constants.js   ← all numeric tuning values
    ├── src/sprites.js     ← ASCII pixel-art definitions + drawSprite()
    ├── src/audio.js       ← AudioManager singleton
    ├── src/input.js       ← InputHandler singleton
    └── src/entities/
        ├── entity.js      ← base class
        ├── player.js
        ├── alien.js
        ├── bullet.js
        ├── alienBullet.js
        ├── explosion.js
        ├── shield.js
        └── ufo.js
```

---

## 2. Entity System

All game objects extend `Entity(x, y, width, height)` and implement `update(deltaTime)` and `draw(ctx)`. The engine stores all live entities in a single flat array (`this.entities`). Each frame:

1. All entities are updated.
2. Dead entities (those that set `this.dead = true`) are filtered out.
3. Remaining entities are drawn.

This avoids separate lists per type and keeps entity lifecycle uniform. Filtering by type (`instanceof`) is used only for collision queries, where the set is small and the cost is negligible.

---

## 3. Game State Machine

```
START ──► PLAYING ──► WAVE_TRANSITION ──► PLAYING
                  └──► GAMEOVER
```

| State | Behaviour |
|---|---|
| `START` | Loop runs but `update()` is skipped. Waits for `engine.start()`. |
| `PLAYING` | Full `update()` + `draw()` each frame. |
| `WAVE_TRANSITION` | `draw()` only + wave overlay for 1500 ms, then `_startNextWave()`. |
| `GAMEOVER` | Loop continues (to keep `requestAnimationFrame` alive) but no update or draw. Message overlay shown. |

State is a string on `GameEngine`. All transitions are explicit assignments in `checkGameConditions()`, `endGame()`, and `restart()`.

---

## 4. Game Loop

```js
mainLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (state === 'PLAYING') { update(deltaTime); draw(); }
    else if (state === 'WAVE_TRANSITION') { /* countdown, draw, overlay */ }
    requestAnimationFrame(mainLoop);
}
```

Delta time (ms since last frame) is passed to all `update()` calls so movement and timers are frame-rate independent.

---

## 5. Alien Movement

**Decision: engine-managed, not entity-managed.**

`Alien.update()` is a no-op. The engine moves all alive aliens as a single group:

1. Compute current speed: `min(MAX, BASE * sqrt(total / alive))`.
2. Test whether any alien would exceed the canvas edge at that speed.
3. If yes: shift all aliens down by `ALIEN_SPEED_Y`, reverse `alienDirection`.
4. If no: shift all aliens horizontally by `speed * alienDirection`.

This replicates the original arcade behavior where the alien swarm moves together and speeds up as it thins out. The sqrt formula approximates the original hardware effect (fewer entities = faster CPU loop) in a way that feels authentic without being exponential.

---

## 6. Collision Detection

AABB (axis-aligned bounding box) via `overlaps(a, b)`. Checked once per frame in `checkCollisions()` after entity updates.

| Check | Action |
|---|---|
| Player bullet vs alien | Bullet + alien dead; score added; explosion spawned |
| Player bullet vs UFO | Bullet + UFO dead; score added; explosion spawned |
| Player bullet vs shield | Bullet dead; shield block erased |
| Alien bullet vs shield | Bullet dead; shield block erased |
| Alien bullet vs player | Bullet dead; player dead; life deducted; explosion spawned |
| Alien rect vs shield | Shield blocks overlapping alien rect erased (descent erosion) |

Player collision is skipped during the invulnerability window post-respawn.

---

## 7. Shield Destruction

Each `Shield` holds a `this.blocks[row][col]` boolean grid (6 rows × 12 cols, each block 6 × 6 px).

- **`hitTest(x, y, w, h)`** — walks the grid, maps bullet rect to block coordinates, erases overlapping blocks, returns `true` on any hit. Stops the bullet.
- **`eraseOverlap(x, y, w, h)`** — erases all blocks covered by a given rect. Called by the engine when an alien descends into a shield.
- Shields are excluded from `_startNextWave()` cleanup — they intentionally persist with accumulated damage.

---

## 8. Sprite Rendering

Sprites are defined as arrays of strings (one string per row), where `'X'` = filled pixel and `' '` = empty.

```js
const ALIEN_B = [
  ' X       X ',
  '  X     X  ',
  // ...
];
```

`drawSprite(ctx, x, y, w, h, pixels, color)` renders each `'X'` as a 3 × 3 filled rectangle, centered within the entity's bounding box. This approach:
- Requires no image assets.
- Is trivially editable (change a character, change the sprite).
- Produces the chunky pixel aesthetic of the original.

Aliens have two frames (stored in `this.frames[0]` and `this.frames[1]`), toggled via `Math.floor(Date.now() / 500) % 2` in `Alien.draw()`.

---

## 9. Audio Design

`AudioManager` (singleton, `src/audio.js`) wraps the Web Audio API. All audio is synthesized at runtime.

| Sound | Synthesis method |
|---|---|
| Player shoot | Square oscillator, 800 → 200 Hz exponential ramp, 150 ms |
| Alien death | White noise buffer, bandpass filter at 600 Hz, 350 ms |
| Player death | White noise buffer, lowpass filter at 600 Hz, 900 ms |
| Alien march | Square oscillator, 4-step sequence [320, 260, 220, 190 Hz], 80 ms per beat |
| UFO (loop) | Sawtooth oscillator at 400 Hz, LFO (sine, 8 Hz) modulating frequency ±120 Hz |
| UFO death | Square oscillator, 700 → 80 Hz exponential ramp, 500 ms |

**March tempo** scales with alien count: `interval = max(100, 800 * alive/total)` ms. At full formation: 800 ms/beat. Last alien: 100 ms/beat.

**Frequency doubling:** The arcade originals used 160/130/110/100 Hz. These were doubled to 320/260/220/190 Hz because laptop speakers roll off below ~200 Hz, making the fundamentals inaudible at original pitch.

The `AudioContext` is created immediately but `resume()` is called on the first user interaction (keydown/click) to satisfy browser autoplay policies.

---

## 10. Wave Progression

| Parameter | Behaviour |
|---|---|
| `waveYOffset` | Increases by one alien-row height per wave (capped at 3 rows via `MAX_WAVE_DESCENT`) |
| Alien speed | Unchanged base; naturally faster per speed-scaling formula with full grid |
| Shields | Not reset — persist with accumulated damage |
| Alien shoot interval | Unchanged (1500 ms) |
| UFO interval | Re-randomised (15–25 s) on each wave |

Wave transition: engine enters `WAVE_TRANSITION` for 1500 ms (displays "WAVE N"), then calls `_startNextWave()` which removes aliens/bullets/UFOs while keeping shields and player.

---

## 11. Configuration

All tuning values are centralised in `src/constants.js`. Key values:

| Constant | Value | Purpose |
|---|---|---|
| `CANVAS_WIDTH/HEIGHT` | 800 / 600 | Canvas dimensions |
| `ALIEN_ROWS/COLS` | 5 / 10 | Formation size |
| `ALIEN_SPEED_X` | 1 px/frame | Base horizontal speed |
| `ALIEN_SPEED_Y` | 10 px | Vertical drop per wall hit |
| `LIVES` | 3 | Starting lives |
| `RESPAWN_DELAY` | 1500 ms | Pause before respawn |
| `INVULNERABLE_DURATION` | 2000 ms | Post-respawn grace period |
| `SHIELD_COUNT` | 4 | Number of shields |
| `UFO_MIN/MAX_INTERVAL` | 15000 / 25000 ms | UFO spawn range |
