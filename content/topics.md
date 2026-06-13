---
title: "Copilot Studio"
description: "Building a Copilot Studio topic that calls the Business Central connector to return live company data from Dynamics 365 in a chatbot"
date: "2024-02-25"
categories: ["Power Platform"]
tags: "copilot-studio, topics, chatbot, conversation-topics"
slug: "topics"
image: "/assets/images/topics/office-365-icon-500x500.png"
---

I wanted to teach a Copilot Studio bot to answer "list of companies" by pulling live data from Dynamics 365 Business Central. By default the Copilot had no idea how to respond — so I built a custom Topic that called the Business Central Connector, retrieved the company list from my PRODUCTION environment, and returned the results to the user.

![](assets/images/topics/screenshot-2024-02-25-at-3.54.16-pm-1836x788.png)
*I confirmed there were three Companies in my PRODUCTION environment*

![](assets/images/topics/screenshot-2024-02-25-at-3.54.57-pm-1836x1152.png)
*I created a new Copilot and asked it to provide a "list of companies". It replied "I'm sorry, I'm not sure how to help with that."*

![](assets/images/topics/screenshot-2024-02-25-at-3.55.11-pm-1836x493.png)
*I created a new Topic from blank*

![](assets/images/topics/screenshot-2024-02-25-at-3.55.51-pm-1836x827.png)
*I added the Phrases "list of companies" and "company list"*

![](assets/images/topics/screenshot-2024-02-25-at-3.57.20-pm-1836x1038.png)
*I selected Call an action > Connector (preview) and chose the "List companies (V3)" action*

![](assets/images/topics/screenshot-2024-02-25-at-3.57.32-pm-1836x1043.png)
*I clicked the Submit button*

![](assets/images/topics/screenshot-2024-02-25-at-3.57.55-pm-1836x1037.png)
*The Connector action appeared in the Topic flow*

![](assets/images/topics/screenshot-2024-02-25-at-3.58.07-pm-1836x352.png)
*I provided the Environment (String) PRODUCTION*

![](assets/images/topics/screenshot-2024-02-25-at-3.58.24-pm-1836x1039.png)
*I selected Variable management > Set a variable value*

![](assets/images/topics/screenshot-2024-02-25-at-3.58.55-pm-1836x607.png)
*I set the variable name to Var1 and the value to GetCompaniesV3.value*

![](assets/images/topics/screenshot-2024-02-25-at-3.59.36-pm-1836x1040.png)
*I selected GetCompaniesV3.value from the variable picker, which set Var1's type to table*

![](assets/images/topics/screenshot-2024-02-25-at-4.00.06-pm-1836x1039.png)
*I added Message to return the Var1 table to the user*

![](assets/images/topics/screenshot-2024-02-25-at-4.01.17-pm-1836x1039.png)
*I created a second variable Var2 and set its value to the list of Company DisplayNames separated by ", "*

![](assets/images/topics/screenshot-2024-02-25-at-4.02.52-pm-1836x1040.png)
*I selected Topic management > End current topic*

![](assets/images/topics/screenshot-2024-02-25-at-4.03.47-pm-1836x1040.png)
*I entered "list of companies" into the Copilot. It returned the three company names.*