---
title: "Business Central"
part: 4
description: "Integrating with Dataverse using Dataflows"
date: "2024-12-01"
categories: ["Power Platform","Microsoft Dynamics","Business Central"]
tags: "dataverse, dataflows, integration, business-central"
hidden: false
slug: "businesscentralpart25integratingwithdataverseusingdataflows"
image: "/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/posts-meta.svg"
---


In this post I connect Business Central to Dataverse in two ways. First I set up the connection, install the Business Central virtual table app, and sync contacts and customers. Then I build a Dataflow that copies Employee records from Business Central into a Dataverse table, using the OData connector. I wrote more about [OData](/posts/odata/) in a separate post.

:::brain-power Before you read on
A company keeps its customers and employees in Business Central, but a Power Apps app reads from Dataverse. What are two different ways to get the data from one to the other, and what would you want to happen when a record changes at the source?
:::


![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.44.28pm-1836x555.png)
*I created a new Business Central Company*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.48.13pm-1836x955.png)
*I named the Company Integration*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.49.24pm-1836x644.png)
*I clicked Next*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-3.39.53pm-1836x805.png)
*I reset my Develop Power Platform Environment*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.26.29pm-1836x947.png)
*I created a new Power Apps Solution*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.47.24pm-1836x540.png)
*An empty solution was created*

:::no-dumb-questions
**Q: Why did I create a solution first?**

A: A solution is a container for the parts of a Power Platform project, such as tables and dataflows. I wanted everything for this walkthrough in one place, and at the end I added the Dataflow to it.

**Q: Why did I reset my Develop environment?**

A: I wanted a clean Dataverse environment to connect to, so that I could see exactly what the integration added. I used the reset Develop environment as the target.
:::

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.23.44pm-1836x953.png)
*I navigated to the Integration Company and clicked the Set up a connection to Dataverse link*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.23.56pm-1836x949.png)
*I clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.05pm-1836x949.png)
*I clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.17pm-1836x953.png)
*I selected the (reset) Develop Dataverse environment*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.40pm-1836x950.png)
*I clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.01pm-1836x951.png)
*I clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.33pm-1836x951.png)
*I clicked the Install Business Central Virtual Table app link*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.44pm-1836x929.png)
*I clicked the Get it now button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.29.22pm-1836x944.png)
*I selected the Develop Dataverse environment*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.34.21pm-1836x490.png)
*The installation completed*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.35.10pm-1836x945.png)
*I clicked the Finish button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.43.59pm-1836x634.png)
*I clicked the Sync All button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.44.30pm-1836x546.png)
*I reviewed the records in the Business Central Contacts table*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.45.27pm-1836x947.png)
*I reviewed the records in the Business Central Contacts table*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.48.40pm-1836x950.png)
*I reviewed the records in the Dataverse Contacts table*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.49.23pm-1836x679.png)
*I reviewed the records in the Business Central Customers Table*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.56.06pm-1836x948.png)
*I reviewed the records in the Dataverse Accounts Table*

:::under-the-hood Customers and accounts
In the last few screenshots I compared the Business Central Customers table with the Dataverse Accounts table, and the Business Central Contacts with the Dataverse Contacts. As I understand the standard integration, a Business Central customer corresponds to a Dataverse account, and a contact corresponds to a contact. That is why the two tables hold the same people under different names.
:::


## Integrating with Dataverse using Dataflows

I added a **D365BC Employee** table to Dataverse. I set up a Dataflow to copy Employee records from Business Central to Dataverse.

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.02pm-1836x669.png)
*I created a new table*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.35pm-1836x943.png)
*I named the table D365BC Employee*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.58pm-1836x942.png)
*I reviewed the Primary column*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.06.50pm-1836x959.png)
*I added a First Name column*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.07.17pm-1836x952.png)
*I added a Last Name column*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.08.15pm-1836x947.png)
*I added a Phone Number column*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.08.44pm-1836x949.png)
*I added a Job Title column*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.09.55pm-1836x948.png)
*I added a Key (this will be used to sync the employee data)*

:::pencil Why does the table need a Key?
The Dataflow refreshes on a schedule and loads into an existing table. If it ran twice and the table had no way to recognise an employee that it already held, what would you expect to find after the second run? What does the Key change?

:::answer
Without a key, I would expect each refresh to add the same employees again as new rows. With a key, the dataflow can match each incoming employee to a row that already exists, and update it instead. That is why I added a Key before I imported anything.
:::
:::

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.10.12pm-1836x421.png)
*The Key was added*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.13.57pm-1836x532.png)
*I clicked the Import data button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.15.51pm-1836x947.png)
*I selected the OData connector*

:::no-dumb-questions
**Q: What is OData, and why does a Dataflow use it?**

A: OData is a standard way to read data from a web address, with a self-describing model. Business Central can publish pages and queries as OData web services, and the Dataflow's OData connector reads from that address. My [OData post](/posts/odata/) shows how the query options work against a demo service.

**Q: What is a Dataflow?**

A: A set of steps that reads data from a source, shapes it, and loads it into a destination on a schedule. Here the source is Business Central, the destination is the D365BC Employee table, and I chose when it refreshes.
:::

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.16.48pm-1836x448.png)
*I navigated to the web services page in Business Central*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.17.39pm-1836x613.png)
*I was unable to find an employee web service*

:::watch-it A page is only available over OData once it is published
The web services page in Business Central lists what has been published, and I could not find an employee service there. I used + New to publish one, and only then did the page get an OData V4 URL to copy. If the object that you need is not on the list, publish it first.
:::

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.19.28pm-1836x457.png)
*I clicked the + New button and provided web service details*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.20.36pm-1836x558.png)
*I copied the OData V4 URL*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.48.34pm-1836x893.png)
*I entered the url into the Connect to data source dialog. Notice that I removed the https:// prefix when I copied the url to the connection textbox*

:::watch-it Check the address that you paste
As the caption says, I removed the https:// prefix when I pasted the OData V4 URL into the connection box. If the connection fails, look at the address first, and at what the dialog expects in that box.
:::

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.49.42pm-1836x952.png)
*A preview was provided. I clicked the Next button.*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.51.03pm-1836x948.png)
*I selected the Load to existing table option and clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.51.32pm-1836x907.png)
*Three of the field mappings were created automatically*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.53.24pm-1836x897.png)
*I completed the last two field mappings. I clicked the Next button*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.54.20pm-1836x925.png)
*I set the refresh schedule*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.02.59pm-1836x949.png)
*I reviewed the D365BC Employee table records*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.03.56pm-1836x948.png)
*I added the Dataflow to the solution*

![](assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.04.48pm-1836x530.png)
*The Dataflow was added to the solution*

:::test-drive Try it yourself
1. In Business Central, open the web services page and publish a page or query of your own.
2. Copy its OData V4 URL, and open it in a browser to see the data.
3. Build a Dataflow in Power Apps with the OData connector, and load the data into a table that has a Key.
4. Change a record in Business Central, refresh the Dataflow, and see whether the row updates or duplicates.
:::

:::bullet-points Recap
- A solution keeps the parts of the project together, and I added the Dataflow to it at the end.
- The Business Central virtual table app and Sync All brought contacts and customers into Dataverse.
- A Dataflow can copy Business Central records into a Dataverse table on a schedule, through the OData connector.
- A page must be published as a web service before it has an OData V4 URL.
- A Key on the Dataverse table lets each refresh update existing rows instead of adding them again.
:::

## References

- [OData](/posts/odata/)
- [OData Web Services, Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/odata-web-services)
