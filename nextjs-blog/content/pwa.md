---
title: "Progressive Web Application"
description: "A comprehensive guide covering progressive web application"
date: "2025-09-20"
category: "Development"
image: "/assets/images/pwa/hero.png"
tags: ["javascript","azure","java","ai","ml"]
---

# Progressive Web Application

## Building a Progressive Web Application

![](/assets/images/pwa/progressive-web-apps-logo.svg)
*Progressive Web Apps Logo by Diego González-Zúñiga is licensed under CC*


## Start a project

Create a GitHub project/repository.

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.26.13-pm-1380x488.png)
*Start a project*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.26.40-pm-1382x1052.png)
*Name the project "clock"*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.27.31-pm-1376x808.png)
*Click the "Create repository" button*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.33.03-pm-1836x999.png)
*Click on the "Code" dropdown. Select the "Open with GitHub Desktop" button.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.33.17-pm-1030x640.png)
*Open the project using GitHub Desktop*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.36.39-pm-1836x1260.png)
*The repository has been cloned to the laptop.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.38.16-pm-1836x549.png)
*add an index.html page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.01.07-pm-1824x1128.png)
*Add the Clock.jpg image*


## The clock code is available here:

[https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/](https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/)


## Create an Azure Static Web App

Navigate to the Azure Portal

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.05.56-pm-1800x422.png)
*Use the filter to locate "Static Web Apps"*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.06.15-pm-1800x302.png)
*Create a Static Web App*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.06.40-pm-1794x1086.png)
*Create the Static Web App in a new Resource Group*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.04-pm-1802x1080.png)
*Select the "Free" hosting plan. Click the "Sign in with GitHub" button.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.26-pm-1028x1206.png)
*Allow Azure to access GitHub*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.54-pm-1794x1086.png)
*Select the clock repository we created eariler*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.08.44-pm-1798x1090.png)
*Specify the build details.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.09.07-pm-1800x1086.png)
*Click the "Create" button*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.22.07-pm-1836x1064.png)
*A GitHub Action is able to publish content from GitHub to Azure*


## The clock application files have been moved

from here: [https://github.com/Haddley/clock](https://nice-island-028ba9d10.azurestaticapps.net/)

to here: [https://nice-island-028ba9d10.azurestaticapps.net/](https://nice-island-028ba9d10.azurestaticapps.net/)

![](/assets/images/pwa/screen-shot-2021-07-22-at-8.43.57-pm-1836x1126.png)
*Web page runs and shows clock*


## Adding the Progressive Web Application manifest and service worker

To convert our web page and assets to a Progressive Web Application we need to add a manifest and a service worker.

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.30.13-pm-1814x1284.png)
*The manifest file describes the Progressive Web Application*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.31.24-pm-1830x380.png)
*We add a manifest file reference to the index.html web page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-8.54.03-pm-1836x452.png)
*We add code to the index.html page that will register the service worker.*


## PWA asset generator

We use the pwa-asset-generator to generate a set of application images and icons from the Clock.jpg file.

```bash
% npx pwa-asset-generator Clock.jpg icons
```

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.37.42-pm-1836x1104.png)
*pwa-asset-generator*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.39.16-pm-1836x1144.png)
*The <link rel=apple... tags are copied from the terminal to head section of the index.html page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.39.49-pm-1836x1145.png)
*Details of the generated icons are copied to the manifest.json file*


## Service Worker

To have our app run offline we define an 'install' and 'fetch' event handler.

The install handler ensures that the offline.html file is copied to the browser cache.

The fetch handler ensures that the cached file is used.

The combination of the install handler and the fetch handler ensures that a network connection is not needed to run the app.

[https://developers.google.com/web/fundamentals/primers/service-workers](https://developers.google.com/web/fundamentals/primers/service-workers)

![](/assets/images/pwa/screen-shot-2021-07-24-at-4.11.16-pm-1836x1109.png)
*The service worker has been registered*

![](/assets/images/pwa/screen-shot-2021-07-24-at-4.12.18-pm-1836x1107.png)
*The offline.html file has been copied to Cache Storage*


## iOS

Installing the Progressive Web Application on an Apple mobile phone

![](/assets/images/pwa/221112865-970014710226853-8664174310082239425-n-750x1334.jpg)
*Using "Add to Home Screen" to add the application to iPhone Home Screen*

![](/assets/images/pwa/app-749x411.jpg)
*The Clock application on the iPhone Home Screen*

![](/assets/images/pwa/221614587-799111130749627-6154123063083796691-n-750x1334.jpg)
*The Clock applications runs on iPhone when there is no Internet connection*


## Android

Installing the Progressive Web Application on an Android mobile phone

![](/assets/images/pwa/218393640-224505342860807-4269059075052798195-n-720x607.png)
*Install app menu item*

![](/assets/images/pwa/218456919-367382621414522-3645697656728876533-n-720x446.png)
*Confirm*

![](/assets/images/pwa/217628966-181149494000738-7175079271432635419-n-720x613.png)
*The application has been added to the Android Home Screen*

![](/assets/images/pwa/218449402-540617857358530-1249974336792165683-n-720x459.png)
*The running application*


## MacBook

Installing the Progressive Web Application on a MackBook

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.52.52-pm-1836x1126.png)
*The Clock app can be "installed" onto a MacBook*

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.53.04-pm-924x376.png)
*Confirm the Install*

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.53.22-pm-1604x1166.png)
*The Clock Application running on the MacBook*


## Windows 10

Installing the Progressive Web Application on a Windows 10 laptop

![](/assets/images/pwa/microsoftteams-image-1-1293x715.png)
*The Clock app can be "installed" onto a Windows 10 laptop*

![](/assets/images/pwa/microsoftteams-image-2-611x345.png)
*Confirm the Install*

![](/assets/images/pwa/microsoftteams-image-3-1248x1019.png)
*Launching the Clock application from the start menu*

![](/assets/images/pwa/microsoftteams-image-4-1092x584.png)
*The Clock Application running on the Windows 10 laptop*


## Lighthouse

The Lighthouse tab in Google Chrome DevTools is able to provide feedback on the Progressive Web Application.

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.18.29-pm-1836x1009.png)
*Lighthouse report*
