---
title: "Configure Copilot single sign-on for Web"
description: "Publish|Configure channels"
date: "2024-03-16"
categories: ["Power Platform"]
tags: ""
slug: "configurecopilotsinglesignonforweb"
image: "/assets/images/configurecopilotsinglesignonforweb/office-365-icon-500x500.png"
---


Microsoft Copilot Studio supports single sign-on (SSO). [SSO allows copilots on your website to sign customers in if they're already signed in to the page or app where the copilot is deployed](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso?tabs=webApp).

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-12.56.22-pm-2136x1285.png)
*I created a new copilot*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-12.57.12-pm-2136x1279.png)
*I named the copilot "Blog Site Copilot"*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-12.57.27-pm-2136x1282.png)
*The copilot was setup*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-12.59.16-pm-2136x1202.png)
*"On Unknown Intent" the "Conversational boosting" Topic will generate an answer based on the contents of https://haddley.github.io (the Data source).*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-12.59.50-pm-2136x1200.png)
*To test the Copilot I asked the question "What is Docker?"*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.00.29-pm-2136x1126.png)
*I added a Message to display "System.Activity.Text"*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.01.39-pm-2136x1170.png)
*Now the text provided by the user is echoed back to them before the generated answer is displayed*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.02.46-pm-2136x1170.png)
*Restarting the session displays the message specified in the "Conversation Start" Topic*


I wanted to publish the Copilot on a custom website.

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-8.50.49-am-1032x573.png)
*I clicked the Publish|Go to Channels link*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-8.53.03-am-1032x572.png)
*"Because you chose Teams Authentication, only Teams channel is available. To use other channels, change your authentication settings. Go to authentication settings."*


## Settings|Security|Authentication

By default the Copilot was configured with Authentication "Only for Teams and Power Apps".

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.05.03-pm-2136x1167.png)
*I clicked on the Security menu item*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.05.17-pm-2136x1168.png)
*I clicked on the Authentication tile*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.08.38-pm-1258x178.png)
*The "Only for Teams and Power Apps" authentication option is selected (by default).*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-13-at-1.06.56-pm-2090x1544.png)
*Notice that a "Blog Site Copilot (Power Virtual Agents)" application registration was automatically created in Azure.*


## Security|Authentication|No Authentication

I set the Authentication setting to No authentication. I navigated to the Demo Website channel.

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.17.21-am-1836x1020.png)
*I selected the No authentication option*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.20.00-am-1836x1023.png)
*I clicked the Save button*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.21.21-am-1836x1022.png)
*I clicked the Copy button*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.22.38-am-1836x1017.png)
*I navigated to https://web.powerva.microsoft.com/environments/b838e044-3024-ea32-b2f4-7862b85e9903/bots/cr74e_blogSiteCopilot/canvas?__version__=2*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.25.43-am-1836x1020.png)
*I navigated to the Publish tab and clicked the Publish button*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-9.26.06-am-1836x1024.png)
*I clicked the Publish button*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-14-at-10.35.51-am-1836x1085.png)
*I returned to the demo website and asked the question "What is NGRX?"*


## Setting|Security|Manual

To Configure Copilot with single sign-on for I created two Application Registrations.

A "Blog Site Copilot (**Canvas App**)" Application Registration for the Web Page [https://delightful-moss-0ad02620f.5.azurestaticapps.net](https://delightful-moss-0ad02620f.5.azurestaticapps.net/); and

A "Blog Site Copilot (**Authenticated App**)" Application Registration for Copilot Studio [https://token.botframework.com/.auth/web/redirect](https://token.botframework.com/.auth/web/redirect)

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.48.16-pm-1836x1107.png)
*The Canvas App Registration has a Web Redirect URI https://delightful-moss-0ad02620f.5.azurestaticapps.net/*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.50.26-pm-1836x1104.png)
*The Access tokens and ID tokens options are both checked*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.51.50-pm-1836x860.png)
*The Canvas App Registration has a generated Client secret*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.53.06-pm-1836x792.png)
*The Canvas App Registration Overview*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.54.58-pm-1836x1107.png)
*The Authenticated App Registration has a Web Redirect URI https://token.botframework.com/.auth/web/redirect*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.58.30-pm-1836x811.png)
*Notice that the Redirect URL can be copied from the Copilot Studio Security|Authentication page*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-3.59.54-pm-1836x1105.png)
*The Access tokens and ID tokens options are both checked*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.00.35-pm-1836x904.png)
*The Authenticated App Registration has a generated Client secret*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.01.38-pm-1836x1104.png)
*The Authenticated App Registration includes a scope. The Authenticated App is configured to trust the Canvas App Registration. Notice that the Canvas App Client ID "ff20..." has been added.*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.05.03-pm-1836x1053.png)
*The Authenticated App Registration includes scope: api://69552d8b-12ac-4e44-96a6-1dc285405aa5/Readfiles*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.08.04-pm-1836x778.png)
*The Authenticated App Registration Overview*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.06.27-pm-1836x1034.png)
*Notice that the Authenticated The Authenticated App Registration Client ID and Client Secret have been added to the Copilot Studio Security|Authentication page. The "api://6955..." scope has been added to the Copilot Studio Security|Authentication page.*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.13.51-pm-1836x1029.png)
*Code is from https://github.com/microsoft/CopilotStudioSamples/blob/master/BuildYourOwnCanvasSamples/3.single-sign-on/index.html*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.12.52-pm-1836x671.png)
*Static Web App has URL https://delightful-moss-0ad02620f.5.azurestaticapps.net*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.16.59-pm-1836x1170.png)
*To get this example to work I needed to load the web page and to click the "log in" button (promptly).*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.23.27-pm-1836x1036.png)
*Whoami Topic*

![](/assets/images/configurecopilotsinglesignonforweb/screenshot-2024-03-16-at-4.20.00-pm-1836x1030.png)
*This part of the code posts a "signin/tokenExchange" message to the Copilot (avoiding the need for the web page logged in user to login to the Copilot themselves).*