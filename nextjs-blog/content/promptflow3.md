---
title: "Prompt Flow (Part 3)"
description: "A comprehensive guide covering prompt flow (part 3)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/logo.svg"
tags: ["python","ai","git","github"]
---

# Prompt Flow (Part 3)

## Semantic Kernel

![](/assets/images/promptflow3/logo.svg)
*This file is licensed under the MIT license.*


## Semantic Kernel

[Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/) is an open-source development kit for building AI agents.

In this example I call a Semantic Kernel plugin to generate a joke.

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.31.26am-1000x596.png)
*I cloned https://github.com/microsoft/semantic-kernel.git*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.37.04am-1831x1057.png)
*I selected Python Environments...*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.37.43am-1831x376.png)
*I clicked the + Create Python Environment option*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.38.13am-1831x222.png)
*I clicked the Venv option*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.38.34am-1831x229.png)
*I selected Python 3.12.4*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.39.19am-1831x309.png)
*I did not select a requirements file*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.41.57am-1831x1057.png)
*I reviewed the workbook*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.42.59am-1831x589.png)
*I ran the pip install*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.43.51am-1831x480.png)
*I set the variables*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.46.51am-1831x935.png)
*I reviewed the .env file documentation*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.47.56am-1831x498.png)
*I created an .env file*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.52.33am-1831x1012.png)
*I created an api key https://platform.openai.com/api-keys*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.53.43am-1831x950.png)
*I named the key Semantic Kernel*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.54.32am-1831x1016.png)
*I copied the key*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.55.12am-1754x732.png)
*I pasted the key into the .env file*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.10.10am-1831x1057.png)
*I moved the .env file to the root of the repository and checked that I could retrieve values from it*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.57.03am-1831x288.png)
*I created a kernel variable*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-8.57.52am-1831x650.png)
*I created a selectedService variable*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.26.53am-1831x320.png)
*I ensured that the .env file included an OPENAI_CHAT_MODEL_ID set to gpt-3.5-turbo*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.23.22am-1831x838.png)
*I called the kernel.add_service method*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.28.25am-1831x622.png)
*I added a Semantic Kernel pluginI invoked the joke_function with an input and a style*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.30.37am-1831x916.png)
*This is the joke plugin's (optional) config.json*

![](/assets/images/promptflow3/screenshot-2024-08-24-at-9.30.46am-1831x916.png)
*This is the joke plugin's Semantic Kernel prompt template*
