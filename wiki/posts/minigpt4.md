---
type: post
slug: minigpt4
title: "MiniGPT (Part 5)"
date: "2026-10-05"
part: 5
builds_on: [minigpt3, minigpt5]
topics: [transformer-architecture, ablation-studies, rotary-position-embeddings, grouped-query-attention, model-optimization]
tools: [MLX, Python, Jupyter Notebook, Llama 3.2]
status: current
checked: "2026-11-05"
source_hash: "b546ed054144"
generated_by: gemma4:12b
---

**Summary.** I investigate four specific architectural changes Meta made to the transformer block for Llama 3.2. I find that rotary position embeddings are the primary driver of performance gains, while other changes like shared keys and values provide efficiency without affecting accuracy.

## What I did
- I implemented four modern architectural changes to the transformer block in MLX.
- I performed an ablation study by turning each change off one by one.
- I compared the results against the 2017 baseline to measure the impact of each change.
- I created a follow-along notebook to demonstrate the implementation and results.

## Claims
- Rotary position embeddings are the primary reason the new block outperforms the 2017 version.
  > "**Turning, RoPE, is the whole difference.** On average, the new block beats the 2017 block by 0.013 bits per byte, about twice the band of luck."
- Sharing keys and values reduces the number of parameters without hurting performance.
  > "**Sharing keys and values is free.** Full keys and values for every head scored 0.6721, inside the band, while needing 1.2 million more numbers, about a tenth of the machine."
- The difference between the gated MLP and the standard MLP is not measurable at this scale.
  > "Over three random starts each, the averages are 0.6755 against 0.6768: a gap of 0.001, far inside the band."
- RMSNorm and SwiGLU provide benefits for speed at scale rather than accuracy at small sizes.
  > "RMSNorm and SwiGLU matter more for speed at scale than for accuracy at this size."
- The new RoPE method ensures that matches depend only on the distance between tokens.
  > "When a query is matched against a key, what matters is the *difference* between their turns, so the match depends only on how far apart the two tokens are, not on where they are in the text."
- The follow-along notebook includes the results of my own runs for anyone to see.
  > "It is saved with the outputs from my own run, so you can read every result on GitHub without a Mac."

## Outcome
I built a suite of models to isolate the effects of modern transformer components. I concluded that RoPE is the most significant change for accuracy, while others primarily optimize for scale.

## Caveats
The results show that RMSNorm and SwiGLU do not significantly improve accuracy at this specific scale, but their benefits are more relevant for larger models.
