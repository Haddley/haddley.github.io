---
title: "Rewards Extension"
description: "A comprehensive guide covering rewards extension"
date: "2025-09-20"
category: "Development"
image: "/assets/images/dynamics365-color.svg"
tags: ["ai","ml","business central","dynamics"]
---

# Rewards Extension

## Rewards Extension

![](/assets/images/rewardsextension/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Rewards Extension

The Microsoft Dynamics 365 Business Central Extension described here allows users to create a list of "Rewards" and to associate rewards with Business Central Customers.

![](/assets/images/rewardsextension/20230830image1-1021x770.png)
*I added the idRange needed for the Rewards extension*


## Rewards table

I created a Rewards.al file. In the Rewards.al file I added code to created a Business Central "Reward" table, a Business Central "Reward Card" page and a Business Central "Reward List" page.

![](/assets/images/rewardsextension/20230830image2-1443x1068.png)
*I navigated to http://bcserver/BC/?tenant=default&page=50102 to view the Reward table using the Reward List page*

![](/assets/images/rewardsextension/20230830image3-1288x520.png)
*I added a Reward item*

![](/assets/images/rewardsextension/20230830image4-1287x523.png)
*The reward item has been stored in the Reward Table*

![](/assets/images/rewardsextension/20230830image10-1415x1024.png)
*I added the Minimum Purchase field to the Reward List page*

![](/assets/images/rewardsextension/20230830image11-1416x1023.png)
*I added the Minimum Purchase field to the Reward Card page*

![](/assets/images/rewardsextension/20230830image15-1390x1038.png)
*I added a Customer Ext (table extension) and a Customer Card Ext (card extension) to associate a Reward value with an Business Central Customer*


## Documentation

I used [Meta's codellama language model](LMStudio.html) to create the AL code documentation.

![](/assets/images/rewardsextension/screenshot-2023-08-30-at-1.28.36-pm-1466x1340.png)
*LM Studio code llama instruct 7B*


## code llama instruct 7B

**Please explain this Business Central AL code**

This code creates a new table called "Reward" with four fields: "Reward ID", "Description", "Discount Percentage", and "Minimum Purchase". The "Reward ID" field is the primary key of the table. The "Description" field can contain a string with up to 250 characters, the "Discount Percentage" field is a Decimal numeric value that represents the discount that will be applied for this reward, and the "Minimum Purchase" field is also a Decimal numeric value that represents the minimum purchase amount required to qualify for this reward.

The code also creates two pages: "Reward Card" and "Reward List". The "Reward Card" page is of type "Card" and will render as a card, while the "Reward List" page is of type "List" and will render as a list. The source table for both pages is the "Reward" table.

The "Reward Card" page has a layout that includes a group called "Reward" with four fields: "Reward ID", "Description", "Discount Percentage", and "Minimum Purchase". The "Reward ID" field is a text box that displays the value of the "Reward ID" field from the "Reward" table, while the other three fields are also text boxes that display the corresponding values.

The "Reward List" page has a layout that includes a repeater called "Rewards". The repeater contains four fields: "Reward ID", "Description", "Minimum Purchase", and "Discount Percentage". Each record in the "Reward" table will be displayed as a separate row in the list.

The code also includes a table extension called "Customer Ext" that extends the "Customer" table with an additional field called "Reward ID". The "Reward ID" field is set to have a table relation to the "Reward ID" field in the "Reward" table, and it is also set to validate the table relationship.

Finally, the code includes a page extension called "Customer Card Ext" that extends the "Customer Card" page with an additional text box called "Reward ID". The "Reward ID" text box displays the value of the "Reward ID" field from the "Customer" table and allows users to select a reward from a lookup window. The "Rewards" action is also added to the Navigation group, which will run the "Reward List" page when activated.
