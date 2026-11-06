---
type: post
slug: createactionbasedonaflow
title: "Create action based on a flow"
date: "2024-01-04"
builds_on: []
topics: [power-automate-integration, business-central-automation, conditional-logic, table-filtering]
tools: [Business Central, Power Automate, Outlook.com]
status: current
checked: "2026-11-05"
source_hash: "ca556ca488d5"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a Power Automate flow directly from the Business Central user interface. The process shows how to use specific table limitations to ensure the action appears only on relevant records.

## What I did
- I created a flow that blocks a customer and sends a notification email.
- I used TABLE18 to restrict the flow to customer records only.
- I implemented a condition to branch the logic based on a user input.
- I tested the flow in a production environment and verified the results.

## Claims
- Power Automate flows can be initiated directly from the Business Central interface.
  > "Power Automate flows can be created from the Business Central user interface."
- Using TABLE18 ensures the flow only appears for customer records.
  > "As the caption says, TABLE18 is the customer table, so the flow appears as a menu item for customers and not for other records."
- The System Id allows the flow to identify the specific record the user selected.
  > "The System Id comes from the record that the user selected, so the flow acts on that customer."
- The flow updates the record and sends an email based on a user's Yes/No answer.
  > "In the yes branch, it updates the record with Blocked set to ALL and emails the customer with the subject Blocked."
- The flow does not appear on the Items page or Vendor Card because of the table limitation.
  > "The last two screenshots show that it did not appear on the Items page or on the Vendor Card, since those pages show other tables."
- Users should test the flow in a sandbox environment before running it on real customers.
  > "I built it in the PRODUCTION environment with the Evaluation company, so use a sandbox for your own tests, and check the email text before you run the flow on a real customer."

## Outcome
I built a functional automation that updates a customer's status and sends a tailored email based on a user's selection. I concluded that specific table identifiers are necessary to control where the action appears in the UI.

## Caveats
The post does not show the specific internal configuration of the Outlook.com connector.
