# Product Requirements Document — Space Invaders

**Version:** 2.0
**Date:** 2026-09-29
**Status:** Ready to build
**Companion files:** `ARCHITECTURE.md` (file layout and build steps) and `PDD.md` (exact design and source code)

---

## 0. How to read this document

This document says **what** the game must do. It does not say how to code it.

- `ARCHITECTURE.md` says which files to create and in what order. **Start there.**
- `PDD.md` says exactly how every file works, and contains the complete source code for every file.
- If this document and `PDD.md` ever seem to disagree, `PDD.md` wins, because it is the tested version.

Every number in this document is exact. Do not change any number, name, colour or piece of text.

---

## 1. Overview

A browser recreation of the 1978 Taito arcade game *Space Invaders*. The player moves a laser cannon along the bottom of the screen and shoots a formation of 50 marching aliens before they reach the bottom.

---

## 2. Platform rules (hard constraints)

| Rule | Meaning |
|---|---|
| Plain browser JavaScript only | ES Modules (`<script type="module">`), HTML5 Canvas 2D, Web Audio API, `localStorage`. |
| No Node.js | There is **no** Node component. No `package.json`, no `npm install`, no `node_modules`, no Node scripts, no Node test files, no Node server. |
| No libraries | No frameworks, no CDN imports, no TypeScript, no bundler, no build step. |
| No asset files | No image files and no audio files. All graphics are drawn from text sprites in code. All sound is synthesised in code. |
| Served over HTTP | ES Modules do **not** load from `file://` (the browser blocks them and the screen stays blank). Serve the folder with any static file server, for example `python3 -m http.server 8000`, and open `http://localhost:8000/`. The finished game also runs as-is on GitHub Pages. |
| Desktop keyboard | Mobile and touch controls are not required. |

---

## 3. Screen

- One canvas, **800 × 600** pixels, black background, centred in a black page.
- A thin green **ground line** runs across the canvas at y = 560.
- The **HUD** (score bar) uses the top 40 pixels. The **lives** display sits below the ground line.

---

## 4. Controls

| Key | Action |
|---|---|
| Left Arrow or A | Move cannon left (while held) |
| Right Arrow or D | Move cannon right (while held) |
| Space | Fire (one shot per key press; holding Space does **not** auto-fire) |
| Space or Enter | Start the game from the title screen; restart from the game-over screen |

- Space and the arrow keys must **not** scroll the web page.
- The key press that starts the game must **not** also fire a bullet.
- Holding a key down (keyboard auto-repeat) must **not** restart the game.

---

## 5. Game screens (states)

The game is always in exactly one of four states.

| State | What the player sees | How it ends |
|---|---|---|
| `START` | Title screen (see 5.1) | Space or Enter → `PLAYING` (new game) |
| `PLAYING` | The game | All aliens dead → `WAVE_TRANSITION`. Lives reach 0, or an alien reaches the cannon's row → `GAMEOVER` |
| `WAVE_TRANSITION` | The play field with a dark overlay and the text `WAVE N` | After 1.5 seconds → `PLAYING` with a new formation |
| `GAMEOVER` | The frozen play field with a dark overlay and the game-over text | After 1 second, Space or Enter → `PLAYING` (new game) |

### 5.1 Title screen text (exact)

- `SPACE INVADERS` (green, large)
- `Press SPACE or ENTER to start`
- `Arrow keys / A-D to move   SPACE to shoot` (grey)
- `HI: <hi-score>`
- A points table: `UFO` (red) `50-300 PTS`, `SQUID` `30 PTS`, `CRAB` `20 PTS`, `OCTOPUS` `10 PTS`

### 5.2 Game-over screen text (exact)

- `GAME OVER` (red, large)
- `Score: <score>`
- `NEW HI-SCORE!` (yellow), **only** when this game beat the previous hi-score
- `Press SPACE or ENTER to restart` (green), shown only once restart is allowed (1 second after game over)

### 5.3 HUD text (exact)

- Top left: `SCORE: <score>`
- Top centre: `HI: <hi-score>`
- Top right: `WAVE <wave number>`
- Bottom left, below the ground line: `LIVES` followed by one small green cannon icon per remaining life

---

## 6. Functional requirements

### 6.1 Alien formation
- **R1.** Each wave has 50 aliens in 5 rows × 10 columns, centred horizontally.
- **R2.** Rows 0–1 are **squids** (30 points), rows 2–3 are **crabs** (20 points), row 4 is the **octopus** row (10 points). Row 0 is the top row.
- **R3.** The whole formation moves together, sideways. When any alien would cross the left or right edge of the canvas, the formation instead drops 10 pixels and reverses direction.
- **R4.** The formation speeds up as aliens die: 60 pixels/second with 50 alive, rising with the square root of (50 ÷ alive), capped at 240 pixels/second.
- **R5.** Every 1.5 seconds, one alien fires a bullet straight down. It is the lowest living alien in a randomly chosen column.
- **R6.** Aliens have a two-frame walking animation that flips every 0.5 seconds.
- **R7.** If any alien's bottom edge reaches the cannon's row (y = 532), the game ends immediately.

### 6.2 Player cannon
- **R8.** The cannon moves left and right at 200 pixels/second and cannot leave the canvas.
- **R9.** Only one player bullet may be on screen at a time. A press of Space while a bullet is in flight does nothing.
- **R10.** The player starts with 3 lives.
- **R11.** When an alien bullet hits the cannon: the cannon explodes, one life is lost, and all alien bullets on screen disappear. The cannon is hidden for 1.5 seconds, then reappears at the centre of the screen.
- **R12.** After reappearing, the cannon is invulnerable for 2 seconds and blinks while invulnerable.
- **R13.** While the cannon is hidden (dead), the aliens stop moving and stop firing.

