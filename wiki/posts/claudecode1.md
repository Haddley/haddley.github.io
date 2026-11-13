---
type: post
slug: claudecode1
title: "Claude Code (Part 1)"
date: "2026-01-20"
part: 1
builds_on: []
topics: [agentic-cli, terminal-tools, ai-assisted-coding, vscode-integration]
tools: [Claude Code, Anthropic, PowerShell, VS Code]
status: current
checked: "2026-11-05"
source_hash: "ab6446bdd3e5"
generated_by: gemma4:12b
---

**Summary.** I introduce Claude Code, an agentic CLI tool from Anthropic that interacts directly with project files and terminal commands. I demonstrate the installation process and show how it automates multi-step coding tasks.

## What I did
- I installed and configured the Claude Code CLI in my terminal.
- I authenticated the tool with my Anthropic account.
- I used the tool to generate and execute a PowerShell script.
- I integrated the Claude Code VS Code extension into my workflow.

## Claims
- Claude Code can perform multi-step tasks and edit files from a single prompt.
  > "Unlike chat-based tools, it can read your project files, write and edit code, run commands, and work through multi-step tasks — all from a single prompt."
- A Claude Pro subscription is required to use the tool.
  > "A **Claude Pro** subscription (or higher) is required:"
- The tool requires user permission before it writes any files.
  > "Claude Code asks for permission before writing any files."
- The tool requires user permission before it executes shell commands.
  > "It also asks before executing shell commands:"
- The VS Code extension automatically loads the current file as context.
  > "It automatically loads the file I'm working on as context, so I can ask questions without switching to the terminal:"

## Outcome
I established a functional workflow using Claude Code to automate script creation and execution. I also integrated the tool into my IDE for seamless context-aware coding.

## Caveats
The post does not detail the specific internal logic of the Claude Code agentic reasoning.
