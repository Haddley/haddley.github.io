---
title: "Machine Learning (Part 6)"
description: "Splitting into training and test dataframes"
date: "2022-06-11"
categories: ["AI"]
tags: "machine-learning, pandas, train-test-split, scikit-learn"
hidden: false
slug: "machinelearning6"
image: "/assets/images/machinelearning6/tensorflow-logo.svg"
---



I investigated whether it is possible to predict if a person will develop diabetes based on their Pregnancy Count, Glucose level, Blood Pressure, Skin Thickness, Insulin, BMI, DiabetesPedigreeFunction and Age.

![](assets/images/machinelearning6/screen-shot-2022-06-11-at-4.04.28-pm-1135x418.png)
*I reviewed the summary of the diabetes data*


There are 768 data items in the diabetes data.

I split the 768 data items into a training set and a testing set.

The "Outcome" column showed me which people had been diagnosed with diabetes.

I removed the Outcome column from the training set (using "pop").

![](assets/images/machinelearning6/screen-shot-2022-06-13-at-2.07.48-pm-815x678.png)
*I split the data into training and testing dataframes*


## Normalize

Then I normalized the feature columns.

(I noted that one way to normalize numeric data is to calculate the mean of each column and then replace the original value in each cell with the number of standard deviations the original value was from the mean of that column.)

![](assets/images/machinelearning6/screen-shot-2022-06-13-at-2.09.21-pm-820x743.png)
*I reviewed the training data X*


## Training the sklearn model

I trained a sklearn model using the normalized features in the training set and the labels in the training set.

The actual and predicted results are shown below

![](assets/images/machinelearning6/screen-shot-2022-06-13-at-2.09.56-pm-820x625.png)
*Training the sklearn model and predicting results*