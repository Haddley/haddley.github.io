---
type: post
slug: orchestration3
title: "Agent Orchestration (Part 3)"
date: "2026-09-24"
part: 3
builds_on: [orchestration1, orchestration2, langchainagents, langflow1, claudecode9]
topics: [agent-orchestration, human-in-the-loop, a2a-protocol, data-verification]
tools: [LangGraph, Ollama, a2a-registry.org, a2a-sdk, uv, Federal Register API]
status: current
checked: "2026-11-06"
source_hash: "42102b723986"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to orchestrate a remote agent using LangGraph and the A2A protocol. The post shows how to discover an agent via a registry, delegate a task to it, and verify its output against a primary source before human approval.

## What I did
- Found a remote agent in a public registry.
- Built a LangGraph to orchestrate the interaction.
- Implemented a verification step against an official source.
- Added a human-in-the-loop pause for final approval.

## Claims
- The orchestration graph is the primary way to manage dependencies on agents you do not control.
  > "The graph is the point: it shows what an orchestrator is responsible for when it depends on an agent it does not control."
- The remote agent is only involved in the initial data retrieval steps.
  > "Once its reply arrives, the graph works from the official Federal Register record, and the model never talks to the agent at all."
- The agent's value lies in its specific filters and aggregations rather than the raw data.
  > "The agent's value is in its paid tier of filters, up to 100 rows and aggregations, which I did not use."
- The system includes a pause to ensure a human approves the data before an irreversible action.
  > "Pause for human approval before the step that cannot be undone."
- The remote agent is rate limited to twenty calls.
  > "**The remote agent is rate limited.** Its reply reported a limit of 20 calls."
- The verification step ensures the model only sees data that matches the official record.
  > "All three rows matched the official record, so the model saw all three."

## Outcome
I built a robust orchestration pipeline that integrates a remote agent into a local workflow with automated verification and human oversight.

## Caveats
The demonstration does not exercise the full range of task-state branches because the remote agent provided a plain message.
