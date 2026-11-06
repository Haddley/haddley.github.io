---
type: post
slug: machinelearning9
title: "Machine Learning (Part 9)"
date: "2022-06-17"
part: 9
builds_on: []
topics: [neural-networks, image-classification, data-normalization, machine-learning]
tools: [TensorFlow, Keras, Python, Matplotlib]
status: current
checked: "2026-11-05"
source_hash: "89c27fe8b560"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to train a neural network to recognize handwritten digits using the MNIST dataset. I show the process of preprocessing image data and building a multi-layer model with TensorFlow.

## What I did
- I loaded and normalized the MNIST image data.
- I converted labels into one-hot encoded matrices.
- I constructed a Sequential model with Dense layers.
- I compiled and trained the model to recognize digits.

## Claims
- The MNIST dataset contains 70,000 total images.
  > "The MNIST database of handwritten digits has a training set of 60,000 examples, and a test set of 10,000 examples."
- Each image consists of a 28 by 28 grid of pixels.
  > "The picture is a 28 by 28 grid, so 784 numbers."
- I converted pixel values to floats between 0 and 1.
  > "I converted each image pixel value (0-255) to a float value between 0 and 1."
- The output layer contains 10 units for each possible digit.
  > "I added a Dense output layer with 10 units (each unit corresponding to a category value from 0 to 9)."
- I used the fit function to train the model.
  > "I used the fit() function to train the model."

## Outcome
I built a neural network that classifies handwritten digits from 0 to 9. The model successfully processes 784 input values to produce a score for each possible category.

## Caveats
The post does not show the specific accuracy percentage achieved during the training phase.
