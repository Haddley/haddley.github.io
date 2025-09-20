---
title: "Power Page (Part 2) Backup"
description: "A comprehensive guide covering power page (part 2) backup"
date: "2025-09-20"
category: "Development"
image: "/assets/images/page200/hero.png"
tags: ["javascript","java","ai","ml","business central"]
---

# Power Page (Part 2) Backup

## Customer Orders

![](/assets/images/page200/powerpages-scalable.svg)
*Microsoft permits the use of these icons in architectural diagrams, training materials, or documentation.*


## Customer Orders

Customer Orders may be handled directly by customers using a self-service Customer Portal.

Here a Power Pages Customer Portal enables customers to view, create, and manage their orders in the context of a Business Central subscription.

![](/assets/images/page200/screenshot-2024-11-20-at-3.08.44pm-2136x751.png)
*I opened the Customer Portal Solution and added a new Table*

![](/assets/images/page200/screenshot-2024-11-20-at-3.09.18pm-2136x1101.png)
*I added a Customer Order table*

![](/assets/images/page200/screenshot-2024-11-20-at-3.11.38pm-2136x1103.png)
*I updated the Name column*

![](/assets/images/page200/screenshot-2024-11-20-at-3.12.11pm-2136x1107.png)
*I updated the Data type to Autonumber and set the prefix to Order*

![](/assets/images/page200/screenshot-2024-11-20-at-3.15.00pm-2136x1106.png)
*I added a Requested Delivery Date column*

![](/assets/images/page200/screenshot-2024-11-20-at-3.15.13pm-2136x1103.png)
*I set the type of the Requested Delivery Date column's Time zone adjustment*

![](/assets/images/page200/screenshot-2024-11-20-at-3.25.36pm-2136x1104.png)
*I added an Account column to store the Account/Customer the Order is associated with*

![](/assets/images/page200/screenshot-2024-11-20-at-3.26.43pm-2136x1109.png)
*I created a Created By Contact column to track who created the Order*

![](/assets/images/page200/screenshot-2024-11-20-at-3.27.22pm-2136x1107.png)
*I created a Modified By Contact column to track who updated the Order last*

![](/assets/images/page200/screenshot-2024-11-20-at-3.28.16pm-2136x1107.png)
*I edited the Active Customer Orders view*

![](/assets/images/page200/screenshot-2024-11-20-at-3.28.45pm-2136x1107.png)
*I saved the new view as Portal Active Customer Orders*

![](/assets/images/page200/screenshot-2024-11-20-at-3.30.49pm-2136x1100.png)
*I added columns to the view*

![](/assets/images/page200/screenshot-2024-11-20-at-3.31.44pm-2136x1106.png)
*I edited the Customer Order's Main form*

![](/assets/images/page200/screenshot-2024-11-20-at-3.32.19pm-2136x1106.png)
*I saved the form as Portal Information (I later renamed it Portal New Customer Order)*

![](/assets/images/page200/screenshot-2024-11-20-at-3.33.39pm-2136x1101.png)
*I added the Requested Delivery Date column to the form*

![](/assets/images/page200/screenshot-2024-11-20-at-3.37.00pm-2136x1171.png)
*I edited the Customer Portal web site*

![](/assets/images/page200/screenshot-2024-11-20-at-3.38.50pm-2136x1113.png)
*I created a List Customer Orders page*

![](/assets/images/page200/screenshot-2024-11-20-at-3.39.34pm-2136x1110.png)
*I added h1 text and clicked the Add a component button*

![](/assets/images/page200/screenshot-2024-11-20-at-3.39.46pm-2136x1105.png)
*I clicked the List component*

![](/assets/images/page200/screenshot-2024-11-20-at-3.40.23pm-2136x1101.png)
*I disabled AI Insights and clicked the + New List button*

![](/assets/images/page200/screenshot-2024-11-20-at-3.41.26pm-2136x1107.png)
*I selected the Customer Order table. I selected the Portal Active Customer Orders view (see above). I named the list List Portal Active Customer Orders*

