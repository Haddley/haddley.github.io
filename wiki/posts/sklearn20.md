---
type: post
slug: sklearn20
title: "Scikit-Learn (Part 20)"
date: "2026-10-13"
part: 20
builds_on: ["sklearn2", "sklearn3", "sklearn15", "sklearn16", "sklearn17"]
topics: ["machine-learning-fundamentals", "model-evaluation", "training-optimization", "backpropagation"]
tools: ["Scikit-Learn", "PyTorch", "TensorFlow", "MiniGPT"]
status: current
checked: "2026-11-26"
source_hash: "1adb2355ea61"
generated_by: gemma4:12b
---

**Summary.** I reflect on the nineteen chapters of the Hands-On Machine Learning series to evaluate what remains relevant and what I would change. I identify core principles of machine learning and share specific technical decisions regarding training durations and hardware usage.

## What I did
- I read Aurélien Géron's book chapter by chapter.
- I ran the notebooks on my Mac.
- I wrote a summary of what I learned and what I would skip.
- I evaluated the results of different training methods.

## Claims
- A model must be judged on data it has not seen to avoid memorization.
  > "**Judge a model on data it has not seen.** A model can memorise what it learned from and look perfect."
- A decision tree performed poorly on new data despite perfect training scores.
  > "A decision tree scored an error of $0 on its own training houses, and $67,153 on new ones (Part 2)."
- Small and decisive changes can significantly improve model performance.
  > "**Fixes can be small and decisive.** Telling a review model to ignore padding took it from 50.0% to 87.5% (Part 16)."
- Shortening long training runs leads to poor results.
  > "In Part 16 and Part 17 I first shortened the longest ones to save time, and the results were poor: a picture-drawing model that made one picture, and another that made dark blurs."
- The PyTorch and TensorFlow implementations produced identical results.
  > "The two gave the same results."

## Outcome
I concluded that most of machine learning is based on the single idea of nudging parameters to reduce error. I also determined that running training at full length is necessary for high-quality results.

## Caveats
The post has no notebook of its own.
