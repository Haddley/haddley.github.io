---
title: "Custom Copilot Studio"
description: "A comprehensive guide covering custom copilot studio"
date: "2025-09-20"
category: "Development"
image: "/assets/images/posts-meta.svg"
tags: ["ai","business central","dynamics"]
---

# Custom Copilot Studio

## Customer Copilot

![](/assets/images/customcopilotstudio/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Customer Copilot

I created a Business Central extension that allows Business Central users to "chat to" Customers.

I used the Global Variable and Generative AI features in Copilot studio.

The same approach could be used to allow users to chat to other Business Central entities

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.18.51-pm-1836x272.png)
*I created a new Copilot*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.19.14-pm-1836x971.png)
*I called the Copilot "Customer Copilot"*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.19.34-pm-1836x964.png)
*I watched the animation*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.20.00-pm-1836x380.png)
*I created a Copilot Studio Topic*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.21.10-pm-1836x518.png)
*I named the Topic "Parameter Config"*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.22.00-pm-1836x969.png)
*I used the "Set a variable value" action*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.23.32-pm-1836x972.png)
*I created a "Customer_Name" Global variable that could be set by an external source (Business Central in this case)*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.24.25-pm-1836x970.png)
*I created a "Customer_City" Global variable*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.25.44-pm-1836x971.png)
*I created a "Customer_No" Global variable*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.27.19-pm-1836x970.png)
*I created a "Customer_Blocked" Global variable*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.28.54-pm-1836x970.png)
*I updated the "Conversation Start" Topic*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.29.19-pm-1836x972.png)
*I used the {x} button to insert Global variable values into the Conversation Start action's text*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.29.48-pm-1836x969.png)
*I saved the Topic*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.42.11-pm-1836x968.png)
*I navigated to the Generative AI tab and enabled the "Boost conversational coverage with generative answers" feature*

![](/assets/images/customcopilotstudio/screenshot-2024-03-23-at-3.42.55-pm-1836x604.png)
*The Conversational boosting Topic was added*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.16.45-am-1836x972.png)
*In the Conversational booking Topic I created a Custom Data variable*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.17.18-am-1836x971.png)
*I updated the "create generative answers" action's Data sources property*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.17.31-am-1836x967.png)
*The Custom data datasource was set to the CustomData variable*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.44.50-am-1836x974.png)
*I published the Copilot*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-10.04.45-am-1836x1059.png)
*I created a Business Central extension that connected to the Copilot*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.36.28-am-1836x972.png)
*I was able to "chat to" School of Fine Art*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-9.36.49-am-1836x963.png)
*I was able to "chat to" Alpine Ski House*

![](/assets/images/customcopilotstudio/screenshot-2024-03-24-at-10.02.53-am-1836x970.png)
*I was able to "chat to" Adatum Corporation*
