---
title: "Purchase Invoice"
description: "Purchase Invoice"
date: "2023-12-14"
categories: ["Business Central"]
tags: "purchase-invoice, accounts-payable, finance, business-central"
slug: "purchaseinvoice"
image: "/assets/images/purchaseinvoice/posts-meta.svg"
---


I traced how Business Central determines the Inventory, Purchase, Tax, and Payables accounts for a Purchase Invoice, using the Inventory Posting Group, General Product Posting Group, General Business Posting Group, General Posting Setup, Tax Setup, and Vendor Posting Group.

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.01.43-pm-1836x933.png)
*I purchased a RETAIL RESALE item from a DOMESTIC vendor.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.16.25-pm-1836x936.png)
*I reviewed the General Ledger entries generated from the Purchase Invoice Document*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.23.00-pm-1836x937.png)
*The Item we are purchasing is a "RESALE" item. I clicked the Show details link.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.24.45-pm-1836x936.png)
*RESALE is an Inventory Posting Group. I clicked on the Setup button.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.26.21-pm-1836x935.png)
*When purchasing a RESALE item, the system uses account 14130 Finished Goods as the Inventory Account.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.35.57-pm-1836x937.png)
*The Item we are purchasing is a "RETAIL" item.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.37.18-pm-1836x932.png)
*The Vendor we are buying from is a "DOMESTIC" vendor.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-10.49.56-am-1836x868.png)
*When buying a RETAIL item from a DOMESTIC vendor, the system uses the 14140 Goods for Resale account to record the purchase*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.31.36-pm-1836x929.png)
*I used search to navigate to the Tax Setup page*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.32.09-pm-1836x934.png)
*When buying any item from any vendor, the system uses the 23200 Taxes Liable account to record City, County, and State tax.*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.43.52-pm-1836x938.png)
*The Vendor is a "DOMESTIC" vendor. I clicked the show details link*

![](assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.45.17-pm-1836x937.png)
*When purchasing from a DOMESTIC vendor, the system uses 22100 Accounts Payable, Domestic as the Payables Account*