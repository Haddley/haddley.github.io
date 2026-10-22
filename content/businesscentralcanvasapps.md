---
title: "Business Central Canvas Apps"
description: "Microsoft Dynamics 365 Business Central"
date: "2023-08-14"
categories: ["Microsoft Dynamics","Business Central","Power Platform"]
tags: "canvas-apps, power-apps, business-central, integration"
hidden: false
slug: "businesscentralcanvasapps"
image: "/assets/images/businesscentralcanvasapps/dynamics365-color.svg"
---


[Microsoft Dynamics 365](https://en.wikipedia.org/wiki/Microsoft_Dynamics_365) is a product line of more than a dozen enterprise resource planning (ERP) and customer relationship management (CRM) business applications.

[Microsoft Dynamics 365 Business Central](https://en.wikipedia.org/wiki/Microsoft_Dynamics_365#Microsoft_Dynamics_365_Business_Central) (formerly Microsoft Dynamics NAV) is an ERP and CRM product meant for small and mid-sized businesses (Integrating both Dynamics NAV and Dynamics CRM features).


:::brain-power Before you read on
Business Central holds the company's data, but most people never open it. If you wanted to put a small app on a phone that reads and edits some of that data, what would the app need to know in order to find the right company?
:::

## Power Platform Environments

[Power Platform environments](https://admin.powerplatform.microsoft.com/environments) refer to isolated spaces within the Microsoft Power Platform ecosystem where I can develop, test, and deploy apps, flows, and other solutions.

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-11.48.03-am-1394x806.png)
*I added a Develop environment.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-11.56.31-am-1152x396.png)
*I navigated to the Power Apps home page and selected the Develop environment*

:::no-dumb-questions
**Q: What is a Power Platform environment?**

A: An isolated space where I can develop, test and deploy apps, flows and other solutions. I made a Develop environment so that my experiments stayed apart from anything else.

**Q: What is the Dynamics 365 Business Central connector asking me for?**

A: Which Business Central environment and company to read. In each app I chose the CRONUS USA, Inc. company in the MYSANDBOX environment, and then I chose a table such as currencies or salesOrders.
:::


## Currencies

I created a Canvas app to display the available currencies.

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.06.41-pm-1292x642.png)
*I clicked the "+ Create" link*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.06.53-pm-1294x644.png)
*I clicked the "Create" button on the "Blank canvas app" card*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.07.15-pm-1295x601.png)
*I named the app "Currencies"*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.07.37-pm-1295x601.png)
*I clicked the "Create a gallery" link*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.07.58-pm-1294x602.png)
*I selected the "Dynamics 365 Business Central" connector*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.08.36-pm-1293x241.png)
*I selected the "CRONUS USA, Inc." company in the "MYSANDBOX" environment.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.08.59-pm-1291x601.png)
*I selected the "currencies (v2.0)" table*

:::under-the-hood The shape of the Currencies app
The pattern is the same in all three apps: a connector gives access to a Business Central table, and a gallery shows its rows. Here the table is currencies (v2.0), and the gallery uses the Title and subtitle layout. I later added a currency in Business Central, and the app showed it when I ran it again.
:::

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.10.50-pm-1290x599.png)
*I selected the "Title and subtitle" (vertical gallery) layout.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.11.03-pm-1293x207.png)
*I clicked the "Preview the app" link*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.11.15-pm-1293x377.png)
*I reviewed the preview.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.18.22-pm-1357x779.png)
*I navigated to CRONUS USA, Inc company accounts in my MySandbox environment - Dynamics 365 Business Central*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.19.00-pm-1356x323.png)
*I used a "Tell Me" search to find a link to the Currencies Administration page.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.19.50-pm-1359x415.png)
*The Currencies Administration page*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.44.34-pm-1354x378.png)
*I added an extra currency*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-12.46.11-pm-1311x373.png)
*I ran the Canvas app*


## Sales Orders

