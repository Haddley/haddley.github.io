---
title: "Sales Invoice"
description: "How the Inventory, Sale, Tax and Receivables accounts are determined"
date: "2023-12-14"
categories: ["Business Central"]
tags: ""
slug: "salesinvoice"
image: "/assets/images/salesinvoice/posts-meta.svg"
---




I traced how Business Central determines the Inventory, Sale, Tax, and Receivables accounts for a Sales Invoice, using the Inventory Posting Group, General Product Posting Group, General Business Posting Group, General Posting Setup, Tax Setup, and Customer Posting Group.

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.00.04-pm-1836x936.png)
*I sold a RETAIL RESALE item to a DOMESTIC customer.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.01.02-pm-1836x938.png)
*I reviewed the entries generated from the Sales Invoice Document*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.23.00-pm-1836x937.png)
*The Item we are selling is a "RESALE" item. I clicked the Show details link.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.24.45-pm-1836x936.png)
*RESALE is an Inventory Posting Group. I clicked on the Setup button.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.26.21-pm-1836x935.png)
*When selling a RESALE item, the system uses account 14130 Finished Goods as the Inventory Account.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.35.57-pm-1836x937.png)
*The item I sold is a "RETAIL" item.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.27.06-pm-1836x932.png)
*The customer I sold to was a "DOMESTIC" customer.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.28.51-pm-1836x938.png)
*When selling a RETAIL item to a DOMESTIC customer, the system uses the 41040 Resale of Goods account to record the sale*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.36.11-pm-1836x932.png)
*When selling a RETAIL item to a DOMESTIC customer, the system uses the 50110 Cost of Materials account to record the cost of goods sold.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-12.31.36-pm-1836x929.png)
*I used search to navigate to the Tax Setup page*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.31.32-pm-1836x934.png)
*When selling any item to any customer, the system uses the 23200 Taxes Liable account to record City, County, and State tax.*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.32.39-pm-1836x932.png)
*The Customer is a "DOMESTIC" customer. I clicked the show details link*

![](/assets/images/salesinvoice/screenshot-2023-12-14-at-1.33.17-pm-1836x937.png)
*When selling to a DOMESTIC customer, the system uses 15110 Accounts Receivable, Domestic as the Receivables Account*