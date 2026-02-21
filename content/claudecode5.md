---
title: "Claude Code (Part 5)"
description: "Planning & Thinking"
date: "2026-01-21"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode5"
---

Claude Code has two features that help it handle complex tasks more carefully: **Plan Mode** and **Extended Thinking**. They're different tools for different situations, but they work well together.

Plan Mode (`/plan` or Shift+Tab twice) puts Claude into a read-only phase. It can explore the codebase and draft a plan, but it can't make any edits until I approve. Extended Thinking (`Think`, `Think hard`, or `ULTRATHINK` in a prompt) gives Claude more computation time to reason through a specific problem before acting.

## Entering Plan Mode

I ran `/plan` to switch Claude into planning mode:

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.45.37-PM.png)
*I ran /plan to enter planning mode*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.45.54-PM.png)
*Claude confirmed plan mode was enabled — no edits would be made until I approved*

I then asked Claude to create 10 greeting scripts:

```prompt
can you create 10 similar scripts that provide unique greetings
```

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.49.52-PM.png)
*I asked Claude to plan 10 greeting scripts*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.50.40-PM.png)
*Claude drafted a plan listing the greetings it would use for each script*

## Approving and running the plan

I approved the plan and let Claude execute with auto-accept enabled:

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.53.30-PM.png)
*I approved the plan and enabled auto-accept for the session*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.53.59-PM.png)
*Claude began creating the scripts*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.54.50-PM.png)
*All 10 scripts created successfully*

I then asked Claude to update `CLAUDE.md` to reflect what was built:

```prompt
update the CLAUDE.md in line with last update
```

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-4.58.46-PM.png)
*Claude updated CLAUDE.md to document the new scripts*

## Extended Thinking

I asked Claude to refactor the scripts and used the `Think hard` keyword to get deeper reasoning:

```prompt
Refactor the script files separating out the greeting string creation from the text output. Think hard about this update
```

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.02.42-PM.png)
*I asked Claude to refactor the scripts, prompting it to think carefully*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.04.26-PM.png)
*Claude entered extended thinking mode before responding*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.05.14-PM.png)
*Claude considered multiple refactoring approaches*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.08.22-PM.png)
*Claude chose a shared module approach to separate greeting creation from output*

I approved and let Claude apply the refactor:

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.08.55-PM.png)
*I approved the refactor with auto-accept enabled*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.10.08-PM.png)
*Claude refactored all 11 scripts*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.10.58-PM.png)
*All 11 scripts ran successfully after the refactor*

![](/assets/images/claudecode5/Screenshot-2026-01-21-at-5.11.53-PM.png)
*I verified one script manually — ./Aloha.ps1 ran correctly*

In practice I use Plan Mode when starting something that touches many files, and the `Think` keyword when I want Claude to slow down and reason more carefully about a specific problem rather than jumping straight to code.

## References

- [Claude Code Tutorial #5 - Planning & Thinking](https://www.youtube.com/watch?v=MTGJuu9CeMk&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=5)
