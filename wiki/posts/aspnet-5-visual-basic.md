---
type: post
slug: aspnet-5-visual-basic
title: "ASP.NET 5 Visual Basic"
date: "2023-03-18"
builds_on: []
topics: [asp-net-mvc, entity-framework, sql-server, visual-basic-net]
tools: [Visual Studio 2019, ASP.NET MVC 5, Docker, SQL Server, Azure Data Studio]
status: current
checked: "2026-11-05"
source_hash: "dfb39c43e769"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to generate Context and Entity classes from an existing database using ASP.NET MVC 5 and Visual Basic. I show the process of creating a todo application and using Entity Framework to map database tables to code.

## What I did
- I created a Model-View-Controller web application.
- I created a Tasks table in a SQL Server database.
- I generated the ToDoContext using the ADO.NET Entity Data Model.
- I used the Scaffolded Item feature to generate the controller and view code.
- I verified the data by updating and viewing the records in Azure Data Studio.

## Claims
- I used the MVC 5 framework to build the application.
  > "ASP.NET Model-View-Controller 5 was released in 2009 (based on Windows Server and .NET Framework and Supported in Visual Studio 2019)"
- I created a database table with specific columns for the task data.
  > "*I created a Tasks table (with an automatically assigned ID column, a description column and a done boolean column)*"
- I saved the connection details in the Web.Config file.
  > "*I asked Visual Studio to save the connection details in the Web.Config file (notice that the Web.Config file is never returned to a client browser)*"
- I used the Scaffolded Item feature to generate the controller and view.
  > "*I selected the MVC 5 Controller with view, using Entity Framework option*"
- I verified the database content using a separate tool.
  > "*I reviewed the database table using the Azure Data Studio application*"

## Outcome
I built a functional todo application that uses Entity Framework to manage data from a SQL Server database.

## Caveats
The post does not show the internal configuration of the Docker container environment.
