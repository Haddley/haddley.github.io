---
type: post
slug: businesscentralmcpclaudecode
title: "Model Context Protocol (Part 4)"
date: "2026-09-19"
part: 4
builds_on: [mcpserver2, rag1]
topics: [model-context-protocol, business-central-integration, oauth-authentication, claude-code-configuration]
tools: [Business Central, Claude Code, Microsoft Entra ID, mcp-remote, Node.js]
status: current
checked: "2026-11-05"
source_hash: "6383c046ec40"
generated_by: gemma4:12b
---

**Summary.** I explain how to connect Claude Code to the built-in Model Context Protocol (MCP) server in Business Central. I demonstrate how to configure an Entra app, set up the Business Central server, and use the mcp-remote package to bridge the two systems.

## What I did
- I registered a Microsoft Entra app to provide an OAuth identity for the connection.
- I configured a specific MCP server configuration in Business Central to expose desired APIv2 objects.
- I created a project-scoped .mcp.json file to bridge the HTTP-based server to Claude Code.
- I verified the connection by asking Claude Code questions about real data from the Cronus USA demo company.

## Claims
- Business Central includes a built-in MCP server that exposes APIv2 objects.
  > "Business Central now ships its own Model Context Protocol (MCP) server, built directly into the product."
- I used a specific configuration to limit the tools available to Claude Code.
  > "To control exactly which APIs Claude Code could see, I created a new configuration instead of relying on the dynamic default."
- The mcp-remote package handles the HTTP transport and the Microsoft sign-in process.
  > "Business Central's MCP server speaks HTTP rather than stdio, though, so the bridge between the two is `mcp-remote`, an npm package that handles the HTTP transport and the Microsoft sign-in on Claude Code's behalf."
- Claude Code uses a project-scoped .mcp.json file instead of the standard Claude Desktop configuration.
  > "Claude Desktop reads its MCP servers from `claude_desktop_config.json`; Claude Code reads them from a project-scoped `.mcp.json` file instead, the same file my earlier RAG series used for a local MCP server."
- The server provides live data from the company even though the tools are read-only.
  > "The server exposes its pages as read-only tools, but they still return live data from your company."
- I divided the setup into three parts to make it easier to isolate and troubleshoot failures.
  > "If Claude Code cannot connect, a failure could sit in the Entra app, the Business Central server, or the bridge, and checking each part on its own narrows down where the fault is."

## Outcome
I built a bridge between Claude Code and Business Central using the native MCP server and the mcp-remote package. This allows Claude Code to query real-time company data through a secure OAuth connection.

## Caveats
The post does not show the specific internal logic of the mcp-remote package, only how it functions as a bridge for the HTTP transport.
