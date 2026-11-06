---
type: post
slug: sharegate
title: "ShareGate (Part 1)"
date: "2026-04-30"
part: 1
builds_on: []
topics: [sharegate-installation, sharepoint-migration, sql-server-configuration, on-premises-sharepoint]
tools: [Azure, Windows Server, Microsoft SQL Server, SharePoint, ShareGate, Microsoft 365]
status: current
checked: "2026-11-06"
source_hash: "18c8af885865"
generated_by: gemma4:12b
---

**Summary.** I demonstrate the process of installing ShareGate and connecting it to a SharePoint environment. I walk through the configuration of a Windows Server, the installation of SQL Server and SharePoint, and the final migration of a test file.

## What I did
- I configured a Windows Server with Active Directory and SQL Server.
- I installed and configured the SharePoint Products suite.
- I installed the ShareGate software and logged in with my account.
- I connected ShareGate to both an on-premises site and a SharePoint Online destination.
- I performed a test migration of a PDF file between the two environments.

## Claims
- I used a specific version of the ShareGate installer.
  > "*I navigated to the ShareGate download page and the ShareGate.26.4.6.msi installer started downloading*"
- I configured the SharePoint Central Administration web application to use port 26923.
  > "*I configured the SharePoint Central Administration web application to use port 26923 with NTLM authentication*"
- I used a 14-day free trial for the ShareGate products.
  > "*I was in the ShareGate workspace showing the Migrate and Protect products, with a 14-day free trial active*"
- I chose the Standard team template for the new SharePoint Online site.
  > "*I chose the Standard team template for the new SharePoint Online site*"
- I set the site privacy to Public and the language to English.
  > "*I set the site privacy to Public and left the language as English, then clicked Create site*"
- I dismissed the off-peak hours suggestion during the copy process.
  > "*I selected the Documents library on both sides and clicked Start copy, dismissing the off-peak hours suggestion*"

## Outcome
I built a functional migration path between an on-premises SharePoint library and a SharePoint Online destination using ShareGate.

## Caveats
The post does not show the specific network security configurations required to allow the VM to reach the public internet.
