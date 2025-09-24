---
title: "Azure Active Directory (Part 1)"
description: "A comprehensive guide covering azure active directory (part 1)"
date: "2025-09-20"
category: "Azure"
image: "/assets/images/azure-active-directory/hero.png"
tags: ["azure","ai"]
---

## Using Microsoft Identity to Authenticate Users.

![](/assets/images/azure-active-directory/microsoft-azure-logo.svg)
*Microsoft Azure Logo by Microsoft Corporation is Public Domain*


## Microsoft Teams

Microsoft Office 365 applications including Microsoft SharePoint and Microsoft Teams use Azure Active Directory to authenticate users .

Microsoft Teams allows Guest users to be added to a Team. 

Azure Active Directory is used to support the Teams Guest user feature.

In the screenshot below John Doe with email address john@doe.com is added as a Guest user.

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-6.50.37-pm-1314x906.png)
*John Doe is being added as a Guest user.*


## Members and guests

Once John Doe has been added to the Team his account is included in the "Members and guests" list.

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-6.55.56-pm-1836x833.png)
*John has been added as a (guest) member of the Team*


## Azure Active Directory Users

Switching to the Azure Portal we can see that an external (EXT) Active Directory account has been added for John Doe.

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-7.00.35-pm-1660x932.png)
*Azure Active Directory Users*


## Custom Web Application

We can use the same Azure Active Directory user list to authenticate users accessing a custom "Who am I" web application.


## App Registration

The key step is the creation of an "application registration". 

Navigate to the Azure Active Directory service and select App registrations page.

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-7.28.36-pm-1836x1175.png)
*Navigate to Azure Active Directory and select App registrations*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-7.31.12-pm-456x178.png)
*Click the "+ New registration" button*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.20.55-pm-1730x1470.png)
*Enter the user-facing display name "who am i" in this case.Enter the redirect uri (this is the address the user will be directed to once they have successfully entered their credentials).*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.25.13-pm-1692x818.png)
*We need to create a client secret*


## We need to take a note of these three values

Application (client) ID 63fe01c7-f396-484e-8a48-760f********
Directory (tenant) ID 1661e837-0a95-4bc6-a655-8653********
Client secret -~nGgWS3F7y~-o2etNGc0BW_ik_*******


## Test the solution

To test the who-am-i web application we can navigate to http://localhost:3000

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.30.32-pm-1050x226.png)
*We attempt to navigate to http://localhost:3000*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.30.53-pm-1836x977.png)
*We are redirected to the Azure Active Directory Sign in page (unless federated identity management is enabled).*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.31.03-pm-1836x982.png)
*Once we have entered a correct email/username and password...*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.31.24-pm-1836x983.png)
*...we are asked consent to having our personal details passed to the "who am i" application (unless two factor authentication is enabled).*

![](/assets/images/azure-active-directory/screen-shot-2021-03-31-at-9.31.40-pm-1836x977.png)
*In this case we are redirected to "/redirect" and the name of the authenticated user is displayed*


## package.json

```text
{
  "name": "who-am-i",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@azure/msal-node": "^1.0.0",
    "express": "^4.17.1",
    "uuid": "^8.3.1"
  },
  "devDependencies": {},
  "scripts": {
    "start": "node index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Haddley/who-am-i.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Haddley/who-am-i/issues"
  },
  "homepage": "https://github.com/Haddley/who-am-i#readme"
}
```

## index.js

```text
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const express = require("express");
const msal = require('@azure/msal-node');

const SERVER_PORT = process.env.PORT || 3000;
const REDIRECT_URI = "http://localhost:3000/redirect";

// Before running the sample, you will need to replace the values in the config, 
// including the clientSecret
const config = {
    auth: {
        clientId: "63fe01c7-f396-484e-8a48-760f********",
        authority: "https://login.microsoftonline.com/1661e837-0a95-4bc6-a655-8653********",
        clientSecret: "-~nGgWS3F7y~-o2etNGc0BW_ik_*******"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

// Create Express App and Routes
const app = express();

app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: REDIRECT_URI,
    };

    // get url to sign user in and consent to scopes needed for application
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: REDIRECT_URI,
    };

    pca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        // Return the current user's name
        console.log(response.account.name);
        res.send(response.account.name);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});


app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))
```
## References

- [QuickStart](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-nodejs-webapp-msal)

