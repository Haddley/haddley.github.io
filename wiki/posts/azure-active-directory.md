---
type: post
slug: azure-active-directory
title: "Azure Active Directory (Part 1)"
date: "2021-03-29"
part: 1
builds_on: []
topics: [azure-active-directory, identity-management, guest-user-access, app-registration]
tools: [Microsoft Office 365, Microsoft SharePoint, Microsoft Teams, Azure Portal, Node.js]
status: current
checked: "2026-11-05"
source_hash: "e798b60537b8"
generated_by: gemma4:12b
---

**Summary.** I explore how Microsoft Identity authenticates users for applications like SharePoint and Teams. I demonstrate the process of creating guest accounts and configuring application registrations in Azure Active Directory.

## What I did
- I identified how Azure Active Directory supports guest users.
- I created a guest user account for John Doe.
- I verified the creation of the external account in the Azure Portal.
- I configured the application registration with specific IDs and secrets.
- I tested the authentication flow on a local web application.

## Claims
- Microsoft Office 365 applications use Azure Active Directory for authentication.
  > "Microsoft Office 365 applications including Microsoft SharePoint and Microsoft Teams use Azure Active Directory to authenticate users."
- I added John Doe as a guest user.
  > "*I added John Doe as a Guest user.*"
- The Azure Portal showed a new external account for the guest.
  > "In the Azure Portal I could see an external (EXT) Active Directory account had been created for John Doe."
- I navigated to the app registrations page in Azure Active Directory.
  > "*I navigated to Azure Active Directory and selected App registrations*"
- The application was redirected to the Azure Active Directory sign in page.
  > "*I was redirected to the Azure Active Directory Sign in page.*"

## Outcome
I successfully configured an Azure Active Directory application and verified the authentication flow for a guest user.

## Caveats
The post does not show the specific internal configuration of the web application code.
