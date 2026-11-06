---
type: post
slug: powerautomateai
title: "Power Automate"
date: "2026-02-17"
builds_on: []
topics: [power-automate, azure-ai-foundry, dataverse-integration, json-parsing]
tools: [Power Automate, Azure AI Foundry, Dataverse, Model-driven app]
status: current
checked: "2026-11-06"
source_hash: "789a5b7aa97a"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to integrate Power Automate with Azure AI Foundry to automate lead processing. I show how to use environment variables and Parse JSON to handle AI responses and update Dataverse records.

## What I did
- I integrated an Azure AI Foundry model call into a Power Automate Flow.
- I configured environment variables for the API endpoint and key.
- I implemented logic to check if AI processing was enabled.
- I parsed the JSON response to extract specific values like score and confidence.
- I updated the Dataverse record with the results from the AI model.

## Claims
- I integrated the AI model call into the Power Automate workflow.
  > "I added an Azure AI Foundry model call to a Power Automate Flow."
- I used environment variables to manage the API configuration.
  > "*I added an environment variable to the solution*"
- I used a condition to check if the AI processing was enabled.
  > "*I created a Condition based on the Enabled variable value*"
- I used the Parse JSON action to extract specific values from the response.
  > "*I used Parse JSON to extract the category, score, confidence and explaination values*"
- I updated the record in Dataverse using the results.
  > "*I used a Dataverse Update a row action to update the record (row)*"
- I verified the updated data in the model driven app.
  > "*I viewed the updated row in the model driven app*"

## Outcome
I built a flow that automatically processes lead data through Azure AI Foundry and updates the corresponding records in Dataverse.

## Caveats
I would need to adjust the API Endpoint manually after copying the initial values.
