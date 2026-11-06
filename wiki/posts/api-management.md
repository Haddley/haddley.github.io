---
type: post
slug: api-management
title: "Power Apps, Custom Connectors and API Management"
date: "2021-08-02"
builds_on: []
topics: [api-management, custom-connectors, power-apps-integration, api-authentication]
tools: [Azure API Management Service, Power Apps, Swagger, Postman, Chrome]
status: current
checked: "2026-11-05"
source_hash: "563c42d2873f"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use Azure API Management Service to secure and expose web services to Power Apps. I show the process of creating a custom connector and authenticating the connection using subscription keys.

## What I did
- I configured the API Management Service to control access and usage limits.
- I imported a web service using a swagger.json definition.
- I created a Power Connector and established a new connection.
- I verified the API calls using Postman with and without subscription keys.
- I built a gallery control in Power Apps to display the retrieved data.

## Claims
- I used API Management to enforce authentication and usage limits.
  > "I used the API Management Service to control how API services are exposed to employees by applying authentication, authorization, and usage limits."
- I created a Power Connector for use in Power Apps.
  > "*I created a Power Connector (for Power Apps)*"
- I confirmed that the service required a subscription key for access.
  > "*I noticed that an API key/subscription was required*"
- I successfully called the service using the subscription key in Postman.
  > "*I used Postman to call the API Management service with the subscription key*"
- I displayed the book titles and ISBN numbers in a gallery.
  > "*I updated the gallery control to display book titles and ISBN numbers*"

## Outcome
I built a Power Apps gallery that displays book data through a secured Azure API Management gateway. I successfully integrated a custom connector with a validated subscription key.

## Caveats
The post does not detail the specific internal logic of the backend web service.
