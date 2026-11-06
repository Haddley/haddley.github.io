---
type: post
slug: sharepoint2019
title: "SharePoint 2019"
date: "2022-12-31"
builds_on: []
topics: [sharepoint-deployment, azure-virtual-machines, active-directory-setup, sql-server-configuration]
tools: [Azure Portal, SharePoint Server 2019, SQL Server, Microsoft Remote Desktop, SSMS]
status: current
checked: "2026-11-06"
source_hash: "39daa295455b"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to deploy a SharePoint 2019 environment on a single server within the Azure Portal. I walk through the installation of Active Directory, SQL Server, and the SharePoint configuration process.

## What I did
- I provisioned a virtual machine in Azure and installed the necessary roles.
- I promoted the server to a domain controller and installed SQL Server.
- I configured a SharePoint 2019 single-server farm.
- I verified access to the Team Site for different user accounts.

## Claims
- I chose to install all components on a single server.
  > "In this case I wanted to install Active Directory, SQL Server and SharePoint on a single server."
- I successfully accessed the Central Administration site.
  > "*I was able to access the Central Administration site*"
- I shared the Team Site with two specific test users.
  > "*I shared the Team Site with the Test 1 and Test 2 users*"
- I verified that the first test user could access the site.
  > "*I was able to access the Team Site as user Test 1*"

## Outcome
I built a functional SharePoint 2019 farm on an Azure virtual machine. I confirmed that both administrators and standard users can access the Team Site.

## Caveats
The post does not detail the specific network security configurations for the public DNS update.
