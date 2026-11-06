---
type: post
slug: sklearn20
title: "Scikit-Learn (Part 20)"
date: "2026-10-13"
part: 20
builds_on: [sklearn2, sklearn3, sklearn15, sklearn16, sklearn17]
topics: [machine-learning-fundamentals, model-evaluation, backpropagation, training-stability]
tools: [Scikit-Learn, Keras, TensorFlow, PyTorch, Mac]
status: current
checked: "2026-11-06"
source_hash: "43366b8e8cea"
generated_by: gemma4:12b
---

**Summary.** I reflect on the nineteen chapters of Hands-On Machine Learning to identify what remains relevant and what I would change. I conclude that while most of machine learning relies on the core idea of iterative nudging, training processes are often fragile and require careful execution.

## What I did
- I read Aurélien Géron's book chapter by chapter.
- I ran the notebooks on my Mac.
- I wrote a survey of the material.
- I identified which parts of the curriculum I would prioritize.

## Claims
- A model must be judged on data it has not seen to avoid memorization.
  > "**Judge a model on data it has not seen.** A model can memorise what it learned from and look perfect."
- A decision tree performed poorly on new data despite perfect training scores.
  > "A decision tree scored an error of $0 on its own training houses, and $67,153 on new ones (Part 2)."
- Small and decisive changes can significantly improve model performance.
  > "**Fixes can be small and decisive.** Telling a review model to ignore padding took it from 50.0% to 87.5% (Part 16)."
- Shortening long training runs can lead to poor results.
  > "In Part 16 and Part 17 I first shortened the longest ones to save time, and the results were poor: a picture-drawing model that made one picture, and another that made dark blurs."
- The PyTorch and TensorFlow implementations produced the same results.
  > "The two gave the same results."

## Outcome
I concluded that while the core principles of the field are consistent, specific training choices like run length and batch size are critical for success. I also confirmed that different frameworks can yield identical results for the same logic.

## Caveats
This post is a survey and includes what was current at the time it was written.
