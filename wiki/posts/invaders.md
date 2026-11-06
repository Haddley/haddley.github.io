---
type: post
slug: invaders
title: "Space Invaders"
date: "2026-06-19"
builds_on: []
topics: [ai-coding-agents, model-comparison, automated-debugging, prompt-engineering]
tools: [OpenCode, Big Pickle, DeepSeek V4 Pro, Claude Code, Sonnet 4.6, Web Audio API]
status: current
checked: "2026-11-05"
source_hash: "b5e70eb531b3"
generated_by: gemma4:12b
---

**Summary.** I investigated the capabilities of three different AI coding agents by building a Space Invaders clone using the same prompt for each. The experiment revealed that while all models produced a working game, they differed significantly in their methodical approach, speed, and proactive bug detection.

## What I did
- I set up a Space Invaders project using a shared PRD and PDD.
- I ran the project using OpenCode with the Big Pickle model.
- I ran the project using OpenCode with the DeepSeek V4 Pro API.
- I ran the project using Claude Code with Sonnet 4.6.
- I compared the speed, code quality, and bug detection of each run.

## Claims
- I used the same prompt for every run to ensure the only variables were the tool and the model.
  > "A: So the only thing that changes is the tool and the model."
- Big Pickle produced a complete file structure in one pass but required manual debugging for audio and timing.
  > "Big Pickle (OpenCode's free model) moved fast and produced a complete file structure in one pass, but needed two rounds of debugging to fix a game-loop timing bug and a UFO audio leak."
- DeepSeek V4 Pro validated syntax across all source files before serving them.
  > "DeepSeek V4 Pro was the most thorough during the build phase — it validated syntax across all 21 source files before serving them, and caught a malformed function body in audio.js that would have silently broken the audio system."
- Claude Code was the most methodical and caught the UFO audio bug proactively.
  > "It presented a build plan before writing a single file, asked for permission at each write step, and caught the UFO audio bug itself without being told."
- The UFO audio bug appeared in two of the three runs.
  > "The UFO audio bug — where the saucer sound keeps playing after the sprite exits the screen — appeared in two of the three runs."
- All three models produced a working Space Invaders clone from a single prompt.
  > "All three models produced a (mostly) working Space Invaders clone from a single prompt — which still feels remarkable."

## Outcome
I concluded that while all three models successfully built the game, they differed in their internal processes: Big Pickle was the fastest, DeepSeek was the most thorough during build, and Claude Code was the most methodical.

## Caveats
A clean first build tells you very little until someone plays the game.
