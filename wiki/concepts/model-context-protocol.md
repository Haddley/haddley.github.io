---
type: concept
slug: model-context-protocol
title: "Model Context Protocol"
description: "I use the Model Context Protocol (MCP) to connect AI models to external data sources and tools like Business Central and Azure Functions."
posts: [fabriclakehouse5, fabriclakehouse6, bcmcp1, bcmcp2, bcmcp3, bcmcp6, bcmcp7, azurefoundryagent6, azurefoundryagent4, businesscentralmcpclaudecode]
status: current
checked: "2026-11-27"
source_hash: "4e048b342a8d"
generated_by: gemma4:12b
---

**Summary.** I use the Model Context Protocol (MCP) to connect AI models to external data sources and tools like Business Central and Azure Functions. This protocol allows me to define specific tool boundaries, manage authentication, and provide the AI with necessary context to perform complex tasks.

## The idea
- MCP servers provide a standardized way to expose API objects and tools to AI assistants.
- Specific configurations limit the tools available to the AI to improve performance and reduce token usage.
- The protocol supports multiple servers, allowing the AI to consult different sources like documentation and live data.
- MCP extensions can simplify the process of turning functions into tools for the AI.
- The system uses specific credentials and transport layers to manage security and authentication.

## Claims
- Business Central includes a built-in MCP server that exposes APIv2 objects.
  > "Business Central now ships its own Model Context Protocol (MCP) server, built directly into the product." — businesscentralmcpclaudecode
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- The configuration limits the tools available to the AI.
  > "A configuration limits the tools." — bcmcp1
- The AI can only call tools that are explicitly included in the configuration list.
  > "If a tool is not on the list, the AI is never offered it, so it has nothing to call." — bcmcp1
- The AI can now access official documentation to understand specific actions.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**." — bcmcp3
- The system identifies which tool is providing the information through specific prefixes.
  > "After a restart, the harness has two servers, and the tool names show which is which: `mcp__businesscentral__…` and `mcp__mslearn__…`." — bcmcp3
- The mcp-remote package handles the HTTP transport and the Microsoft sign-in process.
  > "Business Central's MCP server speaks HTTP rather than stdio, though, so the bridge between the two is `mcp-remote`, an npm package that handles the HTTP transport and the Microsoft sign-in on Claude Code's behalf." — businesscentralmcpclaudecode
- The AI uses both servers sequentially to provide a complete answer.
  > "It used both, one after the other: Learn for what the action does, Business Central for what is in *this* order." — bcmcp3

## Where the posts differ
- The approach to managing tool access varies between using a general configuration and a project-specific file.
  > "A configuration limits the tools." — bcmcp1
  > "Claude Desktop reads its MCP servers from `claude_desktop_config.json`; Claude Code reads them from a project-scoped `.mcp.json` file instead, the same file my earlier RAG series used for a local MCP server." — businesscentralmcpclaudecode

## What I concluded
The Model Context Protocol provides a robust framework for integrating AI models with external systems while maintaining strict control over tool access. By utilizing specific configurations and multiple servers, I can ensure the AI remains within its intended boundaries while accessing relevant data.
