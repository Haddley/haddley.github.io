---
type: concept
slug: running-models-locally
title: "Running models locally with Ollama"
description: "I have explored using Ollama to run models locally for various applications, ranging from simple chat interfaces to complex agentic workflows."
posts: [deepseekharnesshybrid, deepseekharnessollama, orchestration1, orchestration3, rag1, agenticaiforprofessionals2, localagent, LLMWiki, claudecode11, ollamadeepsekr1applemacbookinstall]
status: current
checked: "2026-11-06"
source_hash: "94c3db12b748"
generated_by: gemma4:12b
---

**Summary.** I have explored using Ollama to run models locally for various applications, ranging from simple chat interfaces to complex agentic workflows. These experiments show that local models can produce high-quality results and eliminate API costs when I provide sufficient detail and select the right model size for the task.

## The idea
- Local models via Ollama can replace cloud APIs for tasks like game generation and automated coding.
- Smaller local models require much more detailed documentation and specific instructions to succeed.
- Model size directly impacts performance, where larger models offer better reasoning but require more memory and time.
- Local models are reliable for specific, well-defined tasks but may struggle with complex, multi-step instructions without a clear plan.
- Local execution provides privacy and cost benefits, especially when the generated output is significantly longer than the input prompt.

## Claims
- A local 30B model can generate a fully functional game without any external data transmission or API costs.
  > "Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API." — claudecode11
- The local model produced a working game that matches the specifications.
  > "The screen matched the specification: five rows of aliens, the red UFO crossing the top, arched green shields taking damage, the score and wave counter, and the lives shown as small cannons." — deepseekharnessollama
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- The 32B model is ideal for tasks where accuracy is more important than speed.
  > "**32B Model:** Suited for applications prioritising accuracy over speed, such as advanced research or long-form content." — ollamadeepsekr1applemacbookinstall
- The 70B model is best for advanced reasoning and long-context processing.
  > "**70B Model:** Suited for advanced reasoning, multilingual understanding, and long-context processing." — ollamadeepsekr1applemacbookinstall
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right." — deepseekharnesshybrid
- The local model only saves money when the code it writes is much longer than its description.
  > "The local model saves money only when the code it writes is much longer than its description." — deepseekharnesshybrid
- The 3B model did not fail a simple category question, while the 1.5B model did.
  > "called tools redundantly, hit the round limit, and returned an empty response" — localagent

## Where the posts differ
- The reports vary on the optimal model size for reliability, ranging from 3B for simple tasks to 70B for advanced reasoning.
  > "called tools redundantly, hit the round limit, and returned an empty response" — localagent
  > "**70B Model:** Suited for advanced reasoning, multilingual understanding, and long-context processing." — ollamadeepsekr1applemacbookinstall

## What I concluded
Running models locally with Ollama is a viable way to reduce costs and ensure privacy while maintaining high performance. Success depends on matching the specific model size to the task complexity and providing highly detailed instructions for smaller models.
