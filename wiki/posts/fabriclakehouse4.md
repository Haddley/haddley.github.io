---
type: post
slug: fabriclakehouse4
title: "Microsoft Fabric (Part 4)"
date: "2026-11-28"
part: 4
builds_on: ["fabriclakehouse", "fabriclakehouse2", "fabriclakehouse3"]
topics: ["microsoft-fabric", "data-agents", "sql-verification", "azure-capacity-management"]
tools: ["Microsoft Fabric", "Azure", "SQL", "PySpark", "OneLake"]
status: current
checked: "2026-11-27"
source_hash: "5fbbcb31fdd3"
generated_by: gemma4:12b
---

**Summary.** I followed a Microsoft tutorial to build a Fabric data agent using the AdventureWorks dataset. I encountered issues with trial limitations and agent refusals, but I successfully verified the agent's accuracy against my own SQL queries.

## What I did
- I obtained a paid F2 capacity to bypass trial limitations.
- I loaded the AdventureWorks tables into a Lakehouse using a notebook.
- I configured a data agent with specific instructions and selected tables.
- I tested the agent with custom questions and verified the results with SQL.
- I ticked the missing table and rewrote the instructions to cover all the tables.

## Claims
- The free trial did not allow me to create a data agent.
  > "I tried to do this on my free trial first, and it did not work."
- I used a specific region to secure the necessary capacity.
  > "I used Sweden Central, which had 16."
- The notebook screen can appear frozen even when the data load is still active.
  > "So the work was finished and the screen was stale."
- The instructions that I pasted named only three tables, although I had selected ten.
  > "**The instructions named only three tables**, but I had selected ten."
- I ticked the missing join table and rewrote the instructions before asking again.
  > "I ticked `dimproductsubcategory` and rewrote the instructions to describe all ten tables, with the join from product to subcategory to category."
- The agent's final answers matched my SQL results exactly.
  > "My SQL check agreed: the five rows it returned all have the highest list price I saw, 3,578.27, and all are Road-150 Red bikes in the Bikes category."

## Outcome
I built a Fabric data agent that refused my product question three times and then answered it correctly after I changed its setup. Its answers matched my own SQL where I checked them.

## Caveats
I did not test the changes to the agent one at a time, so I cannot say which specific modification fixed the refusal issue.
