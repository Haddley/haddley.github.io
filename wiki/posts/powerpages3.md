---
type: post
slug: powerpages3
title: "Power Pages (Part 3)"
date: "2024-12-20"
part: 3
builds_on: []
topics: [power-pages, dataverse-relationships, business-central-integration, table-permissions]
tools: [Power Pages, Dataverse, Microsoft Dynamics 365 Business Central]
status: current
checked: "2026-11-06"
source_hash: "9aac6e6479d4"
generated_by: gemma4:12b
---

**Summary.** I expanded the Power Pages Customer Portal to support Customer Order Lines. I implemented a system where customers can manage individual items within an order using lookups and specific table permissions.

## What I did
- I created a Customer Order Lines table with an Order lookup to link items to orders.
- I integrated a Business Central virtual table for item selection.
- I configured portal forms and grids to allow users to add, edit, and delete lines.
- I configured table permissions and On Success settings to ensure correct navigation and data access.

## Claims
- The Order Lookup column establishes the relationship between the order and its lines.
  > "A: It creates a relationship between the Customer Order table and the Customer Order Lines table, so every line belongs to one order."
- Using a virtual table allows customers to select items without importing them into Dataverse.
  > "I added the Business Central Item virtual table, and the lookup lets a customer pick an item without copying the items into Dataverse."
- A global table permission was required to make the item lookup function correctly.
  > "I added a Global table permission, which gives access to all rows in the table, and the lookup worked."
- The On Success settings ensure the system passes the correct ID and redirects the user to the correct page.
  > "I updated the On Success settings so that the Customer Order's id would be passed, and the form then redirected to the Edit Customer Order page for that order."
- The system allows users to perform all standard CRUD operations on order lines.
  > "Lines can be added, edited and deleted from the order page."

## Outcome
I built a functional Customer Order Lines system where customers can manage items within an order. I confirmed that proper permissions and navigation settings are required for a seamless user experience.

## Caveats
The use of a global permission for items may allow customers to see more data than intended if not carefully scoped.
