---
type: post
slug: sklearn7
title: "Scikit-Learn (Part 7)"
date: "2026-10-12"
part: 7
builds_on: [sklearn6, sklearn2, sklearn4, sklearn5, minigpt-grown]
topics: [ensemble-learning, random-forests, bagging, boosting, stacking]
tools: [Scikit-Learn, JupyterLab, Python]
status: current
checked: "2026-11-05"
source_hash: "fa74a9e28224"
generated_by: gemma4:12b
---

**Summary.** I explore ensemble learning and how a group of models can outperform any single individual model. I demonstrate that techniques like bagging, boosting, and stacking combine different models to cancel out individual mistakes.

## What I did
- I analyzed the instability of single decision trees.
- I trained multiple models to form an ensemble.
- I compared hard and soft voting methods.
- I implemented bagging, boosting, and stacking.
- I evaluated these models on a moons dataset.

## Claims
- A group of different models can beat every one of its members because their mistakes are different and cancel out.
  > "**The lesson:** a group of different models, each only fairly good, can beat every one of its members, because their mistakes are different and cancel out."
- The best single model I tried was right on 89.6% of the test points.
  > "The best single model I tried was right on 89.6% of the test points."
- A model that learns how best to combine the others reached 92.8%.
  > "Three different models voting together were right on 91.2% to 92.0%, and a model that learns how best to combine them reached 92.8%."
- Soft voting counts a confident model more than an unsure one.
  > "Soft voting counts a confident model more than an unsure one."
- Boosting cannot be trained in parallel because each new model depends on the mistakes of the ones before it.
  > "A: Each new model is trained on the mistakes of the ones before it, so it cannot start until they have finished."
- A random forest is a collection of bagged decision trees with extra randomness.
  > "It is bagged decision trees, with extra randomness: each split considers only a random subset of the features, which makes the trees even more different from each other."

## Outcome
I concluded that ensemble methods like bagging and boosting significantly improve accuracy by combining multiple models. I demonstrated that a crowd of models often outperforms any single model in the group.

## Caveats
The post does not show how gradient boosting differs from the way my MiniGPT model adjusts numbers.
