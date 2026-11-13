---
type: post
slug: dotnet-core-part2
title: ".NET Core (Part 2)"
date: "2023-03-15"
part: 2
builds_on: [microsoftgraph]
topics: [blazor-server, microsoft-graph, azure-active-directory, asp-net-core]
tools: [Microsoft Graph, Blazor, ASP.NET Core, Azure Active Directory, dotnet CLI]
status: current
checked: "2026-11-05"
source_hash: "5f11c4b321bd"
generated_by: gemma4:12b
---

**Summary.** I built a Blazor Server application that authenticates users through Azure Active Directory. The application retrieves and displays the user's name and profile photograph from Microsoft Graph.

## What I did
- I registered an Azure application to facilitate authentication.
- I generated a Blazor Server project using the dotnet command line tool.
- I configured the application settings with the ClientSecret.
- I integrated the GraphServiceClient to access user profile data.
- I verified the profile page to ensure the data displayed correctly.

## Claims
- Microsoft Graph provides access to various Microsoft services.
  > "Microsoft Graph is a REST API that can be used to access: Microsoft 365, Azure Active Directory, Windows and Dynamics 365."
- I created an Azure application registration to support the project.
  > "I created an Azure application (app) registration."
- I successfully logged into the application using Azure Active Directory credentials.
  > "*I was now able to login to the Blazor Server app using Azure Active Directory credentials*"
- I used the injected GraphServiceClient to access Microsoft Graph.
  > "*I noted that the key call was to the injected GraphServiceClient to access Microsoft Graph*"
- Blazor Server and MVC projects are both ASP.NET Core projects that can be mixed.
  > "A Blazor Server project and a Model-View-Controller project are both ASP.NET Core projects and it is possible to mix and match."

## Outcome
I built a Blazor Server application that authenticates users and displays their profile information from Microsoft Graph.

## Caveats
I skipped multi-factor authentication for the purposes of this demonstration.
