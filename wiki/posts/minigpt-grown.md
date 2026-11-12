---
type: post
slug: minigpt-grown
title: "MiniGPT (Part 2)"
date: "2026-10-05"
part: 2
builds_on: [minigpt, machinelearning9, distillation, distillation2, minigpt5]
topics: [backpropagation, hyperparameters, machine-learning-training, transformer-architecture]
tools: [PyTorch, Mac Studio, Metal Performance Shaders, Colab]
status: current
checked: "2026-11-05"
source_hash: "420c89a8610d"
generated_by: gemma4:12b
---

**Summary.** I explain how a GPT model is grown by training it from random numbers until it learns to predict the next character in a text. I demonstrate that the training process systematically adjusts every parameter to reduce the surprise of the next character.

## What I did
- I took the MiniGPT model apart to identify its components.
- I grew the model from scratch on my Mac using random numbers.
- I compared the results of a small model and a larger model.
- I analyzed how backpropagation adjusts each parameter.
- I provided a follow-along workbook to reproduce the results.

## Claims
- The model starts by producing pure noise because the weights are random.
  > "So what it writes is pure noise."
- The training process uses a specific number of steps to find good settings for the parameters.
  > "Growing the machine means finding good settings for all of them, and it uses the five steps from Part 1, with one change and one addition:"
- The training code performs the same mathematical operations on every number at every step.
  > "The training code does exactly the same thing on every step, to every number: `loss.backward()` works out every slope by the same rules, and `optimizer.step()` follows them."
- The larger model uses more blocks and heads to achieve better results.
  > "The stronger model is the same code with bigger numbers: 6 blocks, 6 heads, 384 numbers per letter, and a 256-letter window."
- The training process uses a learning rate that changes over time to refine the parameters.
  > "**Bigger steps that change over time.** The learning rate starts small and grows over the first 100 steps (*warmup*), so that the random starting numbers are not knocked about too hard, then shrinks gradually along a curve (*cosine decay*) for fine adjustments at the end."
- The model is kept at its best state to prevent it from becoming a simple memorizer.
  > "Keeping the best copy, not the last one, is what stops the model shipping as a memoriser."

## Outcome
I built a process to grow a model from random numbers into a functioning system that captures the style of Shakespeare. I also created a follow-along workbook to reproduce these results.

## Caveats
The post does not show the full complexity of the training loop as it is often written in less readable code.
