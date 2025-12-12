---
title: "Power Pages (Part 3)"
description: "Customer Order Lines"
date: "2024-12-20"
categories: ["AI","Angular","Microsoft Dynamics","TypeScript","Power Platform"]
tags: ""
slug: "powerpages3"
image: "/assets/images/powerpages-scalable.svg"
---



Customer Order Lines refer to the individual items or services listed within a customer's order. Each order line represents a specific product or service being purchased, including details such as:

Product or Service Name: The name or description of the item.
Quantity: The number of units being ordered for that specific product or service.
Price: The cost per unit of the product or service.
Total Amount: The extended price, which is typically the product of quantity and unit price.

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.13.41pm-2136x888.png)
*I created a new Table in the Solution*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.14.25pm-2136x1100.png)
*I named the table Customer Order Lines*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.16.38pm-2136x1099.png)
*I updated the Customer Order Lines | Name field*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.18.52pm-2136x1100.png)
*I added an Order Lookup field. The Order Lookup column created a relationship between the Customer Order and the Customer Order Line tables*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.20.50pm-2136x812.png)
*I added the Business Central Item Virtual Table*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.22.17pm-2136x1099.png)
*I added an Item lookup column to the Customer Order Lines table*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.23.04pm-2136x1099.png)
*I added a Whole Number Quantity column*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.28.07pm-2136x1101.png)
*I created a view*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.29.50pm-2136x965.png)
*I added the Item and Quantity columns to the Portal view*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.33.29pm-2136x1103.png)
*I added a form to the Customer Order Line table*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.34.42pm-2136x873.png)
*I added the Item and Quantity columns to the form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.36.16pm-2136x1103.png)
*I added a Customer Order Lines Grid to the Customer Order table's Portal form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.36.41pm-2136x1097.png)
*I uncheck the Hide label checkbox*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.38.00pm-2136x651.png)
*I tested the add Customer Order Line form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.38.20pm-2136x953.png)
*I was able to add a line to an order*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.47.43pm-2136x1103.png)
*I created a New Customer Order Line page*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.04.41pm-2136x1101.png)
*I added a New Customer Order Line Basic form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.50.43pm-2136x913.png)
*I selected the Creates a new record option*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.51.29pm-2136x1100.png)
*I selected redirect to the Edit Customer Order page*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.51.38pm-2136x914.png)
*I deselected the CATCHA options*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.51.49pm-2136x949.png)
*I deselected the AI form filling experience*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.52.05pm-2136x1101.png)
*I reviewed the options*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.52.21pm-2136x1097.png)
*I reviewed the table permissions*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.53.04pm-2136x552.png)
*I clicked the Add child permission menu item*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.54.39pm-2136x1099.png)
*I named the child permissions entry Customer Order Lines by Customer Order. The Customer Order Lines by Customer Order permission entry allows the logged in user to view any Customer Order Line that is related to a Customer Order they have access to. Account Customer Orders permissions provides the given users to only the rows/records that relate to their organization.*

![](/assets/images/powerpages3/screenshot-2025-01-13-at-12.18.23pm-2136x1106.png)
*Notice that the Append permission has been added*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.31.34pm-2136x1099.png)
*I added Read, Update, Create, Delete and Append to permissions to the Account Customer Orders Table permissions entry.We would like a user to be able to create Customer Order Lines to existing Customer Orders*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.57.56pm-2136x920.png)
*The Edit Customer Order form displays a Grid of related Customer Order Line records*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.58.07pm-2136x952.png)
*I added a Basic Form Metadata entry*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-7.59.22pm-2136x1097.png)
*This Basic Form Metadata entry configures the Grid displayed on the Edit Customer Order form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-8.01.05pm-2136x1013.png)
*A Create button has been added to the Customer Order form's grid*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-8.01.20pm-2136x1027.png)
*I was not able to lookup Items*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-8.01.58pm-2136x1096.png)
*I added a Global table permission. The Global table permission provides access to all rows/records in given table*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.08.03pm-2136x1022.png)
*I updated the On Success Settings to ensure that the Customer Order's id would be passed*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-8.02.45pm-2136x995.png)
*I selected a Customer Order Lines | Item*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-8.02.56pm-2136x1011.png)
*I entered a Quantity and clicked the Submit button*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.37.48pm-2136x982.png)
*I was redirected back to the Edit Customer Order page*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.48.02pm-2136x1101.png)
*I added an Edit Customer Order Line page*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.49.09pm-2136x1097.png)
*I added a form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.01.15pm-2136x1096.png)
*I named the new form Edit Customer Order Line*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.50.57pm-2136x1090.png)
*The new form would allow a user to update a Customer Order Line*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.51.14pm-2136x958.png)
*The Edit Customer Order page will redirect to the Edit Customer Order page*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.51.23pm-2136x991.png)
*I cleared the CAPTCHA boxes*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.51.31pm-2136x927.png)
*I disabled AI form filling*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-10.56.10pm-2136x1100.png)
*I updated the On Success Setting of the Edit Customer Order Line form*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.11.48pm-2136x1030.png)
*I added an Edit and a Delete menu item*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.13.00pm-2136x911.png)
*I used the Edit button to update a Customer Order Line*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.13.13pm-2136x793.png)
*I updated the Quantity*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.13.23pm-2136x927.png)
*I was redirected to the Customer Order with the updated line displayed*

![](/assets/images/powerpages3/screenshot-2024-12-20-at-11.14.29pm-2136x817.png)
*Clicking Submit in the Customer Order's page redirects the user back to the Customer Orders list page*

![](/assets/images/powerpages3/screenshot-2024-12-21-at-8.35.26am-2136x1099.png)
*I added the related Item | Unit Price and Item | Based Unit of Measure columns to the Portal Active Customer Order Lines view*

![](/assets/images/powerpages3/screenshot-2024-12-21-at-8.35.38am-2136x1094.png)
*I refreshed the Edit Customer Order page*