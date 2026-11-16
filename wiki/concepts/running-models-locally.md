---
type: concept
slug: running-models-locally
title: "Running models locally with Ollama"
description: "I have explored running models locally using Ollama to power various applications, including a blog assistant and a game-building harness."
posts: [llmbenchmark, localagent2, deepseekharnesshybrid, deepseekharnessollama, orchestration1, orchestration3, rag1, agenticaiforprofessionals2, localagent, LLM-Wiki]
status: current
checked: "2026-11-16"
source_hash: "fe8bc03ec7dd"
generated_by: gemma4:12b
---

**Summary.** I have explored running models locally using Ollama to power various applications, including a blog assistant and a game-building harness. These experiments demonstrate that while local models are capable of complex tasks, they require specific architectural choices like detailed documentation and strict context management to remain reliable.

## The idea
- Local models can serve as backends for interactive agents and tools when hosted via Ollama.
- Smaller local models require more detailed specifications and documentation than larger cloud models to succeed.
- Local execution helps avoid hardware-specific issues like WebGPU context loss during live chat.
- Success with local models depends on keeping tasks small and well-defined to ensure reliability.

## Claims
- I tested whether the DeepSeek Harness can function using a local model served via Ollama instead of the DeepSeek cloud API.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The local model produced a working game that matches the specifications.
  > "Apart from blank lines and final newlines, they were the same, line for line, in all 14 files." — deepseekharnessollama
- The hosted backend avoids WebGPU context loss issues.
  > "The only reliable fix on that hardware is to switch to the Hosted backend, which bypasses WebGPU entirely and runs natively on my server instead." — localagent
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid
- The local model took over an hour to complete the build while the cloud models finished in minutes.
  > "The local model took just over an hour for the same game." — deepseekharnessollama
- The local model successfully processed approximately 2 million tokens with an 81% cache hit rate.
  > "The status bar recorded 42 steps in a single turn, about 2 million tokens processed, an 81% cache hit rate, and a generation speed of around 22 tokens per second on my M1 Max Mac Studio." — deepseekharnessollama

## Where the posts differ
- The blog assistant evolved from a simple two-backend system to a more complex architecture involving a gatekeeper and a custom wiki.
  > "Post metadata is pre-built at deploy time into agent-data.json, which the component fetches when the panel first opens." — localagent
  > "The quote is the post's own text by construction, not by the model's good behaviour." — localagent2

## What I concluded
Running models locally with Ollama is a viable way to build private, capable agents for specific tasks. However, you must provide very explicit instructions and manage context carefully to compensate for the limitations of smaller local models.
