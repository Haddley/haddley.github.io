---
title: "A Power Apps Application"
description: "Power Apps Application."
date: "2021-07-14"
categories: ["Power Platform","React","AI","Angular","Mobile","TypeScript"]
tags: ""
slug: "powerappsapplication"
image: "/assets/images/office-365-icon-500x500.png"
---


## New app

Navigate to [https://make.powerapps.com/](https://make.powerapps.com/)

Select the "Apps" menu item and select the "Apps" tab.

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.14.52-pm-1292x340.png)
*+ New app | Canvas*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.18.39-pm-698x316.png)
*Blank app | Phone layout*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.19.43-pm-1836x945.png)
*Blank app App with Screen "Screen1"*


## Screens

Add three extra Blank screens and rename the four screens {BrowseScreen, DetailScreen, EditScreen and NewScreen}

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.23.34-pm-960x384.png)
*New Screen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.24.06-pm-1448x680.png)
*Three additional screens added*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.25.13-pm-1432x646.png)
*All four screens renamed*


## Import Component Library

Select the + menu item and click the "Get more components" button

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.27.07-pm-1460x772.png)
*Get more components*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.28.21-pm-1836x1056.png)
*Import custom components from the Headers component library*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.29.17-pm-1836x1053.png)
*Add a BrowseHeader component to the BrowseScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.30.27-pm-1836x1050.png)
*Add a DetailHeader component to the DetailScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.31.38-pm-1836x1047.png)
*Add a EditHeader component to the EditScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.32.49-pm-1836x1056.png)
*Add a EditHeader component to the NewScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.33.55-pm-1836x1054.png)
*Set the "Title" property the Header component in each Screen to "Parent.Name"*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.36.07-pm-1836x1051.png)
*Every Header component is now displaying the name of the screen it is on.*


## Handle the custom OnSelect events

Update all of the custom OnSelect events so that a user can navigate between the Screens

BrowseScreen | BrowseHeader_1
OnSelectRefresh = 
OnSelectNewItem = Navigate(NewScreen)
OnSelectSortUpDown = Set(varSortDescending,!varSortDescending)

DetailScreen | DetailHeader_1
OnSelectBack = Navigate(BrowseScreen)
OnSelectDelete = Navigate(BrowseScreen)
OnSelectEdit = Navigate(EditScreen)

EditScreen | EditHeader_1
OnSelectAccept = Navigate(BrowseScreen)
OnSelectCancel = Navigate(BrowseScreen)

NewScreen| EditHeader_2
OnSelectAccept = Navigate(BrowseScreen)
OnSelectCancel = Navigate(BrowseScreen)

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.56.15-pm-1836x391.png)
*esp8266*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.56.52-pm-928x312.png)
*Preview the app*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.57.59-pm-1836x1055.png)
*Click on the + icon*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-7.58.07-pm-1836x1056.png)
*Click on the X or the tick to return to the BrowseScreen*


## Adding connection to API

