---
type: post
slug: reactandasp.net
title: "React and ASP.NET Core"
date: "2023-03-22"
builds_on: []
topics: [asp-net-core, react-frontend, spa-templates, sqlite-database]
tools: [Visual Studio, ASP.NET Core, React, sqlitebrowser, dotnet CLI]
status: current
checked: "2026-11-06"
source_hash: "4ac619e91d7c"
generated_by: gemma4:12b
---

**Summary.** I explain how to create a project that combines an ASP.NET Core backend with a React frontend. I demonstrate the use of the official Visual Studio template and the command line to set up the environment.

## What I did
- I used the ASP.NET Core React SPA template.
- I selected the React.js template and the ASP.NET Core 6 framework.
- I configured the project name and reviewed the Program.cs file.
- I updated the database using sqlitebrowser to enable login.
- I verified the network calls in the browser.

## Claims
- I used a specific Visual Studio template to combine both technologies.
  > "I used Visual Studio's ASP.NET Core React SPA template to create a project with an ASP.NET Core backend and a React frontend."
- I used the command line to create the project.
  > "**$ dotnet new react -n ProjectName**"
- I chose the cross platform ASP.NET Core 6 framework.
  > "*I selected the (cross platform) ASP.NET Core 6 framework*"
- The template includes a local user database.
  > "The template includes a local user database."
- I used sqlitebrowser to update the database for login.
  > "*I used sqlitebrowser to update the EmailConfirmed column in the AspNetUsers table so that I could login.*"
- I checked the Network tab to see the call.
  > "*I reviewed the Network tab to see the call*"

## Outcome
I built a project with an ASP.NET Core backend and a React frontend. I successfully configured the database to allow user login.

## Caveats
The post does not show the specific internal logic of the React components.
