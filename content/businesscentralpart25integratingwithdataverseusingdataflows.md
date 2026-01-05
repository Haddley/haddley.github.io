---
title: "Business Central (Part 25) Integrating with Dataverse using Dataflows"
description: "Integrating with Dataverse using Dataflows"
date: "2024-12-01"
categories: ["Power Platform","Microsoft Dynamics","Business Central"]
tags: ""
slug: "businesscentralpart25integratingwithdataverseusingdataflows"
image: "/assets/images/posts-meta.svg"
---


![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.44.28pm-1836x555.png)
*I created a new Business Central Company*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.48.13pm-1836x955.png)
*I named the Company Integration*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-2.49.24pm-1836x644.png)
*I clicked Next*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-3.39.53pm-1836x805.png)
*I reset my Develop Power Platform Environment*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.26.29pm-1836x947.png)
*I created a new Power Apps Solution*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.47.24pm-1836x540.png)
*An empty solution was created*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.23.44pm-1836x953.png)
*I navigated to the Integration Company and clicked the Set up a connection to Dataverse link*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.23.56pm-1836x949.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.05pm-1836x949.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.17pm-1836x953.png)
*I selected the (reset) Develop Dataverse environment*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.24.40pm-1836x950.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.01pm-1836x951.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.33pm-1836x951.png)
*I clicked the Install Business Central Virtual Table app link*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.28.44pm-1836x929.png)
*I clicked the Get it now button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.29.22pm-1836x944.png)
*I selected the Develop Dataverse environment*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.34.21pm-1836x490.png)
*The installation completed*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.35.10pm-1836x945.png)
*I clicked the Finish button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.43.59pm-1836x634.png)
*I clicked the Sync All button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.44.30pm-1836x546.png)
*I reviewed the records in the Business Central Contacts table*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.45.27pm-1836x947.png)
*I reviewed the records in the Business Central Contacts table*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.48.40pm-1836x950.png)
*I reviewed the records in the Dataverse Contacts table*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.49.23pm-1836x679.png)
*I reviewed the records in the Business Central Customers Table*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-4.56.06pm-1836x948.png)
*I reviewed the records in the Dataverse Accounts Table*


## Integrating with Dataverse using Dataflows

I added a **D365BC Employee** table to Dataverse. I set up a Dataflow to copy Employee records from Business Central to Dataverse.

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.02pm-1836x669.png)
*I created a new table*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.35pm-1836x943.png)
*I named the table D365BC Employee*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.04.58pm-1836x942.png)
*I reviewed the Primary column*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.06.50pm-1836x959.png)
*I added a First Name column*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.07.17pm-1836x952.png)
*I added a Last Name column*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.08.15pm-1836x947.png)
*I added a Phone Number column*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.08.44pm-1836x949.png)
*I added a Job Title column*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.09.55pm-1836x948.png)
*I added a Key (this will be used to sync the employee data)*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.10.12pm-1836x421.png)
*The Key was added*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.13.57pm-1836x532.png)
*I clicked the Import data button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.15.51pm-1836x947.png)
*I selected the OData connector*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.16.48pm-1836x448.png)
*I navigated to the web services page in Business Central*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.17.39pm-1836x613.png)
*I was unable to find an employee web service*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.19.28pm-1836x457.png)
*I clicked the + New button and provided web service details*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.20.36pm-1836x558.png)
*I copied the OData V4 URL*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.48.34pm-1836x893.png)
*I entered the url into the Connect to data source dialog. Notice that I removed the https:// prefix when I copied the url to the connection textbox*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.49.42pm-1836x952.png)
*A preview was provided. I clicked the Next button.*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.51.03pm-1836x948.png)
*I selected the Load to existing table option and clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.51.32pm-1836x907.png)
*Three of the field mappings were created automatically*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.53.24pm-1836x897.png)
*I completed the last two field mappings. I clicked the Next button*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-5.54.20pm-1836x925.png)
*I set the refresh schedule*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.02.59pm-1836x949.png)
*I reviewed the D365BC Employee table records*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.03.56pm-1836x948.png)
*I added the Dataflow to the solution*

![](/assets/images/businesscentralpart25integratingwithdataverseusingdataflows/screenshot-2024-12-02-at-6.04.48pm-1836x530.png)
*The Dataflow has been added to the solution*