![](/assets/images/page200/screenshot-2024-11-20-at-3.41.46pm-2136x1103.png)
*I clicked the + New permissions button*

![](/assets/images/page200/screenshot-2024-11-20-at-3.48.02pm-2136x1103.png)
*I created a table permission with Account access. Any Contact associated with the given Account/Customer will be able to see the Account/Customer's records. I created a table permission that provided access to the Customer Order table. I named the table permission Account Customer Order*

![](/assets/images/page200/screenshot-2024-11-20-at-3.48.19pm-2136x1103.png)
*I added the Authenticated Users role and permission to Read*

![](/assets/images/page200/screenshot-2024-11-20-at-4.09.43pm-2136x1097.png)
*I previewed the web page*

![](/assets/images/page200/screenshot-2024-11-20-at-4.10.16pm-2136x728.png)
*Anonymous users did not have access to the Customer Order table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.15.23pm-2136x593.png)
*I logged in as Robert Townes. There were no record to display*

![](/assets/images/page200/screenshot-2024-11-20-at-4.15.50pm-2136x917.png)
*I updated the page navigation permissions. Only Authenticated Users would see a menu item that would navigate to the List Customer Orders page.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.16.37pm-2136x1052.png)
*I created a New Customer Order page*

![](/assets/images/page200/screenshot-2024-11-20-at-4.17.10pm-2136x1104.png)
*I added h1 text and a Form.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.18.56pm-2136x1108.png)
*I created a Power Pages form based on the Customer Order table and the Portal Information Dataverse form (I later renamed that Dataverse form Portal New Customer Order). I named the Power Pages form Create New Customer Order.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.19.05pm-2136x1104.png)
*I selected the Data tab and selected the Creates a new record option*

![](/assets/images/page200/screenshot-2024-11-20-at-4.19.25pm-2136x915.png)
*I selected the On submit tab and selected the Redirect to a page option. The submit button will redirect back to the List Customer Orders page.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.19.33pm-2136x907.png)
*I selected the CAPTCHA tab and uncheck the boxes.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.19.44pm-2136x847.png)
*I disabled form filling assistance.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.20.09pm-2136x1103.png)
*I clicked the Update permissions button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.23.25pm-2136x1101.png)
*I updated the existing Account Customer Order table permissions*

![](/assets/images/page200/screenshot-2024-11-20-at-4.23.41pm-2136x1107.png)
*I added Permission to Create.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.24.45pm-2136x1103.png)
*I navigated to Power Pages Management*

![](/assets/images/page200/screenshot-2024-11-20-at-4.25.22pm-2136x930.png)
*I navigated to Basic Forms and selected the Create New Customer Order form*

![](/assets/images/page200/screenshot-2024-11-20-at-4.26.43pm-2136x1032.png)
*I added a Basic Form Metadata*

![](/assets/images/page200/screenshot-2024-11-20-at-4.27.02pm-2136x997.png)
*I selected Attribute*

![](/assets/images/page200/screenshot-2024-11-20-at-4.27.29pm-2136x920.png)
*I selected the Order's Account field.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.27.44pm-2136x1030.png)
*I checked the Set Value On Save box and selected the Current Portal User option*

![](/assets/images/page200/screenshot-2024-11-20-at-4.28.20pm-2136x936.png)
*I selected the Current User's Company Name field (the Account/Customer the Current User is associated with).*

![](/assets/images/page200/screenshot-2024-11-20-at-4.28.32pm-2136x963.png)
*I clicked the Save & Close button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.29.54pm-2136x971.png)
*I added a Basic Form Metadata to set the Order's Created By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-4.30.12pm-2136x889.png)
*I added a Basic Form Metadata to set the Order's Modified By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-4.30.40pm-2136x1016.png)
*The Order's Created By Contact and Modified By Contact fields would be set to the value to the Current User's Contact record*

![](/assets/images/page200/screenshot-2024-11-20-at-4.31.14pm-2136x955.png)
*I had added three Basic Form Metadata entries*

