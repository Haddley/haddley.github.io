---
type: post
slug: sklearn2
title: "Scikit-Learn (Part 2)"
date: "2026-10-12"
part: 2
builds_on: [sklearn1, sklearn6, sklearn7, minigpt-grown, sklearn10]
topics: [machine-learning-pipelines, hyperparameter-tuning, random-forests, cross-validation, feature-engineering]
tools: [Scikit-Learn, Python, JupyterLab, Random Forest]
status: current
checked: "2026-11-06"
source_hash: "f1859aac8adf"
generated_by: gemma4:12b
---

**Summary.** I walk through an end-to-end machine learning project to predict California house prices using the Scikit-Learn library. I demonstrate how to move from raw data to a tested model by implementing a pipeline that includes data preparation, model selection, and hyperparameter tuning.

## What I did
- I prepared a data pipeline to handle missing values, encoding, and scaling.
- I performed a grid search and a randomized search to find the best model settings.
- I compared the performance of linear regression, decision trees, and random forests.
- I evaluated the models on a held-back test set to ensure they could generalize to new data.

## Claims
- The project uses a fictional scenario where a company needs to estimate house costs.
  > "The book invents a company that wants to estimate what a typical house costs in each California district, so that an investor can decide where to buy."
- The model's performance on training data is not a reliable indicator of its true quality.
  > "A model's score on the districts it learned from tells me almost nothing, because it can simply remember them."
- The decision tree achieved an error of zero on its training data but failed on unseen data.
  > "The decision tree's error of 0 on the houses it trained on became 67,153 on houses it had not seen."
- The random forest was selected as the best model for this specific dataset.
  > "They tried a linear model, a decision tree and a random forest, scored all three on houses held back from training, and kept the best, which was the forest."
- The training process took approximately six minutes on my hardware.
  > "The whole run took about 6 minutes on my Mac Studio, most of it in the two searches."
- Median income is the strongest predictor of house price with a correlation of 0.69.
  > "Median income is far ahead at 0.69."

## Outcome
I built a robust machine learning pipeline that successfully predicts house prices by selecting the best performing model through systematic search and evaluation.

## Caveats
The problem is based on a fictional scenario because the original dataset already contains the actual prices for every district.
