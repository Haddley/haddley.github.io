---
type: post
slug: claudecode12
title: "Claude Code (Part 12)"
date: "2026-05-08"
part: 12
builds_on: [claudecode11]
topics: [claude-code, deepseek-api, llm-cost-optimization, local-vs-cloud-models]
tools: [Claude Code, DeepSeek, Ollama, Live Server]
status: current
checked: "2026-11-05"
source_hash: "c8c1f74393b0"
generated_by: gemma4:12b
---

**Summary.** I explored using the DeepSeek API as a high-speed, low-cost alternative to local models for Claude Code. I found that this configuration provides near-instant responses and significant cost savings compared to local execution.

## What I did
- I configured Claude Code to use the DeepSeek API via Anthropic-compatible endpoints.
- I set up the necessary environment variables for the API key and model.
- I topped up the DeepSeek account after encountering an insufficient balance error.
- I compared the performance and cost of the DeepSeek setup against a local Ollama model.
- I iterated on a breakout game and verified the improvements in a browser.

## Claims
- The local model was slow and consumed significant system resources.
  > "It worked well, but it was slow (3m 40s for the breakout game) and pinned the machine while it ran."
- The DeepSeek API approach resulted in very low costs per session.
  > "No RAM pressure, near-instant responses, and at a fraction of the cost: the whole session — 5 API requests and 114,235 tokens — came to less than $0.01."
- The trade-off for using the cloud API is the loss of local data privacy.
  > "The trade-off is that your prompts and code go to an external service rather than staying on-device."
- I encountered an error because the account had no credit.
  > "*I asked Claude Code to create a breakout game but got an API Error 402 — Insufficient Balance on the DeepSeek account*"
- The final score of the game was 700.
  > "*I cleared all the bricks and won — final score 700*"

## Outcome
I successfully integrated the DeepSeek API with Claude Code to achieve faster performance and lower costs than local models. I concluded that while the cloud approach is faster, local models remain the better choice for sensitive codebases.

## Caveats
The post does not specify the exact security protocols of the DeepSeek cloud environment.
