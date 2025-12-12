---
title: "Model Driven Apps (Part 4)"
description: "Power FX"
date: "2023-10-09"
categories: ["Power Platform","AI","Angular","Mobile","TypeScript"]
tags: ""
slug: "modeldriven4"
image: "/assets/images/office-365-icon-500x500.png"
---


Power FX is a domain-specific programming language developed by Microsoft for creating custom expressions and formulas in various Microsoft products and services, primarily within the Power Platform ecosystem. The Power Platform includes tools like Power Apps, Power Automate (formerly known as Microsoft Flow), Power BI, and Power Virtual Agents. Power FX is designed to be a low-code language, which means it is designed to be user-friendly and accessible to people with limited programming experience.

Key features and characteristics of Power FX include:

Formula Language: Power FX is primarily a formula language used for creating expressions and calculations within the Power Platform applications. Users can write formulas to manipulate data, create custom business logic, and automate processes.

Excel-Like Syntax: Power FX has a syntax that is similar to Microsoft Excel formulas, making it familiar to users who are already comfortable with Excel.

Integration: Power FX is tightly integrated with various Microsoft products and services, allowing users to create custom logic and automation within their applications and workflows.

Low-Code: Power FX is designed to be accessible to users who may not have extensive programming experience. It aims to simplify the process of creating custom logic without the need for traditional coding skills.

Extensibility: Power FX can be extended with custom connectors and functions, enabling users to integrate with external systems and services.

Cross-Platform: While initially designed for the Power Platform, Microsoft has plans to make Power FX available in other products and services, further expanding its reach.

Power FX is intended to empower business users and citizen developers to create customized solutions and automate processes within the Microsoft ecosystem. It provides a way to add flexibility and automation to applications and workflows without the need for extensive software development.


## Clone a Record

I used Power FX to add a Clone button to my Project Model Driven App's Main Form Command Bar.

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.00.42-pm-2136x1080.png)
*I selected Projects view and selected the "Edit command bar" menu item*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.01.14-pm-2136x1010.png)
*I selected the Main form command bar*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.03.28-pm-2136x1013.png)
*I added a new command*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.05.32-pm-2136x1012.png)
*I named the command Clone, selected the Clone Icon and selected the Run formula action*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.10.41-pm-2136x1010.png)
*I selected the Show on condition from formula visibility option*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.08-pm-2136x1014.png)
*I only wanted the Clone command to be visible when the State...*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.33-pm-2136x1012.png)
*... was not FormMode.New*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.11.53-pm-2136x386.png)
*I clicked the Save and Publish button*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.12.58-pm-2136x711.png)
*The Clone command does not appear when the user is creating a new record*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.16.12-pm-2136x642.png)
*The Clone command appears when the user is viewing an existing record*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.19.13-pm-2136x879.png)
*I updated the Run formula action*


## Power FX

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.34.27-pm-2136x219.png)
*I clicked the Save and Publish button and the Play button*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.34.52-pm-2136x651.png)
*I opened an existing record and clicked the Clone button*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.35.05-pm-2136x787.png)
*The Power FX formula created a new record (using record defaults and the original record's Business Need value), navigated the user to the new record and displayed a "Project Item Copied" message.*

![](/assets/images/modeldriven4/screenshot-2023-10-08-at-12.50.47-pm-2136x892.png)
*The browser's developer tools shows the JavaScript generated from the Power FX formula*