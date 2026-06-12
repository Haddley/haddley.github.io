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

The agent offers four model sizes, all quantised to 4-bit weights and cached in the browser after the first download. WebGPU is required, so it works in Chrome and Edge on GPU-enabled devices.

| Model | Download | Note |
|-------|----------|------|
| Qwen2.5-7B-Instruct-q4f16_1-MLC | ~4 GB | Best quality |
| Qwen2.5-3B-Instruct-q4f16_1-MLC | ~2 GB | Balanced |
| Qwen2.5-1.5B-Instruct-q4f16_1-MLC | ~1 GB | Fast |
| Qwen2.5-0.5B-Instruct-q4f16_1-MLC | ~500 MB | Tiny |

The 3B is the default — a good balance of speed and reliability for multi-step tool use. Larger models give better reasoning quality; the 0.5B and 1.5B are available for faster loads on lower-end hardware.

![](assets/images/localagent/Screenshot-2026-06-12-at-5.36.49-PM.png)
*The model selector showing all four options, with Qwen2.5 3B selected as the default*

## Architecture

The agent is a React component (`BlogAgent.tsx`) in the Next.js layout, so it appears on every page. Tool definitions and helper functions live in `agent-tools.ts`. Post metadata is pre-built at deploy time into `agent-data.json`, which the component fetches when the panel opens.

```typescript
const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
const engine = await CreateMLCEngine(
  selectedModel, // one of: 7B / 3B / 1.5B / 0.5B
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

## Model Quality

Smaller models trade reasoning quality for speed. I ran the same query — "Any Java related posts?" — against the 1.5B and 3B models to see the difference.

The **1.5B** called two tools back-to-back (`search_posts` then `get_posts_by_category`), then called `get_posts_by_category` twice more on the same arguments. The duplicate-call guard skipped those, the loop exhausted its round limit, and the nudge response came back empty — the agent failed to answer.

```
round 0 — search_posts {"query": "Java"}           ✓
round 1 — get_posts_by_category {"category": "Java"} (already had the data)
round 2 — get_posts_by_category {"category": "Java"} → skipping duplicate
round 3 — get_posts_by_category {"category": "Java"} → skipping duplicate
loop exhausted — final nudge → (empty)
```

The **3B** called `search_posts` once and produced a formatted answer on the very next round:

```
round 0 — search_posts {"query": "Java related"}   ✓
round 1 — text: "Here are the Java related posts: …"
```

The 3B is the default for this reason — it handles multi-step tool use reliably. The 0.5B and 1.5B are available for faster loads but may struggle on follow-up questions.

## References

- [WebLLM — In-browser LLM inference with WebGPU](https://github.com/mlc-ai/web-llm)
- [MLC AI — Machine Learning Compilation](https://mlc.ai)
- [Qwen2.5-7B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct)
- [Qwen2.5-3B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct)
- [Qwen2.5-1.5B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct)
- [Qwen2.5-0.5B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct)
- [WebGPU API — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
