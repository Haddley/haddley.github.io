---
type: post
slug: vendorpostinggroup
title: "Vendor Posting Group"
date: "2023-12-12"
builds_on: []
topics: [sub-ledgers, posting-groups, general-ledger, accounts-payable]
tools: [Business Central, General Journal, Vendor Posting Groups page]
status: current
checked: "2026-11-06"
source_hash: "a03681bd06ac"
generated_by: gemma4:12b
---

**Summary.** I explain how Business Central uses sub-ledgers to manage specific business operations like vendor accounts. I demonstrate how Posting Groups act as the bridge between these sub-ledgers and the general ledger accounts.

## What I did
- I defined the role of sub-ledgers and posting groups.
- I created a new vendor with a specific posting group.
- I recorded a journal entry for a purchase.
- I verified the preview to see the correct account mapping.

## Claims
- Posting groups serve as the bridge between sub-ledgers and general ledger accounts.
  > "A: It is the bridge between the sub-ledgers and the general ledger accounts."
- The system maintains separate ledgers for items, vendors, and customers.
  > "Business Central keeps a ledger for items, vendors and customers as well as the general ledger."
- The journal entry preview shows the correct account based on the vendor posting group.
  > "The vendor's posting group chose 22100 as the payables account in the preview."
- The specific purchase entry debited the Finished Goods account.
  > "I created a journal entry that debits the Finished Goods account for $2,503, with Vendor Fabrikam, Inc. as the balancing account."
- The system generated both a vendor ledger entry and a detailed vendor ledger entry.
  > "The preview also showed one vendor ledger entry and one detailed vendor ledger entry."

## Outcome
I demonstrated how a Vendor Posting Group automatically maps a vendor transaction to the correct accounts payable account in the general ledger.

## Caveats
The post does not show the specific configuration of the Item Ledger or Customer Ledger.
