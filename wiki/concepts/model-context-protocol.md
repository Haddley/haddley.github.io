---
type: concept
slug: model-context-protocol
title: "Model Context Protocol"
description: "I use the Model Context Protocol (MCP) to connect AI models to external data sources and tools like Business Central and Azure Functions."
posts: [fabriclakehouse5, fabriclakehouse6, fabriclakehouse7, bcmcp1, bcmcp2, bcmcp3, bcmcp6, bcmcp7, azurefoundryagent6, azurefoundryagent4]
status: current
checked: "2026-11-27"
source_hash: "1eaa2fa25df9"
generated_by: gemma4:12b
---

**Summary.** I use the Model Context Protocol (MCP) to connect AI models to external data sources and tools like Business Central and Azure Functions. These implementations allow AI assistants to perform complex tasks, such as processing orders or retrieving legal information, while maintaining strict control over the tools they can access.

## The idea
- MCP servers provide a standardized way to expose tools and data to AI models.
- Specific configurations limit the available tools to improve performance and reduce token consumption.
- MCP allows AI models to consult external documentation to understand actions before processing data.
- Custom tools can bridge the gap between AI-generated drafts and final actions through human-in-the-loop verification.
- Azure Functions MCP extensions simplify the process of turning Python functions into accessible tools.

## Claims
- Business Central includes a built-in MCP server hosted by Microsoft.
  > "Business Central has one, hosted by Microsoft at `mcp.businesscentral.dynamics.com`." — bcmcp1
- A small, specific list of tools is more effective and manageable than providing the AI with every available option.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
- The AI can only call tools that are explicitly included in the configuration list.
  > "If a tool is not on the list, the AI is never offered it, so it has nothing to call." — bcmcp1
- The AI can now access official documentation to understand specific actions.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**." — bcmcp3
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- The agent successfully saves data to a blob container when using the MCP tool.
  > "The function wrote a file to the `intakes` container." — azurefoundryagent4
- The tool ensures that a human must review and approve a transaction before the system executes a web API call.
  > "That is on purpose, but a draft that nobody can post is only half a job." — bcmcp6
- The tool's body is one function that does three things in order, and nothing can skip a step.
  > "The tool's body is one function that does three things in order, and nothing can skip a step, because there is no other way in." — bcmcp6

## Where the posts differ
- The Fabric data agent uses a different architecture than the custom DeepSeek Harness, which relies on a shell to perform complex analysis.
  > "The question 7 runs used the shell heavily: 26 shell calls in run A2 and 25 in A3, mostly Python over the CSV files that `export_query` wrote." — fabriclakehouse6
  > "It could do all three, using `bash`." — fabriclakehouse7

## What I concluded
The Model Context Protocol provides a robust framework for integrating AI with real-world systems and data. By carefully configuring these tools and implementing human-in-the-loop safeguards, I can create reliable agents that perform complex tasks while staying within defined boundaries.
