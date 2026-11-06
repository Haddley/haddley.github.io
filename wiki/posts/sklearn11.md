---
type: post
slug: sklearn11
title: "Scikit-Learn (Part 11)"
date: "2026-10-13"
part: 11
builds_on: [sklearn10, sklearn4, minigpt-grown, sklearn12]
topics: [deep-neural-networks, backpropagation, activation-functions, batch-normalization, optimization-algorithms]
tools: [Scikit-Learn, Keras, TensorFlow, Fashion MNIST, JupyterLab]
status: current
checked: "2026-11-06"
source_hash: "ceb23be04035"
generated_by: gemma4:12b
---

**Summary.** I explain why deep neural networks are difficult to train and identify the specific techniques that make them successful. I demonstrate how proper initialization, activation functions, and optimizers keep the gradients stable enough for the network to learn.

## What I did
- I tested a 100-layer network to demonstrate how gradients can fail in deep architectures.
- I compared different activation functions like ReLU and SELU.
- I evaluated various optimizers including AdamW and their ability to manage learning steps.
- I demonstrated how batch normalization and dropout improve training stability and generalization.
- I showed how these techniques are applied in my own MiniGPT model.

## Claims
- Deep networks fail because gradients shrink or grow excessively as they pass through many layers.
  > "It fails because the slopes, which backpropagation passes back through every layer, shrink or grow at each layer until the early layers barely learn."
- The SELU activation function allowed the 100-layer network to reach 82.0% accuracy.
  > "In my run, a bend called SELU (scaled exponential linear unit), with matching starting numbers, took the 100-layer network from 69.9% with ReLU to 82.0%."
- The AdamW optimizer performed better than plain gradient descent in my tests.
  > "How the nudging is done matters too: the same network scored 83.7% with plain gradient descent and 87.9% with AdamW, a smarter way of choosing each step."
- Batch normalization allows a network with only two layers to reach 86.7% accuracy.
  > "A different trick, rescaling each layer's inputs during training (*batch normalization*), let a network with only two hidden layers reach 86.7% after two passes."
- Dropout helps prevent the network from memorizing training images when data is scarce.
  > "Starting from a network that someone else has trained, and switching off a random few neurons during training (*dropout*), help when data is short or a network starts to memorise its training pictures."
- Monte Carlo dropout provides a measure of how certain the network is about its prediction.
  > "The answers vary, and the spread shows how sure the network is."

## Outcome
I concluded that while the core backpropagation algorithm remains the same, specific architectural choices like SELU, AdamW, and batch normalization are essential to keep gradients stable in deep networks.

## Caveats
The post notes that dense layers transfer poorly compared to convolutional layers because they cannot reuse patterns found in different locations.
