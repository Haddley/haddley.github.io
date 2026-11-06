---
type: post
slug: minigpt7
title: "MiniGPT, rewritten to be read"
date: "2026-10-09"
builds_on: [minigpt, minigpt-grown]
topics: [transformer-architecture, code-readability, attention-mechanisms, python-programming]
tools: [MiniGPT, PyTorch, Python]
status: current
checked: "2026-11-05"
source_hash: "08bfcd28dcdc"
generated_by: gemma4:12b
---

**Summary.** I rewrote the code that runs my trained MiniGPT model to make it as easy for a person to read as possible. I ensured the new code produces the exact same results as the original while providing clear names for every value and explanations for every library call.

## What I did
- I rewrote the execution code for the MiniGPT model to prioritize human readability.
- I assigned unique names to every value and explained every library call.
- I verified that the readable code produces identical results to the original.
- I documented the technical terms and the logic of the model's components.

## Claims
- The readable version of the code produces the same results as the original.
  > "I rewrote the part of the code that **runs** my trained model, and only that part, to be as easy for a person to read as I could make it, and then checked that it still gives exactly the same answers."
- The readable version is slightly slower for short texts but only about 1.3 times slower for long texts.
  > "I expected that to make it much slower, so I measured it: on my Mac's processor, it takes about 1.3 times as long as the original for a full 128-letter text, and it is slightly faster for a short one, because it scores only the last letter."
- The original code is optimized for GPU performance and batch processing.
  > "Where the original's style really pays off is in handling many texts at once on a GPU, as training does, which I have not measured."
- The model uses 826,433 trained numbers to function.
  > "Training produced 826,433 numbers, and they are all the model knows."
- The difference in results between the two versions is negligible.
  > "The biggest difference is 0.0000029: the kind of difference that comes from adding the same numbers up in a different order, not a change in what the model does."
- The code cannot explain why certain parameters work, only what they do.
  > "**Readable code still cannot say why.** The rewrite makes *what* happens plain."

## Outcome
I built a readable version of the MiniGPT execution code that maintains the original's accuracy while making the underlying logic transparent.

## Caveats
The readable code is not optimized for GPU batch processing, which is where the original code's design excels.
