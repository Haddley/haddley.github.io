---
type: post
slug: sklearn10
title: "Scikit-Learn (Part 10)"
date: "2026-10-12"
part: 10
builds_on: [sklearn9, sklearn2, minigpt-grown, sklearn1, sklearn3]
topics: [neural-networks, backpropagation, hyperparameter-tuning, deep-learning]
tools: [Keras, TensorFlow, Scikit-Learn, JupyterLab, Python]
status: current
checked: "2026-11-06"
source_hash: "1122f9c2586f"
generated_by: gemma4:12b
---

**Summary.** I introduce neural networks using Keras to build a clothing classifier. I demonstrate how backpropagation trains a network of over 260,000 numbers to recognize patterns in the Fashion MNIST dataset.

## What I did
- I built a neural network using Keras and TensorFlow.
- I trained the network using backpropagation to recognize clothing types.
- I automated the search for optimal hyperparameters like learning rates and layer sizes.
- I compared the Keras results against Scikit-Learn's MLPRegressor.
- I compared the training process of this small network to the training of a large language model.

## Claims
- The neural network achieved an accuracy of 87.4% on unseen test images.
  > "My network was right on 87.4% of 10,000 test pictures it had never seen."
- The network consists of 266,610 numbers that it learns from training images.
  > "It had 266,610 numbers, and it learned all of them from the training pictures."
- The Keras network achieved a score of 0.535 on the California house prices data.
  > "On the California house prices, Scikit-Learn's simple `MLPRegressor` scored an error of 0.505, and the Keras network 0.535."
- The training process for the clothing classifier involved 51,570 total nudges.
  > "One pass through the 55,000 training images is 1,719 such steps, and the network makes 30 passes: 51,570 nudges in all."
- The training of the MiniGPT model uses 826,433 numbers and AdamW optimization.
  > "MiniGPT is the same machine at a different scale: 826,433 numbers, 3,000 steps of 32 snippets of text, AdamW instead of plain gradient descent, and attention layers between the dense ones."
- The notebook took approximately 14 minutes to run on a Mac Studio.
  > "I ran everything before the exercise solutions, which took about 14 minutes on my Mac Studio, most of it in the three hyperparameter searches, and then looked through the results in JupyterLab."

## Outcome
I built a clothing classifier that successfully identifies items from the Fashion MNIST dataset. I also demonstrated that the same backpropagation principles used here are the same ones that train large language models.

## Caveats
I did not include the TensorBoard training logs because I could not open the separate viewer.
