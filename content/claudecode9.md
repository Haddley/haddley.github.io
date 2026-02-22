---
title: "Claude Code (Part 9)"
description: "Using an AI coding agent to create an AI coding agent"
date: "2026-02-22"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode9"
---

In a twist of recursive thinking, I built a local AI coding agent — inspired by Open Hands — using Claude Code, another AI coding agent. I started with a single prompt to define the tech stack (Next.js 15, TypeScript, Tailwind, and Ollama with qwen2.5-coder:7b) and built up to a full implementation with a three-column web UI and a CLI. Along the way I worked through file trees, chat interfaces, and project-specific instructions via AGENT.md — and ended up with a fully functional AI coding agent, built by an AI coding agent.

```prompt
Build a lightweight, local AI coding agent (inspired by Open Hands) with a browser UI and a CLI. The agent uses Ollama (default model `qwen2.5-coder:7b`)

## Tech Stack
- **Next.js 15** (App Router) + TypeScript + Tailwind CSS for UI
- **CLI**: TypeScript, run with `tsx`
- **LLM**: Ollama (URL configurable)

## Web UI (Three‑Column Layout)
- **Left sidebar (224px)**: File tree (depth 4, ignores blacklisted dirs).
- **Center**: File viewer.
- **Right sidebar (384px)**: Chat panel with SSE‑streamed agent responses, expandable tool call badges, model selector (only tool‑capable models enabled).
- **Workspace**: Folder picker (path saved to localStorage); validated on next load.

Do you have any questions?
```

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-2.53.52-PM.png)
*Claude asked which tools the agent should be able to call*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-2.54.09-PM.png)
*Claude asked whether the center file viewer should be editable*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-2.54.46-PM.png)
*Claude asked what the CLI should do*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-2.56.11-PM.png)
*I approved all edits for the session*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.12.56-PM.png)
*The build completed successfully*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.13.26-PM.png)
*The application was running in the browser*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.13.42-PM.png)
*The app prompted me to select a workspace folder*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.15.25-PM.png)
*I asked the agent to write a bash script that prints 'hello world!'*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.15.51-PM.png)
*The model suggested invoking the write_file tool, but nothing happened*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.17.10-PM.png)
*I asked Claude Code to troubleshoot the issue*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.18.56-PM.png)
*Claude Code diagnosed the problem*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.19.25-PM.png)
*Claude Code updated the application*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.21.35-PM.png)
*I tested the fix by asking the agent to write hello.sh again*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.28.10-PM.png)
*I asked the agent to modify hello.sh to accept a name argument*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.35.03-PM.png)
*I asked the agent to run hello.sh with argument 'Neil'*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.38.15-PM.png)
*I ran /init to generate a CLAUDE.md file*

```prompt
If AGENT.md present in workspace root, append (≤10k chars) to system prompt as `## Project instructions`.
```

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.38.51-PM.png)
*I asked Claude Code to add AGENT.md support to the agent*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.39.52-PM.png)
*Claude Code added support for AGENT.md*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.41.37-PM.png)
*I created an example AGENT.md file in the workspace*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-3.42.58-PM.png)
*I asked the agent to create goodbye.sh using the AGENT.md project instructions*

```prompt
## User Interface – Center Column (Split View)
The center column is divided into two resizable sections:

- **Top – File Viewer**: Displays the content of the selected file (read‑only). Its height shrinks when the terminal panel is opened.
- **Bottom – Terminal Panel**: A collapsible panel (default height 260px) that can be expanded or hidden via a 26‑px toggle bar (▸ Terminal) at the very bottom of the UI.

### Terminal Panel Features
- **Command Execution**: Runs shell commands via `spawn('sh', ['-c', ...])`, streaming real‑time output over SSE (`/api/terminal`).
- **Color‑Coded Output**:
  - `$` command – blue
  - stdout – white
  - stderr – red
  - system messages (e.g., "Command killed") – grey italic
- **Command History**: Navigate with up/down arrows (deduplicated, capped at 100 entries).
- **Process Control**:
  - **Kill button** – sends abort signal via `AbortController` (also responds to Ctrl+C).
  - **Clear button** – resets the output display.
