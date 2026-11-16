---
type: concept
slug: ai-agents
title: "AI agents"
description: "My posts explore the development of AI agents through structured harnesses and spec-driven workflows."
posts: [deepseekharnessaccounting, deepseekharnesshybrid, attiny1, specdriven3, specdriven4, specdriven1, specdriven2, deepseekharnessollama, claudecode15, deepseekharness]
status: current
checked: "2026-11-16"
source_hash: "1e43048d890c"
generated_by: gemma4:12b
---

**Summary.** My posts explore the development of AI agents through structured harnesses and spec-driven workflows. I demonstrate how these agents can navigate complex software requirements, handle hardware integration, and perform multi-step reasoning tasks by following precise documentation.

## The idea
- Agents perform best when they follow a structured harness that uses specific documentation and verification steps.
- A hybrid architecture works well when a hosted model plans high-level tasks and local subagents execute small, well-defined jobs.
- Spec-driven tools help agents manage ambiguity by enforcing review processes and requesting clarification before making decisions.
- Agents can autonomously manage toolchains, identify hardware quirks, and verify their own work through automated tests.

## Claims
- The agent read the documentation before it began writing any code.
  > "The agent first located and read both documents before writing any code." — deepseekharness
- The agent performed 96 Node logic checks to verify the game mechanics.
  > "**96 Node logic checks** covering spawn, movement, collisions, shield erosion, respawn and invulnerability, UFO scoring, wave transitions, the ground-line game-over, and restart." — deepseekharness
- The agent automatically installed the required toolchain and libraries when it found them missing.
  > "Claude created the project folder, discovered `arduino-cli` was not installed, and worked out the toolchain from scratch: checking serial devices, installing `arduino-cli` via Homebrew, then the `arduino:avr` core and `LiquidCrystal` library." — claudecode15
- BMAD is the only tool that asks for clarification instead of making silent decisions.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- The planner caught three instances where a subagent failed to perform any work.
  > "The planner caught all three empty runs because it ran the tests itself after every piece." — deepseekharnesshybrid
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The plan step in Spec-Kit caught a math error in the specification.
  > "Convergence caught a real integer-truncation bug, and the plan step caught a math error in its own spec." — specdriven2
- The agent created a debug handle not in the original spec to facilitate its own testing.
  > "A notable detail: the agent added a `window.__invaders` debug handle (not in the spec) specifically so the E2E tests would have something to drive." — deepseekharness

## Where the posts differ
- OpenSpec is the cheapest option because it skips the steps of asking the user and performing post-facto verification.
  > "It is fastest and cheapest largely *because* it skips both things that cost the other two tools time, turns, and money: asking you anything, and checking its own work after the fact." — specdriven4

## What I concluded
Effective AI agents require a combination of rigorous specification, modular architecture, and automated verification to handle complex tasks. Success depends on providing clear constraints and allowing the agent to navigate technical nuances independently.
