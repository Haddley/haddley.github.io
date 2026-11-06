---
type: concept
slug: running-models-locally
title: "Running models locally with Ollama"
description: "I have explored using Ollama to run models locally for various applications, including game development and automated agent workflows."
posts: [localagent2, deepseekharnesshybrid, deepseekharnessollama, orchestration1, orchestration3, rag1, agenticaiforprofessionals2, localagent, LLM-Wiki, claudecode11]
status: current
checked: "2026-11-06"
source_hash: "2f79c8d73786"
generated_by: gemma4:12b
---

**Summary.** I have explored using Ollama to run models locally for various applications, including game development and automated agent workflows. These experiments show that local models can produce high-quality results when the tasks are well-defined and the prompts provide sufficient detail.

## The idea
- Local models via Ollama can replace cloud APIs for tasks like generating game code or powering chat assistants.
- Smaller local models require much more detailed documentation and specific instructions to succeed compared to larger cloud models.
- Local models are most reliable when they perform small, well-defined tasks with a single goal.
- Local models can process large amounts of tokens and maintain high cache hit rates during complex builds.
- Hardware requirements, such as high memory for 30B models, must be considered when choosing a local setup.

## Claims
- A local 30B model can generate a fully functional game without any external data transmission or API costs.
  > "Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API." — claudecode11
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The local model produced the exact same code as the reference build except for minor formatting.
  > "Apart from blank lines and final newlines, they were the same, line for line, in all 14 files." — deepseekharnessollama
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid
- The local model only saves money when the code it writes is much longer than its description.
  > "The local model saves money only when the code it writes is much longer than its description." — deepseekharnesshybrid
- The 30B model required over 41 GB of memory to run.
  > "Ollama was using 41.48 GB of memory to run the 30B model — essentially the whole machine." — claudecode11
- The local model successfully processed approximately 2 million tokens with an 81% cache hit rate.
  > "The local model took just over an hour for the same game." — deepseekharnessollama

## Where the posts differ
- The reports vary on the specific size of the model needed for reliable performance, ranging from 9B for chat to 30B for complex code generation.
  > "27B was the original plan, and it downloads and runs fine directly on the server — but through this chat widget, a one-word reply took over three minutes and I gave up waiting." — localagent
  > "Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API." — claudecode11

## What I concluded
Running models locally with Ollama is a viable way to eliminate API costs and ensure privacy while maintaining high performance. Success depends on matching the specific task complexity to the appropriate model size and providing highly detailed instructions for smaller local models.
