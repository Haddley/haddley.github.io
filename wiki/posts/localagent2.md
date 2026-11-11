---
type: post
slug: localagent2
title: "Blog AI Assistant (Part 2)"
date: "2026-11-06"
part: 2
builds_on: ["localagent"]
topics: ["llm-gatekeeping", "agentic-workflows", "context-management", "automated-content-pipelines"]
tools: ["Ollama", "Qwen", "Caddy", "Node.js", "YAML"]
status: current
checked: "2026-11-06"
source_hash: "0d3bdbff7250"
generated_by: gemma4:12b
---

**Summary.** I describe the architecture and implementation of a local agent that serves as a chat assistant for my blog. The system uses a gatekeeper to protect a hosted model, a browser-based loop to handle tool execution, and a custom-built wiki to provide context.

## What I did
- I rebuilt the chat backend to use a single fixed model with a gatekeeper.
- I implemented a browser-side loop to handle tool calls and data fetching.
- I created a structured wiki to provide the model with accurate context.
- I configured the gatekeeper to manage security, rate limits, and model parameters.
- I automated the wiki generation and auditing process.

## Claims
- The model does not search the blog directly but relies on a browser-side script to fetch data.
  > "It asks, my code in the browser does the work, and the answer goes back."
- The gatekeeper protects the model by only allowing specific paths and enforcing limits.
  > "**Gatekeeper:** Then I send back a 429 and tell you how many seconds to wait."
- The system uses a custom wiki to ensure the model provides accurate quotes from the text.
  > "The quote is the post's own text by construction, not by the model's good behaviour."
- I set the context length to 16,384 to prevent the model from dropping the system prompt.
  > "I changed the setting there, stopped the app properly (the first restart left the old process running), started it again, and `ollama ps` finally showed 16,384."
- The gatekeeper filters out reasoning fields to ensure the assistant provides direct answers.
  > "The gatekeeper now asks Ollama for no reasoning by default."
- The audit process ensures that the wiki remains in sync with the blog content.
  > "The audit also runs in the deploy workflow, so an edit that removes a sentence the wiki quotes stops the build and names the page."

## Outcome
I built a robust, secure chat assistant that provides accurate information about my blog content using a local model and a structured wiki.

## Caveats
The system relies on the model following tool instructions, which is not guaranteed and requires guard rails in the loop.