![](/assets/images/page200/screenshot-2024-11-20-at-4.31.39pm-2136x930.png)
*I scrolled to the right to double check the On Save From Attribute setting*

![](/assets/images/page200/screenshot-2024-11-20-at-4.32.32pm-2136x982.png)
*I updated the List Customer Orders' Create a new record action to use the Create New Customer Order form*

![](/assets/images/page200/screenshot-2024-11-20-at-4.33.04pm-2136x666.png)
*I navigate the List Customer Orders page and clicked the Create button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.34.04pm-2136x815.png)
*I reviewed the popup form*

![](/assets/images/page200/screenshot-2024-11-20-at-4.33.41pm-2136x972.png)
*I updated the Create a new record action's Target type to Webpage and selected the New Customer Order page*

![](/assets/images/page200/screenshot-2024-11-20-at-4.34.29pm-2136x946.png)
*I clicked the Create button again and was navigate to the New Customer Order page.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.34.38pm-2136x934.png)
*I selected a Requested Delivery Date and clicked the Submit button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.34.57pm-2136x708.png)
*I was redirected the to List Customer Orders page with the new Order displayed*

![](/assets/images/page200/screenshot-2024-11-20-at-4.36.52pm-2136x953.png)
*I added a new Dataverse table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.37.14pm-2136x1107.png)
*I added a Customer Order Line table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.38.12pm-2136x1107.png)
*I added a lookup column that will allow us to maintain a relationship between a given Order and a set of Order Line records*

![](/assets/images/page200/screenshot-2024-11-20-at-4.40.19pm-2136x801.png)
*I opened the Business Central Configuration app and selected the Business Central Item table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.40.33pm-2136x899.png)
*I set the Visible property to true*

![](/assets/images/page200/screenshot-2024-11-20-at-4.42.30pm-2136x828.png)
*The Item table was set to Visible*

![](/assets/images/page200/screenshot-2024-11-20-at-4.43.45pm-2136x1103.png)
*I added an Item Column to the Customer Order Line table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.44.34pm-2136x1099.png)
*I added a Quantity column to the Customer Order Line table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.47.12pm-2136x1101.png)
*I added a Unit Price column to the Customer Order Line table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.48.03pm-2136x1104.png)
*I added an Amount (formula) column to the Customer Order Line table*

![](/assets/images/page200/screenshot-2024-11-20-at-4.48.49pm-2136x881.png)
*I edited the Active Customer Order Lines view*

![](/assets/images/page200/screenshot-2024-11-20-at-4.49.18pm-2136x1103.png)
*I saved the new view as Portal Active Customer Order Lines*

![](/assets/images/page200/screenshot-2024-11-20-at-4.50.12pm-2136x897.png)
*I added columns to the view*

![](/assets/images/page200/screenshot-2024-11-20-at-4.52.25pm-2136x1107.png)
*I created a Portal Update Customer Order form*

![](/assets/images/page200/screenshot-2024-11-20-at-4.52.58pm-2136x792.png)
*I added a 1 column section*

![](/assets/images/page200/screenshot-2024-11-20-at-4.53.39pm-2136x943.png)
*I added a subgrid to the Customer Order form. The subgrid will display the Customer Order Line records related to the selected Customer Order.*

![](/assets/images/page200/screenshot-2024-11-20-at-4.54.08pm-2136x1106.png)
*I updated the subgrid label to Lines*

![](/assets/images/page200/screenshot-2024-11-20-at-4.55.17pm-2136x1020.png)
*I created an Update Customer Order page*

![](/assets/images/page200/screenshot-2024-11-20-at-4.55.54pm-2136x979.png)
*I added h1 text and a Form*

![](/assets/images/page200/screenshot-2024-11-20-at-4.56.07pm-2136x1022.png)
*I clicked the + New form button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.57.08pm-2136x921.png)
*I named the form Update Existing Customer Order*

![](/assets/images/page200/screenshot-2024-11-20-at-4.57.17pm-2136x972.png)
*In the Data tab I selected the Updates an existing record option*

