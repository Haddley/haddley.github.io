# Architecture and Build Plan — Space Invaders

**Version:** 2.0
**Date:** 2026-09-29
**Companion files:** `PRD.md` (what to build) and `PDD.md` (how it works, plus the complete source code in Appendix A)

---

## 1. Read this first

You are going to build a browser Space Invaders game from three documents:

| File | Job | When to use it |
|---|---|---|
| `ARCHITECTURE.md` (this file) | Which files exist, what each exports, and the **numbered build steps** | Follow it from top to bottom |
| `PRD.md` | What the game must do, and the acceptance checklist (section 9) | Read once at the start; use section 9 at the end |
| `PDD.md` | How every part works, the lessons from earlier builds (section 14), and the **exact source code** of every file (Appendix A) | Copy code from Appendix A during the build steps |

The plan is already written: it is section 6 below. **Do not write your own plan, and do not redesign anything.** Do the steps in order.

### 1.1 Recommended prompt to start a build

Put `PRD.md`, `PDD.md` and `ARCHITECTURE.md` in an **empty** folder, open your coding agent in that folder, and use this prompt:

```PROMPT
Build the Space Invaders game described in this folder.
Read ARCHITECTURE.md first, then PRD.md, then PDD.md.
Follow the numbered steps in ARCHITECTURE.md section 6 in order, one step at a time.
For each step, create the file exactly as shown in PDD.md Appendix A, then do that step's check before moving on.
Do not write your own plan. Do not rename, redesign, add or skip anything.
Do not use Node.js or npm, and do not write a web server.
Only read files in this folder.
When every step is done, tell me the URL to open and list PRD.md section 9 so I can test it.
```

For a very small model, or one with a short context window, give it **one step per prompt**:

```PROMPT
Read ARCHITECTURE.md. Do step 3 only, exactly as written, including its check. Then stop and tell me the result.
```

Then send the same prompt with `step 4`, `step 5` and so on.

---

## 2. Rules for the builder

1. Work only inside this folder. Do not read or copy other folders.
2. Create exactly the files in section 3. No `package.json`, no `node_modules`, no test files, no server script, no README, no plan file, no extra folders.
3. There is **no Node.js** in this project. Do not run `npm` or `node`. The game runs only in a web browser.
4. Copy code from `PDD.md` Appendix A **exactly**, including every import line, name, number, comment and string.
5. Write each file **completely** in one go (except `engine.js`, which may be written in its 4 marked parts). Never leave a half-written file.
6. After writing a file, read it back and confirm it matches Appendix A.
7. File and folder names are case-sensitive. `alienBullet.js` has a capital `B`. Everything else is lower case.
8. If something does not work, look up the symptom in `PDD.md` section 14 before changing any code.

---

## 3. Final folder layout

When finished, the folder contains exactly these files:

```
(project folder)/
├── PRD.md
├── PDD.md
├── ARCHITECTURE.md
├── index.html                  ← page with the <canvas>; loads src/engine.js
└── src/
    ├── constants.js            ← every number, size, speed, time, colour
    ├── sprites.js              ← pixel-art text sprites + drawSprite()
    ├── input.js                ← keyboard state (singleton `input`)
    ├── audio.js                ← Web Audio sound effects (singleton `audio`)
    ├── engine.js               ← GameEngine: loop, states, rules, drawing; creates the game
    └── entities/
        ├── entity.js           ← Entity base class + overlaps()
        ├── player.js           ← Player (the cannon)
        ├── alien.js            ← Alien (squid / crab / octopus)
        ├── bullet.js           ← Bullet (player shot, goes up)
        ├── alienBullet.js      ← AlienBullet (alien shot, goes down)
        ├── explosion.js        ← Explosion (fading orange star)
        ├── shield.js           ← Shield (destructible bunker)
        └── ufo.js              ← UFO (mystery ship)
```

That is 14 code files (1 HTML and 13 JavaScript).

---

## 4. How the modules depend on each other

```
index.html
  └── src/engine.js                 (the ONLY <script>; creates the game at the bottom of the file)
        ├── src/constants.js        (imports nothing)
        ├── src/sprites.js          (imports nothing)
        ├── src/audio.js            (imports nothing)
        ├── src/input.js            (imports nothing)
        └── src/entities/*.js
              ├── entity.js         (imports nothing)
              ├── player.js         → entity.js, ../sprites.js, ../constants.js, ../input.js
              ├── alien.js          → entity.js, ../sprites.js, ../constants.js
              ├── bullet.js         → entity.js, ../constants.js
              ├── alienBullet.js    → entity.js, ../constants.js
              ├── explosion.js      → entity.js, ../constants.js
              ├── shield.js         → entity.js, ../constants.js
              └── ufo.js            → entity.js, ../sprites.js, ../constants.js
```

