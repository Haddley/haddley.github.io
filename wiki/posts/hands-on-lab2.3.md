---
type: post
slug: hands-on-lab2.3
title: "Hands-on-Lab 2.3"
date: "2023-12-04"
builds_on: []
topics: [dimension-setup, data-validation, ledger-analysis, business-central-configuration]
tools: [Microsoft Dynamics 365 Business Central]
status: current
checked: "2026-11-05"
source_hash: "eed34bb69301"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to set up dimensions to organize and analyze ledger entries by specific categories like salesperson and customer group. I also show how to enforce data entry rules and restrict specific combinations of values.

## What I did
- I created the SALESPERSON_NEWLIST and CUSTOMERGROUP dimensions.
- I configured the default dimension rules to make certain fields mandatory.
- I set the dimension combination to Limited to restrict specific value pairs.
- I added specific values to the dimensions before blocking combinations.

## Claims
- Dimensions allow for the analysis of ledger entries in multiple ways.
  > "A: A label that I attach to ledger entries so I can analyze them in more than one way."
- The Code Mandatory setting ensures a dimension value is required for a specific table.
  > "Code Mandatory makes a dimension value required for a table."
- Setting a combination to Limited allows for the blocking of specific pairs of values.
  > "Setting a combination to Limited lets me block particular pairs of values."
- Values must exist in the system before they can be combined or blocked.
  > "The values have to exist before they can be combined or blocked."
- I created specific dimensions so the company can report sales by salesperson and customer group.
  > "I created SALESPERSON_NEWLIST and CUSTOMERGROUP, so Contoso can report sales by salesperson and by customer group."

## Outcome
I built a dimension structure that ensures data integrity and allows for detailed reporting. I concluded that mandatory codes and limited combinations are essential for controlling user input.

## Caveats
The post does not show the specific results of the system error messages when a user attempts to post a blocked combination.
