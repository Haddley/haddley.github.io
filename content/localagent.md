---
title: "Local Agent"
description: "Creating an Agent for this blog site using a Local LLM model"
date: "2026-06-12"
categories: ["AI"]
image: "/assets/images/localagent/webllm-local-agent.svg"
tags: "webllm, webgpu, qwen, react, agents"
hidden: false
slug: "localagent"
---

# Adding a Local AI Agent to This Blog

I’ve added a conversational AI assistant to this blog — you’ll see the chat bubble in the bottom-right corner of every page. It works entirely in your browser, with no backend and no API fees, using WebLLM to run a quantized Qwen2.5 model locally via [WebLLM](https://github.com/mlc-ai/web-llm). A modern GPU is required for good performance: on an M-series Mac or a recent dedicated GPU, responses take just a few seconds; on older or integrated graphics, it will be noticeably slower.


## Model

I used **Qwen2.5-7B-Instruct-q4f16_1-MLC** — Alibaba's Qwen2.5 7B Instruct model, quantised to 4-bit weights. The weights are about 4 GB, downloaded once and cached in the browser. WebGPU is required, so it works in Chrome and Edge on GPU-enabled devices.

## Architecture

The agent is a React component (`BlogAgent.tsx`) in the Next.js layout, so it appears on every page. Tool definitions and helper functions live in `agent-tools.ts`. Post metadata is pre-built at deploy time into `agent-data.json`, which the component fetches when the panel opens.

```typescript
const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
const engine = await CreateMLCEngine(
  'Qwen2.5-7B-Instruct-q4f16_1-MLC',
  { initProgressCallback: ({ progress, text }) => setLoadState(...) },
  { context_window_size: 8192 },
);
```

![](assets/images/localagent/Screenshot-2026-06-12-at-12.20.46-PM.png)
*The Blog AI Assistant panel opened for the first time, loading the model from the browser cache*

The agent has six tools:

| Tool | What it does |
|------|-------------|
| `search_posts` | Keyword search across titles, descriptions, and tags |
| `get_posts_by_category` | All posts in a named category (up to 10) |
| `list_categories` | All categories ranked by post count |
| `get_post_content` | Full content of a specific post — only when the user asks for a summary or details |
| `navigate_to_post` | Push the browser to a post via the Next.js router |
| `web_search` | Live web search via Jina AI — last resort for topics not covered by the blog |

![](assets/images/localagent/Screenshot-2026-06-12-at-12.26.11-PM.png)
*I asked "Any Java related posts?" and the agent called get_posts_by_category*

![](assets/images/localagent/Screenshot-2026-06-12-at-12.26.50-PM.png)
*The agent returned links to all six Java Spring Boot posts*

![](assets/images/localagent/Screenshot-2026-06-12-at-12.27.31-PM.png)
*I followed up asking the difference between Java and JavaScript — the agent used web_search*

![](assets/images/localagent/Screenshot-2026-06-12-at-12.29.31-PM.png)
*The agent answered using the web search results*

## The Agent Loop

Each conversation turn is a list of messages. The user sends a message; the model replies either with text (finished) or with a `tool_calls` response naming a function to run. The tool result is appended as a `role: 'tool'` message, and the model is called again. This repeats until the model stops calling tools and produces a text answer.

Because WebLLM's native tools API only supports a fixed set of Hermes models, I implemented function calling via prompt engineering. Tool definitions are injected into a system message as JSON inside `<tools>` tags. When the model needs to call a tool it outputs a `<tool_call>` block; the component parses that, executes the tool, and feeds the result back as a `<tool_response>` user message. The loop repeats until the model produces a plain-text answer with no tool calls.

![](assets/images/localagent/Screenshot-2026-06-12-at-12.36.05-PM.png)
*On a post page I asked the agent to summarise — it called get_post_content with the current slug*

![](assets/images/localagent/Screenshot-2026-06-12-at-12.38.33-PM.png)
*The agent summarised the post content*

![](assets/images/localagent/Screenshot-2026-06-12-at-1.32.52-PM.png)
*I clicked "Summarise all Phaser posts" from a Java post page and the agent searched and returned summaries of each one*

## References

- [WebLLM — In-browser LLM inference with WebGPU](https://github.com/mlc-ai/web-llm)
- [MLC AI — Machine Learning Compilation](https://mlc.ai)
- [Qwen2.5-7B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct)
- [WebGPU API — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
