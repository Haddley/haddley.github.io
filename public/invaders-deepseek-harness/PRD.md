# Product Requirements Document — Space Invaders

**Version:** 1.0 (retrospective)
**Date:** 2026-06-19
**Status:** Shipped

---

## 1. Overview

A faithful browser-based recreation of the 1978 Taito Space Invaders arcade game. The product runs entirely client-side with no build step, no dependencies, and no server — open `index.html` and play.

---

## 2. Goals

- Reproduce the core feel of the original arcade game in a modern browser.
- Use only vanilla browser APIs (Canvas, ES Modules, Web Audio). No frameworks, no bundler.
- Ship a complete game loop: start → play → wave progression → game over.

---

## 3. Users

Single player, desktop browser. No account, no install, no network required.

---

## 4. Functional Requirements

### 4.1 Alien Formation
- 50 aliens arranged in a 5-row × 10-column grid.
- Three visual types (squid, crab, octopus) assigned by row.
- Aliens move as a synchronized group: horizontal until a wall is hit, then step down and reverse.
- Movement speed increases as aliens are killed.
- Aliens shoot projectiles at the player at a regular interval.
- If any alien reaches the player's ground line, the game ends immediately.

### 4.2 Player
- Player cannon moves left/right via keyboard (arrow keys or A/D).
- Player fires one bullet at a time (Space bar); no bullet while one is in flight.
- Player has 3 lives. On death, respawn after 1.5 s with 2 s of invulnerability.
- Player death is triggered by an alien bullet hitting the cannon.

### 4.3 Scoring
- Alien score values: squid (rows 0–1) = 30 pts, crab (rows 2–3) = 20 pts, octopus (row 4) = 10 pts.
- UFO = random bonus score (defined per-spawn).
- Score displayed live in HUD. Hi-score persists across sessions via `localStorage`.

### 4.4 Shields
- Four destructible shields positioned between player and aliens.
- Each shield is damaged block-by-block by bullets (player and alien).
- Aliens physically erode shields as they descend into them.
- Shields persist across waves.

### 4.5 Mystery UFO
- A UFO periodically flies across the top of the screen (random interval 15–25 s).
- Shooting it awards bonus points and plays a distinct sound.
- Only one UFO is active at a time.

### 4.6 Wave Progression
- Clearing all aliens triggers a 1.5 s wave-transition screen, then the next wave begins.
- Each wave, aliens spawn one row lower (capped at 3 rows of descent).
- Alien shoot interval and base speed remain constant; natural difficulty comes from spawn position and speed scaling.

### 4.7 HUD
- Score, hi-score, wave number, and lives count displayed at all times.
- Game-over overlay shows final score, new hi-score callout if applicable, and a Restart button.
- Wave transition overlay shows "WAVE N" for 1.5 s.

### 4.8 Audio
- All audio synthesized via Web Audio API — no audio files.
- Sounds: player shoot, alien death (noise burst), player death (long noise), alien march (4-note sequence), UFO loop (LFO-modulated oscillator), UFO death.
- March tempo scales with remaining alien count.
- Audio context unlocked on first user interaction.

### 4.9 Sprites
- All entities rendered as pixel art on an HTML5 Canvas (800 × 600).
- Aliens have two animation frames toggled at 500 ms intervals (walking animation).
- Three alien designs (squid / crab / octopus) faithful to the arcade original.

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Zero dependencies | No npm packages, no CDN imports |
| No build step | `index.html` opens directly in browser |
| Canvas size | 800 × 600 px |
| Module system | ES Modules (`type="module"`) |
| Hi-score persistence | `localStorage` |
| Audio | Web Audio API only (no `.mp3`/`.ogg` files) |

---

## 6. Out of Scope

- Mobile / touch controls
- Multiplayer
- High-score leaderboard (server-side)
- Sound settings / mute toggle
- Difficulty selection
- Saved game state

---

## 7. Success Criteria

- Game runs end-to-end: start → multiple waves → game over → restart.
- All five alien types shoot, die with sound/explosion, and award correct score.
- Shields degrade visibly under fire and from alien descent.
- UFO appears, can be shot, awards score.
- Hi-score survives a page refresh.
- No audio files referenced — all sound synthesized at runtime.
