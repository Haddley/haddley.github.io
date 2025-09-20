---
title: "Machine Learning (Part 9)"
description: "A comprehensive guide covering machine learning (part 9)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning9.png"
tags: ["database","ai","machine learning","git"]
---

# Machine Learning (Part 9)

Machine Learning (Part 9) The MNIST database Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain MNIST The MNIST database of handwritten digits has a training set of 60,000 examples, and a test set of 10,000 examples. The digits have been size-normalized and centered in a fixed-size image. Keras is aware of the MNIST database. The database can be loaded using the mnist.load_data() function. A random image from the MNIST database can be viewed using the pyplot.imshow() function. An image from the MNIST database normalization Normalization refers to a process that makes something more normal or regular. Here the each image pixel value (0-255) is converted to a float value between 0 and 1. Each label (an integer between 0 and 9) is converted to a matrix of eight zeros and a single one. Normalized model The keras Sequential model is commonly used. I added a Dense layer with 512 units and 784 (28*28) inputs (there are 784 pixels in each image). I added a Dense hidden layer with 512 units. I added a Dense output layer with 10 units (each unit corresponding to a category value from 0 to 9). model compile and fit After creating the model I configured and trained it. I used the compile() function to configure the model. I used the fit() function to train the model. compile and fit predict I used the predict() function to "recognize" the test images. predict (recognizing the handwritten digits) Notebook
