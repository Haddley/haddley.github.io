---
title: "Copilot Studio Agent Tools"
description: "Connected to Business Central"
date: "2025-09-24"
category: "Business Central"
image: "/assets/images/blogcopilotstudio/hero.png"
tags: ["java","ai","business central","dynamics","git"]
---

# Copilot Studio Agent Tools
## Connected to Business Central

![](/assets/images/createactionbasedonaflow/dynamics365-color.svg)
*By Microsoft, Public Domain*

I created a Copilot Studio Agent that connected to Business Central using a Copilot Studio Tool.

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.55.54-pm.png)
*I created a new agent*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.56.34-pm.png)
*I named the agent "Business Central Tools Agent"*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.56.56-pm.png)
*I created a New Agent*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-4.57.38-pm.png)
*I clicked the Create button*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.17.33-pm.png)
*I clicked the Tools menu item*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.17.47-pm.png)
*I clicked the Add a tool button*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.18.14-pm.png)
*I searched for Business Central actions*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.18.34-pm.png)
*I selected the Find records (V3) action and clicked the Add and configure button*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-5.21.23-pm.png)
*I updated the tool name to "Find Vendor records (V3)". I updated the default description*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.19.08-pm.png)
*I specified the Environment, Company, API category and Table name (vendors)*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.22.19-pm.png)
*I clicked Save and tested the tool "Who do we buy stuff from?". I clicked the Allow button*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.27.25-pm.png)
*The Business Central company had a single "Example Vendor"*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-24-at-6.26.05-pm.png)
*The Agent returned details of the Vendor*


![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.43.51-am.png)
*I added a second tool based on the Create record (V2) action*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.44.04-am.png)
*I clicked the Add and configure button*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.44.39-am.png)
*I updated the tool's name to 'Create Vendor record (V2)'*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.46.17-am.png)
*I selected the Environment, Company, API category and table name. I clicked the Add input button and selected displayName*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.51.14-am.png)
*I tried to use the new tool*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.51.44-am.png)
*An error message was returned*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.53.32-am.png)
*I added a number input*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.53.47-am.png)
*The new Vendor record was created*

![](/assets/images/copilotstudiobctools/screenshot-2025-09-26-at-10.54.19-am.png)
*The new vendor was visible in Business Central*



## References

- [Copilot Studio in Action Create Records Anywhere, Effortlessly!](https://www.youtube.com/watch?v=oeTjP_AVqQ8)