![](/assets/images/page200/screenshot-2024-11-20-at-4.57.31pm-2136x841.png)
*In the On submit tab I selected the List Customer Orders page*

![](/assets/images/page200/screenshot-2024-11-20-at-4.57.47pm-2136x898.png)
*I unchecked the CAPTCHA boxes*

![](/assets/images/page200/screenshot-2024-11-20-at-4.57.56pm-2136x881.png)
*I disabled form filling assistance*

![](/assets/images/page200/screenshot-2024-11-20-at-4.58.15pm-2136x1106.png)
*I clicked the Update permission button*

![](/assets/images/page200/screenshot-2024-11-20-at-4.58.55pm-2136x1101.png)
*I updated the existing Account Customer Order table permissions*

![](/assets/images/page200/screenshot-2024-11-20-at-4.59.04pm-2136x1104.png)
*I added Permission to Update*

![](/assets/images/page200/screenshot-2024-11-20-at-5.00.10pm-2136x979.png)
*I update the Edit record action to redirect to the Update Customer Order page (I would need to add additional detail see below)*

![](/assets/images/page200/screenshot-2024-11-20-at-5.00.31pm-2136x670.png)
*I opened the List Customer Order page and clicked the Edit menu item*

![](/assets/images/page200/screenshot-2024-11-20-at-5.00.46pm-2136x985.png)
*Robert did not have permission to view the Customer Order Lines*

![](/assets/images/page200/screenshot-2024-11-20-at-7.16.19pm-2136x953.png)
*I added the Order lookup to the New Customer Order Line form. I marked the lookup as Hidden.*

![](/assets/images/page200/screenshot-2024-11-20-at-5.11.48pm-2136x1101.png)
*I saved the form as Portal New Customer Order Line*

![](/assets/images/page200/screenshot-2024-11-20-at-5.13.01pm-2136x917.png)
*I created a New Customer Line page and added a form*

![](/assets/images/page200/screenshot-2024-11-20-at-5.13.40pm-2136x1100.png)
*In the Data tab I selected the Creates a new record option*

![](/assets/images/page200/screenshot-2024-11-20-at-5.13.57pm-2136x1096.png)
*I would need to return to the On submit settings*

![](/assets/images/page200/screenshot-2024-11-20-at-5.14.05pm-2136x953.png)
*I unchecked the CAPTCHA boxes*

![](/assets/images/page200/screenshot-2024-11-20-at-5.14.14pm-2136x976.png)
*I disabled form filling assistance*

![](/assets/images/page200/screenshot-2024-11-20-at-5.14.39pm-2136x1101.png)
*I could not add Account permissions (because I had not added an Account field to the Customer Order Lines table)*

![](/assets/images/page200/screenshot-2024-11-20-at-5.15.35pm-2136x1103.png)
*I added an Account field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.16.29pm-2136x1101.png)
*I added a Created By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.16.58pm-2136x1103.png)
*I added a Modified By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.17.50pm-2136x1107.png)
*I added Account Customer Order Line table permissions*

![](/assets/images/page200/screenshot-2024-11-20-at-5.18.24pm-2136x1106.png)
*I added Permission to Read, Update, Create and Delete for Authenticated Users*

![](/assets/images/page200/screenshot-2024-11-20-at-5.18.57pm-2136x1032.png)
*I previewed the Update Customer Order form. There was no way to Create a Customer Order Line*

![](/assets/images/page200/screenshot-2024-11-20-at-5.20.03pm-2136x840.png)
*I added New Basic Form Metadata*

![](/assets/images/page200/screenshot-2024-11-20-at-5.20.29pm-2136x917.png)
*This Basic Form Metadata entry would (On Save) update the Modified By Contact value in the Customer Order*

![](/assets/images/page200/screenshot-2024-11-20-at-5.20.56pm-2136x1023.png)
*The Current User's Contact would be used to update the Modified By Contact value*

![](/assets/images/page200/screenshot-2024-11-20-at-5.21.10pm-2136x911.png)
*I clicked the + New Basic Form Meta data button again*

