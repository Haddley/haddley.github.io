---
type: post
slug: fabriclakehouse5
title: "Microsoft Fabric (Part 5)"
date: "2026-11-28"
part: 5
builds_on: ["fabriclakehouse4"]
topics: ["microsoft-fabric", "copilot-studio", "model-context-protocol", "llm-orchestration"]
tools: ["Microsoft Fabric", "Copilot Studio", "DeepSeek Harness", "SQL"]
status: current
checked: "2026-11-27"
source_hash: "414b7052b06e"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to connect a Fabric data agent to Copilot Studio so that a Copilot agent can use it as a tool. I compare this workflow against a DeepSeek Harness approach in terms of setup complexity, cost, and performance.

## What I did
- I connected a published Fabric data agent to Copilot Studio.
- I configured tool descriptions and instructions to ensure the agent selects the correct tool.
- I asked the Copilot Studio agent three of Microsoft's questions and checked the figures against the Fabric agent and my SQL.
- I compared the Copilot Studio route to the DeepSeek Harness route.
- I compared the setup steps, paid parts and per-question times of the two routes, using Part 6's timings for the harness.

## Claims
- Copilot sees only a tool name and description, and the Fabric agent behind it writes and runs the SQL.
  > "It sees a tool with a name and a description, and the Fabric data agent behind it turns the question into SQL, runs it and returns the answer as a tool result."
- The Copilot agent does not have direct access to the Lakehouse.
  > "The Copilot agent never sees the Lakehouse."
- The Copilot Studio route requires a paid F2 capacity and a Microsoft 365 Copilot license.
  > "**It needs licences.** The prerequisites list a paid F2 or higher capacity, cross-geo AI settings, and a Microsoft 365 Copilot licence for each person who builds agents."
- The results from Copilot Studio matched my SQL calculations.
  > "The figures match the Fabric agent's and my SQL: 9,389,789.94 for the United States, 9,061,000.72 for Australia and so on."
- The Fabric agent was faster than the harness on simple questions.
  > "**Not faster.** The Fabric agent was quicker on most questions: 9 to 16 seconds against 13 to 25 for the harness on the simple ones."
- The harness is the better choice for a single person at a terminal.
  > "So the harness is the better choice for me, at a terminal, over one Lakehouse."

## Outcome
I built a Copilot Studio agent that successfully uses a Fabric data agent as a tool. I concluded that while Copilot Studio offers more features like Teams integration, the harness route is simpler and cheaper for individual use.

## Caveats
I did not check if my specific account had the required Copilot license.
