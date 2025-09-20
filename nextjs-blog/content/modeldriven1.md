---
title: "Model Driven Apps (Part 1)"
description: "A comprehensive guide covering model driven apps (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/modeldriven1/hero.png"
tags: ["sql","database","ai","power platform","testing"]
---

# Model Driven Apps (Part 1)

## Dataverse users, business units and security roles

![](/assets/images/modeldriven1/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Users

The illustration below shows p8lf's organization structure.

The individuals listed below will receive Dataverse security roles aligned with their duties.

![](/assets/images/modeldriven1/screenshot-2023-09-19-at-7.50.16-am-1586x1204.png)
*p8lf users*


## Environments

Power Apps environments are logical containers within the Microsoft Power Platform where you can build, test, and deploy apps, flows, and other solutions. These environments provide a structured way to manage and govern your Power Apps and Power Automate (formerly known as Microsoft Flow) resources. Here are some key aspects of Power Apps environments:

Isolation: Environments provide a way to isolate different projects, teams, or departments within your organization. Each environment has its own set of resources and settings, making it easier to manage and control access to data and solutions.

Security: Environments allow you to define security policies and permissions at the environment level. This means you can control who has access to the resources and data within a particular environment.
Development and Testing: Environments support the development and testing lifecycle of your Power Apps and Power Automate solutions. You can create a development environment for building and testing your applications before promoting them to a production environment.

Data Sources: You can connect environments to different data sources, such as SharePoint, SQL databases, or custom connectors. This allows you to access and manipulate data as needed for your apps and flows.

Deployment: Environments facilitate the deployment of solutions from one environment to another. You can move apps, flows, and other components from a development or test environment to a production environment when they are ready for use.

Governance: Environments help organizations enforce governance policies by separating environments for different purposes and controlling access to resources. This is crucial for maintaining data integrity and security.

Versioning: You can maintain different versions of apps and flows in separate environments. This allows you to keep track of changes and revert to previous versions if necessary.

Sandbox Environments: Power Apps also offer sandbox environments, which are ideal for testing and experimentation. They provide a safe space to try out new ideas without affecting production environments.

In summary, Power Apps environments are essential for managing and organizing your Power Platform resources effectively. They provide a structured approach to development, testing, deployment, and security, helping organizations make the most of the Power Apps and Power Automate capabilities while maintaining control and governance.

![](/assets/images/modeldriven1/screenshot-2023-09-18-at-6.26.35-pm-1836x744.png)
*I created the Develop environment. The p8lf (default) environment was provided by Microsoft.*


## Solutions

In the context of Microsoft Power Platform, "Solutions" refer to containers or packages that allow you to group and manage related components such as apps, flows, custom connectors, and more. Solutions provide a way to organize, deploy, and package your Power Platform assets, making it easier to manage and transport them across different environments. Here are some key aspects of Power Platform Solutions:

Organizational Structure: Solutions help you organize your Power Platform assets logically. You can group components that belong to a specific project, department, or business process within a solution.

Version Control: Solutions support version control for your components. You can maintain multiple versions of a solution, allowing you to track changes, implement updates, and roll back to previous versions if needed.
Portability: Solutions make it easy to transport your apps, flows, and other components between different environments, such as from a development environment to a production environment. This simplifies the deployment process.

Dependency Management: Solutions automatically manage dependencies between components. When you include a component in a solution, it will also include any related components required for it to function properly.

Managed and Unmanaged Solutions: There are two types of solutions: managed and unmanaged. Managed solutions are typically used for distributing and protecting your intellectual property, as they prevent users from modifying the included components. Unmanaged solutions, on the other hand, allow users to make changes to components within the solution.

Security: Solutions allow you to specify security roles and permissions for the components within them. This ensures that only authorized users have access to specific parts of the solution.

Distribution: You can distribute solutions to other organizations or tenants, making it easier to share your applications and customizations with external parties or clients.

Export and Import: You can export solutions as package files (managed or unmanaged) and import them into other environments or instances of the Power Platform. This is particularly useful for promoting changes from development to testing and production environments.

Lifecycle Management: Solutions are a key component of the Power Platform's application lifecycle management (ALM) process, allowing you to define and manage the various stages of development, testing, and deployment.

Overall, Power Platform Solutions are essential for structuring, managing, and controlling your Power Platform assets, ensuring that you can efficiently develop, maintain, and distribute applications and customizations within your organization and across different environments.

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

The [Basic User](https://learn.microsoft.com/en-us/power-platform/admin/database-security) security role grants privileges to the core business tables, such as Account, Contact, and Activity. Basic Users can access out-of-the-box entities only. Basic Users can run an app in the environment and perform common tasks on the records they own.

An [Environment Maker](https://learn.microsoft.com/en-us/power-platform/admin/database-security) can create new resources associated with an environment, including apps, connections, custom APIs, gateways, and flows using Microsoft Power Automate. However, this role doesn't have any privileges to access data in an environment.

Neither of these security roles allowed Isaiah to access the Suggestions table (or to run the Suggestions app)

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

Lee and Lidia are in the same Manufacturing Business Unit.

As Director of the Manufacturing we would like Lee to be able to read and manage all suggestions made by anyone in his Business Unit.

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
