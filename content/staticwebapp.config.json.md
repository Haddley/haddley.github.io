---
title: "staticwebapp.config.json"
description: "staticwebapp.config.json"
date: "2025-09-20"
category: "Development"
image: "/assets/images/staticwebapp.config.json/hero.png"
tags: ["azure","ai","ml","git","github"]
---

# staticwebapp.config.json

![](/assets/images/staticwebapp.config.json/azurex70x75.svg)
*Microsoft Azure Logo by Microsoft Corporation is Public Domain*


The "auth" section of the staticwebapp.config.json can be used to configure access to a static web app.

Static web app environment variables can be used to manage authentication properties

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-1.57.36-pm-1836x961.png)
*I created an index.html file. I created a staticwebapp.config.json file.*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.00.55-pm-1836x958.png)
*I right clicked the Static Web App icon and selected the "Create Static Web App... (Advanced)" option*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.01.06-pm-1836x958.png)
*I clicked the Create button*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.01.17-pm-1836x108.png)
*I provided a git initial commit message*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.02.17-pm-1836x151.png)
*I provided a name for a new Azure Resource Group*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.02.28-pm-1836x152.png)
*I accepted the detail Azure Static Web app name*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.02.40-pm-1836x177.png)
*I selected the Free pricing option*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.02.53-pm-1836x145.png)
*I selected the GitHub organization name*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.03.05-pm-1836x165.png)
*I accepted the default repository name*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.03.15-pm-1836x180.png)
*I selected the private option*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.03.24-pm-1836x201.png)
*I selected the default shortname*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.03.32-pm-1836x135.png)
*I selected the default region*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.03.56-pm-1836x328.png)
*I selected the HTML project structure*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.04.03-pm-1836x215.png)
*I selected location /*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.04.10-pm-1836x198.png)
*I left the Azure Function name empty*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.04.17-pm-1836x230.png)
*I selected location /*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.05.34-pm-1836x386.png)
*I created a new Azure Active Directory/Entra ID App Registration*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.06.24-pm-1836x1021.png)
*I selected the "any organization... option*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.33.24-pm-1836x592.png)
*I added a platform*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.33.32-pm-1836x482.png)
*I selected Web*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.33.43-pm-1836x1020.png)
*I specified the Redirect URI*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.58.39-pm-1836x995.png)
*I added https://jolly-bush.../.auth/login/add/callback*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.53.48-pm-1836x1019.png)
*I selected the ID tokens checkbox*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.06.55-pm-1836x508.png)
*I copied the client ID*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.08.06-pm-1836x669.png)
*I created an application Environment Variable called AZURE_CLIENT_ID and pasted in the value*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.08.25-pm-1836x1019.png)
*I created a Client Secret*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.08.38-pm-1836x821.png)
*I copied the Client Secret value*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.09.15-pm-1836x1020.png)
*I created an application Environment Variable called AZURE_CLIENT_SECRET and pasted in the value*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.47.56-pm-1836x1019.png)
*I upgraded the Static web app's hosting plan*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.09.39-pm-1836x421.png)
*I copied the Static Web Application's URL*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.54.53-pm-1836x1080.png)
*I clicked the Accept button*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.10.55-pm-1836x1046.png)
*I entered a username and password*

![](/assets/images/staticwebapp.config.json/screenshot-2024-03-16-at-2.11.24-pm-1836x1046.png)
*I logged onto the app*


```text
{
  "routes": [
    {
      "route": "/*",
      "allowedRoles": [
        "authenticated"
      ]
    }
  ],
  "responseOverrides": {
    "401": {
      "statusCode": 302,
      "redirect": "/.auth/login/aad"
    }
  },
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/1661e837-0a95-4bc6-a655-865365c2419b/v2.0",
          "clientIdSettingName": "AZURE_CLIENT_ID",
          "clientSecretSettingName": "AZURE_CLIENT_SECRET"
        }
      }
    }
  }
}
```
## References

- [Build a website using Azure Static Web Apps and Authenticate with AAD](https://www.youtube.com/watch?v=jnwRpEM6GR8)

