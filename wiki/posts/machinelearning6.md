---
type: post
slug: machinelearning6
title: "Machine Learning (Part 6)"
date: "2022-06-11"
part: 6
builds_on: []
topics: [machine-learning, data-splitting, feature-normalization, diabetes-prediction]
tools: [sklearn, python]
status: current
checked: "2026-11-05"
source_hash: "0245be205dce"
generated_by: gemma4:12b
---

**Summary.** I explored how to predict diabetes based on various physiological metrics. I demonstrated the process of splitting data into training and testing sets and normalizing features before training a model.

## What I did
- I investigated predictors for diabetes.
- I reviewed the summary of the data.
- I split the data into training and testing sets.
- I normalized the feature columns.
- I trained a sklearn model.

## Claims
- I investigated if specific health metrics can predict diabetes.
  > "I investigated whether it is possible to predict if a person will develop diabetes based on their Pregnancy Count, Glucose level, Blood Pressure, Skin Thickness, Insulin, BMI, DiabetesPedigreeFunction and Age."
- The dataset contains 768 data items.
  > "There are 768 data items in the diabetes data."
- I divided the data into training and testing dataframes.
  > "*I split the data into training and testing dataframes*"
- I used a specific method to normalize numeric data.
  > "(I noted that one way to normalize numeric data is to calculate the mean of each column and then replace the original value in each cell with the number of standard deviations the original value was from the mean of that column.)"

## Outcome
I built a machine learning model that predicts diabetes based on normalized features. I demonstrated how to partition data to ensure proper model evaluation.

## Caveats
The post does not detail the specific accuracy metrics of the final prediction.
