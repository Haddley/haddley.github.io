---
type: post
slug: bcmcp1
title: "Business Central and DeepSeek Harness (Part 1)"
date: "2026-11-18"
part: 1
builds_on: ["mcpserver", "businesscentralmcpclaudecode", "bcmcp2"]
topics: ["mcp-server-configuration", "business-central-integration", "ai-tool-scoping", "api-permission-management"]
tools: ["Business Central", "Model Context Protocol", "Claude Code", "DeepSeek Harness"]
status: current
checked: "2026-11-26"
source_hash: "3f92240696be"
generated_by: gemma4:12b
---

**Summary.** I explain how to use an MCP server configuration to limit the tools available to an AI assistant in Business Central. I demonstrate that a small, specific list of tools is more effective and manageable than providing the AI with every available option.

## What I did
- I defined the role of an MCP server and its configuration in Business Central.
- I created a specific configuration named Assistant to limit AI capabilities.
- I selected specific pages and permissions to ensure the AI only performs low-risk tasks.
- I compared a large toolset to a small toolset to show the benefits of restriction.
- I established a workflow for starting with read-only access and adding permissions only where necessary.

## Claims
- Business Central includes a built-in MCP server hosted by Microsoft.
  > "Business Central has one, hosted by Microsoft at `mcp.businesscentral.dynamics.com`."
- A large list of tools consumes excessive tokens and time for the AI to process.
  > "It took 148 seconds just to list them and about 390,000 tokens to describe them."
- The configuration limits the tools available to the AI.
  > "A configuration limits the tools."
- The configuration is not a security boundary for the user's own account.
  > "It is not a security boundary for that person's own account."
- A small list of understood tools is better than a large list of unknown tools.
  > "Ten tools you understand are better than four hundred you do not."
- The AI can only call tools that are explicitly included in the configuration list.
  > "If a tool is not on the list, the AI is never offered it, so it has nothing to call."

## Outcome
I built a restricted configuration that allows an AI to perform specific, low-risk tasks like reading data and creating draft orders. I concluded that limiting the toolset improves reliability and reduces token consumption.

## Caveats
The configuration does not act as a security boundary for the permissions of the person who is signed in.
