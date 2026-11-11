---
type: post
slug: localagent
title: "Blog AI Assistant"
date: "2026-06-14"
builds_on: []
topics: [webllm, webgpu, ollama, agent-loop, prompt-based-tool-calling, quantisation]
tools: [WebLLM, Ollama, Qwen, React, Jina]
status: partly-outdated
checked: "2026-11-06"
---

**Summary.** The 💬 assistant on this blog runs an agent loop in the visitor's browser, with tools over the post data, and with two interchangeable model backends: WebLLM in the browser, or a hosted Ollama server.

## What I did
- Built the assistant as a React component mounted in the layout, with six tools.
- Added WebLLM (Qwen2.5, 4-bit quantised) and a hosted Ollama backend (Qwen3.5).
- Tested small models and recorded how they fail.

## Claims
- Tool calling is done by prompting, not by a native API.
  > "Because WebLLM's native tools API only supports a fixed set of Hermes models, I implemented function calling via prompt engineering"
- Post metadata is built at deploy time and fetched when the panel opens.
  > "Post metadata is pre-built at deploy time into agent-data.json, which the component fetches when the panel first opens."
- The 1.5B model failed a simple category question; the 3B did not.
  > "called tools redundantly, hit the round limit, and returned an empty response"
  > "The 3B handles multi-step tool use reliably."
- A 27B model was too slow for live chat, so 9B is the ceiling.
  > "27B was the original plan, and it downloads and runs fine directly on the server — but through this chat widget, a one-word reply took over three minutes and I gave up waiting."
- WebGPU can lose its context on some hardware, and the hosted backend avoids it.
  > "The only reliable fix on that hardware is to switch to the Hosted backend, which bypasses WebGPU entirely and runs natively on my server instead."

## Outcome
A working agent over the blog's own posts, with the model choice, the loop and the tools all in the browser.

## Caveats
Partly outdated since November 2026. The post describes visitors choosing between WebLLM sizes and four hosted sizes, and the browser calling the hosted Ollama server directly with a site key. The site now has one fixed hosted model (Qwen3.5 9B), served through a backend that rate-limits and never exposes Ollama. The tool list, the loop and the quantisation discussion are still accurate.
