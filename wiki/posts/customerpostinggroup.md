---
type: post
slug: customerpostinggroup
title: "Customer Posting Group"
date: "2023-12-14"
builds_on: []
topics: [customer-posting-groups, accounts-receivable, general-ledger-accounting, preview-posting]
tools: [Customer Posting Groups page, General Journal, Preview Posting]
status: current
checked: "2026-11-05"
source_hash: "1270b830dc3a"
generated_by: gemma4:12b
---

**Summary.** I explain how Customer Posting Groups determine which accounts receivable general ledger account is used during a sale. I demonstrate how to configure these groups and verify the results using the Preview Posting feature.

## What I did
- I created a new Customer Posting Group named DOMESTIC.
- I assigned the DOMESTIC group to a new customer.
- I used the Preview Posting tool to verify the ledger entries.
- I confirmed that the system selected the correct account based on the posting group.

## Claims
- A Customer Posting Group defines the specific accounts receivable account for sales.
  > "A Customer Posting Group is used to define which accounts receivable general ledger account to use when selling goods to a Customer."
- I created a DOMESTIC group with account 15110 and assigned it to a new customer.
  > "I created one called DOMESTIC, with 15110 (Account Receivable, Domestic) as its Receivables Account, and assigned it to the new customer."
- Preview Posting shows what a posting would create without actually posting it.
  > "A: It shows what a posting would create without actually posting it."
- The preview showed the first general ledger entry was on 15110 because the customer posting group says so.
  > "The preview showed 8 general ledger entries, 1 customer ledger entry and 1 detailed customer ledger entry, and the first general ledger entry was on 15110, because the customer's posting group says so."
- A Customer Posting Group decides which accounts receivable account a customer's sales use.
  > "A Customer Posting Group decides which accounts receivable account a customer's sales use."

## Outcome
I built a system where the Customer Posting Group automatically directs sales to the correct accounts receivable account. I confirmed this logic by verifying the entries in the General Journal preview.

## Caveats
The post does not show how to manage multiple different types of accounts receivable accounts beyond the one example provided.
