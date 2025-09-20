---
title: "Configure Copilot with authentication"
description: "A comprehensive guide covering configure copilot with authentication"
date: "2025-09-20"
category: "Development"
image: "/assets/images/copilot-logo.png"
tags: ["azure","docker","ai","ml","git"]
---

# Configure Copilot with authentication

## Configure Copilot with authentication

![](/assets/images/configurecopilotwithauthentication/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Configure Copilot with authentication

Microsoft Copilot Studio supports Azure Active Directory (aad) authentication.

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-12.56.22-pm-2136x1285.png)
*I created a new copilot*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-12.57.12-pm-2136x1279.png)
*I named the copilot "Blog Site Copilot"*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-12.57.27-pm-2136x1282.png)
*The copilot was setup*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-12.59.16-pm-2136x1202.png)
*"On Unknown Intent" the "Conversational boosting" Topic will generate an answer based on the contents of https://haddley.github.io (the Data source).*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-12.59.50-pm-2136x1200.png)
*To test the Copilot I asked the question "What is Docker?"*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.00.29-pm-2136x1126.png)
*I added a Message to display "System.Activity.Text"*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.01.39-pm-2136x1170.png)
*Now the text provided by the user is echoed back to them before the generated answer is displayed*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.02.46-pm-2136x1170.png)
*Restarting the session displays the message specified in the "Conversation Start" Topic*


## Publish|Configure channels

I wanted to publish the Copilot on a custom website.

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-8.50.49-am-1032x573.png)
*I clicked the Publish|Go to Channels link*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-8.53.03-am-1032x572.png)
*"Because you chose Teams Authentication, only Teams channel is available. To use other channels, change your authentication settings. Go to authentication settings."*


## Settings|Security|Authentication

By default the Copilot was configured with Authentication "Only for Teams and Power Apps".

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.05.03-pm-2136x1167.png)
*I clicked on the Security menu item*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.05.17-pm-2136x1168.png)
*I clicked on the Authentication tile*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.08.38-pm-1258x178.png)
*The "Only for Teams and Power Apps" authentication option is selected (by default).*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-13-at-1.06.56-pm-2090x1544.png)
*Notice that a "Blog Site Copilot (Power Virtual Agents)" application registration was automatically created in Azure.*


## Security|Authentication|No Authentication

I set the Authentication setting to No authentication. I navigated to the Demo Website channel.

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.17.21-am-1836x1020.png)
*I selected the No authentication option*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.20.00-am-1836x1023.png)
*I clicked the Save button*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.21.21-am-1836x1022.png)
*I clicked the Copy button*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.22.38-am-1836x1017.png)
*I navigated to https://web.powerva.microsoft.com/environments/b838e044-3024-ea32-b2f4-7862b85e9903/bots/cr74e_blogSiteCopilot/canvas?__version__=2*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.25.43-am-1836x1020.png)
*I navigated to the Publish tab and clicked the Publish button*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-9.26.06-am-1836x1024.png)
*I clicked the Publish button*

![](/assets/images/configurecopilotwithauthentication/screenshot-2024-03-14-at-10.35.51-am-1836x1085.png)
*I returned to the demo website and asked the question "What is NGRX?"*


## Custom website

I created a custom website to host the Copilot.


## Token Endpoint

I copied the "Token Endpoint" from the Mobile app channel.


## Settings|Security|Manual

To configure "Manual Authentication" I needed to create a "Copilot App" Application Registration and copy the Client ID and a Client Secret to Copilot Studio.


## The "Canvas App" Application Registration

I created a "Canvas App" Application Registration.

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/configurecopilotwithauthentication/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*
