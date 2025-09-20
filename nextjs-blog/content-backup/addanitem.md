---
title: "Add an Item"
description: "A comprehensive guide covering add an item"
date: "2025-09-20"
category: "Development"
image: "/assets/images/addanitem.png"
tags: ["business central","power platform"]
---

# Add an Item

Power Apps (Part 8) Adding an Item This file is licensed under the Creative Commons Attribution 4.0 International license. I used Patch to add a Business Central Item Patch( 'Items', Defaults('Items'), {'Display Name': RecordsGallery1.Selected.'Item Name'} ) I opened the Business Central Configuration app I made the Business Central Item table visible I generated an Item Setup app with Copilot I asked Copilot to remove the columns I did not need I clicked the "Preview the app" button I reviewed the app I saved the app I switched to the Data tab and clicked the + Add data button I selected the Business Central Virtual Table The Items table was added I duplicated the delete button I configured the new button to display the Publish icon I updated the button's OnSelect property I previewed the app I selected an item and clicked the Publish button The item was added to Business Central and the user is prompted to confirm a delete The Item Setup record has been deleted The Business Central item has been added References Extending Microsoft Business Central with Power Platform