- Arrows only point **down** this tree. No file imports `engine.js`, and entities never import each other (except `entity.js`).
- Files inside `src/entities/` reach the other modules with `../` (for example `'../constants.js'`). Files in `src/` use `./`.
- Every import path ends in `.js`.

---

## 5. Export contract (exact names)

Use these names **exactly**. An import of any name that is not in this table is a bug.

| File | Exports |
|---|---|
| `src/constants.js` | `CANVAS_WIDTH`, `CANVAS_HEIGHT`, `HUD_HEIGHT`, `GROUND_Y`, `MAX_FRAME_TIME`, `ALIEN_ROWS`, `ALIEN_COLS`, `ALIEN_WIDTH`, `ALIEN_HEIGHT`, `ALIEN_GAP_X`, `ALIEN_GAP_Y`, `ALIEN_START_Y`, `ALIEN_SPEED_X`, `ALIEN_MAX_SPEED_X`, `ALIEN_SPEED_Y`, `ALIEN_SHOOT_INTERVAL`, `ALIEN_ANIM_INTERVAL`, `PLAYER_WIDTH`, `PLAYER_HEIGHT`, `PLAYER_Y`, `PLAYER_SPEED`, `LIVES`, `RESPAWN_DELAY`, `INVULNERABLE_DURATION`, `BULLET_SPEED`, `BULLET_WIDTH`, `BULLET_HEIGHT`, `ALIEN_BULLET_SPEED`, `ALIEN_BULLET_WIDTH`, `ALIEN_BULLET_HEIGHT`, `SHIELD_COUNT`, `SHIELD_COLS`, `SHIELD_ROWS`, `SHIELD_BLOCK_SIZE`, `SHIELD_Y`, `UFO_SPEED`, `UFO_WIDTH`, `UFO_HEIGHT`, `UFO_Y`, `UFO_MIN_INTERVAL`, `UFO_MAX_INTERVAL`, `UFO_SCORES`, `WAVE_TRANSITION_DURATION`, `MAX_WAVE_DESCENT`, `RESTART_DELAY`, `EXPLOSION_DURATION`, `SCORE_SQUID`, `SCORE_CRAB`, `SCORE_OCTOPUS`, `HISCORE_KEY`, `COLORS` |
| `src/sprites.js` | `SQUID_A`, `SQUID_B`, `CRAB_A`, `CRAB_B`, `OCTOPUS_A`, `OCTOPUS_B`, `UFO_SPRITE`, `PLAYER_SPRITE`, `drawSprite` |
| `src/input.js` | `InputHandler` (class), `input` (the one instance) |
| `src/audio.js` | `AudioManager` (class), `audio` (the one instance) |
| `src/entities/entity.js` | `Entity` (class), `overlaps` (function) |
| `src/entities/player.js` | `Player` |
| `src/entities/alien.js` | `Alien` |
| `src/entities/bullet.js` | `Bullet` |
| `src/entities/alienBullet.js` | `AlienBullet` |
| `src/entities/explosion.js` | `Explosion` |
| `src/entities/shield.js` | `Shield` |
| `src/entities/ufo.js` | `UFO` |
| `src/engine.js` | `GameEngine` (class). At the bottom of the file it also runs `new GameEngine(...)` once and stores it in `window.game` |

All exports are **named** exports (`export const ...`, `export class ...`, `export function ...`). There are no `export default` lines anywhere.

---

## 6. Build steps

Do these in order. Each step says what to create, where the code is, and how to check it. Do not start a step until the previous step's check passes.

### Step 1 — Create the folders
Create `src/` and `src/entities/` inside the project folder.
**Check:** both folders exist, and nothing else has been created.

### Step 2 — `index.html`
Copy `PDD.md` Appendix A.1.
**Check:** it has one `<canvas id="game" width="800" height="600">` and exactly one `<script type="module" src="src/engine.js"></script>`. There is no other JavaScript in the file.

### Step 3 — `src/constants.js`
Copy Appendix A.2.
**Check:** it has no `import` lines. Every name in the section 5 row for `constants.js` is exported. `PLAYER_Y` works out to 532 and `SHIELD_Y` to 492.

### Step 4 — `src/sprites.js`
Copy Appendix A.3.
**Check:** it has no `import` lines. Count the characters in each row: squid rows are 8 long, crab 11, octopus 12, UFO 16, player 13. Every row of one sprite is the same length (spaces count).

### Step 5 — `src/input.js`
Copy Appendix A.4.
**Check:** it exports `InputHandler` and `input`, and has the methods `isDown`, `isLeft`, `isRight` and `consumePress`. It has **no** `isShoot` method (shooting uses `consumePress('Space')`).

### Step 6 — `src/audio.js`
Copy Appendix A.5.
**Check:** it exports `AudioManager` and `audio`, and has the methods `unlock`, `shoot`, `alienDie`, `playerDie`, `ufoDie`, `startMarch`, `stopMarch`, `updateMarchTempo`, `startUfo`, `stopUfo`, plus the static method `marchInterval`. Every `exponentialRampToValueAtTime` for volume targets `0.001`, never `0`. Every opening `{` has a matching `}`.

