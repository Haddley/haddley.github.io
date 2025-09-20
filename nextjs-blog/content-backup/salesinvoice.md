---
title: "Sales Invoice"
description: "A comprehensive guide covering sales invoice"
date: "2025-09-20"
category: "Development"
image: "/assets/images/salesinvoice.png"
tags: ["ai","business central","dynamics"]
---

# Sales Invoice

Microsoft Dynamics 365 Business Central (Part 18) Sales Invoice By Microsoft , Public Domain Sales Invoice The Inventory Posting Group RESALE (Item), General Product Posting Group RETAIL (Item), General Business Posting Group DOMESTIC (Customer), General Posting Setup {RETAIL, DOMESTIC}, Tax Setup and Customer Posting Group (Customer) are used to generate General Ledger entries for a Sales Invoice Document. Here I demonstrate how the Inventory, Sale, Tax and Receivables accounts are determined. In this Document we sell a RETAIL RESALE item to a DOMESTIC customer. Here are the entries that are generated from the Sales Invoice Document The Item we are selling is a "RESALE" item. I clicked the Show details link. RESALE is an Inventory Posting Group. I clicked on the Setup button. When we sell a RESALE item we should use 14130 Finished Goods as the Inventory Account. The Item we are purchasing is a "RETAIL" item. The Customer we are selling to is a "DOMESTIC" customer. If we sell a RETAIL item to a DOMESTIC customer the 41040 Resale of Goods account should be used to record the sale If we sell a RETAIL item to a DOMESTIC customer the 50110 Cost of Materials account should be used to record the cost of goods sold. I used search to navigate to the Tax Setup page If we sell any item from any customer the 23200 Taxes Liable account should be used to record City, County and State tax. The Customer is a "DOMESTIC" customer. I clicked the show details link When we sell to a DOMESTIC customer should use the 15110 Accounts Receivable, Domestic as the Recievables Account References Dynamics NAV 2017: Posting Groups Set Up Posting Groups
