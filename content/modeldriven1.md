---
title: "Model Driven Apps (Part 1)"
description: "Users"
date: "2023-09-18"
categories: ["Power Platform"]
tags: "model-driven-app, power-apps, users, dataverse"
slug: "modeldriven1"
image: "/assets/images/modeldriven1/office-365-icon-500x500.png"
---



The illustration below shows the p8lf organization structure. I assigned Dataverse security roles to each user based on their duties.

![](/assets/images/modeldriven1/screenshot-2023-09-19-at-7.50.16-am-1586x1204.png)
*p8lf users*


## Environments

Power Apps environments are logical containers for building, testing, and deploying apps, flows, and solutions. I used them to isolate development from production, manage access, and control deployment across the project lifecycle. I created a Develop environment alongside the default p8lf environment provided by Microsoft.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.26.35-pm-1836x744.png)
*I created the Develop environment. The p8lf (default) environment was provided by Microsoft.*


## Solutions

In Power Platform, Solutions are containers for grouping related components — apps, flows, custom connectors — into packages that can be deployed across environments. I used Solutions to organise assets, manage versions, and transport components from the Develop environment to production.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.43.15-pm-2136x586.png)
*Solutions in the Develop environment*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.37.13-pm-1836x998.png)
*Publishers in the Develop environment*


## Suggestions

As a demonstration I created a Suggestions model driven app.

The steps are shown below.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.43.42-pm-1836x997.png)
*I created a Suggestions solution in the Develop environment*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.46.11-pm-1836x998.png)
*I added a Suggestion table to the Suggestions solution*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.47.44-pm-1836x996.png)
*I updated the type of the Name column from Single line of text to Autonumber*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.49.21-pm-1836x997.png)
*I added an Autonumber prefix (and updated Required to Optional)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.51.34-pm-1836x996.png)
*I added a Suggested Details column*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.53.37-pm-1836x993.png)
*I updated the Active Suggestions view (I clicked the Save and publish button)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.36.49-pm-1836x642.png)
*I updated the Main form (I clicked the Save and publish button)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.58.41-pm-1836x998.png)
*I created a model driven app*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.00.19-pm-1836x996.png)
*I added a page to the model driven app*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.01.12-pm-1836x334.png)
*I clicked the Publish button*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.02.02-pm-1836x452.png)
*I clicked the Export solution button*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.03.54-pm-1836x1000.png)
*I clicked the Export button*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.04.40-pm-1836x245.png)
*I downloaded the solution*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.05.54-pm-1836x564.png)
*I switched to the p8lf (default) environment*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.07.34-pm-1836x372.png)
*I imported the managed solution*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.12.13-pm-1836x476.png)
*The suggestions solution was imported successfully*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.13.50-pm-1836x341.png)
*The Suggestion table was created*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.14.49-pm-1836x439.png)
*The Suggestions app was created*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.15.41-pm-1836x619.png)
*Clicking the Suggestions button on the navigation menu opened the Active Suggestions view*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.44.05-pm-1836x486.png)
*I created a new Suggestion and clicked Save & Close*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.44.17-pm-1836x520.png)
*I can see my suggestions*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.47.23-pm-1836x726.png)
*What can Isaiah see?*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-7.57.27-pm-1836x842.png)
*Logged into office.com as IsaiahL@p8lf.onmicrosoft.com*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.02.05-pm-1836x842.png)
*Isaiah is unable to run the Suggestions app*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.04.42-pm-1836x931.png)
*I checked what security roles were enabled for Isaiah*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.05.36-pm-1836x928.png)
*Basic User security role was enabled*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.05.46-pm-1836x925.png)
*Environment Maker security role was enabled*


## Environments and Solutions

The [Basic User](https://learn.microsoft.com/en-us/power-platform/admin/database-security) role grants access to core business tables and lets users run apps and manage their own records. The [Environment Maker](https://learn.microsoft.com/en-us/power-platform/admin/database-security) role lets users create resources — apps, connections, flows — but doesn't grant access to data. Neither role was sufficient for Isaiah to access the Suggestions table or run the app.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.11.10-pm-1836x787.png)
*Isaiah is unable to access the Suggestions table (or to run the Suggestions app)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.15.37-pm-1836x695.png)
*I returned to the Develop environment and added a Security role*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.22.13-pm-1836x339.png)

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.22.45-pm-1836x208.png)
*The quarter yellow circle shows that the permissions apply to the record owner.Suggestion table permissions (User)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.26.15-pm-1836x740.png)
*I exported the updated solution*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.31.45-pm-1836x255.png)
*I imported the updated solution*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.34.49-pm-1836x612.png)
*I added Suggestions Maker role to user Isaiah*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.36.36-pm-1836x198.png)
*Security roles have been updated for Isaiah Langer*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.41.06-pm-1836x461.png)
*Isaiah added a Suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-8.41.16-pm-1836x410.png)
*Isaiah could only see his suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.22.05-pm-1836x422.png)
*Lidia can not see Isaiah's suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.22.45-pm-1836x494.png)
*Lidia added a suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.22.57-pm-1836x516.png)
*Lidia can only see her suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.37.04-pm-1836x426.png)
*Lynne can not see Lidia or Isaiah's suggestions*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.37.35-pm-1836x489.png)
*Lynne added a suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.37.46-pm-1836x497.png)
*Lynne can only see her suggestion*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.41.31-pm-1836x719.png)
*I can see all of the suggestions because I am an administrator*


## Business Units

Lee and Lidia are in the same Manufacturing business unit. As Director of Manufacturing, I wanted Lee to be able to read and manage all suggestions made by anyone in his business unit.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.50.55-pm-2136x1004.png)
*I added a security role that will allow a user to manage Suggestions for their Business Unit*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.52.04-pm-2136x1002.png)
*The half yellow circle shows that the permissions apply to the business unit.Suggestion table permissions (Business Unit)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.55.39-pm-1754x1258.png)
*I created a Sales & Marketing business unit*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.56.22-pm-1758x558.png)
*I created an Operations business unit*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.56.44-pm-1758x610.png)
*I created a Manufacturing business unit*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-10.05.25-pm-2136x996.png)
*The org6bf9e824 Business Unit is the parent of the Sales & Marketing, Manufacturing and Operations Business Units*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-9.57.19-pm-2136x423.png)
*I set the Business Unit for Adele Vance (and the other users)*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-10.00.23-pm-2136x359.png)
*I updated Lee Gu's security roles*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-10.06.14-pm-2136x1240.png)
*I added the Suggestions for Business Unit Security Role*

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-10.11.03-pm-2136x588.png)
*Lee can see the Suggestion made by Lindia because Lee has the Suggestions For Business Role and Lindia and Lee are both in the Manufacturing Business Unit*