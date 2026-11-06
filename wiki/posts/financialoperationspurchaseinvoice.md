---
type: post
slug: financialoperationspurchaseinvoice
title: "Financial Operations Purchase Invoice"
date: "2023-08-20"
builds_on: []
topics: [payment-journals, vendor-payments, batch-processing, general-ledger-entries]
tools: [Business Central, Payment Journal, Suggest Vendor Payments, Preview Posting]
status: current
checked: "2026-11-05"
source_hash: "85ad7064b98e"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to process vendor payments using the Payment Journal in Business Central. I show how to handle single payments and batch payments while ensuring that check printing requirements are met before posting.

## What I did
- I processed a single payment for a vendor invoice.
- I resolved a posting error caused by an unprinted check.
- I used the Suggest Vendor Payments tool to process a batch of payments.
- I compared the ledger entries of single payments versus batch payments.

## Claims
- A payment reduces both the bank asset and the accounts payable liability.
  > "A payment reduces the bank account, which is an asset, and the accounts payable account, which is a liability."
- Computer Check payments require a printed status before the system allows posting.
  > "Computer Check payments must be printed before they can be posted."
- The Suggest Vendor Payments tool proposed five payments for the batch.
  > "Suggest Vendor Payments proposed five payments."
- The batch preview showed ten general ledger entries because each of the five payments creates two.
  > "Ten general ledger entries, because each of the five payments creates two."
- The detailed vendor ledger received twenty two entries after the batch process.
  > "The detailed vendor ledger received twenty two entries."
- The bank account list showed that over $49,000 needed to be deposited before vendors received checks.
  > "After I posted the batch, the bank accounts list showed that at least $49,421.55 would need to be deposited in the CHECKING account before the vendors received their physical checks."

## Outcome
I demonstrated how to successfully post both individual and batch payments while navigating the specific requirements for computer checks.

## Caveats
The post does not show the physical bank deposit process required to move funds into the bank account after posting.
