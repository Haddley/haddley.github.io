---
type: concept
slug: model-context-protocol
title: "Model Context Protocol"
description: "I use the Model Context Protocol (MCP) to connect AI models to external data sources, tools, and documentation."
posts: [bcmcp1, bcmcp2, bcmcp3, bcmcp6, bcmcp7, azurefoundryagent6, azurefoundryagent4, businesscentralmcpclaudecode, rag1, agenticaiforprofessionals3]
status: current
checked: "2026-11-26"
source_hash: "2fbdafe091fe"
generated_by: gemma4:12b
---

**Summary.** I use the Model Context Protocol (MCP) to connect AI models to external data sources, tools, and documentation. This protocol allows me to bridge the gap between large language models and specific business systems like Business Central or legal databases.

## The idea
- MCP serves as a bridge between AI models and external tools or data sources.
- I use specific configurations to limit the tools available to an AI to improve accuracy and reduce token consumption.
- I implement Retrieval-Augmented Generation (RAG) and MCP together to provide grounded context to the model.
- I use MCP tools as thin wrappers around existing REST APIs to ensure consistency across different interfaces.
- I integrate human-in-the-loop steps to ensure AI-generated drafts are reviewed before they execute final actions.

## Claims
- Business Central includes a built-in MCP server that exposes APIv2 objects.
  > "Business Central now ships its own Model Context Protocol (MCP) server, built directly into the product." — businesscentralmcpclaudecode
- A small, specific list of tools is more effective and manageable than providing the AI with every available option.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
- The AI can only call tools that are explicitly included in the configuration list.
  > "If a tool is not on the list, the AI is never offered it, so it has nothing to call." — bcmcp1
- The MCP tool uses a docstring to describe its purpose to the AI model.
  > "The function's docstring — the triple-quoted string directly below its definition — is not a comment for human readers only; MCP clients, including Claude Code, read it directly and show it to the AI model as the description of what this tool does and when to use it, which is why it is written as a clear, complete sentence rather than a terse label." — rag1
- The MCP tools are thin wrappers that call the exact same functions as the REST API.
  > "All three are thin wrappers calling the exact same functions the REST API and the frontend call — same skill, multiple interfaces." — agenticaiforprofessionals3
- The system provides consistent results across different interfaces because they share the same backend functions.
  > "Every beat above ran against the full stack live on a Docker Compose setup on the M4 MacBook Air from Part 2 — Postgres/pgvector, the FastAPI backend, and the React frontend, all local, no cloud dependency for any of it:" — agenticaiforprofessionals3
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator." — azurefoundryagent4
- The system ensures a human must review and approve a transaction before the system executes a web API call to post the order.
  > "That is on purpose, but a draft that nobody can post is only half a job." — bcmcp6

## Where the posts differ
- The system uses a local harness and remote MCP server for DeepSeek, while other implementations use the mcp-remote package for Claude Code.
  > "The model, DeepSeek, does the thinking." — bcmcp2
  > "Business Central's MCP server speaks HTTP rather than stdio, though, so the bridge between the two is `mcp-remote`, an npm package that handles the HTTP transport and the Microsoft sign-in on Claude Code's behalf." — businesscentralmcpclaudecode

## What I concluded
The Model Context Protocol provides a standardized way to connect AI models to real-world data and actions while maintaining strict control over the available tools. By combining MCP with careful configuration and human-in-the-loop safeguards, I can create reliable and safe agentic systems.
