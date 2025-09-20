---
title: "Vendor Posting Group"
description: "A comprehensive guide covering vendor posting group"
date: "2025-09-20"
category: "Development"
image: "/assets/images/vendorpostinggroup.png"
tags: ["ai","business central","dynamics"]
---

# Vendor Posting Group

Microsoft Dynamics 365 Business Central (Part 14) Vendor Posting Group By Microsoft , Public Domain Sub-ledgers In Microsoft Dynamics 365 Business Central, sub-ledgers are used to manage business operations. Sub-ledgers include: Item Ledger Vendor Ledger Detailed Vendor Ledger Customer Ledger; and Detailed Customer Ledger Posting Groups In Microsoft Dynamics 365 Business Central, Posting Groups are used to "build a bridge" between Business Central sub-ledgers and the general ledger accounts. Vendor Posting Group A Vendor Posting Group is used to define which accounts payable general ledger account to use when purchasing goods from a Vendor. Vendor Posting Groups are maintained using the Vendor Posting Groups page. I used search to navigate to the Vendors page. I used + New to create a new Vendor I entered Vendor details I reviewed the Invoicing tab for the new Vendor I clicked the + New link I added code DOMESTIC and set Payables Account to 22100 (Account Payable, Domestic) Vendor Posting Group is set to DOMESTIC I used search to navigate to the General Journal page I created a Journal entry debiting the Finished Goods account I set the Amount to $2,503 and the balancing Account Type to Vendor I selected Vendor Fabrikam, Inc. I clicked the Preview Posting button The preview showed 2 General Ledger entries, 1 Vendor Ledger entry and 1 Detailed Vendor Ledger entry The first general ledger entry relates to General Ledger account 14130 Finished Goods. The second general ledger entry relates to General Ledger account 22100 Accounts Payable, Domestic (per the DOMESTIC Vendor Posting Group). References Dynamics NAV 2017: Posting Groups Set Up Posting Groups
