---
title: "Business Central Power Automate Flow"
description: "Business Central includes a Microsoft Power Automate license"
date: "2024-01-02"
categories: ["Microsoft Dynamics","Business Central","Power Platform","Microsoft Dynamics"]
tags: []
slug: "businesscentralpowerautomateflow"
image: "/assets/images/posts-meta.svg"
---

# Business Central Power Automate Flow

## Business Central includes a Microsoft Power Automate license

![](/assets/images/businesscentralpowerautomateflow/dynamics365-color.svg)
*By Microsoft, Public Domain*


Power Automate flows are triggered when Business Central records are created, modified, or deleted. Flows can also be run on a user-defined schedule or on demand.

A Power Automate flow should at least contain one trigger and one action.

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.00-pm-1836x1132.png)
*I created a new Instant Cloud Flow*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.31-pm-1836x1128.png)
*I did not provide a flow name. I clicked the Skip button*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.30.57-pm-1836x1128.png)
*I entered "Business Central" into the search box and then clicked on the Dynamics 365 Business Central logo*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.16-pm-1836x1129.png)
*I selected the "When a record is created" Trigger.*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.33-pm-1836x988.png)
*I selected the PRODUCTION environment*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.31.46-pm-1836x872.png)
*I selected the Evaluation company*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.00-pm-1836x1130.png)
*I selected API Category "v2.0"*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.16-pm-1836x1134.png)
*I selected the vendors table (entity)*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.29-pm-1836x907.png)
*I clicked the + New step button*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.47-pm-1836x1132.png)
*I entered outlook into the search box. I selected the Outlook.com logo*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.32.59-pm-1836x1136.png)
*I selected the "Send an email (v2)" Action*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.33.29-pm-1836x1136.png)
*I entered neil@haddley.com into the To field*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.34.19-pm-1836x1132.png)
*I entered "New Vendor with Id {"Row Id"}" into the Subject field*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.34.38-pm-1836x1127.png)
*I added {"body"} into the Body field*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.09-pm-1836x774.png)
*I reviewed the new flow*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.22-pm-1836x1133.png)
*Notice that the 28-day run history was empty*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.34-pm-1836x674.png)
*I navigated to Vendors page in the Business Central web site. I clicked the + New button*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.43-pm-1836x1015.png)
*I selected the VENDOR COMPANY option and clicked OK*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.35.55-pm-1836x1133.png)
*I reviewed the newly saved Vendor record*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.02-pm-1836x1133.png)
*I reviewed the Sent folder in the Outlook.com web site*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.36-pm-1836x1137.png)
*I did not enter any Vendor details. I did not navigate away from the new Vendor page.*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.45-pm-1836x1133.png)
*I reviewed the flow details and noticed that the 28-day run history was updated. I clicked on the history item*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.37.59-pm-1836x1125.png)
*I reviewed the flow instance*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.40.34-pm-1836x1132.png)
*I reviewed the sent email details*

![](/assets/images/businesscentralpowerautomateflow/screen-shot-2024-01-03-at-12.40.54-pm-1836x1131.png)
*I navigated to Outlook.com and reviewed the sent email*