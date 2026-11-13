---
type: post
slug: modeldrivenpurchaseorderlines
title: "Model Driven Purchase Order Lines"
date: "2024-03-03"
builds_on: []
topics: [model-driven-apps, business-central-integration, subgrid-configuration, data-relationships]
tools: [Power Platform, Business Central, Model Driven App]
status: current
checked: "2026-11-05"
source_hash: "42b54d5850a3"
generated_by: gemma4:12b
---

**Summary.** I built a Power Platform Model Driven application to manage Business Central Purchase Order Lines. I demonstrated how to correctly link lines to orders using Document IDs and how to configure the Item table to enable lookups.

## What I did
- I created a Model Driven application for Purchase Order Lines.
- I added a subgrid to the Purchase Order form to display related lines.
- I resolved a saving error by adding the Document Id field to the form.
- I configured the Item table to create a many-to-one relationship for lookups.
- I verified that Business Central generates the Line Object No. for item lines.

## Claims
- The application allows users to see and add lines directly from the purchase order form.
  > "A purchase order form should show all of its lines, and a user should be able to add a line from there."
- The Document Id field is necessary to link a line to its specific purchase order.
  > "It links the line to its purchase order."
- The error stopped once I added the Document Id to the form.
  > "The error stopped once I added the Document Id to the form."
- The Item table visibility created a many-to-one relationship for item lookups.
  > "That created a many-to-one relationship from the Purchase Order Line table to Item."
- Business Central generates the Line Object No. when I saved an item line.
  > "Business Central generated the Line Object No. when I saved an item line."
- I hid the labels because the grid is clear without a heading.
  > "The grid is clear without a heading, so I hid the labels."

## Outcome
I built a functional system where users can manage purchase order lines with automatic lookups and correct data linking.

## Caveats
The post does not show the specific configuration for every possible line type beyond the examples provided.
