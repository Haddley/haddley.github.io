---
type: post
slug: powerapps6
title: "A Custom Connector for Microsoft Graph"
date: "2022-07-04"
builds_on: []
topics: [microsoft-graph, custom-connectors, canvas-apps, azure-active-directory]
tools: [Microsoft Graph, Power Apps, Azure Active Directory, Graph Explorer]
status: current
checked: "2026-11-06"
source_hash: "5726c21f22bb"
generated_by: gemma4:12b
---

**Summary.** I built a custom connector to call the Microsoft Graph API from a Canvas App. This process demonstrates how to authenticate, configure, and test a custom connector to retrieve user data.

## What I did
- I registered an application in Azure Active Directory and configured the credentials.
- I created a custom connector using the Microsoft Graph request URLs and sample responses.
- I configured the necessary permissions and granted admin consent.
- I integrated the connector into a Canvas app and displayed the results in a gallery.

## Claims
- I set the client secret to expire in two years.
  > "*I set the client secret to expire in 2 years*"
- I confirmed that the validation succeeded before moving to the code step.
  > "*I saw that Validation succeeded and navigated to the Code (Preview) step*"
- I added the User.Read.All permission to the application.
  > "*I added the User.Read.All permission*"
- I granted admin consent for the updated permissions.
  > "*I updated the permissions and granted admin consent*"
- I updated the text label to display the jobTitle property.
  > "*I updated the Text label to display the jobTitle property of the UserProfile*"

## Outcome
I built a custom connector that allows a Canvas app to retrieve user profile information from Microsoft Graph.

## Caveats
The process does not show the specific configuration of the internal logic within the Power Automate flow if one were used as an intermediary.
