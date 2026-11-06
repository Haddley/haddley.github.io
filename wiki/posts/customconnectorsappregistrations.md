---
type: post
slug: customconnectorsappregistrations
title: "Power Apps, Custom Connectors and Application Registrations"
date: "2021-08-09"
builds_on: []
topics: [power-apps, custom-connectors, azure-active-directory, oauth-2-0, service-principals]
tools: [Power Apps, Azure Active Directory, MSAL.js, Azure API Management]
status: current
checked: "2026-11-05"
source_hash: "6e4e655c0550"
generated_by: gemma4:12b
---

**Summary.** I explain how to configure a Power Apps Custom Connector using Azure Active Directory. I demonstrate the process of setting up application registrations, managing permissions, and connecting to a protected web API.

## What I did
- I created a resource application registration for the API service.
- I created a client application registration for the Power Apps Custom Connector.
- I configured the Custom Connector with OAuth 2.0 authentication.
- I built a Power App to call the API and display the results in a gallery.

## Claims
- OAuth 2.0 allows an application to access a resource on behalf of a user without storing their password.
  > "In OAuth 2 an application accesses a resource on behalf of a user."
- Only three specific values are required to create a Power Apps Custom Connector.
  > "Only three values are needed to create a Power Apps Custom Connector."
- I created a client application registration specifically for the Power Apps Custom Connector.
  > "Instead I created a client application registration for the Power Apps Custom Connector."
- The Identity Connection requires a Premium PowerApps license.
  > "*I noticed that using the Identity Connection requires a Premium PowerApps license*"
- The service principal defines what the app can do and who can access it in a specific tenant.
  > "The service principal defines what the app can do in the specific tenant, who can access the app, and what resources the app can access."
- I added a button to the app screen and used the ClearCollect operation to call the API.
  > "*I added a button to the app screen and used the ClearCollect operation to call the API*"

## Outcome
I built a Power App that successfully calls a protected web API using a custom connector. I also demonstrated how to manage the underlying Azure application registrations.

## Caveats
The post does not show the specific internal configuration of the API service code beyond the inclusion of the tenantID and clientID.
