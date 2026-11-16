---
type: post
slug: sharegate
title: "ShareGate (Part 1)"
date: "2026-04-30"
part: 1
builds_on: []
topics: ["sharepoint-migration", "sharegate-installation", "active-directory-configuration", "sql-server-setup"]
tools: ["ShareGate", "Microsoft 365", "Windows Server", "SQL Server", "Azure Portal", "SharePoint Online"]
status: current
checked: "2026-11-16"
source_hash: "17b2c619492b"
generated_by: gemma4:12b
---

**Summary.** I provide a step-by-step guide for installing and connecting ShareGate to a SharePoint environment. I demonstrate how to configure a Windows Server VM, install Active Directory and SQL Server, and migrate a test file to SharePoint Online.

## What I did
- I configured a Windows Server VM with Active Directory Domain Services and SQL Server.
- I installed and configured a SharePoint Single-Server Farm.
- I installed the ShareGate Migrate application and authenticated with my Microsoft 365 account.
- I migrated a test PDF file from an on-premises library to a new SharePoint Online site.

## Claims
- The ShareGate workspace includes a 14-day free trial for Migrate and Protect products.
  > "*I was in the ShareGate workspace showing the Migrate and Protect products, with a 14-day free trial active*"
- I configured the SharePoint Central Administration web application to use port 26923.
  > "*I configured the SharePoint Central Administration web application to use port 26923 with NTLM authentication*"
- I chose the Standard team template for the new SharePoint Online site.
  > "*I chose the Standard team template for the new SharePoint Online site*"
- I confirmed the SharePoint Online sites were accessible from within the VM.
  > "*I confirmed the SharePoint Online sites were accessible from within the VM*"

## Outcome
I successfully built a migration path between an on-premises SharePoint environment and SharePoint Online using ShareGate.

## Caveats
The post does not show the configuration of complex custom permissions or large-scale data migrations.
