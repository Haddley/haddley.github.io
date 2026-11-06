---
type: post
slug: dataverseadvancedreportssetup
title: "Microsoft Dataverse Advanced Reports Setup"
date: "2024-08-10"
builds_on: []
topics: [dataverse-reporting, ssdt-setup, dynamics-365-integration]
tools: [Visual Studio, SQL Server Data Tools, Microsoft Dynamics 365, Microsoft Application Error Reporting]
status: current
checked: "2026-11-05"
source_hash: "c39579e29437"
generated_by: gemma4:12b
---

**Summary.** I describe the process of configuring the environment to create advanced reports for Microsoft Dataverse. I demonstrate how to install the necessary extensions to enable Dynamics as a data source.

## What I did
- I installed the SQL Server Data Tools.
- I created a new Project Server Report.
- I identified the missing Dynamics data source.
- I installed the required reporting extensions.
- I added a new report after the installation.

## Claims
- The Visual Studio shell for Reporting Services is also known as SQL Server Data Tools.
  > "The **Visual Studio shell** used to create Reporting Services reports has been released under various names, including SQL Server Data Tools (SSDT)."
- I chose the SQL Server Reporting Services option during the setup.
  > "*I selected the SQL Server Reporting Services checkbox and clicked the Next button*"
- I realized that Microsoft Dynamics was missing from the data source types.
  > "*I noticed that Microsoft Dynamics was not shown as a data source type*"
- I installed the Microsoft Dynamics 365 Report Authoring Extension to fix the missing source.
  > "*I installed the Microsoft Dynamics 365 Report Authoring Extension*"

## Outcome
I configured the environment and installed the necessary extensions to enable Microsoft Dynamics as a data source for reports.

## Caveats
The post does not detail the specific configuration of the report parameters after the data source is established.
