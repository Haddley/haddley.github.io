---
type: post
slug: fabriclakehouse5
title: "Microsoft Fabric (Part 5)"
date: "2026-11-28"
part: 5
builds_on: ["fabriclakehouse4", "deepseekharness"]
topics: ["microsoft-fabric", "sql-tools", "llm-harnesses", "data-engineering"]
tools: ["Microsoft Fabric", "DeepSeek Harness", "Model Context Protocol", "T-SQL", "Python"]
status: current
checked: "2026-11-27"
source_hash: "c955a8bba56c"
generated_by: gemma4:12b
---

**Summary.** I gave DeepSeek Harness one small SQL tool over the same AdventureWorks Lakehouse and asked it the two questions that I asked the Fabric data agent in Part 4. Its answers matched my SQL, as the Fabric agent's had, and where a table was missing it said what was missing, where the Fabric agent refused. For one person asking questions over one Lakehouse, I conclude that the harness approach is better.

## What I did
- I set up a custom coding harness with a small SQL tool to query a Lakehouse.
- I ran the same two questions, with the same tables and instructions as in Part 4, through my harness.
- I compared the harness's results with my own SQL and with the Fabric agent's results from Part 4.
- I looked at how the harness handled a missing table, compared with the Fabric agent's refusals in Part 4.

## Claims
- The harness and the Fabric agent (in Part 4) produced identical answers for the same questions.
  > "**The same data and the same questions give the same answers.** Every country total and every product answer in the table matched my own SQL."
- With a table missing, the harness gave more useful information than the Fabric agent, in this one case.
  > "That was more useful in this one case."
- The free trial can hold the whole data layer, so the harness over it needs no F2 capacity.
  > "**The results are the same.** The free trial could not create the Fabric agent, but it can hold the whole data layer, so this part needs no F2."
- The harness uses a custom tool to run T-SQL select statements.
  > "**run_select** runs one T-SQL `SELECT` and returns at most 25 rows, as the Fabric data agent does."
- The harness uses the DeepSeek-v4-flash model with high reasoning effort.
  > "The model was `deepseek-v4-flash` with high reasoning effort."
- My conclusion is that, for one person asking questions over one Lakehouse, the harness approach is better.
  > "Taken with the rest, my conclusion is that for one person asking questions over one Lakehouse, the harness approach is better."

## Outcome
A small SQL tool let DeepSeek Harness answer the same questions as the Fabric agent in Part 4, on a free trial. With a table missing, it said what was missing and still gave the five bikes. My conclusion is that for one person asking questions over one Lakehouse, the harness approach is better. The Fabric agent was faster and brings governance that I did not rebuild.

## Caveats
I cannot compare the costs of the two systems because I did not review the DeepSeek usage figures. I did not run the Fabric agent again in this post.
