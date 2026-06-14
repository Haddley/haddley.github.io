---
title: "Local Agent"
description: "Creating an Agent for this blog site using a Local LLM model"
date: "2026-06-12"
categories: ["AI"]
image: "/assets/images/localagent/webllm-local-agent.svg"
tags: "webllm, webgpu, qwen, react, agents, ollama"
hidden: false
slug: "localagent"
---

# Adding a Local AI Agent to This Blog

I’ve added a conversational AI assistant to this blog — you’ll see the chat bubble in the bottom-right corner of every page. It works entirely in your browser, with no backend and no API fees, using WebLLM to run a quantized Qwen2.5 model locally via [WebLLM](https://github.com/mlc-ai/web-llm). A modern GPU is required for good performance: on an M-series Mac or a recent dedicated GPU, responses take just a few seconds; on older or integrated graphics, it will be noticeably slower.


## Model

The agent supports two backends: **WebLLM** (runs entirely in the browser via WebGPU) and **Ollama** (a local server running on native hardware). The WebLLM models are quantised to 4-bit weights and cached in the browser after the first download. WebGPU is required for WebLLM, so it works in Chrome and Edge on GPU-enabled devices.

**WebLLM models**

| Model | Download | Note |
|-------|----------|------|
| Qwen2.5-7B-Instruct-q4f16_1-MLC | ~4 GB | Best quality |
| Qwen2.5-3B-Instruct-q4f16_1-MLC | ~2 GB | Balanced |
| Qwen2.5-1.5B-Instruct-q4f16_1-MLC | ~1 GB | Fast |

**Ollama models**

| Model | Note |
|-------|------|
| qwen3.5:0.8b | Fastest · Ollama |
| qwen3.5:2b | Fast · Ollama |
| qwen3.5:4b | Balanced · Ollama |
| qwen3.5:9b | Good quality · Ollama |
| qwen3.5:27b | Best quality · Ollama |

The WebLLM 1.5B is the default — a fast browser download and a reasonable starting point. Larger models give better reasoning quality and more reliable multi-step tool use.

![](assets/images/localagent/Screenshot-2026-06-12-at-5.36.49-PM.png)
*The model selector showing all three options, with Qwen2.5 1.5B selected as the default*

## Ollama Option

As an alternative to WebLLM, the agent also supports [Ollama](https://ollama.com) — a local model server that runs on native hardware rather than in the browser. Instead of downloading a model into the browser's GPU memory, Ollama runs as a background process and exposes an OpenAI-compatible API at `http://localhost:11434`.

### Installing Ollama

I installed Ollama with Homebrew:

```bash
brew install ollama
```

Then I started the server:

```bash
ollama serve
```

And pulled a model to use with the agent:

```bash
ollama pull qwen3.5:4b
```

I started with 4B as a reasonable balance of quality and speed. All five Qwen3.5 sizes are listed in the model table above.

### CORS Configuration

The live blog is served over HTTPS from `haddley.github.io`. By default Ollama only accepts requests from `localhost`, so I needed to add the blog's origin before the browser could reach it:

```bash
OLLAMA_ORIGINS=https://haddley.github.io ollama serve
```

Without this the browser blocks the request with a CORS error. When running the site locally at `http://localhost:3000` no extra configuration is needed — that origin is allowed by default.

### WebLLM vs Ollama

| | WebLLM | Ollama |
|---|---|---|
| **Setup** | None — loads in the browser | Install Ollama, pull a model, configure CORS |
| **Browser support** | Chrome / Edge with WebGPU | Any browser |
| **Model sizes** | Up to 7B (browser VRAM limits) | Up to 27B (Qwen3.5) |
| **Inference speed** | Depends on GPU via WebGPU | Native — generally faster |
| **Works for visitors** | Yes | Only if they have Ollama running |
| **Model storage** | Browser cache (per device) | Local disk, shared across apps |

WebLLM is better for visitors to the public site — it just works with no software to install. Ollama is better when running the site locally or if you already have it set up, giving access to larger, faster models without the browser download.

## Why Quantization?

Running a language model in the browser means working within tight constraints: limited GPU VRAM, no server to offload to, and a download that has to complete before the first response. Quantization is what makes this feasible.

A standard Qwen2.5-7B model in 16-bit precision weighs around 14 GB. Most consumer GPUs don't have that much VRAM, and browsers impose their own caps on top of that. The quantized version — 4-bit weights — brings it down to ~4 GB, small enough to fit in GPU memory on a mid-range device and cacheable in the browser after the first load.

| Model | FP16 (full) | q4f16_1 (quantized) |
|-------|-------------|---------------------|
| 7B | ~14 GB | ~4 GB |
| 3B | ~6 GB | ~2 GB |
| 1.5B | ~3 GB | ~1 GB |

WebLLM only supports its own pre-compiled MLC model variants — you can't load an arbitrary Hugging Face checkpoint directly. The MLC compilation step converts the model to run on WebGPU and bakes in the quantization, so the quantized format isn't optional; it's a requirement of the platform.

The quality tradeoff is minimal. At q4f16_1, benchmark scores typically drop by around 1–2% compared to full precision. For a blog assistant doing search and summarisation, the difference is unnoticeable in practice.

## Architecture

The agent is a React component (`BlogAgent.tsx`) in the Next.js layout, so it appears on every page. Tool definitions and helper functions live in `agent-tools.ts`. Post metadata is pre-built at deploy time into `agent-data.json`, which the component fetches when the panel opens.

```typescript
const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
const engine = await CreateMLCEngine(
  selectedModel, // one of: 7B / 3B / 1.5B
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

The 3B handles multi-step tool use reliably. The 1.5B is the default — smaller and faster to load — but may struggle on follow-up questions.

## References

- [WebLLM — In-browser LLM inference with WebGPU](https://github.com/mlc-ai/web-llm)
- [MLC AI — Machine Learning Compilation](https://mlc.ai)
- [Qwen2.5-7B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct)
- [Qwen2.5-3B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-3B-Instruct)
- [Qwen2.5-1.5B-Instruct on Hugging Face](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct)
- [WebGPU API — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
