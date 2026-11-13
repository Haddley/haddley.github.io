---
type: post
slug: addapurchaseorder
title: "Add a Purchase Order"
date: "2024-02-21"
builds_on: []
topics: [purchase-orders, patch-function, collections, business-central-integration]
tools: [Power Apps, Business Central, Patch]
status: current
checked: "2026-11-05"
source_hash: "e642c6bcc3ad"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a Business Central Purchase Order and its associated lines using the Patch function. I show how to manage the relationship between a header and its lines by using a collection to store the result.

## What I did
- I added input controls for the vendor, item, and comments.
- I wrote the OnSelect code to create the purchase order header.
- I used a collection to store the result of the creation.
- I added logic to create both comment lines and item lines.
- I verified the results in Business Central after each step.

## Claims
- A purchase order consists of a header and specific lines.
  > "A purchase order has a header, which says who it is for, and lines, which say what is being ordered."
- The Create button stores the result in a collection to hold the new row.
  > "A: The Create button stores the result in a collection, and the collection held the single new row."
- The header must exist before the application can add lines to it.
  > "Create a Purchase Order comes first, because the lines belong to a purchase order that has to exist."
- The Patch function created the order and the lines using the same pattern.
  > "Patch created the purchase order, and the same pattern added a comment line and an item line."
- I verified the data in Business Central after every step.
  > "I checked the result in Business Central after each step."

## Outcome
I built an app that creates a purchase order header and adds both comment and item lines. I proved that using a collection allows the app to link lines to the correct header.

## Caveats
The post does not show the specific configuration of the Business Central tables.
