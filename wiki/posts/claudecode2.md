---
type: post
slug: claudecode2
title: "Claude Code (Part 2)"
date: "2026-01-21"
part: 2
builds_on: []
topics: [claude-code, prompt-engineering, project-context, automated-onboarding]
tools: [Claude Code, PowerShell]
status: current
checked: "2026-11-05"
source_hash: "dc079e549d55"
generated_by: gemma4:12b
---

**Summary.** I explain how to use a CLAUDE.md file to provide Claude Code with persistent project knowledge. This method ensures the AI understands project conventions and rules automatically in every session.

## What I did
- I used the /init command to generate a starter CLAUDE.md file.
- I approved the file write to establish the initial project context.
- I updated the file to include specific PowerShell naming rules.
- I refactored existing scripts to match the new rules.
- I updated the documentation to reflect changes in the code logic.

## Claims
- A CLAUDE.md file provides the AI with persistent knowledge of project rules.
  > "A `CLAUDE.md` file gives Claude Code persistent knowledge about your project — its setup, conventions, and rules."
- Claude reads the file automatically at the start of every session.
  > "Claude reads it automatically at the start of every session, so you don't have to re-explain context each time."
- I can use the /init command to generate a starter version of the file.
  > "I can create the file manually, or let Claude generate a starter version by running `/init`."
- I treat the file as a living document that I update frequently.
  > "I treat `CLAUDE.md` as a living document."
- I update the file directly when Claude makes a consistent mistake.
  > "When Claude makes a consistent mistake — or when I want to enforce a convention — I ask it to update the file directly."
- The file serves as an accurate onboarding guide for the AI over time.
  > "Over time it becomes an accurate, always-loaded onboarding guide for the AI."

## Outcome
I established a workflow where CLAUDE.md acts as a persistent memory for the AI. This ensures the model follows project-specific conventions without repeated manual instructions.

## Caveats
The post does not specify the exact internal logic Claude uses to parse the CLAUDE.md file.
