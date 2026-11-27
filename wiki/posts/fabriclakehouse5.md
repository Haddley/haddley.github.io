---
type: post
slug: fabriclakehouse5
title: "Microsoft Fabric (Part 5)"
date: "2026-11-28"
part: 5
builds_on: ["fabriclakehouse4", "deepseekharness"]
topics: ["microsoft-fabric", "sql-tools", "data-agents", "model-context-protocol"]
tools: ["Microsoft Fabric", "DeepSeek Harness", "SQL", "Python", "Model Context Protocol"]
status: current
checked: "2026-11-27"
source_hash: "90615147787f"
generated_by: gemma4:12b
---

**Summary.** I gave DeepSeek Harness one small SQL tool over the same AdventureWorks Lakehouse and asked it the two questions that I asked the Fabric data agent in Part 4. Its answers matched my SQL, as the Fabric agent's had, and where a table was missing it said what was missing, where the Fabric agent refused. For one person asking questions over one Lakehouse, I conclude that the harness approach is better.

## What I did
- I loaded the AdventureWorks sample on a free trial and wrote a small SQL tool for DeepSeek Harness.
- I ran the same two questions, with the same tables and instructions as in Part 4, through the harness.
- I tested the system with and without the specific table that links products to categories.
- I compared the harness's answers with my own SQL across twelve runs.

## Claims
- The free trial can hold the whole data layer, so the harness over it needs no F2 capacity.
  > "**The results are the same.** The free trial could not create the Fabric agent, but it can hold the whole data layer, so this part needs no F2."
- With a table missing, the harness gave more useful information than the Fabric agent, in this one case.
  > "That was more useful in this one case."
- The harness matched my manual SQL results for every country total and product answer.
  > "**The same data and the same questions give the same answers.** Every country total and every product answer in the table matched my own SQL."
- The harness used the deepseek-v4-flash model and a custom tool to run select queries.
  > "The harness used `deepseek-v4-flash`, and my own tool, which can run any `SELECT` on the tables in its scope."
- The harness successfully identified the specific missing link in the data instead of just refusing.
  > "The harness gave the five bikes and said that no table links a product to its category, which was the real gap."
- The harness matched the key in all twelve runs.
  > "With the same tables in scope, the harness matched the key in all 12 runs: all six country totals to the cent, and the five Road-150 Red bikes every time."

## Outcome
My conclusion is that for one person asking questions over one Lakehouse, the harness approach is better. With a table missing, it said what was missing where the Fabric agent refused. The Fabric agent was faster and brings governance that I did not rebuild.

## Caveats
I did not track the specific usage costs for the DeepSeek Harness, so I cannot provide a direct cost comparison. I did not run the Fabric agent again in this post.
