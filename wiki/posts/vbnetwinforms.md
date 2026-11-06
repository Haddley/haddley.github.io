---
type: post
slug: vbnetwinforms
title: "VB.NET WinForms and ASP.NET Core API"
date: "2023-03-27"
builds_on: []
topics: [vb-net-winforms, asp-net-core-api, json-deserialization, http-client-requests]
tools: [Visual Studio, Postman, curl, Newtonsoft.Json, Swagger]
status: current
checked: "2026-11-06"
source_hash: "d8f9e3285f0c"
generated_by: gemma4:12b
---

**Summary.** I explain how to connect a VB.NET WinForms application to an ASP.NET Core API. I demonstrate the process of building the API, testing it, and consuming the data within a desktop interface.

## What I did
- I created an ASP.NET Core Web API project.
- I tested the API endpoints using the Swagger interface.
- I developed a VB.NET Windows Forms application.
- I linked the WinForms project to the API project.
- I implemented the logic to call the API and display the results.

## Claims
- You can use Visual Studio to create the API project.
  > "You can create an ASP.NET Core Web API project using Visual Studio 2019 or newer."
- Postman and curl are tools for testing endpoints.
  > "You can use tools like Postman or curl to test the endpoints and verify that they return the expected data."
- The HttpClient class handles the requests to the API.
  > "Use the HttpClient class in your VB.NET Forms app to make requests to the API."
- Newtonsoft.Json can deserialize the JSON responses.
  > "You can deserialize JSON responses into objects using libraries such as Newtonsoft.Json."
- I used the Swagger User Interface to test the API.
  > "*I used the Swagger User Interface to test the API*"
- I added a button and two labels to the WinForm screen.
  > "*I added a button and two labels to the VB.NET WinForm screen and VB.NET code to call the API.*"

## Outcome
I built a functional VB.NET WinForms application that retrieves and displays data from an ASP.NET Core API.

## Caveats
The specific implementation may vary depending on your requirements.
