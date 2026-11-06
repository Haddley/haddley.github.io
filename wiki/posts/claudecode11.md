---
type: post
slug: claudecode11
title: "Claude Code (Part 11)"
date: "2026-04-10"
part: 11
builds_on: []
topics: [local-llms, claude-code, ollama-integration, private-ai-development]
tools: [Claude Code, Ollama, qwen3-coder30b, Python]
status: current
checked: "2026-11-05"
source_hash: "53c07bf8b1f8"
generated_by: gemma4:12b
---

**Summary.** I tested Claude Code using a local Ollama model instead of the Anthropic API. The experiment showed that a local 30B model can generate a fully functional game without any external data transmission or API costs.

## What I did
- I launched Claude Code using the local Ollama backend.
- I selected the qwen3-coder:30b model from the provided list.
- I prompted the model to build a breakout game.
- I monitored the system memory usage during the generation process.
- I reviewed the final code and played the resulting game.

## Claims
- Ollama provides a specific command to run Claude Code with a local model.
  > "Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API."
- The 30B model required over 41 GB of memory to run.
  > "Ollama was using 41.48 GB of memory to run the 30B model — essentially the whole machine."
- The model generated 444 lines of code in a single pass.
  > "It wrote 444 lines of HTML, CSS and JavaScript in one shot."
- The generation of the full feature set took 3 minutes and 40 seconds.
  > "*I read the summary — full feature set, cooked in 3m 40s*"
- The local model produced a working game without requiring any iterations.
  > "Running a 30B coder model locally through Ollama and Claude Code produced a working game with no iteration needed."
- The high memory footprint is manageable on a Mac Studio with 64 GB of RAM.
  > "The memory footprint is steep, but on a Mac Studio with 64 GB it was fine."

## Outcome
I successfully built a functional Breakout game using a local model. I concluded that local models can provide high-quality results for coding tasks without using external APIs.

## Caveats
The high memory usage of the 30B model may not be feasible on machines with less than 64 GB of RAM.
