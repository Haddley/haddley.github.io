---
type: post
slug: minigpt5
title: "MiniGPT (Part 6)"
date: "2026-10-05"
part: 6
builds_on: [minigpt-grown, minigpt2, minigpt3, minigpt6]
topics: [knowledge-distillation, kl-divergence, capacity-gap, model-training]
tools: [MLX, PyTorch, Hugging Face, Jupyter Notebook]
status: current
checked: "2026-11-05"
source_hash: "a4f68510e94a"
generated_by: gemma4:12b
---

**Summary.** I explore the concept of knowledge distillation by training a small MiniGPT to copy the 'wheel of chances' from larger teacher models. I find that the most effective teacher is not necessarily the largest or most capable model, but the one whose internal representations and vocabulary align most closely with the student.

## What I did
- I implemented a distillation training method where the student is scored on how closely its wheel of chances matches the teacher's wheel.
- I tested three different types of teachers: a large web-trained model, a specialized story-trained model, and a larger version of the student's own architecture.
- I measured the capacity gap to see how much a student can actually learn from a teacher that is fundamentally different from its own design.
- I provided a follow-along notebook to walk through the math of KL divergence and the results of the distillation experiments.

## Claims
- Standard training only rewards the model for finding the single correct answer.
  > "In the guessing game, the only thing the machine learns from at each step is the one right answer."
- Distillation requires the teacher and student to share the exact same vocabulary to compare their wheels.
  > "So the teacher must use exactly the student's tokeniser, its supply of pieces from Part 3."
- A large model that has not seen the specific data can be a poor teacher for a smaller model.
  > "The third column says why: at 1.5 billion numbers, GPT-2 XL is still *worse* at these stories (0.799) than the 30-million-number student trained on them (0.756)."
- A smaller teacher that is well-suited to the specific task outperformed a much larger, general-purpose teacher.
  > "A teacher who knew the stories beat one 45 times its size that did not."
- The most helpful teacher is one whose wheels the student can actually copy.
  > "The most helpful teacher was not the best storyteller: it was the one built like the student and trained on the same stories, whose wheels the student could actually copy."
- Running a teacher model during training increases the memory requirements of the system.
  > "Running a teacher every step costs memory: 5.4 GB grew to 11 to 17 GB."

## Outcome
I built a distillation pipeline that proves a student learns best from a teacher that shares its architectural constraints and data focus. I concluded that a teacher's utility is limited by the student's ability to replicate the teacher's specific 'wheel of chances'.

## Caveats
The post does not show how the model performs when the teacher's vocabulary is significantly different from the student's.
