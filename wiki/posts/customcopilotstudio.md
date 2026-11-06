---
type: post
slug: customcopilotstudio
title: "Custom Copilot Studio"
date: "2024-03-23"
builds_on: []
topics: [copilot-studio, business-central, global-variables, generative-ai, data-integration]
tools: [Copilot Studio, Business Central, Generative AI]
status: current
checked: "2026-11-05"
source_hash: "9ed0daed0b9f"
generated_by: gemma4:12b
---

**Summary.** I built a custom Copilot in Copilot Studio that identifies the specific customer currently open in Business Central. I used global variables and generative AI features to ensure the Copilot provides context-aware responses based on the active record.

## What I did
- I created a Business Central extension to connect to Copilot.
- I defined global variables to hold specific customer data fields.
- I configured the Conversational boosting Topic with a custom data source.
- I mapped the extension data to the Copilot's global variables.
- I verified the Copilot's responses for multiple different customers.

## Claims
- I used global variables and generative AI features to build the solution.
  > "I used the Global Variable and Generative AI features in Copilot studio."
- I created specific global variables to hold data from Business Central.
  > "I made Customer_Name, Customer_City, Customer_No and Customer_Blocked so that an outside source, here Business Central, could set them when the chat starts."
- The generative answers action uses a custom data variable to provide information.
  > "A CustomData variable holds the customer's data, and the generative answers action reads it as its data source, so the Copilot answers from that customer's information."
- The Copilot uses the global variables to provide a personalized greeting.
  > "The extension passes the customer's details into the global variables when the chat opens, and the Conversation Start topic uses them in its greeting."
- The system identifies the correct customer because of the global variables.
  > "Global variables let Business Central tell the Copilot which customer is open."
- The Copilot can provide information about different entities like schools or corporations.
  > "I chatted to School of Fine Art, Alpine Ski House and Adatum Corporation in turn."

## Outcome
I built a system where the Copilot recognizes the specific customer record in Business Central and provides relevant information. This approach can also be used to chat with other Business Central entities.

## Caveats
The post does not show how to filter out private data that a user of the chat should not see.
