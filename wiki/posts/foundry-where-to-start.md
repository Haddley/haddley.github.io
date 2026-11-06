---
type: post
slug: foundry-where-to-start
title: "Where to start in Microsoft Foundry"
date: "2026-10-31"
builds_on: [mcpserver, orchestration3, azurefoundryagent5, azurefoundryagent2, azurefoundryagent4]
topics: [agent-architecture, microsoft-foundry, open-protocols, learning-paths]
tools: [Microsoft Foundry, MCP, A2A, OpenTelemetry, Agent Framework, LangGraph]
status: current
checked: "2026-11-05"
source_hash: "47bb2aad323b"
generated_by: gemma4:12b
---

**Summary.** I provide a high-level overview of Microsoft Foundry for agents, distinguishing between open cross-platform standards and Microsoft-specific infrastructure. I outline a recommended learning path and identify which features are being retired.

## What I did
- I analyzed the distinction between open protocols and Microsoft's proprietary plumbing.
- I identified the core components of the Foundry ecosystem.
- I mapped out a specific learning path for new users.
- I evaluated the current state of A2A and MCP integrations.
- I identified upcoming changes and retiring features.

## Claims
- I recommend keeping core logic in open layers to ensure portability.
  > "So I would put the valuable logic in the open layer, and let Foundry carry the plumbing."
- I found that the A2A protocol is an open standard with multiple partners.
  > "A2A is Apache 2.0, and I found it lives under its own `a2aproject` organisation, with Google Cloud among the partners it names."
- I identified a specific Microsoft Learn path as the best starting point.
  > "The best single thing I found is a Microsoft Learn path, Develop AI agents on Azure."
- I noted that some features like workflows are being retired in 2026.
  > "Module 6 teaches workflows, and they retire on 1 December 2026."
- I observed that the A2A tool presents remote agents as tools to the model.
  > "But to the model in the middle, I present it as a tool."
- I found that the Foundry IQ module's tool snippet requires a project connection.
  > "In Part 5 I found that the Foundry IQ module's tool snippet fails with a 401 unless you add a project connection."

## Outcome
I concluded that the best strategy is to build with open protocols and let Foundry handle the hosting and identity plumbing. I established a clear roadmap for learners to navigate the platform effectively.

## Caveats
I did not confirm the specific version of the MCP specification that Foundry supports.
