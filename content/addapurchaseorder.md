---
title: "Add a Purchase Order"
description: "I used Patch to add a Business Central Purchase Order and to add Purchase Order Lines"
date: "2024-02-21"
categories: ["Microsoft Dynamics","Business Central","Power Platform"]
tags: "power-apps, patch, purchase-orders, business-central"
hidden: false
slug: "addapurchaseorder"
image: "/assets/images/addapurchaseorder/office-365-icon-500x500.png"
---

## Summary

:::brain-power Before you read on
A purchase order has a header, which says who it is for, and lines, which say what is being ordered. Which would you create first in an app, and why?
:::

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.20.01-pm-1836x642.png)
*I created a Canvas app*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.20.16-pm-1836x839.png)
*I named the Canvas app "Purchase Orders App"*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.20.32-pm-1836x646.png)
*I clicked the Data tab*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.21.02-pm-1836x797.png)
*I added the Business Central "Vendors" Table*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.21.25-pm-1836x704.png)
*I added the Business Central "Items" Table*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.22.09-pm-1836x786.png)
*I added ComboBox1 allowing the user to select a Vendor*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.22.37-pm-1836x812.png)
*I added ComboBox2 allowing the user to select an Item*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.24.10-pm-1836x576.png)
*I added TextInput1 allowing the user to enter a comment*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.24.48-pm-1836x588.png)
*I added a "Create a Purchase Order" Button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.25.29-pm-1836x506.png)
*I added an "Update the Purchase Order" Button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.26.13-pm-1836x542.png)
*I added an "Add a Comment Purchase Order Line" Button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.26.57-pm-1836x541.png)
*I added an "Add an Item Purchase Order Line" Button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.31.13-pm-1836x787.png)
*I added the Business Central "Purchase Orders" Table*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.31.27-pm-1836x702.png)
*I added the Business Central "Purchase Order Lines" Table*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.42.25-pm-1836x606.png)
*I added OnSelect code to the Create a Purchase Order button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.44.22-pm-1836x586.png)
*I reviewed the purchaseOrderResultSet collection returned (the single row)*

:::no-dumb-questions
**Q: What are Purchase Order Lines?**

A: The rows of a purchase order. In this post I add two kinds: a comment line, which carries the text that I typed, and an item line for the ATHENS Mobile Pedestal.

**Q: Why did I look at the purchaseOrderResultSet collection?**

A: The Create button stores the result in a collection, and the collection held the single new row. I could see the purchase order that Business Central created before I used it in the next steps.
:::

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.46.35-pm-1836x623.png)
*I added the OnSelect code to the "Update the Purchase Order" button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.46.49-pm-1836x503.png)
*I selected "First Up Consultants" and clicked the "Update the Purchase Order" button*

:::pencil Which button first?
The app has four buttons: Create a Purchase Order, Update the Purchase Order, Add a Comment Purchase Order Line and Add an Item Purchase Order Line. Which one must I click first, and what would go wrong if I clicked Add an Item Purchase Order Line first?

:::answer
Create a Purchase Order comes first, because the lines belong to a purchase order that has to exist. Without it, the line buttons have no order to add the line to. The order in the post is create, update with the vendor, add the comment line, and then add the item line.
:::
:::

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.49.22-pm-1836x547.png)
*I added the OnSelect code to the "Add a Comment Purchase Order Line" button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.49.41-pm-1836x502.png)
*I entered "Example Comment" into the text input and clicked the "Add a Comment Purchase Order line" button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.50.19-pm-1836x684.png)
*I reviewed the Purchase Order and the Comment Purchase Order Line*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.51.50-pm-1836x568.png)
*I added the OnSelect code to the "Add an Item Purchase Order Line" button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.52.01-pm-1836x687.png)
*I selected the "ATHENS Mobile Pedestal" item*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.52.10-pm-1836x511.png)
*I clicked the "Add an Item Purchase Order Line" Button*

![](assets/images/addapurchaseorder/screenshot-2024-02-21-at-8.52.43-pm-1836x733.png)
*I reviewed the newly created "ATHENS Mobile Pedestal" Purchase Order Line*

:::test-drive Try it yourself
1. Click Create a Purchase Order, and then choose a vendor and click Update the Purchase Order.
2. Type a comment and add the comment line.
3. Choose an item and add the item line.
4. Open the purchase order in Business Central and compare it with the app.
:::

:::bullet-points Recap
- A purchase order needs its header before it can have lines.
- Patch created the purchase order, and the same pattern added a comment line and an item line.
- A collection held the new purchase order, so the later buttons could use it.
- I checked the result in Business Central after each step.
:::
