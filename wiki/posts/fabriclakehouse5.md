---
type: post
slug: fabriclakehouse5
title: "Microsoft Fabric (Part 5)"
date: "2026-11-28"
part: 5
builds_on: ["fabriclakehouse4", "deepseekharness"]
topics: ["microsoft-fabric", "model-context-protocol", "sql-tooling", "data-agents"]
tools: ["Microsoft Fabric", "DeepSeek Harness", "Model Context Protocol", "T-SQL", "Python"]
status: current
checked: "2026-11-27"
source_hash: "f5dd3fe9f081"
generated_by: gemma4:12b
---

**Summary.** I gave DeepSeek Harness one small SQL tool over the same AdventureWorks Lakehouse and asked it the two questions that I asked the Fabric data agent in Part 4. Its answers matched my SQL, as the Fabric agent's had, and where a table was missing it said what was missing, where the Fabric agent had refused.

## What I did
- I set up a custom harness with a small SQL tool to query the AdventureWorks dataset.
- I ran the same two questions, with the same tables and instructions as in Part 4, through my harness.
- I compared the results of 12 runs to check for consistency and accuracy.
- I looked at how the harness handled a missing table, and compared it with the Fabric agent's refusals in Part 4.

## Claims
- The harness and the Fabric agent (in Part 4) produced identical answers for the same questions.
  > "**The same data and the same questions give the same answers.** Every country total and every product answer in the table matched my own SQL."
- The harness provided more helpful feedback than the Fabric agent when a table was missing.
  > "Where I left out the table that links products to categories, the Fabric agent refused, and the harness gave the five bikes and said what was missing."
- The free trial can hold the whole data layer, so the harness over it needs no F2 capacity.
  > "**The results are the same.** The free trial could not create the Fabric agent, but it can hold the whole data layer, so this part needs no F2."
- The harness uses a small MCP server with three tools to list tables, describe a table and run a select.
  > "It has no Fabric tool, so I wrote a small MCP server with three tools:"
- The harness uses the Model Context Protocol to communicate with the data.
  > "DeepSeek Harness can call tools that speak the Model Context Protocol (MCP)."
- The harness matches the Fabric agent's behavior of limiting results to 25 rows.
  > "**run_select** runs one T-SQL `SELECT` and returns at most 25 rows, as the Fabric data agent does."

## Outcome
A small SQL tool let DeepSeek Harness answer the same questions as the Fabric agent in Part 4, on a free trial. With a table missing, it said what was missing and still gave the five bikes.

## Caveats
I cannot compare the cost of the two systems because I did not track the usage costs for the DeepSeek model. I did not run the Fabric agent again in this post.
