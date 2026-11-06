---
type: post
slug: azurefoundryagent4
title: "Azure Foundry Agent (Part 3)"
date: "2026-10-28"
part: 3
builds_on: [azurefoundryagent2, azurefoundryagent3]
topics: [azure-functions, mcp-servers, voice-agents, microsoft-foundry, prompt-engineering]
tools: [Microsoft Foundry, Azure Functions, Python SDK, Azure Developer CLI, Azurite, Azure AI Search]
status: current
checked: "2026-11-05"
source_hash: "47eebba05a8c"
generated_by: gemma4:12b
---

**Summary.** I build a voice agent for legal intake using a Microsoft Foundry template and an Azure Functions MCP server. I test the system with a simulated car accident call to ensure the agent follows specific telephony instructions and saves data correctly.

## What I did
- I created a voice agent using the Legal intake specialist template in Microsoft Foundry.
- I built an MCP server on Azure Functions to provide a tool for saving intake records.
- I configured the agent with specific instructions for phone-based interactions.
- I tested the agent with a fictional caller to verify its behavior and data persistence.

## Claims
- The agent follows specific instructions for phone calls like reading back details and asking for spelling.
  > "This is the behaviour the Tone section asks for, and it worked every time."
- The agent successfully saves data to a blob container when using the MCP tool.
  > "The function wrote a file to the `intakes` container."
- The agent correctly identifies and leaves fields empty when information is missing.
  > "**It left fields empty.** I never gave an email, police report or insurance, and the agent wrote nothing for them and listed them as open questions."
- The agent follows safety guardrails and refuses to answer prohibited questions.
  > "Both rules from the Guardrails section held."
- The Azure Functions MCP extension simplifies the process of turning a Python function into a tool.
  > "I chose an Azure Function, because the Functions MCP extension turns a Python function into an MCP tool with one decorator."
- The agent's behavior changes significantly when designed for a phone call instead of a chat window.
  > "**Voice changes the design.** Words for numbers, short turns, read-backs and spelling all come from the caller having no screen."

## Outcome
I built a functional voice agent that can conduct a legal intake call and save the resulting data to Azure storage. I concluded that an MCP server on Azure Functions is an effective way to provide tools to a voice agent.

## Caveats
I did not measure the cost of the voice sessions or the Azure Function usage.
