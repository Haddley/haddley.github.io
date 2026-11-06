---
type: post
slug: topics
title: "Copilot Studio"
date: "2024-02-25"
builds_on: []
topics: [copilot-studio, business-central-connector, dynamics-365-integration, variable-management]
tools: [Copilot Studio, Business Central, Dynamics 365]
status: current
checked: "2026-11-06"
source_hash: "e2f5d0a69dde"
generated_by: gemma4:12b
---

**Summary.** I built a custom Copilot Studio topic to retrieve live company data from Dynamics 365. The integration successfully returned the list of companies from the production environment to the user.

## What I did
- I built a custom Topic to call the Business Central Connector.
- I configured the environment and variable management.
- I mapped the company list to a specific variable.
- I added a message to display the results.
- I ended the topic to complete the flow.

## Claims
- The initial Copilot configuration did not provide a response.
  > "By default the Copilot had no idea how to respond — so I built a custom Topic that called the Business Central Connector, retrieved the company list from my PRODUCTION environment, and returned the results to the user."
- The production environment contained exactly three companies.
  > "*I confirmed there were three Companies in my PRODUCTION environment*"
- I defined the variable type as a table.
  > "*I selected GetCompaniesV3.value from the variable picker, which set Var1's type to table*"
- The system successfully returned the three company names.
  > "It returned the three company names.*"

## Outcome
I built a Copilot Studio topic that successfully retrieves and displays live company data from Business Central.

## Caveats
The post does not show the specific configuration steps for the Business Central Connector authentication.
