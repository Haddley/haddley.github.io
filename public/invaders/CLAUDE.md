# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

To run the game locally:
- Open `index.html` in your web browser.
- Alternatively, serve the directory using a local server: `npx serve .`

(Note: No build, lint, or test commands are currently configured.)

## Architecture

The project is a vanilla JavaScript implementation of a Space Invaders-style game. It uses ES Modules and operates within an HTML5 Canvas.

### Core Components

- **Entry Point**: `index.html` loads the main engine via `<script type="module">`.
- **Game Engine (`src/engine.js`)**: The central orchestrator. Manages the game loop (`requestAnimationFrame`), state machine, collision detection, and all entity lifecycle. Entities are stored in a flat `this.entities` array and filtered by type on each frame.
- **Entity System (`src/entities/`)**: All entities extend `Entity` (x, y, width, height, `update`, `draw`). Subclasses: `Player`, `Alien`, `Bullet`, `AlienBullet`, `Explosion`, `Shield`, `UFO`. Dead entities set `this.dead = true` and are pruned from the array each frame.
- **Input Management (`src/input.js`)**: Singleton `InputHandler` tracking keyboard state (keydown/keyup).
- **Configuration (`src/constants.js`)**: All numeric tuning values — canvas size, speeds, alien grid dimensions, shield geometry, UFO timing, lives, and respawn durations.
- **Sprites (`src/sprites.js`)**: Pixel-art sprites defined as ASCII string arrays. `drawSprite(ctx, x, y, w, h, pixels, color)` renders them by drawing 3×3 pixel blocks for each `'X'` character. Aliens have two animation frames for the walking animation.
- **Audio (`src/audio.js`)**: Singleton `AudioManager` using the Web Audio API — all sound is synthesized (no audio files). Sounds: shoot, alien death (filtered noise burst), player death (longer noise), march beat (4-step oscillator sequence), UFO loop (LFO-modulated oscillator). Call `audio.resume()` on first user interaction to unlock the audio context.

### Key Design Decisions

**Alien movement is engine-managed, not entity-managed.** `Alien.update()` is a no-op. The engine moves all alive aliens as a synchronized group each frame, reversing direction and stepping down when any alien hits a wall. Speed scales up as aliens are killed using `sqrt(total / alive)`, replicating the original arcade hardware behavior.

**Game state machine.** `engine.state` drives the main loop: `'START'` → `'PLAYING'` → `'WAVE_TRANSITION'` (1.5 s pause between waves) → back to `'PLAYING'`, or `'GAMEOVER'`. The `START` state holds the loop idle until `engine.start()` is called.

**Shield pixel destruction.** Each `Shield` stores a 2D boolean grid (`this.blocks`) representing 6×12 destructible blocks. `hitTest()` erases individual blocks on bullet impact. `eraseOverlap()` erases all blocks that overlap a given rect (used when aliens physically descend into a shield). Shields persist across waves.

**Wave progression.** `waveYOffset` increases by one alien-row height per wave (capped at 3 rows via `MAX_WAVE_DESCENT`) so aliens start progressively closer to the player. Shields are not reset between waves.
