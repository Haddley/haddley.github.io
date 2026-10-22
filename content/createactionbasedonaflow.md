---
title: "Create action based on a flow"
description: "Created from the Business Central user interface"
date: "2024-01-04"
categories: ["Power Platform","Microsoft Dynamics","Business Central"]
tags: "power-automate, flow, business-central, copilot-studio"
hidden: false
slug: "createactionbasedonaflow"
image: "/assets/images/createactionbasedonaflow/posts-meta.svg"
---




Power Automate flows can be created from the Business Central user interface.

:::brain-power Before you read on
A user is looking at a customer in Business Central and wants to block them and tell them by email, all with one click. What would the click have to start, and what would the click need to know about the customer?
:::

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.30.40-pm-1836x950.png)
*I started with no flows defined*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.31.36-pm-1836x949.png)
*I navigated to a Customer Card page and clicked the "Automate | Power Automate | Create action based on flow" menu item*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.32.12-pm-1836x946.png)
*I clicked the "+ Create a flow" button*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.32.40-pm-1836x951.png)
*I was redirected to a https://make.powerautomate.com/ page*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.33.07-pm-1836x953.png)
*I selected the PRODUCTION Environment*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.33.20-pm-1836x947.png)
*I selected the Evaluation Company*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.34.18-pm-1836x951.png)
*I specified TABLE18 (to limit the flow to customer entities)*

:::no-dumb-questions
**Q: What does TABLE18 do?**

A: It limits the flow to customer records. As the caption says, TABLE18 is the customer table, so the flow appears as a menu item for customers and not for other records.

**Q: Why did I use {System Id} as the Row Id?**

A: The Get record and Update record actions need to know which customer to work on. The System Id comes from the record that the user selected, so the flow acts on that customer.

**Q: What is the BlockCustomer? input?**

A: A Yes/No question that the user answers when they run the flow. The Condition action reads it and chooses a branch.
:::

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-7.47.03-pm-1836x802.png)
*I added a "BlockCustomer?" Yes/No input*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.38.06-pm-1836x951.png)
*I wanted to add a Business Central action.*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.38.23-pm-1836x951.png)
*I selected the Get record (V3) action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.38.42-pm-1836x950.png)
*I selected the PRODUCTION Environment*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.38.54-pm-1836x950.png)
*I selected the Evaluation company*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.39.08-pm-1836x955.png)
*I selected the v2.0 API Category*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.39.37-pm-1836x946.png)
*I selected the customers table*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.39.51-pm-1836x952.png)
*I provided {System Id} as the Row Id*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.40.17-pm-1836x947.png)
*I provided {System Id} as the Row Id*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.40.31-pm-1836x948.png)
*I selected the Control icon*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.40.51-pm-1836x951.png)
*I added a Condition action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.41.08-pm-1836x946.png)
*I clicked the Choose a value field*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.41.25-pm-1836x948.png)
*I selected the BlockCustomer? field*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.42.45-pm-1836x952.png)
*I entered the value "true"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.43.16-pm-1836x952.png)
*I clicked the "Add an action" button in the yes branch of the Condition action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.43.46-pm-1836x950.png)
*I selected the Dynamics 365 Business Central icon*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.44.19-pm-1836x949.png)
*I selected the Update record (V3) action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.44.38-pm-1836x949.png)
*In the update record I selected the PRODUCTION environment*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.44.51-pm-1836x950.png)
*I set Company to Evaluation*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.45.06-pm-1836x949.png)
*I set the API category to v2.0*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.45.24-pm-1836x946.png)
*I selected the customers entity*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.46.01-pm-1836x948.png)
*I set the Row Id value to {System Id}*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.46.28-pm-1836x942.png)
*I set the Blocked value to "ALL"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.46.51-pm-1836x954.png)
*I added another action to the yes branch of the Condition action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.47.12-pm-1836x953.png)
*I selected the Outlook.com icon*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.47.31-pm-1836x948.png)
*I selected the Send an email (V2) action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.47.52-pm-1836x955.png)
*I clicked the Sign in button*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.49.16-pm-1836x951.png)
*I set the To field value to the {Email} field from the "selected record"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.49.32-pm-1836x956.png)
*I set the To field value to the {Email} field from the "selected record"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.50.18-pm-1836x951.png)
*I set the Subject to Blocked*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.52.19-pm-1836x946.png)
*I set the email Body to "We have updated..."*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.52.38-pm-1836x953.png)
*I clicked the "Add an action" button in the no branch of the Condition action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.53.05-pm-1836x956.png)
*I selected the Outlook.com icon*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.53.20-pm-1836x951.png)
*I selected the Send an email (V2) action*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.53.45-pm-1836x955.png)
*I set the To field value to the {Email} field from the "selected record"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.53.57-pm-1836x950.png)
*I set the To field value to the {Email} field from the "selected record"*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.54.53-pm-1836x951.png)
*I set the Subject to "Contact" and the Body to "Please give us..."*

