---
type: post
slug: promptflow3
title: "Prompt Flow (Part 3)"
date: "2024-08-24"
part: 3
builds_on: []
topics: [semantic-kernel, prompt-flow, ai-agents, python-development]
tools: [Microsoft Semantic Kernel, Azure Prompt Flow, Python, OpenAI]
status: current
checked: "2026-11-06"
source_hash: "0f373f048dbb"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build a plugin-based AI agent that generates jokes using Microsoft Semantic Kernel. I integrate this functionality into an Azure Prompt Flow node to create a modular AI system.

## What I did
- I used Semantic Kernel to call a joke generation plugin.
- I configured the environment and managed API keys.
- I configured the model ID in the environment file.
- I registered the service and the plugin.
- I invoked the joke function with specific inputs.

## Claims
- I used an open-source development kit to build the agent.
  > "I used Semantic Kernel, an open-source development kit for building AI agents, to call a plugin that generates jokes."
- I configured the environment file to include the specific chat model ID.
  > "*I ensured that the .env file included an OPENAI_CHAT_MODEL_ID set to gpt-3.5-turbo*"
- I registered the service using the kernel method.
  > "*I called the kernel.add_service method*"
- I executed the joke function with an input and a style.
  > "*I added a Semantic Kernel pluginI invoked the joke_function with an input and a style*"

## Outcome
I built a plugin-based AI agent that generates jokes. I successfully integrated this agent into an Azure Prompt Flow node.

## Caveats
The post does not detail the specific internal logic of the joke generation algorithm.
