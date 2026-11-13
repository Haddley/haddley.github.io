---
type: post
slug: aspnet-5-cs
title: "ASP.NET 5 C#"
date: "2023-03-19"
builds_on: []
topics: [asp-net-mvc, entity-framework, database-scaffolding, c-sharp]
tools: [Visual Studio 2019, ASP.NET MVC 5, ADO.NET Entity Data Model, Entity Framework]
status: current
checked: "2026-11-05"
source_hash: "0ccc0545a2f6"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to generate Context and Entity classes from an existing database using ASP.NET MVC 5. I show the process of creating a todo application and scaffolding controllers from a data model.

## What I did
- I created a Model-View-Controller web application.
- I added a view page and a controller.
- I created a ToDoContext using the ADO.NET Entity Data Model.
- I used the Scaffolded Item feature to generate a controller and view.

## Claims
- I used the MVC 5 framework to build the application.
  > "ASP.NET Model-View-Controller 5 was released in 2009 (based on Windows Server and .NET Framework, supported in Visual Studio 2019)."
- I created a specific data context named ToDoContext.
  > "*I entered the name ToDoContext and selected ADO.NET Entity Data Model*"
- I saved the connection details in the Web.Config file.
  > "*I asked Visual Studio to save the connection details in the Web.Config file (notice that the Web.Config file is never returned to a client browser)*"
- I used the Entity Framework option to scaffold the controller.
  > "*I selected the MVC 5 Controller with view, using Entity Framework option*"

## Outcome
I built a todo application by generating context and entity classes from an existing database.

## Caveats
The post does not show the specific internal configuration of the database schema.
