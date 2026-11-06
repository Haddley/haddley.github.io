---
type: post
slug: dotnet-core-part1
title: ".NET Core (Part 1)"
date: "2021-04-10"
part: 1
builds_on: []
topics: [rest-api, dotnet-core, swagger-documentation, static-files]
tools: [.NET Core, Swagger, React, Microsoft]
status: current
checked: "2026-11-05"
source_hash: "953bc71df8ad"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a REST API service using the Microsoft cross-platform framework. I explore the implementation of controllers, Swagger integration, and the hosting of static files.

## What I did
- I added the BooksController class.
- I integrated Swagger support into the Startup.cs file.
- I configured the project to serve static files from a wwwroot folder.
- I extended the controller to support POST, PUT, and DELETE actions.

## Claims
- I included a controller for managing books.
  > "I added the BooksController class."
- Swagger is available by default in the project.
  > "I noticed that by default Swagger is available."
- I enabled the static files middleware.
  > "*I added app.UseStaticFiles()*"
- The project supports multiple HTTP methods beyond GET.
  > "I extended the BooksController code to support POST, PUT and DELETE actions."

## Outcome
I built a functional REST API service that supports multiple HTTP actions and serves static content.

## Caveats
The post does not detail the specific internal logic of the React application.
