---
type: post
slug: bcmcp2
title: "Business Central and DeepSeek Harness (Part 2)"
date: "2026-11-18"
part: 2
builds_on: ["bcmcp1", "bcmcp3"]
topics: ["mcp-protocol", "business-central-integration", "ai-tool-calling", "identity-management"]
tools: ["Business Central", "DeepSeek", "DeepSeek Harness", "mcp-remote", "Microsoft Entra"]
status: current
checked: "2026-11-26"
source_hash: "c0274454a7b6"
generated_by: gemma4:12b
---

**Summary.** I connect a DeepSeek AI model to Business Central using a local harness and a remote MCP server. I demonstrate how the AI can perform inventory lookups and create sales orders using specific tool configurations.

## What I did
- I connected the DeepSeek Harness to a specific Assistant configuration.
- I configured the connection using a profile file and a remote helper.
- I verified that the AI uses the user's credentials to access Business Central.
- I tested the AI with questions about stock levels and order creation.

## Claims
- The DeepSeek model performs the reasoning while the harness manages the conversation and tools.
  > "The model, DeepSeek, does the thinking."
- The system uses the user's Microsoft sign-in to execute tools on their behalf.
  > "The connection carries the user's Microsoft sign-in, and the server runs every tool as that user."
- The Assistant configuration determines which specific Business Central tools the AI can access.
  > "**The Assistant configuration** from Part 1 decides which Business Central tools the AI is offered."
- The AI successfully identified the stock level and list price for a specific item.
  > "It found the item, read the stock (586) and the list price (192.80) and answered."
- The AI created a sales order but correctly identified that it cannot post the order because no posting tool exists.
  > "It says plainly that the order stays a draft and that it cannot post it."
- The system uses a specific configuration name in the header to determine the tool list.
  > "**The server:** The one named in your header."

## Outcome
I built a system where an AI can interact with Business Central tools using a user's credentials. I proved that the AI can successfully perform complex tasks like creating sales orders based on natural language prompts.

## Caveats
The post does not show how to add a posting tool, which requires a different configuration method.
