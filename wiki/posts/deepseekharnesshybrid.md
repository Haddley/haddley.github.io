---
type: post
slug: deepseekharnesshybrid
title: "DeepSeek Harness (Part 3)"
date: "2026-10-16"
part: 3
builds_on: [deepseekharness, deepseekharnessollama]
topics: [subagents, hybrid-ai-workflows, local-llms, prompt-engineering]
tools: [DeepSeek V4 Pro, qwen3-coder30b, Ollama, DeepSeek Harness]
status: current
checked: "2026-11-05"
source_hash: "1d147629977d"
generated_by: gemma4:12b
---

**Summary.** I explored a hybrid architecture where a hosted model performs high-level planning while local subagents execute small, well-defined tasks. I found that this pattern works reliably only when the tasks are small and the hosted model provides precise specifications and tests for each piece.

## What I did
- I implemented a subagent pattern where DeepSeek V4 Pro acts as the planner.
- I delegated 15 small functions to local qwen3-coder:30b subagents via Ollama.
- I required the planner to write specific comments and tests for every piece before handoff.
- I verified every subagent output by running the tests automatically.
- I compared the cost and reliability of this hybrid approach against a single hosted model.

## Claims
- The hybrid model works if the tasks are small and clearly defined.
  > "The short answer: it works, provided the pieces are small and written down exactly."
- The planner caught three instances where a subagent failed to perform any work.
  > "The planner caught all three empty runs because it ran the tests itself after every piece."
- The cost of the hybrid approach was nearly identical to using a hosted model alone.
  > "The hosted model alone built the same game in 14 minutes for $0.37, so the bill came out about the same."
- Local models are reliable only when the job is small and has one thing to get right.
  > "The local model is reliable when a job is small and has one thing to get right."
- Vision models failed to identify visual bugs in the game.
  > "None of them spotted the squashed aliens, and all of them invented problems in the correct game."
- The local model only saves money when the code it writes is much longer than its description.
  > "The local model saves money only when the code it writes is much longer than its description."

## Outcome
I built a playable Space Invaders game using a hybrid of hosted and local models. I concluded that while the hybrid approach did not reduce costs in this specific case, it successfully utilized local models for repetitive, well-defined tasks.

## Caveats
The post does not show a scenario where the hybrid approach significantly reduced costs, as the overhead of detailed descriptions for small functions balanced the savings.
