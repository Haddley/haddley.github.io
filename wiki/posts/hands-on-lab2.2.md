---
type: post
slug: hands-on-lab2.2
title: "Hands-on-Lab 2.2"
date: "2023-11-22"
builds_on: []
topics: [data-migration, configuration-packages, master-data-management, excel-integration]
tools: [Microsoft Dynamics 365 Business Central, Excel]
status: current
checked: "2026-11-05"
source_hash: "7d16839ca88a"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to migrate master data to a new company using configuration packages. I show how to prepare Excel workbooks for non-expert users and ensure all prerequisite data exists before importing.

## What I did
- I created a configuration package for the Vendor table to define specific fields for export and import.
- I cleared default fields to ensure only the necessary data was included in the workbook.
- I created prerequisite records like currencies and regions before performing the import.
- I reviewed the import errors and row counts before applying the package to the system.
- I verified the imported records on the Vendors page.

## Claims
- A configuration package defines which tables and fields to export to Excel and import back.
  > "A: A definition of which tables and fields to export to Excel and import back."
- I cleared the fields because the default selection included more fields than I wanted.
  > "A: By default more fields are included than I wanted."
- I created the currency and region first because the import fails if the values do not exist.
  > "I expect the import to fail or report errors for rows that name values that do not exist yet, so I created them first."
- The package review shows the number of errors before the records are inserted.
  > "The package review at the end shows the number of errors."
- The import process successfully inserted nine records.
  > "In my run, 9 records were inserted."
- I added the currency and the country or region that the vendors needed before the import.
  > "I added the currency and the country or region that the vendors needed before the import."

## Outcome
I built a workflow to migrate vendor data into a new company using configuration packages. I concluded that preparing prerequisite data is essential for a successful import.

## Caveats
The post does not show how to handle complex data transformations during the import process.
