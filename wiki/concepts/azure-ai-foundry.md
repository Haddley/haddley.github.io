---
type: concept
slug: azure-ai-foundry
title: "Azure AI Foundry"
description: "I explore the capabilities of Azure AI Foundry for building and deploying intelligent agents."
posts: [azurefoundryagent8, azurefoundryagent7, foundry-where-to-start, azurefoundryagent6, azurefoundryagent4, azurefoundryagent5, azurefoundryagent2, azurefoundryagent3, azuresearchvector, powerautomateai]
status: current
checked: "2026-11-06"
source_hash: "36d030d5d4bf"
generated_by: gemma4:12b
---

**Summary.** I explore the capabilities of Azure AI Foundry for building and deploying intelligent agents. My posts demonstrate how to use the platform for complex tasks like legal analysis, voice interactions, and automated workflows.

## The idea
- Azure AI Foundry provides infrastructure for building agents that can use tools and follow specific rules.
- The platform supports advanced architectures like supervisor agents and the Agent2Agent protocol.
- I use Azure AI Search with vector embeddings to provide context for retrieval-augmented generation.
- Integration with other services like Power Automate allows for automated business processes.
- I recommend keeping core logic in open layers to ensure portability across platforms.

## Claims
- I recommend keeping core logic in open layers to ensure portability.
  > "So I would put the valuable logic in the open layer, and let Foundry carry the plumbing." — foundry-where-to-start
- The A2A tool presents remote agents as tools to the model.
  > "But to the model in the middle, I present it as a tool." — foundry-where-to-start
- The supervisor design is the better choice if documents are too large for one prompt or if cost is a primary concern.
  > "If the documents did not fit in one prompt, or if the cost mattered more than the last six answers, the supervisor would be the answer." — azurefoundryagent5
- The agent successfully retrieved and cited specific page and line numbers.
  > "I checked every citation against the transcript pages, and they were right." — azurefoundryagent3
- The strict agent correctly used the knowledge base and provided clickable sources.
  > "*I asked about DWI while asleep in a parked car, and the strict agent answered with the section name and two clickable references into the search index*" — azurefoundryagent6
- The agent successfully cited the Benefit_Options.pdf document as the source for its answer.
  > "The agent cited Benefit_Options.pdf, and its answer was that health insurance costs are deducted from each paycheck." — azuresearchvector
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- I used the Parse JSON action to extract specific values from the response.
  > "*I used Parse JSON to extract the category, score, confidence and explaination values*" — powerautomateai

## Where the posts differ
- The code provided in the IQ module is outdated and lacks a project connection.
  > "Its tool snippet fails with a 401 because it leaves out a project connection, and its `agent` call style is already deprecated." — azurefoundryagent6
- Some features like workflows are being retired in 2026.
  > "Module 6 teaches workflows, and they retire on 1 December 2026." — foundry-where-to-start

## What I concluded
Azure AI Foundry provides a robust framework for building sophisticated, multi-agent systems and integrating them with external tools. Success on the platform depends on using strict rules, proper indexing, and choosing the right architecture for the specific scale of the task.
