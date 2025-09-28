---
title: "Machine Learning (Part 5)"
description: "Excel"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning5/hero.png"
tags: ["ai","machine learning","git","github"]
hidden: true
---

![](/assets/images/machinelearning5/tensorflow-logo.svg)
*Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain*


Can we predict a person's glucose levels based on their age?

If one thing depends on another thing in a linear way the least squares method can be used to predict the dependent thing (y) given the independent thing (x).

If there is a linear relationship between glucose levels and age we should be able to summarize that relationship using an equation of the form **y = mx + b**.

In this formula **y** would be the (predicted) thing (glucose level) and **x** would be the given thing (the person's age).

In this formula **m** is the slope of the linear relationship (weight) and **b** is the y-intercept constant (bias).

If a linear relationship exists and we can collect enough data we should be able to calculate the value of m and b and to predict the value of a person's glucose levels based on their age.

This [youtube video](https://www.youtube.com/watch?v=p_fu7gIikxY) explains how we can calculate the slope and y-intercept values by hand  using the least squares method.

As an exercise I wanted to use Excel and machine learning to calculate the line of best fit.


Excel has built in "slope()" and "intercept()" functions that can be used to calculate the slope (m) and y-intercept (b) for a set of dependent and independent data points.

The youtube video referenced [above](https://www.youtube.com/watch?v=p_fu7gIikxY) explains how these functions work.

![](/assets/images/machinelearning5/screen-shot-2022-06-10-at-9.03.43-am-629x414.png)
*slope and y-intercept calculated by Excel*


## Calculating the line of best fit using the sklearn LinearRegression model

A Colab Notepad can be used to show data points and the line of best fit.

Predicting a person's glucose levels based on their age.

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-10.38.18-am-987x1048.png)
*A scatter plot of the glucose level data with a line of best fit added in red ('r')*


## Making a prediction

Once a model has been trained it can be used to make predictions.

In the example above we can provide a person's age and predict what their glucose level might be (based on the data used to train the model).

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-1.38.01-pm-831x71.png)
*What would we expect a person's glucose level to be if they were aged 50?*


## A larger data set

[Plotly Sample Datasets](https://github.com/plotly/datasets) includes a larger diabetes dataset.

A Colab Notepad can used to show data points from the dataset and a description of the dataset.

![](/assets/images/machinelearning5/screen-shot-2022-06-11-at-2.03.18-pm-1007x671.png)
*Diabetes Dataset*

![](/assets/images/machinelearning5/screen-shot-2022-06-11-at-2.03.38-pm-1189x503.png)
*Description of Diabetes Dataset*


## Excel

Again we can use Excel to calculate a line of best fit.

![](/assets/images/machinelearning5/screen-shot-2022-06-11-at-1.52.11-pm-891x413.png)
*Using Excel to calculate the line of best fit for Glucose (y) given Age (x)*


## Calculating the line of best fit using the sklearn LinearRegression model

A Colab Notepad can be used to show data points and the line of best fit.

Predicting a person's glucose levels based on their age.

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-10.59.36-am-981x1033.png)
*A scatter plot of the glucose level and age data with a line of best fit added in red ('r')*


## Implementing Linear Regression with two input variables using the sklearn LinearRegression model

Predicting a person's glucose levels based on their age and BMI.

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-12.09.40-pm-803x1187.png)
*Predicting a person's glucose levels based on their age and BMI*

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-12.09.50-pm-678x371.png)
*3D scatter plot of the glucose level, age and BMI data with the of best fit (surface) added in red ('red')*


## Making a prediction

Once a model has been trained it can be used to make predictions.

In the example above we can provide a person's age and BMI and predict what their glucose level might be (based on the data used to train the model).

![](/assets/images/machinelearning5/screen-shot-2022-06-13-at-1.54.58-pm-830x100.png)
*What would we expect a person's glucose level to be if they were aged 50 with a BMI of 70?*
