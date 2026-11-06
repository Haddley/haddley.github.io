---
type: post
slug: businesscentralpart26integrationtable
title: "Business Central (Part 5)"
date: "2024-12-22"
part: 5
builds_on: []
topics: [integration-tables, datavense-integration, al-table-proxy, business-central-extensions]
tools: [Dynamics 365 Business Central, Dataverse, AL Table Proxy Generator, Power Platform]
status: current
checked: "2026-11-05"
source_hash: "73daef8a6454"
generated_by: gemma4:12b
---

**Summary.** I explain how to use Integration Tables to display Dataverse data directly within Business Central without duplicating records. I demonstrate how to use the AL Table Proxy Generator and proper permission settings to create a functional bridge between the two systems.

## What I did
- I used the AL Table Proxy Generator to create proxy tables for Dataverse data.
- I configured the Dataverse Connection Setup wizard to link the environments.
- I updated the integration roles to grant full access to the necessary tables.
- I added flow fields and lookups to transform GUIDs into readable information.

## Claims
- Integration tables act as proxies to show Dataverse rows in Business Central.
  > "In this post, the tables are proxies for the Dataverse tables, so a Business Central page can show Dataverse rows."
- The AL Table Proxy Generator creates several AL files to describe Dataverse tables.
  > "A: I ran altpgen.exe with the application id and the Dataverse address, and it generated six AL files: AccountExt, ContactExt, Customer Order Line, Customer Order, TeamExt and UserExt."
- The system failed to show data until I granted the integration role full access to the tables.
  > "I then updated the Business Central Dataverse Integration role, so that it had Full Access to the Customer Order table and to the Customer Order Line table."
- I used a flow field to display a name instead of a GUID value.
  > "*I updated the Customer Orders page to display the Account Name flow field rather than the GUID value*"
- Business Central can join its own data to the Dataverse rows using an integration table.
  > "That is the benefit of an integration table: Business Central can join its own data to the Dataverse rows."
- I used the hadd_Item GUID to lookup records in the Business Central Item table.
  > "I was able to use the hadd_Item GUID to lookup records in the Business Central Item table.*"

## Outcome
I built a system where Business Central displays Dataverse records and joins them with local data using integration tables. I concluded that integration tables are the best way to show external data without copying it.

## Caveats
The post does not show the specific configuration of the third-party applications beyond the standard Dataverse connection.
