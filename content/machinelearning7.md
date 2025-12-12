---
title: "Machine Learning (Part 7)"
description: "Google Cloud Platform"
date: "2022-06-11"
categories: ["AI","Angular","TypeScript"]
tags: ""
slug: "machinelearning7"
image: "/assets/images/tensorflow-logo.svg"
---



AutoML enables developers to train high-quality models specific to their business needs.

I used AutoML to build and use the diabetes binary classification model I described [here](machinelearning6.html).

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.05.35-pm-1240x869.png)
*I created a new dataset*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.06.45-pm-1244x866.png)
*I uploaded the csv file (minimum size is 1000 rows)*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.06.57-pm-1244x866.png)
*The data was imported*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.10.36-pm-1241x864.png)
*AutoML detected 9 columns*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.11.19-pm-1247x860.png)
*I selected "Outcome" as the Target column*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.11.54-pm-1241x862.png)
*I trained the AutoML model*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.12.20-pm-1238x916.png)
*I specified a budget of one hour*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.12.31-pm-1241x858.png)
*Training started*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-4.58.14-pm-1241x904.png)
*Training progressed*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.00.00-pm-1243x910.png)
*Training completed*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.01.25-pm-1354x1310.png)
*I reviewed the Confusion matrix (the true positives. false positives, true negatives and false negatives)*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.02.29-pm-1351x1325.png)
*I reviewed the Feature importance summary*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.03.32-pm-1367x330.png)
*I deployed the model to the cloud*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.03.43-pm-1061x363.png)
*I clicked the DEPLOY button*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.01.25-pm-1354x1310.png)
*The deployment completed*

![](/assets/images/machinelearning7/screen-shot-2022-06-12-at-5.34.27-pm-1366x1319.png)
*I entered test data and asked the model to predict the "Outcome" value*