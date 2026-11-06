---
type: post
slug: minigpt3
title: "MiniGPT (Part 4)"
date: "2026-10-05"
part: 4
builds_on: [minigpt2, mlx1, minigpt4]
topics: [machine-learning-engines, lazy-evaluation, kernel-compilation, unified-memory, pytorch-vs-mlx]
tools: [MLX, PyTorch, Mac Studio, Jupyter, Python]
status: current
checked: "2026-11-05"
source_hash: "31fa32c82620"
generated_by: gemma4:12b
---

**Summary.** I rebuild the MiniGPT machine using Apple's MLX library to explore how different engines affect performance on Apple Silicon. I find that while the machine remains the same, the MLX engine provides significant speed and memory advantages through unified memory and compiled training steps.

## What I did
- I rebuilt the MiniGPT machine in MLX to test the performance of a different underlying engine.
- I compared the performance of PyTorch and MLX on the same Mac hardware.
- I identified how lazy evaluation and compilation provide speed gains in the MLX framework.
- I verified that both engines produce nearly identical results for the same training data.

## Claims
- The MLX engine provides a significant speed advantage when the training step is compiled.
  > "With it, MLX is about a quarter faster than itself, and 16% faster than PyTorch."
- MLX uses less memory than PyTorch for the exact same machine and task.
  > "**MLX uses less memory either way:** 3.7 to 3.9 GB against PyTorch's 4.6 GB, about 15 to 20% less for exactly the same machine."
- The results from both the PyTorch and MLX versions are nearly identical.
  > "But they should end up in the same place, and they do: after 3,000 steps, the MLX machine scores **0.689 bits per byte** on the test stories, and the PyTorch machine from Part 3 scores **0.697**."
- MLX avoids memory copying because Apple chips share a single pool of memory.
  > "MLX is built around that, so there is nothing to copy and no `.to(device)` anywhere: the training batch goes straight into an MLX array, and the GPU reads it where it is."
- Lazy evaluation allows MLX to see the full list of steps before it starts.
  > "That sounds like a delay, but it gives MLX the whole list of steps before it starts, so it can see which ones can be done together, and which ones are never needed at all."
- The difference in scores between the two engines is roughly the same as the difference caused by random initialization.
  > "That gap is about the size of the luck between two random starts of the same machine: in Part 5, three random starts of one design scored up to 0.007 apart."

## Outcome
I built a version of MiniGPT in MLX that runs faster and uses less memory than the PyTorch version while producing the same results. I concluded that the engine determines how calculations run, while the machine defines what to calculate.

## Caveats
The two versions do not start from exactly the same random numbers because the two libraries draw their starting parameters differently.
