---
title: "Purchase Invoice"
description: "A comprehensive guide covering purchase invoice"
date: "2025-09-20"
category: "Development"
image: "/assets/images/purchaseinvoice.png"
tags: ["ai","business central","dynamics"]
---

# Purchase Invoice

Microsoft Dynamics 365 Business Central (Part 17) Purchase Invoice By Microsoft , Public Domain Purchase Invoice The Inventory Posting Group RESALE (Item), General Product Posting Group RETAIL (Item), General Business Posting Group DOMESTIC (Vendor), General Posting Setup {RETAIL,DOMESTIC}, Tax Setup and Vendor Posting Group (Vendor) are used to generate General Ledger entries for a Purchase Invoice Document. Here I demonstrate how the Inventory, Purchase, Tax and Payables accounts are determined. In this Document we purchase a RETAIL RESALE item from a DOMESTIC vendor. Here are the entries that are generated from the Purchase Invoice Document The Item we are purchasing is a "RESALE" item. I clicked the Show details link. RESALE is an Inventory Posting Group. I clicked on the Setup button. When we purchase a RESALE item we should use 14130 Finished Goods as the Inventory Account. The Item we are purchasing is a "RETAIL" item. The Vendor we are buying from is a "DOMESTIC" vendor. If we buy a RETAIL item from a DOMESTIC vendor the 14140 Goods for Resale account should be used to record the purchase I used search to navigate to the Tax Setup page If we buy any item from any vendor the 23200 Taxes Liable account should be used to record City, County and State tax. The Vendor is a "DOMESTIC" vendor. I clicked the show details link When we purchase from a DOMESTIC vendor should use the 22100 Accounts Payable, Domestic as the Payables Account References Dynamics NAV 2017: Posting Groups Set Up Posting Groups
