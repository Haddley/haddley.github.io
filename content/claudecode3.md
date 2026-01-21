---
title: "Claude Code (Part 3)"
description: "Context"
date: "2026-01-21"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode3"
---

📚 Core Concept: What is "Context"?

In Claude Code, context is the working information Claude can use. It includes your conversation history, manually loaded files, selections, and persistent instructions from files like CLAUDE.md.

🗂️ Persistent Context (Project "Memory")

The CLAUDE.md file acts as Claude's persistent memory for a project, automatically loaded at the start of every session.

- **Purpose:** Stores project-specific instructions, commands, and rules (e.g., coding styles, common tasks).
- **Creation:** Use /init in the CLI or create it manually in your project's root.
- **Key Fact:** The old # key shortcut to add to this file is deprecated. Now, you simply ask Claude to update the file for you.

🎮 Interactive Session & Context Management

These commands manage the active context during a session.

| Command/Feature | Primary Function | Pro Tip |
|-----------------|------------------|---------|
| @ | Manually load any file or folder into context. | Use for files not automatically included. |
| /clear | Reset session history. | Use when starting a completely new task. |
| /compact | Summarize a long conversation to save space. | Use after finishing a major task phase. |
| Esc (once) | Stop Claude's current response. | The standard "stop" button. |
| Esc (twice) | Rewind to a previous point in the chat. | Be aware of a past bug (v2.0.5) that could cause freezes. |
| /exit | End the CLI session. | Returns you to your system terminal. |

🖥️ Key Interface Difference: CLI vs. VS Code Extension

How you add context differs significantly between interfaces.

| Context Type | Claude Code CLI | Claude Code VS Code Extension |
|--------------|-----------------|------------------------------|
| Project Files | Manual only via @ mentions. | Automatic for the currently active editor file. |
| Selected Code | Not seen unless manually referenced. | Automatically seen when text is highlighted. |
| Workflow Feel | Command-driven, terminal-centric. | Integrated, like a pair programmer inside your editor. |

💡 Best Practices & Summary

Foundation: Create a concise CLAUDE.md for project-wide rules.
During Work:

In VS Code, leverage the automatic context for the file you're editing.
In the CLI, actively use @ to pull in files.
Session Hygiene: Use /compact to preserve long conversations and /clear to reset for a new topic.
Tool Choice: Use the VS Code extension for integrated coding and the CLI for advanced terminal operations or MCP server work.
In short, Claude Code's context is a blend of persistent project memory (CLAUDE.md) and dynamic session control (commands and auto-context), with the interface you choose shaping your workflow.



![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.19.32 PM.png)
*ESC ESC. I reviewed the Context. I selected the first "point"*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.19.48 PM.png)
*Restore code and conversation*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.20.44 PM.png)
*ESC ESC. I reviewed the Context*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.21.02 PM.png)
*/compact*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.21.47 PM.png)
*ESC ESC. I reviewed the Context*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.22.50 PM.png)
*/clear*

![](/assets/images/claudecode3/Screenshot 2026-01-21 at 1.23.03 PM.png)
*ESC ESC. I reviewed the Context*

## References

- [Claude Code Tutorial #3 - Context](https://www.youtube.com/watch?v=ob-mYGqqFQw&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=3)