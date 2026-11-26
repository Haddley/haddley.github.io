---
type: concept
slug: model-context-protocol
title: "Model Context Protocol"
description: "I explore the Model Context Protocol (MCP) as a way to connect AI models to external data and tools, specifically within the Business Central ecosystem."
posts: [bcmcp1, bcmcp2, bcmcp3, bcmcp6, bcmcp7, deepseekharnessaccounting, deepseekharnessbusinesscentral, azurefoundryagent6, azurefoundryagent4, businesscentralmcpclaudecode]
status: current
checked: "2026-11-26"
source_hash: "97f70158c1bb"
generated_by: gemma4:12b
---

**Summary.** I explore the Model Context Protocol (MCP) as a way to connect AI models to external data and tools, specifically within the Business Central ecosystem. I demonstrate how to use specific configurations to limit tool sets, improve accuracy, and create safe bridges between AI drafts and final actions.

## The idea
- Business Central includes a built-in MCP server that exposes APIv2 objects.
- Specific configurations are more effective than large, unfiltered tool lists.
- Integrating documentation as an MCP server helps the AI understand procedures before processing data.
- The mcp-remote package handles HTTP transport and Microsoft sign-in for remote servers.
- Custom tools can bridge the gap between AI-generated drafts and human-approved actions.

## Claims
- Business Central includes a built-in MCP server.
  > "Business Central has one, hosted by Microsoft at `mcp.businesscentral.dynamics.com`." — bcmcp1
- A small, specific list of tools is more effective than a large list of options.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
- The AI can only call tools that are explicitly included in the configuration.
  > "If a tool is not on the list, the AI is never offered it, so it has nothing to call." — bcmcp1
- The AI can access official documentation to understand specific actions.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**." — bcmcp3
- The mcp-remote package handles the HTTP transport and the Microsoft sign-in process.
  > "Business Central's MCP server speaks HTTP rather than stdio, though, so the bridge between the two is `mcp-remote`, an npm package that handles the HTTP transport and the Microsoft sign-in on Claude Code's behalf." — businesscentralmcpclaudecode
- A full configuration with many tools is inefficient and can break the harness.
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral
- The Azure Functions MCP extension simplifies turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- The tool ensures a human must review and approve a transaction before the system executes a web API call.
  > "That is on purpose, but a draft that nobody can post is only half a job." — bcmcp6

## Where the posts differ
- The posts show a shift from using full configurations to specific, limited configurations to improve performance and reliability.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral

## What I concluded
The Model Context Protocol provides a robust framework for connecting AI models to Business Central and other services. By using specific configurations and human-in-the-loop safeguards, you can create powerful, reliable tools for complex business tasks.
