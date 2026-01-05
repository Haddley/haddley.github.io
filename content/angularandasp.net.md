---
title: "Angular and ASP.NET Core"
description: "Single Page Application (SPA) templates"
date: "2023-03-24"
categories: [".NET","Angular","TypeScript"]
tags: ""
slug: "angularandasp.net"
image: "/assets/images/angular-full-color-logo.svg"
---


Visual Studio includes ASP.NET Core Single Page Application (SPA) templates that support Angular and React.

I review the Angular template here.


## ChatGPT

**I want to create a ASP.NET Core Angular project**

To create an ASP.NET Core Angular project, follow these steps:

Open Visual Studio and click on "Create a new project."
Select "ASP.NET Core Web Application" and click "Next."
Name your project and choose a location to save it. Then click "Create."
In the next screen, choose "Angular" for the front-end framework and select the latest version of .NET Core. Then click "Create."
Visual Studio will create a new project with the necessary files and folders for an Angular application inside an ASP.NET Core project.
You can now start developing your application by modifying the files in the "ClientApp" folder, which contains the Angular application. You can also modify the ASP.NET Core server-side code in the other folders and files.

Note: If you prefer to use the command line, you can create a new ASP.NET Core Angular project using the following command:

**$ dotnet new angular -n ProjectName**

![](/assets/images/angularandasp.net/screen-shot-2023-03-22-at-9.16.36-am-1440x880.png)
*I used Visual Studio 2022 for Mac*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.07.37-pm-1536x1089.png)
*I selected the Angular template*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.08.29-pm-1536x1088.png)
*I selected the (cross platform) ASP.NET Core 6 framework*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.09.06-pm-1536x1088.png)
*I provided a solution/project name*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.10.07-pm-1536x1125.png)
*The template includes client and server-side code*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.11.50-pm-1836x946.png)
*I ran the project.*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.14.10-pm-1836x1124.png)
*I reviewed the Program.cs file. The template includes a local user database. I registered as a user.*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.15.11-pm-1836x1087.png)
*I was able to login*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.18.50-pm-1836x863.png)
*main.ts specifies that AppModule is the bootstrap Module*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.19.13-pm-1836x862.png)
*app.module.ts declares {AppComponent, NavMenuComponent, ...} and the bootstrap value is set to AppComponent*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.17.45-pm-1836x867.png)
*app.component.ts depends on the app.component.html template*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.24.04-pm-1836x308.png)
*The app.component.html template includes a Navigation menu.*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.55.07-pm-1836x645.png)
*The Fetch data route has canActivate set to AuthorizeGuard*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-8.00.56-pm-1836x645.png)
*The WeatherForecastController includes [Authorize] decorator*

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.38.35-pm-1836x675.png)
*The Navigation Menu component include a reference to a Logon component*


## Update

As an experiment I updated the Angular code so the "Fetch data" menu item did not require a login

![](/assets/images/angularandasp.net/screen-shot-2023-03-24-at-7.58.07-pm-1836x920.png)
*Fetch data page is unable to fetch data from the WeatherForecast service if user is not logged in.*