![](/assets/images/page200/screenshot-2024-11-20-at-5.21.37pm-2136x1106.png)
*I selected Type Subgrid*

![](/assets/images/page200/screenshot-2024-11-20-at-5.22.22pm-2136x1106.png)
*I added a Create View Action. This will ensure that a Create Line button is shown. Clicking the Create Line button will redirect the user to the New Customer Order Line page*

![](/assets/images/page200/screenshot-2024-11-20-at-5.22.44pm-2136x1058.png)
*As Robert I clicked the Create Line button*

![](/assets/images/page200/screenshot-2024-11-20-at-5.23.30pm-2136x1043.png)
*I was redirected to the New Customer Order Line page*

![](/assets/images/page200/screenshot-2024-11-20-at-5.24.33pm-2136x1053.png)
*I was unable to select an Item*

![](/assets/images/page200/screenshot-2024-11-20-at-5.25.27pm-2136x834.png)
*I confirmed that I could see the Item table as the administrator*

![](/assets/images/page200/screenshot-2024-11-20-at-5.31.41pm-2136x894.png)
*I created a Portal All Items view*

![](/assets/images/page200/screenshot-2024-11-20-at-5.33.32pm-2136x783.png)
*I added columns to this view*

![](/assets/images/page200/screenshot-2024-11-20-at-5.34.16pm-2136x1103.png)
*I added a List Items page*

![](/assets/images/page200/screenshot-2024-11-20-at-5.34.54pm-2136x958.png)
*I added h1 text and a List*

![](/assets/images/page200/screenshot-2024-11-20-at-5.35.08pm-2136x982.png)
*I clicked the + New List button*

![](/assets/images/page200/screenshot-2024-11-20-at-5.35.54pm-2136x1011.png)
*I added the List All Items list*

![](/assets/images/page200/screenshot-2024-11-20-at-5.36.53pm-2136x1107.png)
*I added Permission to Read*

![](/assets/images/page200/screenshot-2024-11-20-at-5.39.27pm-2136x1101.png)
*I returned to the New Customer Order Line page and was able to select an Item*

![](/assets/images/page200/screenshot-2024-11-20-at-5.39.56pm-2136x1014.png)
*I clicked the Submit button*

![](/assets/images/page200/screenshot-2024-11-20-at-5.40.20pm-2136x846.png)
*Submission completed successfully?*

![](/assets/images/page200/screenshot-2024-11-20-at-5.40.42pm-2136x1052.png)
*The new Customer Order Line was not displayed*

![](/assets/images/page200/screenshot-2024-11-20-at-5.41.56pm-2136x751.png)
*I added a Basic Form Metadata entry*

![](/assets/images/page200/screenshot-2024-11-20-at-5.42.20pm-2136x879.png)
*The Basic Form Metadata entry would set the Customer Order Line Account field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.42.42pm-2136x1024.png)
*The Account field would be set using the Current User's Company Name.*

![](/assets/images/page200/screenshot-2024-11-20-at-5.43.12pm-2136x942.png)
*I added another Basic Form Metadata entry*

![](/assets/images/page200/screenshot-2024-11-20-at-5.43.29pm-2136x844.png)
*This Basic Form Metadata entry will set the Created By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.43.58pm-2136x1084.png)
*The Created By Contact field will be set to the Current User's Contact*

![](/assets/images/page200/screenshot-2024-11-20-at-5.44.17pm-2136x907.png)
*I added another Basic Form Metadata entry*

![](/assets/images/page200/screenshot-2024-11-20-at-5.44.36pm-2136x783.png)
*This Basic Form Metadata entry will set the Modified By Contact field*

![](/assets/images/page200/screenshot-2024-11-20-at-5.45.00pm-2136x918.png)
*The Modified By Contact field will be set to the Current User's Contact*

![](/assets/images/page200/screenshot-2024-11-20-at-5.45.16pm-2136x929.png)
*I had created these three Basic Form Metadata entries*

![](/assets/images/page200/screenshot-2024-11-20-at-7.50.00pm-2136x1101.png)
*I updated the Update Existing Customer Order Line's On Success Settings. This new setting would redirect the user back to the Update Customer Order page passing the Current Order's id*

