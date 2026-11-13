---
type: post
slug: claudecode6
title: "Claude Code (Part 6)"
date: "2026-01-21"
part: 6
builds_on: []
topics: [slash-commands, context-management, powershell-development, workflow-automation]
tools: [Claude Code, PowerShell, Pester]
status: current
checked: "2026-11-05"
source_hash: "e61710d0a398"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use custom slash commands to bundle project-specific context and workflows into single shortcuts. This method eliminates the need to repeat project rules and structures at the start of every session.

## What I did
- I created a custom slash command to package project knowledge.
- I stored the command as a Markdown file in the .claude/commands/ directory.
- I defined specific PowerShell project rules and conventions in the file.
- I invoked the command to load context automatically.
- I verified that Claude followed the specific project rules during a task.

## Claims
- Custom slash commands bundle project-specific knowledge into a single shortcut.
  > "Custom slash commands let me package project-specific knowledge and workflows into a single shortcut."
- A custom slash command is a Markdown file stored in a specific directory.
  > "A custom slash command is a Markdown file stored in `.claude/commands/`."
- The command taught Claude how to guide itself within the project.
  > "The command effectively inverted the workflow — instead of me guiding Claude, the command taught Claude how to guide itself within the project."
- New sessions start with full context and no repetition.
  > "New sessions start with full context, no repetition required."

## Outcome
I built a system where custom slash commands provide Claude with immediate project context. This inverted the workflow so that the commands guide the AI instead of me guiding the AI.

## Caveats
The post does not show the specific internal logic Claude uses to parse the Markdown files.
