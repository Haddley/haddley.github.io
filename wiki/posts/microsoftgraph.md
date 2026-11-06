---
type: post
slug: microsoftgraph
title: "Microsoft Graph"
date: "2022-05-26"
builds_on: []
topics: [microsoft-graph, graph-explorer, sharepoint-online, api-authentication]
tools: [Microsoft Graph, Graph Explorer, Microsoft 365, Azure Active Directory, Dynamics 365, OneDrive]
status: current
checked: "2026-11-05"
source_hash: "b7566ab2f3de"
generated_by: gemma4:12b
---

**Summary.** I explore how to use the Microsoft Graph REST API to access data across Microsoft 365, Azure Active Directory, and Dynamics 365. I demonstrate how the Graph Explorer tool simplifies the process of making requests and managing permissions for various services.

## What I did
- I tested the Graph Explorer tool using both a sample account and a personal developer subscription.
- I performed a GET request to retrieve my profile information.
- I granted administrative permissions to the Graph Explorer application for email and file access.
- I investigated how Teams files are stored in SharePoint Online and accessed via the Graph API.
- I explored how the tool provides sample JavaScript code for developers.

## Claims
- Microsoft Graph provides a unified REST API for multiple Microsoft services.
  > "Microsoft Graph is a REST API that can be used to access: Microsoft 365, Azure Active Directory, Windows and Dynamics 365."
- Graph Explorer is a tool for making API requests and viewing responses.
  > "Graph Explorer is a developer tool that allows a developer to make Microsoft Graph REST API requests and view corresponding responses."
- I required administrative consent to access email messages.
  > "*I granted this application (Graph Explorer) permission to access email messages as administrator*"
- Files in Teams channels are stored in SharePoint Online.
  > "Files uploaded to the Team's channel are stored in SharePoint Online."
- Graph Explorer provides sample JavaScript code for developers.
  > "Graph Explorer is also able to provide sample JavaScript code that could be used to access Microsoft Graph"

## Outcome
I demonstrated how to use Graph Explorer to access and manage data across the Microsoft 365 ecosystem. I confirmed that the tool provides a pathway for developers to integrate these services into their applications.

## Caveats
The post does not detail the specific security configurations of the underlying Azure Active Directory tenant.
