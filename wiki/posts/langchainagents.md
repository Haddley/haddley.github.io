---
type: post
slug: langchainagents
title: "LangChain Agents"
date: "2024-08-25"
builds_on: []
topics: [langchain-agents, llm-reasoning, tool-calling, python-environments]
tools: [LangChain, OpenAI, Wikipedia, DuckDuckGo, Python]
status: current
checked: "2026-11-05"
source_hash: "009ead62845b"
generated_by: gemma4:12b
---

**Summary.** I explain how LangChain agents use Large Language Models as reasoning engines to decide which tools to call and how to process their outputs. I demonstrate this by building two different agents that utilize Wikipedia, DuckDuckGo, and mathematical tools.

## What I did
- I defined the role of LLMs as reasoning engines for agentic workflows.
- I set up a local Python environment and configured the API keys.
- I built a first agent that utilized the Wikipedia tool.
- I built a second agent that combined DuckDuckGo and a math tool.
- I executed both agents with verbose logging to observe the reasoning process.

## Claims
- Agents use LLMs to determine actions and inputs.
  > "Agents are systems that use LLMs as reasoning engines to determine which actions to take and the inputs to pass them."
- LLM feedback determines if a task is finished.
  > "After executing actions, the results can be fed back into the LLM to determine whether more actions are needed, or whether it is okay to finish."
- I built an agent using Wikipedia.
  > "I created a LangChain Agent that used Wikipedia"
- I built an agent using DuckDuckGo and a math tool.
  > "I created a LangChain Agent that used DuckDuckGo and a Maths tool"

## Outcome
I built two functional LangChain agents that demonstrate how LLMs can autonomously navigate tools to complete tasks.

## Caveats
The post does not detail the specific internal logic of the math tool's calculation steps.
