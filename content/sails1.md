---
title: "Sails (Part 1)"
description: "Azure DevOps and Sails."
date: "2021-10-12"
categories: ["DevOps","JavaScript","Azure","AI"]
tags: []
slug: "sails1"
image: "/assets/images/sailsjs-logo-515x193.png"
---



Sails.js (or Sails) is a web framework that makes it easy to build custom, enterprise-grade Node.js apps. 

It is designed to resemble the MVC architecture from frameworks like Ruby on Rails.

The Azure DevOps Starter includes support for Sails.

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.31.09-am-1542x564.png)
*DevOps Starter*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.32.58-am-1536x888.png)
*Create DevOps starter*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.33.24-am-1540x930.png)
*Setting up Node.js web app with GitHub*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.34.00-am-1538x932.png)
*Select Sails.js and add a database*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.34.15-am-1540x936.png)
*Web App for Containers*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.34.32-am-1542x926.png)
*Connect to GitHub*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.35.27-am-1538x932.png)
*Web App, Container Registry and Database settings*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.35.41-am-1544x928.png)
*Review and Create*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.36.12-am-1542x930.png)
*Deployment in progress*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.36.33-am-1536x926.png)
*Deployment is complete*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.37.23-am-1536x1302.png)
*GitHub action is running*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.37.55-am-1538x1306.png)
*Authorise*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.38.26-am-1542x1308.png)
*Build and push Application to Container Repository*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.44.51-am-1532x1310.png)
*Run functional tests (Connect to web site using Selenium and check site title)*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.45.40-am-1534x1306.png)
*set up test environment and run tests*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.48.29-am-1540x1306.png)
*GitHub action/job complete*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.49.43-am-1666x1112.png)
*web site has been published*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.50.04-am-1676x956.png)
*Open GitHub repository using GitHub Desktop*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.50.55-am-1016x628.png)
*Clone*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.51.13-am-1034x232.png)
*Open in Visual Studio Code*

![](/assets/images/sails1/screen-shot-2021-10-12-at-10.53.50-am-1836x1317.png)
*Sample Functional Tests*


## local development environment

Open Visual Studio Code terminal

Navigate to the Application folder

```bash
% cd Application
```


Start the application on the laptop

```bash
% sails lift
```


![](/assets/images/sails1/screen-shot-2021-10-12-at-11.12.33-am-1836x1046.png)
*sails lift*

![](/assets/images/sails1/screen-shot-2021-10-12-at-11.13.15-am-1664x1110.png)
*http://localhost:1337*


## Testing testing

Updating the default page title (in the layout file) results in a failed test.

![](/assets/images/sails1/screen-shot-2021-10-12-at-1.11.49-pm-1836x622.png)
*Updating the web page title (without updating the web page title test)*

![](/assets/images/sails1/screen-shot-2021-10-12-at-1.18.38-pm-1836x1033.png)
*pushing update*

![](/assets/images/sails1/screen-shot-2021-10-12-at-1.32.31-pm-1836x1036.png)
*code is deployed and functional test fails (as expected)*
## References

- [Sails Hosting](https://sailsjs.com/documentation/concepts/deployment/hosting)