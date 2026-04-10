---
title: "Claude Code (Part 11)"
description: "ollama launch claude"
date: "2026-04-10"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "claude-code, ai-agent, anthropic, agentic-coding, ollama"
hidden: false
slug: "claudecode11"
---

Ollama added a `launch claude` command that starts Claude Code backed by a local model instead of the Anthropic API. I wanted to see how well it held up on a real task.

I ran the command to get started.

```PROMPT
ollama launch claude
```

![](assets/images/claudecode11/Screenshot-2026-04-10-at-11.59.22-AM.png)
*I ran `ollama launch claude` in the terminal*

A model selection menu appeared with a recommended list sorted by capability.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.00.50-PM.png)
*I saw the model picker — recommended models at the top, more options below*

I scrolled down to `qwen3-coder:30b` and selected it.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.01.34-PM.png)
*I selected qwen3-coder:30b from the list*

Claude Code launched immediately, showing the familiar welcome screen — but now routing through the local Ollama model rather than the API.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.02.01-PM.png)
*I saw Claude Code start up with qwen3-coder:30b as the backend*

I gave it a task.

```PROMPT
create a web page breakout game
```

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.02.36-PM.png)
*I typed the prompt to build a breakout game*

While it was running I checked Activity Monitor. Ollama was using 41.48 GB of memory to run the 30B model — essentially the whole machine.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.05.27-PM.png)
*I saw ollama consuming 41.48 GB RAM to run the model locally*

The model asked to create `breakout.html`.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.06.14-PM.png)
*I was asked to approve creating breakout.html — I clicked Yes*

It wrote 444 lines of HTML, CSS and JavaScript in one shot.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.07.14-PM.png)
*I watched it write 444 lines to breakout.html*

The completion summary listed score tracking, multiple levels, a lives system, game over and win screens, and responsive design. It took 3 minutes 40 seconds.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.07.49-PM.png)
*I read the summary — full feature set, cooked in 3m 40s*

The model then offered to open the page with a local server.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.08.25-PM.png)
*I was offered the option to open the game with a local server*

It ran `python3 -m http.server 8000` and asked for approval.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.08.41-PM.png)
*I approved running the HTTP server on port 8000*

The game opened in the browser — colourful brick grid, paddle, score and lives all present.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.11.08-PM.png)
*I saw the finished Breakout game ready to play*

I started playing. Score 60, two lives used, bricks already clearing.

![](assets/images/claudecode11/Screenshot-2026-04-10-at-12.12.09-PM.png)
*I played the game — score 60, bricks clearing nicely*

The quality was genuinely good. Running a 30B coder model locally through Ollama and Claude Code produced a working game with no iteration needed. The memory footprint is steep, but on a Mac Studio with 64 GB it was fine.

## References

- [Claude Code — Ollama integration docs](https://docs.ollama.com/integrations/claude-code)
- [Claude Code with Anthropic API compatibility — Ollama Blog](https://ollama.com/blog/claude)
- [Using Claude Code With Ollama Local Models — DataCamp](https://www.datacamp.com/tutorial/using-claude-code-with-ollama-local-models)
