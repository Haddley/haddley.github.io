---
type: post
slug: sharepointdevicerequest
title: "SharePoint (Part 1)"
date: "2026-05-02"
part: 1
builds_on: []
topics: [sharepoint-lists, power-apps-forms, power-automate-workflows, workflow-automation]
tools: [SharePoint Online, Power Apps, Power Automate, Outlook]
status: current
checked: "2026-11-06"
source_hash: "0c5baf2fad01"
generated_by: gemma4:12b
---

**Summary.** I built a Device Request system in SharePoint Online to streamline how IT staff request new equipment. I integrated Power Apps to secure the workflow and Power Automate to handle automatic email notifications.

## What I did
- I created a SharePoint list for device requests.
- I customized the list form using Power Apps to lock the status field.
- I configured a Power Automate flow to send confirmation emails.
- I identified a change in list behavior after publishing the custom form.

## Claims
- I created a list for IT staff to submit equipment requests.
  > "I built a Device Request list in SharePoint Online to let IT staff submit requests for new equipment."
- I used a Power Apps form to ensure only an approver can change the status.
  > "The list uses a custom Power Apps form that locks the Status field so only an approver can change it, keeping the Pending/Approved/Rejected workflow clean."
- I set the default value for the status column to Pending.
  > "*I set Pending as the default value for the Status column and saved*"
- I disabled the status field in the custom form to prevent user edits.
  > "*I selected the Status field and set its DisplayMode to Disabled so users cannot edit the status when submitting a request*"
- I noticed the Edit in grid view button disappeared after publishing the form.
  > "*I noticed the Edit in grid view button was gone from the toolbar after publishing the Power Apps form, and the settings panel confirmed the list was now read-only*"
- I found that the details pane showed fields as read only for specific items.
  > "*I selected the New iPhone item and the Details pane showed all fields as read only*"

## Outcome
I built a customized SharePoint list with a locked status field and an automated email notification system.

## Caveats
The post does not explain why the Edit in grid view button disappeared after the Power Apps integration.
