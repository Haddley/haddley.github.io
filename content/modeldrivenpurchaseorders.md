---
title: "Model Driven Purchase Orders"
description: "A comprehensive guide covering model driven purchase orders"
date: "2025-09-20"
category: "Development"
image: "/assets/images/modeldrivenpurchaseorders/hero.png"
tags: ["ai","business central","dynamics","power platform"]
---

![](/assets/images/modeldrivenpurchaseorders/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


I created a Power Platform Model Driven application to manage Business Central Purchase Orders.

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.16.37-pm-1836x827.png)
*I reset my Develop environment*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.17.39-pm-1836x819.png)
*I navigated to the Business Central Virtual Table app published on AppSource*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.18.12-pm-1836x821.png)
*I selected the Develop environment and clicked the Install button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.24.39-pm-1836x372.png)
*The Business Central Virtual Entity Dynamics 365 app was installed*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.25.57-pm-1836x771.png)
*I navigated to make.powerapps.com and ran the Business Central Configuration app*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.28.13-pm-1836x773.png)
*No tables were displayed*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.28.26-pm-1836x765.png)
*I navigated to the Configurations page and clicked on the Business Central item*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.29.49-pm-1836x820.png)
*I entered Production as the Environment name and Evaluation as the Default Company name*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.30.09-pm-1836x613.png)
*I clicked the Save & Close button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.40.38-pm-1836x641.png)
*I navigated to the Available Tables page and clicked on the purchaseOrder table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.40.53-pm-1836x641.png)
*I updated the Visible value to Yes. I clicked the Save & Close button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.41.50-pm-1836x398.png)
*The purchaseOrder table was set to Visible*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.43.00-pm-1836x493.png)
*I navigated the the Power Apps Tables list and clicked on the Purchase Order Table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.43.43-pm-1836x372.png)
*I clicked on the Relationships link and could see that there was a relationship between the Purchase Order table and the Company table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.44.07-pm-1836x513.png)
*I returned to the Business Central Configuration app and selected the purchaseOrderLine table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.44.20-pm-1836x628.png)
*I set the purchaseOrderTable to Visible. I clicked the Save & Close button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.45.10-pm-1836x447.png)
*The Visible property of the purchaseOrderLine table was updated*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.45.45-pm-1836x511.png)
*The purchaseOrderLine table was added to the Power Apps Tables list.*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.45.58-pm-1836x418.png)
*I reviewed the purchaseOrder table's Relationships. A Document Id relationship was shown between the purchaseOrder table and the purchaseOrderLine table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.46.11-pm-1836x649.png)
*I returned to the Business Central Configuration app and selected the vendor table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.46.24-pm-1836x644.png)
*I set the vendor to Visible. I clicked the Save & Close button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.47.16-pm-1836x619.png)
*The Visible property of the vendor table was updated*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.47.36-pm-1836x318.png)
*The vendor table was added to the Power Apps Tables list.*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.48.00-pm-1836x457.png)
*I reviewed the purchaseOrder table's Relationships. A Vendor Id relationship was shown between the purchaseOrder table and the vendor table*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.48.45-pm-1836x769.png)
*I created a new publisher*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.49.00-pm-1836x769.png)
*I created a new Business Central solution*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.49.19-pm-1836x639.png)
*A added a Model-driven app to the Business Central solution*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.49.43-pm-1836x658.png)
*I named the app Business Central*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.50.35-pm-1836x769.png)
*I added a page to the app*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.50.45-pm-1836x768.png)
*I selected the "Dataverse table" option and clicked the Next button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.51.09-pm-1836x774.png)
*I selected the Purchase Order table and checked the Show in navigation checkbox*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.51.56-pm-1836x774.png)
*The Model-driven app opened.*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.54.22-pm-1836x776.png)
*I clicked the Edit View link on the Purchase Orders view item*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.54.44-pm-1836x767.png)
*At this point the "All Purchase Orders" view Only included the Purchase Order number (No.) column*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.55.45-pm-1836x768.png)
*I added the Order Date, Status, Total Amount Excluding Tax and Total Amount Including Tax columns to the view*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.57.27-pm-1836x778.png)
*I ran the model driven app. The Purchase Orders tab was selected and a list of Business Central Purchase Orders were displayed. I clicked the + New button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.57.40-pm-1836x772.png)
*The New Purchase Order form was displayed. I clicked the Save button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.57.55-pm-1836x776.png)
*The model driven app displayed an error (because to create a Purchase Order I needed to at least provide a Vendor)*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.58.32-pm-1836x769.png)
*I clicked the Edit form link on the Purchase Orders form*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-2.58.58-pm-1836x773.png)
*I searched for the Vendor Id column.*


## Quick View

I configured the General tab to have [two columns](https://www.youtube.com/watch?v=LIC8DFW8fOE&t=5130s). I wanted to add a Quick View form to the right hand column. The Quick View form would allow a user to select a Vendor Id value on the left and to see corresponding Vendor details displayed on the right.

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.04.18-pm-1836x633.png)
*The Vendor Id column has been added to the Purchase Order form*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.08.35-pm-1836x481.png)
*I dragged the Purchase Order No. field into the header of the form (into the top right of the form)*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.17.50-pm-1836x632.png)
*I added the Order Date, Status, Total Amount Excluding Tax and Total Amount Including Tax columns into the General Section*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.18.06-pm-1836x632.png)
*I selected the General Tab and selected 2 columns*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.18.17-pm-1836x634.png)
*A new section "New Section" was added to the General Tab*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.18.56-pm-1836x632.png)
*I selected the Quick view component*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.19.19-pm-1836x631.png)
*I selected the Vendor Id Lookup and the Vendor Information Quick View form*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.19.43-pm-1836x628.png)
*I dragged the Quick View component to the right hand column (and hid the "New Section" label)*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.21.02-pm-1836x633.png)
*I added the Vendor Quick View form to the solution*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.21.17-pm-1836x629.png)
*I edited the Quick View form*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.22.30-pm-1836x627.png)
*I added the No. field*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.22.51-pm-1836x630.png)
*I added the Address Line 1 and Address Line 2 fields*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.23.06-pm-1836x636.png)
*I added the City field*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.23.23-pm-1836x633.png)
*I added the State field*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.23.34-pm-1836x633.png)
*I added the Zip Code field*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.23.44-pm-1836x632.png)
*I clicked Save & Publish*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.26.11-pm-1836x630.png)
*I ran the Business Central app. I clicked the + New button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.28.17-pm-1836x632.png)
*I selected a Vendor*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.28.28-pm-1836x631.png)
*The Vendor Id field was populated and the Quick View form was shown on the right hand side.*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.29.18-pm-1836x632.png)
*I clicked the Save button*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.29.31-pm-1836x633.png)
*The record was saved to Business Central and No. value 106034 automatically assigned*

![](/assets/images/modeldrivenpurchaseorders/screenshot-2024-03-02-at-6.29.47-pm-1836x629.png)
*The new purchase order was shown at the bottom of the "All Purchase Orders" view*
