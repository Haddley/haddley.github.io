---
type: post
slug: sklearn8
title: "Scikit-Learn (Part 8)"
date: "2026-10-12"
part: 8
builds_on: [sklearn7, sklearn3, sklearn1, sklearn4, minigpt-grown]
topics: [dimensionality-reduction, principal-component-analysis, manifold-learning, data-visualization]
tools: [Scikit-Learn, t-SNE, PCA, JupyterLab]
status: current
checked: "2026-11-06"
source_hash: "e8266112ed24"
generated_by: gemma4:12b
---

**Summary.** I explore dimensionality reduction techniques to compress high-dimensional data while preserving essential information. I find that methods like PCA and t-SNE serve different purposes, such as speeding up training or visualizing data, rather than directly improving model accuracy.

## What I did
- I analyzed how many numbers are needed to represent an image effectively.
- I implemented PCA to reduce 784 pixels to 154 while keeping 95% of the variation.
- I compared PCA with random projection and t-SNE for different use cases.
- I evaluated the trade-offs between data compression and information loss.

## Claims
- PCA keeps the most important directions of variation in an image.
  > "A method called principal component analysis (PCA) finds the directions in which the images differ most, and keeps only those."
- Reducing dimensions to 154 numbers keeps 95% of the variation in the original 784 pixels.
  > "154 well-chosen numbers keep 95% of the variation in an image's 784."
- Dimensionality reduction is intended to speed up training or help humans see data, not to improve accuracy.
  > "It is worth doing to speed up training, or to draw the data so a person can see it, but it rarely makes a model more accurate on its own."
- t-SNE is used to visualize high-dimensional data in 2D because it keeps neighbors together.
  > "Methods for curved data, such as t-SNE (t-distributed stochastic neighbor embedding), unroll it instead, so that neighbours stay together. t-SNE lays out many-numbered data in 2D so that I can see it."
- Random projection does not learn anything because it uses a random table of numbers.
  > "Another method, random projection, learns nothing at all: it multiplies the data by a random table of numbers, and the number of dimensions to keep comes from a formula, not from the data."
- UMAP has largely replaced t-SNE for creating pictures of data.
  > "A: PCA is, constantly: for making data smaller, removing noise, and drawing a first picture of a dataset. t-SNE is still used to look at data, but never to prepare it for a model, and a newer method called UMAP (uniform manifold approximation and projection) has largely taken its place for pictures."

## Outcome
I concluded that while dimensionality reduction removes some information, it is a vital tool for making training faster and making complex data visible to humans.

## Caveats
The post notes that some methods like Isomap and locally linear embedding are mostly of historical interest and are not expected in real projects.
