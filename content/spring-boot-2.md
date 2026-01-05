---
title: "Java Spring Boot (Part 2)"
description: "References"
date: "2023-10-26"
categories: ["Java"]
tags: ""
slug: "spring-boot-2"
image: "/assets/images/spring-framework-logo-70-no.svg"
---


I used [https://start.spring.io](https://start.spring.io), Visual Studio Code, GitHub and Microsoft Azure to generate an Spring application, to run the Spring application on my laptop and to deploy the Spring application to Microsoft Azure

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-9.55.59-am-1895x1185.png)
*I created a new GitHub repository (haddley-java)*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-9.56.35-am-1898x717.png)
*I clicked the Open with GitHub Desktop menu item*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-9.57.18-am-1604x710.png)
*I used the Open in Visual Studio Code (Insiders) button to open the repository in Visual Studio Code*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-9.57.51-am-1605x790.png)
*I needed some sample code*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-9.59.05-am-1899x896.png)
*https://spring.io/quickstart explains how to create a sample project*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.02.47-am-1898x693.png)
*I logged into the Azure Portal to see what versions of Java were supported*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.03.01-am-1897x508.png)
*I clicked the Web App Create link*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.03.26-am-1898x504.png)
*The latest version of Java supported was 17*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.37.23-am-1897x762.png)
*I navigated to https://start.spring.io/ and updated Group to "com.haddley" and added the Spring Web dependency*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.38.08-am-1895x891.png)
*I clicked the GENERATE button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.42.36-am-1198x430.png)
*I copied the generated file to my local copy of the haddley-java repository*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.44.21-am-1609x793.png)
*I updated the code to include support for the /hello path and ran using ./mvnw spring-boot:run*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.44.49-am-1605x790.png)
*Tomcat initialized with port 8080*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.45.31-am-1895x154.png)
*I navigated to http://localhost:8080/hello*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.46.15-am-1604x709.png)
*I checked my changes*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.46.28-am-1605x710.png)
*I clicked Push origin to upload my changes to GitHub*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.46.43-am-1603x711.png)
*The changes were uploaded*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.48.44-am-1895x892.png)
*I added an Azure Resource Group (haddley-java-rg)*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.49.32-am-1897x894.png)
*I selected the Java 17 runtime*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.49.59-am-1895x894.png)
*I changed the Pricing plan to "Free" and clicked the Next: Deployment button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.51.14-am-1897x462.png)
*The Continuous deployment option was disabled so I clicked the Previous button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.51.33-am-1896x894.png)
*I selected the Basic B1 pricing plan*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.51.47-am-1894x891.png)
*I enabled Continuous deployment and clicked the Authorize button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.52.06-am-1278x719.png)
*I clicked the Authorize AzureAppService button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.52.20-am-1281x722.png)
*I entered an Authorization code*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.53.10-am-1898x894.png)
*I selected organization Haddley. I selected the haddley-java repository*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.53.31-am-1896x892.png)
*I selected the main branch*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.53.56-am-1895x894.png)
*I reviewed the GitHub Actions configuration*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.55.13-am-1896x891.png)
*I clicked the Create button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.55.45-am-1896x891.png)
*I waited*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-10.59.45-am-1896x894.png)
*When deployment was complete I clicked the Go to resource button*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.00.03-am-1896x892.png)
*I reviewed the Web App overview and clicked on the https://haddley-java.azurewebsites.net link*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.00.34-am-1896x291.png)
*I reviewed the Azure deployed application*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.01.10-am-1894x500.png)
*I returned to the GitHub repository and reviewed the GitHub Actions workflow history*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.01.36-am-1896x892.png)
*I reviewed the workflow summary*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.03.13-am-1897x1208.png)
*I reviewed the workflow file*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.04.41-am-1602x791.png)
*I updated the source code adding a home page*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.05.06-am-1604x789.png)
*I ran the updated code locally*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.05.25-am-1895x173.png)
*I accessed the home page at http://localhost:8080*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.06.06-am-1604x708.png)
*I commited the update (to the main branch)*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.06.29-am-1609x709.png)
*I pulled changes from the GitHub repository*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.06.42-am-1607x709.png)
*I pushed my change to GitHub*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.06.53-am-1602x708.png)
*There were no conflicts/issues*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.07.15-am-1899x595.png)
*I returned to GitHub and saw that the Merge branch workflow had started*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.08.40-am-1898x1208.png)
*The Merge branch workflow completed with no errors*

![](/assets/images/spring-boot-2/screenshot-2023-10-26-at-11.09.30-am-1896x165.png)
*I navigated to https://haddley-java.azurewebsites.net to view the new home page*
- [How to deploy your Spring Boot app to Azure App Service with GitHub Actions](https://www.youtube.com/watch?v=CPsI1KnVSOM)