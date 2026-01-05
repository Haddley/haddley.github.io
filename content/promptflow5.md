---
title: "Prompt Flow (Part 5)"
description: "Quick start"
date: "2024-09-01"
categories: ["AI"]
tags: ""
slug: "promptflow5"
image: "/assets/images/logo.svg"
---


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


## python_node_n8ln.py

```text
from promptflow.core import tool
from dotenv import load_dotenv, find_dotenv
#from langchain_openai import AzureChatOpenAI
from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_community.tools import DuckDuckGoSearchRun
#from promptflow.connections import AzureOpenAIConnection
from promptflow.connections import OpenAIConnection
from langchain import hub
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper


@tool
def my_python_tool(question: str, openai_connect: OpenAIConnection) -> str:
    load_dotenv(find_dotenv(), override=True)
    #llm = AzureChatOpenAI(
    #    azure_deployment="gpt-35-turbo-16k",  # gpt-35-turbo-16k or gpt-4-32k
    #    openai_api_key=openai_connect.api_key,
    #    azure_endpoint=openai_connect.api_base,
    #    openai_api_type=openai_connect.api_type,
    #    openai_api_version=openai_connect.api_version,
    #)
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0, api_key=openai_connect.api_key)
    search = DuckDuckGoSearchRun(verbose=True)
    api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=500,verbose=True)

    tools = [search,WikipediaQueryRun(api_wrapper=api_wrapper)]

    prompt = hub.pull("hwchase17/openai-tools-agent")
    agent = create_tool_calling_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)
    result = agent_executor.invoke({"input": question})

    return result["output"]
```