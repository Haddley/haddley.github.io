---
type: post
slug: addanitem
title: "Add an Item"
date: "2024-02-17"
builds_on: []
topics: [power-apps, business-central, patch-function, virtual-tables]
tools: [Power Apps, Business Central, Copilot, Power Fx]
status: current
checked: "2026-11-05"
source_hash: "9483571b6301"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use a Power Apps canvas app and the Patch function to add items to Business Central. I show how a virtual table allows the app to interact with Business Central data directly without creating duplicate records.

## What I did
- I created a Business Central Item table and a Copilot-generated Item Setup app.
- I added the Business Central Virtual Table as a data source.
- I configured a Publish button using the Patch function to create records.
- I tested the flow by moving an item from a draft state to the live Business Central table.

## Claims
- The Patch function creates a new record in a data source.
  > "A: Patch is a Power Fx function that creates a record in a data source, or changes one that already exists."
- A virtual table allows the app to read and write data without keeping a second copy.
  > "A: A virtual table lets a Power Apps app read and write Business Central data through Dataverse, without keeping a second copy of the data."
- The app still asked for a delete confirmation because I copied the button from the delete function.
  > "A button that I copied from the delete button still asked for a delete confirmation."
- The Item Setup record is removed once the real item exists in Business Central.
  > "The Item Setup record was removed, because the real item now exists in Business Central, but a confirmation that says delete is confusing."
- The Publish button uses the Patch function to create an item in the Business Central Items table.
  > "Here the Publish button uses it to create an item in the Business Central Items table."

## Outcome
I built a canvas app that successfully moves items from a draft setup into the Business Central Items table using the Patch function.

## Caveats
The app still displays a delete confirmation message because of the button duplication method used during development.
