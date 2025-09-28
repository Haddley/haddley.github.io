
---
title: "Vendor Posting Group"
description: "Sub-ledgers"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/vendorpostinggroup/hero.png"
tags: ["ai","business central","dynamics"]
hidden: true
---

![](/assets/images/vendorpostinggroup/dynamics365-color.svg)
*By Microsoft, Public Domain*


In Microsoft Dynamics 365 Business Central, sub-ledgers are used to manage business operations.

Sub-ledgers include:

Item Ledger
Vendor Ledger
Detailed Vendor Ledger
Customer Ledger; and
Detailed Customer Ledger


## Posting Groups

In Microsoft Dynamics 365 Business Central, Posting Groups are used to "build a bridge" between Business Central sub-ledgers and the general ledger accounts.


A Vendor Posting Group is used to define which accounts payable general ledger account to use when purchasing goods from a Vendor.

Vendor Posting Groups are maintained using the Vendor Posting Groups page.

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-11-at-7.05.09-pm-1536x860.png)
*I used search to navigate to the Vendors page. I used + New to create a new Vendor*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-11-at-7.07.22-pm-1536x859.png)
*I entered Vendor details*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-11-at-7.07.54-pm-1536x860.png)
*I reviewed the Invoicing tab for the new Vendor*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-11.39.06-am-1536x996.png)
*I clicked the + New link*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-11.41.36-am-1536x996.png)
*I added code DOMESTIC and set Payables Account to 22100 (Account Payable, Domestic)*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-11.42.04-am-1536x998.png)
*Vendor Posting Group is set to DOMESTIC*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-11.51.39-am-1536x371.png)
*I used search to navigate to the General Journal page*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-11.54.14-am-1536x610.png)
*I created a Journal entry debiting the Finished Goods account*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-12.03.08-pm-1536x558.png)
*I set the Amount to $2,503 and the balancing Account Type to Vendor*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-12.03.53-pm-1536x554.png)
*I selected Vendor Fabrikam, Inc.*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-12.05.28-pm-1536x426.png)
*I clicked the Preview Posting button*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-12.05.55-pm-1536x393.png)
*The preview showed 2 General Ledger entries, 1 Vendor Ledger entry and 1 Detailed Vendor Ledger entry*

![](/assets/images/vendorpostinggroup/screen-shot-2023-12-12-at-12.06.33-pm-1536x311.png)
*The first general ledger entry relates to General Ledger account 14130 Finished Goods. The second general ledger entry relates to General Ledger account 22100 Accounts Payable, Domestic (per the DOMESTIC Vendor Posting Group).*