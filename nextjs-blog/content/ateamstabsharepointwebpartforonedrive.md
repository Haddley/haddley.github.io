---
title: "A Teams App SharePoint Web Part for One Drive"
description: "A comprehensive guide covering a teams app sharepoint web part for one drive"
date: "2025-09-20"
category: "Development"
image: "/assets/images/office-365-icon-500x500.png"
tags: ["react","ml","git","github"]
---

# A Teams App SharePoint Web Part for One Drive

## Using SPFx and the Graph Toolkit

![](/assets/images/ateamstabsharepointwebpartforonedrive/office-365-icon-500x500.png)
*Microsoft_Office_logo by Microsoft is licensed under CC*


## The SharePoint Framework (SPFx) can be used to create SharePoint Web Parts and Teams Applications

In this post I describe how I created a Teams application using the SharePoint Framework and the Microsoft Graph Toolkit

This post is based on PiaSys Tech Bites's [Using Microsoft Graph Toolkit with React](https://www.youtube.com/watch?v=5ZsD2uHVpz4) video, Microsoft 365 Community's [Building Microsoft Graph Toolkit apps with SharePoint](https://www.youtube.com/watch?v=PTWXRuPbSEw) video, and Microsoft's [Working with files in Microsoft Graph](https://docs.microsoft.com/en-us/graph/api/resources/onedrive?view=graph-rest-1.0) documentation.


## SharePoint Apps

SharePoint Framework (SPFx) applications are deployed to Microsoft 365 when they are uploaded to the [SharePoint online App catalog](sharepointwebpart2.html).

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.34.20-pm-1836x837.png)
*Navigate to the SharePoint admin center and click the "More features" link*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.19-pm-1836x839.png)
*Scroll down to the "Apps" section and click the "Open" link*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.27-pm-1836x832.png)
*If the "App Catalog" Site (Site Collection) does not exist it is created*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.47-pm-1836x842.png)
*A welcome message may be displayed*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.38.02-pm-1836x839.png)
*App Catalog's Manage apps page*


## yo @microsoft/sharepoint

I used "yo @microsoft/sharepoint" to create a haddley-file-list project.

I used "npm i @microsoft/mgt-spfx@2.5.1" to add Microsoft Graph Toolkit to the project.

I used "npm i @microsoft/mgt-react@2.5.1" to add Microsoft Graph Toolkit's React components to the project.

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.21.51-pm-1836x1000.png)
*yo @microsoft/sharepoint*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.24.19-pm-1836x1000.png)
*npm i @microsoft/mgt-spfx@2.5.1 @microsoft/mgt-react@2.5.1*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.25.08-pm-1836x1038.png)
*I updated serve.json to specify how the workbench would be loaded*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.27.28-pm-1836x1040.png)
*The workbench will be loaded in the context of the Mark8ProjectTeam Site*


## gulp

I used "gulp trust-dev-cert" to ensure that gulp would serve content using https

I used "gulp bundle && gulp serve" to preview the application in the workbench

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.28.17-pm-1836x1038.png)
*gulp serve to preview*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.29.18-pm-1836x805.png)
*Previewing the web part in the workbench*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.31.35-pm-1836x1035.png)
*I updated the SPFx Web Part code to add a global provider (constructed using the Web Part's context object)*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.38.53-am-1258x619.png)
*I added permission requests to package-solution.json*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.43.31-am-1255x617.png)
*I updated the Web Part's React code*


## Deployment

I used "gulp bundle --ship && gulp package-solution --ship" to create an .sppkg file (package).

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.48.51-am-1836x957.png)
*gulp bundle --ship && gulp package-solution --ship*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.04.55-am-1401x787.png)
*I navigated to the App catalog manage apps page*


## mgt-spfx-252.sppkg

At runtime (at least in Teams) the web part depends on a shared SharePoint app "mgt-spfx-XXX.sppkg".

https://github.com/microsoftgraph/microsoft-graph-toolkit/releases

I added this shared application to the App Catalog.

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.22.33-am-1183x745.png)
*I downloaded the mgt-spfx-2.5.2.sppkg file (package) from https://github.com/microsoftgraph/microsoft-graph-toolkit/releases. I uploaded the mgt-spfx-2.5.2.sppkg file (package) to the App catalog.*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.06.04-am-1399x783.png)
*I upload the project's haddley-file-list.sppkg file (package) to the App catalog*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.37.53-pm-1836x1103.png)
*I enabled the app and selected the enable this app and add to all sites option*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.38.08-pm-1836x1105.png)
*I navigated to the API access page*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.38.39-pm-1836x1104.png)
*I approved the permission requests*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.06.57-am-1395x785.png)
*As a test I added the web part to a SharePoint page*


## Adding to teams

The HaddleyListWebPart manifest suggests that the web part will work as a Teams App.

I did not need to update this file

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.13.43-am-1836x904.png)
*HaddleyListWebPart.manifest.json*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.07.16-am-449x303.png)
*I used the "Add to Teams" button in the App catalog to add the Web Part to Teams*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.09.26-am-1403x780.png)
*With no additional effort the web part was shown as a Published app in the Teams admin center*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.10.03-am-1401x787.png)
*The web part was also shown in the Teams desktop application*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.10.15-am-1397x781.png)
*I used the Add button to add the web part to Teams*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.24.10-am-1400x786.png)
*Here is the code running in Teams*
