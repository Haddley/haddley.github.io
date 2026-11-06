---
type: post
slug: powerpages2
title: "Power Pages (Part 2)"
date: "2024-12-20"
part: 2
builds_on: []
topics: [power-pages, form-metadata, table-permissions, navigation-logic]
tools: [Power Pages, Dataverse, Basic Form Metadata]
status: current
checked: "2026-11-06"
source_hash: "92cb64ab6ed7"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to enable customers to view, create, and edit their own orders within a Power Pages portal. I implement specific security permissions, form metadata, and URL parameters to ensure data is correctly associated with the correct account.

## What I did
- I configured table permissions and views to grant authenticated users access to customer orders.
- I used Basic Form Metadata to automatically populate the account field for new orders.
- I configured the On Success settings to redirect users to the correct edit page.
- I verified that the portal correctly displays and updates records for the logged-in user.

## Claims
- I used an Autonumber for the name column so customers do not have to invent a name for an order.
  > "A: A customer should not have to invent a name for an order."
- I used Basic Form Metadata to ensure the portal fills in the account for the customer.
  > "When a customer submits the form, the portal fills in the Account for them, so they never have to choose it."
- The portal list only shows orders that have a matching account value.
  > "The portal list shows a customer's own orders, so an order with no Account has nothing to match."
- The edit page identifies the correct record because the URL includes the unique order ID.
  > "A: The edit page's URL includes the id of the order."
- I passed a specific parameter on success to redirect the user to the edit page.
  > "I wanted the New Customer Order form to send the user straight to the Edit page, so on its On Success settings I passed a parameter named id from the hadd_customerorderid attribute of the order that had just been created."
- Table permissions provided the necessary access for the portal pages.
  > "Table permissions gave Authenticated Users the access that the pages needed."

## Outcome
I built a functional Customer Portal where customers can manage their own orders. I successfully automated the account assignment and the navigation flow between creation and editing.

## Caveats
The post does not detail the specific configuration of the underlying Dataverse table schema.
