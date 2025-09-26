---
title: "Prompt Flow (Part 1)"
description: "A comprehensive guide covering prompt flow (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow1/hero.png"
tags: ["azure","docker","kubernetes","devops","python"]
---

## Setup

![](/assets/images/promptflow1/logo.svg)
*This file is licensed under the MIT license.*


## Setup

Prompt flow is a development tool designed to streamline the development of AI applications powered by Large Language Models (LLMs).

Prompt flow applications can be [developed](https://microsoft.github.io/promptflow/how-to-guides/develop-a-dag-flow/index.html) using Azure or locally on a laptop.

Prompt flow application can be [deployed](https://microsoft.github.io/promptflow/how-to-guides/deploy-a-flow/index.html) using [Azure App Service](devopsstartergithubactions.html), [Docker](docker.html) or [Kubernetes](kubernetes.html).

Here I demonstrate how I used Prompt flow for Visual Studio Code to create and run a couple of sample AI applications.

The result is not very different from AI applications I have developed in the past using [langchain](llamaCorp.html).

![](/assets/images/promptflow1/screenshot-2024-06-11-at-8.18.26am-1836x1055.png)
*I downloaded Python from the python.org web site*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-8.19.03am-1236x886.png)
*I installed Python 3.12.4 for macOS*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-8.21.51am-1836x993.png)
*I ran the Install Certificates script*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-8.23.34am-1836x1046.png)
*I downloaded Visual Studio Code (the Apple silicon build)*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-8.25.35am-1836x691.png)
*I installed the Prompt flow VS Code extension*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.14.11am-1836x329.png)
*I opened a folder and ran the Python: Create Environment command.*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.14.23am-1836x379.png)
*I created a .venv environment in the project's folder*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.16.29am-1836x1286.png)
*I selected the Prompt flow extension (the "P" logo) and clicked the QUICK ACCESS | Install dependencies menu item*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.18.32am-1836x1295.png)
*I used source .venv/bin/activate to activate the environmentI used pip install promptflow to add the promptflow dependencies*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.19.42am-1836x1292.png)
*I ran pf -v to see what version of Prompt flow was installed*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.20.50am-1836x1291.png)
*I clicked on FLOWS and navigated to the included standard_flowI ensured that the .venv virtual environment was selected and entered a text default value "Hello World"*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-10.21.15am-1836x1289.png)
*I clicked the Test menu item to run the standard_flowThe default text value was added to the "Prompt:" and "Write a simple {{text}} program that displays the greeting message." text*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.06.28pm-1836x1142.png)
*The "Prompt: " text is included in the hello.py source code*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.07.46pm-1836x1145.png)
*The flow.dag.yaml file describes the flow*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.07.54pm-1836x1135.png)
*The hello.jinja2 template contains the "Write a simple {{text}}..." text*


## Creating a new flow

I used the **+Create new flow** menu item to create a new flow.

I used the **Open** menu item to view the flow.

I used the **Test** menu item to run the flow.

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.43.33am-1836x1040.png)
*I generated a new Open AI key and used it to create a Prompt flow connection*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.46.01am-1836x1145.png)
*I created a chat flow*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.46.13am-1836x210.png)
*I accepted the default flow name*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.47.11am-1836x1143.png)
*I updated the flow to make use of the OpenAI (large language model) connection*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.48.52am-1836x631.png)
*I updated the default question text*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.53.54am-1836x1152.png)
*I used the Test menu item to run the flow with standard mode*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.41.16pm-1836x1393.png)
*I ran the Prompt flow with interactive mode (multi-modal)*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.55.54am-1836x1144.png)
*The new chat flow included a single llm tool (named "chat")*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-11.54.07am-1836x1145.png)
*The chat.jinja2 file is used to compose the large language model prompt (with the chat history included)*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-3.00.40pm-1836x617.png)
*Prompt flow traces*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.58.43pm-1836x955.png)
*Open AI activity*

![](/assets/images/promptflow1/screenshot-2024-06-11-at-2.58.52pm-1836x953.png)
*Open AI cost $*
