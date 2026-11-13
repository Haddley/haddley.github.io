---
type: post
slug: modeldrivenpurchaseorders
title: "Model Driven Purchase Orders"
date: "2024-03-02"
builds_on: []
topics: [model-driven-apps, business-central-integration, quick-view-forms, virtual-tables]
tools: [Power Platform, Business Central, Dataverse, Power Apps]
status: current
checked: "2026-11-06"
source_hash: "dc375c008e42"
generated_by: gemma4:12b
---

**Summary.** I built a Power Platform Model Driven application to manage Business Central Purchase Orders. I demonstrated how to configure virtual tables, establish relationships, and use Quick View forms to display vendor details.

## What I did
- I configured the Business Central Configuration app to make specific tables visible in Dataverse.
- I established relationships between purchase orders, lines, and vendors.
- I created a model-driven app with a custom view and form.
- I added a Quick View form to display vendor information directly on the purchase order form.

## Claims
- The Business Central Configuration app requires an environment and company name to list tables.
  > "A: It did not yet know which Business Central environment and company to use."
- Setting the Visible value to Yes determines which tables appear in Dataverse.
  > "A: It decides which Business Central tables appear in Dataverse."
- Making tables visible automatically creates the necessary relationships between them.
  > "Making the tables visible also created relationships between them."
- A purchase order requires a vendor before the system allows it to be saved.
  > "My first attempt to save a new purchase order failed, because a purchase order needs at least a vendor."
- A Quick View form displays read-only information from a related record.
  > "A: A small read-only form from a related record, shown inside another form."
- The Quick View form allows a user to see vendor details without leaving the purchase order form.
  > "On the purchase order I used one to show the vendor's number and address, so a user can see who the order is for without leaving the form."

## Outcome
I built a model-driven app that allows users to create purchase orders and view vendor details in a single view. The solution successfully integrates Business Central data with a custom Power Apps interface.

## Caveats
The post does not detail the specific internal logic of the Business Central Virtual Table app's underlying sync process.
