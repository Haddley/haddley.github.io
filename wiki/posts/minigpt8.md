---
type: post
slug: minigpt8
title: "MiniGPT, grown in code you can read"
date: "2026-10-11"
builds_on: [minigpt7, minigpt-grown, minigpt]
topics: [machine-learning-training, backpropagation, adamw-optimization, black-box-modeling]
tools: [PyTorch, Python, Colab]
status: current
checked: "2026-11-05"
source_hash: "5b83fbacfb13"
generated_by: gemma4:12b
---

**Summary.** I wrote a version of the training code for MiniGPT that treats the model as a black box and uses readable arithmetic for the optimization steps. I found that the training process does not need to understand the internal mechanics of the model to successfully grow a functional system.

## What I did
- I rewrote the training code to use readable names and explicit arithmetic.
- I implemented the AdamW optimization rule as a series of named steps.
- I verified that my readable training code produces the same results as the original PyTorch implementation.
- I grew a new model from random numbers to compare it against the original exhibit.

## Claims
- The training process does not need to understand the internal logic of the model.
  > "Training does not need to understand the model."
- The new model performs nearly as well as the original on the exam.
  > "It grows a model with different numbers that scores about as well on the exam: 1.66, against the exhibit's 1.69."
- The weights of the new model are not correlated with the original exhibit.
  > "Table by table, its weights and the exhibit's have a correlation of about 0.002, which is to say none."
- The AdamW optimization rule is a set of simple calculations when written out.
  > "**The nudge rule is two running averages and a division.** AdamW sounds advanced, but written out it is a dozen named lines, and it matches PyTorch's own to within rounding."
- The training process only requires the model to provide a guess for every letter.
  > "It takes snippets of real text, and asks the model, for every letter, what comes next."
- The difference between my readable training and the original is only due to rounding.
  > "The differences are rounding: the two programs do the same arithmetic in a slightly different order."

## Outcome
I built a readable training script that produces a functional model from random numbers. I demonstrated that the core components of training—the surprise score and the AdamW nudge—can be expressed in plain, readable code.

## Caveats
The backward pass remains a black box because it relies on the internal record of calculations within PyTorch.
