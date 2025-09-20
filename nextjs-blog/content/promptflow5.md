---
title: "Prompt Flow (Part 5)"
description: "A comprehensive guide covering prompt flow (part 5)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/logo.svg"
tags: ["docker","python","ai"]
---

# Prompt Flow (Part 5)

## With LangChain

![](/assets/images/promptflow5/logo.svg)
*This file is licensed under the MIT license.*


## Quick start

I used Prompt flow and LangChain to create and deploy an AI application.

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.47.00pm-2136x767.png)
*I used the Prompt Flow extension to create a Chat flow*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.47.10pm-2092x556.png)
*I accepted the default flow name*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.47.39pm-2136x757.png)
*I clicked the Open menu item*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.47.50pm-2136x495.png)
*I selected the + Create Virtual Environment... menu item*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.47.58pm-2136x316.png)
*I selected the Venv option*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.48.07pm-2136x368.png)
*I selected the Python version 3.12.4*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.48.19pm-2136x316.png)
*I selected the generated requirements.txt file*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.48.38pm-2136x353.png)
*I (briefly) selected the Global environment*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.48.49pm-2136x408.png)
*I selected the .venv environment again*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.49.26pm-2136x395.png)
*The "Can not find a valid python package" error was fixedI selected an exiting connection and the gpt-3.5-turbo large language model*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.49.39pm-2136x307.png)
*I tried to test the flow*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.50.02pm-2136x410.png)
*An error message showed that the "promptflow-tools" package was required*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.50.42pm-2136x634.png)
*I added promptflow-tools to the requirements.txt file and ran pip install.*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.43.39pm-1834x382.png)
*I tested the flow asking who the Democratic Nominee for Present was. The large language model was unable to provide an up-to-date answer*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.55.55pm-2136x267.png)
*I added a new node*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.56.05pm-2136x195.png)
*I selected Python*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.56.20pm-2136x208.png)
*I accepted the generated name*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.56.27pm-2136x167.png)
*I asked for a new file*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.58.25pm-2136x585.png)
*I added more packages to the requirements.txt file*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-12.59.51pm-2136x1005.png)
*I set the Python node's inputs*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.00.29pm-2136x721.png)
*I set the outputs's input*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.00.58pm-2136x684.png)
*I removed the chat node*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.01.15pm-2136x691.png)
*I tested the updated flow*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.52.40pm-1824x612.png)
*The flow was able to provide an up-to-date response*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.54.14pm-2136x1123.png)
*The flow could have used the Duck Duck Go search "tool"*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-2.16.21pm-2136x1124.png)
*The flow could have used the Wikipedia "tool"*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.54.58pm-2136x290.png)
*I selected the Build as docker menu item*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.55.39pm-1608x898.png)
*I created a DOCKER folder*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.56.04pm-1928x516.png)
*I clicked on the Create Dockerfile link*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-1.58.44pm-2060x958.png)
*I navigated into the DOCKER directory and used docker build to create a docker image*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-2.00.43pm-2136x1164.png)
*I used Docker Desktop to create a container based on the new Docker image I specified a local port 8080 and an OpenAI key*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-2.01.27pm-2136x1155.png)
*The Docker container started*

![](/assets/images/promptflow5/screenshot-2024-09-01-at-2.03.38pm-2102x1414.png)
*I was able to access the container using port 8080*