### Step 7 — `src/entities/entity.js`
Copy Appendix A.6.
**Check:** it exports `Entity` and `overlaps`, and has no `import` lines.

### Step 8 — `src/entities/player.js`
Copy Appendix A.7.
**Check:** it imports from `'./entity.js'`, `'../sprites.js'`, `'../constants.js'` and `'../input.js'`. It has `respawn()` and `isInvulnerable()`.

### Step 9 — `src/entities/alien.js`
Copy Appendix A.8.
**Check:** the constructor takes `(x, y, row, col)`. `update(dt)` is empty.

### Step 10 — `src/entities/bullet.js`
Copy Appendix A.9.
**Check:** `update` **subtracts** from `y` (the bullet moves up).

### Step 11 — `src/entities/alienBullet.js`
Copy Appendix A.10. The file name has a capital `B`.
**Check:** `update` **adds** to `y` (the bullet moves down).

### Step 12 — `src/entities/explosion.js`
Copy Appendix A.11.
**Check:** the constructor takes four values `(x, y, width, height)`.

### Step 13 — `src/entities/shield.js`
Copy Appendix A.12.
**Check:** it has `hitTest` (returns true or false) and `eraseOverlap`. The arch removes rows 4–5, columns 4–7.

### Step 14 — `src/entities/ufo.js`
Copy Appendix A.13.
**Check:** it exports `UFO` (all capitals). The constructor takes no arguments.

### Step 15 — `src/engine.js`
Copy Appendix A.14. It is long. If needed, write Part 1 to create the file, then append Part 2, Part 3 and Part 4 in order.
**Check:**
- Every name it imports appears in the section 5 table for that file.
- `this.lastTime = performance.now();` is in the constructor (not `0`).
- `_removeDeadEntities` keeps `this.player`.
- `_ufoSpawn` calls `audio.stopUfo()` when no UFO is alive.
- The last two lines of the file are `const game = new GameEngine(document.getElementById('game'));` and `window.game = game;`.
- The class has exactly one opening `export class GameEngine {` and its closing `}` comes just before the entry point lines.

### Step 16 — Serve and load
In a terminal, inside the project folder, run:

```bash
python3 -m http.server 8000
```

Leave it running. (Any static file server works, but never write your own. Do **not** open `index.html` by double-clicking it: the `file://` address blocks ES modules and the page stays black.)

**Check** (in a second terminal):

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:8000/index.html
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:8000/src/engine.js
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:8000/src/entities/alienBullet.js
```

Each line must start with `200`, and the `.js` lines must show `text/javascript` (or `application/javascript`). A `404` means a file is missing or misnamed.

### Step 17 — Play and accept
Open `http://localhost:8000/` in Chrome. Open the developer console (F12, or Cmd+Option+J on a Mac). Work through every row of `PRD.md` section 9.

If you are an agent without a browser, stop here and give the human the URL and the checklist.

---

## 7. What a correct first run looks like

- The title screen shows green `SPACE INVADERS`, the start prompt, the controls, `HI: 0` and the points table.
- The console is empty. (A browser extension may add its own messages. Messages that mention `src/` files are real problems.)
- After pressing Space you see: `SCORE: 0`, `HI: 0` and `WAVE 1` across the top; 5 rows of white aliens (2 rows of small squids, 2 rows of crabs, 1 row of wide octopuses); 4 green arched shields; the green cannon at the bottom centre; a green ground line; and `LIVES` with 3 small cannons below it.
- Typing `game.state` in the console prints `"PLAYING"`.

---

## 8. Troubleshooting

| What you see | Most likely cause | Fix |
|---|---|---|
| Black page, CORS error in the console | Opened from `file://` | Step 16: use `http://localhost:8000/` |
| `Failed to load module script ... MIME type` | A non-standard server | Use `python3 -m http.server 8000` |
| `404` for a `.js` file | Wrong file name or folder, or a missing `.js` in an import | Compare with section 3, including capital letters |
| `does not provide an export named X` | Name typo, or an invented name | Compare with section 5 and Appendix A |
| `Unexpected token` or `Unexpected end of input` | A file is incomplete or has a broken brace | Rewrite that whole file from Appendix A |
| `game is not defined` in the console | `engine.js` failed to load, or its last two lines are missing | Fix the first red error in the console, then check step 15 |
| Anything else | See `PDD.md` section 14 | Look up the symptom |

When fixing a problem, replace the **whole** file with its Appendix A version rather than patching lines.

---

## 9. Definition of done

- The folder matches section 3 exactly.
- Every step in section 6 has passed its check.
- Every row of `PRD.md` section 9 passes.
- The browser console shows no errors during a full game: start, several kills, a death, a UFO, a wave clear, game over, restart.
