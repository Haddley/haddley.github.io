---
type: post
slug: sklearn5
title: "Scikit-Learn (Part 5)"
date: "2026-10-12"
part: 5
builds_on: [sklearn4, sklearn2, minigpt-grown, sklearn7, sklearn6]
topics: [support-vector-machines, kernel-trick, gradient-descent, feature-scaling]
tools: [Scikit-Learn, LIBSVM, JupyterLab, StandardScaler]
status: current
checked: "2026-11-06"
source_hash: "4746aa60ea5c"
generated_by: gemma4:12b
---

**Summary.** I explain how support vector machines find the widest possible street between two classes to create a robust boundary. I also demonstrate how kernels allow for curved boundaries and show that SVMs can be trained both through direct calculation and gradient descent.

## What I did
- I explained the concept of the widest street as a method for classification.
- I demonstrated how the support vector parameter determines the boundary.
- I showed how kernels allow for non-linear boundaries without extra features.
- I compared direct solving via LIBSVM against training via gradient descent.
- I evaluated the current practical use of SVMs compared to gradient-boosted trees.

## Claims
- The support vector machine selects the boundary with the widest empty strip.
  > "The method in this chapter, the support vector machine (SVM), picks the line with the widest empty strip on either side of it, which the book calls a street."
- The parameter C manages the trade-off between a wide street and training accuracy.
  > "A setting called `C` decides the trade-off between a wide street and a few flowers on the wrong side of it."
- Kernels allow for curved boundaries by comparing pairs of flowers directly.
  > "A *kernel* lets an SVM draw a curved boundary without computing any extra curved features, using a shortcut that compares pairs of flowers directly."
- Gradient descent can approximate the direct solution of an SVM within 0.05.
  > "It lands within about 0.05 of the direct answer."
- StandardScaler is necessary because SVMs measure street width in the units of the features.
  > "That is why the code puts a `StandardScaler` in front of the SVM, in a pipeline like the one in Part 2, so that every feature is on the same scale."
- Gradient-boosted trees are usually more accurate for tables of data.
  > "They work well on small or medium datasets with many features, but training gets slow as the number of examples grows, and for tables of data gradient-boosted trees (see Part 7) are usually more accurate."

## Outcome
I built a linear SVM to identify Iris virginica and demonstrated that the same model can be trained using both direct solvers and gradient descent.

## Caveats
I do not go into the use of SVMs for predicting numbers in this post.
