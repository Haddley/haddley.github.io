---
title: "Sails (Part 1)"
description: "Azure DevOps and Sails."
date: "2021-10-12"
categories: ["DevOps", "Azure"]
tags: "sails-js, azure-devops, node, mvc"
slug: "sails1"
image: "/assets/images/sails1/sailsjs-logo-515x193.png"
---



I used the Azure DevOps Starter to set up a Sails.js Node.js web application with a CI/CD pipeline, container registry, and database.

![](assets/images/sails1/screen-shot-2021-10-12-at-10.31.09-am-1542x564.png)
*I navigated to DevOps Starter*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.32.58-am-1536x888.png)
*I created a DevOps Starter*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.33.24-am-1540x930.png)
*I set up a Node.js web app with GitHub*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.34.00-am-1538x932.png)
*I selected Sails.js and added a database*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.34.15-am-1540x936.png)
*I selected Web App for Containers*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.34.32-am-1542x926.png)
*I connected to GitHub*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.35.27-am-1538x932.png)
*I configured the Web App, Container Registry, and Database settings*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.35.41-am-1544x928.png)
*I reviewed the settings and clicked Create*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.36.12-am-1542x930.png)
*The deployment was in progress*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.36.33-am-1536x926.png)
*The deployment was complete*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.37.23-am-1536x1302.png)
*The GitHub action was running*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.37.55-am-1538x1306.png)
*I authorised the deployment*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.38.26-am-1542x1308.png)
*The action built and pushed the application to the Container Repository*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.44.51-am-1532x1310.png)
*The action ran functional tests (connecting to the website using Selenium and checking the site title)*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.45.40-am-1534x1306.png)
*The action set up the test environment and ran tests*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.48.29-am-1540x1306.png)
*The GitHub action/job completed*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.49.43-am-1666x1112.png)
*The website was published*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.50.04-am-1676x956.png)
*I opened the GitHub repository using GitHub Desktop*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.50.55-am-1016x628.png)
*I cloned the repository*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.51.13-am-1034x232.png)
*I opened the project in Visual Studio Code*

![](assets/images/sails1/screen-shot-2021-10-12-at-10.53.50-am-1836x1317.png)
*I reviewed the sample functional tests*


## local development environment

I opened a Visual Studio Code terminal, navigated to the Application folder, and started the application.

```bash
% cd Application
```

```bash
% sails lift
```


![](assets/images/sails1/screen-shot-2021-10-12-at-11.12.33-am-1836x1046.png)
*I ran sails lift*

![](assets/images/sails1/screen-shot-2021-10-12-at-11.13.15-am-1664x1110.png)
*I opened http://localhost:1337 in the browser*


## Testing testing

I updated the default page title (in the layout file), which caused the functional test to fail.

![](assets/images/sails1/screen-shot-2021-10-12-at-1.11.49-pm-1836x622.png)
*I updated the web page title without updating the web page title test*

![](assets/images/sails1/screen-shot-2021-10-12-at-1.18.38-pm-1836x1033.png)
*I pushed the update*

![](assets/images/sails1/screen-shot-2021-10-12-at-1.32.31-pm-1836x1036.png)
*The code was deployed and the functional test failed (as expected)*
## References

- [Sails Hosting](https://sailsjs.com/documentation/concepts/deployment/hosting)