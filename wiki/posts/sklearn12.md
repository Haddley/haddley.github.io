---
type: post
slug: sklearn12
title: "Scikit-Learn (Part 12)"
date: "2026-10-13"
part: 12
builds_on: [sklearn11, sklearn2, sklearn10, minigpt-grown, minigpt8]
topics: [custom-training-loops, automatic-differentiation, loss-functions, tensor-operations]
tools: [TensorFlow, Keras, PyTorch, NumPy]
status: current
checked: "2026-11-06"
source_hash: "7205f73c3b6e"
generated_by: gemma4:12b
---

**Summary.** I open up the Keras fit() call to show how to write a training loop by hand using TensorFlow. I demonstrate that while manual loops provide full control, the standard fit() method is usually the better choice for most tasks.

## What I did
- I wrote a training loop by hand to show the underlying mechanics of the fit() method.
- I used GradientTape to record operations and calculate slopes automatically.
- I implemented the Huber loss to handle outliers in the California house price data.
- I compared the TensorFlow training loop with an identical loop written in PyTorch.
- I evaluated the performance of training on a CPU versus a GPU for small models.

## Claims
- The manual training loop provides full control but can lead to errors.
  > "Writing the loop by hand gives full control and makes it easy to get something subtly wrong, so the book recommends `fit()` unless the extra control is needed."
- The Huber loss is less affected by a few very wrong answers than standard regression.
  > "The Huber loss squares small errors but only counts large ones in proportion, so a few odd houses do not pull the whole model towards them."
- The training loop reduced the average error to about 50,000 dollars on house prices.
  > "In my run, the loop took the average error from 0.66 to 0.50 over five rounds, which is about $50,000 on a house price: about the same as the neural networks in Part 10 on this data."
- GradientTape finds every slope in one trip backwards to make backpropagation possible.
  > "Nudging each number by hand would need one extra calculation per number; the tape finds every slope in one trip backwards, which is what makes backpropagation possible for a network with millions of numbers."
- A graphics processor is not faster for small models because the overhead exceeds the benefits.
  > "The network is tiny, and each step does so little work that sending it to the graphics processor costs more than it saves."
- The training loop in PyTorch and TensorFlow produced the same results for the housing data.
  > "The two runs draw different random batches and start from different random numbers, so they do not match digit for digit, but they tell the same story: the loss falls, and the error settles at about 0.50, around $50,000."

## Outcome
I built a manual training loop to demonstrate the mechanics of backpropagation and automatic differentiation. I concluded that while custom loops are necessary for specific research needs, fit() is the preferred choice for standard tasks.

## Caveats
The TensorFlow details are less certain because much of the field has moved to PyTorch.
