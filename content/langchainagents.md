---
title: "LangChain Agents"
description: "Agents"
date: "2024-08-25"
categories: ["AI","Python"]
tags: ""
slug: "langchainagents"
image: "/assets/images/langchainagents/langchain.svg"
---



Agents are systems that use LLMs as reasoning engines to determine which actions to take and the inputs to pass them. After executing actions, the results can be fed back into the LLM to determine whether more actions are needed, or whether it is okay to finish.

I created two LangChain Agents

I created a LangChain Agent that used Wikipedia 

I created a LangChain Agent that used DuckDuckGo and a Maths tool

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.44.32pm-2136x464.png)
*I created a new Jupyter Notebook*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.45.51pm-2136x429.png)
*I created a new Python Environment*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.46.29pm-2136x279.png)
*I clicked the + Create Python Environment link*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.47.01pm-2136x210.png)
*I clicked the Venv link*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.47.26pm-2136x175.png)
*I selected Python 3.12.4*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.48.12pm-2136x1170.png)
*I used pip install*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.50.45pm-2136x323.png)
*I imported dependencies*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.57.23pm-2136x717.png)
*I ensured that an OPENAI_API_KEY could be relieved from the local .env file*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-4.58.00pm-2136x575.png)
*I created a large language model wrapper*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-5.03.41pm-2136x446.png)
*I ensured that I could access Wikipedia*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-5.38.10pm-1536x538.png)
*I created a prompt template*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-6.10.49pm-2136x1147.png)
*I created an agent, added the Wikipedia tool and invoked the agent (with verbose=True)*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-5.39.14pm-1536x974.png)
*I created a second agent, added a maths tool and added DuckDuckGo*

![](/assets/images/langchainagents/screenshot-2024-08-25-at-5.39.53pm-1536x722.png)
*I invoked the second agent (with verbose=True)*