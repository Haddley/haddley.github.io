---
type: post
slug: sklearn1
title: "Scikit-Learn (Part 1)"
date: "2026-10-12"
part: 1
builds_on: [minigpt-grown, sklearn10, sklearn2, sklearn3, sklearn4]
topics: [machine-learning, scikit-learn, linear-regression, k-nearest-neighbors, hyperparameter-tuning]
tools: [Scikit-Learn, Python, JupyterLab]
status: current
checked: "2026-11-06"
source_hash: "6fe2085df9e7"
generated_by: gemma4:12b
---

**Summary.** I introduce the Scikit-Learn library and demonstrate how it provides a consistent interface for different machine learning algorithms. I compare linear regression and k-Nearest Neighbors to show how different models can produce similar results while using fundamentally different internal logic.

## What I did
- I introduced the Scikit-Learn library and its core features.
- I implemented two different models to predict life satisfaction.
- I compared the internal mechanics of model-based and instance-based learning.
- I evaluated the impact of hyperparameters like the number of neighbors.
- I explained the difference between these models and neural networks.

## Claims
- Scikit-Learn provides a consistent API for different models.
  > "In both cases, Scikit-Learn gives the model the same two calls, `fit` and `predict`, so swapping one algorithm for a completely different one changes only two lines."
- Linear regression calculates a specific intercept and slope to make predictions.
  > "**Linear regression learns two numbers.** It works out the straight line that best fits the 27 countries, directly, in one calculation (least squares): an intercept of 3.749, and a slope of 0.0678, the extra life satisfaction for every extra $1,000 of GDP per capita."
- k-Nearest Neighbors stores the data instead of calculating a formula.
  > "**k-Nearest Neighbors learns nothing.** Its `fit` just stores the 27 countries."
- The choice of three neighbors is a hyperparameter rather than a rule.
  > "A: The three is a choice, not a law: the notebook sets `n_neighbors=3`, and I did not tune it."
- The prediction for Cyprus is 6.33 using the k-Nearest Neighbors model.
  > "*I swapped in k-Nearest Neighbors with k = 3, which predicts 6.33 for Cyprus*"
- Neural networks like MiniGPT use backpropagation to nudge weights.
  > "My MiniGPT model starts from 826,433 random numbers and nudges every one of them thousands of times, using backpropagation to find which way each should move."

## Outcome
I demonstrated that Scikit-Learn allows for easy experimentation by providing a consistent fit and predict interface. I concluded that while different models may yield similar predictions, their internal learning processes vary significantly.

## Caveats
The post does not show how to choose the best hyperparameter using cross-validation, which is covered in Part 2.
