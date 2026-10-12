---
title: "Scikit-Learn"
part: 12
description: "Custom models and training with TensorFlow: tensors, automatic slopes with GradientTape, and a training loop written by hand instead of calling fit()"
date: "2026-10-13"
categories: ["AI", "Python"]
tags: "machine-learning, tensorflow, keras, gradienttape, autodiff, training-loop"
hidden: false
slug: "sklearn12"
image: "/assets/images/sklearn12/posts-meta.svg"
---

In [Part 11](/posts/sklearn11/), I trained deep networks with Keras, and every one of them learned inside a single call to `fit()`. The twelfth chapter of the Hands-On Machine Learning book opens that call up. It goes below Keras to TensorFlow itself, and shows how to write my own loss functions, metrics, layers, and models, how TensorFlow finds slopes automatically, and how to write the training loop by hand.

## Key Points

**What the chapter covers:**
1. **TensorFlow like NumPy**: tensors, which are arrays of numbers, and the operations on them
2. **Variables**: tensors that can change, which is what a model's weights are
3. **Custom loss functions and metrics**: such as the Huber loss, which is less upset by a few very wrong answers
4. **Custom layers and models**: writing a layer or a whole model as a Python class, such as a model with residual blocks
5. **Automatic differentiation**: `tf.GradientTape` records a calculation and works out the slope of the result for every variable
6. **Custom training loops**: picking a batch, measuring the loss, finding the slopes, and nudging, all written out by hand
7. **TensorFlow functions**: `tf.function` turns Python code into a graph of operations that TensorFlow can run faster

**What I learned from it:**
- `fit()` is a short loop that I can write myself: about ten lines do the real work.
- TensorFlow does not work slopes out from a formula; it records each operation as it happens, and walks the record backwards.
- Writing the loop by hand gives full control, and makes it easy to get something subtly wrong, so the book recommends `fit()` unless the extra control is needed.

:::brain-power
Before reading on, try to write the training loop from memory, using the steps from [Part 10](/posts/sklearn10/) and [Part 11](/posts/sklearn11/). What has to happen on every step, and in what order?
:::

## Quick Example

The training loop, written by hand. It trains a small network, 8 inputs to 30 neurons to 1 output, 301 numbers in all, to predict [California house prices](/posts/sklearn2/):

```python
for epoch in range(1, n_epochs + 1):
    for step in range(1, n_steps + 1):
        X_batch, y_batch = random_batch(X_train_scaled, y_train)
        with tf.GradientTape() as tape:
            y_pred = model(X_batch, training=True)
            main_loss = tf.reduce_mean(loss_fn(y_batch, y_pred))
            loss = tf.add_n([main_loss] + model.losses)

        gradients = tape.gradient(loss, model.trainable_variables)
        optimizer.apply_gradients(zip(gradients, model.trainable_variables))
```

Each of the four steps from earlier parts is one or two lines: pick a batch of 32 houses, run them through the model while the tape records, find every number's slope with `tape.gradient`, and nudge with `apply_gradients`. Here is what it did over 5 epochs of 362 steps when I ran the notebook:

| Epoch | Average loss | Average error (mean absolute error, MAE) |
|---|---|---|
| 1 | 3.54 | 0.664 |
| 2 | 1.87 | 0.543 |
| 3 | 1.14 | 0.503 |
| 4 | 0.85 | 0.498 |
| 5 | 0.73 | 0.501 |

The prices are in units of $100,000, so an average error of 0.50 is about $50,000. The loss includes an L2 penalty, the same one that Ridge regression uses in [Part 4](/posts/sklearn4/), which keeps the weights small, so it can keep falling while the error stays level, as it does from epoch 3 on.

:::watch-it An "epoch" here is not a pass through the data
In `fit()`, one epoch shows the model every training example once. This loop's `random_batch` picks 32 houses at random on every step, so some houses come up twice in an epoch and others not at all. Here, "epoch" just means 362 steps. Small details like this are why the book suggests writing a custom loop only when `fit()` cannot do what you need.
:::

## What training means here

This chapter takes the lid off the training from [Part 10](/posts/sklearn10/) and [Part 11](/posts/sklearn11/). Nothing new happens; I can just see it all.

The slopes come from automatic differentiation. The notebook shows it on a tiny function, f(w1, w2) = 3w1² + 2w1w2, at w1 = 5 and w2 = 3. Nudging each input by a millionth and watching how much f changes gives slopes of 36.000003 and 10.000000003. `tf.GradientTape` gives exactly 36 and 10, from a single trip backwards through the recorded operations. Nudging each number by hand would need one extra calculation per number; the tape finds every slope in one trip backwards, which is what makes backpropagation possible for a network with millions of numbers.

