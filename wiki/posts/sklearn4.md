---
type: post
slug: sklearn4
title: "Scikit-Learn (Part 4)"
date: "2026-10-12"
part: 4
builds_on: [sklearn3, minigpt-grown, sklearn10, sklearn6, sklearn5]
topics: [linear-models, gradient-descent, regularization, logistic-regression, stochastic-gradient-descent]
tools: [Scikit-Learn, NumPy, PyTorch, JupyterLab]
status: current
checked: "2026-11-06"
source_hash: "af4cb59783ee"
generated_by: gemma4:12b
---

**Summary.** I explore the differences between the Normal Equation and gradient descent for training linear models. I demonstrate that while both methods can find the same optimal line, gradient descent is the only viable method for complex models like neural networks.

## What I did
- I compared the Normal Equation and gradient descent on a synthetic dataset.
- I implemented batch and stochastic gradient descent to show how they reach the same result.
- I analyzed the impact of the learning rate on the convergence of the model.
- I explained why gradient descent is necessary for high-dimensional data and neural networks.
- I introduced regularization and logistic regression as extensions of these concepts.

## Claims
- The Normal Equation and gradient descent both find the same line for a simple linear model.
  > "Both ended on the same line, with an intercept of 4.215 and a slope of 2.770."
- Gradient descent is the only way to train models without a direct formula like neural networks.
  > "For a neural network, or my MiniGPT model, there is none, so nudging, repeated many thousands of times, is the only way."
- The learning rate determines if the model converges, creeps, or jumps out of the valley.
  > "The notebook shows all three cases: too small, and the line creeps towards the answer; about right, and it gets there quickly; too large, and every step overshoots, so the line jumps further and further from the answer."
- The Normal Equation becomes impractical when the number of features is very large.
  > "At 100,000 features the table alone would hold ten billion numbers, about 80 gigabytes, which will not fit in memory."
- Gradient descent remains efficient because it does not build a massive table of all features.
  > "Gradient descent never builds that table."
- The Normal Equation and batch gradient descent both found the best line of 4.215 and 2.770.
  > "The Normal Equation and batch gradient descent both found that best line, 4.215 and 2.770; the stochastic methods finished close to it."

## Outcome
I concluded that while the Normal Equation is faster for small feature sets, gradient descent is the essential method for large-scale machine learning.

## Caveats
I do not go into the details of logistic regression or the specific implementation of the notebook screenshots.
