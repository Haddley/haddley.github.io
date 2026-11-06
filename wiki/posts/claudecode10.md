---
type: post
slug: claudecode10
title: "Claude Code (Part 10)"
date: "2026-03-18"
part: 10
builds_on: []
topics: [ai-agents, dynamics-365, vercel-ai-sdk, tool-calling, llm-orchestration]
tools: [Ollama, Vercel AI SDK, Dynamics 365, Zod, Qwen]
status: current
checked: "2026-11-05"
source_hash: "c6814593a385"
generated_by: gemma4:12b
---

**Summary.** I walk through the end-to-end workflow of an AI agent designed for Dynamics 365 Sales Professional. I explain how the system processes user messages, executes tool calls server-side, and manages multi-step agentic logic.

## What I did
- I integrated the Qwen3:30b model via Ollama to power the chat interface.
- I implemented the Vercel AI SDK to handle streaming responses and tool execution.
- I configured the system to allow the model to chain up to five agentic steps.
- I mapped the tool execution flow from the LLM request to the Dynamics 365 Dataverse Web API.

## Claims
- The system uses a local Qwen3:30b model via an OpenAI-compatible API.
  > "Model: Qwen3:30b running locally via Ollama (http://localhost:11434)"
- The model can perform up to five consecutive steps to complete a task.
  > "`stopWhen: stepCountIs(5)` allows up to 5 agentic steps per user message."
- The model can chain multiple tool calls without additional user prompts.
  > "This means the model can chain tool calls — e.g. search for a contact, then update it — without the user needing to prompt again between steps."
- The LLM never interacts with the Dynamics system directly because execution happens on the server.
  > "Tool execution happens server-side in the API route — the LLM never touches Dynamics directly."
- The system uses Zod schemas to validate the JSON output from the LLM.
  > "**inputSchema** — a Zod schema that defines the exact JSON shape the LLM must produce when calling it."
- The tool result is added to the conversation history before the LLM generates a final response.
  > "The tool result (the new contact object) is appended to the conversation as a tool message."

## Outcome
I built an AI agent that can autonomously perform complex tasks like searching and updating records in Dynamics 365. The system successfully manages tool-calling logic and multi-step reasoning to assist sales professionals.

## Caveats
The post does not detail the specific prompt engineering used to define the persona of the CRM assistant.
