---
title: "Prompt Flow (Part 4)"
description: "Planning"
date: "2024-08-24"
categories: ["AI"]
tags: ""
slug: "promptflow4"
image: "/assets/images/promptflow4/logo.svg"
---


Once you have multiple plugins, you then need a way for your AI agent to use them together to solve a user’s need. This is where planning comes in.

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.40.34am-1831x668.png)
*I selected the existing .venv environment*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.42.05am-1831x727.png)
*I created a selectedService variable*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.42.44am-1764x768.png)
*I created an ask variable (the goal)*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.43.21am-1831x838.png)
*I created a kernel*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.44.44am-1831x873.png)
*I added summarize, writer, text and shakespeare plugins*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.47.21am-1831x672.png)
*I created a Sequential PlannerI asked the planner to create a plan based on my ask (goal)*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-11.48.29am-1831x898.png)
*I printed out the planning stepsI invoked the plan and printed the result (a short poem in the style of Shakespeare translated to French and converted to all upper case)*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.09.23pm-1831x324.png)
*I updated the ask (goal)*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.09.58pm-1831x1051.png)
*I added the fun plugin*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.10.32pm-1831x1119.png)
*I printed out the updated plan's steps*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.11.06pm-1831x451.png)
*I invoked the plan and reviewed the result*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.12.16pm-1831x1064.png)
*I created a kernel*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.13.01pm-1831x1207.png)
*I created an (stub) Email plugin*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.13.37pm-1831x711.png)
*I added the Email pluginI added the Math and Time plugins*

![](/assets/images/promptflow4/screenshot-2024-08-24-at-3.15.03pm-1831x1176.png)
*I used the planner to answer three questions*