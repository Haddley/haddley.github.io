---
type: post
slug: topics
title: "Copilot Studio"
date: "2024-02-25"
builds_on: ["ashorthistory"]
topics: ["copilot-studio", "business-central-connector", "variable-management", "dynamics-365-integration"]
tools: ["Microsoft Copilot Studio", "Power Virtual Agents", "Dynamics 365 Business Central", "Microsoft Dataverse"]
status: current
checked: "2026-11-26"
source_hash: "07d34526e6f4"
generated_by: gemma4:12b
---

**Summary.** I explain how to integrate Microsoft Dynamics 365 data into a chatbot using Copilot Studio. I built a custom topic that successfully retrieves and displays live company data from a production environment.

## What I did
- I built a custom Topic to call the Business Central Connector.
- I retrieved the company list from my production environment.
- I managed variables to store the returned data.
- I added a message to display the results to the user.
- I ended the topic after the data was returned.

## Claims
- The platform was previously known as Power Virtual Agents.
  > "Microsoft Copilot Studio was called Power Virtual Agents from its launch in November 2019 until Microsoft renamed it in November 2023."
- I confirmed that there were three companies in the production environment.
  > "*I confirmed there were three Companies in my PRODUCTION environment*"
- I set the variable type to table by selecting the value from the picker.
  > "*I selected GetCompaniesV3.value from the variable picker, which set Var1's type to table*"
- The system successfully returned the three company names.
  > "It returned the three company names.*"

## Outcome
I built a Copilot Studio topic that retrieves and displays live company data from Business Central. The process successfully returned three company names to the user.

## Caveats
The post does not provide the full history of Microsoft Dynamics or Microsoft Dataverse.
