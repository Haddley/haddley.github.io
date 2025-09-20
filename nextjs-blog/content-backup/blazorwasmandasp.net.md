---
title: "Blazor WASM and ASP.NET Core"
description: "A comprehensive guide covering blazor wasm and asp.net core"
date: "2025-09-20"
category: "Development"
image: "/assets/images/blazorwasmandasp.net.png"
tags: ["dotnet","c#","database","ai"]
---

# Blazor WASM and ASP.NET Core

Blazor WASM and ASP.NET Core An ASP.NET Core backend and a Blazor Web Assembly frontend. Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication Single Page Application (SPA) templates Visual Studio includes an ASP.NET Core Single Page Application (SPA) templates that supports Blazor WASM. I review the Blazor WASM template here. ChatGPT I want to create a Blazor WebAssembly project Great! Here's a step-by-step guide to create a Blazor WebAssembly project: Open Visual Studio. Click on "Create a new project". Select "Blazor App". Choose a name for your project, and then click "Create". In the next window, choose "Blazor WebAssembly App" as the project type. Select the "ASP.NET Core hosted" option, which will create a project with a backend API. Choose the authentication type you want to use. You can select "No authentication" if you don't need any authentication. Click "Create" to create your project. Now, Visual Studio will create a Blazor WebAssembly project with a backend API. You can start coding your application in the client-side Blazor code, and use the backend API to handle data and other operations. Note: If you prefer to use the command line, you can create a new Blazor WebAssembly project using the following command: $ dotnet new blazorwasm -n ProjectName I used Visual Studio 2022 for Mac I selected the Blazer WebAssembly template I selected the (cross platform) ASP.NET Core 6 framework I provided a solution/project name The template includes client and server-side C# code Solution did not run exactly as generated clientId fix I ran the project successfully I reviewed the Program.cs file. The template includes a local user database. I registered as a user. I was able to login The Fetch data Blazer Web Assembly component returns data provided by ASP.NET Core controller
