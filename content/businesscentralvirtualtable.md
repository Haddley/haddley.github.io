---
title: "Business Central Virtual Table"
description: "Microsoft Dynamics 365 Business Central Virtual Tables for Microsoft Dataverse"
date: "2024-01-12"
categories: ["Microsoft Dynamics","Business Central","Power Platform"]
tags: "virtual-tables, dataverse, power-platform, business-central"
hidden: false
slug: "businesscentralvirtualtable"
image: "/assets/images/businesscentralvirtualtable/posts-meta.svg"
---



Microsoft Dynamics 365 Business Central Virtual Table is a virtual data source in Microsoft Dataverse allowing Create, Read, Update and Delete operations from Microsoft Dataverse against Dynamics 365 Business Central. Data for virtual tables do not reside in Microsoft Dataverse, but continue to reside in Business Central. 

Virtual tables are enabled for Business Central APIs, by making them available in Microsoft Dataverse as virtual tables. Custom and Standard APIs exposed in Business Central are consumable on Microsoft Dataverse and can be exposed as virtual tables. 

The new version adds support for data change events (CUD events) so Dataverse virtual tables can be used in Power Automate flows.

:::brain-power Before you read on
A Power Apps app needs to show and edit customers that live in Business Central. You could copy the customers into Dataverse, or you could leave them where they are. What would each choice mean for keeping the two copies in step?
:::

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.37.31-pm-1836x1251.png)
*I added the "Business Central Virtual Table" app*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.37.44-pm-1836x1013.png)
*I enabled the "Dynamics 365 Business Central for Virtual Tables" Microsoft Entra app.*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.41.38-pm-1836x915.png)
*I played the Business Central Configuration app*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-2.21.01-pm-1836x708.png)
*I added a Data Source Configuration*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.41.55-pm-1836x918.png)
*I reviewed the Available Tables*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.42.25-pm-1836x915.png)
*I clicked the vendor table*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.42.37-pm-1836x919.png)
*I updated the Visible field to Yes*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.43.02-pm-1836x918.png)
*I saved the vendor table update*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.44.35-pm-1836x918.png)
*I updated the customer table Visible field to Yes*

:::no-dumb-questions
**Q: What is a virtual table?**

A: A table in Dataverse that does not hold its own data. It is a window onto Business Central, and it allows create, read, update and delete operations from Dataverse against Business Central. There is no second copy to keep in step.

**Q: Why did I set the Visible field to Yes?**

A: The Business Central Configuration app lists the available tables, and I chose which ones to make visible. I set Visible to Yes for the vendor and customer tables, because those were the two that I wanted in my app.
:::

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.46.30-pm-1836x918.png)
*I created a Business Central Solution*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.48.35-pm-1836x671.png)
*I added a Model-driven app to the solution*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.48.59-pm-1836x918.png)
*I named the model-driven app "Customers and Vendors"*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.49.17-pm-1836x918.png)
*I clicked the + Add page button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.49.27-pm-1836x919.png)
*I clicked the Next button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.49.57-pm-1836x926.png)
*I selected the Business Central Customer table*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.50.15-pm-1836x915.png)
*I clicked the Pages + New button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.50.27-pm-1836x921.png)
*I clicked the Next button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.50.47-pm-1836x921.png)
*I selected the Business Central Vendor table*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.51.43-pm-1836x918.png)
*I clicked the Save icon*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.52.33-pm-1836x529.png)
*I navigated back to the Solution and clicked the Publish all customizations button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.52.44-pm-1836x547.png)
*I published the solution*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.53.24-pm-1836x585.png)
*I navigated back to the Power Apps home page*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.53.38-pm-1836x913.png)
*I selected the Apps menu item and clicked the Play button*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.54.29-pm-1836x975.png)
*The model driven app allowed me to view the Business Central Customers*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.54.39-pm-1836x982.png)
*The model driven app allowed me to view the Business Central Vendors*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.54.55-pm-1836x922.png)
*I clicked on an individual Customer*

:::watch-it Changes go straight to Business Central
In the model-driven app I changed the Blocked field of a customer, and I added a new customer. Because the table is virtual, those changes are written to Business Central, and I checked the Business Central Customers page to see them. Be careful which environment your virtual table points at.
:::

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.55.10-pm-1836x532.png)
*I updated the value of the Blocked field*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.56.08-pm-1836x566.png)
*I clicked + New and added a new Customer*

![](assets/images/businesscentralvirtualtable/screen-shot-2024-01-12-at-1.56.38-pm-1836x918.png)
*I navigated to the Business Central Customers page*

:::test-drive Try it yourself
1. Add the Business Central Virtual Table app and run the Business Central Configuration app.
2. Make the customer table visible, and build a model-driven app with a page for it.
3. Change a customer in the app, and then open the same customer in Business Central.
:::

:::bullet-points Recap
- A virtual table lets Dataverse create, read, update and delete Business Central data without copying it.
- The Business Central Configuration app decides which tables are visible.
- A model-driven app showed Business Central customers and vendors.
- Edits in the app were saved in Business Central.
:::
