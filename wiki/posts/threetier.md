---
type: post
slug: threetier
title: "Blazor WASM API SQL Server Stored Procedure"
date: "2023-03-25"
builds_on: []
topics: [blazor-webassembly, asp-net-core, entity-framework-core, sql-server-stored-procedures, three-tier-architecture]
tools: [Visual Studio, Blazor WebAssembly, ASP.NET Core, Microsoft SQL Server, Entity Framework Core, HttpClient]
status: current
checked: "2026-11-06"
source_hash: "55e231bb67e2"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to integrate Blazor WebAssembly, ASP.NET Core, and Microsoft SQL Server into a three-tier architecture. I show how to connect a client-side UI to a server-side API that utilizes stored procedures.

## What I did
- I created a hosted Blazor WebAssembly project with Individual authentication.
- I configured the server project with Entity Framework Core and a SQL Server connection.
- I moved shared models to a shared project for use by both client and server.
- I implemented a stored procedure to fetch data and updated the API to use it.
- I verified the data display on a Razor page.

## Claims
- I used the ASP.NET Core SPA template to show the interaction between the three technologies.
  > "I used the Visual Studio ASP.NET Core SPA template to demonstrate how Blazor WebAssembly, ASP.NET Core, and Microsoft SQL Server work together."
- I chose the hosted option to create separate server and client projects.
  > "Choose the ASP.NET Core hosted option, which will create a separate server project and a client-side Blazor WebAssembly project."
- I moved the Item.cs file to a shared project so both projects could access it.
  > "*I moved the Item.cs file to the Shared project (so that it could be used by the Server and the Client projects.*"
- I created a stored procedure to return the to do items.
  > "*I created a stored procedure to return the to do items*"
- I updated the API implementation to use the stored procedure.
  > "*I updated the API implementation to use the stored procedure*"
- I verified the page was populated using the stored procedure.
  > "*I reviewed the To Do page (populated using the stored procedure)*"

## Outcome
I built a functional three-tier application where a Blazor WebAssembly frontend communicates with an ASP.NET Core backend that executes SQL Server stored procedures.

## Caveats
The post does not detail the specific SQL syntax used to create the stored procedure.
