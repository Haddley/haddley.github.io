---
type: post
slug: cloudflow
title: "Cloud Flow"
date: "2024-02-26"
builds_on: []
topics: [cloud-flows, business-central-integration, json-parsing, variable-management]
tools: [Copilot Studio, Power Automate, Business Central, JSON]
status: current
checked: "2026-11-05"
source_hash: "74dd1f919520"
generated_by: gemma4:12b
---

**Summary.** I describe how I used a Cloud Flow to overcome a limitation when retrieving data from Business Central. I demonstrate how to convert a text response into a table variable using a schema from sample JSON.

## What I did
- I created a Topic with a trigger phrase.
- I built a Cloud Flow to call the Business Central connector.
- I converted the flow output to a string.
- I parsed the JSON string into a table variable using a schema.
- I displayed the results to the user.

## Claims
- I used a Cloud Flow to bypass a specific technical limitation.
  > "I used a Cloud Flow to workaround an issue."
- The flow retrieves data from the Business Central customers table.
  > "The flow calls the Business Central connector for the customers table, and the Topic receives its output."
- The system cannot loop over text data directly.
  > "The Topic cannot loop over text, so I used Parse value with a schema that I made from sample JSON, and saved the result in a table variable."
- I used a schema from sample JSON to convert the text into a table.
  > "The flow's output arrived as text, so Parse value turned it into a table."
- The final step joined the names into a single response.
  > "Concat joined the customers' display names into one reply."

## Outcome
I built a Topic that successfully fetches and displays Business Central customer data. I proved that parsing a JSON schema allows the system to process data that would otherwise remain as plain text.

## Caveats
The post does not show the specific logic used to construct the final concatenated string.
