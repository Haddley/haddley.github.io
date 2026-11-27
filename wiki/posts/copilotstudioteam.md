---
type: post
slug: copilotstudioteam
title: "Building a Team of Agents in Copilot Studio and Handling Clarification"
date: "2026-11-26"
builds_on: ["copilotstudiostl"]
topics: ["multi-agent-orchestration", "copilot-studio", "prompt-engineering", "error-handling"]
tools: ["Copilot Studio", "Microsoft Copilot Harness"]
status: current
checked: "2026-11-26"
source_hash: "05a09f059c9a"
generated_by: gemma4:12b
---

**Summary.** I built a multi-agent system in Copilot Studio where a Math Agent delegates tasks to a specialist Addition Agent. I established a shared convention to handle missing information, ensuring the specialist never speaks to the user directly while the primary agent manages the conversation flow.

## What I did
- I built a team of agents to split work into smaller, manageable pieces.
- I established a shared convention between agents to handle missing or ambiguous data.
- I evaluated both agents individually to ensure they followed the logic of the contract.
- I rebuilt the system using Microsoft's findings and openQuestions outputs.

## Claims
- A team of agents makes instructions easier to manage because each agent has a narrow job.
  > "Every part is small enough to read, test and change on its own."
- I required the Addition Agent to return a structured request instead of talking to the user.
  > "Return a structured request instead."
- The two agents cooperate because both sets of instructions describe the same convention.
  > "The two agents cooperate because both sets of instructions describe the same convention."
- The Addition Agent's first evaluation used 37 credits.
  > "A: The results page showed 37 credits."
- The Math Agent passed its evaluation using 61 credits over ten conversations.
  > "It took 6 minutes 28 seconds, used 61 credits, and all ten passed."
- I used the findings and openQuestions fields to structure the data between agents.
  > "I wrote the two names into both agents' instructions, as a JSON report that the Addition Agent2 returns and the Math Agent2 reads."
- Both agents passed all ten tests in the final version of the build.
  > "**Both passed all ten.** The Addition Agent2 run took 4 minutes 36 seconds and used 31 credits, and the Math Agent2 run took 6 minutes 13 seconds and used 59 credits."

## Outcome
I built a multi-agent system where a primary agent manages user interaction while a specialist agent handles specific calculations. The system successfully handles missing data through a shared communication convention.

## Caveats
The test results for the first version of the system were not compared directly to the second version because the test sets were different.
