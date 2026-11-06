---
type: concept
slug: azure-ai-foundry
title: "Azure AI Foundry"
description: "I explore the capabilities of Azure AI Foundry by building and testing various agents for legal, medical, and lead processing use cases."
posts: [azurefoundryagent8, azurefoundryagent7, foundry-where-to-start, azurefoundryagent6, azurefoundryagent4, azurefoundryagent5, azurefoundryagent2, azurefoundryagent3, azurefoundryagent, powerautomateai]
status: current
checked: "2026-11-06"
source_hash: "6437f7585592"
generated_by: gemma4:12b
---

**Summary.** I explore the capabilities of Azure AI Foundry by building and testing various agents for legal, medical, and lead processing use cases. My posts demonstrate how to integrate tools like Azure AI Search, Power Automate, and the Agent2Agent protocol to create reliable, production-ready systems.

## The idea
- Azure AI Foundry provides infrastructure for building hosted agents that can use custom Python code and search indexes.
- The platform supports the Agent2Agent protocol to coordinate multiple specialist agents under a supervisor.
- I use Azure AI Search with vector embeddings to provide context for retrieval-augmented generation.
- Strict rules and specific output templates improve the reliability of information retrieval over vague instructions.
- Integration with Power Automate allows for automating business processes like lead processing using AI responses.

## Claims
- The hosted agent uses my own Python code and runs in a dedicated sandbox.
  > "In this post I build a hosted agent, which is my own Python code that Foundry runs." — azurefoundryagent3
- The agent successfully retrieved information and cited correct page and line numbers.
  > "I checked every citation against the transcript pages, and they were right." — azurefoundryagent3
- The supervisor design is the better choice if documents are too large for one prompt or if cost is a primary concern.
  > "If the documents did not fit in one prompt, or if the cost mattered more than the last six answers, the supervisor would be the answer." — azurefoundryagent5
- The embedding model is only used to find passages, while a separate model writes the final answer.
  > "The agent uses a separate model to write the answer from the passages that the search returns." — azurefoundryagent
- I integrated the AI model call into the Power Automate workflow.
  > "I added an Azure AI Foundry model call to a Power Automate Flow." — powerautomateai
- A required section in the output template is more reliable than a rule in the instructions.
  > "A required section in the output template worked better than a rule in the instructions." — azurefoundryagent2
- The agent successfully cited the Benefit_Options.pdf document as the source for its answer.
  > "The agent cited Benefit_Options.pdf, and its answer was that health insurance costs are deducted from each paycheck." — azurefoundryagent
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4

## Where the posts differ
- The IQ module code provided by the platform is outdated and requires a project connection.
  > "Its tool snippet fails with a 401 because it leaves out a project connection, and its `agent` call style is already deprecated." — azurefoundryagent6
- A vague agent may provide information from outside the documents while a strict agent stays within the knowledge base.
  > "The difference showed up on questions the documents do not cover: the vague agent answered 3 of 6 of them with legal information the documents do not directly cover, and the strict agent answered none of them that way." — azurefoundryagent6
  > "It answered 5 of the 6 outside questions confidently from memory, with figures such as a licence renewal fee, Wisconsin speed limits and a stop sign fine." — azurefoundryagent6

## What I concluded
Azure AI Foundry provides a robust framework for building complex, multi-agent systems that can integrate with external tools and data sources. Success with the platform depends on using strict rules, proper infrastructure like Azure AI Search, and choosing the right architecture for the specific scale of the task.
