---
title: "SharePoint site designs and site scripts"
description: "A comprehensive guide covering sharepoint site designs and site scripts"
date: "2025-09-20"
category: "Development"
image: "/assets/images/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png"
tags: ["ai"]
---

# SharePoint site designs and site scripts

## SharePoint users and administrators have long appreciated the opportunity to reuse SharePoint "Site Templates".

![](/assets/images/sharepointsitedesignsandsitescripts/1200px-microsoft-office-sharepoint-2018present.svg-1200x1172.png)
*Microsoft Office SharePoint (2018–present) by Microsoft Corporation is licensed under CC*


## Site scripts

Microsoft site scripts allow users and administrators to automate the provisioning of "similar" SharePoint sites.

Site scripts are JSON formatted files. 

Site scripts include "actions" that will modify a SharePoint site. 

Site script actions include:

Add Nav Link
**Apply Theme****Create Content Type****Create Site Column****Create SharePoint List****Install Solution****Join Hub Site****Remove Nav Link****Set Regional Settings****Set Site Branding****Set Site Logo****Set Site External Sharing Capability****Trigger Flow**


## The full schema can be downloaded from here

[https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json](https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json).


## Add-SPOSiteScript

Site scripts are added to a SharePoint tenant using the Add-SPOSiteScript command

![](/assets/images/sharepointsitedesignsandsitescripts/image-6-979x512.png)
*Connect to the SharePoint administration site*

![](/assets/images/sharepointsitedesignsandsitescripts/image-17-979x512.png)
*Load the JSON text into a variable*


## Add-SPOSiteDesign

Site designs can extend the SharePoint modern team site template(64) or the SharePoint modern communication site template (68).

Site designs are added to a SharePoint tenant using the ADD-SPOSiteDesign command (specifying one or more Site Script ids)

![](/assets/images/sharepointsitedesignsandsitescripts/image-10-979x512.png)
*Add the Site Script and add the Site Design*


## SharePoint Create a Site

Once the Site design has been created the out of the box "Create a Site" user experience will be updated

![](/assets/images/sharepointsitedesignsandsitescripts/image-11-1366x728.png)
*Select "Team Site" because the new Site Design is based on the team site template(64)*

![](/assets/images/sharepointsitedesignsandsitescripts/image-12-1366x728.png)
*The "Contoso customer tracking" Site Design is available in the "Choose a design" drop down list.*

![](/assets/images/sharepointsitedesignsandsitescripts/image-14-1366x728.png)
*Click the Finish button to create the new Site and to run the Site Scripts*

![](/assets/images/sharepointsitedesignsandsitescripts/image-16-1366x728.png)
*The newly created site includes the "Customer Tracking" list*


## Applying a site design to an existing site

The Get-SPOSiteDesign command can be used to list the installed Site designs (and the ids assigned).

Site designs can be applied to an existing SharePoint site using the Invoke-SPOSiteDesign command.

![](/assets/images/sharepointsitedesignsandsitescripts/image-20-1057x674.png)
*Site contents before invoking site design*

![](/assets/images/sharepointsitedesignsandsitescripts/image-19-979x512.png)
*Invoke-SPOSiteDesign*

![](/assets/images/sharepointsitedesignsandsitescripts/image-21-1057x674.png)
*Site contents after invoking site design*


## Get-SPOSiteScriptFromWeb

The Get-SPOSiteScriptFromWeb command extracts Site Script from an existing SharePoint site.

![](/assets/images/sharepointsitedesignsandsitescripts/image-22-979x512.png)
*Running the Get-SPOSiteScriptFromWeb command*
