---
type: post
slug: azurefoundryagent5
title: "Azure Foundry Agent (Part 4)"
date: "2026-10-28"
part: 4
builds_on: [orchestration1, azurefoundryagent4]
topics: [agent-orchestration, agent-to-agent-protocol, llm-cost-optimization, microsoft-foundry]
tools: [Microsoft Foundry, Agent2Agent protocol, LangChain, Azure]
status: current
checked: "2026-11-05"
source_hash: "a2556846e25d"
generated_by: gemma4:12b
---

**Summary.** I built a supervisor agent in Microsoft Foundry that coordinates six specialist agents using the Agent2Agent protocol. I tested whether these specialists could identify missing information and request it from the user, comparing the results against a previous LangChain implementation.

## What I did
- I built a supervisor agent to route questions to six specialized agents.
- I implemented the Agent2Agent protocol to facilitate communication between agents.
- I tested the ability of specialists to identify missing facts using different reasoning efforts.
- I compared the performance, cost, and accuracy of the Foundry supervisor against a flat agent and a LangChain supervisor.

## Claims
- Specialists successfully identified missing facts when I set the reasoning effort to high.
  > "At high effort they asked on 9 of 12 in one run and 8 of 12 in another, and on 5 of the 11 follow-up turns, where LangChain's specialists asked on all 11."
- The supervisor design used significantly fewer tokens than a flat agent design.
  > "The supervisor's own usage was 195,540 input tokens for 62 questions, against 2,174,855 for the flat agent, but that number leaves out the specialists."
- The supervisor design was faster and used about a quarter of the tokens of the flat agent.
  > "The supervisor used about a quarter of the tokens and was faster."
- The flat agent was more accurate than the supervisor on single-turn questions.
  > "For the 62 single-turn questions, the single agent that held all six documents was more accurate than my supervisor on every check I ran, and it needed no routing."
- A specific technical issue causes the A2A reply to be an empty task when a specialist asks a question.
  > "**The `ask_user` question has one missing piece over A2A.** The specialist asks correctly, but the A2A reply is an empty completed task."
- The supervisor design is the better choice if documents are too large for one prompt or if cost is a primary concern.
  > "If the documents did not fit in one prompt, or if the cost mattered more than the last six answers, the supervisor would be the answer."

## Outcome
I built a multi-agent system in Microsoft Foundry that successfully routes queries and manages specialized knowledge. I concluded that while the supervisor is more efficient and cost-effective, a flat agent remains more accurate for small sets of documents.

## Caveats
I cannot say if the empty task issue during A2A function calls is an intentional limitation or a bug in the current implementation.
