---
title: "Purchase Invoice"
description: "A comprehensive guide covering purchase invoice"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/purchaseinvoice/hero.png"
tags: ["ai","dynamics"]
---

# Purchase Invoice

## Purchase Invoice

![](/assets/images/purchaseinvoice/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Purchase Invoice

The Inventory Posting Group RESALE (Item), General Product Posting Group RETAIL (Item), General Business Posting Group DOMESTIC  (Vendor), General Posting Setup {RETAIL,DOMESTIC}, Tax Setup and Vendor Posting Group (Vendor) are used to generate General Ledger entries for a Purchase Invoice Document.

Here I demonstrate how the Inventory, Purchase, Tax and Payables accounts are determined.

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.01.43-pm-1836x933.png)
*In this Document we purchase a RETAIL RESALE item from a DOMESTIC vendor.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.16.25-pm-1836x936.png)
*Here are the entries that are generated from the Purchase Invoice Document*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.23.00-pm-1836x937.png)
*The Item we are purchasing is a "RESALE" item. I clicked the Show details link.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.24.45-pm-1836x936.png)
*RESALE is an Inventory Posting Group. I clicked on the Setup button.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.26.21-pm-1836x935.png)
*When we purchase a RESALE item we should use 14130 Finished Goods as the Inventory Account.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.35.57-pm-1836x937.png)
*The Item we are purchasing is a "RETAIL" item.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.37.18-pm-1836x932.png)
*The Vendor we are buying from is a "DOMESTIC" vendor.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-10.49.56-am-1836x868.png)
*If we buy a RETAIL item from a DOMESTIC vendor the 14140 Goods for Resale account should be used to record the purchase*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.31.36-pm-1836x929.png)
*I used search to navigate to the Tax Setup page*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.32.09-pm-1836x934.png)
*If we buy any item from any vendor the 23200 Taxes Liable account should be used to record City, County and State tax.*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.43.52-pm-1836x938.png)
*The Vendor is a "DOMESTIC" vendor. I clicked the show details link*

![](/assets/images/purchaseinvoice/screenshot-2023-12-14-at-12.45.17-pm-1836x937.png)
*When we purchase from a DOMESTIC vendor should use the 22100 Accounts Payable, Domestic as the Payables Account*