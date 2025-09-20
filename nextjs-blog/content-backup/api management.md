---
title: "Power Apps, Custom Connectors and API Management"
description: "A comprehensive guide covering power apps, custom connectors and api management"
date: "2025-09-20"
category: "Development"
image: "/assets/images/api management.png"
tags: ["azure","ai"]
---

# Power Apps, Custom Connectors and API Management

Power Apps (Part 4) Power Apps, Custom Connectors and API Management Microsoft_Office_logo by Microsoft is licensed under CC Azure API Management Service The API Management Service controls how api services are exposed to employees by applying authentication, authorization, and usage limits. Navigate to Azure API Management services page Create haddley-api haddley-api will be created haddley-api deployment in progress haddley-api deployment complete haddley-api overview Existing Web Service API (no authentication) Existing API includes Swagger Url to swagger.json definition Add API to API Management Provide url to swagger.json Review API details Test /Book GET Test is successful Create Power Connector (for Power Apps) Provide connector name New custom connector has been added Edit the connector to review Notice that an API Key/Subscription is required + New connection (based on the Custom Connector) A Subscription key has to be provided Using Chrome to call the API Management service without passing the Subscription key Using Postman to call the API Management service without passing the Subscription key Notice that a Subscription key was provided in the API Management test page Using Postman to call the API Management service providing the Subscription key The same Subscription key value can be copied from the API Management Subscriptions page Enter the Subscription key The new connection has been created Create a test Power App Blank Power App Add a data source The connector has been added Add a button and configure the "OnSelect" handler OnSelect books will be retrieved and stored in a "colBooks" collection Preview the app Press the Button Navigate to Collections to review the result Add a gallery control and set items property to colBooks collection update the gallery control to display book titles and isbn (numbers) Add a new subscription Copy the subscription key Edit the connection Update the subscription key References How to import APIs to Power Apps using Azure API Management
