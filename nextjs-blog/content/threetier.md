---
title: "Blazor WASM API SQL Server Stored Procedure"
description: "A comprehensive guide covering blazor wasm api sql server stored procedure"
date: "2025-09-20"
category: "Development"
image: "/assets/images/threetier/hero.png"
tags: ["dotnet","sql","database","ai","asp.net"]
---

# Blazor WASM API SQL Server Stored Procedure

## Three Tiers

![](/assets/images/threetier/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Three Tiers

Visual Studio includes an ASP.NET Core Single Page Application (SPA) template that supports Blazor WASM.

Here I demonstrate how Blazer Web Assembly, ASP.NET Core and Microsoft SQL Server can be configured to work together.


## ChatGPT

**How do I create an ASP.NET application that connects to SQL Server and has a Blazor Web Assembly UI using Individual authentication?**

To create an ASP.NET application that connects to SQL Server and has a Blazor Web Assembly UI using Individual authentication, you can follow these steps:

Create a new ASP.NET Core Web Application project in Visual Studio.
Choose Blazor WebAssembly as the project template.
Choose Individual Accounts as the authentication type.
Choose the ASP.NET Core hosted option, which will create a separate server project and a client-side Blazor WebAssembly project.
Click Create to create the project.
In the server project, open the appsettings.json file and add a connection string to your SQL Server database.
Install the Microsoft.EntityFrameworkCore.SqlServer NuGet package in the server project.
Create a DbContext class that inherits from Microsoft.EntityFrameworkCore.DbContext and represents your database schema.
In the DbContext class, add a DbSet property for each entity you want to work with.
In the ConfigureServices method of the server's Startup.cs file, add a call to AddDbContext to register your DbContext with the application's dependency injection system.
In the client-side Blazor project, create a service class that uses HttpClient to call the server-side API methods you want to use.
Use dependency injection to inject the service class into your Blazor components, and call its methods as needed.

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.33.18-pm-1430x872.png)
*Visual Studio 2022 for Mac (ASP.NET Core is cross platform)*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.33.48-pm-1536x1086.png)
*Blazor WebAssembly App template*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.34.12-pm-1536x1090.png)
*Individual Authentication (local app.db database)*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.34.35-pm-1536x1085.png)
*I named the project/solution haddley_blazor_api (notice that in names the ASP.NET Core code generators seem to prefer underscores over dashes)*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.35.13-pm-1536x841.png)
*I reviewed the generated projects*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.35.48-pm-1536x926.png)
*I ran the ASP.NET Core web site*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.35.58-pm-1536x926.png)
*I created an account and logged in*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.37.36-pm-1536x328.png)
*dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 6.0.15*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.48.59-pm-1536x230.png)
*dotnet ef dbcontext scaffold "server=192.168.0.3;initial catalog=ToDo;user id=sa;password=Passw0rd123" Microsoft.EntityFrameworkCore.SqlServer -o Models --data-annotations --force*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.49.13-pm-1536x492.png)
*I reviewed the entity framework classes generated from the database schema*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.55.33-pm-1536x956.png)
*I selected the API Controller with actions using Entity Framework*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.55.58-pm-1484x706.png)
*I created a ToControl to handle requests to /api/ToDo*

![](/assets/images/threetier/screen-shot-2023-03-25-at-3.59.20-pm-1536x790.png)
*I reviewed the generated controller code*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.00.31-pm-1536x287.png)
*I tested the ToDo controller by navigating to /api/ToDo.*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.03.07-pm-630x238.png)
*I moved the Item.cs file to the Shared project (so that it could be used by the Server and the Client projects.*

![](/assets/images/threetier/screen-shot-2023-03-25-at-5.33.26-pm-1536x649.png)
*builder.Services.AddDbContext(options => options.UseSqlServer("server=192.168.0.3;initial catalog=ToDo;user id=sa;password=Passw0rd123"));*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.17.07-pm-1536x593.png)
*I was able to login*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.17.27-pm-1536x384.png)
*I was able to view the todo items using the new Razor page.*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.18.52-pm-1536x268.png)
*I updated the application's navigation menu*

![](/assets/images/threetier/screen-shot-2023-03-25-at-5.36.49-pm-1536x482.png)
*I created a stored procedure to return the to do items*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.45.22-pm-1536x278.png)
*I updated the API implementation to use the stored procedure*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.45.49-pm-1536x348.png)
*I reviewed the To Do page (populated using the stored procedure)*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.53.15-pm-1536x670.png)
*I updated the stored procedure to prefix each description with "Urgent "*

![](/assets/images/threetier/screen-shot-2023-03-25-at-4.53.26-pm-1536x503.png)
*I refreshed the To Do page*
