---
type: post
slug: generalpostingsetup
title: "General Posting Setup"
date: "2023-12-14"
builds_on: []
topics: [general-posting-setup, ledger-accounts, posting-groups, inventory-management]
tools: [General Posting Setup page, Ledger Entries]
status: current
checked: "2026-11-05"
source_hash: "4ca83194f12e"
generated_by: gemma4:12b
---

**Summary.** I explain how the General Posting Setup determines which general ledger accounts the system uses for sales, costs of goods sold, and purchases. I demonstrate how the combination of item and customer or vendor posting groups selects the specific row in the setup table.

## What I did
- I navigated to the General Posting Setup page using search.
- I reviewed the ledger entries for sales and purchases of retail items.
- I identified the specific accounts used for sales, costs, and purchases.
- I modified a setup account and posted a new sale to verify the change.
- I confirmed that the pair of posting groups selects the correct row.

## Claims
- General Posting Setup determines the ledger accounts for sales, costs, and purchases.
  > "General Posting Setup chooses the general ledger accounts for sales, costs and purchases."
- The system uses a pair of posting groups to select the specific row on the setup page.
  > "A pair of posting groups selects the row, here RETAIL and DOMESTIC."
- A sale of a retail item to a domestic customer uses the 40140 Resale of Goods account.
  > "The sale uses 40140 Resale of Goods, and its cost uses 50110 Cost of Materials."
- Buying a retail item from a domestic vendor uses the 14140 Goods for Resale account.
  > "Buying the item from a DOMESTIC vendor uses 14140 Goods for Resale."
- The ledger entries confirm which accounts each transaction uses.
  > "The ledger entries showed which accounts each transaction used."

## Outcome
I concluded that the General Posting Setup determines the specific general ledger accounts for sales, costs, and purchases based on the posting groups of the item and the customer or vendor.

## Caveats
The post does not show how to configure the posting groups themselves, only how the system uses them to select accounts.
