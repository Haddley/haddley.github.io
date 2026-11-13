---
type: post
slug: plantsvszombies
title: "Plants vs. Zombies Clone"
date: "2026-06-16"
builds_on: []
topics: [visual-regression-testing, vanilla-javascript, html5-canvas, automated-testing]
tools: [Claude Code, Playwright, HTML5 Canvas, JavaScript]
status: current
checked: "2026-11-06"
source_hash: "a92a324782d8"
generated_by: gemma4:12b
---

**Summary.** I built a Plants vs. Zombies clone using vanilla JavaScript and an HTML5 canvas. I implemented a Playwright-based visual regression test to ensure that any changes to the game's graphics or layout are caught immediately.

## What I did
- I built a game using vanilla JavaScript and an HTML5 canvas.
- I integrated assets from the official wiki and a Unity repository.
- I used Claude Code to generate a visual regression test.
- I implemented a script to compare pixel differences using SSIM scores.

## Claims
- The game does not use any frameworks or build steps.
  > "The whole game is one vanilla JavaScript file on an HTML5 canvas, with no build step."
- The visual regression test identifies changes to the drawing even if the logic remains functional.
  > "A: It screenshots the running game and compares the pixels against reference images, so any change to what is drawn shows up, even when the code still runs."
- The comparison script calculates SSIM scores to detect pixel differences.
  > "The compare script crops matching regions and computes SSIM scores."
- I require manual updates to reference images for any intentional visual changes.
  > "Update references deliberately, not automatically."

## Outcome
I built a functional Plants vs. Zombies clone that uses visual regression tests to maintain layout integrity. This setup ensures that any visual regressions are caught during the development process.

## Caveats
The post does not detail the specific logic for the game mechanics beyond the visual testing implementation.
