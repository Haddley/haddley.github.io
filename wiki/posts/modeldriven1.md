---
type: post
slug: modeldriven1
title: "Model Driven Apps (Part 1)"
date: "2023-09-18"
part: 1
builds_on: []
topics: [model-driven-apps, dataverse-security, business-units, power-platform-solutions]
tools: [Power Apps, Dataverse, Power Platform]
status: current
checked: "2026-11-05"
source_hash: "0869e2385170"
generated_by: gemma4:12b
---

**Summary.** I explain how to configure user access and security roles within a Model-Driven Power App. I demonstrate how to use business units and specific security roles to control data visibility based on user duties.

## What I did
- I created a Develop environment and a Suggestions solution to organize components.
- I configured a Suggestion table with an Autonumber column.
- I identified that standard roles were insufficient for specific user access.
- I created custom security roles and business units to manage permissions.

## Claims
- I assigned Dataverse security roles to each user based on their duties.
  > "I assigned Dataverse security roles to each user based on their duties."
- The Basic User role does not grant sufficient access for specific app data.
  > "Neither role was sufficient for Isaiah to access the Suggestions table or run the app."
- I created a security role that allows a user to manage Suggestions for their Business Unit.
  > "*I added a security role that will allow a user to manage Suggestions for their Business Unit*"
- I set the Business Unit for Adele Vance and other users.
  > "*I set the Business Unit for Adele Vance (and the other users)*"
- I added the Suggestions for Business Unit Security Role.
  > "*I added the Suggestions for Business Unit Security Role*"

## Outcome
I built a system where users can access and manage records based on their specific roles and business units. I successfully demonstrated how to move from basic access to granular, role-based security.

## Caveats
The post does not show the specific configuration of the internal logic for the Autonumber prefix.
