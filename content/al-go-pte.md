---
title: "AL-Go-PTE"
description: "Extensions"
date: "2023-08-26"
categories: ["Microsoft Dynamics","Business Central","DevOps"]
tags: "al-go, extensions, github-actions, ci-cd"
hidden: false
slug: "al-go-pte"
image: "/assets/images/al-go-pte/dynamics365-color.svg"
---

I changed Business Central by installing apps that add functionality, change behaviour, or give access to 3rd party online services.

[AL-Go for GitHub](https://github.com/microsoft/AL-Go) is a set of GitHub templates and actions for setting up and maintaining DevOps processes for Business Central AL projects.

I used [AL-Go for GitHub](https://github.com/microsoft/AL-Go) to [create a Business Central per-tenant extension (PTE) with VS Code](https://github.com/microsoft/AL-Go/blob/main/Scenarios/GetStarted.md).

(I uploaded a Per Tenant Extension (PTE) to Microsoft Dynamics Business Central using the Business Central Extension Management page.)


I used the [AL-Go-PTE](https://github.com/microsoft/AL-Go-PTE) GitHub template repository https://github.com/microsoft/AL-Go-PTE

I needed a GitHub account, a Windows machine, VS Code (with AL and PowerShell extensions installed), and Docker installed locally.

![](/assets/images/al-go-pte/screen-shot-2023-08-26-at-9.27.59-am-1836x1062.png)
*I created a new repository using the AL-Go-PTE GitHub template repository*

![](/assets/images/al-go-pte/screen-shot-2023-08-26-at-10.11.22-am-1836x1320.png)
*I named the repository haddley-al-go-pte*


## Windows laptop

I installed Docker Desktop, Windows Subsystem for Linux, Git, GitHub Desktop, and Visual Studio Code on a Windows 10 laptop.

![](/assets/images/al-go-pte/20230826image01-940x681.png)
*I installed Docker Desktop*

![](/assets/images/al-go-pte/20230826image19-856x376.png)
*I installed Windows Subsystem for Linux*

![](/assets/images/al-go-pte/20230826image14-951x674.png)
*I installed Git*

![](/assets/images/al-go-pte/20230826image05-1061x672.png)
*I installed GitHub Desktop*

![](/assets/images/al-go-pte/20230826image16-1060x671.png)
*I installed Visual Studio Code*

![](/assets/images/al-go-pte/20230826image02-957x658.png)
*I used GitHub Desktop to clone the haddley-al-go-pte repository*

![](/assets/images/al-go-pte/20230826image24-320x519.png)
*I switched Docker to support Windows containers (rather than Linux containers)*

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName containers –All
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V –All
```

https://stackoverflow.com/questions/57431890/error-response-from-daemon-hcsshimcreatecomputesystem-the-virtual-machine-co

![](/assets/images/al-go-pte/20230826image11-855x251.png)
*I navigated to the .AL-Go folder and ran the localDevEnv.ps1 PowerShell script*

![](/assets/images/al-go-pte/20230826image18-859x720.png)
*I entered a username:admin and password:<password>*

![](/assets/images/al-go-pte/20230826image21-856x718.png)
*Docker downloaded the Business Central image*

![](/assets/images/al-go-pte/20230826image22-856x721.png)
*Docker created the image*

![](/assets/images/al-go-pte/20230826image23-1270x716.png)
*Docker Desktop displayed the Business Central image*

![](/assets/images/al-go-pte/20230826image24-1269x719.png)
*Docker Desktop displayed the Business Central container*

![](/assets/images/al-go-pte/20230826image26-1373x878.png)
*The container was configured*

![](/assets/images/al-go-pte/20230826image27-1265x717.png)
*Laptop folders were available inside the container*

![](/assets/images/al-go-pte/20230826image28-1266x719.png)
*I needed to navigate to http://bcserver/BC/tenant=default*

![](/assets/images/al-go-pte/20230826image29-1162x703.png)
*I re-entered my username:admin and password:<password> (see above)*

![](/assets/images/al-go-pte/20230826image30-1160x705.png)
*Business Central was running in the local Docker container*

![](/assets/images/al-go-pte/20230826image31-857x719.png)
*I published the hello world extension (settings were copied to launch.json)*

![](/assets/images/al-go-pte/20230826image32-929x677.png)
*The sample extension was deployed — navigating to the customers page triggered the message*

![](/assets/images/al-go-pte/20230826image33-1022x310.png)
*I installed the AL Language Extension*

![](/assets/images/al-go-pte/20230826imag34-1365x989.png)
*I updated the trigger's message, ran AL: Download Symbols (entering my username:admin and password:<password>), and clicked the Run | Start Debugging menu item*

## References

- [Getting started with AL Go! for Github and Business Central](https://youtu.be/XoXGbcUxw-c?si=jITPYm9le2NaPhki)
