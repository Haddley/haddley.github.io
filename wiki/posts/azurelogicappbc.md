---
type: post
slug: azurelogicappbc
title: "Business Central Azure Logic App"
date: "2025-12-12"
builds_on: []
topics: [business-process-automation, webhook-vs-polling, azure-logic-apps, business-central-integration]
tools: [Azure Logic Apps, Dynamics 365 Business Central, Office 365, Salesforce, SQL]
status: current
checked: "2026-11-05"
source_hash: "8fb7cc4c491d"
generated_by: gemma4:12b
---

**Summary.** I explain how to use Azure Logic Apps to automate workflows triggered by events in Dynamics 365 Business Central. I compare polling and webhook triggers to help you decide the best method for your specific business requirements.

## What I did
- I compared polling and webhook triggers for Business Central events.
- I demonstrated how to connect Business Central to other services using Logic Apps.
- I configured a Send an email (V2) action to notify users of new records.
- I tested the workflow in a sandbox company to verify the run history.

## Claims
- A Logic App is a cloud service that connects different applications through a trigger and action mechanism.
  > "Uses **triggers** (when something happens) → **actions** (then do something)"
- Webhook triggers provide near real-time notifications because Business Central pushes the data.
  > "A webhook trigger, because Business Central pushes the notification, so it does not wait for the next poll."
- Polling triggers introduce a delay because they only check for changes at set intervals.
  > "A polling trigger would still work, but it has a delay that depends on its schedule."
- Business Central has specific limits on the number of API calls allowed.
  > "✓ **API Limits**: Business Central has API call limits"
- Logic Apps pricing is based on the number of times the workflow executes.
  > "✓ **Cost**: Logic Apps pricing based on executions"
- I used a Consumption plan and warned to check charges before leaving a workflow running.
  > "I used a Consumption plan, so check the charges before you leave a workflow running."

## Outcome
I built a Logic App that automatically sends an email whenever a new customer is created in Business Central.

## Caveats
Complex logic may require custom code instead of standard Logic App actions.
