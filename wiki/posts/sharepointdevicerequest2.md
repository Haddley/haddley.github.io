---
type: post
slug: sharepointdevicerequest2
title: "SharePoint (Part 2)"
date: "2026-05-03"
part: 2
builds_on: [sharepointdevicerequest]
topics: [canvas-apps, power-automate-flows, sharepoint-integration, form-validation]
tools: [SharePoint, Power Apps, Power Automate, Outlook]
status: current
checked: "2026-11-06"
source_hash: "eaae22fdbe6a"
generated_by: gemma4:12b
---

**Summary.** I explore an alternative method for building a Device Request system by using a standalone canvas app instead of a customized SharePoint form. This approach uses a Power Automate instant flow to process submissions directly from the app.

## What I did
- I created an instant cloud flow to handle the submission logic.
- I built a canvas app to serve as the user interface.
- I connected the app's submit button to the flow and added success notifications.
- I embedded the finished app into a SharePoint page using a web part.

## Claims
- The standard SharePoint form approach limits functionality and visibility.
  > "That approach is straightforward, but it ties everything to the SharePoint list — the flow only fires when a list item is written, every submission is visible in the list view, and the form can only do what a customised list form supports."
- The instant flow triggers immediately without requiring a SharePoint list write.
  > "The flow is triggered immediately by the app rather than waiting on a SharePoint list write, so there is no intermediate storage and no list view for users to stumble into."
- A canvas app allows for easier implementation of validation and conditional logic.
  > "The canvas app is a proper Power Apps screen, so validation, layout, and conditional logic are all straightforward to add."
- Embedding the app allows users to stay on the SharePoint page.
  > "And because the app is embedded via the Power Apps web part, it appears inline on any SharePoint page without users needing to navigate to a list at all."
- The flow successfully sent confirmation emails for both test submissions.
  > "*I checked Outlook and confirmed the second confirmation email had arrived — the flow sent the notification for both test submissions*"

## Outcome
I built a standalone canvas app with an instant flow that is embedded in a SharePoint page. This setup provides a streamlined user experience without exposing the underlying list.

## Caveats
The post does not detail the specific configuration of the email notification content within the flow.
