---
title: "Sails (Part 2)"
description: "A comprehensive guide covering sails (part 2)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/sails2/hero.png"
tags: ["azure","aws","ai","git","github"]
---

# Sails (Part 2)

## Sails and the Azure Cosmos DB API for MongoDB

![AWS](/assets/images/sails2/sailsjs-logo-515x193.png)
*By http://sailsjs.com/ Fair use*


## Articles api

```bash
% sails generate api articles
```


![](/assets/images/sails2/screen-shot-2021-10-12-at-1.43.22-pm-1836x1048.png)
*generate api articles*


## Blueprint API

Once the articles api has been created I can use the Blueprint API to create article items.

On the laptop I navigate to http://localhost:1337/articles.

![](/assets/images/sails2/screen-shot-2021-10-12-at-1.57.37-pm-1564x272.png)
*/articles*

![](/assets/images/sails2/screen-shot-2021-10-12-at-2.03.46-pm-1836x347.png)
*/articles/Create?title=<title>&body=<body>*


## Push to GitHub

The new code is published to https://haddley-sails.azurewebsites.net after it is pushed to the GitHub repository.

![](/assets/images/sails2/screen-shot-2021-10-12-at-2.13.20-pm-1836x1036.png)
*Push to GitHub*

![](/assets/images/sails2/screen-shot-2021-10-12-at-2.13.32-pm-1836x1037.png)
*GitHub action in progress*

![](/assets/images/sails2/screen-shot-2021-10-12-at-6.25.29-pm-1836x1032.png)
*GitHub action completed*


## Creating and Destroying items

Once the articles model update has been published to Azure I can use the Blueprint API to create and to remove (destroy) article items.

I navigate to https://haddley-sails.azurewebsites.net/articles.

![](/assets/images/sails2/screen-shot-2021-10-12-at-6.29.01-pm-1836x627.png)
*/articles/Create?...*

![](/assets/images/sails2/screen-shot-2021-10-12-at-6.39.02-pm-1836x630.png)
*/articles/Destroy?...*

![](/assets/images/sails2/screen-shot-2021-10-12-at-6.39.24-pm-1836x633.png)
*/articles*


## Azure Cosmos DB API for MongoDB

In the screenshots above I have been using local disk storage and the sails-disk adapter.

Below I update the application to use the Azure Cosmos DB for MongoDB.

![](/assets/images/sails2/screen-shot-2021-10-12-at-7.13.43-pm-1836x1024.png)
*Overview*

![](/assets/images/sails2/screen-shot-2021-10-12-at-7.50.49-pm-1836x1161.png)
*updated connections.js*

![](/assets/images/sails2/screen-shot-2021-10-12-at-7.58.40-pm-1836x695.png)
*updated model*

![](/assets/images/sails2/screen-shot-2021-10-12-at-7.56.29-pm-1836x634.png)
*/articles*

![](/assets/images/sails2/screen-shot-2021-10-12-at-7.51.20-pm-1836x1071.png)
*Data Explorer*

![](/assets/images/sails2/screen-shot-2021-10-12-at-8.00.37-pm-1228x264.png)
*Push changes to GitHub*

![](/assets/images/sails2/screen-shot-2021-10-12-at-8.38.22-pm-1836x998.png)
*GitHub action in progress*

![](/assets/images/sails2/screen-shot-2021-10-12-at-8.39.28-pm-1836x633.png)
*https://haddley-sails.azurewebsites.net/articles connected to Azure Cosmos DB for MongoDB*
