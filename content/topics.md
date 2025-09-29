---
title: "Copilot"
description: "Topics"
date: "2024-02-25"
categories: ["Power Platform","Microsoft Dynamics","Business Central"]
tags: []
slug: "topics"
image: "/assets/images/office-365-icon-500x500.png"
---



I created a Topic that used the Business Central Connector to retrieve the list of Companies created on my Production Business Server environment.

![](/assets/images/topics/screenshot-2024-02-25-at-3.54.16-pm-1836x788.png)
*There were three Companies in my PRODUCTION environment*

![](/assets/images/topics/screenshot-2024-02-25-at-3.54.57-pm-1836x1152.png)
*I created a new Copilot and asked it to provide a "list of companies"It replied "I'm sorry..."*

![](/assets/images/topics/screenshot-2024-02-25-at-3.55.11-pm-1836x493.png)
*I created a new Topic|From blank*

![](/assets/images/topics/screenshot-2024-02-25-at-3.55.51-pm-1836x827.png)
*I added the Phrases "list of companies" and "company list"*

![](/assets/images/topics/screenshot-2024-02-25-at-3.57.20-pm-1836x1038.png)
*I selected Call an action|Connector (preview) and selected the "List companies (V3)" action*

![](/assets/images/topics/screenshot-2024-02-25-at-3.57.32-pm-1836x1043.png)
*I clicked the Submit button*

![](/assets/images/topics/screenshot-2024-02-25-at-3.57.55-pm-1836x1037.png)
*The Connector action was added to the Topic*

![](/assets/images/topics/screenshot-2024-02-25-at-3.58.07-pm-1836x352.png)
*I provided the Environment (String) PRODUCTION*

![](/assets/images/topics/screenshot-2024-02-25-at-3.58.24-pm-1836x1039.png)
*I Variable management|Set a variable value*

![](/assets/images/topics/screenshot-2024-02-25-at-3.58.55-pm-1836x607.png)
*I set the variable name to Var1 and the value to GetCompaniesV3.value*

![](/assets/images/topics/screenshot-2024-02-25-at-3.59.36-pm-1836x1040.png)
*<<<<<< REPLACE WITH TEXT >>>>>>>*

![](/assets/images/topics/screenshot-2024-02-25-at-4.00.06-pm-1836x1039.png)
*I added Message to return the Var1 table to the user*

![](/assets/images/topics/screenshot-2024-02-25-at-4.01.17-pm-1836x1039.png)
*I created a second variable Var2.I set the value of Var2 to the list of Company DisplayNames separated by ", "*

![](/assets/images/topics/screenshot-2024-02-25-at-4.02.52-pm-1836x1040.png)
*I added Topic management|End current topic*

![](/assets/images/topics/screenshot-2024-02-25-at-4.03.47-pm-1836x1040.png)
*I entered "list of companies" into the Copilot.The Copilot returned the three company names.*