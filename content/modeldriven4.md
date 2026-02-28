---
title: "Model Driven Apps (Part 4)"
description: "Power FX"
date: "2023-10-09"
categories: ["Power Platform"]
tags: "model-driven-app, power-fx, formula, dataverse"
slug: "modeldriven4"
image: "/assets/images/modeldriven4/office-365-icon-500x500.png"
---


Power FX is Microsoft's low-code formula language for the Power Platform. It uses Excel-like syntax to create expressions, custom business logic, and automation across Power Apps, Power Automate, and other Microsoft products. I used Power FX to add a Clone button to my model driven app's command bar.


## Clone a Record

I used Power FX to add a Clone button to my Project Model Driven App's Main Form Command Bar.

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.00.42-pm-2136x1080.png)
*I selected Projects view and selected the "Edit command bar" menu item*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.01.14-pm-2136x1010.png)
*I selected the Main form command bar*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.03.28-pm-2136x1013.png)
*I added a new command*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.05.32-pm-2136x1012.png)
*I named the command Clone, selected the Clone Icon and selected the Run formula action*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.10.41-pm-2136x1010.png)
*I selected the Show on condition from formula visibility option*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.08-pm-2136x1014.png)
*I only wanted the Clone command to be visible when the State...*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.33-pm-2136x1012.png)
*... was not FormMode.New*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.53-pm-2136x386.png)
*I clicked the Save and Publish button*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.12.58-pm-2136x711.png)
*The Clone command didn't appear when I was creating a new record*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.16.12-pm-2136x642.png)
*The Clone command appeared when I was viewing an existing record*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.19.13-pm-2136x879.png)
*I updated the Run formula action*


## Power FX

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.34.27-pm-2136x219.png)
*I clicked the Save and Publish button and the Play button*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.34.52-pm-2136x651.png)
*I opened an existing record and clicked the Clone button*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.35.05-pm-2136x787.png)
*The Power FX formula created a new record using the original record's Business Need value, navigated me to the new record, and displayed a "Project Item Copied" message*

![](assets/images/modeldriven4/screenshot-2023-10-08-at-12.50.47-pm-2136x892.png)
*The browser's developer tools shows the JavaScript generated from the Power FX formula*