I developed a Canvas app to display Sales Orders, filtered by Salesperson

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.42.37-pm-1297x559.png)
*I chose the Blank app*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.42.49-pm-1293x600.png)
*I clicked the Blank canvas app "Create app" link*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.43.35-pm-1293x600.png)
*I entered "Sales Orders" and clicked the Table radio button*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.43.59-pm-1292x599.png)
*I clicked the "Create a gallery" link*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.49.34-pm-1296x326.png)
*I selected the "Dynamics 365 Business Central" connector*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.49.49-pm-1294x200.png)
*I selected the "CRONUS USA, Inc." company accounts in the "MYSANDBOX" environment*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.50.18-pm-1292x601.png)
*I selected the Sales Orders (salesOrders) table*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.50.50-pm-1285x214.png)
*I updated the Gallery (Gallery1) to display a title, subtitle and body.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.52.23-pm-1294x524.png)
*I "bound" table columns to the Title, Subtitle and Body fields.*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.52.40-pm-1296x175.png)
*All Sales Orders are displayed in a vertical list*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.53.01-pm-1295x492.png)
*I added an Edit Form*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.53.24-pm-1297x374.png)
*I set the Data source of the Form to the (same) Sales Orders table*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.53.51-pm-1296x451.png)
*I updated the Edit Form Item to bind to the item selected in the Gallery (Gallery1)*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.54.01-pm-1293x122.png)
*At this point I could select a Sales Order on the left and see the Sales Order (Item) detail on the right*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.54.41-pm-1293x134.png)
*I added a Drop down list (control)*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.55.37-pm-1294x149.png)
*I set the Data source of the Drop down list to the (same) Sales Orders table*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.56.14-pm-1293x231.png)
*I updated the Drop down list to display only Distinct values (the two salespeople values)*

:::no-dumb-questions
**Q: Why did the drop-down use Distinct values?**

A: The Sales Orders table has one salesperson on every order, so the same name appears many times. Distinct makes the list show each name once. I then filtered the gallery to the orders for the salesperson who was selected.
:::

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-2.56.50-pm-1295x493.png)
*I updated Gallery1 to display only items sold by the salesperson selected in the Drop down list*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-3.19.56-pm-1297x604.png)
*I published the Canvas app*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-14-at-3.17.05-pm-1292x600.png)
*I reviewed the Canvas app*


## Items App

I developed a Canvas app to edit Items maintained in Business Central

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.20.25-pm-1836x583.png)
*I selected Dataverse*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.20.36-pm-1836x579.png)
*I selected the Dynamics 365 Business Central connection*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.20.48-pm-1836x297.png)
*I selected the CRONUS USA company in the MYSANDBOX environment*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.21.06-pm-1836x582.png)
*I selected the "items" table*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.21.30-pm-1836x586.png)
*A number of screens were automagically generated*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.21.46-pm-1836x579.png)
*I saved the generated app*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.22.01-pm-1836x183.png)
*I published the app*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.22.13-pm-1836x584.png)
*I published the latest version of the app*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.22.47-pm-1836x409.png)
*I "played" the app on my laptop*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.28.27-pm-1836x421.png)
*I selected the > link to view details of the "ATHENS Mobile Pedestal" item*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.28.37-pm-1836x303.png)
*I clicked the pencil icon to switch to the edit screen*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.29.00-pm-1836x660.png)
*I updated the item Display Name*

:::watch-it Use a sandbox when the app can edit data
The Items app writes back to Business Central, and I checked the change in Business Central after each edit, once from my laptop and once from my phone. I did all of this in the MYSANDBOX environment with CRONUS USA, so a mistake could not touch a real company. Do the same for your own tests.
:::

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-12.29.52-pm-1836x507.png)
*I switched back to Microsoft 365 Business Central to check that the update had been saved.*

![](assets/images/businesscentralcanvasapps/20230817image0-1242x2688.png)
*I "played" the app on my mobile phone*

![](assets/images/businesscentralcanvasapps/20230817iimage1-1242x2688.png)
*I updated the Display Name again*

![](assets/images/businesscentralcanvasapps/20230817iimage2-1242x2688.png)
*I saved the update*

![](assets/images/businesscentralcanvasapps/screen-shot-2023-08-17-at-1.12.37-pm-1836x490.png)
*I switched back to Microsoft 365 Business Central to check that the mobile update had been saved.*

:::test-drive Try it yourself
1. Create a blank canvas app, add the Business Central connector, and choose a sandbox company.
2. Pick a table, and show it in a vertical gallery.
3. Add an edit form that is bound to the selected item, and change a value.
4. Open Business Central and check that the change was saved.
:::

:::bullet-points Recap
- A Power Platform environment is an isolated space for building and testing.
- The Business Central connector needs an environment, a company and a table.
- A gallery shows rows, and a form bound to the selected row can edit them.
- I filtered Sales Orders by salesperson with a drop-down of distinct values.
- Edits made in the app, on my laptop and on my phone, were saved in Business Central.
:::
