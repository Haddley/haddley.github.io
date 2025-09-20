---
title: ".NET Core (Part 2 deleted)"
description: "A comprehensive guide covering .net core (part 2 deleted)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dotnet core part2 deleted.png"
tags: ["dotnet","c#","ai","git"]
---

# .NET Core (Part 2 deleted)

.NET Core (Part 2) Creating a VB.NET Web App using Microsoft's cross-platform framework. Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication Creating a VB.NET Web App project using Dotnet Command Line Interface (CLI) - Sort of I am able to develop ASP.NET Core applications with the VB.NET language. However, creating a VB.NET ASP.NET Core application is not support by the dotnet command line app. $ dotnet new web -lang VB -o haddley-web (fails) $ dotnet new web -lang C# -o haddley-web (works) dotnet new web -lang VB -o haddley-web (fails) dotnet new web -lang C# -o haddley-web (works) VB.NET console app As a workaround I can generate a VB.NET console application project and convert it to a VB.NET Web App project. $ dotnet new console -lang VB -o haddley-console $ cd haddley-console $ dotnet new gitignore $ dotnet run dotnet new console -lang VB -o haddley-console dotnet run (the generated console application) I updated the .vbproj file I updated the Program.vb code from"Console.WriteLine(...)" to "WebApplication.CreateBuilder(...)..." dotnet run (the Web App) References How to create an ASP.NET Core Minimal API with Visual Basic .NET .NET Core (Part 1) .NET Core (Part 3)
