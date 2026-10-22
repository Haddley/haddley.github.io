---
title: "Add an Item"
description: "I used Patch to add a Business Central Item"
date: "2024-02-17"
categories: ["Microsoft Dynamics","Business Central","Power Platform"]
tags: "power-apps, patch, business-central, canvas-app"
hidden: false
slug: "addanitem"
image: "/assets/images/addanitem/office-365-icon-500x500.png"
---

In this post I use a Power Apps canvas app and the Patch function to add an item to Business Central. The app starts from the Business Central Configuration app and a Copilot-generated Item Setup app.

:::brain-power Before you read on
A new item needs checking before it becomes a real item in the company's books. Where would you keep a draft item while someone reviews it, and what should happen to the draft once the real item exists?
:::

![](assets/images/addanitem/screenshot-2024-02-17-at-1.30.50-pm-1836x617.png)
*I opened the Business Central Configuration app*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.31.04-pm-1836x632.png)
*I made the Business Central Item table visible*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.32.22-pm-1836x947.png)
*I generated an Item Setup app with Copilot*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.33.24-pm-1836x950.png)
*I asked Copilot to remove the columns I did not need*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.34.21-pm-1836x838.png)
*I clicked the "Preview the app" button*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.34.44-pm-1836x945.png)
*I reviewed the app*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.35.10-pm-1836x251.png)
*I saved the app*

![](assets/images/addanitem/screenshot-2024-02-17-at-4.00.08-pm-1836x749.png)
*I switched to the Data tab and clicked the + Add data button*

![](assets/images/addanitem/screenshot-2024-02-17-at-4.01.49-pm-1836x773.png)
*I selected the Business Central Virtual Table*

![](assets/images/addanitem/screenshot-2024-02-17-at-4.01.59-pm-1836x535.png)
*The Items table was added*

:::no-dumb-questions
**Q: What does Patch do?**

A: Patch is a Power Fx function that creates a record in a data source, or changes one that already exists. Here the Publish button uses it to create an item in the Business Central Items table.

**Q: Why use a Business Central Virtual Table?**

A: A virtual table lets a Power Apps app read and write Business Central data through Dataverse, without keeping a second copy of the data. That is why I could add the Items table to the app as a data source.
:::

![](assets/images/addanitem/screenshot-2024-02-17-at-1.48.48-pm-1836x943.png)
*I duplicated the delete button*

![](assets/images/addanitem/screenshot-2024-02-17-at-1.50.12-pm-1836x774.png)
*I configured the new button to display the Publish icon*

![](assets/images/addanitem/screenshot-2024-02-17-at-2.00.57-pm-1836x947.png)
*I updated the button's OnSelect property*

![](assets/images/addanitem/screenshot-2024-02-17-at-2.01.46-pm-1836x812.png)
*I previewed the app*

![](assets/images/addanitem/screenshot-2024-02-17-at-2.02.04-pm-1836x593.png)
*I selected an item and clicked the Publish button*

![](assets/images/addanitem/screenshot-2024-02-17-at-2.02.19-pm-1836x748.png)
*The item was added to Business Central and I was prompted to confirm a delete*

![](assets/images/addanitem/screenshot-2024-02-17-at-2.02.31-pm-1836x718.png)
*The Item Setup record has been deleted*

:::watch-it The Publish button was a copy of the delete button
I made the Publish button by duplicating the delete button, and then I changed its icon and its OnSelect property. That is why the app still asked me to confirm a delete after the item was added. The Item Setup record was removed, because the real item now exists in Business Central, but a confirmation that says delete is confusing. In a finished app I would change the wording.
:::

![](assets/images/addanitem/screenshot-2024-02-17-at-2.03.33-pm-1836x673.png)
*The Business Central item has been added*

:::test-drive Try it yourself
1. Preview the app, select an item in the Item Setup list, and click Publish.
2. Confirm the delete, and check that the Item Setup record has gone.
3. Open the Items list in Business Central and look for the new item.
:::

:::bullet-points Recap
- A Copilot-generated Item Setup app gave me a place to prepare a new item.
- Patch creates a record in a data source, and here it created the Business Central item.
- The Business Central Virtual Table made the Items table available to the app without a second copy.
- A button that I copied from the delete button still asked for a delete confirmation.
:::
