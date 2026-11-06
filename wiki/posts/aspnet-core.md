---
type: post
slug: aspnet-core
title: "ASP.NET Core"
date: "2023-03-21"
builds_on: []
topics: [asp-net-core, razor-pages, entity-framework, scaffolding]
tools: [Visual Studio 2022, ASP.NET Core, Entity Framework, dotnet-ef]
status: current
checked: "2026-11-05"
source_hash: "013a9c4075fd"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build a todo application using Razor Pages and ASP.NET Core. I show the process of scaffolding entities and configuring the database connection.

## What I did
- I created a new ASP.NET Core project using Visual Studio 2022.
- I used Entity Framework to generate classes from a database.
- I scaffolded the Razor Pages for the todo items.
- I configured the connection string in the application settings.

## Claims
- Razor Pages is the preferred method for creating form-based applications.
  > "Razor Pages is the preferred way to create page or form-based apps in ASP.NET Core."
- I used the .NET 6.0 framework for the project.
  > "*I selected the .NET 6.0 framework*"
- I encountered and resolved an issue with the CodeGeneration.Design package.
  > "I reinstalled and tried again.*"
- I updated the PageModel to include a message property.
  > "*I updated the PageModel to include a message property set in the OnGet() method*"
- I used the dotnet ef command to generate the entity framework classes.
  > "*I ran the dotnet ef dbcontext scaffold... command to generate the entity framework related classes.*"
- I updated the OnModelCreating method to remove the hardcoded connection string.
  > "*I updated the ToDoContext class's OnModelCreating() method (removing the hardcoded connection string).*"

## Outcome
I built a functional todo application with a database backend. I successfully integrated Entity Framework with Razor Pages.

## Caveats
The post does not show the specific SQL commands used to create the initial database schema.
