---
title: "Sales Invoice"
description: "How the Inventory, Sale, Tax and Receivables accounts are determined"
date: "2023-12-14"
categories: ["Microsoft Dynamics","Business Central","Microsoft Dynamics"]
tags: []
slug: "salesinvoice"
image: "/assets/images/posts-meta.svg"
---




The Inventory Posting Group RESALE (Item), General Product Posting Group RETAIL (Item), General Business Posting Group DOMESTIC (Customer), General Posting Setup {RETAIL, DOMESTIC}, Tax Setup and Customer Posting Group (Customer) are used to generate General Ledger entries for a Sales Invoice Document.

Here I demonstrate how the Inventory, Sale, Tax and Receivables accounts are determined.

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.00.04-pm-1836x936.png)
*In this Document we sell a RETAIL RESALE item to a DOMESTIC customer.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.01.02-pm-1836x938.png)
*Here are the entries that are generated from the Sales Invoice Document*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.23.00-pm-1836x937.png)
*The Item we are selling is a "RESALE" item. I clicked the Show details link.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.24.45-pm-1836x936.png)
*RESALE is an Inventory Posting Group. I clicked on the Setup button.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.26.21-pm-1836x935.png)
*When we sell a RESALE item we should use 14130 Finished Goods as the Inventory Account.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.35.57-pm-1836x937.png)
*The Item we are purchasing is a "RETAIL" item.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.27.06-pm-1836x932.png)
*The Customer we are selling to is a "DOMESTIC" customer.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.28.51-pm-1836x938.png)
*If we sell a RETAIL item to a DOMESTIC customer the 41040 Resale of Goods account should be used to record the sale*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.36.11-pm-1836x932.png)
*If we sell a RETAIL item to a DOMESTIC customer the 50110 Cost of Materials account should be used to record the cost of goods sold.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.31.36-pm-1836x929.png)
*I used search to navigate to the Tax Setup page*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.31.32-pm-1836x934.png)
*If we sell any item from any customer the 23200 Taxes Liable account should be used to record City, County and State tax.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.32.39-pm-1836x932.png)
*The Customer is a "DOMESTIC" customer. I clicked the show details link*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.33.17-pm-1836x937.png)
*When we sell to a DOMESTIC customer should use the 15110 Accounts Receivable, Domestic as the Recievables Account*