---
type: post
slug: claudecode3
title: "Claude Code (Part 3)"
date: "2026-01-21"
part: 3
builds_on: []
topics: [context-management, claude-code, prompt-engineering, session-control]
tools: [Claude Code, CLAUDE.md]
status: current
checked: "2026-11-05"
source_hash: "3bdc2e13477c"
generated_by: gemma4:12b
---

**Summary.** I explain how to manage the context window in Claude Code to maintain accuracy during long sessions. I demonstrate three specific tools—ESC ESC, /compact, and /clear—to control conversation history and focus the model.

## What I did
- I identified the components that make up the context window.
- I demonstrated how to use the rewind menu to backtrack.
- I showed how to use /compact to condense history.
- I demonstrated how to use /clear to start fresh.
- I established a workflow for choosing the right tool for each situation.

## Claims
- Context includes conversation history, loaded files, and persistent instructions.
  > "Context is the working information Claude Code can see during a session — the conversation history, any files I've loaded with `@`, and the persistent instructions in `CLAUDE.md`."
- Good context management keeps the model accurate and on-task.
  > "Managing context well is key to keeping Claude accurate and on-task across a long session."
- The rewind menu allows me to restore the session to a previous state.
  > "I can select any checkpoint to restore the session to that state — useful when Claude goes in the wrong direction and I want to try a different approach without re-typing everything."
- The /compact command frees up space while retaining key facts.
  > "Running `/compact` summarises the conversation so far into a compact digest, freeing up space for new work without losing the key facts."
- The /clear command prevents older conversation details from bleeding into new tasks.
  > "This avoids earlier conversation bleeding into unrelated work."
- I use /compact for long sessions and /clear for new topics.
  > "In practice I use `/compact` to stay within a long session and `/clear` when switching topics entirely."

## Outcome
I established a systematic way to manage Claude Code's context window to ensure accuracy. I determined that the best approach is to use specific commands based on whether I am refining a current task or starting a new one.

## Caveats
The post does not specify the exact character limit of the context window or the specific logic used by the /compact command to select which facts to keep.
