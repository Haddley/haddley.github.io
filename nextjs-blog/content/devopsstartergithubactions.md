---
title: "DevOps Starter GitHub actions"
description: "A comprehensive guide covering devops starter github actions"
date: "2025-09-20"
category: "Development"
image: "/assets/images/svgexport-22.svg"
tags: ["azure","devops","ai","git","github"]
---

# DevOps Starter GitHub actions

## Everything you need for developing, deploying, and monitoring your application.

![](/assets/images/devopsstartergithubactions/svgexport-22.svg)
*Microsoft DevOps Logo by Microsoft Corporation is Public Domain*


## DevOps Starter GitHub actions

DevOps Starter makes it easy to get started on Azure using either GitHub actions or Azure DevOps

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.22.36-pm-1836x1028.png)
*Select "DevOps Starter" in Azure Portal*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.43-pm-1836x1035.png)
*Create a Node app*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.55-pm-1836x1033.png)
*Select Express*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.23-pm-1836x1035.png)
*Select Web App for Containers or Windows Web App (free $)*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.40-pm-1836x1032.png)
*Enter GitHub credentials*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.25.26-pm-1836x1033.png)
*Select pricing tier "F1 Free"*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.26.05-pm-1836x1033.png)
*Deployment to Azure in progress*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.02-pm-1836x1030.png)
*GitHub Actions workflow runs Unit Tests*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.44-pm-1836x1031.png)
*If Unit Tests pass deploy Node app to Azure*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.31.15-pm-1836x1030.png)
*Once deployed to Azure run Functional Tests (Selenium)*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.34.39-pm-1836x1036.png)
*GitHub Actions workflow complete*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.19-pm-1836x1033.png)
*Summary of Azure resources*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.37-pm-1836x1031.png)
*Navigate to production URL*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.39-pm-1836x1031.png)
*To add Factorial API... Open with GitHub Desktop*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.56-pm-1012x630.png)
*Clone repository*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.40.46-pm-1836x1254.png)
*Open in Visual Studio Code*


## Run the updated app locally

$ cd Application

$ npm install haddley-factorial-cc
or
$ npm install haddley-factorial-js

$ npm install
$ npm run start

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.10.02-pm-1836x1033.png)
*Updated code returns factorial of 9*


## Run the unit tests locally

$ cd ../Tests
$ npm install
$ gulp unittest

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.13.54-pm-1836x1079.png)
*Updated Unit Tests*


## Run the functional tests locally

$ xattr -d com.apple.quarantine chromedriver

$ npm run start&
$ cd ../Tests
$ gulp functionaltest --webAppUrl http://localhost:3000/

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.50.40-pm-1836x1087.png)
*Functional tests*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.08.12-pm-1836x1259.png)
*Push updates to GitHub... origin master*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.05.24-pm-1836x1027.png)
*GitHub Actions workflow runs again*


## Test factorial API in production

[https://haddley-factorial-api.azurewebsites.net/factorial/9](https://haddley-factorial-api.azurewebsites.net/factorial/9)

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.06.36-pm-1836x1034.png)
*Factorial API running in production*
