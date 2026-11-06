---
type: post
slug: businesscentralpowerautomateflow
title: "Business Central Power Automate Flow"
date: "2024-01-02"
builds_on: []
topics: [business-central, power-automate, automation-triggers, dynamic-content]
tools: [Business Central, Power Automate, Outlook.com]
status: current
checked: "2026-11-05"
source_hash: "40e834f966f5"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a Power Automate flow that triggers an email whenever a new vendor is created in Business Central. I show that the flow executes as soon as the record exists, regardless of whether the user has finished entering all the details.

## What I did
- I defined the trigger and action for the automation.
- I configured the flow to send an email using dynamic content from the vendor record.
- I tested the flow by creating a new vendor in the Business Central web site.
- I verified the run history and the received email in Outlook.

## Claims
- A Power Automate flow requires at least one trigger and one action.
  > "A Power Automate flow should at least contain one trigger and one action."
- The trigger fires as soon as the record exists in the system.
  > "A When a record is created trigger fires as soon as the record exists, so the email may arrive before anyone has filled the vendor in."
- Dynamic content allows the flow to include specific record values like the Row Id in the email.
  > "Dynamic content such as the Row Id puts record values into the email."
- The flow successfully sent an email even though I did not enter any vendor details.
  > "I created the vendor but entered no details and stayed on the new vendor page, and the flow still ran and sent an email."
- I used the production environment with an evaluation company for my test.
  > "Also, my flow used the PRODUCTION environment with the Evaluation company, so use a sandbox for your own tests."

## Outcome
I built a functional Power Automate flow that automatically sends an email notification when a new vendor record is created in Business Central.

## Caveats
I used a production environment for my tests instead of a sandbox.
