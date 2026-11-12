---
type: post
slug: llmbenchmark
title: "LLM Benchmarking"
date: "2026-11-12"
builds_on: []
topics: ["llm-benchmarking", "model-evaluation", "prompt-engineering", "local-llms"]
tools: ["Ollama", "Python", "Qwen", "Gemma", "Llama"]
status: current
checked: "2026-11-12"
source_hash: "5878f0996777"
generated_by: gemma4:12b
---

**Summary.** I built a minimal, from-scratch accounting benchmark to evaluate how different local models handle multi-step arithmetic. The results show that the size on a model's label did not predict its score (a 14B model scored below a 2B one), and that asking three of the models for the answer without any working made their scores collapse.

## What I did
- I built a small benchmark with 30 questions and a programmatic checker.
- I tested six different models on a MacBook Air and a Mac mini.
- I compared the performance of these models across five levels of complexity.
- I analyzed how the removal of reasoning instructions affects model accuracy.

## Claims
- The new benchmark is much simpler than my previous accounting tool.
  > "It is one folder with a handful of small files, no database and no second model to do the marking."
- The benchmark includes questions with a specific correct answer and a fixed prompt.
  > "**Questions with the right answer attached.** Without the right answer there is nothing to mark against."
- The system uses a programmatic checker instead of a second model to mark answers.
  > "**Checker:** It is also free, instant and identical every time."
- The Gemma 4 26B model performed the best with 29 out of 30 correct answers.
  > "Gemma 4 26B got 29 of 30 right."
- The Qwen3.5 2B model is the fastest model tested.
  > "Qwen3.5 2B is the fastest at 38.0 tokens a second, and still got 23 right."
- Asking for the answer with no working made the scores of the three models tested collapse.
  > "Nothing about the three models changed between the two runs, and the scores moved by up to 22 questions."

## Outcome
I created a streamlined benchmarking tool that identifies clear performance gaps between models and highlights the importance of reasoning steps.

## Caveats
The benchmark only measures the accuracy of final sums and does not evaluate the quality of the model's explanations.
