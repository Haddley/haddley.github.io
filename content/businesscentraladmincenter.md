---
title: "Business Central Admin Center"
description: "The Business Central Administration Center"
date: "2023-08-18"
categories: ["Microsoft Dynamics","Business Central"]
tags: "admin-center, business-central, administration, tenants"
hidden: false
slug: "businesscentraladmincenter"
image: "/assets/images/businesscentraladmincenter/dynamics365-color.svg"
---


The Business Central Administration Center (Admin Center) provides a portal for tenant administration.

I used the Admin Center to create a development/sandbox environment.

:::brain-power Before you read on
You want to try something risky with your company's real data. How would you do it without putting the real data at risk?
:::

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-11.25.26-am-1836x965.png)
*I used the Settings|Admin Center link to navigate to the Admin Center (portal). Notice that the Safari browser is not supported.*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-11.25.42-am-1836x972.png)
*I clicked on the "Production" Environment*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-12.27.14-pm-1836x403.png)
*I clicked the Copy link*

:::no-dumb-questions
**Q: What is a sandbox environment?**

A: A copy of the company's Business Central environment that I can use for development and testing. I copied the Production environment into a new Sandbox environment called MySandbox, so I had realistic data to work with.

**Q: Why could I not use Safari?**

A: The first screenshot notes that the Safari browser is not supported by the Admin Center, so I used a different browser for it.
:::

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-12.28.01-pm-1836x715.png)
*I selected Sandbox environment type and entered "MySandbox" as the new environment name*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-12.28.20-pm-1836x708.png)
*I clicked the Yes link*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-12.28.40-pm-1836x717.png)
*The copy was scheduled*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-12.28.52-pm-1836x714.png)
*The MySandbox environment was listed in the Environments tab as "Preparing"*

:::watch-it Wait for Active
The copy does not finish at once. The environment is listed as Preparing, and then its state changes to Active. I waited for Active before I opened it.
:::

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-1.00.00-pm-1836x714.png)
*The Sandbox state was updated to "Active"*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-1.08.43-pm-1836x711.png)
*I clicked the link*

![](assets/images/businesscentraladmincenter/screen-shot-2023-08-18-at-1.12.12-pm-1836x929.png)
*I was able to switch between the Production and Sandbox environment*

:::test-drive Try it yourself
1. Open the Admin Center from Settings, and find your Production environment.
2. Copy it to a Sandbox environment with a name of your own.
3. When it is Active, open it and switch between the Sandbox and Production environments.
:::

:::bullet-points Recap
- The Admin Center is the portal for tenant administration.
- I copied Production to a Sandbox environment called MySandbox.
- The copy goes from Preparing to Active, and then I could switch between the two environments.
:::
