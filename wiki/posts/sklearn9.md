---
type: post
slug: sklearn9
title: "Scikit-Learn (Part 9)"
date: "2026-10-12"
part: 9
builds_on: [sklearn8, sklearn4, minigpt-grown, sklearn10]
topics: [unsupervised-learning, clustering, semi-supervised-learning, k-means-clustering]
tools: [Scikit-Learn, JupyterLab, Keras, TensorFlow]
status: current
checked: "2026-11-06"
source_hash: "5b8462ca5cd6"
generated_by: gemma4:12b
---

**Summary.** I explore unsupervised learning by finding groups in data that lacks labels. I demonstrate how clustering can make a small number of labels much more effective for training a classifier.

## What I did
- I introduced K-Means, DBSCAN, and Gaussian mixtures to find clusters in data.
- I compared the performance of a classifier using random labels versus labels spread across clusters.
- I analyzed how different clustering methods handle different shapes and densities.
- I demonstrated how to use clustering to find structure in unlabeled data.

## Claims
- Using clustering to select labels improved accuracy from 74.8% to 86.4%.
  > "When I used clustering to pick which 50 to label, and shared each label with every image in its cluster, it was right on 86.4%."
- K-Means requires multiple starts because it can settle on a poor answer due to random initialization.
  > "K-Means places its first centres at random, and can settle on a poor answer."
- K-Means is best suited for finding round, similar-sized groups.
  > "K-Means works well for round, similar-sized groups, and poorly for other shapes, which is why other methods exist."
- DBSCAN finds groups of any shape by following dense regions.
  > "DBSCAN follows dense regions and finds groups of any shape; Gaussian mixtures give each point a chance of belonging to each group."
- In my run, the best of 10 starts reached an inertia of 211.6.
  > "In my run, one random start ended with an inertia of 219.6, and the best of 10 starts reached 211.6."
- The result of clustering is not a single right answer but a way to find structure.
  > "There are no right answers to learn from, so training means finding structure, and each method finds it in its own way."

## Outcome
I concluded that even without labels, a model can find structure that allows a few labels to go much further. I built a semi-supervised classifier that performed significantly better by using clusters to spread 50 labels.

## Caveats
Clustering does not know what the groups mean and the groups do not have to match the classes a person would choose.
