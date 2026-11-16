---
type: concept
slug: azure-ai-foundry
title: "Azure AI Foundry"
description: "I explore the capabilities of Azure AI Foundry by building and testing various agents for legal, medical, and business applications."
posts: [azurefoundryagent8, azurefoundryagent7, foundry-where-to-start, azurefoundryagent6, azurefoundryagent4, azurefoundryagent5, azurefoundryagent2, azurefoundryagent3, azuresearchvector, powerautomateai]
status: current
checked: "2026-11-16"
source_hash: "ed86fd046aa3"
generated_by: gemma4:12b
---

**Summary.** I explore the capabilities of Azure AI Foundry by building and testing various agents for legal, medical, and business applications. My work demonstrates how to combine foundational models with custom logic, search indexes, and external tools to create reliable, production-ready AI systems.

## The idea
- Build agents using a rules-first design where the model only processes user input against a pre-defined rules base.
- Use Azure AI Search with vector embeddings to provide grounded context for retrieval-augmented generation.
- Implement a supervisor design to coordinate multiple specialist agents when dealing with large documents or high costs.
- Integrate agents with external systems like Power Automate and Azure Functions to perform real-world actions.
- Maintain core logic in open layers to ensure portability while utilizing Microsoft-specific infrastructure for deployment.

## Claims
- A rules-first advisor uses a small model only to read the person's words while the rules handle the logic.
  > "Rules alone, with no model at all, read 73% of 150 fresh messages exactly." — azurefoundryagent7
- The supervisor design is the better choice if documents are too large for one prompt or if cost is a primary concern.
  > "If the documents did not fit in one prompt, or if the cost mattered more than the last six answers, the supervisor would be the answer." — azurefoundryagent5
- The agent successfully saves data to a blob container when using the MCP tool.
  > "The function wrote a file to the `intakes` container." — azurefoundryagent4
- I recommend keeping core logic in open layers to ensure portability.
  > "So I would put the valuable logic in the open layer, and let Foundry carry the plumbing." — foundry-where-to-start
- The strict agent correctly used the knowledge base and provided clickable sources.
  > "*I asked about DWI while asleep in a parked car, and the strict agent answered with the section name and two clickable references into the search index*" — azurefoundryagent6
- The agent successfully retrieved and cited specific page and line numbers.
  > "I checked every citation against the transcript pages, and they were right." — azurefoundryagent3
- The embedding model is only used to find passages, while a separate model writes the final answer.
  > "The agent uses a separate model to write the answer from the passages that the search returns." — azuresearchvector
- I integrated the AI model call into the Power Automate workflow.
  > "I added an Azure AI Foundry model call to a Power Automate Flow." — powerautomateai

## Where the posts differ
- The module's provided code fails because it is outdated and lacks a project connection.
  > "Its tool snippet fails with a 401 because it leaves out a project connection, and its `agent` call style is already deprecated." — azurefoundryagent6

## What I concluded
Azure AI Foundry provides a robust framework for building complex, multi-agent systems that integrate with existing enterprise data and workflows. Success depends on using strict rules, proper grounding through search, and a modular design that separates core logic from platform-specific features.
