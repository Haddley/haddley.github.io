---
type: post
slug: sharepointsitedesignsandsitescripts
title: "SharePoint site designs and site scripts"
date: "2021-02-15"
builds_on: []
topics: [sharepoint-automation, site-scripts, site-designs, powershell-administration]
tools: [SharePoint Online, PowerShell, JSON]
status: current
checked: "2026-11-06"
source_hash: "07350132ab24"
generated_by: gemma4:12b
---

**Summary.** I explore how to use SharePoint site scripts and site designs to automate the provisioning of sites with consistent configurations. I demonstrate how to create, add, and apply these designs to both new and existing sites.

## What I did
- I used site scripts to automate site provisioning.
- I added site scripts to the tenant using PowerShell.
- I created site designs based on modern templates.
- I applied site designs to existing sites.
- I extracted site scripts from existing sites.

## Claims
- Site scripts are formatted as JSON files.
  > "Site scripts are JSON formatted files."
- I added site scripts to the tenant using the Add-SPOSiteScript command.
  > "I added site scripts to the SharePoint tenant using the Add-SPOSiteScript command."
- I created site designs that extend modern team or communication site templates.
  > "I created site designs that extend the SharePoint modern team site template (64) or the communication site template (68)."
- I applied site designs to an existing site using the Invoke-SPOSiteDesign command.
  > "I applied site designs to an existing SharePoint site using the Invoke-SPOSiteDesign command."
- I extracted a site script from an existing site using Get-SPOSiteScriptFromWeb.
  > "I used Get-SPOSiteScriptFromWeb to extract a site script from an existing SharePoint site."

## Outcome
I built a method to automate the provisioning of SharePoint sites with consistent configurations using site scripts and site designs.

## Caveats
The post does not detail the specific internal logic of the JSON schema for every possible action.
