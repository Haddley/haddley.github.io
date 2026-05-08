---
title: "Claude Code (Part 12)"
description: "deepseek api"
date: "2026-05-08"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "claude-code, ai-agent, anthropic, agentic-coding, deepseek"
hidden: false
slug: "claudecode12"
---

In [Part 11](/posts/claudecode11/) I used `ollama launch claude` to run Claude Code backed by a local model — qwen3-coder:30b running entirely on the Mac Studio, consuming 41 GB of RAM. It worked well, but it was slow (3m 40s for the breakout game) and pinned the machine while it ran.

This time I tried a different approach: pointing Claude Code at the DeepSeek API. DeepSeek exposes an Anthropic-compatible endpoint, so by setting three environment variables — `ANTHROPIC_BASE_URL`, `ANTHROPIC_API_KEY`, and `ANTHROPIC_MODEL` — Claude Code routes through DeepSeek's cloud models instead of either Anthropic's API or a local Ollama model. No RAM pressure, near-instant responses, and at a fraction of the cost: the whole session — 5 API requests and 114,235 tokens — came to less than $0.01.

The trade-off is that your prompts and code go to an external service rather than staying on-device. For a toy game that's fine — for sensitive codebases the local Ollama approach is the safer choice.

I started by creating a DeepSeek API key.

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.20.59-PM.png)
*I navigated to the DeepSeek platform API keys page — no keys existed yet*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.21.25-PM.png)
*I clicked "Create new API key" and entered a name for the key*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.22.43-PM.png)
*The new API key was created and listed on the page*

Then I exported the three environment variables and launched Claude Code.

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.27.39-PM.png)
*I exported the DeepSeek endpoint and API key as Anthropic environment variables, then ran Claude Code — it detected the custom API key and asked whether to use it*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.30.14-PM.png)
*Claude Code launched with the DeepSeek backend connected*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.30.44-PM.png)
*Claude Code prompted me to confirm use of the custom API key — I selected Yes*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.31.05-PM.png)
*Claude Code asked whether to apply its recommended terminal settings*

I used the same prompt as Part 11 to make it an easy comparison.

```PROMPT
create a web page breakout game
```

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.31.51-PM.png)
*I asked Claude Code to create a breakout game but got an API Error 402 — Insufficient Balance on the DeepSeek account*

The account had no credit yet, so I topped it up.

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.33.01-PM.png)
*I went to the DeepSeek Top Up page and selected $2 to add credit*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.38.04-PM.png)
*The payment went through successfully*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.39.08-PM.png)
*After topping up, I reran the prompt — Claude Code generated the breakout game HTML and CSS*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.39.30-PM.png)
*I right-clicked the file and chose Open with Live Server to preview it in the browser*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.42.35-PM.png)
*The breakout game loaded and ran in the browser — score 380, most bricks still in play*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-5.06.56-PM.png)
*The DeepSeek usage page showed the session cost less than $0.01 — 5 API requests and 114,235 tokens from a $2 top-up*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.49.10-PM.png)
*I asked Claude Code to review the game code — it identified several issues and suggested improvements*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.49.36-PM.png)
*Claude Code continued listing its recommended fixes for the game*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.51.14-PM.png)
*I opened the updated file with Live Server again to test the changes*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.55.16-PM.png)
*The improved game was nearly complete — score 660, only a handful of bricks remaining*

![](assets/images/claudecode12/Screenshot-2026-05-08-at-4.55.43-PM.png)
*I cleared all the bricks and won — final score 700*

## References

- [How to Run Claude Code Against DeepSeek V4 for $3 a Session (Step-by-Step)](https://www.mindstudio.ai/blog/run-claude-code-against-deepseek-v4-free-cloud-code-proxy)
