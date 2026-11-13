---
type: post
slug: customtvirtualtables
title: "Custom Virtual Tables"
date: "2024-05-07"
builds_on: []
topics: [virtual-tables, business-central-integration, dataverse-integration, custom-table-extension]
tools: [Business Central, Power Platform, Dataverse, Power Apps, AL Language]
status: current
checked: "2026-11-05"
source_hash: "736babe88e94"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to expose custom Business Central tables as Power Platform Dataverse Virtual Tables. I show that you can use these tables in Power Apps without duplicating data into Dataverse.

## What I did
- I created two related Business Central tables for car brands and models.
- I created list pages to enter data directly into Business Central.
- I configured the tables to appear in the Business Central Configuration app.
- I exposed the tables as virtual tables in Dataverse.
- I verified the data flow by updating records in a model-driven app.

## Claims
- I connected two Business Central tables to Dataverse as virtual tables.
  > "I created two related Business Central tables and connected to them as Power Platform Dataverse Virtual Tables."
- The list pages provide a way to enter data into the Business Central system.
  > "A: The Car Brand List and Car Model List pages gave me a way to type in the data in Business Central."
- The code sets ValidateTableRelation to false to manage the relationship.
  > "The code sets ValidateTableRelation to false, and notes a blog post that explains why."
- Both tables use the CustomerContent data classification.
  > "Both tables use the CustomerContent data classification."
- Custom Business Central tables can be exposed to Dataverse as virtual tables.
  > "Custom Business Central tables can be exposed to Dataverse as virtual tables."
- A model-driven app allowed me to update a record in the Car Model table.
  > "A model-driven app showed both tables and let me update a Car Model."

## Outcome
I built a system where custom Business Central tables are accessible in a model-driven app as virtual tables. I concluded that this method allows users to edit data in Power Apps while the data remains in Business Central.

## Caveats
The post does not detail the specific technical reasons why ValidateTableRelation is set to false.