:::under-the-hood The shape of the flow
The flow starts from the selected customer and the BlockCustomer? answer. It gets the customer record, and a Condition checks whether the answer is true. In the yes branch, it updates the record with Blocked set to ALL and emails the customer with the subject Blocked. In the no branch, it sends a different email with the subject Contact. Both emails go to the Email field of the selected record.
:::

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.55.16-pm-1836x944.png)
*I clicked the Save button*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.55.41-pm-1836x448.png)
*Power Automate generated a "Your flow is ready to go..." notification*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.56.23-pm-1836x946.png)
*I clicked the "Automate | ApiConnection-> Get record (V3)..." menu item*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.56.46-pm-1836x953.png)
*I clicked Continue to Sign in.*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.57.06-pm-1836x949.png)
*I reviewed the Run flow form.*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.57.17-pm-1836x946.png)
*I clicked the "BlockCustomer?" switch and clicked the Run flow button*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.57.30-pm-1836x950.png)
*The flow was started*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.57.51-pm-1836x953.png)
*I returned to Power Automate and clicked on the flow*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.58.09-pm-1836x952.png)
*I reviewed the flow history*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.58.41-pm-1836x953.png)
*The flow had run (executing the yes branch of the Condition)*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.59.00-pm-1836x953.png)
*I reviewed the generated email*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-6.59.49-pm-1836x946.png)
*I navigated to Outlook.com*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-04-at-7.00.06-pm-1836x951.png)
*I reviewed the generated email (sent to the selected customer)*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-7.49.08-am-1836x793.png)
*I navigated to the flow details page*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-7.49.51-am-1836x797.png)
*I updated the flow name*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-8.06.07-am-1836x800.png)
*The Blocked? flow name is displayed as a menu item in the Customers page (TABLE18 is the customer table)*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-7.52.33-am-1836x799.png)
*The Blocked? flow name is displayed as a menu item on the Customer Card*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-7.56.08-am-1836x794.png)
*I noticed that the Blocked? flow is not displayed as a menu item in the Items page.*

![](assets/images/createactionbasedonaflow/screen-shot-2024-01-05-at-7.56.29-am-1836x799.png)
*I noticed that the Blocked? flow is not displayed as a menu item on the Vendor Card*

:::pencil Where will the flow appear?
I limited the flow to TABLE18. On which of these pages would you expect to see the Blocked? menu item: the Customers page, the Customer Card, the Items page and the Vendor Card?

:::answer
On the Customers page and the Customer Card, because both show customer records. The last two screenshots show that it did not appear on the Items page or on the Vendor Card, since those pages show other tables.
:::
:::

:::watch-it This flow changes real data
The flow updates a customer's Blocked field and sends real emails. I built it in the PRODUCTION environment with the Evaluation company, so use a sandbox for your own tests, and check the email text before you run the flow on a real customer.
:::

:::test-drive Try it yourself
1. On a Customer Card, open Automate, then Power Automate, then Create action based on flow.
2. Build the flow with a Yes/No input, a Condition and an email in each branch.
3. Run it on a test customer with the switch on, and then with it off.
4. Check the flow history, the customer's Blocked field and the emails.
:::

:::bullet-points Recap
- A flow can be created from the Business Central user interface and appear as a menu item.
- TABLE18 limited the flow to customers, so it did not appear on the Items page or the Vendor Card.
- A Condition chose between blocking the customer and sending a contact email.
- The flow changed real data, so test it in a sandbox first.
:::
