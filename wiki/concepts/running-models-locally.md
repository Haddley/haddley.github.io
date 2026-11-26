---
type: concept
slug: running-models-locally
title: "Running models locally with Ollama"
description: "I have explored using Ollama to run models locally for various applications, including game development and blog assistants."
posts: [localagent2, deepseekharnesshybrid, deepseekharnessollama, orchestration1, orchestration3, rag1, agenticaiforprofessionals2, localagent, LLM-Wiki, claudecode11]
status: current
checked: "2026-11-26"
source_hash: "6b94712738f2"
generated_by: gemma4:12b
---

**Summary.** I have explored using Ollama to run models locally for various applications, including game development and blog assistants. These experiments show that local models can perform complex tasks reliably when the instructions are specific and the scope of the task is well-defined.

## The idea
- Ollama allows for the execution of complex tasks like game development without external data transmission or API costs.
- Smaller local models require more detailed documentation and precise specifications to succeed compared to larger cloud models.
- Local models are reliable for specific, well-defined tasks but may struggle with broader or less defined instructions.
- Local models can successfully process large amounts of tokens and generate significant amounts of code in a single pass.
- Local models provide a way to maintain privacy and reduce costs while still achieving high-quality results in controlled environments.

## Claims
- Ollama provides a specific command to run Claude Code with a local model.
  > "Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API." — claudecode11
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The local model produced the exact same code as the reference build except for minor formatting.
  > "Apart from blank lines and final newlines, they were the same, line for line, in all 14 files." — deepseekharnessollama
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid
- The local model successfully processed approximately 2 million tokens with an 81% cache hit rate.
  > "The local model took just over an hour for the same game." — deepseekharnessollama
- The 3B model did not fail a simple category question, while the 1.5B model did.
  > "called tools redundantly, hit the round limit, and returned an empty response" — localagent

## Where the posts differ
- The reports show that while local models can perform complex tasks, they require much more detailed documentation than cloud models to achieve the same results.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid

## What I concluded
Running models locally with Ollama is a viable way to eliminate API costs and ensure privacy while performing complex tasks. Success with local models depends heavily on providing highly detailed specifications and keeping the scope of the task small and well-defined.
