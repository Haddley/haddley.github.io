---
title: "Power Apps Custom Components"
description: "A comprehensive guide covering power apps custom components"
date: "2025-09-20"
category: "Development"
image: "/assets/images/customcomponents.png"
tags: ["ai"]
---

# Power Apps Custom Components

Power Apps (Part 2) Create reusable Power Apps Components. Microsoft_Office_logo by Microsoft is licensed under CC New component library Navigate to https://make.powerapps.com/ Select the "Apps" menu item and select the "Component libraries" tab. Click the + New component library button Name the library Rename the sample component Name the component "EditHeader" Add a second component Rename the second component Name the second component "BrowseHeader" Add a third component Rename the third component "DetailHeader" Set the height of all three components from 640 to 88. Add a custom property to the EditHeader component Name the Input property Title Add an "OnSelectAccept" custom Behavior property If you are unable to add a Behavior property enable "Enhanced component properties" in the settings dialog. Add an "OnSelectCancel" custom Behavior property Select the IconCancel control and edit the OnSelect property so that selecting the cancel icon will raise the custom OnSelectCancel event Select the AppName control and edit the Text property so that the value of the Title property will be copied to the text property of the label. Select the IconAccept control and edit the OnSelect property so that selecting the tick icon will raise the new custom OnSelectAccept event Repeat these steps for the BrowseHeader and DetailHeader Components These custom properties will be added to BrowseHeader: {Title, OnSelectRefresh, OnSelectNewItem, OnSelectSortUpDown} These custom properties will be added to DetailHeader: {Title, OnSelectBack, OnSelectDelete, OnSelectEdit} Publish Solution
