---
title: "Microsoft 365 command line interface"
description: "Manage Microsoft 365 tenants and SharePoint Framework projects"
date: "2021-02-22"
categories: ["Microsoft 365"]
tags: ""
hidden: false
slug: "m365commandlineinterface"
image: "/assets/images/m365commandlineinterface/office-365-icon-500x500.png"
---


## m365

Why not use the supported [docker](/posts/docker/) image?

```bash
$ docker run --rm -it m365pnp/cli-microsoft365
```

In the context of the docker image I used the m365 command to login to a Microsoft Office 365 tenant, create a SharePoint Site, and apply a [Site Design](/posts/sharepointsitedesignsandsitescripts/).

I used these commands to login to Microsoft 365, create a SharePoint Site, review the registered site designs and apply one of the site designs to the newly created site (adding a ToDo list):

```bash
~$ m365 login
~$ m365 spo site add --alias todoSite --title "Site with To Do"
~$ m365 spo sitedesign list
~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/todoSite --id 789673f0-178d-4c9a-913c-e3187b7e2f13
```

![Docker image](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-4.33.38-pm-1134x740.png)
*I used Docker*

![Login](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.00.26-pm-1136x736.png)
*I ran m365 login*

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-4.08.39-pm-1424x1118.png)
*I logged in successfully*

![Add Site](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.29.56-pm-1136x740.png)
*I added a site*

![Apply Site Design](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-6.31.57-pm-1126x736.png)
*I applied a Site Design*

![Site with To Do List](/assets/images/m365commandlineinterface/screen-shot-2021-02-22-at-7.15.43-pm-1836x1075.png)
*I created a new Site with To Do List*

I used these commands to login to Microsoft 365, create a Teams Team, apply a site design to the newly created Teams/SharePoint sites (adding a ToDo list) and add a channel to the Teams Team:

```bash
~$ m365 login
~$ m365 teams team add --name "TeamToDo" --description "Team with Site with To Do" --wait
~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/TeamToDo --id 789673f0-178d-4c9a-913c-e3187b7e2f13
~$ m365 teams channel add --teamName "TeamToDo" --name "Channel" --description "Custom Channel"
```

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-5.06.00-pm-1487x828.png)
*I created a Teams Site*

![](/assets/images/m365commandlineinterface/screen-shot-2022-05-01-at-5.11.22-pm-1487x789.png)
*I created a SharePoint Site with channels*
