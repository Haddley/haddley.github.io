---
type: post
slug: deepseekharness
title: "DeepSeek Harness (Part 1)"
date: "2026-08-23"
part: 1
builds_on: [invaders]
topics: [agent-workflows, automated-testing, software-verification, prompt-engineering]
tools: [DeepSeek Harness, DeepSeek, Chrome DevTools Protocol, Python]
status: current
checked: "2026-11-05"
source_hash: "562c1530ebc8"
generated_by: gemma4:12b
---

**Summary.** I tested the DeepSeek Harness tool by providing it with a Product Requirements Document and a Product Design Document for a Space Invaders recreation. The agent successfully built the game, verified its own work through logic and headless-browser tests, and produced a fully functional product.

## What I did
- I configured the DeepSeek Harness environment with a specific project folder.
- I provided the agent with detailed requirements and design documents.
- I observed the agent read the documents and build the game.
- I verified the agent's automated test results.
- I hosted and played the final game to confirm it met the specifications.

## Claims
- DeepSeek Harness is a modular tool where components like models and UI can be swapped.
  > "DeepSeek Harness is a developer-preview tool where everything is a plugin — models, tools, sandboxes, storage, even the whole UI can be swapped or recomposed."
- The agent read the documentation before it began writing any code.
  > "The agent first located and read both documents before writing any code."
- The agent performed 96 Node logic checks to verify the game mechanics.
  > "**96 Node logic checks** covering spawn, movement, collisions, shield erosion, respawn and invulnerability, UFO scoring, wave transitions, the ground-line game-over, and restart."
- The agent ran 24 headless-browser end-to-end checks using the Chrome DevTools Protocol.
  > "**24 headless-browser E2E checks** driven over the Chrome DevTools Protocol, which loaded the page, verified the start-screen pixel colours, played a live round, tested the game-over and restart path, spawned wave 2 with shields intact, and confirmed the hi-score survives a full page reload."
- The agent created a debug handle not in the original spec to facilitate its own testing.
  > "A notable detail: the agent added a `window.__invaders` debug handle (not in the spec) specifically so the E2E tests would have something to drive."
- The final game requires no build step or external dependencies.
  > "**Zero dependencies, no build step, no server**"

## Outcome
I concluded that the workflow of an agent verifying its own output through automated tests is more significant than the code it produces.

## Caveats
The post does not show the specific internal prompts used by the agent to generate the test suite.
