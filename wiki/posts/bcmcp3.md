---
type: post
slug: bcmcp3
title: "Business Central and DeepSeek Harness (Part 3)"
date: "2026-11-18"
part: 3
builds_on: ["bcmcp2", "bcmcp4"]
topics: ["mcp-servers", "business-central", "ai-agents", "documentation-retrieval"]
tools: ["Business Central", "DeepSeek", "Microsoft Learn", "MCP"]
status: current
checked: "2026-11-26"
source_hash: "85efa8195a83"
generated_by: gemma4:12b
---

**Summary.** I added Microsoft Learn as a second MCP server to the Business Central harness. This allows the AI to consult official documentation to understand what actions do before it processes any data.

## What I did
- I added Microsoft Learn as a second MCP server to the profile.
- I configured the harness to use both the Business Central and Learn servers.
- I asked the AI to research an action on Microsoft Learn before applying it to a specific order.
- I verified that the AI correctly distinguished between documentation and live data.

## Claims
- The AI can now access official documentation to understand specific actions.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**."
- The system identifies which tool is providing the information through specific prefixes.
  > "After a restart, the harness has two servers, and the tool names show which is which: `mcp__businesscentral__…` and `mcp__mslearn__…`."
- The AI uses both servers sequentially to provide a complete answer.
  > "It used both, one after the other: Learn for what the action does, Business Central for what is in *this* order."
- The AI correctly identifies that its tools are limited to reading and drafting rather than executing actions.
  > "And it says, in so many words, that it cannot run the action itself: its tools only read and make drafts."
- The AI provides links to the specific documentation pages it used for its summary.
  > "The AI wrote the answer, and it listed the Learn pages it used, so you can open them."
- The AI remains within its tool boundaries and does not change any data in Business Central.
  > "Nothing was changed in Business Central."

## Outcome
I built a system where the AI uses a dedicated documentation server to explain actions before applying those actions to specific company data.

## Caveats
The current setup is for look-and-explain only and does not perform any actual changes in Business Central.
