---
type: post
slug: powerapps7
title: "Customizing Status Reasons in Power Platform"
date: "2026-05-24"
builds_on: []
topics: [dataverse-customization, status-reason-transitions, power-platform-workflows, form-design]
tools: [Dataverse, Power Apps, Classic Solution Explorer]
status: current
checked: "2026-11-06"
source_hash: "5fc594da1b3c"
generated_by: gemma4:12b
---

**Summary.** I explain how to customize the Status and Status Reason fields in Dataverse to create a controlled workflow. I demonstrate how to use Status Reason Transitions to restrict which status options are available during specific transitions.

## What I did
- I created a new Time Off Request table and added custom Status Reason choices.
- I added the Status Reason field to the form header and list views.
- I used the classic Solution Explorer to configure Status Reason Transitions.
- I mapped specific allowed transitions to create a guided workflow.

## Claims
- Dataverse provides two system columns for status and status reason on every table.
  > "Every Dataverse table ships with two system columns you can't delete: **Status** (statecode) and **Status Reason** (statuscode)."
- The Status field only allows two specific values.
  > "Status has exactly two values — Active and Inactive."
- Status Reason provides the specific detail for why a record is in a certain state.
  > "Status Reason is the refinement: it tells you *why* a record is in that state."
- Dataverse groups Status Reason choices into Active and Inactive categories.
  > "Dataverse groups its choices by Status, so the Active group and the Inactive group each start with one default option."
- Adding Status Reason to the form header enables the system to prompt for a reason during deactivation.
  > "Adding Status Reason to the form header is the mechanism that makes the Deactivate dialog prompt for a reason."
- Status Reason Transitions turn a free dropdown into an enforced path.
  > "**Status Reason Transitions** (only available in the classic Solution Explorer) lets you define which reasons can follow which, turning a free dropdown into an enforced approval path."

## Outcome
I built a Time Off Request system that uses Status Reason Transitions to enforce a specific approval path. I concluded that these features turn a simple dropdown into a robust workflow guard.

## Caveats
The post does not show how to configure these transitions in the modern maker portal as they are only available in the classic Solution Explorer.
