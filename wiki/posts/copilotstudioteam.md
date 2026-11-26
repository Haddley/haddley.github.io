---
type: post
slug: copilotstudioteam
title: "Building a Team of Agents in Copilot Studio and Handling Clarification"
date: "2026-11-26"
builds_on: ["copilotstudiostl"]
topics: ["multi-agent-orchestration", "prompt-engineering", "copilot-studio", "error-handling"]
tools: ["Copilot Studio", "Microsoft Copilot Harness"]
status: current
checked: "2026-11-26"
source_hash: "55c60b82158c"
generated_by: gemma4:12b
---

**Summary.** I built a multi-agent system in Copilot Studio where a Math Agent delegates tasks to a specialist Addition Agent. I established a shared convention to handle missing information, ensuring the specialist never speaks to the user directly while the primary agent manages the conversation flow.

## What I did
- I built a team of agents to split work into smaller, manageable parts.
- I created a contract between agents using shared instructions to handle missing data.
- I evaluated both agents individually to ensure they followed the logic.
- I rebuilt the system using Microsoft's findings and openQuestions terminology.
- I verified the final system with a series of automated tests.

## Claims
- A team of agents makes instructions easier to manage and test.
  > "Every part is small enough to read, test and change on its own."
- The Addition Agent is designed to never speak to the user directly.
  > "Its instructions tell it not to talk to the user directly."
- The two agents cooperate because both sets of instructions describe the same convention.
  > "The two agents cooperate because both sets of instructions describe the same convention."
- The first version of the Addition Agent passed its own evaluation.
  > "I read the totals myself, and each one is correct."
- The final version of both agents passed all ten generated conversations.
  > "**Both passed all ten.** The Addition Agent2 run took 4 minutes 36 seconds and used 31 credits, and the Math Agent2 run took 6 minutes 13 seconds and used 59 credits."
- Both agents passed every conversation after I switched to findings and openQuestions, but I could not isolate which change mattered.
  > "After I switched to `findings`, which is empty when a value is missing, both passed."

## Outcome
I built a robust multi-agent system where a primary agent manages user interaction and a specialist agent handles calculations. The system successfully handles missing data through a shared communication convention.

## Caveats
The test results do not prove that the internal loop follows the contract perfectly, only that the final output appears relevant to the user.
