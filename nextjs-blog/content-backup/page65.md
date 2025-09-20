---
title: "Machine Learning (Part 4a)"
description: "A comprehensive guide covering machine learning (part 4a)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/page65.png"
tags: ["python","ai","machine learning"]
---

# Machine Learning (Part 4a)

Machine Learning (Part 4a) WIP Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain Colab Colab is Google's implementation of Jupyter Notebooks . A Colab consists of text cell comments and code cell Python code NumPy NumPy is a Python library for creating and manipulating vectors and matrices. import numpy as np np.array([...]) np.array([[...],[...],...,[...]] a sequence from 5 to 11 6 random values between 50 and 100 5 random floating point values between 0 and 1 feature and label adding noise Pandas Pandas DataFrames are similar to spreadsheets. DataFrames have columns and rows. import numpy and pandas pd.DataFrame(data=<data cell values>, columns=<column names>) <dataframe>["<new column name>"] = <dataframe>["<existing column name>"] + <constant> <dataframe>[<start index>,<end index + 1>] <dataframe>.copy() Linear Regression with TensorFlow We can use machine learning to predict House Prices. %tensorflow_version 2.x import pandas, tensorflow and matplotlib csv file contents pd.read_csv(<filepath or buffer>) # divide house price by 1,000 /= 1000.0 <dataframe>.describe() Define create_model and train_model functions tf.keras.models.Sequential() <model>.add(tf.keras.layers.Dense(...)) <model>.compile(...) ... <model>.fit(...) Define plot_the_model and plot_the_loss_curve functions build_model and train_model plot_the_model and plot_the_loss_curve Define predict_house_values function predict value of 10 houses <dataframe>.corr() esp8266 esp8266 esp8266 esp8266 esp8266
