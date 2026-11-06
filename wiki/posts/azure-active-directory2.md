---
type: post
slug: azure-active-directory2
title: "Azure Active Directory (Part 2)"
date: "2021-04-17"
part: 2
builds_on: []
topics: [azure-active-directory, ms-identity-library, cors-configuration, single-page-applications]
tools: [Microsoft Azure, Visual Studio Code, Express, MSAL]
status: current
checked: "2026-11-05"
source_hash: "4c45036656a0"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to configure and connect a web application to Azure Active Directory using provided sample code. I walk through the configuration of both the service application and the client application to ensure successful authentication.

## What I did
- I downloaded and opened a fully configured code sample from GitHub.
- I configured the service application with the correct client ID, tenant ID, and audience.
- I configured the client application with the application ID, tenant information, and redirect URI.
- I updated the web API configuration to include the correct URI and scopes.
- I verified the authentication flow and the resulting API response.

## Claims
- Quickstart projects simplify the process of connecting to Azure resources.
  > "Quickstart projects make it easier to build applications that connect to Azure Active Directory, Microsoft Graph and other Azure resources."
- The sample code includes a specific configuration for the web API.
  > "I found the key Enter_the_Web_Api_Uri_Here and replaced the existing value with the coordinates of my web API (by default http://localhost:5000/api)."
- The application uses permissive headers to enable CORS.
  > "CORS is enabled using permissive headers."
- The API response includes the name of the logged in user.
  > "In the sample information from the req.authInfo property is returned as the result of the API call (including the logged in user's **name**)."
- The welcomeUser function updates the html page based on the login status.
  > "welcomeUser is defined in ui.js. welcomeUser uses document.getElementById and css classes to update the html page (showing if a user is logged in)."

## Outcome
I built a functional connection between a single page application and a web API using Azure Active Directory authentication.

## Caveats
The post does not show the specific internal logic of the MSAL library initialization.
