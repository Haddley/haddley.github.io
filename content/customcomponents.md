---
title: "Power Apps Custom Components"
description: "Create reusable Power Apps Components."
date: "2021-07-13"
categories: ["Power Platform","React"]
tags: []
slug: "customcomponents"
image: "/assets/images/office-365-icon-500x500.png"
---

## New component library

Navigate to [https://make.powerapps.com/](https://make.powerapps.com/)

Select the "Apps" menu item and select the "Component libraries" tab.

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.57.27-pm-1270x508.png)
*Click the + New component library button*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.58.34-pm-1820x1124.png)
*Name the library*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.59.41-pm-978x370.png)
*Rename the sample component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.59.50-pm-802x286.png)
*Name the component "EditHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.07-pm-452x134.png)
*Add a second component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.18-pm-1058x450.png)
*Rename the second component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.29-pm-610x118.png)
*Name the second component "BrowseHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.48-pm-982x566.png)
*Add a third component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.58-pm-678x142.png)
*Rename the third component "DetailHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.01.19-pm-698x240.png)
*Set the height of all three components from 640 to 88.*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.02.46-pm-672x272.png)
*Add a custom property to the EditHeader component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.03.50-pm-1272x826.png)
*Name the Input property Title*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.07.09-pm-1276x834.png)
*Add an "OnSelectAccept" custom Behavior property*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.05.57-pm-1836x893.png)
*If you are unable to add a Behavior property enable "Enhanced component properties" in the settings dialog.*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.07.42-pm-1268x832.png)
*Add an "OnSelectCancel" custom Behavior property*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.28-pm-1836x941.png)
*Select the IconCancel control and edit the OnSelect property so that selecting the cancel icon will raise the custom OnSelectCancel event*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.44-pm-1836x941.png)
*Select the AppName control and edit the Text property so that the value of the Title property will be copied to the text property of the label.*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.54-pm-1836x949.png)
*Select the IconAccept control and edit the OnSelect property so that selecting the tick icon will raise the new custom OnSelectAccept event*


## Repeat these steps for the BrowseHeader and DetailHeader Components

These custom properties will be added to BrowseHeader:

{Title, OnSelectRefresh, OnSelectNewItem, OnSelectSortUpDown}

These custom properties will be added to DetailHeader:

{Title, OnSelectBack, OnSelectDelete, OnSelectEdit}

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-7.05.52-pm-1758x960.png)
*Publish*