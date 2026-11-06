---
type: post
slug: sklearn3
title: "Scikit-Learn (Part 3)"
date: "2026-10-12"
part: 3
builds_on: [sklearn2, sklearn4, minigpt-grown, sklearn10, sklearn7]
topics: [classification, precision-and-recall, confusion-matrices, stochastic-gradient-descent]
tools: [Scikit-Learn, MNIST, JupyterLab, SGDClassifier]
status: current
checked: "2026-11-06"
source_hash: "4a4065245ce8"
generated_by: gemma4:12b
---

**Summary.** I explore how to evaluate classification models using the MNIST dataset of handwritten digits. I demonstrate why accuracy can be misleading when a target class is rare and show how precision and recall provide a clearer picture of model performance.

## What I did
- I trained a model to identify the digit 5 in images.
- I analyzed the results using a confusion matrix.
- I calculated precision and recall to see what accuracy hides.
- I demonstrated how changing the threshold affects the balance between precision and recall.
- I explained the mechanics of the SGDClassifier.

## Claims
- A high accuracy rate can hide a poor model when the target class is rare.
  > "**The lesson:** a high percentage of right answers can hide a poor model, when the answer I am looking for is rare."
- The model found only about 65% of the actual 5s.
  > "**Of the real 5s, how many it found.** For my model, 65.1%."
- A confusion matrix shows what a model gets wrong in a way that a single percentage cannot.
  > "A count of every kind of right and wrong answer, called a confusion matrix, shows what the model gets wrong, which a single percentage cannot."
- The SGDClassifier is the first model in this series trained by nudging.
  > "The model here, a `SGDClassifier`, is the first in the series trained by *nudging*: its numbers start at zero and are moved a little, over and over, as I explain below."
- A stricter threshold increased precision to 90% but dropped recall to 48%.
  > "If I make the model stricter about what it calls a 5, it is right more often when it says 5 (90.0%), but it misses more of them (it found only 48.0%)."
- A linear model can start with all weights at zero because it only has one layer.
  > "A: A linear model has one layer, so starting every weight at zero does no harm."

## Outcome
I built a 5-detector and concluded that precision and recall are necessary to understand the true performance of a classifier.

## Caveats
The post does not show how to classify all ten digits at once, which is covered in the later sections of the chapter.
