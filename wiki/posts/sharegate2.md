---
type: post
slug: sharegate2
title: "ShareGate (Part 2)"
date: "2026-05-01"
part: 2
builds_on: []
topics: [content-type-migration, sharepoint-online-migration, metadata-preservation, pre-migration-reporting]
tools: [ShareGate, SharePoint 2019, SharePoint Online, Microsoft Excel, Azure]
status: current
checked: "2026-11-06"
source_hash: "bb6f09b4a3fc"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to migrate complex content types and site structures from an on-premises environment to SharePoint Online using ShareGate. I prove that the tool preserves underlying metadata models, including site columns and library configurations, during the migration process.

## What I did
- I built a custom content type and configured specific site columns on the source site.
- I ran ShareGate pre-migration reports to analyze the current state of the environment.
- I configured the Copy feature to migrate the full site structure to SharePoint Online.
- I verified the migrated content and structure in the destination tenant.

## Claims
- I used ShareGate to migrate the full site structure from on-premises to SharePoint Online.
  > "In this post I go further — first building out a custom content type on the source site to give the migration something meaningful to carry across, then running ShareGate's pre-migration reports to understand the current state of the environment, and finally using the Copy feature to migrate the full site structure from on-premises to SharePoint Online."
- I enabled content type management for the Documents library.
  > "*I opened Advanced settings and enabled content type management for the library*"
- I exported the site collection report to an Excel file.
  > "*I exported the site collection report to an Excel file*"
- I configured the copy options to merge with the destination site in Automatic mode.
  > "*I configured the copy options to merge with OnPremHome in Automatic mode, keeping custom permissions, list content, workflows, and other settings*"
- I verified the migrated structure on the SharePoint Online site.
  > "*I navigated to Site contents on the OnPremHome site to verify the migrated structure*"

## Outcome
I successfully migrated a site structure that included custom content types and metadata. The migration confirmed that ShareGate preserves the underlying metadata model during the transition.

## Caveats
The post does not provide a detailed breakdown of the specific Azure costs for the migration process.
