---
title: ".NET Core (Part 1)"
description: "A comprehensive guide covering .net core (part 1)"
date: "2025-09-20"
category: ".NET"
image: "/assets/images/dotnet core part1/hero.png"
tags: ["react","javascript","dotnet","java","ai"]
---

# .NET Core (Part 1)

## Creating a REST API Service using Microsoft's cross-platform framework.

![](/assets/images/dotnet core part1/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Creating a REST project using Dotnet Command Line Interface (CLI)

$ dotnet new webapi
$ dotnet new gitignore
$ dotnet run

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-3.10.16-pm-1482x960.png)
*Example Controller*


## Creating a Book class

$ code .
Add Book class


## Books REST Controller

Add BooksController class


## dotnet run

$ dotnet run

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-3.55.12-pm-1836x802.png)
*https://localhost:5001/books*

![](/assets/images/dotnet core part1/screen-shot-2021-04-06-at-11.19.46-am-1836x873.png)
*https://localhost:5001/books/1788395549*

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-4.13.17-pm-1836x809.png)
*https://localhost:5001/books/1234567890*


## Swagger

Notice that by default Swagger is available.

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-4.18.49-pm-1834x1328.png)
*https://localhost:5001/swagger/index.html*


## Startup

Support for Swagger is added in the project's Startup.cs file


## Static files

Static files can be added to a wwwroot folder in a Dotnet Core webapi project.

The static files can be image files, html files and javascript files.

To enable the static files add "app.UseStaticFiles();" to Startup.cs as shown below.

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-4.33.18-pm-644x302.png)
*app.UseStaticFiles()*


## React client

The static files can be a React app that calls the REST API exposed by the (same) Dotnet Core project.

![](/assets/images/dotnet core part1/screen-shot-2021-04-11-at-4.45.21-pm-1836x1255.png)
*Running React/Dotnet Core app*


## haddley_power_app_api

The BooksController code can be extended to support POST, PUT and DELETE actions

![](/assets/images/dotnet core part1/screen-shot-2021-06-19-at-2.57.45-pm-1836x1178.png)
*haddley_power_app_api*
