---
type: concept
slug: power-automate-and-integration
title: "Power Automate and integration"
description: "I explore how Power Automate serves as a versatile integration engine to connect diverse systems like SharePoint, Business Central, and Azure AI Foundry."
posts: [sharepointdevicerequest2, sharepointdevicerequest, powerautomateai, businesscentralbusinessevents, azurefunctionsbc, azurelogicappbc, businesscentralpart25integratingwithdataverseusingdataflows, powerautomatereports, cloudflow, createactionbasedonaflow]
status: current
checked: "2026-11-06"
source_hash: "b7958b4a7eff"
generated_by: gemma4:12b
---

**Summary.** I explore how Power Automate serves as a versatile integration engine to connect diverse systems like SharePoint, Business Central, and Azure AI Foundry. I demonstrate various methods for data movement, including webhooks, OData feeds, and custom actions to automate workflows and notifications.

## The idea
- Power Automate connects disparate systems like Business Central and Dataverse using OData and Dataflows.
- I use Power Automate to automate notifications and process data from AI models.
- I implement different integration methods such as webhooks for real-time updates and polling for scheduled checks.
- I create custom actions directly within the Business Central interface to trigger specific flows.
- I use Power Automate to handle complex logic, such as converting JSON data or managing retry logic for reports.

## Claims
- I integrated the AI model call into the Power Automate workflow.
  > "I added an Azure AI Foundry model call to a Power Automate Flow." — powerautomateai
- I used the Parse JSON action to extract specific values from the response.
  > "*I used Parse JSON to extract the category, score, confidence and explaination values*" — powerautomateai
- I used a Logic App to connect different applications through a trigger and action mechanism.
  > "Uses **triggers** (when something happens) → **actions** (then do something)" — azurelogicappbc
- Webhook triggers provide near real-time notifications because Business Central pushes the data.
  > "A webhook trigger, because Business Central pushes the notification, so it does not wait for the next poll." — azurelogicappbc
- I used a schema from sample JSON to convert the text into a table.
  > "The flow's output arrived as text, so Parse value turned it into a table." — cloudflow
- I used a Do until action to ensure the flow retries until success.
  > "*I added a Do until action to ensure that the flow would retry the HTTP GET and Email actions until the Success variable was set to true*" — powerautomatereports
- Power Automate flows can be initiated directly from the Business Central interface.
  > "Power Automate flows can be created from the Business Central user interface." — createactionbasedonaflow
- The [ExternalBusinessEvent] attribute makes custom events available for external integration.
  > "This attribute marks a business event as available for external integration through the Business Central API." — businesscentralbusinessevents

## Where the posts differ
- I show two different ways to handle data flow from Business Central: one using Logic Apps and another using Dataflows with OData.
  > "Uses **triggers** (when something happens) → **actions** (then do something)" — azurelogicappbc
  > "A: OData is a standard way to read data from a web address, with a self-describing model." — businesscentralpart25integratingwithdataverseusingdataflows

## What I concluded
Power Automate provides a robust framework for connecting various platforms and automating complex business processes. By choosing the right integration method, such as webhooks or custom actions, you can create seamless data flows and automated notifications.
