---
type: post
slug: hands-on-lab2.1
title: "Hands-on-Lab 2.1"
date: "2023-11-22"
builds_on: []
topics: [company-setup, data-migration, accounting-periods, configuration-worksheet]
tools: [Microsoft Dynamics 365 Business Central]
status: current
checked: "2026-11-05"
source_hash: "9b4e1eba61c0"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create and configure a new company in Microsoft Dynamics 365 Business Central. I show how to use the Configuration Worksheet to migrate specific tables from another company to populate missing data.

## What I did
- I created a new company using the Production – Setup Data Only option.
- I generated the accounting periods for the new fiscal year.
- I identified missing data in the Zip Codes and Shipment Methods tables.
- I used the Configuration Worksheet to copy specific tables from another company.

## Claims
- The Setup Data Only option provides configuration without transaction history.
  > "That option gives me the setup and leaves out the transactions."
- The Create Year function generates accounting periods based on a specific start date.
  > "A: It creates the accounting periods for a year from the starting date that I give it."
- The Configuration Worksheet allows for the selection of specific tables to copy from another company.
  > "The Configuration Worksheet can copy chosen tables from another company."
- The Configuration Worksheet organizes tables into groups such as Master Data Groups.
  > "The Configuration Worksheet lists groups of tables, such as a Master Data Group."
- The process confirms that the new company contains no zip codes or shipment methods initially.
  > "Create the accounting year, and note that no zip codes or shipment methods exist."

## Outcome
I successfully configured a new company and populated it with necessary master data using the Configuration Worksheet.

## Caveats
The post does not show how to enter unique business data for the specific customer, Contoso Inc.
