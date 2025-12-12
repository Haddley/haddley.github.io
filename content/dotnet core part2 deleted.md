---
title: ".NET Core (Part 2 deleted)"
description: "Creating a VB.NET Web App using Microsoft's cross-platform framework."
date: "2025-09-20"
categories: [".NET","AI","Angular","Mobile","TypeScript"]
image: "/assets/images/dotnet-core-part2-deleted/hero.png"
tags: ["dotnet","c#","ai","git","asp.net"]
hidden: "true"
slug: "dotnet core part2 deleted"
---



I am able to develop ASP.NET Core applications with the VB.NET language. However, creating a VB.NET ASP.NET Core application is not support by the dotnet command line app.

$ dotnet new web -lang VB -o haddley-web (fails)

$ dotnet new web -lang C# -o haddley-web (works)

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.05.08-pm-1148x386.png)
*dotnet new web -lang VB -o haddley-web (fails)*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.05.47-pm-1144x738.png)
*dotnet new web -lang C# -o haddley-web (works)*


## VB.NET console app

As a workaround I can generate a VB.NET console application project and convert it to a VB.NET Web App project.

$ dotnet new console -lang VB -o haddley-console
$ cd haddley-console
$ dotnet new gitignore
$ dotnet run

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.21.39-pm-1138x488.png)
*dotnet new console -lang VB -o haddley-console*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.25.13-pm-1140x316.png)
*dotnet run (the generated console application)*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.34.56-pm-1536x225.png)
*I updated the .vbproj file*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.35.58-pm-1536x452.png)
*I updated the Program.vb code from"Console.WriteLine(...)"*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.36.42-pm-1536x477.png)
*to "WebApplication.CreateBuilder(...)..."*

![](/assets/images/dotnet-core-part2-deleted/screen-shot-2023-03-15-at-2.38.17-pm-1476x522.png)
*dotnet run (the Web App)*
## References

- [How to create an ASP.NET Core Minimal API with Visual Basic .NET](https://swimburger.net/blog/dotnet/create-an-aspdotnet-core-minimal-api-with-vbdotnet)

