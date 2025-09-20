---
title: "Electron"
description: "A comprehensive guide covering electron"
date: "2025-09-20"
category: "Development"
image: "/assets/images/1200px-electron-software-framework-logo.svg-1200x1200.png"
tags: ["javascript","java","ai","ml","git"]
---

# Electron

## Create a Desktop app using Node and Chromium.

![Electron](/assets/images/electron/1200px-electron-software-framework-logo.svg-1200x1200.png)
*Electron Software Framework Logo by GitHub is licensed under CC*


## Advantages

Electron allows developers to build cross-platform desktop applications using HTML, CSS, JavaScript and C++.

Visual Studio Code, Slack, Microsoft Teams and Github Desktop are all Electron applications.

A minimal Electron app is made up of node code (that might be in a file named main.js) and Chromium code (that might be in a file named index.html).


## main.js and index.html

We can create a package.json file using the npm init command
$ npm init -y

We can add the electron dependencies using the npm i --save-dev electron command
$ npm i --save-dev electron

Once the dependencies have been added we can create a main.js file and an index.html file:


## package.json

Now we can update the package.json file and run the Electron app.

"main": "main.js",
    "scripts": {
  "start": "electron ."
    }

Use "npm start" to run the Electron app.

$ npm start

![](/assets/images/electron/screen-shot-2021-02-23-at-2.36.38-pm-1836x1166.png)
*npm start*

![](/assets/images/electron/screen-shot-2021-02-23-at-2.44.21-pm-1588x1194.png)
*Running electron app*


## npm

Some of the modules published to npmjs.com are designed to run in node only.

These modules access resources that a web pages running in a desktop browser are not allowed to access. 

These modules may have been created using [JavaScript](npm.html) or [C++](npmCC.html).

In an Electron app code in an index.html page (hosted by Chromium) is able to call into node modules (hosted by node).

![](/assets/images/electron/screen-shot-2021-02-26-at-2.41.35-pm-1836x1169.png)
*Electron code*

![](/assets/images/electron/screen-shot-2021-02-26-at-2.46.42-pm-1314x780.png)
*Running Electron application*
