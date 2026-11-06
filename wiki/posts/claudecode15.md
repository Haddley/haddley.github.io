---
type: post
slug: claudecode15
title: "Claude Code (Part 15)"
date: "2026-09-04"
part: 15
builds_on: []
topics: [hardware-debugging, serial-communication, embedded-systems, llm-agent-workflows]
tools: [Claude Code, Arduino, arduino-cli, LiquidCrystal, TKLCD, Python]
status: current
checked: "2026-11-05"
source_hash: "015e2a3456f9"
generated_by: gemma4:12b
---

**Summary.** I used Claude Code to identify, program, and debug a TinkerKit LCD Module. The process revealed how the agent can navigate hardware quirks, install missing dependencies, and document its own findings to solve complex integration issues.

## What I did
- I connected a raw serial device to my laptop and asked Claude Code to identify it.
- I had Claude set up the development environment by installing the necessary toolchain and libraries.
- I debugged a display issue by having Claude research the specific hardware specifications.
- I resolved a wiring discrepancy where the silk-screened labels did not match the actual hardware pins.
- I had Claude generate a local wiki to document the hardware quirks for future sessions.

## Claims
- Claude Code identified the specific serial device and its hardware specifications.
  > "Claude queried the macOS `IOUSB` registry directly and found it: a `/dev/cu.usbmodem1101` serial device enumerating as `USB IO Board`, idVendor `10189` (0x27CD), idProduct `32784` (0x8010) — an ATmega32u4-class board built on the same chip as an Arduino Leonardo or Micro, sitting behind a Genesys Logic USB hub."
- The agent automatically installed the required toolchain and libraries when it found them missing.
  > "Claude created the project folder, discovered `arduino-cli` was not installed, and worked out the toolchain from scratch: checking serial devices, installing `arduino-cli` via Homebrew, then the `arduino:avr` core and `LiquidCrystal` library."
- The initial sketch failed to display characters because it used the wrong library and pinout.
  > "My first sketch had used a generic `LiquidCrystal` pinout that never drove the module's real contrast line, so the backlight came on with nothing displayed."
- Claude discovered that the physical silk-screened label for pin D12 was incorrect.
  > "Claude found a hardware quirk before writing a line of code: the connector silk-screened `D12` is not actually wired to Arduino pin 12 at all — it's wired to pin 11 (PB7)."
- The agent implemented a non-blocking timestamp check to handle the LED timing.
  > "Claude wrote the fix against the real pin, driving it HIGH in the same branch that redraws the LCD each second, then dropping it LOW 100ms later with a non-blocking timestamp check rather than a `delay()` call — so the LED flash and the digit change land in the same instant every time."
- Claude created a local wiki to store knowledge about the hardware quirks.
  > "Along the way Claude also stood up a small `.llmwiki` in the project — its own notes on the board's real wiring and the sketch's design — so the next session starts from what was actually learned here rather than rediscovering the D12-is-really-D11 quirk from scratch."

## Outcome
I built a functioning counter that displays on an LCD and blinks an LED. I also established a workflow where the AI documents hardware quirks in a local wiki.

## Caveats
The post does not show the specific internal logic of the LLM's reasoning process during the research phase.
