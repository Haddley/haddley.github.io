---
type: post
slug: voicekit2
title: "Voice Kit (Part 2)"
date: "2025-10-16"
part: 2
builds_on: []
topics: [google-assistant-api, oauth-authentication, state-machine-logic, wake-word-detection, raspberry-pi-hardware]
tools: [Google Assistant API, Raspberry Pi, Firefox, AIY Voice Kit, Chromium]
status: current
checked: "2026-11-06"
source_hash: "0a55a9064793"
generated_by: gemma4:12b
---

**Summary.** I detail the integration of the Google Assistant API with the AIY Voice Kit. I explain how I overcame browser compatibility issues during the authentication process and describe the state machine for the system.

## What I did
- I resolved Chromium compatibility issues by installing Firefox.
- I configured the OAuth authentication flow for the Google Assistant API.
- I implemented the process_event function to manage the state machine.
- I integrated multi-state LED indicators for visual feedback.
- I analyzed the differences between local wake word detection and cloud speech recognition.

## Claims
- I used Firefox to solve the authentication issues caused by the default Chromium version.
  > "This was resolved by installing Firefox, which properly handled the OAuth authentication flow required by the Google Assistant API."
- The process_event function manages the state machine with LED feedback.
  > "The `process_event()` function manages the Assistant's state machine with visual LED feedback:"
- The Raspberry Pi Zero does not support hotword detection.
  > "Pi Zero (ARMv6) cannot do hotword detection - only Pi 2/3 (ARMv7) support it"
- Wake word detection happens locally before the system connects to the cloud.
  > "The wake word detection works without sending audio to the cloud - only after the wake word is detected does the conversation with Google Assistant begin (which does use cloud APIs)."
- The system requires a persistent internet connection for the conversation phase.
  > "Network Dependency: Requires persistent internet connection"
- The project uses cloud speech recognition for converting speech to text.
  > "The project also includes aiy.cloudspeech which does use cloud APIs for general speech recognition, but this is different from the wake word detection - it's for converting full speech to text after you've already triggered the system."

## Outcome
I built a functional voice assistant system that uses a state machine to manage interactions and visual feedback. I successfully integrated the Google Assistant API by navigating specific hardware and software limitations.

## Caveats
The project does not support the Raspberry Pi Zero because it lacks the processing power for local hotword detection.
