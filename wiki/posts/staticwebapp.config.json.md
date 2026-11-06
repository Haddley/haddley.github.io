---
type: post
slug: staticwebapp.config.json
title: "staticwebapp.config.json"
date: "2024-03-10"
builds_on: []
topics: [azure-static-web-apps, identity-management, environment-variables, web-configuration]
tools: [Azure Static Web Apps, Azure Active Directory, JSON]
status: current
checked: "2026-11-06"
source_hash: "7b12eadd46fd"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to configure a static website with authentication. I show the process of setting up the configuration file and integrating Azure Active Directory.

## What I did
- I created the core web files.
- I configured the static web application settings.
- I set up the Azure Resource Group and application.
- I configured the environment variables for authentication.
- I upgraded the hosting plan and verified the URL.

## Claims
- I created the configuration file for the static web app.
  > "I created a staticwebapp.config.json file.*"
- I registered a new application in Azure Active Directory.
  > "*I created a new Azure Active Directory/Entra ID App Registration*"
- I configured the client ID as an environment variable.
  > "*I created an application Environment Variable called AZURE_CLIENT_ID and pasted in the value*"
- I upgraded the hosting plan for the application.
  > "*I upgraded the Static web app's hosting plan*"

## Outcome
I built a website using Azure Static Web Apps and authenticated it with Azure Active Directory.

## Caveats
The post does not show the specific internal logic of the authentication handshake.
