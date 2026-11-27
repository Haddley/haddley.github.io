---
type: post
slug: fabriclakehouse6
title: "Microsoft Fabric (Part 6)"
date: "2026-11-28"
part: 6
builds_on: ["fabriclakehouse4", "fabriclakehouse5", "deepseekharness"]
topics: ["microsoft-fabric", "model-context-protocol", "sql-generation", "llm-evaluation"]
tools: ["Microsoft Fabric", "DeepSeek", "Python", "Model Context Protocol", "SQL"]
status: current
checked: "2026-11-27"
source_hash: "f75c179b9a22"
generated_by: gemma4:12b
---

**Summary.** I compared the performance of a custom DeepSeek Harness against the official Microsoft Fabric data agent using the AdventureWorks dataset. I found that the harness matched my SQL on every question with a right answer, and that the two systems gave different answers where a question is ambiguous or has no data answer.

## What I did
- I set up a Lakehouse and a SQL endpoint on a free trial capacity.
- I built a custom MCP server with four tools to handle T-SQL queries.
- I ran 48 sessions comparing the harness against the Fabric agent.
- I analyzed the differences in how each system handled ambiguous instructions and complex data analysis.

## Claims
- The harness matched my SQL for every question that had a single correct answer.
  > "On the questions with a right answer, the harness matched my SQL in every run."
- The Fabric agent refused certain questions due to instruction constraints that the harness ignored.
  > "**The tutorial's instructions did not stop the harness.** It treated them as advice and looked at the data."
- The harness took significantly longer to process open-ended questions compared to the Fabric agent.
  > "**The harness took far longer on the open-ended question.** Question 7 took 204 to 419 seconds, against 46 to 68 for the Fabric agent."
- The harness successfully identified that certain data was missing rather than inventing figures.
  > "Question 3, California in 2023, found that the sales tables end in January 2014 and reported no sales, without inventing a figure."
- The harness did not treat the tutorial instructions as a boundary for its capabilities.
  > "The harness did not treat the tutorial's instructions as a boundary, and the Fabric agent did."
- The harness used a shell to perform complex analysis on CSV files.
  > "The question 7 runs used the shell heavily: 26 shell calls in run A2 and 25 in A3, mostly Python over the CSV files that `export_query` wrote."

## Outcome
I built a custom MCP-based harness that gave the same answers as the Fabric agent on questions with a right answer, and different behaviour on ambiguous and open-ended ones.

## Caveats
I do not know which specific model the Fabric data agent uses for its internal processing.
