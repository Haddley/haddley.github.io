---
title: "JavaScript and Microsoft Graph"
description: "A comprehensive guide covering javascript and microsoft graph"
date: "2025-09-20"
category: "Java"
image: "/assets/images/office-365-icon-500x500.png"
tags: ["javascript","azure","java","ai","ml"]
---

# JavaScript and Microsoft Graph

## A Node App that accesses Microsoft 365

![](/assets/images/javascriptgraph/office-365-icon-500x500.png)
*Microsoft_Office_logo by Microsoft is licensed under CC*


## A console application that calls the Microsoft Graph API

This post is based on Microsoft's "[Build JavaScript apps with Microsoft Graph](https://docs.microsoft.com/en-nz/graph/tutorials/javascript?tabs=aad)" tutorial.

The node console application I created here uses OAuth for identity management.

An OAuth application requires an "identity provider". 

In this case the identity provider is [Azure Active Directory](azure-active-directory.html#top).

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.21.09-pm-1836x1288.png)
*I navigated to Azure Portal and selected Azure Active Directory*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.21.40-pm-1836x1278.png)
*I selected the "App registrations" link*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.22.04-pm-1836x1285.png)
*I selected the "New registration" link*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.23.43-pm-1836x1285.png)
*I entered the name of the console application and selected "Register"*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.24.32-pm-1836x1276.png)
*I made a note of the "Application (client) ID" and the "Directory (tenant) ID"*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.29.06-pm-1836x969.png)
*I created a minimal node project*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.30.07-pm-1836x95.png)
*I added @azure/identity, @microsoft/microsoft-graph-client, isomorphic-fetch and readline-sync dependencies*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.33.22-pm-1836x968.png)
*I created an appSettings.js file including the "Application (client) ID" and the "Directory (tenant) ID" values provided in the Application registration page. I included the required Microsoft Graph permissions (the "graphUserScopes").*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.42.00-pm-1836x968.png)
*I ran the console application*


## Key moves

The index.js code contains the console application user interface. This is where the user selects an option.

The graphHelper.js file contains the most interesting code. 

The graphHelper code creates a TokenCredentialAuthenticationProvider object and uses that to create a _userClient (client) object.

The client object is then used to make calls as shown in the [Graph Explorer](MicrosoftGraph.html) "Code snippets" tab.

![](/assets/images/javascriptgraph/screen-shot-2022-05-28-at-11.08.04-am-1208x572.png)
*GetUserSnippet from the application*

![](/assets/images/javascriptgraph/screen-shot-2022-05-27-at-2.47.11-pm-1836x943.png)
*Graph Explorer Code snippet*


## Full code

The final code is included below.
