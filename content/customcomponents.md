---
title: "Power Apps Custom Components"
description: "Create reusable Power Apps Components."
date: "2021-07-13"
categories: ["Power Platform"]
tags: ""
hidden: false
slug: "customcomponents"
image: "/assets/images/customcomponents/office-365-icon-500x500.png"
---

## New component library

I navigated to [https://make.powerapps.com/](https://make.powerapps.com/)

I selected the "Apps" menu item and selected the "Component libraries" tab.

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.57.27-pm-1270x508.png)
*I clicked the + New component library button*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.58.34-pm-1820x1124.png)
*I named the library*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.59.41-pm-978x370.png)
*I renamed the sample component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-5.59.50-pm-802x286.png)
*I named the component "EditHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.07-pm-452x134.png)
*I added a second component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.18-pm-1058x450.png)
*I renamed the second component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.29-pm-610x118.png)
*I named the second component "BrowseHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.48-pm-982x566.png)
*I added a third component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.00.58-pm-678x142.png)
*I renamed the third component "DetailHeader"*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.01.19-pm-698x240.png)
*I set the height of all three components from 640 to 88*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.02.46-pm-672x272.png)
*I added a custom property to the EditHeader component*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.03.50-pm-1272x826.png)
*I named the Input property Title*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.07.09-pm-1276x834.png)
*I added an "OnSelectAccept" custom Behavior property*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.05.57-pm-1836x893.png)
*I enabled "Enhanced component properties" in the settings dialog*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.07.42-pm-1268x832.png)
*I added an "OnSelectCancel" custom Behavior property*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.28-pm-1836x941.png)
*I selected the IconCancel control and edited the OnSelect property so that selecting the cancel icon raises the custom OnSelectCancel event*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.44-pm-1836x941.png)
*I selected the AppName control and edited the Text property so that the value of the Title property is copied to the label text*

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-6.08.54-pm-1836x949.png)
*I selected the IconAccept control and edited the OnSelect property so that selecting the tick icon raises the OnSelectAccept event*


## Repeat these steps for the BrowseHeader and DetailHeader Components

I added these custom properties to BrowseHeader:

{Title, OnSelectRefresh, OnSelectNewItem, OnSelectSortUpDown}

I added these custom properties to DetailHeader:

{Title, OnSelectBack, OnSelectDelete, OnSelectEdit}

![](/assets/images/customcomponents/screen-shot-2021-07-13-at-7.05.52-pm-1758x960.png)
*I published the component library*
