---
type: post
slug: customercopilotstudio
title: "Customer Copilot Studio"
date: "2025-09-20"
builds_on: []
topics: [copilot-studio, business-central, global-variables, generative-ai, data-integration]
tools: [Microsoft Copilot Studio, Microsoft Dynamics 365 Business Central]
status: current
checked: "2026-11-05"
source_hash: "ffcfa5b718ed"
generated_by: gemma4:12b
---

**Summary.** I built a solution that allows a Copilot to recognize and discuss the specific customer record currently open in Business Central. I achieved this by using global variables and generative AI features to pass data from Business Central into the Copilot environment.

## What I did
- I created a Business Central extension to connect to the Copilot.
- I defined global variables to store specific customer attributes like name and city.
- I configured the generative answers action to use a custom data source.
- I mapped the extension data to the Copilot's global variables.
- I verified the solution by chatting with multiple different customer records.

## Claims
- I used global variables and generative AI features to build the solution.
  > "I used the Global Variable and Generative AI features in Copilot studio."
- I created specific global variables to hold customer data from an outside source.
  > "I made Customer_Name, Customer_City, Customer_No and Customer_Blocked so that an outside source, here Business Central, could set them when the chat starts."
- The generative answers feature allows the Copilot to respond when no specific topic matches.
  > "A: It lets the Copilot answer with generated text when no Topic matches the question."
- The extension passes customer details into the global variables when the chat opens.
  > "The extension passes the customer's details into the global variables when the chat opens, and the Conversation Start topic uses them in its greeting."
- The Copilot uses the custom data variable to provide answers based on the specific customer information.
  > "A CustomData variable holds the customer's data, and the generative answers action reads it as its data source, so the Copilot answers from that customer's information."
- The system can be adapted to allow users to chat with other Business Central entities.
  > "The same approach could chat to other Business Central entities."

## Outcome
I built a system where the Copilot identifies the correct customer based on the active record in Business Central. This allows the Copilot to provide personalized responses using specific customer data.

## Caveats
The solution requires the developer to exclude any private information that a user of the chat should not see.
