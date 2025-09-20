---
title: ".NET Core (Part 1)"
description: "A comprehensive guide covering .net core (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dotnet core part1.png"
tags: ["react","javascript","dotnet","java","ai"]
---

# .NET Core (Part 1)

.NET Core (Part 1) Creating a REST API Service using Microsoft's cross-platform framework. Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication Creating a REST project using Dotnet Command Line Interface (CLI) $ dotnet new webapi $ dotnet new gitignore $ dotnet run Example Controller Creating a Book class $ code . Add Book class Book.cs Books REST Controller Add BooksController class BooksController.cs dotnet run $ dotnet run https://localhost:5001/books https://localhost:5001/books/1788395549 https://localhost:5001/books/1234567890 Swagger Notice that by default Swagger is available. https://localhost:5001/swagger/index.html Startup Support for Swagger is added in the project's Startup.cs file Startup.cs Static files Static files can be added to a wwwroot folder in a Dotnet Core webapi project. The static files can be image files, html files and javascript files. To enable the static files add "app.UseStaticFiles();" to Startup.cs as shown below. app.UseStaticFiles() React client The static files can be a React app that calls the REST API exposed by the (same) Dotnet Core project. App.js index.html React App You need to enable JavaScript to run this app.
