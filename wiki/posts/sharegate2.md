---
type: post
slug: sharegate2
title: "ShareGate (Part 2)"
date: "2026-05-01"
part: 2
builds_on: ["sharegate"]
topics: ["content-type-migration", "sharepoint-online-migration", "metadata-preservation", "pre-migration-reporting"]
tools: ["ShareGate", "SharePoint 2019", "SharePoint Online", "Excel", "Azure Cost Analysis"]
status: current
checked: "2026-11-16"
source_hash: "3794cf75ec3e"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to migrate complex content types and site structures from SharePoint 2019 to SharePoint Online using ShareGate. I prove that the tool preserves the underlying metadata model including columns, permissions, and library configurations.

## What I did
- Created a custom content type and configured specific column settings.
- Ran pre-migration reports to analyze the current environment state.
- Configured the Copy feature to migrate the full site structure.
- Verified the migrated data and structure in the destination tenant.

## Claims
- The migration preserves the underlying metadata model including permissions and library configurations.
  > "The goal was to prove that ShareGate faithfully migrates not just files but the underlying metadata model — content types, site columns, library configuration, and permissions — so that documents arrive in SharePoint Online with their structure intact and ready to use."
- I exported the site collection report to an Excel file.
  > "*I exported the site collection report to an Excel file*"
- I configured the copy options to merge with OnPremHome in Automatic mode.
  > "*I configured the copy options to merge with OnPremHome in Automatic mode, keeping custom permissions, list content, workflows, and other settings*"
- SharePoint virtual machines accounted for the majority of the $21.79 accumulated cost.
  > "*I reviewed Azure Cost Analysis dashboard with the SharePoint virtual machines accounting for the majority of the $21.79 accumulated cost*"

## Outcome
I successfully migrated a site structure from on-premises to the cloud while maintaining the integrity of custom content types and columns.

## Caveats
The post does not show the specific configuration of the custom content type beyond the Effective Date column.
