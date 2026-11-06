---
type: post
slug: salesinvoice
title: "Sales Invoice"
date: "2023-12-14"
builds_on: []
topics: [inventory-posting, sales-accounting, tax-setup, receivables-management]
tools: [Business Central]
status: current
checked: "2026-11-06"
source_hash: "61dc0958467d"
generated_by: gemma4:12b
---

**Summary.** I trace how Business Central determines the specific General Ledger accounts for a Sales Invoice. I identify the specific posting groups and setup tables that control inventory, sales, tax, and receivables.

## What I did
- I analyzed the logic for determining account types for Sales Invoices.
- I performed a test sale of a RETAIL RESALE item to a DOMESTIC customer.
- I reviewed the resulting General Ledger entries.
- I mapped each account back to its specific configuration page.

## Claims
- A sales invoice performs multiple accounting actions including moving stock, recording costs, and creating debt.
  > "A sales invoice moves stock out, records a sale and its cost, adds tax, and creates a debt that the customer owes."
- The Inventory Posting Group determines the inventory account.
  > "The Inventory Posting Group supplies the inventory account."
- The General Posting Setup determines the sales and cost of goods sold accounts.
  > "General Posting Setup supplies the sales and cost of goods sold accounts."
- The Tax Setup determines the tax account.
  > "Tax Setup supplies the tax account, and the Customer Posting Group supplies the receivables account."
- The specific account numbers for a test transaction are 14130, 41040, 50110, 23200, and 15110.
  > "Inventory is 14130 Finished Goods, the sale is 41040 Resale of Goods, the cost of goods sold is 50110 Cost of Materials, the tax is 23200 Taxes Liable, and the amount owed is 15110 Accounts Receivable, Domestic."

## Outcome
I concluded exactly which setup pages and posting groups control each component of a Sales Invoice. I demonstrated how to trace a specific transaction back to its source configuration.

## Caveats
The post does not show how custom fields or additional dimensions might further modify these account selections.
