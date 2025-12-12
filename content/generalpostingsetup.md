---
title: "General Posting Setup"
description: "Which accounts payable ledger account"
date: "2023-12-14"
categories: ["Microsoft Dynamics","Business Central","AI","Angular","IOT","TypeScript"]
tags: ""
slug: "generalpostingsetup"
image: "/assets/images/posts-meta.svg"
---



General Posting Setup is used to define which accounts receivable and cost of goods sold general ledger accounts to use when selling a given Item (with a given General Business Posting Group) to a given Customer (with a given General Product Posting Group).

General Posting Setup is used to define which accounts payable general ledger account to use when buying a given Item (with a given General Business Posting Group) from a given Vendor (with a given General Product Posting Group).

The General Posting Setup is maintained using the General Posting Setup page.

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-10.36.23-am-1836x974.png)
*I used search to navigate to the General Posting Setup page.*

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-10.41.37-am-1836x867.png)
*If we sell a RETAIL item to a DOMESTIC customer the 40140 Resale of Goods account should be used to record the sale.*

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-10.54.46-am-1836x864.png)
*If we sell a RETAIL item to a DOMESTIC customer the 50110 Cost of Materials account should be used to record the cost of goods sold.*

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-11.09.47-am-1836x867.png)
*Example of ledger entries generated when we sell a RETAIL item to a DOMESTIC customer.*

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-10.49.56-am-1836x868.png)
*If we buy a RETAIL item from a DOMESTIC vendor the 14140 Goods for Resale account should be used to record the purchase*

![](/assets/images/generalpostingsetup/screenshot-2023-12-14-at-11.58.29-am-1836x868.png)
*Example of ledger entries generated when we buy a RETAIL item from a DOMESTIC vendor.*