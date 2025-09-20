---
title: "Blazor WASM and ASP.NET Core"
description: "A comprehensive guide covering blazor wasm and asp.net core"
date: "2025-09-20"
category: ".NET"
image: "/assets/images/blazor-logo.png"
tags: ["dotnet","c#","database","ai","asp.net"]
---

# Blazor WASM and ASP.NET Core

## An ASP.NET Core backend and a Blazor Web Assembly frontend.

![](/assets/images/blazorwasmandasp.net/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Single Page Application (SPA) templates

Visual Studio includes an ASP.NET Core Single Page Application (SPA) templates that supports Blazor WASM.

I review the Blazor WASM template here.


## ChatGPT

**I want to create a Blazor WebAssembly project**

Great! Here's a step-by-step guide to create a Blazor WebAssembly project:

Open Visual Studio.
Click on "Create a new project".
Select "Blazor App".
Choose a name for your project, and then click "Create".
In the next window, choose "Blazor WebAssembly App" as the project type.
Select the "ASP.NET Core hosted" option, which will create a project with a backend API.
Choose the authentication type you want to use. You can select "No authentication" if you don't need any authentication.
Click "Create" to create your project.
Now, Visual Studio will create a Blazor WebAssembly project with a backend API. You can start coding your application in the client-side Blazor code, and use the backend API to handle data and other operations.

Note: If you prefer to use the command line, you can create a new Blazor WebAssembly project using the following command:

**$ dotnet new blazorwasm -n ProjectName**

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-22-at-9.16.36-am-1440x880.png)
*I used Visual Studio 2022 for Mac*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.36.56-am-1380x978.png)
*I selected the Blazer WebAssembly template*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.37.08-am-1800x1276.png)
*I selected the (cross platform) ASP.NET Core 6 framework*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.37.31-am-1794x1272.png)
*I provided a solution/project name*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.57.21-am-1836x1014.png)
*The template includes client and server-side C# code*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.58.50-am-1836x925.png)
*Solution did not run exactly as generated*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.59.14-am-1836x910.png)
*clientId fix*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.59.37-am-1836x1030.png)
*I ran the project successfully*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-11.59.54-am-1836x743.png)
*I reviewed the Program.cs file. The template includes a local user database.*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-12.06.17-pm-1836x704.png)
*I registered as a user.*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-12.06.28-pm-1836x651.png)
*I was able to login*

![](/assets/images/blazorwasmandasp.net/screen-shot-2023-03-25-at-12.06.35-pm-1836x674.png)
*The Fetch data Blazer Web Assembly component returns data provided by ASP.NET Core controller*
