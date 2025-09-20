---
title: "SharePoint Web Part (Part 2)"
description: "A comprehensive guide covering sharepoint web part (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
tags: ["react","javascript","java","ai","ml"]
---

# SharePoint Web Part (Part 2)

## How to create and publish a SharePoint Web Part (Part 2)

![](/assets/images/sharepointwebpart2/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png)
*Microsoft Office SharePoint (2018–present) by Microsoft Corporation is licensed under CC*


## Adding the big calendar

npm is the package manager for the Node JavaScript platform. 

The npmjs web site is a repository of reusable software components.

react-big-calendar is an events calendar  component built for React.

[https://www.npmjs.com/package/react-big-calendar](https://www.npmjs.com/package/react-big-calendar)

To add the react-big-calendar component to our SharePoint Web Part solution we run this command:

$ npm i react-big-calendar


## Update the Calendar Function Component

This is how to update the Web Part's Calendar Component to include react-big-calendar.

Notice that we are again using React's [useEffect and useState hooks](reactusestateuseeffect.html).


## Pnp react-calendar sample

SharePoint provides a [REST API](restapiservice.html).

The [pnp react-calendar sample project](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-calendar) uses an "sp-services" class to hold all of the code needed to fetch Calendar list items from the SharePoint site via SharePoint's REST API.

We can use the same approach:


## workbench.aspx

The code above assumes that your SharePoint site has a Calendar list named "Calendar".

The Local Workbench used for Web Part testing does not have a Calendar list, so to test the Web Part we need to navigate to the workbench page in a SharePoint site that does have a Calendar list (eg. https://haddleyoffice365.sharepoint.com/sites/AllStaff/_layouts/15/workbench.aspx).

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.53.35-pm-1900x1357.png)
*Example Team Site Calendar with sample events*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.56.27-pm-1900x1357.png)
*Calendar Web Part icon in /layouts/15/workbench.aspx page*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-2.56.52-pm-1900x1213.png)
*Calendar Web Part running in /layouts/15/workbench.aspx page displaying sample events*


## Packaging and deploying

These commands can be used to create a .sppkg package

gulp clean
gulp bundle --ship
gulp package-solution --ship

The Web Part can then be deployed by copying the .sppkg package to the SharePoint tenant's app catalog site.

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.12.16-pm-1900x1209.png)
*Copying the .sppkg package to the SharePoint app catalog*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.13.38-pm-1900x1213.png)
*Adding the Calendar Web Part to a Sharepoint page*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.13.52-pm-1900x1215.png)
*An opportunity to set the Calendar Web Part properties*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.14.12-pm-1900x1208.png)
*The Calendar Web Part running in the SharePoint page (in Month mode)*

![](/assets/images/sharepointwebpart2/screen-shot-2021-02-14-at-3.14.29-pm-1900x1213.png)
*The Calendar Web Part running in the SharePoint page (in Agenda mode)*

![](/assets/images/sharepointwebpart2/image0-1242x2208.png)
*The Calendar Web Part running in the iOS SharePoint app (in Month mode)*

![](/assets/images/sharepointwebpart2/image0-2-1242x2208.png)
*The Calendar Web Part running in the iOS SharePoint app (in Agenda mode)*