My [MiniGPT](/posts/minigpt-grown/) model is trained by a loop with the same steps, written in PyTorch instead of TensorFlow. In [MiniGPT, grown in code you can read](/posts/minigpt8/), I wrote that loop out by hand too, and the two line up step for step:

```python
X_batch, y_batch = random_batch(...)       # MiniGPT: pick_snippets
main_loss = loss_fn(y_batch, y_pred)       # MiniGPT: surprise_score
gradients = tape.gradient(loss, ...)       # MiniGPT: .backward()
optimizer.apply_gradients(...)             # MiniGPT: nudge_every_number
```

The differences are in the details: this loop nudges with plain gradient descent, and MiniGPT with AdamW; PyTorch records the operations automatically, without a `with tf.GradientTape()` block.

:::no-dumb-questions
**Q: If `fit()` does all this already, why write the loop by hand?**

A: For training that does not fit `fit()`'s pattern. The book's example is a model with two parts that need different optimizers. Most of the time `fit()` is the better choice: it is shorter and has fewer places to make a mistake.

**Q: What does `tf.function` add?**

A: Speed. The first time a `tf.function` runs, TensorFlow traces the Python code and records it as a graph of operations, such as the four operations for `x ** 3` in the notebook. Later calls run the graph directly, without Python. Keras does this to `fit()`'s training step automatically.

**Q: Why the Huber loss?**

A: The usual loss for regression squares each error, so one house priced $300,000 wrong counts nine times as much as one priced $100,000 wrong. The Huber loss squares small errors but only counts large ones in proportion, so a few odd houses do not pull the whole model towards them.
:::

## Running the notebook in Jupyter

The chapter is in the notebook that goes with the book, [12_custom_models_and_training_with_tensorflow.ipynb](https://github.com/ageron/handson-ml3/blob/main/12_custom_models_and_training_with_tensorflow.ipynb). I ran everything before the exercise solutions, which took less than a minute on my Mac Studio, because its models are small and train for only a few epochs. Then I looked through the results in JupyterLab.

![](assets/images/sklearn12/jupyter-tensors.png)
*Tensors behave much like NumPy arrays: a 2 × 3 matrix, its shape and type, slices of it, and arithmetic on every element*

![](assets/images/sklearn12/jupyter-huber-loss.png)
*The Huber loss: a curve for small errors, and straight lines for large ones, which grow more slowly than the squared error (dotted)*

![](assets/images/sklearn12/jupyter-residual-model.png)
*A custom model written as Python classes: a residual block adds its input back to its output, the skip connection that helps deep networks train*

![](assets/images/sklearn12/jupyter-slopes.png)
*The same slopes found two ways: nudging each input by a millionth gives about 36 and 10, and the gradient tape gives exactly 36 and 10*

![](assets/images/sklearn12/jupyter-training-loop.png)
*The training loop written by hand, and its output: the loss falls from 3.54 to 0.73 over 5 epochs*

![](assets/images/sklearn12/jupyter-tf-function.png)
*A Python function, `cube`, turned into a TensorFlow function: it gives the same answers, and runs as a graph*

![](assets/images/sklearn12/jupyter-graph.png)
*Inside the graph for `x ** 3`: four operations, an input, the constant 3, the power, and the output*

:::bullet-points Custom training, in short
- TensorFlow works with tensors, NumPy-like arrays, and variables, the tensors a model nudges.
- Losses, metrics, layers, and whole models can be written as ordinary Python functions and classes.
- `tf.GradientTape` records a calculation and finds every slope in one trip backwards.
- A training loop is four steps, repeated: pick a batch, measure the loss, find the slopes, and nudge.
- `fit()` runs the same loop for you, and is usually the better choice.
:::

## References

- [Aurélien Géron's chapter 12 notebook](https://github.com/ageron/handson-ml3/blob/main/12_custom_models_and_training_with_tensorflow.ipynb) - for Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (third edition)
- [Scikit-Learn (Part 11)](/posts/sklearn11/) - training deep neural networks
- [MiniGPT, grown in code you can read](/posts/minigpt8/) - the same training loop, written by hand in PyTorch
- [TensorFlow](https://www.tensorflow.org/guide/autodiff) - the guide to automatic differentiation
