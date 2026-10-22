---
title: "Model Driven Purchase Order Lines"
description: "manage Business Central Purchase Order Lines"
date: "2024-03-03"
categories: ["Business Central","Power Platform"]
tags: "model-driven-app, power-apps, purchase-orders, business-central"
slug: "modeldrivenpurchaseorderlines"
image: "/assets/images/modeldrivenpurchaseorderlines/office-365-icon-500x500.png"
---


I created a Power Platform Model Driven application to manage Business Central Purchase Order Lines.

:::brain-power Before you read on
A purchase order form should show all of its lines, and a user should be able to add a line from there. What would a new line need in order to know which purchase order it belongs to?
:::

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.17.24-pm-1836x943.png)
*I set the General Section to 2 columns and moved the Quick View form into that section.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.18.11-pm-1836x885.png)
*I set the General Tab to be 1 column*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.19.33-pm-1836x890.png)
*I added a new section below the General Section*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.19.50-pm-1836x883.png)
*I added a Purchase Order Lines Subgrid to the New Section (with the Show related records checkbox selected).*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.21.22-pm-1836x889.png)
*I hid the Section and Subgrid labels*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.22.37-pm-1836x944.png)
*A row appeared in the Subgrid for every Purchase Order Line*

:::no-dumb-questions
**Q: What is a Subgrid?**

A: A list of related records inside a form. I added a Purchase Order Lines Subgrid to a new section of the Purchase Order form, with Show related records selected, and a row appeared for every purchase order line.

**Q: Why did I hide the section and subgrid labels?**

A: They only took up room. The grid is clear without a heading, so I hid the labels.
:::

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.24.17-pm-1836x614.png)
*I navigated into the Business Central solution.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.25.23-pm-1836x949.png)
*I added the "All Purchase Order Lines" view to the solution*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.26.21-pm-1836x942.png)
*I added the Amount Excluding Tax column to the All Purchase Order Lines view.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.26.32-pm-1836x945.png)
*I clicked the Save & Publish button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.27.04-pm-1836x945.png)
*I refreshed the Business Central app.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.30.45-pm-1836x769.png)
*I added all of the other available columns to the view. I clicked the Save & Publish button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.31.37-pm-1836x945.png)
*I refreshed the Business Central app.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.32.08-pm-1836x944.png)
*I clicked the + New Purchase Order Line button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.32.29-pm-1836x939.png)
*I clicked the Save button and the application generated an error.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.33.25-pm-1836x945.png)
*I navigated to the Business Central solution*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.33.46-pm-1836x945.png)
*I added the Purchase Order Line Main Information form to the solution*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.34.04-pm-1836x947.png)
*I clicked the Edit button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.36.43-pm-1836x943.png)
*I added the Line Type and Description fields*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.37.25-pm-1836x628.png)
*I ran the Business Central app. I tried to add a purchase order line.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.37.40-pm-1836x526.png)
*I selected Line Type "Comment" and provided a Description*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.38.02-pm-1836x727.png)
*The application generated an error.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.38.34-pm-1836x940.png)
*I added the Document Id to the form*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.22-pm-1836x942.png)
*I clicked the + New Purchase Order Line button again*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.31-pm-1836x546.png)
*The form automatically populated the Document Id*

:::pencil Why did the line need a Document Id?
My first attempts to save a new purchase order line produced an error. I added the Line Type and Description fields, and it still failed. The error stopped once I added the Document Id to the form. What does the Document Id do?

:::answer
It links the line to its purchase order. In my other post about Purchase Orders, the relationship between the purchaseOrder and purchaseOrderLine tables is a Document Id relationship. When I opened the new line from the purchase order, the form filled the Document Id in automatically.
:::
:::

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.41-pm-1836x662.png)
*I selected Line Type Comment.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.55-pm-1836x600.png)
*I provided a Description and clicked the Save button. The record was saved and the Line Object No. field was updated (cleared)*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.40.44-pm-1836x866.png)
*The Purchase Order Line was shown in the Subgrid*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.41.24-pm-1836x940.png)
*When I selected the record the menu options changed.*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.44.25-pm-1836x557.png)
*I returned to the Business Central Configuration app and selected the Item table*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.44.36-pm-1836x657.png)
*I updated the Item table to Visible*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.48.17-pm-1836x940.png)
*I added the Item table to the Business Central solution*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.48.26-pm-1836x940.png)
*I clicked the Add button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-03-at-3.14.00-pm-1836x709.png)
*I noticed that a Many-to-one relationship had been added to the Purchase Order Line table*

:::under-the-hood Adding items to the lines
I made the Item table visible in the Business Central Configuration app and added it to the solution. That created a many-to-one relationship from the Purchase Order Line table to Item. I then added the Item Id column to the line's Main form, so a user could pick an item with a lookup.
:::

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.49.38-pm-1836x945.png)
*I reviewed the records in the Business Central Item table*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.51.16-pm-1836x948.png)
*I added the Item Id column to the Purchase Order Line table's Main form*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.51.30-pm-1836x944.png)
*I clicked the Save and publish button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.18-pm-1836x942.png)
*I clicked the + New Purchase Order Line button*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.30-pm-1836x943.png)
*I selected an Item*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.42-pm-1836x944.png)
*I set the Line Type value to Item*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.53-pm-1836x663.png)
*I clicked the Save button (notice that I did not enter a description)*

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.53.08-pm-1836x713.png)
*Once I saved the record, a Line Object No. value was generated*

:::watch-it Business Central fills in some values itself
For the item line I did not enter a description, and the save still worked. After I saved the record, a Line Object No. value was generated by Business Central. For the comment line, the Line Object No. was cleared. Check which fields the form should ask for, and which ones Business Central supplies.
:::

:::test-drive Try it yourself
1. Add a Purchase Order Lines Subgrid to your Purchase Order form.
2. Add a new line with Line Type Comment, and then another with Line Type Item.
3. Check each line in Business Central.
:::

:::bullet-points Recap
- A Subgrid shows the related purchase order lines inside the purchase order form.
- A new line needs the Document Id, which links it to its purchase order.
- Making the Item table visible added a relationship, so a line can look up an item.
- Business Central generated the Line Object No. when I saved an item line.
:::

![](assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.53.52-pm-1836x944.png)
*I clicked the back button to return to the Purchase Order form*
