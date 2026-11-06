---
type: post
slug: deepseekharnessollama
title: "DeepSeek Harness (Part 2)"
date: "2026-09-27"
part: 2
builds_on: [deepseekharness, invaders]
topics: [local-llms, prompt-engineering, software-architecture, llm-orchestration]
tools: [DeepSeek Harness, Ollama, Qwen3-Coder, Mac Studio]
status: current
checked: "2026-11-05"
source_hash: "61a16873f754"
generated_by: gemma4:12b
---

**Summary.** I tested whether the DeepSeek Harness can function using a local model served via Ollama instead of the DeepSeek cloud API. I discovered that while the harness supports local models, smaller local models require significantly more detailed documentation to produce a successful build.

## What I did
- I configured a custom provider in DeepSeek Harness to point to a local Ollama instance.
- I attempted to build a Space Invaders game using a local qwen3-coder:30b model.
- I identified that the local model failed when using the same brief specifications as the cloud models.
- I authored detailed ARCHITECTURE, PRD, and PDD documents to provide the local model with explicit instructions.
- I successfully completed a full build with the local model using the detailed documentation.

## Claims
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons."
- The local model produced the exact same code as the reference build except for minor formatting.
  > "Apart from blank lines and final newlines, they were the same, line for line, in all 14 files."
- The local model did not create any extra files or scripts that were not requested.
  > "The model also created nothing it was not asked to: no server script, no test files and no plan file of its own."
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model."
- The local model took over an hour to complete the build while the cloud models finished in minutes.
  > "The local model took just over an hour for the same game."
- The local model successfully processed approximately 2 million tokens with an 81% cache hit rate.
  > "The status bar recorded 42 steps in a single turn, about 2 million tokens processed, an 81% cache hit rate, and a generation speed of around 22 tokens per second on my M1 Max Mac Studio."

## Outcome
I proved that DeepSeek Harness can drive a local model through a full build without a cloud API key. I also demonstrated that precise documentation is the key to making smaller local models perform reliably.

## Caveats
The post does not show the specific performance of other local models beyond the qwen3-coder:30b model.
