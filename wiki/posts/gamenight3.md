---
type: post
slug: gamenight3
title: "Game Night (Part 3)"
date: "2026-08-16"
part: 3
builds_on: [gamenight1, gamenight2, gamenight4]
topics: [web-speech-api, mobile-browser-quirks, graceful-degradation, feature-detection]
tools: [Web Speech API, iOS Safari, Amazon Silk, Fire OS, CSS, JavaScript]
status: current
checked: "2026-11-05"
source_hash: "9ee9815d884a"
generated_by: gemma4:12b
---

**Summary.** I gave the auctioneer in Going, Going, GONE! a spoken voice using the Web Speech API. I discovered and resolved several distinct reasons why the voice might fail on different devices, including iOS gesture requirements and specific limitations in the Silk browser.

## What I did
- Implemented the Web Speech API to give the auctioneer a voice.
- Added priming utterances to satisfy iOS Safari's gesture requirements.
- Created a robust diagnostic system to distinguish between different types of speech failures.
- Developed a fallback system for the Silk browser's lack of installed voices.
- Implemented a robust emoji rendering system that detects font capabilities at runtime.

## Claims
- iOS Safari requires a user gesture to grant a page permission to speak.
  > "The first real obstacle wasn't a browser gap at all — it was iOS Safari's permission model. iOS grants a page permission to speak **exactly once, and only from inside a user gesture** like a tap."
- I used a silent, inaudible utterance to consume the one-time gesture allowance on mobile devices.
  > "The fix is to spend a silent, inaudible utterance the moment the voice toggle is tapped — using up that one-gesture allowance immediately, on a piece of speech nobody needs to hear:"
- The Silk browser on Fire TV supports the Web Speech API but reports zero installed voices.
  > "Silk implements one and not the other: `typeof speechSynthesis` is defined, but it reports zero installed voices, so every `speak()` call succeeds as a no-op."
- I abandoned using pre-recorded word clips because the seams between words were too obvious.
  > "I abandoned it: concatenated single words don't sound like a sentence no matter how good the source voice is, and the better the individual recording, the more obvious the seams between words become."
- I implemented a system to ensure the auctioneer's mouth moves even when no audio is available.
  > "His mouth still moves even with no voice at all, timed off the same syllable plan a real utterance would have used, so a silent Fire TV doesn't show a character frozen mid-sentence under a caption — `mimeLine()` runs the same animation the real `onstart` handler would have triggered, just on a timer instead of real audio events."
- I chose to detect capabilities at runtime rather than guessing from a user-agent string.
  > "Two unrelated gaps in the same browser, and the same underlying lesson both times: detect the actual capability at runtime rather than guessing from a user-agent string, and always leave the experience *legible* rather than broken when the answer is no — captions when there's no voice, an older emoji when the newest one is tofu, never a blank box or a character frozen mid-word."

## Outcome
I built a robust speech system that handles various browser limitations while ensuring the game remains playable and visually consistent for all users.

## Caveats
The post does not show how the system handles cases where the underlying hardware lacks any audio capabilities.
