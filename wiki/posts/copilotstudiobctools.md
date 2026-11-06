---
type: post
slug: copilotstudiobctools
title: "Copilot Studio Agent Tools"
date: "2025-09-24"
builds_on: []
topics: [copilot-studio, business-central, agent-tools, data-integration]
tools: [Copilot Studio, Business Central]
status: current
checked: "2026-11-05"
source_hash: "f0217ff32b1f"
generated_by: gemma4:12b
---

**Summary.** I built a Copilot Studio Agent that connects to Business Central using specific tools. I demonstrated how to configure these tools so the agent can successfully find and create vendor records.

## What I did
- I connected a Copilot Studio Agent to Business Central.
- I added and renamed specific actions from the Business Central connector.
- I configured the required inputs for the creation tool.
- I tested the tools to ensure the agent could perform the correct actions.

## Claims
- A tool is an action that the agent chooses to call.
  > "A: An action that the agent can choose to call."
- The agent uses the name and description of a tool to decide which one to use.
  > "A: The agent decides which tool to use from its name and description, so I changed the defaults to say that they deal with vendors."
- A tool that creates a record must supply every field that the table requires.
  > "A tool that creates a record has to supply every field that the table requires, so read the error and check the inputs that the tool collects."
- I used a sandbox company to test the creation tool before using real data.
  > "Before I let an agent create records, I would use a sandbox company and check which inputs the tool collects, because the agent changes real data when it uses that tool."
- The find tool answers the first question and the create tool handles the second.
  > "The find tool answers the first question, and the create tool handles the second."

## Outcome
I built a Copilot Studio Agent that can find and create vendor records in Business Central. I concluded that clear tool names and complete input fields are essential for successful execution.

## Caveats
The post does not show the specific internal logic of the Business Central API.
