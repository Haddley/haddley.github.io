---
title: "Electron"
description: "Create a Desktop app using Node and Chromium."
date: "2025-09-20"
categories: ["Development"]
image: "/assets/images/electron/hero.png"
tags: ["javascript","java","ai","ml","git"]
hidden: true
slug: "electron"
---



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


## main.js

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
```

## index.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>

<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using node
        <script>document.write(process.versions.node)</script>,
        Chrome
        <script>document.write(process.versions.chrome)</script>,
        and Electron
        <script>document.write(process.versions.electron)</script>.
    </p>
</body>

</html>
```

## Code that will run on an Electron index.html page

```typescript
const nodeFactorialCC = require("node-factorial-cc")
            const result = nodeFactorialCC.factorial(9)
            document.write(`factorial of 9 is: ${result}`)
```

