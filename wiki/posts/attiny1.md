---
type: post
slug: attiny1
title: "ATtiny85 (Part 1)"
date: "2026-10-06"
series: ATtiny85
part: 1
builds_on: [claudecode15]
topics: [attiny85, avrdude, microcontroller-fuses, toolchain-setup, hardware-verification]
tools: [Claude Code, Tinkercad, avrdude, Homebrew, Tiny AVR Programmer]
status: current
checked: "2026-11-06"
---

**Summary.** I used Claude Code to program a bare ATtiny85 through a USB programmer on an Apple Silicon Mac, after simulating the circuit in Tinkercad. The surprises were in the toolchain and the fuse settings, not the wiring.

## What I did
- Built the circuit in Tinkercad and checked the power with a simulated multimeter.
- Asked Claude Code for a blink program and an upload; it wrote `blink.c` and a `Makefile`.
- Found that the Arduino-bundled `avrdude` was Intel-only, and installed a native one with Homebrew.
- Read the programmer, chip signature and fuses with `avrdude`.

## Claims
- Claude asked before changing a security setting, and recommended the Homebrew tap.
  > "It asked me to choose, and it recommended trusting the osx-cross/avr tap."
- The Arduino copy of `avrdude` would not run on this Mac.
  > "That copy is an Intel binary, and Rosetta is not installed on this Mac, so it would not run."
- The chip had its factory fuses, so it ran at 1 MHz.
  > "The chip runs its internal 8 MHz RC clock divided by 8, so 1 MHz."
- The upload was verified by reading the bytes back, which proves the bytes arrived and nothing more.
  > "wrote 82 bytes and read them back to verify them"
- A lit LED does not prove the blink timing.
  > "A lit LED is one frame of evidence."
- Claude could not see the board, and said so.
  > "The readback from avrdude proved the program was written, not that it runs."
- My own suspicion about the LED pin was wrong, and I checked it against the hookup guide.
  > "The lesson I took is to check a hardware claim against a source before publishing it, whether it comes from Claude or from my own reading of a photo."

## Outcome
The chip identified as an ATtiny85 with factory fuses and the blink program ran. The post separates what the readback proves (the bytes) from what only watching proves (the timing).

## Caveats
Part 1 of the ATtiny85 series. It stops at a blinking LED; the speed limiter itself is in later parts, which are not published.
