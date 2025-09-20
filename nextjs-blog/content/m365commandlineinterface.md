---
title: "Microsoft 365 command line interface"
description: "A comprehensive guide covering microsoft 365 command line interface"
date: "2025-09-20"
category: "Development"
image: "/assets/images/office-365-icon-500x500.png"
tags: ["docker","ai","ml","git","github"]
---

# Microsoft 365 command line interface

## Manage Microsoft 365 tenants and SharePoint Framework projects using m365.https://pnp.github.io/cli-microsoft365/

![](/assets/images/m365commandlineinterface/office-365-icon-500x500.png)
*Microsoft_Office_logo by Microsoft is licensed under CC*


## m365

Why not use the supported [docker](dockerandubernetes.html) image?

$ docker run --rm -it m365pnp/cli-microsoft365

In the context of the docker image we use the m365 command to:

**login to a Microsoft Office 365 tenant****create a SharePoint Site; and****apply a [Site Design](sharepointsitedesignsandsitescripts.html).**

I used these commands:

~$ m365 login
~$ m365 spo site add --alias todoSite --title "Site with To Do"
~$ m365 spo sitedesign list
~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/todoSite --id 789673f0-178d-4c9a-913c-e3187b7e2f13

To login to Microsoft 365, to create a SharePoint Site, to review the registered site designs and to apply one of the site designs to the newly created sites (adding a ToDo list).

![Docker image](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-4.33.38-pm-1134x740.png)
*Using Docker*

![Login](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.00.26-pm-1136x736.png)
*m365 login*

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-4.08.39-pm-1424x1118.png)
*Login successful*

![Add Site](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.29.56-pm-1136x740.png)
*Site add*

![Apply Site Design](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.31.57-pm-1126x736.png)
*Apply Site Design*

![Site with To Do List](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-7.15.43-pm-1836x1075.png)
**New* Site with To Do List*

I used these commands:

~$ m365 login
~$ m365 teams team add --name "TeamToDo" --description "Team with Site with To Do" --wait
~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/TeamToDo --id 789673f0-178d-4c9a-913c-e3187b7e2f13
~$ m365 teams channel add --teamName "TeamToDo" --name "Channel" --description "Custom Channel"

To login to Microsoft 365, to create a Teams Team, to apply a site design to the newly created Teams/SharePoint sites (adding a ToDo list) and to add a channel to the Teams Team.

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-5.06.00-pm-1487x828.png)
*Teams Site created*

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-5.11.22-pm-1487x789.png)
*SharePoint Site created (with channels)*
