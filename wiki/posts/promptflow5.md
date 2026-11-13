---
type: post
slug: promptflow5
title: "Prompt Flow (Part 5)"
date: "2024-09-01"
part: 5
builds_on: []
topics: [prompt-flow, langchain, docker-containers, ai-deployment]
tools: [Azure Prompt Flow, LangChain, Python, pip, DuckDuckGo, Docker]
status: current
checked: "2026-11-06"
source_hash: "2c9e6d9a4f49"
generated_by: gemma4:12b
---

**Summary.** I built and deployed an AI chat application using Azure Prompt Flow and LangChain. I discovered that the large language model could not provide real-time information without additional tools and integrated external components to improve the flow.

## What I did
- I created a Chat flow using the Prompt Flow extension.
- I configured a Python 3.12.4 virtual environment and installed necessary packages.
- I tested the flow and identified a limitation regarding up-to-date information.
- I integrated additional packages and explored the DuckDuckGo search tool.
- I built a Docker image and deployed it as a container to access the application.

## Claims
- I used Prompt Flow and LangChain to build the application.
  > "I used Prompt flow and LangChain to create and deploy an AI application."
- The large language model failed to provide an up-to-date answer during testing.
  > "The large language model was unable to provide an up-to-date answer*"
- I explored the use of the DuckDuckGo search tool.
  > "*I also explored using the DuckDuckGo search tool*"
- I successfully accessed the container using port 8080.
  > "*I was able to access the container using port 8080*"

## Outcome
I successfully built an AI chat application and deployed it as a containerized service. I also identified the need for external tools to provide real-time data.

## Caveats
The post does not detail the specific configuration of the OpenAI key used in the Docker container.
