---
type: post
slug: powerpages1
title: "Power Pages (Part 1)"
date: "2024-10-26"
part: 1
builds_on: []
topics: [power-pages, virtual-tables, synthetic-relations, table-permissions, business-central-integration]
tools: [Microsoft Power Pages, Dynamics 365 Business Central, Microsoft Dataverse, Microsoft Entra]
status: current
checked: "2026-11-06"
source_hash: "39525eb618ea"
generated_by: gemma4:12b
---

**Summary.** I built a Customer Portal using Microsoft Power Pages to provide customers with visibility into their Sales Orders from Dynamics 365 Business Central. I demonstrated how to use virtual tables and synthetic relations to ensure that customers only see data belonging to their own company.

## What I did
- I connected Business Central to Dataverse using virtual tables for real-time data access.
- I created a synthetic relation to link sales orders to specific accounts.
- I configured table permissions to restrict data visibility based on the user's company.
- I configured the portal site and verified the security and functionality of the sales order pages.

## Claims
- Virtual tables allow the portal to read sales orders directly from Business Central without storing a copy in Dataverse.
  > "The Sales Order tables are virtual, so Dataverse reads them from Business Central and keeps no copy."
- I used a synthetic relation because the Sales Order table does not have a real relationship with the CRM Account table.
  > "The Sales Order table does not have a real relationship with the CRM Account table, so I created a synthetic relation."
- The table permission limits the rows to the user's own company by matching account names to customer names.
  > "It matches the account's Account Name field to the sales order's customerName field, and the table permission then uses it to limit the rows to the user's own company."
- An Internal Server Error occurred because a page reading other tables did not have the necessary permissions.
  > "After I added the Sales Order page and the View details action, clicking View details produced an Internal Server Error."
- The portal solution was ready to export after completing the configuration.
  > "The portal solution was ready to export."

## Outcome
I built a secure Customer Portal where users can view their specific sales orders. I successfully implemented a system where data visibility is controlled by table permissions and synthetic relations.

## Caveats
The post does not show the specific configuration of the underlying Business Central job queues for the virtual table synchronization.
