---
type: post
slug: businesscentralcanvasapps
title: "Business Central Canvas Apps"
date: "2023-08-14"
builds_on: []
topics: [canvas-apps, business-central-integration, power-platform-environments, data-filtering]
tools: [Microsoft Dynamics 365 Business Central, Power Platform, Canvas Apps, Power Apps]
status: current
checked: "2026-11-05"
source_hash: "9a20ab5d1c36"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build Canvas apps that connect to and interact with Microsoft Dynamics 365 Business Central data. I show how to use the Business Central connector to display and edit records like currencies and sales orders in a mobile-friendly format.

## What I did
- I created a dedicated Power Platform environment for testing.
- I built a Canvas app to display available currencies.
- I developed a Canvas app to filter sales orders by salesperson.
- I built a Canvas app to edit items directly in Business Central.
- I verified that edits from both a laptop and a phone saved correctly.

## Claims
- Business Central is an ERP and CRM product for small and mid-sized businesses.
  > "Microsoft Dynamics 365 Business Central (formerly Microsoft Dynamics NAV) is an ERP and CRM product meant for small and mid-sized businesses (Integrating both Dynamics NAV and Dynamics CRM features)."
- I used a dedicated environment to ensure my experiments did not affect real data.
  > "I made a Develop environment so that my experiments stayed apart from anything else."
- The Business Central connector requires a specific environment, company, and table.
  > "A: Which Business Central environment and company to read."
- I used distinct values in a drop-down to ensure each salesperson name appeared only once.
  > "Distinct makes the list show each name once."
- The app successfully wrote data back to Business Central from both a laptop and a phone.
  > "The Items app writes back to Business Central, and I checked the change in Business Central after each edit, once from my laptop and once from my phone."
- A gallery shows rows while a form bound to the selected row allows for editing.
  > "A gallery shows rows, and a form bound to the selected row can edit them."

## Outcome
I built several Canvas apps that successfully display and edit Business Central data. I concluded that the Business Central connector provides a reliable way to bridge mobile interfaces with ERP data.

## Caveats
The post does not show the specific configuration of the internal Business Central tables or the underlying API permissions.
