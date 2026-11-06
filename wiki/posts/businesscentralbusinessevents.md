---
type: post
slug: businesscentralbusinessevents
title: "Business Central (Part 8)"
date: "2025-12-18"
part: 8
builds_on: []
topics: [business-events, external-integration, api-pages, real-time-notifications]
tools: [Business Central, OData, Power Automate]
status: current
checked: "2026-11-05"
source_hash: "54556732aee1"
generated_by: gemma4:12b
---

**Summary.** I explain how to use the [ExternalBusinessEvent] attribute to notify external systems of specific changes in Business Central. I demonstrate how to configure these events so that external applications can receive real-time notifications via the Business Central API.

## What I did
- I defined a custom business event using the [ExternalBusinessEvent] attribute.
- I created an API page to expose user details to external systems.
- I extended an enum to categorize the new business event.
- I wrote a subscriber to trigger the event when a project manager field changes.
- I configured an external flow to receive the notification.

## Claims
- The [ExternalBusinessEvent] attribute makes custom events available for external integration.
  > "This attribute marks a business event as available for external integration through the Business Central API."
- The procedure body for the event remains empty because the attribute declares the event.
  > "A: The [ExternalBusinessEvent] attribute declares the event."
- The API page allows the receiver to look up the specific user mentioned in the event.
  > "This one publishes User Setup, with the id, user id, email and other fields, so the receiver of the event can look up the user."
- The event only fires if the new project manager is different from the old one and is not empty.
  > "The new Project Manager must be different from the old one, and it must not be empty."
- The event only fires if the lookup finds a record in the User Setup table.
  > "The code also looks up that project manager in User Setup, and it raises the event only if the lookup finds a record."
- The subscriber sends the job details and user information to the external system.
  > "When the field changes, the subscriber raises the external event with the job's id, number, description, the user's id and the user's email."

## Outcome
I built a system where Business Central automatically notifies an external flow when a project manager is assigned to a job. I also created an API page so the receiving system can retrieve the full user details.

## Caveats
The post does not show the specific configuration of the external flow logic beyond the fact that it waits for the business event.
