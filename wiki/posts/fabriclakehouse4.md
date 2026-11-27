---
type: post
slug: fabriclakehouse4
title: "Microsoft Fabric (Part 4)"
date: "2026-11-28"
part: 4
builds_on: ["fabriclakehouse", "fabriclakehouse2", "fabriclakehouse3"]
topics: ["microsoft-fabric", "data-agents", "sql-generation", "mcp-integration"]
tools: ["Microsoft Fabric", "Azure", "SQL", "Model Context Protocol", "Azure CLI"]
status: current
checked: "2026-11-27"
source_hash: "b12eb34b9505"
generated_by: gemma4:12b
---

**Summary.** I followed the Microsoft tutorial to build a Fabric data agent over the AdventureWorks dataset. I tested the agent's performance across two different configurations to see how specific instructions and example queries affect the accuracy of its SQL generation.

## What I did
- I provisioned an F2 capacity to host the Fabric data agent.
- I loaded the AdventureWorks tables into a new Lakehouse.
- I created and configured a data agent with two different sets of instructions.
- I compared the agent's SQL outputs against my own manual SQL queries.
- I published the agent and called it via the Model Context Protocol.

## Claims
- The free trial of Fabric cannot create the capacity required for a data agent.
  > "A data agent needs a paid F2 capacity, and the free trial could not create one."
- The agent refused to answer questions about products because the initial instructions only named three tables.
  > "The agent had `dimproduct` ticked, but my instructions named only three tables, and it behaved as though those were all it had."
- The agent provided a confident but incorrect answer for the zip code question in Round B.
  > "It was fluent, confident and wrong."
- The agent's results for questions 3 and 4 improved after I updated the instructions.
  > "Questions 3 and 4 are fixed by the corrected instructions."
- The agent's monthly and year-to-date figures matched my own SQL.
  > "My SQL for the tutorial's own example gave the same figures, for example 43,421.04 for December 2010 and 16,351,550.34 as the 2013 year-to-date total."
- The agent's results for question 8 matched my SQL exactly.
  > "Where an answer was checkable (question 8, and the top of question 5) it matched my SQL exactly."

## Outcome
I built a functional Fabric data agent and discovered that specific instruction tuning significantly impacts the reliability of the generated SQL.

## Caveats
I cannot isolate which specific change caused the shift in results for question 1 because I modified four settings at once.