```

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-4.37.04-PM.png)
*I described the terminal panel feature to Claude Code*

![](/assets/images/claudecode9/Screenshot-2026-02-22-at-4.33.13-PM.png)
*The terminal panel was running in the browser*

# `runAgent` — Function Documentation

**File:** src/lib/agent.ts

## Signature

```typescript
export async function runAgent(
  messages: Message[],
  model: string,
  workspace: string,
  ollamaUrl = DEFAULT_OLLAMA_URL,   // default: "http://localhost:11434"
  emit: (event: SSEEvent) => void,
): Promise<void>
```

## Purpose

Runs the agentic loop for a single conversation turn. It sends messages to an Ollama model, executes any tool calls the model requests, and feeds results back until the model produces a final text response. Results are delivered incrementally via the `emit` callback rather than returned — this keeps the function transport-agnostic (it is used by both the HTTP SSE route and the CLI).

## Parameters

| Parameter | Description |
|-----------|-------------|
| `messages: Message[]` | Conversation history from the caller (user/assistant turns). |
| `model: string` | Ollama model name, e.g. `"qwen2.5-coder:7b"`. |
| `workspace: string` | Absolute path to the workspace directory. Passed to every tool call and used to load `AGENT.md`. |
| `ollamaUrl: string` | Base URL of the Ollama instance. Defaults to `http://localhost:11434`. |
| `emit: (event: SSEEvent) => void` | Callback invoked for every observable event (text chunks, tool calls, errors, done). |

## SSE Events Emitted

| `type` | When | Key fields |
|--------|------|------------|
| `text` | Model produces output text (streamed in ~40-char chunks) | `content: string` |
| `tool_call` | Before a tool is executed | `id`, `name`, `args` |
| `tool_result` | After a tool returns | `id`, `name`, `result` |
| `error` | Ollama request fails or streaming throws | `message: string` |
| `done` | Loop exits normally | — |

## How It Works

### 1. History initialisation

```
system prompt (base rules + optional AGENT.md content)
  └─ buildSystemPrompt(workspace) reads AGENT.md from workspace root,
     appends it under "## Project instructions" (capped at 10 000 chars)
incoming messages (user / assistant turns)
```

### 2. The loop (max `MAX_TOOL_ITERATIONS` = 20 iterations)

```
┌─────────────────────────────────────────────────────────┐
│  chat(ollamaUrl, model, history, TOOL_DEFINITIONS)       │  non-streaming
│    → response.message                                    │
└────────────────────────┬────────────────────────────────┘
                         │
          ┌──────────────▼──────────────┐
          │ tool_calls present?          │
          └──────┬──────────────┬───────┘
                NO              YES
                │               │
                ▼               ▼
         ┌─────────┐    ┌─────────────────────────────┐
         │ Final   │    │ For each tool call:          │
         │ response│    │  emit tool_call              │
         │ path    │    │  dispatchTool(workspace, …)  │
         └────┬────┘    │  emit tool_result            │
              │         │  push result into history    │
              │         └──────────────┬──────────────┘
              │                        │ loop ──────────────►
              ▼
  textContent non-empty?
      YES → chunk & emit (simulate streaming, 10 ms delay)
      NO  → chatStream() for true streaming from Ollama
  emit done
```

### 3. Tool call resolution (native vs. text fallback)

Ollama models on the `TOOL_CAPABLE_PREFIXES` list return tool calls in the structured `message.tool_calls` field. Models that don't support native function calling may embed JSON in their text response instead. `extractTextToolCalls()` (`src/lib/parseToolCalls.ts`) handles the fallback:

1. Scans for markdown code fences containing JSON.
2. Tries to parse the entire string as JSON.
3. Uses a bracket scanner for partial/embedded JSON objects.

When the fallback fires, `msg.tool_calls` and `msg.content` are normalised before being pushed to history so that subsequent turns remain consistent.

### 4. Available tools

Defined in `TOOL_DEFINITIONS` (`src/lib/tools.ts`) and dispatched via `dispatchTool`:

| Tool name | What it does | Key limits |
|-----------|-------------|------------|
| `read_file` | Reads a workspace file, returns content with line numbers | Path traversal blocked by `resolveSafe()` |
| `write_file` | Creates or overwrites a file; creates parent dirs | Sets `0o755` for `.sh`, `.py`, etc. |
| `run_command` | Runs a shell command via `exec` in the workspace dir | 30 s timeout, 1 MB output buffer |
| `search_files` | `grep -r -n` across the workspace | Up to 100 matches |

### 5. Final response delivery

After the last tool round-trip the model should produce a plain text response (no further tool calls). Two paths:

- **`textContent` is set** — the non-streaming `chat()` call already has the full text. It is broken into 40-character chunks and emitted with a 10 ms artificial delay to give the UI a smooth streaming feel.
- **`textContent` is empty** — the model returned an empty content body (some Ollama models do this). A second, streaming `chatStream()` call is made and each chunk is forwarded directly.

## References

- [Welcome to OpenHands, a community focused on AI-driven development](https://docs.openhands.dev/overview/introduction)
