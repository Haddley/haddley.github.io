---
type: concept
slug: ai-agents
title: "AI agents"
description: "My posts explore the capabilities of AI agents in executing complex tasks, from building games and hardware integrations to automating legal documentation."
posts: [deepseekharnesshybrid, attiny1, specdriven3, specdriven4, specdriven1, specdriven2, deepseekharnessollama, claudecode15, deepseekharness, claudecode14]
status: current
checked: "2026-11-06"
source_hash: "ff8cd7ce0fd8"
generated_by: gemma4:12b
---

**Summary.** My posts explore the capabilities of AI agents in executing complex tasks, from building games and hardware integrations to automating legal documentation. I examine how different agentic frameworks and tools handle ambiguity, verification, and the integration of local versus hosted models.

## The idea
- Agents can perform complex multi-step tasks like building games and hardware integrations by following detailed specifications.
- Robust agentic workflows use multi-layer review processes and proactive clarification to catch bugs and resolve ambiguities.
- Hybrid architectures can combine hosted models for high-level planning with local models for small, well-defined sub-tasks.
- Agentic tools can autonomously manage toolchains, install dependencies, and document hardware quirks.
- The effectiveness of an agent often depends on the specificity of the input documentation and the rigor of the verification steps.

## Claims
- The agent successfully built the game, verified its own work through logic and headless-browser tests, and produced a fully functional product.
  > "DeepSeek Harness is a developer-preview tool where everything is a plugin — models, tools, sandboxes, storage, even the whole UI can be swapped or recomposed." — deepseekharness
- The agent performed 96 Node logic checks to verify the game mechanics.
  > "**96 Node logic checks** covering spawn, movement, collisions, shield erosion, respawn and invulnerability, UFO scoring, wave transitions, the ground-line game-over, and restart." — deepseekharness
- The agent automatically installed the required toolchain and libraries when it found them missing.
  > "Claude created the project folder, discovered `arduino-cli` was not installed, and worked out the toolchain from scratch: checking serial devices, installing `arduino-cli` via Homebrew, then the `arduino:avr` core and `LiquidCrystal` library." — claudecode15
- The agent created a local wiki to store knowledge about the hardware quirks.
  > "Along the way Claude also stood up a small `.llmwiki` in the project — its own notes on the board's real wiring and the sketch's design — so the next session starts from what was actually learned here rather than rediscovering the D12-is-really-D11 quirk from scratch." — claudecode15
- BMAD is the only tool that proactively asks for clarification on ambiguities.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- The three-layer review process caught several bugs before I saw them.
  > "Its three-layer review found real defects and correctly rejected several false findings." — specdriven3
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The hybrid model works if the tasks are small and clearly defined.
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid

## Where the posts differ
- Different tools handle ambiguity differently, with some making silent decisions while others proactively ask for clarification.
  > "OpenSpec did not ask a single clarifying question." — specdriven1
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- Local models require much more detailed documentation to succeed compared to the looser specifications acceptable by cloud models.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid

## What I concluded
AI agents are highly capable of handling complex, multi-step workflows when supported by rigorous verification processes and clear specifications. The choice of architecture and tool significantly impacts how effectively an agent can navigate ambiguity and manage hardware or software constraints.
