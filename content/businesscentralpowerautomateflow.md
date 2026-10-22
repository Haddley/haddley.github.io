---
title: "Business Central Power Automate Flow"
description: "Business Central includes a Microsoft Power Automate license"
date: "2024-01-02"
categories: ["Microsoft Dynamics","Business Central","Power Platform"]
tags: "power-automate, flow, business-central, integration"
hidden: false
slug: "businesscentralpowerautomateflow"
image: "/assets/images/businesscentralpowerautomateflow/posts-meta.svg"
---




Power Automate flows are triggered when Business Central records are created, modified, or deleted. Flows can also be run on a user-defined schedule or on demand.

A Power Automate flow should at least contain one trigger and one action.

:::brain-power Before you read on
You want an email every time a new vendor is created. What has to start the process, and what has to happen next? Write the two parts down, and then see what Power Automate calls them.
:::

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.00-pm-1836x1132.png)
*I created a new Instant Cloud Flow*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.31-pm-1836x1128.png)
*I did not provide a flow name. I clicked the Skip button*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.57-pm-1836x1128.png)
*I entered "Business Central" into the search box and then clicked on the Dynamics 365 Business Central logo*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.16-pm-1836x1129.png)
*I selected the "When a record is created" Trigger.*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.33-pm-1836x988.png)
*I selected the PRODUCTION environment*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.46-pm-1836x872.png)
*I selected the Evaluation company*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.00-pm-1836x1130.png)
*I selected API Category "v2.0"*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.16-pm-1836x1134.png)
*I selected the vendors table (entity)*

:::no-dumb-questions
**Q: What are a trigger and an action?**

A: A trigger is the event that starts the flow, here When a record is created in the vendors table. An action is what the flow does next, here Send an email (V2) from Outlook.com.

**Q: What is {"Row Id"} in the subject?**

A: Dynamic content. It is a value that the trigger supplies, so each email carries the id of the vendor that started the flow. I put the body of the record into the email body in the same way.
:::

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.29-pm-1836x907.png)
*I clicked the + New step button*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.47-pm-1836x1132.png)
*I entered outlook into the search box. I selected the Outlook.com logo*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.59-pm-1836x1136.png)
*I selected the "Send an email (v2)" Action*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.33.29-pm-1836x1136.png)
*I entered neil@haddley.com into the To field*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.34.19-pm-1836x1132.png)
*I entered "New Vendor with Id {"Row Id"}" into the Subject field*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.34.38-pm-1836x1127.png)
*I added {"body"} into the Body field*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.09-pm-1836x774.png)
*I reviewed the new flow*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.22-pm-1836x1133.png)
*I noticed that the 28-day run history was empty*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.34-pm-1836x674.png)
*I navigated to Vendors page in the Business Central web site. I clicked the + New button*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.43-pm-1836x1015.png)
*I selected the VENDOR COMPANY option and clicked OK*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.55-pm-1836x1133.png)
*I reviewed the newly saved Vendor record*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.02-pm-1836x1133.png)
*I reviewed the Sent folder in the Outlook.com web site*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.36-pm-1836x1137.png)
*I did not enter any Vendor details. I did not navigate away from the new Vendor page.*

:::watch-it The trigger fires on creation
I created the vendor but entered no details and stayed on the new vendor page, and the flow still ran and sent an email. A When a record is created trigger fires as soon as the record exists, so the email may arrive before anyone has filled the vendor in. Also, my flow used the PRODUCTION environment with the Evaluation company, so use a sandbox for your own tests.
:::

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.45-pm-1836x1133.png)
*I reviewed the flow details and noticed that the 28-day run history was updated. I clicked on the history item*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.59-pm-1836x1125.png)
*I reviewed the flow instance*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.40.34-pm-1836x1132.png)
*I reviewed the sent email details*

![](assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.40.54-pm-1836x1131.png)
*I navigated to Outlook.com and reviewed the sent email*

:::test-drive Try it yourself
1. Create an instant cloud flow with the Business Central When a record is created trigger.
2. Add a Send an email (V2) action that uses dynamic content in the subject.
3. Create a vendor in Business Central, and check the flow's run history.
4. Open the sent email and compare it with the vendor record.
:::

:::bullet-points Recap
- A Power Automate flow needs at least one trigger and one action.
- The Business Central trigger fired when I created a vendor, and the action sent an email.
- Dynamic content such as the Row Id puts record values into the email.
- The flow ran as soon as the vendor existed, even though I had entered no details.
:::
