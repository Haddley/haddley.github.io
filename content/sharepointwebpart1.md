---
title: "SharePoint Web Part (Part 1)"
description: "How to create and publish a SharePoint Web Part"
date: "2021-02-11"
categories: ["Microsoft 365"]
tags: "sharepoint-framework, spfx, web-part, react"
slug: "sharepointwebpart1"
image: "/assets/images/sharepointwebpart1/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
---



## SharePoint Web Parts Extend the Office 365 User Experience

I used the SharePoint Framework (SPFx) to build a web part for Microsoft SharePoint, Microsoft Teams, and Microsoft Outlook.

The SharePoint Framework is a page and web part model for client-side development that depends on TypeScript and front-end libraries such as React.

Once deployed, users can add the new web parts to SharePoint pages.

I used the Yeoman "yo" command to create the web part solution.

![yo @microsof/sharepoint](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-10.38.21-am-1836x1378.png)
*yo @microsoft/sharepoint*


## Sample React Code

Yeoman provided a React component as a starting point.

![Web Part React Component](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-11.35.33-am-1836x1299.png)
*Web Part React Component*


## Local Workbench

I tested the web part by running "gulp serve".

When I ran gulp serve, the web parts were available in the local workbench.

![SharePoint Workbench](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-10.40.53-am-1764x1264.png)
*SharePoint Workbench*


## pageContext

A SharePoint Web Part can do interesting things if it has "context".

I used the ICalendarProps interface to pass values from the CalendarWebPart instance to the Calendar React component.

I added a context property of type WebPartContext to the ICalendarProps interface and updated the CalendarWebPart's render method to pass "this.context" to the Calendar component.

I ran "gulp serve" again to test the result in the Local Workbench and on a SharePoint site using the /_layouts/15/workbench.aspx page.

![](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-1.43.01-pm-1900x1342.png)
*Adding context:WebPartContext to ICalendarProps interface*

![](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-1.43.32-pm-1900x1343.png)
*Updating CalendarWebPart to pass context to Calendar React Component*

![](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-1.43.55-pm-1900x1346.png)
*Updating Calendar React Component to use context*

![](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-1.40.17-pm-1754x1266.png)
*Testing the Web Part using the Local Workbench*

![](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-1.47.37-pm-1750x1260.png)
*Testing the Web Part using the /_layouts/15/workbench.aspx SharePoint page*


## TypeScript and React

The generated CalendarWebPart class extends the Microsoft BaseClientSideWebPart class.

The generated Calendar class extends the React.Component class.

The CalendarWebPart class manages state and the Calendar class has state passed to it via props.

I reimplemented the Calendar React component as a function component, which made the code easier to read.

If the Calendar component needs to maintain state, I can use [React useState and useEffect hooks](/posts/reactusestateuseeffect/).

![React FunctionComponent](/assets/images/sharepointwebpart1/screen-shot-2021-02-13-at-10.10.01-am-1836x1299.png)
*Calendar component as a function component*