---
type: post
slug: powerappswithrest
title: "A Power Apps Custom Connector"
date: "2021-06-27"
builds_on: []
topics: [power-apps-connectors, rest-api-development, openapi-specifications, asp-net-core]
tools: [GitHub, Visual Studio Code, ASP.NET Core, Swagger, Azure, API Transformer]
status: current
checked: "2026-11-06"
source_hash: "e00eccf2d64a"
generated_by: gemma4:12b
---

**Summary.** I explain how to build a custom connector for Power Apps by creating a REST API. I demonstrate the process of developing the API, testing the endpoints, and converting the OpenAPI description for use in the Power Platform.

## What I did
- I created a GitHub Repository for the REST API code.
- I generated and configured a new ASP.NET Core Web API project.
- I tested the GET, POST, PUT, and DELETE actions using Swagger.
- I exported and transformed the API description into OpenAPI version 2 format.
- I imported the final API description to create the connector.

## Claims
- I used a GitHub Repository to host the source code.
  > "I created a GitHub Repository for the REST API code."
- I enabled Swagger for production use in Azure.
  > "I commented out the if (env.IsDevelopment()) condition to enable Swagger in production (Azure)."
- The Book class contains the id and title properties.
  > "The Book class includes id and title properties."
- The BookController handles all standard CRUD actions.
  > "The BookController class handles GET, POST, PUT, and DELETE actions."
- I exported the API description in OpenAPI version 3 format.
  > "*I exported the API description (OpenAPI version 3 format)*"
- I imported the final description in OpenAPI version 2 format.
  > "*I imported the API description (OpenAPI version 2)*"

## Outcome
I built a functional REST API and converted it into a Power Apps custom connector. This allows Power Apps to interact with the Book data via the OpenAPI specification.

## Caveats
The post does not show the specific configuration steps within the Power Platform portal after the import.
