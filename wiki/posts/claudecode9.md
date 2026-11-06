---
type: post
slug: claudecode9
title: "Claude Code (Part 9)"
date: "2026-02-22"
part: 9
builds_on: []
topics: [ai-agents, llm-tool-calling, streaming-interfaces, recursive-development]
tools: [Claude Code, Next.js, TypeScript, Tailwind, Ollama]
status: current
checked: "2026-11-05"
source_hash: "7eb10c530a6a"
generated_by: gemma4:12b
---

**Summary.** I built a local AI coding agent using Claude Code to demonstrate recursive AI development. The process involved creating a multi-interface system that supports custom project instructions and handles various model output formats.

## What I did
- Defined a tech stack including Next.js, TypeScript, and Ollama.
- Developed a web UI and a CLI for the agent.
- Implemented support for AGENT.md project instructions.
- Built a robust tool-calling system to handle different model capabilities.
- Implemented a streaming mechanism for smooth user interface updates.

## Claims
- I used Claude Code to build a local AI coding agent.
  > "In a twist of recursive thinking, I built a local AI coding agent using Claude Code, another AI coding agent."
- The system includes both a three-column web UI and a CLI.
  > "I started with a single prompt to define the tech stack (Next.js 15, TypeScript, Tailwind, and Ollama with qwen2.5-coder:7b) and built up to a full implementation with a three-column web UI and a CLI."
- I added support for project-specific instructions via an AGENT.md file.
  > "*I asked Claude Code to add AGENT.md support to the agent*"
- The system handles tool calls from models that do not support native function calling.
  > "Models that don't support native function calling may embed JSON in their text response instead."
- The system uses a bracket scanner to parse embedded JSON objects.
  > "Uses a bracket scanner for partial/embedded JSON objects."
- The system uses an artificial delay to create a smooth streaming feel in the UI.
  > "It is broken into 40-character chunks and emitted with a 10 ms artificial delay to give the UI a smooth streaming feel."

## Outcome
I built a fully functional AI coding agent with a web UI and CLI that supports custom instructions and diverse model outputs.

## Caveats
The post does not detail the specific logic for the `extractTextToolCalls` function beyond its ability to handle fallback scenarios.
