---
title: "AL-Go-PTE"
description: "Extensions"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/al-go-pte/hero.png"
tags: ["docker","devops","ai","business central","dynamics"]
---

![](/assets/images/al-go-pte/dynamics365-color.svg)
*By Microsoft, Public Domain*


You can change Business Central by installing apps that add functionality, change behaviour, or give you access to 3rd party online services.

[AL-Go for GitHub](https://github.com/microsoft/AL-Go) is a set of GitHub templates and actions, which can be used to setup and maintain DevOps processes for your Business Central AL projects

I used [AL-Go for GitHub](https://github.com/microsoft/AL-Go) to [create a Business Central per-tenant extension (PTE) with VS Code](https://github.com/microsoft/AL-Go/blob/main/Scenarios/GetStarted.md).

(Notice that you can upload a Per Tenant Extension (PTE) to Microsoft Dynamics Business Central using the Business Central Extension Management page.)


I used the [AL-Go-PTE](https://github.com/microsoft/AL-Go-PTE) GitHub template repository https://github.com/microsoft/AL-Go-PTE

Prerequisites: A GitHub account, A Windows machine, VS-Code (with AL and PowerShell extensions installed), and Docker installed locally.

![](/assets/images/al-go-pte/screen-shot-2023-08-26-at-9.27.59-am-1836x1062.png)
*Create a new repository using the AL-Go-PTE GitHub template repository*

![](/assets/images/al-go-pte/screen-shot-2023-08-26-at-10.11.22-am-1836x1320.png)
*haddley-al-go-pte*


## Windows laptop

I installed Docker Desktop, Windows Subsystem for Linux, Git, GitHub Desktop, and Visual Studio Code on a Windows 10 laptop.

![](/assets/images/al-go-pte/20230826image01-940x681.png)
*Docker Desktop*

![](/assets/images/al-go-pte/20230826image19-856x376.png)
*Windows Subsystem for Linux*

![](/assets/images/al-go-pte/20230826image14-951x674.png)
*Git*

![](/assets/images/al-go-pte/20230826image05-1061x672.png)
*GitHub Desktop*

![](/assets/images/al-go-pte/20230826image16-1060x671.png)
*Visual Studio Code*

![](/assets/images/al-go-pte/20230826image02-957x658.png)
*I used GitHub Desktop to clone the haddley-al-go-pte repository*

![](/assets/images/al-go-pte/20230826image24-320x519.png)
*I switched Docker to support Windows container (rather than Linux containers)*

Enable-WindowsOptionalFeature -Online -FeatureName containers –All
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V –All

https://stackoverflow.com/questions/57431890/error-response-from-daemon-hcsshimcreatecomputesystem-the-virtual-machine-co

![](/assets/images/al-go-pte/20230826image11-855x251.png)
*I navigated to the .AL-Go folder and ran the localDevEnv.ps1 PowerShell script*

![](/assets/images/al-go-pte/20230826image18-859x720.png)
*I entered a username:admin and password:<password>*

![](/assets/images/al-go-pte/20230826image21-856x718.png)
*Downloading the business central docker image*

![](/assets/images/al-go-pte/20230826image22-856x721.png)
*Creating the docker image*

![](/assets/images/al-go-pte/20230826image23-1270x716.png)
*Docker desktop displays the Business Central image*

![](/assets/images/al-go-pte/20230826image24-1269x719.png)
*Docker desktop displays the Business Central container*

![](/assets/images/al-go-pte/20230826image26-1373x878.png)
*The container is configured*

![](/assets/images/al-go-pte/20230826image27-1265x717.png)
*Laptop folders are available inside the container*

![](/assets/images/al-go-pte/20230826image28-1266x719.png)
*I needed to navigate to http://bcserver/BC/tenant=default*

![](/assets/images/al-go-pte/20230826image29-1162x703.png)
*I re-entered my username:admin and password:<password> (see above)*

![](/assets/images/al-go-pte/20230826image30-1160x705.png)
*Business Central running in the local Docker container*

![](/assets/images/al-go-pte/20230826image31-857x719.png)
*Publishing the hello world extension (the settings are copied to launch.json)*

![](/assets/images/al-go-pte/20230826image32-929x677.png)
*The sample extension has been deployed. Navigating to the customers page triggers the message*

![](/assets/images/al-go-pte/20230826image33-1022x310.png)
*Installing AL Language Extention*

![](/assets/images/al-go-pte/20230826imag34-1365x989.png)
*I updated the trigger's MessageI ran AL: Download Symbols (entering my username:admin and password:<password>); and I clicked the Run | Start Debugging menu item*
## References

- [Getting started with AL Go! for Github and Business Central](https://youtu.be/XoXGbcUxw-c?si=jITPYm9le2NaPhki)