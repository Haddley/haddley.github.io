---
type: post
slug: businesscentraladmincenter
title: "Business Central Admin Center"
date: "2023-08-18"
builds_on: []
topics: [business-central, tenant-administration, sandbox-environments, data-safety]
tools: [Business Central, Admin Center]
status: current
checked: "2026-11-05"
source_hash: "43daa0bcaddf"
generated_by: gemma4:12b
---

**Summary.** I explain how to use the Business Central Administration Center to manage tenant settings. I demonstrate how to create a sandbox environment to test changes without risking production data.

## What I did
- I navigated to the Admin Center portal via the Settings link.
- I identified the need for a sandbox environment to protect real data.
- I copied the Production environment into a new Sandbox environment.
- I waited for the environment status to change to Active.
- I switched between the Production and Sandbox environments.

## Claims
- The Admin Center serves as the primary portal for tenant administration.
  > "The Business Central Administration Center (Admin Center) provides a portal for tenant administration."
- I used a different browser because Safari is not supported.
  > "A: The first screenshot notes that the Safari browser is not supported by the Admin Center, so I used a different browser for it."
- The copy process takes time and moves from a Preparing state to an Active state.
  > "The environment is listed as Preparing, and then its state changes to Active."
- I waited for the status to be Active before I opened the environment.
  > "I waited for Active before I opened it."
- I successfully switched between the Production and Sandbox environments.
  > "*I was able to switch between the Production and Sandbox environment*"
- I named the new sandbox environment MySandbox.
  > "I copied Production to a Sandbox environment called MySandbox."

## Outcome
I created a sandbox environment to provide a safe space for development and testing. I successfully demonstrated how to navigate the Admin Center to manage these environments.

## Caveats
The post does not show the specific duration of time the system takes to move from Preparing to Active.
