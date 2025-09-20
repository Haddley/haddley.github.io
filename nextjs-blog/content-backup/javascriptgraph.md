---
title: "JavaScript and Microsoft Graph"
description: "A comprehensive guide covering javascript and microsoft graph"
date: "2025-09-20"
category: "Java"
image: "/assets/images/javascriptgraph.png"
tags: ["javascript","azure","java","ai"]
---

# JavaScript and Microsoft Graph

JavaScript and Microsoft Graph A Node App that accesses Microsoft 365 Microsoft_Office_logo by Microsoft is licensed under CC A console application that calls the Microsoft Graph API This post is based on Microsoft's " Build JavaScript apps with Microsoft Graph " tutorial. The node console application I created here uses OAuth for identity management. An OAuth application requires an "identity provider". In this case the identity provider is Azure Active Directory . I navigated to Azure Portal and selected Azure Active Directory I selected the "App registrations" link I selected the "New registration" link I entered the name of the console application and selected "Register" I made a note of the "Application (client) ID" and the "Directory (tenant) ID" I created a minimal node project I added @azure/identity, @microsoft/microsoft-graph-client, isomorphic-fetch and readline-sync dependencies I created an appSettings.js file including the "Application (client) ID" and the "Directory (tenant) ID" values provided in the Application registration page. I included the required Microsoft Graph permissions (the "graphUserScopes"). I ran the console application Key moves The index.js code contains the console application user interface. This is where the user selects an option. The graphHelper.js file contains the most interesting code. The graphHelper code creates a TokenCredentialAuthenticationProvider object and uses that to create a _userClient (client) object. The client object is then used to make calls as shown in the Graph Explorer "Code snippets" tab. GetUserSnippet from the application Graph Explorer Code snippet Full code The final code is included below. index.js graphHelper.js appSettings.js
