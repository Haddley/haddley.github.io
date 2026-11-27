---
type: post
slug: fabriclakehouse
title: "Microsoft Fabric (Part 1)"
date: "2026-11-27"
part: 1
builds_on: []
topics: ["microsoft-fabric", "delta-lake", "sql-analytics", "pyspark-notebooks", "data-integration"]
tools: ["Microsoft Fabric", "SQL analytics endpoint", "PySpark", "OneLake", "Power BI"]
status: current
checked: "2026-11-27"
source_hash: "6834e39e856a"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to move a single data file through the Microsoft Fabric ecosystem to create a usable Lakehouse. I show how the same Delta table can be accessed by both SQL and PySpark engines to produce consistent results.

## What I did
- I created a Lakehouse and uploaded a sales CSV file.
- I converted the CSV into a Delta table to establish consistent data types.
- I queried the data using a SQL analytics endpoint.
- I used a PySpark notebook to visualize the data with a chart.

## Claims
- I used a specific dataset of 200 sales orders for the tutorial.
  > "I used a small file of 200 sales orders from January to June 2026."
- The Load to Tables process creates a Delta table consisting of Parquet files and a transaction log.
  > "It is a folder in OneLake that holds the data as Parquet files, plus a transaction log that records every change made to the table."
- The SQL query results matched the original CSV data exactly.
  > "I checked these figures against the CSV with a short Python script on my Mac, and they matched exactly."
- A lingering Spark session in the Monitor hub can prevent a notebook from running.
  > "The table had loaded, but that Spark session had not ended."
- Fabric provides a unified platform where multiple engines read the same open format.
  > "Because the format is open, every Fabric engine reads the same table: the SQL analytics endpoint, a Spark notebook and Power BI."
- Fabric does not automatically correct errors in the underlying data.
  > "A: It does not make the data right."

## Outcome
I built a functional Lakehouse where a single data load serves both SQL and Spark environments. I concluded that Fabric simplifies the plumbing between different analytics engines by using a shared open format.

## Caveats
I did not test the integration of AI agents or the full capabilities of the Power BI semantic model in this post.