### 6.3 Scoring and hi-score
- **R14.** Squid 30, crab 20, octopus 10. The UFO is worth a random choice of 50, 100, 150, 200 or 300.
- **R15.** The score shows live in the HUD.
- **R16.** The hi-score is saved in the browser's `localStorage` under the key `si_hi` when a game ends with a new best. It is shown on the title screen and in the HUD, and it survives a page reload.
- **R17.** If `localStorage` is blocked, the game must still run (the hi-score then starts at 0).

### 6.4 Shields
- **R18.** Four green shields sit between the aliens and the cannon, evenly spaced.
- **R19.** Each shield is a grid of 12 × 6 small blocks, 6 × 6 pixels each, with an arch cut out of the bottom middle.
- **R20.** Any bullet (player or alien) that touches a shield block destroys the blocks it overlaps and disappears.
- **R21.** Aliens that move into a shield erase the blocks they overlap.
- **R22.** Shields are **not** rebuilt between waves. Damage carries over. Shields are rebuilt only when a new game starts.

### 6.5 Mystery UFO
- **R23.** A red UFO flies across the top of the screen (y = 48) at 120 pixels/second, from a random side. It appears 15 to 25 seconds (random) after the previous UFO has gone.
- **R24.** Only one UFO exists at a time.
- **R25.** Shooting the UFO awards its score, shows an explosion, stops its siren, and plays the UFO-death sound.
- **R26.** The UFO siren must stop the moment the UFO is gone for **any** reason: shot, flew off screen, wave cleared, or game over.

### 6.6 Waves
- **R27.** When the last alien dies: the march sound and UFO siren stop, all bullets and any UFO are removed, the wave number goes up by 1, and `WAVE N` shows for 1.5 seconds.
- **R28.** Each new wave starts one alien-row (40 pixels) lower than the previous one, up to at most 3 rows lower than wave 1.
- **R29.** Base speed and fire rate do not change between waves.
- **R30.** If the cannon was dead when the wave was cleared, it reappears (with invulnerability) when the next wave starts.

### 6.7 Explosions
- **R31.** Every alien, UFO or cannon that is destroyed shows an orange explosion that grows and fades out over 0.4 seconds.

### 6.8 Audio
- **R32.** All sound is synthesised with the Web Audio API. No audio files are used.
- **R33.** Sounds required: player shoot, alien death, player death, UFO death, alien march (4-note loop), and the UFO siren (a loop that plays while a UFO is on screen).
- **R34.** The march beat is 800 ms with 50 aliens alive, speeding up in proportion to the number of aliens alive, but never faster than 100 ms.
- **R35.** Browsers block sound until the user interacts with the page. Sound starts working on the first key press or click. Before that, the game still runs, silently, with no errors.

---

## 7. Non-functional requirements

| Requirement | Target |
|---|---|
| Console errors | None, at any point, including before the first key press |
| Frame rate independence | Movement uses elapsed time, so the game plays at the same speed on 60 Hz and 120 Hz screens |
| First frame | No jump or glitch on the first frame |
| Background tab | Switching tabs and coming back must not make things jump across the screen |
| Files | Exactly the files listed in `ARCHITECTURE.md` section 3, and no others |

---

## 8. Out of scope

Do **not** build any of these: touch or mobile controls, gamepad, multiplayer, online leaderboards, a mute button or settings screen, difficulty levels, pause, saved games, extra power-ups, starfield backgrounds, extra lives, extra alien types, an alien-bullet-versus-player-bullet collision.

---

## 9. Acceptance checklist

The game is finished only when **every** line below passes. Serve the folder over HTTP, open it in Chrome, and open the browser's developer console (F12, or Cmd+Option+J on a Mac). The game exposes itself as `window.game`, so you can type the expressions shown into the console.

| # | Do this | Expected result |
|---|---|---|
| A1 | Load the page | Title screen is visible. Console shows no errors. `game.state` is `"START"` |
| A2 | Press Space | `game.state` is `"PLAYING"`. 50 aliens, 4 shields, cannon at the bottom centre. No bullet was fired |
| A3 | Watch for 5 seconds | Formation marches sideways, drops 10 px at each wall, reverses. Aliens animate. March sound plays |
| A4 | Hold Left, then Right | Cannon moves and stops at both canvas edges. The page does not scroll |
| A5 | Tap Space | One white bullet goes up with a shoot sound. Holding Space fires only once |
| A6 | Hit a squid, a crab and an octopus | Score rises by 30, 20 and 10. Orange explosion plus noise sound each time |
| A7 | Shoot a shield | Blocks disappear where the bullet hit |
| A8 | Let an alien bullet hit you | Explosion, `game.lives` drops by 1, cannon hidden 1.5 s, reappears blinking at the centre |
| A9 | Type `game.ufoTimer = game.ufoInterval` | A red UFO crosses the top with a wobbling siren. When it leaves the screen the siren stops |
| A10 | Shoot a UFO | Score rises by 50–300, explosion, siren stops, UFO-death sound |
| A11 | Type `game._aliens().forEach(a => a.dead = true)` | `WAVE 2` shows for 1.5 s. The new formation starts 40 px lower. Shield damage is kept |
| A12 | Type `game.lives = 1`, then get hit | `GAME OVER` screen. Pressing Space within the first second does nothing |
| A13 | After 1 second, press Enter | New game: score 0, 3 lives, wave 1, fresh shields |
| A14 | Beat the hi-score, lose, then reload the page | Title screen shows the new `HI:` value |
| A15 | Type `game._aliens().forEach(a => a.y += 400)` | `GAME OVER` immediately |
| A16 | Search the project folder | No `.mp3`, `.ogg`, `.wav`, `.png`, `.gif` files, no `package.json`, no `node_modules` |
