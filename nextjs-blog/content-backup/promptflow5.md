---
title: "Prompt Flow (Part 5)"
description: "A comprehensive guide covering prompt flow (part 5)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow5.png"
tags: ["docker","python","ai"]
---

# Prompt Flow (Part 5)

Prompt flow (Part 5) With LangChain This file is licensed under the MIT license. Quick start I used Prompt flow and LangChain to create and deploy an AI application. I used the Prompt Flow extension to create a Chat flow I accepted the default flow name I clicked the Open menu item I selected the + Create Virtual Environment... menu item I selected the Venv option I selected the Python version 3.12.4 I selected the generated requirements.txt file I (briefly) selected the Global environment I selected the .venv environment again The "Can not find a valid python package" error was fixed I selected an exiting connection and the gpt-3.5-turbo large language model I tried to test the flow An error message showed that the "promptflow-tools" package was required I added promptflow-tools to the requirements.txt file and ran pip install. I tested the flow asking who the Democratic Nominee for Present was. The large language model was unable to provide an up-to-date answer I added a new node I selected Python I accepted the generated name I asked for a new file python_node_n8ln.py I added more packages to the requirements.txt file I set the Python node's inputs I set the outputs's input I removed the chat node I tested the updated flow The flow was able to provide an up-to-date response The flow could have used the Duck Duck Go search "tool" The flow could have used the Wikipedia "tool" I selected the Build as docker menu item I created a DOCKER folder I clicked on the Create Dockerfile link I navigated into the DOCKER directory and used docker build to create a docker image I used Docker Desktop to create a container based on the new Docker image I specified a local port 8080 and an OpenAI key The Docker container started I was able to access the container using port 8080 References Quick start
