---
type: post
slug: claudecode17
title: "Claude Code (Part 17)"
date: "2026-11-03"
part: 17
builds_on: [claudecode15]
topics: [arduino-hardware, python-daemons, 3d-modeling, embedded-systems, serial-communication]
tools: [Arduino Uno, TFT LCD Shield, Claude Code, OpenSCAD, Bambu Studio, arduino-cli]
status: current
checked: "2026-11-05"
source_hash: "87cccd0e663a"
generated_by: gemma4:12b
---

**Summary.** I integrated an Arduino Uno and a TFT LCD shield to create a physical status light for my Claude Code sessions. I also designed and printed a custom enclosure to house the hardware safely.

## What I did
- Identified the display controller and installed the necessary libraries.
- Resolved an Apple Silicon compilation issue by installing Rosetta 2.
- Developed a Python daemon to maintain a stable serial connection.
- Created a hook system to update the screen based on Claude Code events.
- Designed and printed a custom 3D-printed case for the hardware.

## Claims
- The display uses an ILI9341 controller and a 320 by 240 resolution.
  > "The shield has an **ILI9341** controller, and the screen is 320 by 240 pixels in landscape."
- I had to install Rosetta 2 to compile the code for the AVR board on my Mac.
  > "On Apple Silicon, I need Rosetta 2 before I can compile for AVR boards."
- The daemon prevents the Arduino from resetting every time a new message arrives.
  > "The daemon opens it once and waits 2.5 seconds for the board to finish restarting."
- The sketch uses only 53% of program storage and 27% of RAM.
  > "The sketch compiled to 53% of program storage and 27% of RAM."
- The case design was iterated multiple times to fix issues with the lid and the length.
  > "I described all three problems to Claude Code, and it changed the model:"
- The final case dimensions are approximately 88 by 71 mm.
  > "The case is about 88 by 71 mm outside, because the bosses need room beside the shield."

## Outcome
I built a functional physical status light that displays the current state of my Claude Code sessions. I also produced a custom-fitted 3D-printed enclosure for the device.

## Caveats
The post does not yet cover the functionality of the resistive touch layer or the microSD slot.