![](/assets/images/page200/screenshot-2024-11-20-at-7.50.33pm-2136x1018.png)
*I tested the subgrid's delete action*

![](/assets/images/page200/screenshot-2024-11-20-at-7.50.39pm-2136x653.png)
*I confirmed the delete action*

![](/assets/images/page200/screenshot-2024-11-20-at-7.52.29pm-2136x1100.png)
*I updated the subgrid's edit action to redirect the user to the Update Customer Order Line page*

![](/assets/images/page200/screenshot-2024-11-20-at-7.52.47pm-2136x1085.png)
*I tested the edit action*

![](/assets/images/page200/screenshot-2024-11-20-at-7.53.11pm-2136x1091.png)
*I updated the Quantity and clicked the Submit button*

![](/assets/images/page200/screenshot-2024-11-20-at-7.53.25pm-2136x1094.png)
*The updated Quantity was displayed*

![](/assets/images/page200/screenshot-2024-11-20-at-7.54.05pm-2136x1104.png)
*I needed to create code that would set the hidden Customer Order lookup field value based on the refid url value passed to the New Customer Order Line page*

![](/assets/images/page200/screenshot-2024-11-20-at-7.54.14pm-2136x1110.png)
*I clicked the Open Visual Studio Code button*

![](/assets/images/page200/screenshot-2024-11-20-at-11.16.45pm-2136x950.png)
*I added code that would set the hidden Order lookup field based on the refid url parameter*

![](/assets/images/page200/screenshot-2024-11-20-at-7.57.28pm-2136x1174.png)
*I added Liquid tags to the New Customer Order Line html to fetch Item table details and store the result in a hidden id input tag.*

![](/assets/images/page200/screenshot-2024-11-20-at-7.59.49pm-2136x1178.png)
*I updated the javascript code to lookup unit price values and calculate the amount field value*

![](/assets/images/page200/screenshot-2024-11-20-at-8.10.07pm-2136x1171.png)
*I made the same changes to the Update Customer Order Line page's html and javascript*

![](/assets/images/page200/screenshot-2024-11-20-at-11.40.32pm-2136x1104.png)
*I updated the On Success Settings of the Create New Customer Order form. On Submit the user is redirected to the Update Customer Order form (passing the new Customer Order's id as a url parameter)*

![](/assets/images/page200/screenshot-2024-11-20-at-11.27.23pm-2136x898.png)
*I created a new Customer Order*

![](/assets/images/page200/screenshot-2024-11-20-at-11.29.50pm-2136x1003.png)
*I entered a Requested Delivery Date*

![](/assets/images/page200/screenshot-2024-11-20-at-11.29.57pm-2136x798.png)
*I clicked the Submit button*

![](/assets/images/page200/screenshot-2024-11-20-at-11.30.29pm-2136x1112.png)
*I clicked on the Create Line button to add a Customer Order Line*

![](/assets/images/page200/screenshot-2024-11-20-at-11.30.53pm-2136x1103.png)
*I selected an Item*

![](/assets/images/page200/screenshot-2024-11-20-at-11.31.08pm-2136x1037.png)
*I entered a Quantity and the Amount was calculated. I clicked Submit.*

![](/assets/images/page200/screenshot-2024-11-20-at-11.31.21pm-2136x1109.png)
*I was able to see the new Customer Order Line*

![](/assets/images/page200/screenshot-2024-11-20-at-11.31.31pm-2136x1074.png)
*I clicked the edit action*

![](/assets/images/page200/screenshot-2024-11-20-at-11.31.47pm-2136x1094.png)
*I updated the Quantity to 10. The Amount was recalculated. I clicked Submit*

![](/assets/images/page200/screenshot-2024-11-20-at-11.31.57pm-2136x1097.png)
*The line details were updated. I clicked Submit*

![](/assets/images/page200/screenshot-2024-11-20-at-11.32.08pm-2136x881.png)
*I returned to the List Customer Orders page*
