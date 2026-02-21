---
title: "Warehouse Management Put away"
description: "Warehouse Management - Put-away"
date: "2023-08-19"
categories: ["Business Central"]
tags: ""
slug: "warehousemanagementputaway"
image: "/assets/images/warehousemanagementputaway/dynamics365-color.svg"
---



Businesses that physically move goods in and out of their warehouse need to be able to receive, pick, and ship items.

I created a walkthrough.

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.33.47-am-1437x713.png)
*I updated my role to Inventory Manager*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.33.58-am-1437x712.png)
*I clicked the Bin Content link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.34.20-am-1441x554.png)
*At this point there seems to be nothing in the Warehouse.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.35.18-am-1439x713.png)
*I clicked Locations link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.35.35-am-890x602.png)
*I clicked on the White Warehouse link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.37.12-am-1435x711.png)
*I clicked on the Zones link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.38.34-am-1439x714.png)
*The White Warehouse has been divided into 8 zones.Each zone has a Bin Type*


## Bin Type

The bin type determines how a bin is used when processing the flow of items through the warehouse.

Incoming goods will be unloaded to a "Receive" bin, moved to a "Put Away" bin, removed from a "Pick" bin and sent from a "Ship" bin.

In this example these "Bin Types" are defined: PICK (Pick), PUTAWAY (Put Away), PUTPICK (Put Away and Pick), RECEIVE (Receive) and SHIP (Ship).

[QC (None) bins are used for items that are excluded from normal item flows.]

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-3.37.18-pm-1443x429.png)
*Bin Types*


## Zones

[Zones](https://learn.microsoft.com/en-us/training/modules/set-up-zones-bins/2-set-up-zone) are used to subdivide the warehouse into logical parts. Zones are divided into bins.

Notice that bin "W-08-0001" is a RECEIVE bin and "W-04-0001" is a PUTPICK bin.

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.38.51-am-1438x713.png)
*I clicked the Bins link to open a list of Bins in the White Warehouse*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.39.03-am-1437x711.png)
*This is a list of the Bins in the White Warehouse.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.40.53-am-1431x714.png)
*I clicked Settings|Personalize to open the Personalizing toolbar.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.41.15-am-1438x708.png)
*I was able to drag fields from the right onto the Bins page*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.43.18-am-1436x715.png)
*I added the Zone Code and the Bin Type Code Fields*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.46.03-am-1436x714.png)
*Notice that bin W-08-0001 is a RECEIVE bin in the RECEIVE Zone*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.46.54-am-1438x714.png)
*Notice that bin W-04-0001 is a PUTPICK bin in the PICK Zone (with a bin ranking of 100)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.48.31-am-1438x714.png)
*Business Central will allocate incoming items to "Put Away" bins based on a Put-away Template*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.48.43-am-1438x711.png)
*Here two put away templates have been defined*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.49.08-am-1439x713.png)
*In the STD template items will be directed to a Fixed Bin already used for this item type with the same unit measure and less than minimum quantity, a Fixed Bin already used for this item type with the same unit measure, a Floating Bin that already has an item of this type in it with the same unit measure, a Floating Bin that already has an item of this type in it, to an empty bin with the next highest "bin ranking", or to a random floating bin.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.49.32-am-1435x712.png)
*In the VAR template items will be directed to a Floating Bin that already has an item of this type in it with the same unit measure, to an empty bin with the next highest "bin ranking", or to a random floating bin.*


## Purchase Order

Purchase Orders are usually created by a planning process.

To demonstrate how items flow through a warehouse I created a Purchase Order manually.

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.49.57-am-1438x712.png)
*I navigated to the Purchase Orders page*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.50.32-am-1439x296.png)
*I clicked the + New link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.50.51-am-1437x711.png)
*In this case I wanted to purchase items from "First Up Consultants". I selected the Vendor Name box.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.51.06-am-1438x711.png)
*I selected First Up Consultants*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.51.21-am-1437x714.png)
*The Vendor name and contact details were added to the new Purchase Order page.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.51.42-am-1437x712.png)
*I wanted to purchase 10 yellow BERLIN Guest Chairs.*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.52.04-am-1439x713.png)
*I entered quantity 10*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.52.26-am-1438x713.png)
*I wanted to have the chairs shipped to the White Warehouse*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.27.35-pm-1836x930.png)
*I clicked the Release link (notice that I did not enter a vendor invoice number - the invoice will not be received for some days or weeks)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.27.50-pm-1836x927.png)
*The Purchase Order document is released.*


## Push or pull the warehouse receipt?

After the Purchase Order details have been entered I could have clicked on the "Create Whse. Receipt" link to create a Warehouse Receipt (based on the details in the current Purchase Order). This would be to follow a Push strategy.

The alternative is to release the Purchase Order and to let the Warehouse staff create the Warehouse Receipt. In this example I followed a [Pull strategy](https://usedynamics.com/business-central/warehouse/strategies-when-creating-receipts/).

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-10.56.34-am-1435x710.png)
*I switched to the Warehouse Worker role*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-7.55.18-pm-1444x716.png)
*I navigated to the Warehouse Employees page*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-7.56.20-pm-1440x512.png)
*I added myself as a warehouse employee*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-4.52.29-pm-1439x318.png)
*I clicked the Warehouse Receipts link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.25.51-pm-1836x454.png)
*I created a new Warehouse Receipt*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.28.21-pm-1836x926.png)
*I clicked the Get Source Documents... link to import details from the Purchase Order into this Warehouse Receipt(Notice that a single Warehouse Receipt can import lines from multiple source documents)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.28.45-pm-1836x928.png)
*Notice that the Bin Code was automatically set to bin W-08-0001 (the RECEIVE bin in the RECEIVE Zone - see above)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.29.16-pm-1836x926.png)
*I clicked the Post Receipt link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.29.26-pm-1836x922.png)
*I posted the Warehouse Receipt*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.29.40-pm-1836x927.png)
*As I posted the Warehouse Receipt a Put-away was created*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.29.57-pm-1836x342.png)
*I clicked the Put-aways link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.30.10-pm-1836x508.png)
*I clicked on the newly created Put-away*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.30.30-pm-1836x926.png)
*I clicked the "i" to collapse the FactBox*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.30.45-pm-1836x927.png)
*Notice that the Put-away describes how the items should be moved from bin W-08-0001 (the RECEIVE bin in the RECEIVE Zone) and moved to bin W-04-0001 (the PUTPICK bin in the PICK Zone)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.31.05-pm-1836x925.png)
*I wanted to review the Bin Contents before clicking Register Put-away*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.31.39-pm-1836x929.png)
*The items are shown in the W-08-0001 bin (the RECEIVE bin in the RECEIVE Zone)*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.31.50-pm-1836x931.png)
*I clicked the Register Put-away link*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.31.59-pm-1836x927.png)
*I clicked Yes*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.32.10-pm-1836x929.png)
*The put away is completed*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.32.26-pm-1836x924.png)
*I wanted to review the Bin Contents after clicking Register Put-away*

![](/assets/images/warehousemanagementputaway/screen-shot-2023-08-19-at-8.32.37-pm-1836x929.png)
*The items are shown in the W-04-0001 bin (the PUTPICK bin in the PICK Zone)*