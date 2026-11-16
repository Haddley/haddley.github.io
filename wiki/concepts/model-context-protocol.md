---
type: concept
slug: model-context-protocol
title: "Model Context Protocol"
description: "The Model Context Protocol (MCP) provides a standardized way for AI agents to access specific tools and data sources, significantly enhancing their reasoning and planning capabilities."
posts: [deepseekharnessaccounting, deepseekharnessbusinesscentral, azurefoundryagent6, azurefoundryagent4, businesscentralmcpclaudecode, rag1, agenticaiforprofessionals3, claudecode7, mcpserver2, mcpserver]
status: current
checked: "2026-11-16"
source_hash: "1f78296721ad"
generated_by: gemma4:12b
---

**Summary.** The Model Context Protocol (MCP) provides a standardized way for AI agents to access specific tools and data sources, significantly enhancing their reasoning and planning capabilities. I demonstrate how to build and deploy MCP servers to connect systems like Microsoft Business Central to AI clients such as Claude Code.

## The idea
- MCP serves as a bridge between AI models and external data or tools.
- The protocol allows for a unified way to expose API objects and functions as tools.
- Developers can use MCP to provide real-time context, such as documentation or database queries, to reduce errors from stale training data.
- The protocol supports different transport methods, including stdio and Streamable HTTP for remote connections.
- Effective MCP implementation relies on clear tool descriptions and specific configurations to ensure the model uses the correct tools.

## Claims
- The Model Context Protocol improves how AI agents plan and reason.
  > "Model Context Protocol (MCP) is a framework designed to enhance the reasoning and planning capabilities of AI agents." — mcpserver
- The server provides a standard way for AI clients to access specific tools.
  > "A: A small program that offers tools to an AI client in a standard way." — mcpserver2
- Business Central includes a built-in MCP server that exposes APIv2 objects.
  > "Business Central now ships its own Model Context Protocol (MCP) server, built directly into the product." — businesscentralmcpclaudecode
- The mcp-remote package handles the HTTP transport and the Microsoft sign-in process.
  > "Business Central's MCP server speaks HTTP rather than stdio, though, so the bridge between the two is `mcp-remote`, an npm package that handles the HTTP transport and the Microsoft sign-in on Claude Code's behalf." — businesscentralmcpclaudecode
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- The MCP tool uses a docstring to describe its purpose to the AI model.
  > "The function's docstring — the triple-quoted string directly below its definition — is not a comment for human readers only; MCP clients, including Claude Code, read it directly and show it to the AI model as the description of what this tool does and when to use it, which is why it is written as a clear, complete sentence rather than a terse label." — rag1
- The server provides live data from the company even though the tools are read-only.
  > "The server exposes its pages as read-only tools, but they still return live data from your company." — businesscentralmcpclaudecode
- A full configuration with 414 tools is inefficient and breaks the harness.
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral

## Where the posts differ
- A full configuration of 414 tools is inefficient, whereas a small set of objects works efficiently.
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral
  > "To control exactly which APIs Claude Code could see, I created a new configuration instead of relying on the dynamic default." — businesscentralmcpclaudecode

## What I concluded
The Model Context Protocol is a powerful framework for grounding AI agents in real-world data and specific business logic. By creating structured MCP servers, you can provide models with the precise context needed to perform complex tasks like accounting or legal research.
