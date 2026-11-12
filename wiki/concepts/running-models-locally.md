---
type: concept
slug: running-models-locally
title: "Running models locally with Ollama"
description: "I use Ollama to serve local models for various applications, ranging from automated coding tasks to interactive blog assistants."
posts: [llmbenchmark, localagent2, deepseekharnesshybrid, deepseekharnessollama, orchestration1, orchestration3, rag1, agenticaiforprofessionals2, localagent, LLM-Wiki]
status: current
checked: "2026-11-12"
source_hash: "ce2bed38df9c"
generated_by: gemma4:12b
---

**Summary.** I use Ollama to serve local models for various applications, ranging from automated coding tasks to interactive blog assistants. While local models provide privacy and cost benefits, they require more precise instructions and smaller, well-defined tasks to perform reliably compared to larger cloud models.

## The idea
- Local models via Ollama can successfully perform complex tasks like building games when provided with highly detailed specifications.
- Smaller local models are often more suitable for real-time interactions, but they require more detailed documentation than cloud models.
- A local-first architecture can provide a provider-agnostic layer that ensures citations remain grounded in retrieved data.
- Local models are reliable for specific, small tasks that have only one thing to get right.
- Local models can serve as backends for browser-based agent loops to avoid hardware-specific issues like lost WebGPU contexts.

## Claims
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The local model successfully processed approximately 2 million tokens with an 81% cache hit rate.
  > "The local model took just over an hour for the same game." — deepseekharnessollama
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid
- The system runs entirely locally on a MacBook Air without requiring cloud APIs.
  > "This post is the actual build: Phases 1 through 3 of that plan, all of it running locally on my 32GB M4 MacBook Air through Docker Compose, with Ollama serving both the chat model and the embeddings — no cloud API required to get a working system end to end." — agenticaiforprofessionals2
- The hosted backend avoids the issue of WebGPU losing its context on some hardware.
  > "The only reliable fix on that hardware is to switch to the Hosted backend, which bypasses WebGPU entirely and runs natively on my server instead." — localagent
- The local model produced the exact same code as the reference build except for minor formatting.
  > "Apart from blank lines and final newlines, they were the same, line for line, in all 14 files." — deepseekharnessollama
- The local model did not create any extra files or scripts that were not requested.
  > "The model also created nothing it was not asked to: no server script, no test files and no plan file of its own." — deepseekharnessollama

## Where the posts differ
- The requirements for model instructions vary based on the specific task and the size of the model being used.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid

## What I concluded
Running models locally with Ollama is a viable way to build robust, private, and cost-effective systems. Success depends on matching the complexity of the task to the capabilities of the specific local model and providing detailed documentation to compensate for smaller parameter counts.
