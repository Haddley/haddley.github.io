---
type: post
slug: claudecode5
title: "Claude Code (Part 5)"
date: "2026-01-21"
part: 5
builds_on: []
topics: [plan-mode, extended-thinking, code-refactoring, ai-reasoning]
tools: [Claude Code, Claude]
status: current
checked: "2026-11-05"
source_hash: "28cfd1ea008a"
generated_by: gemma4:12b
---

**Summary.** I explore how to handle complex tasks more carefully using Claude Code. I demonstrate the combination of Plan Mode for broad exploration and Extended Thinking for deep reasoning on specific problems.

## What I did
- I used Plan Mode to explore the codebase and draft a plan without making edits.
- I generated ten greeting scripts after approving the initial plan.
- I updated the project documentation to reflect the new changes.
- I used the Think hard keyword to force deeper reasoning during a refactoring task.
- I verified the final scripts manually to ensure they ran correctly.

## Claims
- Claude Code has two specific features to manage complex tasks.
  > "Claude Code has two features that help it handle complex tasks more carefully: **Plan Mode** and **Extended Thinking**."
- Plan Mode restricts Claude to a read-only phase for drafting.
  > "Plan Mode (`/plan` or Shift+Tab twice) puts Claude into a read-only phase."
- Extended Thinking provides more computation time for reasoning.
  > "Extended Thinking (`Think`, `Think hard`, or `ULTRATHINK` in a prompt) gives Claude more computation time to reason through a specific problem before acting."
- I used the Think hard keyword to get deeper reasoning during refactoring.
  > "I asked Claude to refactor the scripts and used the `Think hard` keyword to get deeper reasoning:"
- I verified that the Aloha script ran correctly.
  > "*I verified one script manually — ./Aloha.ps1 ran correctly*"
- I use Plan Mode for multi-file changes and Think for specific logic problems.
  > "In practice I use Plan Mode when starting something that touches many files, and the `Think` keyword when I want Claude to slow down and reason more carefully about a specific problem rather than jumping straight to code."

## Outcome
I successfully built a set of greeting scripts and learned how to use Plan Mode and Extended Thinking to manage complex workflows.

## Caveats
The post does not specify the exact internal logic of the Extended Thinking computation time.
