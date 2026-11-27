---
type: post
slug: fabriclakehouse2
title: "Microsoft Fabric (Part 2)"
date: "2026-11-27"
part: 2
builds_on: ["fabriclakehouse"]
topics: ["data-integration", "dataverse-sync", "fabric-lakehouse", "sql-analytics-endpoint", "spark-notebooks"]
tools: ["Microsoft Fabric", "Dataverse", "Power Apps", "SQL Analytics Endpoint", "Spark", "OneLake"]
status: current
checked: "2026-11-27"
source_hash: "a4de2e6fbfb0"
generated_by: gemma4:12b
---

**Summary.** I explored using the Link to Fabric feature to connect a Dataverse table to a Fabric Lakehouse instead of building a manual pipeline. I found that while data usually syncs quickly, the SQL endpoint can lag behind the Lakehouse, and choice columns require joining with metadata tables to show labels.

## What I did
- I created a Dataverse table from a CSV file using the AI importer.
- I linked the Dataverse table to a Fabric Lakehouse using the Link to Fabric wizard.
- I timed the synchronization of new rows and edited rows to the Lakehouse.
- I queried the data using both the SQL analytics endpoint and a Spark notebook.
- I joined the results with metadata tables to resolve choice column labels.

## Claims
- Link to Fabric removes the need to build a manual data pipeline.
  > "This time I put the same 200 sales orders into a Dataverse table and linked that table to Fabric with **Link to Fabric**, so that I build no pipeline."
- Data usually reaches the lake within seconds, but some edits can take much longer.
  > "**Dataverse to the lake** took 22 seconds for a new row and about 18 minutes for an edit."
- The SQL analytics endpoint may show older data than the Lakehouse preview.
  > "In my run, the preview showed the new row before the SQL endpoint did."
- Choice columns appear as numbers in Fabric and require a join with metadata to see labels.
  > "**The AI importer renames columns and creates choice columns.** In Fabric, a choice column shows as a number, and `OptionsetMetadata` holds the labels."
- Spark notebooks require the plain table name rather than the dbo prefix.
  > "**A notebook reads the linked table like any other.** In Spark I used the plain table name, not `dbo.` plus the name."
- Link to Fabric uses a synced Delta copy in Dataverse storage rather than a live feed.
  > "Dataverse keeps a synced Delta copy of the table, and the Lakehouse reaches that copy through a shortcut."

## Outcome
I built a system where Dataverse data is automatically synced to a Fabric Lakehouse. I concluded that while the link is efficient, users must account for potential SQL endpoint lag and metadata mapping for choice columns.

## Caveats
I only have one example of a slow sync and one of a fast sync, so I cannot confirm if these are consistent patterns.
