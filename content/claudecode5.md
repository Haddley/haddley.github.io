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

The /plan mode and the Think keyword are two different, yet complementary, features in Claude Code that improve how Claude handles complex tasks.

🤔 Plan Mode vs. Extended Thinking: The Key Difference

| Feature | Plan Mode (/plan) | Extended Thinking (e.g., Think) |
|---------|-------------------|--------------------------------|
| Main Purpose | Creates a read-only phase for analysis and creating an execution plan before any changes are made. | Gives Claude additional computation time to reason "deeply" on a specific problem before acting. |
| Core Function | Breadth-first research. It's designed to explore codebases, understand structures, and draft comprehensive plans by reading many files without risk of edits. | Depth-first analysis. It focuses on intensively reasoning through a single task or a set of gathered information to reach a precise, high-quality solution. |
| How to Activate | Use the /plan command or press Shift+Tab twice in the terminal. | Include keywords like Think, Think more, or ULTRATHINK directly in your prompt to Claude. |
| State Change | Puts Claude into a different operational mode where file editing and command execution tools are restricted. | Is a prompting technique that requests more internal reasoning steps within the current mode. |

🔄 How They Work Together

These features are designed to be used together in an "Explore, Plan, Code, Commit" workflow. You typically start in Plan Mode for safe exploration, then use extended thinking to refine the solution before execution.

💡 When to Use Which Feature

Use Plan Mode (/plan) when starting a new, complex feature that touches many files, or when you need to safely explore an unfamiliar codebase without the risk of accidental edits.
Use Extended Thinking keywords when Claude is working on a difficult, focused problem (like a tricky bug or algorithm) and you want to ensure it dedicates sufficient reasoning effort before giving you an answer.
In short, Plan Mode creates a safe, structured environment for broad planning, while the Think keyword encourages deep, focused reasoning on a problem. They are most powerful when used together in sequence.


![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.45.37 PM.png)
*/plan*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.45.54 PM.png)
*Enabled plan mode*

```prompt
can you create 10 similar scripts that provide unique greetings 
```

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.49.52 PM.png)
*can you create 10 similar scripts...*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.50.40 PM.png)
*1. Use these greetings*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.53.30 PM.png)
*1. Yes, clear context and auto-accept edits (shift+tab)*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.53.59 PM.png)
*1. Yes, clear context and auto-accept edits (shift+tab)*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.54.50 PM.png)
*Done*

```prompt
update the CLAUDE.md in line with last update 
```

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 4.58.46 PM.png)
*Updated CLAUDE.md*

```prompt
Refactor the script files separating out the greeting string creation from the text output. Think hard about this update  
```

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.02.42 PM.png)
*Refactor the script files...*


![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.04.26 PM.png)
*Thinking...*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.05.14 PM.png)
*Approach 4*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.08.22 PM.png)
*3. Shared Module*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.08.55 PM.png)
*1. Yes, clear context and auto-accept edits (shift+tab)*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.10.08 PM.png)
*Refactoring all scripts...*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.10.58 PM.png)
*All 11 scripts run successfully...*

![](/assets/images/claudecode5/Screenshot 2026-01-21 at 5.11.53 PM.png)
*./Aloha.ps1*


## References

- [Claude Code Tutorial #5 - Planning & Thinking](https://www.youtube.com/watch?v=MTGJuu9CeMk&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=5)