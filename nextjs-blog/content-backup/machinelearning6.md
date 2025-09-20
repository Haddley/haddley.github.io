---
title: "Machine Learning (Part 6)"
description: "A comprehensive guide covering machine learning (part 6)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning6.png"
tags: ["ai","machine learning","testing"]
---

# Machine Learning (Part 6)

Machine Learning (Part 6) Binary classification Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain Binary classification Can we predict if a person will develop diabetes based on their Pregnancy Count, Glucose level, Blood Pressure, Skin Thickness, Insulin, BMI, DiabetesPedigreeFunction and Age? Summary of the diabetes data Splitting into training and test dataframes There are 768 data items in the diabetes data. We will need to split the 768 data items into a training set and a testing set. The "Outcome" column allows us to see which people have been diagnosed with diabetes. I removed the Outcome column from the training set (using "pop"). Splitting data into training and testing dataframes Normalize Then I normalized the feature columns. (Notice that one way to normalize numeric data is to calculate the mean of each column and then replacing the original value in each cell with the number of standard deviations the original value was from the mean of that column.) The training data X Training the sklearn model I trained a sklearn model using the normalized features in the training set and the labels in the training set. The actual and predicted results are shown below Training the sklearn model and predicting results Notebook
