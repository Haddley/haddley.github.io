---
title: "Dynamics 365 Sales (Part 2)"
description: "The Lead to Opportunity Sales Process"
date: "2023-10-21"
categories: ["Microsoft Dynamics","AI","Angular","Mobile","Power Platform","TypeScript"]
tags: ""
slug: "dynamicssales2"
image: "/assets/images/dynamics365-color.svg"
---



I used [https://make.powerapps.com](https://make.powerapps.com) to customize the "Lead to Opportunity Sales Process" business process flow.

I added the customizations to my Sales Customizations [solution](modelDriven1.html).

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.45.17-pm-2136x1106.png)
*I wanted to add the (existing) Opportunity table to my Sales Customizations solution*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.46.26-pm-2136x1248.png)
*I selected the Opportunity table and clicked the Next button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.46.59-pm-2136x1153.png)
*I clicked Add to add the table*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.48.20-pm-2136x442.png)
*I clicked the + New button to add a column to the existing Opportunity table*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.49.08-pm-2136x1154.png)
*I added Trial Start (Optional)*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.50.06-pm-2136x1148.png)
*I added Trial End (Optional)*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.50.54-pm-2136x1109.png)
*I wanted to add an existing Business Process Flow to my Sales Customizations solution*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.51.19-pm-2136x1153.png)
*I selected the "Lead to Opportunity Sales Process" business process flow and clicked the Add button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.51.44-pm-2136x990.png)
*I clicked the Edit button up edit the Business Process Flow*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.52.40-pm-2136x1111.png)
*I clicked the Add Stage button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.53.55-pm-2136x1112.png)
*I updated the Display Name to "Trial" and clicked the Apply button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.54.47-pm-2136x1224.png)
*I added a "Trial Start" Data Step*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.55.32-pm-2136x1228.png)
*I selected the Required option*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.56.09-pm-2136x1225.png)
*I clicked the Apply button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.56.38-pm-2136x1225.png)
*I added a "Trial End" Data Step*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.56.57-pm-2136x1225.png)
*Again I selected the Required option and clicked the Apply button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.57.19-pm-2136x537.png)
*I clicked the Update button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-3.57.29-pm-2136x752.png)
*Validation was successful*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.28.51-pm-2136x1107.png)
*I opened an existing Lead and Clicked the Next Stage button to move from Qualify to Develop*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.29.10-pm-2136x1109.png)
*I created the (Lead) Opportunity*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.29.36-pm-2136x1113.png)
*I clicked the Next Stage button to move the Business Process Flow from Develop to Trial*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.29.55-pm-2136x1107.png)
*I clicked the Next Stage button again*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.30.43-pm-2136x1109.png)
*I entered Opportunity|Trail Start and Opportunity|Trial End values and clicked the Next Stage button*

![](/assets/images/dynamicssales2/screenshot-2023-10-21-at-4.32.13-pm-2136x962.png)
*The Business Process Flow moved to the Propose Stage*