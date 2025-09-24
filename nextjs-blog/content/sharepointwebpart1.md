---
title: "SharePoint Web Part (Part 1)"
description: "A comprehensive guide covering sharepoint web part (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/sharepointwebpart1/hero.png"
tags: ["react","typescript","ai","ml","testing"]
---

## How to create and publish a SharePoint Web Part (Part 1)

![](/assets/images/sharepointwebpart1/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png)
*Microsoft Office SharePoint (2018–present) by Microsoft Corporation is licensed under CC*


## SharePoint Web Parts Extend the Office 365 User Experience

Microsoft SharePoint, Microsoft Teams and Microsoft Outlook can be extended using the SharePoint Framework (SPFx). 

The SharePoint Framework is a page and web part model for client-side development.

The SharePoint Framework depends on TypeScript and front end libraries such as React.

Once a SharePoint Framework solution has been deployed users are able to add the new Web Parts to SharePoint Pages.

The Yeoman "yo" command can be used to create Web Part solutions.

![yo @microsof/sharepoint](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-10.38.21-am-1836x1378.png)
*yo @microsoft/sharepoint*


## Sample React Code

The React component code below is provided as a starting point.

![Web Part React Component](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-11.35.33-am-1836x1299.png)
*Web Part React Component*


## Local Workbench

A developer can test their Web Part by running "gulp serve".

When the gulp serve command is run their Web Parts are available in the local workbench.

![SharePoint Workbench](/assets/images/sharepointwebpart1/screen-shot-2021-02-12-at-10.40.53-am-1764x1264.png)
*SharePoint Workbench*


## pageContext

A SharePoint Web Part can do interesting things if it has "context".

In this example the ICalendarProps interface is used to pass values from the CalendarWebPart instance to the Calendar React component. 

So we add a context property of type WebPartContext to the ICalendarProps interface and update the CalendarWebPart's render method to pass "this.context" from the CalendarWebPart instance to the Calendar component.

Running "gulp serve" again allows us to test the result in the "Local Workbench" or to test the result in a SharePoint site using the /_layouts/15/workbench.aspx page.

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

Before doing additional work on the Calendar component we can reimplement the Calendar React component as a function component. 

Reimplementing the Calendar component as a function component makes the Calendar component code easier to read.

If the Calendar component needs to maintain state we can take advantage of [React useState and useEffect hooks](reactusestateuseeffect.html).

![React FunctionComponent](/assets/images/sharepointwebpart1/screen-shot-2021-02-13-at-10.10.01-am-1836x1299.png)
*Calendar component as a function component*
