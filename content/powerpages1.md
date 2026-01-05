---
title: "Power Pages (Part 1)"
description: "Sales Orders"
date: "2024-10-26"
categories: ["Business Central","Power Platform"]
tags: ""
slug: "powerpages1"
image: "/assets/images/powerpages-scalable.svg"
---


Microsoft Power Pages is a low-code platform designed to build, host, and manage external-facing business websites.

Microsoft Dynamics Business Central provides an end-to-end solution for financials, sales, service, and operations. 

A Customer Portal is a software interface that gives customers complete visibility into their interactions with a company. It provides a platform for customers to track key metrics, support requests, or other information such as reference documents that can be easily shared.

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.44.36pm-2136x1091.png)
*I used Microsoft Power Pages to create a Customer Portal*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.28.37pm-2136x764.png)
*I navigated to the Assisted Setup page in Business Central*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.29.00pm-2136x677.png)
*I selected the Set up a connection to Dataverse link*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.29.13pm-2136x1122.png)
*I enabled data synchronization and virtual tables*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.29.25pm-2136x1106.png)
*I accepted the terms and conditions*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.29.40pm-2136x1126.png)
*I selected the Developer Power Platform/Dataverse environment*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.30.09pm-2136x1122.png)
*I signed in as a Power Platform administrator*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.38.42pm-2136x1211.png)
*I clicked the Next button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.48.44pm-2136x1207.png)
*I clicked the Install Business Central Virtual Table app link*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.49.03pm-2136x1282.png)
*I clicked the Get it now button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.49.28pm-2136x1205.png)
*I clicked the Get it now button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.50.41pm-2136x1281.png)
*I selected the Develop environment*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-2.50.55pm-2136x1205.png)
*I checked the I agree boxes and clicked the Install button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.11.49pm-2136x1208.png)
*Business Central Virtual Table was installed*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.12.15pm-2136x1205.png)
*I clicked the Review and enable virtual tables link*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.37.02pm-2136x1212.png)
*I selected six Virtual Tables and clicked the Enable button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.37.14pm-2136x328.png)
*A job queue entry was scheduled*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.39.28pm-2136x1208.png)
*I navigated to the Dataverse Connection Setup page*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.39.56pm-2136x1204.png)
*I clicked the Test Connection button*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.42.09pm-2136x653.png)
*I navigated to the Contacts list*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.42.36pm-2136x1208.png)
*Business Central sample data includes example Contacts*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.42.55pm-2136x550.png)
*I navigated to the Customers list*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.44.39pm-2136x1209.png)
*Business Central sample data includes example Customers and Vendors (Accounts).I started the Business Central to Dataverse synchronization process*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.45.06pm-2136x1207.png)
*The Contacts table in the Develop environment was initially empty*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.53.44pm-2136x1208.png)
*The Synchronization jobs copied Contact, Account and other details from Business Central to Dataverse*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-3.52.09pm-2136x1209.png)
*After the sync. the Contacts table included Contacts (connected to Accounts)*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.02.35pm-2136x1206.png)
*Customer and Vendor details were copied from Business Central to Dataverse*


## Sales Orders

In Dynamics 365 Business Central, a Sales Order is a document that represents a customer's intent to purchase goods or services from a company. It is a crucial component of the sales process and serves as a foundation for managing customer interactions, tracking orders, and fulfilling customer requests.

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.13.38pm-2136x614.png)
*I navigated to the Sales Orders list*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.14.06pm-2136x1038.png)
*I reviewed the Sales Orders list*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.14.38pm-2136x1202.png)
*I navigated to the Sales Order Virtual Table*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.15.23pm-2136x1209.png)
*I was able to see the same records*

![](/assets/images/powerpages1/screenshot-2024-10-26-at-4.22.42pm-2136x1165.png)
*I added columns to the display*


## Solution

