---
title: "Microsoft 365 command line interface"
description: "A comprehensive guide covering microsoft 365 command line interface"
date: "2025-09-20"
category: "Development"
image: "/assets/images/m365commandlineinterface.png"
tags: ["docker","ai","git","github"]
---

# Microsoft 365 command line interface

A Command Line Interface for Microsoft 365 Manage Microsoft 365 tenants and SharePoint Framework projects using m365. https://pnp.github.io/cli-microsoft365/ Microsoft_Office_logo by Microsoft is licensed under CC m365 Why not use the supported docker image? $ docker run --rm -it m365pnp/cli-microsoft365 In the context of the docker image we use the m365 command to: login to a Microsoft Office 365 tenant create a SharePoint Site; and apply a Site Design . I used these commands: ~$ m365 login ~$ m365 spo site add --alias todoSite --title "Site with To Do" ~$ m365 spo sitedesign list ~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/todoSite --id 789673f0-178d-4c9a-913c-e3187b7e2f13 To login to Microsoft 365, to create a SharePoint Site, to review the registered site designs and to apply one of the site designs to the newly created sites (adding a ToDo list). Using Docker m365 login Login successful Site add Apply Site Design *New* Site with To Do List I used these commands: ~$ m365 login ~$ m365 teams team add --name "TeamToDo" --description "Team with Site with To Do" --wait ~$ m365 spo sitedesign apply --webUrl https://haddleyoffice365.sharepoint.com/sites/TeamToDo --id 789673f0-178d-4c9a-913c-e3187b7e2f13 ~$ m365 teams channel add --teamName "TeamToDo" --name "Channel" --description "Custom Channel" To login to Microsoft 365, to create a Teams Team, to apply a site design to the newly created Teams/SharePoint sites (adding a ToDo list) and to add a channel to the Teams Team. Teams Site created SharePoint Site created (with channels) Docker Hub
