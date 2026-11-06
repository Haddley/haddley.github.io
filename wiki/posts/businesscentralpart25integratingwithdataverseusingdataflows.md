---
type: post
slug: businesscentralpart25integratingwithdataverseusingdataflows
title: "Business Central (Part 4)"
date: "2024-12-01"
part: 4
builds_on: []
topics: [business-central-integration, dataverse-dataflows, odata-web-services, data-synchronization]
tools: [Business Central, Dataverse, Power Apps, OData]
status: current
checked: "2026-11-05"
source_hash: "f0f2944f01ef"
generated_by: gemma4:12b
---

**Summary.** I demonstrate two different methods for integrating Business Central data into Dataverse. I show how to use the Business Central virtual table app for standard records and Dataflows with OData for custom data.

## What I did
- I set up a connection and installed the Business Central virtual table app to sync contacts and customers.
- I created a Dataflow to copy Employee records into a Dataverse table using the OData connector.
- I configured a Key on the destination table to ensure the Dataflow updates existing records instead of creating duplicates.
- I published a custom page as a web service in Business Central to generate an OData V4 URL.

## Claims
- I used a solution to keep all project components in one place.
  > "I wanted everything for this walkthrough in one place, and at the end I added the Dataflow to it."
- I reset my environment to ensure a clean Dataverse environment for the integration.
  > "A: I wanted a clean Dataverse environment to connect to, so that I could see exactly what the integration added."
- A Key on the table allows the dataflow to update existing rows during a refresh.
  > "With a key, the dataflow can match each incoming employee to a row that already exists, and update it instead."
- OData is a standard way to read data from a web address with a self-describing model.
  > "A: OData is a standard way to read data from a web address, with a self-describing model."
- A page must be published as a web service before it has an OData V4 URL.
  > "A page must be published as a web service before it has an OData V4 URL."
- I removed the https prefix when pasting the OData URL into the connection box.
  > "As the caption says, I removed the https:// prefix when I pasted the OData V4 URL into the connection box."

## Outcome
I built a system that syncs both standard and custom records from Business Central to Dataverse using both virtual tables and Dataflows.

## Caveats
The post does not show how to handle complex data transformations beyond basic mapping in the Dataflow.