Select the database menu item and click the "Add data" button

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-8.04.33-pm-1632x792.png)
*Add data*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-8.05.13-pm-1404x730.png)
*Select the Books Custom Connector*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-8.12.59-pm-838x330.png)
*Add a Vertical gallery control to the BrowseScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-8.48.24-pm-1836x1051.png)
*At this point the Gallery has no Data source. The Items property is set to "CustomGallerySample"*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.00.14-pm-1836x1053.png)
*BrowseHeader_1 | OnSelectRefresh = ClearCollect(colBooks,haddley_power_app_api.BookGET())*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.03.14-pm-1836x1111.png)
*Sample data is displayed in the gallery. Click the refresh button to update the colBooks collection*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.02.39-pm-1836x1049.png)
*Select the Collections menu item to view the colBooks collection*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.04.01-pm-1836x1048.png)
*Update the gallery's datasource to colBooks*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.04.16-pm-1836x1051.png)
*colBooks items are displayed*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.04.42-pm-1836x1048.png)
*Update the layout*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.07.23-pm-1836x1048.png)
*Gallery1 | OnSelect = Navigate(DetailScreen)*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.26.12-pm-1836x1049.png)
*Add four Text labels to the DetailsScreen*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.29.19-pm-1836x1048.png)
*Gallery1.Selected.id*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.31.04-pm-1836x1051.png)
*Gallery1.Selected.title*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.33.21-pm-1836x1052.png)
*haddley_power_app_api.BookByIdDELETE(Gallery1.Selected.id);Navigate(BrowseScreen)*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.37.02-pm-1836x1052.png)
*TextInput3 | Default = Gallery1.Selected.title*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.39.20-pm-1836x1051.png)
*EditHeader_1 | OnSelectAccept = haddley_power_app_api.BookByIdPUT(Gallery1.Selected.id,{title:TextInput3.Text});Navigate(BrowseScreen)*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.45.49-pm-1836x1048.png)
*EditHeader_2 | OnSelectAccept = haddley_power_app_api.BookPOST({id:TextInput4.Text,title:TextInput3_1.Text});Navigate(BrowseScreen)*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.54.51-pm-1836x1049.png)
*NewScreen | OnVisible = UpdateContext({resetText: true});UpdateContext({resetText: false})*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-10.57.01-pm-1836x1053.png)
*BrowseScreen | OnVisible = ClearCollect(colBooks,haddley_power_app_api.BookGET())*


## Summary

Here is a summary of the application screen and control settings

BrowseScreen | OnVisible = ClearCollect(colBooks,haddley_power_app_api.BookGET())

BrowseScreen | Gallery1 | Items = Sort(colBooks,title,If(varSortDescending,Descending,Ascending))

BrowseScreen | BrowseHeader_1
OnSelectRefresh = ClearCollect(colBooks,haddley_power_app_api.BookGET())
OnSelectNewItem = Navigate(NewScreen)
OnSelectSortUpDown = Set(varSortDescending,!varSortDescending)

DetailScreen | label5 | Text = Gallery1.Selected.title
DetailScreen | label3 | Text = Gallery1.Selected.id

DetailScreen | DetailHeader_1
OnSelectBack = Navigate(BrowseScreen)
OnSelectDelete = haddley_power_app_api.BookByIdDELETE(Gallery1.Selected.id);Navigate(BrowseScreen)
OnSelectEdit = Navigate(EditScreen)

EditScreen | TextInput3 | Default = Gallery1.Selected.title

EditScreen | EditHeader_1
OnSelectAccept = haddley_power_app_api.BookByIdPUT(Gallery1.Selected.id,{title:TextInput3.Text});Navigate(BrowseScreen)
OnSelectCancel = Navigate(BrowseScreen);

NewScreen | OnVisible = Reset(TextInput4);Reset(TextInput3_1);

UpdateContext({resetText: true});UpdateContext({resetText: false})

New Screen | OnVisible = UpdateContext({resettext: !resettext});UpdateContext({resettext: !resettext})

New Screen | TextInput4 | Default = ""
New Screen | TextInput4 | Reset = resettext

New Screen | TextInput3_1 | Default = ""
New Screen | TextInput3_1 | Reset = resettext

NewScreen | EditHeader_2
OnSelectAccept = haddley_power_app_api.BookPOST({id:TextInput4.Text,title:TextInput3_1.Text});Navigate(BrowseScreen)
OnSelectCancel = Navigate(BrowseScreen);

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.12.49-pm-1836x1112.png)
*Two items returned by API*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.13.03-pm-1836x1048.png)
*Details of first item. Delete button clicked.*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.13.17-pm-1836x1051.png)
*Only second item remains*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.13.28-pm-1836x1050.png)
*Details of second item*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.13.50-pm-1836x1046.png)
*Editing second item's title*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.14.01-pm-1836x1044.png)
*Second item's title has been updated*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.16.30-pm-1836x1049.png)
*Adding a new item*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.41.31-pm-1836x1049.png)
*New item added*

![](/assets/images/powerappsapplication/screen-shot-2021-07-13-at-11.41.40-pm-1836x1119.png)
*Text values reset*