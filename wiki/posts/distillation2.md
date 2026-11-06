---
type: post
slug: distillation2
title: "Distillation (Part 2)"
date: "2026-09-15"
part: 2
builds_on: [distillation]
topics: [model-distillation, lora-fine-tuning, memory-optimization, llm-evaluation]
tools: [Llama-3.1-8B, DeepSeek, MLX, UltraChat-200k, LoRA]
status: current
checked: "2026-11-05"
source_hash: "4f6ed697100b"
generated_by: gemma4:12b
---

**Summary.** I transformed a pretrained Llama-3.1-8B model into a multi-turn chat model using LoRA on a Mac Studio. I then tested whether a different teacher model, DeepSeek, produced a better student than GPT-3.5.

## What I did
- I identified the memory constraints of my hardware to determine the maximum supported context length.
- I prepared a training dataset by expanding multi-turn conversations into individual turn examples.
- I trained two versions of the model using different teacher outputs from GPT-3.5 and DeepSeek.
- I matched the training population and budget for both models to ensure a fair comparison.
- I evaluated both models on a held-out set of conversations to measure the impact of the teacher quality.

## Claims
- The base model initially failed to know when to stop generating text.
  > "This is the same lesson Part 1's plain pretrained checkpoint taught with single-turn prompts, showing up again in a more specific way: fluency is not the same skill as knowing when to stop."
- LoRA allows for training on limited hardware by only updating a small percentage of the model parameters.
  > "LoRA leaves the original model's numbers untouched and trains a small set of new ones alongside it instead — 10.5M trainable parameters out of 8.03 billion, 0.131% of the model."
- The 2048-token limit was determined by testing the actual memory cost of increasing sequence lengths.
  > "2048 is not an arbitrary round number here; it is the actual, empirically validated ceiling for an 8B model on this machine."
- The model trained with the DeepSeek teacher outperformed the one trained with GPT-3.5.
  > "**`distilled` won 118, `baseline` won 81, 1 tie** — a **59.3% win rate** excluding ties, one-sided binomial p ≈ 0.0053."
- The results show that teacher quality, not just scale, is the primary factor in distillation.
  > "This post held scale and architecture fixed and swapped the *teacher* entirely — a different technique for reaching the same underlying claim: teacher quality, not just teacher size or student size, is what response distillation is actually transferring."
- The model became more repetitive after the LoRA training process.
  > "It is also considerably more repetitive than the single crisp sentence UltraChat's own GPT-3.5 answer gave for the same prompt — a real, honest limitation of roughly one epoch of LoRA on 14,000 examples, not something to hide."

## Outcome
I built a chat-capable model and concluded that the quality of the teacher model significantly impacts the performance of the distilled student.

## Caveats
Not every comparison favors the better teacher, as shown by the specific cases where the baseline model performed better.
