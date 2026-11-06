---
type: post
slug: powerapps10
title: "Model Driven Apps Timeline"
date: "2026-06-16"
builds_on: []
topics: [model-driven-apps, dataverse-tables, timeline-control, relationship-behavior]
tools: [Power Apps, Dataverse, Model-driven apps]
status: current
checked: "2026-11-06"
source_hash: "ee1d211d0155"
generated_by: gemma4:12b
---

**Summary.** I explain how to enable notes and activities on a custom Dataverse table and configure the timeline control. I also demonstrate how to configure relationship behaviors so that these records roll up correctly onto related records.

## What I did
- I created a new solution and a custom table with advanced properties enabled.
- I enabled the options for notes and activities in the table properties.
- I added the timeline component to the form and configured its record types.
- I built a model-driven app to test the functionality of the timeline.
- I configured the relationship behavior to ensure records roll up correctly.

## Claims
- Notes and activities are not enabled on a table by default.
  > "Neither is available on a table by default."
- The timeline control is the specific component that displays notes and activities.
  > "They are two separate settings I have to turn on in the table's properties before Dataverse lets me attach them to a record, and the **Timeline** control is the form component that actually displays them once they are enabled."
- The option to enable notes is actually found under the label for attachments.
  > "Once the table was created, I reopened its properties and checked **Enable attachments (including notes and files)** — despite the name, this is also the switch for Notes."
- The relationship behavior determines if records roll up rather than the timeline component itself.
  > "The setting that actually matters turned out to be the relationship's own behavior, not anything in the Timeline component."
- Parental behavior is the specific setting required to expose the Rollup View property.
  > "**Parental** is the tight coupling — child records follow the parent's delete, assign, and share actions, and that's also the behavior that exposes the Rollup View setting I needed."
- Notes require their own specific rollup type setting to appear on a related record.
  > "So Notes do roll up too — they just need their own Note rollup type turned on separately from Activities, rather than riding along with the Activity rollup type setting."

## Outcome
I built a model-driven app where notes and activities on a custom table roll up correctly to a related record. I concluded that notes and activities require separate configuration settings to appear correctly in a rolled-up view.

## Caveats
The post does not show how to configure custom activity types beyond the standard ones included in the timeline control.
