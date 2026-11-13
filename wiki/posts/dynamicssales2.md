---
type: post
slug: dynamicssales2
title: "Dynamics 365 Sales (Part 2)"
date: "2023-10-21"
part: 2
builds_on: [modeldriven1]
topics: [dynamics-365-sales, lead-conversion, business-process-flow, solution-management]
tools: [Dynamics 365 Sales, Power Platform]
status: current
checked: "2026-11-05"
source_hash: "feef0d19b687"
generated_by: gemma4:12b
---

**Summary.** I describe the process of moving a lead through the sales pipeline in Dynamics 365. I demonstrate how to customize the Opportunity table and manage the Business Process Flow.

## What I did
- I added the Opportunity table to my solution.
- I added Trial Start and Trial End columns.
- I integrated a Business Process Flow.
- I progressed a lead through the development and trial stages.

## Claims
- I included the Opportunity table in my specific solution.
  > "*I wanted to add the (existing) Opportunity table to my Sales Customizations solution*"
- I added two new optional fields to the Opportunity table.
  > "*I added Trial Start (Optional)*"
- I modified the existing Business Process Flow.
  > "*I clicked the Edit button to edit the Business Process Flow*"
- I converted a lead into an opportunity.
  > "*I created the (Lead) Opportunity*"
- I updated the trial dates before moving to the next stage.
  > "*I entered Opportunity|Trail Start and Opportunity|Trial End values and clicked the Next Stage button*"

## Outcome
I built a customized sales process that tracks a lead through the transition into an opportunity. I successfully configured the necessary fields and workflow stages.

## Caveats
The post does not show the specific configuration of the underlying logic for the transition between the Qualify and Develop stages.
