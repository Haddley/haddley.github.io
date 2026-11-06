---
type: post
slug: minigpt6
title: "MiniGPT (Part 7)"
date: "2026-10-05"
part: 7
builds_on: [minigpt4, minigpt, minigpt-grown, minigpt2, minigpt3]
topics: [sliding-window-attention, memory-complexity, chunked-computation, information-propagation]
tools: [MLX, Python, Jupyter Notebook]
status: current
checked: "2026-11-05"
source_hash: "0561a854172d"
generated_by: gemma4:12b
---

**Summary.** I explore why the cost of attention grows quadratically with the length of a row and how a sliding window can mitigate this cost. I demonstrate that while a mask does not save memory, computing in chunks does, and I use a secret-word test to show how far information can travel through stacked blocks.

## What I did
- I measured the memory costs of full attention versus sliding windows.
- I implemented a chunked window to reduce memory usage.
- I built a secret-word test to evaluate how far information travels.
- I provided a follow-along notebook for Mac users to replicate the results.

## Claims
- The memory required for attention grows with the square of the row length.
  > "The matches, and the memory to hold them, grow with the *square* of the row."
- A sliding window limits the number of matches each hidden state makes.
  > "Then each hidden state makes at most 256 matches, and the total grows only *in step with* the row: twice the row, twice the matches."
- Using a mask to limit attention does not actually reduce the memory cost.
  > "But it saves no memory at all: the machine still works out every match in the full row-by-row grid, and only then throws most of them away."
- Chunking the row into segments is the method that actually saves memory.
  > "That covers every hidden state's window, and the biggest grid ever built is 256 by 512, however long the row."
- Full attention required over half the memory of the Mac at 4,096 positions.
  > "**At 4,096, full attention needs 35.5 GB**, more than half the Mac, and 1.9 seconds a step."
- The chunked window required significantly less memory and time at 4,096 positions.
  > "The chunked window needs 15.1 GB and 0.8 seconds."
- The 256-position row cannot see information beyond its own window.
  > "**The 256-position row cannot see past its row.** Beyond 256 pieces, the secret has fallen off the front, and it can only guess."
- Chunked windows allowed the model to process 16,384 positions in 59 GB.
  > "Computing in chunks is what saves memory: 16,384 positions in 59 GB, where full attention stopped at 4,096."

## Outcome
I built a chunked sliding window implementation that allows the model to handle much longer rows while keeping memory costs manageable. I also proved that information can travel across blocks even when individual windows are small.

## Caveats
A sliding window only provides the same behavior as full attention if the window is as long as the entire row.
