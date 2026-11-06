---
type: post
slug: distillation
title: "Distillation (Part 1)"
date: "2026-09-13"
part: 1
builds_on: []
topics: [model-distillation, hard-label-learning, synthetic-data-training, llm-evaluation]
tools: [MLX, Qwen2.5-32B-Instruct, Llama-3.1-70B-Instruct, Hugging Face, Alpaca]
status: current
checked: "2026-11-05"
source_hash: "1ad9d93fcf9a"
generated_by: gemma4:12b
---

**Summary.** I explore the mechanics of hard-label distillation to understand how smaller models can inherit the capabilities of larger models. I conducted a controlled experiment to determine if the quality of a teacher model significantly impacts the performance of a distilled student model.

## What I did
- I defined the difference between soft-label and hard-label distillation.
- I built a small-scale distillation experiment using Qwen2.5-32B-Instruct as a teacher.
- I performed a large-scale replication to confirm the results of the small-scale test.
- I evaluated the results using a judge to measure the impact of teacher quality.

## Claims
- Hard-label distillation uses the same cross-entropy loss as standard next-token prediction.
  > "**Hard-label (response) distillation** is cruder: ask the teacher a question, keep the one answer it wrote, and train the student on that text with ordinary cross-entropy — the same loss every model uses for plain next-token prediction."
- A model with no prior pretraining cannot learn coherent language from just a few thousand Q&A pairs.
  > "A model with no prior exposure to raw text, trained purely on a few thousand Q&A pairs, learns the *shape* of a good answer — numbered lists, section headers — long before it learns enough English to fill that shape with anything coherent."
- The student model outperformed the baseline model with a 65.0% win rate in the large-scale test.
  > "Judged on 300 held-out prompts this time (up from 100): **`distilled` won 186, `baseline` won 100, 14 ties** — a **65.0% win rate** excluding ties, with a one-sided binomial test putting this at **p ≈ 2 × 10⁻⁷**."
- The results show that the distillation technique works regardless of whether the teacher's data was used with permission.
  > "That is exactly what makes the practice usable with a teacher's permission (Phi, licensed OpenAI output) and, allegedly, without it (the accusation against DeepSeek) — the technique itself does not care which."
- The results remained consistent across both small and large scales of testing.
  > "The mechanism holds up at both scales tested so far."

## Outcome
I built a system to test the impact of teacher quality on distilled models and concluded that high-quality teacher answers provide a measurable advantage for smaller models.

## Caveats
The post notes that the accusation against DeepSeek regarding their use of OpenAI's data remains unproven.
