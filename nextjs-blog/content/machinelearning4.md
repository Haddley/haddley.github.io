---
title: "Machine Learning (Part 4)"
description: "A comprehensive guide covering machine learning (part 4)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning4/hero.png"
tags: ["python","ai","ml","machine learning","git"]
---

# Machine Learning (Part 4)

## Notebooks

![](/assets/images/machinelearning4/tensorflow-logo.svg)
*Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain*


## Colab

Colab is Google's implementation of [Jupyter Notebooks](https://jupyter.org).

 A Colab consists of [text comments and code](https://colab.research.google.com/github/google/eng-edu/blob/main/ml/cc/exercises/numpy_ultraquick_tutorial.ipynb?utm_source=mlcc&utm_campaign=colab-external&utm_medium=referral&utm_content=numpy_tf2-colab&hl=en#scrollTo=vO47lN3aDOAv)


## NumPy

[NumPy](https://colab.research.google.com/github/google/eng-edu/blob/main/ml/cc/exercises/numpy_ultraquick_tutorial.ipynb?utm_source=mlcc&utm_campaign=colab-external&utm_medium=referral&utm_content=numpy_tf2-colab&hl=en#scrollTo=HF-flFfs9r0q) is a Python library for creating and manipulating vectors and matrices.

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.23.23-pm-757x144.png)
*import numpy as np*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.24.04-pm-745x209.png)
*np.array([...])*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.25.18-pm-764x221.png)
*np.array([[...],[...],...,[...]]*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.27.05-pm-755x262.png)
*a sequence from 5 to 11*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.28.11-pm-783x247.png)
*6 random values between 50 and 100*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.29.30-pm-788x165.png)
*5 random floating point values between 0 and 1*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.33.42-pm-788x475.png)
*feature and label*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.36.16-pm-788x402.png)
*adding noise*


## Pandas

[Pandas DataFrames](https://colab.research.google.com/github/google/eng-edu/blob/main/ml/cc/exercises/pandas_dataframe_ultraquick_tutorial.ipynb?utm_source=mlcc&utm_campaign=colab-external&utm_medium=referral&utm_content=pandas_tf2-colab&hl=en) are similar to spreadsheets. DataFrames have columns and rows.

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.49.03-pm-787x164.png)
*import numpy and pandas*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.50.52-pm-789x650.png)
*pd.DataFrame(data=<data cell values>, columns=<column names>)*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.54.36-pm-779x348.png)
*<dataframe>["<new column name>"] = <dataframe>["<existing column name>"] + <constant>*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-6.58.28-pm-787x739.png)
*<dataframe>[<start index>,<end index + 1>]*

![](/assets/images/machinelearning4/screen-shot-2022-06-08-at-7.01.31-pm-786x991.png)
*<dataframe>.copy()*
