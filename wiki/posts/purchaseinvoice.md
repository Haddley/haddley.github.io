---
type: post
slug: purchaseinvoice
title: "Purchase Invoice"
date: "2023-12-14"
builds_on: []
topics: [purchase-invoices, general-ledger-posting, inventory-management, tax-setup]
tools: [Business Central]
status: current
checked: "2026-11-06"
source_hash: "76fb80bbed81"
generated_by: gemma4:12b
---

**Summary.** I trace how Business Central determines the specific General Ledger accounts for a Purchase Invoice. I identify the specific posting groups and setup tables that control inventory, purchase, tax, and payables accounts.

## What I did
- I analyzed the logic behind account selection for purchase invoices.
- I performed a test purchase of a retail resale item from a domestic vendor.
- I reviewed the resulting General Ledger entries.
- I mapped each account to its corresponding setup page.

## Claims
- A purchase invoice affects four distinct types of accounts.
  > "A purchase invoice touches several accounts: the stock, the purchase itself, the tax and the money owed."
- The Inventory Posting Group determines the inventory account.
  > "The Inventory Posting Group supplies the inventory account."
- The General Posting Setup determines the purchase account based on product and business groups.
  > "General Posting Setup, using the product and business groups, supplies the purchase account."
- The Tax Setup determines the tax account.
  > "Tax Setup supplies the tax account, and the Vendor Posting Group supplies the payables account."
- The specific account numbers for inventory, purchase, tax, and payables are determined by the specific posting groups.
  > "Inventory goes to 14130 Finished Goods, the purchase goes to 14140 Goods for Resale, the tax goes to 23200 Taxes Liable, and the amount owed goes to 22100 Accounts Payable, Domestic."

## Outcome
I concluded that specific posting groups and setup pages dictate which accounts are used for each component of a purchase invoice.

## Caveats
The post does not show how custom fields or additional dimensions might further modify these account selections.
