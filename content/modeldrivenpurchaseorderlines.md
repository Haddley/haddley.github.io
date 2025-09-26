---
title: "Model Driven Purchase Order Lines"
description: "manage Business Central Purchase Order Lines"
date: "2025-09-20"
category: "Development"
image: "/assets/images/modeldrivenpurchaseorderlines/hero.png"
tags: ["ai","business central","power platform"]
---

# Model Driven Purchase Order Lines

## manage Business Central Purchase Order Lines


![](/assets/images/modeldrivenpurchaseorderlines/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


I created a Power Platform Model Driven application to manage Business Central Purchase Order Lines.

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.17.24-pm-1836x943.png)
*I set the General Section to 2 columns and moved the Quick View form into that section.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.18.11-pm-1836x885.png)
*I set the General Tab to be 1 column*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.19.33-pm-1836x890.png)
*I added a new section below the General Section*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.19.50-pm-1836x883.png)
*I added a Purchase Order Lines Subgrid to the New Section (with the Show related records checkbox selected).*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.21.22-pm-1836x889.png)
*I hid the Section and Subgrid labels*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.22.37-pm-1836x944.png)
*A row was added to the Subgrid for every Purchase Order Line.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.24.17-pm-1836x614.png)
*I navigated into the Business Central solution.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.25.23-pm-1836x949.png)
*I added the "All Purchase Order Lines" view to the solution*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.26.21-pm-1836x942.png)
*I added the Amount Excluding Tax column to the All Purchase Order Lines view.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.26.32-pm-1836x945.png)
*I clicked the Save & Publish button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.27.04-pm-1836x945.png)
*I refreshed the Business Central app.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.30.45-pm-1836x769.png)
*I added all of the other available columns to the view. I clicked the Save & Publish button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.31.37-pm-1836x945.png)
*I refreshed the Business Central app.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.32.08-pm-1836x944.png)
*I clicked the + New Purchase Order Line button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.32.29-pm-1836x939.png)
*I clicked the Save button and the application generated an error.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.33.25-pm-1836x945.png)
*I navigated to the Business Central solution*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.33.46-pm-1836x945.png)
*I added the Purchase Order Line Main Information form to the solution*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.34.04-pm-1836x947.png)
*I clicked the Edit button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.36.43-pm-1836x943.png)
*I added the Line Type and Description fields*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.37.25-pm-1836x628.png)
*I ran the Business Central app. I tried to add a purchase order line.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.37.40-pm-1836x526.png)
*I selected Line Type "Comment" and provided a Description*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.38.02-pm-1836x727.png)
*The application generated an error.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.38.34-pm-1836x940.png)
*I added the Document Id to the form*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.22-pm-1836x942.png)
*I clicked the + New Purchase Order Line button again*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.31-pm-1836x546.png)
*The Document Id was automatically populated*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.41-pm-1836x662.png)
*I selected Line Type Comment.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.39.55-pm-1836x600.png)
*I provided a Description and clicked the Save button. The record was saved and the Line Object No. field was updated (cleared)*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.40.44-pm-1836x866.png)
*The Purchase Order Line was shown in the Subgrid*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.41.24-pm-1836x940.png)
*When I selected the record the menu options changed.*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.44.25-pm-1836x557.png)
*I returned to the Business Central Configuration app and selected the Item table*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.44.36-pm-1836x657.png)
*I updated the Item table to Visible*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.48.17-pm-1836x940.png)
*I added the Item table to the Business Central solution*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.48.26-pm-1836x940.png)
*I clicked the Add button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-03-at-3.14.00-pm-1836x709.png)
*I noticed that a Many-to-one relationship had been added to the Purchase Order Line table*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.49.38-pm-1836x945.png)
*I reviewed the records in the Business Central Item table*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.51.16-pm-1836x948.png)
*I added the Item Id column to the Purchase Order Line table's Main form*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.51.30-pm-1836x944.png)
*I clicked the Save and publish button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.18-pm-1836x942.png)
*I clicked the + New Purchase Order Line button*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.30-pm-1836x943.png)
*I selected an Item*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.42-pm-1836x944.png)
*I set the Line Type value to Item*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.52.53-pm-1836x663.png)
*I clicked the Save button (notice that I did not enter a description)*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.53.08-pm-1836x713.png)
*Once the record had been saved a Line Object No. value was generated*

![](/assets/images/modeldrivenpurchaseorderlines/screenshot-2024-03-02-at-8.53.52-pm-1836x944.png)
*I clicked the back button to return to the Purchase Order form*
