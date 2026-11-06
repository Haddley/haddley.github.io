---
type: post
slug: singsaber
title: "SingSaber"
date: "2026-10-25"
builds_on: [webvr]
topics: [webxr, rhythm-games, ai-assisted-development, karaoke-systems]
tools: [Claude Code, A-Frame, WebXR, iTunes, VS Code, LRCLIB]
status: current
checked: "2026-11-06"
source_hash: "66c446250a65"
generated_by: gemma4:12b
---

**Summary.** I built SingSaber, a WebXR rhythm game that turns my personal music library into playable challenges with synced karaoke lyrics. I used Claude Code to automate the creation of beatmaps and the integration of timed lyrics into an existing open-source project.

## What I did
- I integrated karaoke lyrics into an existing open-source WebXR game.
- I used Claude Code to write scripts that transform audio files into playable levels.
- I developed a system to convert manual tap recordings into steady beat grids.
- I implemented a lyric system that changes size and color during musical accents.
- I added tools to tune lyric timing and manage game settings in the browser.

## Claims
- I used an existing open-source game as the foundation for my project.
  > "The original game is Moon Rider by Supermedium, an open-source, Beat Saber-style game built with A-Frame and WebXR."
- The game runs in a VR headset browser without requiring any installation.
  > "It runs in a VR headset's web browser with nothing to install, and its code is published under the MIT licence."
- I used a manual tapping method to ensure the beat maps felt correct.
  > "I asked Claude Code to make the tapped approach the normal way to create beats:"
- The system uses a specific format to determine the size and color of lyrics during accents.
  > "For about a second around each accent, the lyric line changes to the colour theme's accent colour and swells in size by 30%, then eases back."
- I integrated a clock to help me debug timing issues more quickly.
  > "I asked for the clock so I could track down and fix issues more quickly:"
- I added specific keys to tune the lyric offset by ear while the song plays.
  > "So I set the offset to 2.0 seconds, and Claude Code added two keys for tuning by ear while the song plays."

## Outcome
I built SingSaber, a modified version of Moon Rider that allows me to sing along to my own music in virtual reality.

## Caveats
The audio and lyrics used in the project are not mine to share.