I created a Power Platform Solution

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.01.41pm-2136x1097.png)
*Created a Customer Portal Solution*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.01.57pm-2136x789.png)
*I navigated into the new solution*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.02.23pm-2136x1094.png)
*I added the Sales Order and Sales Order Line tables*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.02.31pm-2136x641.png)
*Two tables will be added to the solution*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.03.14pm-2136x873.png)
*I added a Portal All Sales Orders view to the Sales Order table*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.15.37pm-2136x921.png)
*I added a Portal All Sales Orders Lines view to the Sales Order Line table*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.16.43pm-2136x1094.png)
*I added a Portal Sales Order Main Form to the Sales Order table*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.05.35pm-2136x888.png)
*I added a Sales Orders application to the solution*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.06.05pm-2136x1087.png)
*I added the Sales Order table to the Sales Orders application*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.07.14pm-2136x995.png)
*I clicked the Play button*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.07.29pm-2136x918.png)
*I selected a Sales Order*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.21.37pm-2136x1039.png)
*I reviewed the Sales Order Lines associated with the selected Sales Order*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.41.59pm-2136x889.png)
*I edited the Quantity, Unit Price, Invoiced Quantity and Amount Including Tax table columns*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.44.13pm-2136x1094.png)
*I updated the number of Decimal places*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.50.22pm-2136x1035.png)
*I reviewed the Sales Order Lines associated with the selected Sales Order*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.52.25pm-2136x1106.png)
*I navigated to https://make.powerpages.microsoft.com/*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.53.35pm-2136x1097.png)
*I selected web address https://haddleycustomerportal.powerappsportals.com/*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.54.01pm-2136x1093.png)
*The new site was setup*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-8.58.18pm-2136x1096.png)
*I added a Sales Orders page*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.00.06pm-2136x1096.png)
*The Sales Orders page will only be shown when an authenticated user is logged in*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.01.33pm-2136x1100.png)
*I added an h1 Text component. I added a List component*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.02.29pm-2136x1096.png)
*I selected the Sales Order table. I selected the Portal All Sales Orders view. I named the List All Sales Orders.*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.03.24pm-2136x1096.png)
*I added permissions*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.04.05pm-2136x1099.png)
*I added a table permission. The permission will allow users to see Sales Order rows that are associated with their company (Account).*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.05.07pm-2136x629.png)
*I added a Synthetic Relation*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.05.51pm-2136x969.png)
*The Synthetic Relation connects CRM Account records...*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.06.19pm-2136x964.png)
*... to Sales Order records*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.06.53pm-2136x989.png)
*I clicked Next*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.07.19pm-2136x981.png)
*I selected the CRM Account | Account Name field*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.07.43pm-2136x1063.png)
*I selected the Sales Order | customerName field*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.08.07pm-2136x1034.png)
*I clicked Next*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.08.35pm-2136x1026.png)
*I clicked the Finish button*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.09.34pm-2136x475.png)
*I clicked Refresh to view the new Synthetic Relation*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.10.21pm-2136x1099.png)
*I updated the configuration of the Power Pages Authentication External Users Microsoft Entra Application*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.11.45pm-2136x1100.png)
*I selected the new Synthetic Relation*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.13.17pm-2136x1103.png)
*I added the Authenticated Users Role*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.13.52pm-2136x1096.png)
*I clicked the Close button*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.18.00pm-2136x666.png)
*I used the Edit site header button to update the site title*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.18.43pm-2136x1106.png)
*I set the site title to Customer Portal*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.25.00pm-2136x565.png)
*I updated the site Style*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.30.30pm-2136x876.png)
*I set the site visibility to Public*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.21.16pm-2136x844.png)
*I navigated to the Robert Townes Contact record*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.21.47pm-2136x648.png)
*I clicked the Create Invitation button*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.22.25pm-2136x747.png)
*I clicked Save*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-9.22.56pm-2136x692.png)
*I copied the Invitation Code*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.11.10pm-2136x1107.png)
*I use the invitation code to register robert*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.11.57pm-2136x1100.png)
*I clicked the Sales Orders menu item*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.12.26pm-2136x978.png)
*I reviewed the Adatum Corporation Sales Orders*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.13.45pm-2136x1090.png)
*I created a child permission*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.14.20pm-2136x1104.png)
*I selected the Authenticated Users role*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.15.04pm-2136x1091.png)
*I created a Sales Order page*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.16.09pm-2136x1008.png)
*I added a text component and a form to the web site. I selected the Portal Sales Order Main Form*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.16.33pm-2136x833.png)
*The form will be read-only*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.16.56pm-2136x885.png)
*On submit the user will be redirected back to the Sales Orders list page*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.17.20pm-2136x841.png)
*I turned off the CAPTCHA*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.17.48pm-2136x810.png)
*I turned off AI form fill*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.19.06pm-2136x936.png)
*I updated the List. I added a View details action that will navigate the user to the Sales Order page*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.19.38pm-2136x724.png)
*I clicked on the View details link*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.20.03pm-2136x833.png)
*An Internal Server Error was generated*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.20.54pm-2136x1100.png)
*I added a New table permission*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.21.52pm-2136x1101.png)
*I added a Global permission*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.22.35pm-2136x1097.png)
*Logged in as Robert I was able to review Sales Order Lines associated with the selected Sales Order*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.25.56pm-2136x946.png)
*I reviewed the Table permissions*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.29.53pm-2136x895.png)
*I added the Customer Portal Site to the solution*

![](/assets/images/powerpages1/screenshot-2024-12-14-at-10.33.58pm-2136x825.png)
*The Customer Portal solution is ready to be exported*