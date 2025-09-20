---
title: "Customer Copilot Studio"
description: "A comprehensive guide covering customer copilot studio"
date: "2025-09-20"
category: "Development"
image: "/assets/images/customercopilotstudio.png"
tags: ["ai","business central","dynamics"]
---

# Customer Copilot Studio

Microsoft Dynamics 365 Business Central (Part 23) Business Central Customer Copilot Using Copilot Studio By Microsoft , Public Domain Business Central Customer Copilot Using Copilot Studio I created a Business Central extension that allows Business Central users to "chat to" Customers. I used the Global Variable and Generative AI features in Copilot studio. The same approach could be used to allow users to chat to other Business Central entities I created a new Copilot I called the Copilot "Customer Copilot" I watched the animation I created a Copilot Studio Topic I named the Topic "Parameter Config" I used the "Set a variable value" action I created a "Customer_Name" Global variable that could be set by an external source (Business Central in this case) I created a "Customer_City" Global variable I created a "Customer_No" Global variable I created a "Customer_Blocked" Global variable I updated the "Conversation Start" Topic I used the {x} button to insert Global variable values into the Conversation Start action's text I saved the Topic I navigated to the Generative AI tab and enabled the "Boost conversational coverage with generative answers" feature The Conversational boosting Topic was added In the Conversational booking Topic I created a Custom Data variable I updated the "create generative answers" action's Data sources property The Custom data datasource was set to the CustomData variable I published the Copilot I created a Business Central extension that connected to the Copilot CustomerCopilotExtension.al CustomerCopilotFunctions.js CustomerCopilotStyles.css I was able to "chat to" School of Fine Art I was able to "chat to" Alpine Ski House I was able to "chat to" Adatum Corporation References Dynamically change content for Generative Answers with PowerFX Pass Parameters to Copilot Studio Bot from Calling Site
