---
title: "Microsoft Graph"
description: "Graph Explorer"
date: "2022-05-26"
categories: ["Microsoft 365"]
tags: ""
slug: "microsoftgraph"
image: "/assets/images/office-365-icon-500x500.png"
---



[Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) is a REST API that can be used to access: Microsoft 365, Azure Active Directory, Windows and Dynamics 365.

[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) is a developer tool that allows a developer to make Microsoft Graph REST API requests and view corresponding responses.

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.26.35-am-1235x617.png)
*Here I am using the Graph Explorer without signing in to my Active Directory account (using a sample account)*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.29.31-am-485x209.png)
*Here I am signing into my Microsoft 365 E5 developer subscription pre-provisioned with Microsoft 365 apps*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.29.46-am-485x189.png)
*Here I am entering my password*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.30.14-am-484x195.png)
*I am required to approve the sign in request using my mobile phone (two factor authentication)*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.30.49-am-1234x619.png)
*I can retrieve my profile details using a "/me/" request. GET my profile - https://graph.microsoft.com/v1.0/me/*


## Graph Explorer permissions

Before the Graph Explorer is able to retrieve email messages using Microsoft Graph the user (or an administrator) has to provide consent. The user is agreeing that the client application (Graph Explorer in this case) can access parts of the Microsoft Graph on their behalf.

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.31.38-am-1234x618.png)
*access denied - https://graph.microsoft.com/v1.0/me/messages*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.33.13-am-1400x657.png)
*Here the administrator grants this application (Graph Explorer) permission to access a user's email messages (on that user's behalf).*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.33.49-am-1400x655.png)
*GET my mail - https://graph.microsoft.com/v1.0/me/messages*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.34.16-am-1401x656.png)
*A second consent is needed to allow this application (Graph Explorer) to access a user's One drive and SharePoint online files (on that user's behalf) - https://graph.microsoft.com/v1.0/me/drive/root/children*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.36.19-am-1401x657.png)
*Here the administrator grants this application (Graph Explorer) permission to access the user's (One drive and SharePoint online) files*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-6.18.08-pm-1401x792.png)
*GET all the items in my (one) drive (root folder) - https://graph.microsoft.com/v1.0/me/drive/root/children*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-9.40.21-am-1401x656.png)
*At this time there were no files in my one drive's root folder*


## Teams/SharePoint Online/One Drive files

Microsoft Teams channels include a "Files" tab.

Files uploaded to the Team's channel are stored in SharePoint Online.

All files uploaded to all public channels are stored in a shared Document Library in a Team specific SharePoint Online Site (Site Collection).

This SharePoint online Document Library can also be accessed using the One Drive application.

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.04.41-am-1399x654.png)
*The Mark 8 Project Team's Team includes a General and a Design channel.*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.05.14-am-1398x653.png)
*The Design channel's files can be accessed without leaving the Teams application. The Design channel's files can also be accessed using the SharePoint user interface (using the "Open in SharePoint" menu item)*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.05.42-am-1400x578.png)
*In the SharePoint user interface it is clear that the Design channel's files are stored a the "Design" Folder in the shared "Documents" Document Library in the "Mark 8 Project Team" SharePoint site*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.06.40-am-1400x574.png)
*The "Documents" Document Library in the "Mark 8 Project Team" site can also be accessed using the One Drive user interface.*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-6.52.10-pm-1398x792.png)
*The One Drive user interface can be used to show that there is a second "Confidential" Document Library in the "Mark 8 Project Team" Site.*


## Using Microsoft Graph to access Teams/SharePoint Online/One Drive files

Graph explorer can be used to access [Teams/SharePoint Online/One Drive files](https://docs.microsoft.com/en-us/graph/api/driveitem-list-children?view=graph-rest-1.0&tabs=http)

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.20.13-am-1399x618.png)
*GET SharePoint site based on relative path to (the "Mark8Project") site - https://graph.microsoft.com/v1.0/sites/{host-name}:/{server-relative-path} - https://graph.microsoft.com/v1.0/sites/p8lf.sharepoint.com:/sites/Mark8ProjectTeam*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.22.54-am-1397x617.png)
*GET enumerate the document libraries under the (the "Mark8Project") site - https://graph.microsoft.com/v1.0/sites/{siteid}/drives - https://graph.microsoft.com/v1.0/sites/p8lf.sharepoint.com,93621faf-8562-41e0-ac8c-13117ad3494a,c62f05b5-b3b9-45af-9935-0d5adca1a908/drives*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.31.55-am-1401x618.png)
*GET all the items in specified drive - https://graph.microsoft.com/v1.0/drives/{driveid}/root/children -https://graph.microsoft.com/v1.0/drives/b!rx9ik2KF4EGsjBMRetNJSrUFL8a5s69FmTUNWtyhqQioATjXxIu7Q6WHB3PuAtBi/root/children*

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-7.47.54-pm-1397x793.png)
*GET all the items in specified folder in the specified drive - https://graph.microsoft.com/v1.0/drives/{driveid}/items/{folderid}/childrenhttps://graph.microsoft.com/v1.0/drives/b!rx9ik2KF4EGsjBMRetNJSrUFL8a5s69FmTUNWtyhqQioATjXxIu7Q6WHB3PuAtBi/items/0165QRNMIDD63SJ6RBTFHZY2G4LDYN6K7M/children*


## Items trending around me

M365 is able to keep track of documents a user has recently accessed.

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.14.25-am-1396x576.png)
*recently accessed*


## Items trending

Items trending around me can also be accessed using Microsoft Graph.

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.15.34-am-1398x618.png)
*GET items trending around me - https://graph.microsoft.com/beta/me/insights/trending*


## Code snippets

Graph Explorer is also able to provide sample JavaScript code that could be used to access Microsoft Graph

![](/assets/images/microsoftgraph/screen-shot-2022-05-26-at-10.39.30-am-1399x733.png)
*Sample JavaScipt code*