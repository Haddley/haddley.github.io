---
title: "Scikit-Learn"
part: 20
description: "Looking back over nineteen chapters of Hands-On Machine Learning: how models learn, which parts are still current, and what I would do differently"
date: "2026-10-13"
categories: ["AI", "Python"]
tags: "machine-learning, scikit-learn, series-summary, deep-learning, gradient-descent"
hidden: false
slug: "sklearn20"
image: "/assets/images/sklearn20/posts-meta.svg"
---

I started this series with [Part 1](/posts/sklearn1/), in which nothing is nudged, and ended it with [Part 19](/posts/sklearn19/), a model served from a container. This post looks back. It has no notebook of its own: it collects what the nineteen chapters showed me, and answers the question that I asked myself half way through, which is how much of it is still current.

## How every model learned

The thread through the series was how each model finds its numbers. There turned out to be only four ways.

| Way of learning | Parts | What happens |
|---|---|---|
| Worked out exactly | [1](/posts/sklearn1/), [2](/posts/sklearn2/), [5](/posts/sklearn5/), [8](/posts/sklearn8/) | A formula or a solver gives the answer in one go: the Normal Equation, least squares, the solver behind `SVC`, PCA. |
| Remembered | [1](/posts/sklearn1/), [2](/posts/sklearn2/) | k-nearest neighbors stores the training data and does its work when asked. |
| Grown | [6](/posts/sklearn6/), [7](/posts/sklearn7/) | Trees are grown one split at a time, and ensembles add or average many of them. |
| Nudged | [3](/posts/sklearn3/), [4](/posts/sklearn4/), [9](/posts/sklearn9/), [10](/posts/sklearn10/) to [19](/posts/sklearn19/) | Slopes show which way each number should move, and every number is moved a little, many times. |

Nudging first appears in Part 3, and is explained in Part 4. From Part 10 on, almost everything is nudged, and the only thing that changes from chapter to chapter is where the slopes come from and what the loss compares. For a linear model, the slope comes from a formula. For a network with layers, it comes from backpropagation. For a classifier it compares the answer with a label. For an autoencoder, the picture with itself. For a language model, the next letter with the real one, which is what my [MiniGPT](/posts/minigpt-grown/) does. And for reinforcement learning in [Part 18](/posts/sklearn18/), it compares an action's value with the reward that eventually followed it.

## What I would still use

I wrote "still used?" answers in several parts, and they add up to a picture. This is my reading, from what I ran, and from what I know of the field.

| Still a good first choice | Why |
|---|---|
| The end-to-end workflow of [Part 2](/posts/sklearn2/) | Splitting the data, a baseline, cross-validation, and an honest test score matter for every model. |
| Precision, recall, and the confusion matrix of [Part 3](/posts/sklearn3/) | Accuracy alone misled me, and it will mislead anyone. |
| Gradient descent and regularization of [Part 4](/posts/sklearn4/) | Everything after this is built on it. |
| Random forests and gradient boosting of [Parts 6](/posts/sklearn6/) and [7](/posts/sklearn7/) | For tables of data, they are often the best tool. |
| PCA and K-Means of [Parts 8](/posts/sklearn8/) and [9](/posts/sklearn9/) | Everyday tools for looking at data and making it smaller. |
| Batch normalization, Adam, and dropout of [Part 11](/posts/sklearn11/) | The defaults of modern deep learning. |
| Transfer learning of [Parts 11](/posts/sklearn11/) and [14](/posts/sklearn14/) | A pretrained model, retrained a little, beat training from scratch. |
| Attention and the Transformer of [Part 16](/posts/sklearn16/) | The design behind today's language models. |

| Good to understand, less likely to use | Why |
|---|---|
| Support vector machines and kernels ([Part 5](/posts/sklearn5/)) | Niche now, though the margin idea is a good picture. |
| LLE, MDS, and Isomap ([Part 8](/posts/sklearn8/)) | Mostly historical. |
| TensorFlow custom loops, data pipelines, and serving ([Parts 12](/posts/sklearn12/), [13](/posts/sklearn13/), and [19](/posts/sklearn19/)) | The ideas carry over, but much of the field has moved to PyTorch. |
| Recurrent networks ([Parts 15](/posts/sklearn15/) and [16](/posts/sklearn16/)) | Transformers replaced them for language; the 5-input forecast in Part 15 was still hard to beat by much. |
| GANs ([Part 17](/posts/sklearn17/)) | Diffusion models have largely taken over. |

The book was not padding. It is a survey, and a survey includes what was current when it was written. But I would not spend equal time on every chapter.

## What surprised me

- **A simple baseline is hard to beat.** "The same as last week" scored 42,143 boardings per day in [Part 15](/posts/sklearn15/); the best network scored 24,021. That is a real gain, but the 1-neuron network scored 102,752, and without the baseline I would not have known that it was bad.
- **A small fix can change everything.** Masking the padding in [Part 16](/posts/sklearn16/) took a sentiment model from 50.0% to 87.5%.
- **Training can be fragile.** In [Part 17](/posts/sklearn17/), my plain GAN produced the same picture 32 times. In [Part 18](/posts/sklearn18/), agents reached the top score and then fell away.
- **Seeing the output beats reading about it.** I learned most from the failures that I ran into: a deadlock on my Mac, a server that took a minute to notice a new model, and a warning about dropped padding.

## What I would do differently

I would run the long trainings at full length from the start. In [Part 16](/posts/sklearn16/) and [Part 17](/posts/sklearn17/) I first shortened the longest ones to save time, and the results were poor: a GAN that made one picture, and a diffusion model that made dark blurs. Rerunning at full length fixed most of that, but it took hours, and I did not rerun the translation models. My Mac has a graphics processor, and I tried it: for these small models, with batches of 32, it was slower than the processor, as [Part 12](/posts/sklearn12/) shows. A bigger machine, or bigger batches, is where a graphics processor would help.

I did write the training loop of Part 12 in PyTorch, as well as in TensorFlow, because the loop that I wrote by hand in MiniGPT is in PyTorch. The two gave the same results. If I did the series again, I would write the loops in both from the start.

## References

- [Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow](https://github.com/ageron/handson-ml3) - Aurélien Géron's notebooks for the third edition
- [Scikit-Learn (Part 1)](/posts/sklearn1/) - the start of the series
- [MiniGPT](/posts/minigpt/) - the language model that the series kept returning to
