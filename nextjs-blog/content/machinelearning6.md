---
title: "Machine Learning (Part 6)"
description: "A comprehensive guide covering machine learning (part 6)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/tensorflow-logo.svg"
tags: ["ai","machine learning","testing"]
---

# Machine Learning (Part 6)

## Binary classification

![](/assets/images/machinelearning6/tensorflow-logo.svg)
*Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain*


## Binary classification

Can we predict if a person will develop diabetes based on their Pregnancy Count, Glucose level, Blood Pressure, Skin Thickness, Insulin, BMI, DiabetesPedigreeFunction and Age?

![](/assets/images/machinelearning6/screen-shot-2022-06-11-at-4.04.28-pm-1135x418.png)
*Summary of the diabetes data*


## Splitting into training and test dataframes

There are 768 data items in the diabetes data.

We will need to split the 768 data items into a training set and a testing set.

The "Outcome" column allows us to see which people have been diagnosed with diabetes.

I removed the Outcome column from the training set (using "pop").

![](/assets/images/machinelearning6/screen-shot-2022-06-13-at-2.07.48-pm-815x678.png)
*Splitting data into training and testing dataframes*


## Normalize

Then I normalized the feature columns.

(Notice that one way to normalize numeric data is to calculate the mean of each column and then replacing the original value in each cell with the number of standard deviations the original value was from the mean of that column.)

![](/assets/images/machinelearning6/screen-shot-2022-06-13-at-2.09.21-pm-820x743.png)
*The training data X*


## Training the sklearn model

I trained a sklearn model using the normalized features in the training set and the labels in the training set.

The actual and predicted results are shown below

![](/assets/images/machinelearning6/screen-shot-2022-06-13-at-2.09.56-pm-820x625.png)
*Training the sklearn model and predicting results*
