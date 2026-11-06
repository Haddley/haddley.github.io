---
type: post
slug: dynamicssales3
title: "Dynamics 365 Sales (Part 3)"
date: "2023-10-21"
part: 3
builds_on: [modeldriven1]
topics: [dynamics-365-sales, power-apps-customization, many-to-one-relationships, form-design]
tools: [Microsoft Dynamics 365 Sales, Power Apps, Solution Management]
status: current
checked: "2026-11-05"
source_hash: "3d7ab28bc786"
generated_by: gemma4:12b
---

**Summary.** I explain how to create and configure a Warranty table within Microsoft Dynamics 365 Sales. I demonstrate how to establish relationships between accounts and products while customizing the user interface.

## What I did
- I created a new Warranty table in the Power Apps portal.
- I established Many-to-one relationships for Account and Product records.
- I customized the form layout and view columns.
- I integrated the Sales Trial app into the solution.
- I performed a test entry to verify the new functionality.

## Claims
- I used the Power Apps portal to create the Warranty table.
  > "I used https://make.powerapps.com to add a Warranty table to Microsoft Dynamics 365 Sales."
- I changed the name column from a text field to an autonumber.
  > "*I updated the name column to be an autonumber*"
- The Account lookup column generated a new Many-to-one relationship.
  > "*I noted that adding the Account Lookup column created a new Many-to-one relationship*"
- I moved the Owner column to the header and removed the Name column from the form.
  > "*I moved the Owner Column to the form header and removed the Name column."
- I added the Sales Trial app to the existing solution.
  > "*I added the Sales Trial app to the Sales Customizations solution*"
- I successfully created and saved a new Warranty record.
  > "*I entered the Start Date, selected a Product and clicked the Save button*"

## Outcome
I built a functional Warranty table with defined relationships and a customized user interface. I also integrated the Sales Trial app into the solution.

## Caveats
The post does not detail the specific logic for the automated numbering sequence.
