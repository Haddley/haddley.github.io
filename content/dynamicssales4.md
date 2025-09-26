---
title: "Dynamics 365 Sales (Part 4)"
description: "Tiki Tour"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/dynamicssales4/hero.png"
tags: ["ai","dynamics"]
---

# Dynamics 365 Sales (Part 4)

## Tiki Tour

![](/assets/images/dynamicssales4/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Tiki Tour

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.00.51-pm-2136x915.png)
*I wanted to add a new table*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.02.03-pm-2136x1220.png)
*I added a Warranty table*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.02.34-pm-2136x1227.png)
*By default the name column is required single line of text*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.04.08-pm-2136x1222.png)
*I updated the name column to be an autonumber*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.05.39-pm-2136x1272.png)
*I added a required Start Date column*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.06.51-pm-2136x1273.png)
*I added an End Date formula column*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.07.27-pm-2136x1274.png)
*End Date would be calculated to be 3 years after the Start Date*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.08.10-pm-2136x1272.png)
*I added an Account (record) Lookup Column*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.08.51-pm-2136x1276.png)
*Adding the Account Lookup column creates a new Many-to-one relationship*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.09.57-pm-2136x1270.png)
*I added a Many-to-one relationship (Column) for Product (record)*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.10.55-pm-2136x1128.png)
*I updated the Main Warranty form*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.11.17-pm-2136x1274.png)
*Initially the Main form only included the Name and Owner columns*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.16.00-pm-2136x1292.png)
*I moved the Owner Column to the form header and removed the Name column. I added the Start Date, End Date, Account and Product Columns*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.17.19-pm-2136x896.png)
*I updated the Active Warranties view*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.18.11-pm-2136x581.png)
*I added the Start Date, End Date, Account and Product Columns to the view*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.19.18-pm-2136x855.png)
*I added a 1-column tab to the Account table's Main form*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.19.42-pm-2136x1293.png)
*I renamed the new tab "Warranties"*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.20.13-pm-2136x1292.png)
*I added a subgrid to the new tab*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.20.56-pm-2136x1289.png)
*I updated the Labels*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.21.10-pm-2136x322.png)
*I Saved and Published my changes*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.23.44-pm-2136x1292.png)
*I added the Sales Trial app to the Sales Customizations solution*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.24.32-pm-2136x1291.png)
*I added a Dataverse table page*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.24.50-pm-2136x1290.png)
*I selected the Warranty table*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.25.07-pm-2136x686.png)
*I published my changes*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.26.02-pm-2136x1087.png)
*The Sales Trial app now included a Warranties page*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.27.01-pm-2136x1245.png)
*The Accounts page includes a Warranties tab*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.27.15-pm-2136x1243.png)
*I can create a new Warranty (for the current Account) using the + New Warranty button*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.27.27-pm-2136x1020.png)
*The Account is automatically filled in*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.27.50-pm-2136x1141.png)
*I entered the Start Date, selected a Product and clicked the Save button*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.28.03-pm-2136x1083.png)
*The new record is saved with the name "warranty-100000"*

![](/assets/images/dynamicssales4/screenshot-2023-10-21-at-5.28.19-pm-2136x1239.png)
*The Warranty is shown in the subgrid*