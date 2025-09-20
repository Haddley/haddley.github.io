---
title: "Prompt Flow (Part 3)"
description: "A comprehensive guide covering prompt flow (part 3)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow3.png"
tags: ["python","ai","git","github"]
---

# Prompt Flow (Part 3)

Prompt flow (Part 3) Semantic Kernel This file is licensed under the MIT license. Semantic Kernel Semantic Kernel is an open-source development kit for building AI agents. In this example I call a Semantic Kernel plugin to generate a joke. I cloned https://github.com/microsoft/semantic-kernel.git I selected Python Environments... I clicked the + Create Python Environment option I clicked the Venv option I selected Python 3.12.4 I did not select a requirements file I reviewed the workbook I ran the pip install I set the variables I reviewed the .env file documentation I created an .env file I created an api key https://platform.openai.com/api-keys I named the key Semantic Kernel I copied the key I pasted the key into the .env file I moved the .env file to the root of the repository and checked that I could retrieve values from it I created a kernel variable I created a selectedService variable I ensured that the .env file included an OPENAI_CHAT_MODEL_ID set to gpt-3.5-turbo I called the kernel.add_service method I added a Semantic Kernel plugin I invoked the joke_function with an input and a style This is the joke plugin's (optional) config.json This is the joke plugin's Semantic Kernel prompt template References Getting started with Semantic Kernel
