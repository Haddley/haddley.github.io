---
type: concept
slug: ai-agents
title: "AI agents"
description: "My posts explore the capabilities of AI agents in executing complex tasks, from building games and hardware integrations to automating legal documentation."
posts: [deepseekharnesshybrid, attiny1, specdriven3, specdriven4, specdriven1, specdriven2, deepseekharnessollama, claudecode15, deepseekharness, claudecode14]
status: current
checked: "2026-11-26"
source_hash: "47fbec74b33a"
generated_by: gemma4:12b
---

**Summary.** My posts explore the capabilities of AI agents in executing complex tasks, from building games and hardware integrations to automating legal documentation. I examine how different agentic frameworks and tools handle ambiguity, verification, and the integration of local versus hosted models.

## The idea
- Agents can perform autonomous verification and self-correction through multi-layer review processes.
- Hybrid architectures use hosted models for high-level planning while local models execute small, well-defined tasks.
- Agentic tools like Claude Code can navigate hardware quirks and manage complex toolchains automatically.
- Spec-driven workflows provide structure by forcing agents to resolve ambiguities before they make silent decisions.
- Local models are viable for agentic tasks but require much more detailed documentation than cloud models.

## Claims
- The agent performed numerous logic checks and headless-browser tests to verify its own work.
  > "**96 Node logic checks** covering spawn, movement, collisions, shield erosion, respawn and invulnerability, UFO scoring, wave transitions, the ground-line game-over, and restart." — deepseekharness
- The agent performed 24 headless-browser end-to-end checks using the Chrome DevTools Protocol.
  > "**24 headless-browser E2E checks** driven over the Chrome DevTools Protocol, which loaded the page, verified the start-screen pixel colours, played a live round, tested the game-over and restart path, spawned wave 2 with shields intact, and confirmed the hi-score survives a full page reload." — deepseekharness
- The agent automatically installed the required toolchain and libraries when it found them missing.
  > "Claude created the project folder, discovered `arduino-cli` was not installed, and worked out the toolchain from scratch: checking serial devices, installing `arduino-cli` via Homebrew, then the `arduino:avr` core and `LiquidCrystal` library." — claudecode15
- The agent created a local wiki to store knowledge about the hardware quirks.
  > "Along the way Claude also stood up a small `.llmwiki` in the project — its own notes on the board's real wiring and the sketch's design — so the next session starts from what was actually learned here rather than rediscovering the D12-is-really-D11 quirk from scratch." — claudecode15
- BMAD is the only tool that proactively asks for clarification instead of making silent decisions.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- The three-layer review process caught several bugs before I saw them.
  > "Its three-layer review found real defects and correctly rejected several false findings." — specdriven3
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The hybrid model works if the tasks are small and clearly defined.
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid
- The local model is reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid

## Where the posts differ
- OpenSpec makes independent decisions on technical details without asking, while BMAD proactively seeks clarification.
  > "That matters, because the request I gave it left real decisions open, and it made every one of them itself:" — specdriven1
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- Local models require significantly more detailed documentation to succeed compared to the looser specifications used by cloud models.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid

## What I concluded
AI agents are most effective when they operate within structured, spec-driven frameworks that enforce verification and clarify ambiguities. While local models can perform agentic tasks, they require much more precise instructions than their cloud-based counterparts.
