---
type: post
slug: deepseekharnessbusinesscentral
title: "Connecting DeepSeek Harness to Business Central"
date: "2026-11-13"
builds_on: ["deepseekharnessaccounting", "businesscentralmcpclaudecode", "deepseekharness", "deepseekharnessollama", "deepseekharnesshybrid"]
topics: ["model-context-protocol", "business-central-integration", "app-registration", "configuration-management", "read-only-access"]
tools: ["DeepSeek Harness", "Business Central", "Entra App", "Claude Code", "Microsoft Learn MCP server"]
status: current
checked: "2026-11-14"
source_hash: "02aaddcc52fa"
generated_by: qwen2.5:14b
---

**Summary.** This post details the process of connecting DeepSeek Harness to Business Central's Model Context Protocol (MCP) server, including the challenges faced with a deleted app registration and the inefficiency of a full configuration with 414 tools. It concludes with a successful read-only configuration and a draft configuration that creates unposted credit memos in a fresh Sandbox environment.

## What I did
- Connected DeepSeek Harness to Business Central's MCP server
- Resolved issues with a deleted app registration and 414 tools
- Created a read-only configuration and a draft configuration in a Sandbox

## Claims
- A deleted app registration cannot be restored after 30 days.
  > "**The app registration had been deleted.** The sign-in failed with Microsoft's error AADSTS700016, which says the application was not found in the directory."
- A full configuration with 414 tools is inefficient and breaks the harness.
  > "The harness gave up on it, so the harness had no tools at all."
- A read-only configuration with a small set of objects works efficiently.
  > "It called `List_Vendors_PAG30010` through the MCP connection and returned all seven vendors with their balances, the same as in the web client, in 24 seconds."
- Creating and modifying documents requires a separate configuration with specific permissions.
  > "I did not end up using them: I moved the vendor dispute to a fresh Sandbox, and rebuilt a single configuration there (the next section)."
- Adding a new Sandbox environment requires rebuilding the MCP configurations.
  > "For the second run of the vendor dispute I wanted a clean company that I had made on purpose, so I created a new **Sandbox** environment in the Business Central admin center."

## Outcome
I successfully connected DeepSeek Harness to Business Central's MCP server, creating a read-only configuration and a draft configuration that allows for the creation of unposted credit memos in a fresh Sandbox environment.

## Caveats
This post does not cover the full setup of the MCP server or the Entra app registration process.
