---
type: post
slug: azurereactstaticweb-app
title: "Azure React Static Web App"
date: "2024-01-08"
builds_on: []
topics: [react-development, azure-hosting, github-integration, static-web-apps]
tools: [React, GitHub, Azure, Visual Studio Code, GitHub Desktop, Live Server]
status: current
checked: "2026-11-05"
source_hash: "21c22386d5f1"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build a React application and host it on Azure Static Web Apps. I walk through the process of local development, version control with GitHub, and deployment to the cloud.

## What I did
- I created a React application and tested it locally.
- I pushed the source code to a new GitHub repository.
- I configured a new Resource Group and Static Web App in the Azure portal.
- I linked the GitHub repository to Azure to automate the deployment.

## Claims
- I completed the full cycle of creation, testing, and deployment.
  > "I created a React app, tested it locally, pushed the code to GitHub and published to Azure."
- I used a personal account to access the Azure portal.
  > "*I logged onto https://portal.azure.com using my personal account*"
- I initialized a new repository using GitHub Desktop.
  > "*I opened GitHub Desktop and created a new repository*"
- I used the terminal to generate the React application.
  > "*I opened a terminal and ran npx create-react-app . to create a new React app.*"
- I verified the application locally using Live Server.
  > "*I opened the build folder using Visual Studio Code and used Live Server to open the application*"
- I configured the specific repository and branch for the deployment.
  > "*I selected the Organization Haddley, Repository react-azure and branch main and clicked the Review + create button*"
- I confirmed the final deployment by visiting the provided URL.
  > "*I navigated to https://brave-flower-0913bf910.4.azurestaticapps.net*"

## Outcome
I built a React application and published it to a live URL on Azure Static Web Apps.

## Caveats
The post does not detail the specific configuration of the CI/CD pipeline beyond the standard Azure setup.
