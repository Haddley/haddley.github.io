---
type: post
slug: promptflow1
title: "Prompt Flow (Part 1)"
date: "2024-06-11"
part: 1
builds_on: [llamacorp]
topics: [prompt-flow, visual-studio-code, python-environments, llm-integration]
tools: [Prompt Flow, Visual Studio Code, Python, LangChain, OpenAI]
status: current
checked: "2026-11-06"
source_hash: "8850fcb2cfeb"
generated_by: gemma4:12b
---

**Summary.** I explore how to set up and run AI applications using Prompt Flow in Visual Studio Code. I compare the experience of using Prompt Flow to the workflow I previously used with LangChain.

## What I did
- I installed Python and the Prompt flow extension in VS Code.
- I created a virtual environment and installed the necessary dependencies.
- I configured a new flow and established an OpenAI connection.
- I tested the flow in both standard and interactive modes.

## Claims
- The results from Prompt Flow are similar to those from LangChain.
  > "The result is not very different from AI applications I have developed in the past using langchain."
- I installed the specific version of Python for macOS.
  > "*I installed Python 3.12.4 for macOS*"
- I used a specific command to activate the environment and install dependencies.
  > "*I used source .venv/bin/activate to activate the environmentI used pip install promptflow to add the promptflow dependencies*"
- I verified the installed version of Prompt flow.
  > "*I ran pf -v to see what version of Prompt flow was installed*"
- I used a new OpenAI key to establish a connection.
  > "*I generated a new Open AI key and used it to create a Prompt flow connection*"
- I tested the flow using interactive multi-modal mode.
  > "*I ran the Prompt flow with interactive mode (multi-modal)*"

## Outcome
I built a functional AI application using Prompt Flow and verified that it produces results comparable to LangChain.

## Caveats
The post does not provide a detailed technical comparison of the underlying architecture between Prompt Flow and LangChain.
