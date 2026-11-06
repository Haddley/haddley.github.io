---
type: post
slug: businesscentralvirtualtable
title: "Business Central Virtual Table"
date: "2024-01-12"
builds_on: []
topics: [virtual-tables, dataverse-integration, business-central-api, power-apps-development]
tools: [Microsoft Dynamics 365 Business Central, Microsoft Dataverse, Power Automate, Power Apps]
status: current
checked: "2026-11-05"
source_hash: "24e6b416221b"
generated_by: gemma4:12b
---

**Summary.** I explore how Microsoft Dynamics 365 Business Central Virtual Tables allow for direct interaction with Business Central data from Microsoft Dataverse. I demonstrate how this architecture eliminates the need to synchronize two separate copies of data.

## What I did
- I configured the Business Central Configuration app to make specific tables visible.
- I built a model-driven app in Power Apps to display and edit these tables.
- I performed create and update operations on customer records within the Power Apps interface.
- I verified that the changes synchronized immediately to the Business Central environment.

## Claims
- Virtual tables do not store their own data in Dataverse.
  > "A: A table in Dataverse that does not hold its own data."
- The new version supports data change events for use in Power Automate.
  > "The new version adds support for data change events (CUD events) so Dataverse virtual tables can be used in Power Automate flows."
- I chose to make the vendor and customer tables visible for my application.
  > "I set Visible to Yes for the vendor and customer tables, because those were the two that I wanted in my app."
- The Business Central Configuration app determines which tables are visible.
  > "The Business Central Configuration app decides which tables are visible."
- Changes made in the model-driven app are saved directly in Business Central.
  > "Edits in the app were saved in Business Central."
- Virtual tables allow Dataverse to perform CRUD operations without copying data.
  > "A virtual table lets Dataverse create, read, update and delete Business Central data without copying it."

## Outcome
I built a model-driven app that allows users to manage Business Central customers and vendors directly through a Dataverse interface. I concluded that virtual tables provide a seamless way to interact with Business Central data without data duplication.

## Caveats
You must be careful regarding which specific environment your virtual table points to.
