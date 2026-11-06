---
type: post
slug: sklearn6
title: "Scikit-Learn (Part 6)"
date: "2026-10-12"
part: 6
builds_on: [sklearn5, sklearn2, sklearn4, sklearn7, minigpt-grown]
topics: [decision-trees, regularization, overfitting, ensemble-learning]
tools: [Scikit-Learn, JupyterLab, Python]
status: current
checked: "2026-11-06"
source_hash: "cccd990b642e"
generated_by: gemma4:12b
---

**Summary.** I explain how decision trees function as a series of yes-or-no questions to classify data. I demonstrate that while these models are highly interpretable, they require regularization to prevent them from memorizing the training data.

## What I did
- I used the iris dataset to demonstrate a decision tree model.
- I showed how the model identifies species based on petal dimensions.
- I explained the greedy growth process of the CART algorithm.
- I demonstrated why limiting tree depth is necessary to prevent overfitting.
- I compared the tree approach to other models like support vector machines.

## Claims
- The model correctly identified 144 out of 150 flowers.
  > "It got 144 of the 150 flowers right, including all 50 setosas."
- A decision tree is the easiest model to explain because it functions as a list of questions.
  > "**The lesson:** a decision tree is the easiest model to explain, because it is a list of questions that anyone can follow."
- The tree's prediction is based on the share of training flowers in the leaf.
  > "A tree's chances are just shares of the training flowers in each leaf."
- Decision trees do not require feature scaling because they use cut-off values.
  > "Each question compares one measurement with a cut-off, so changing its units just moves the cut-off, and the questions still split the flowers the same way."
- A tree that memorizes every training flower follows the noise and performs poorly on new data.
  > "A tree that carves out a region for every training flower follows the noise, and does worse on new flowers."
- The tree grew one best question at a time and never changed a previous question.
  > "It never goes back to change an earlier question."

## Outcome
I built a decision tree that successfully classified iris flowers and concluded that limiting tree depth is essential to prevent the model from memorizing noise.

## Caveats
The post does not show how ensembles of trees can improve stability, which is covered in the next chapter.
