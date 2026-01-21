---
title: "Claude Code (Part 4)"
description: "Tools & Permissions"
date: "2026-01-21"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode4"
---

The .claude/settings.local.json file is your personal, machine-specific configuration override for a single project. It lets you customize Claude Code's behavior for your local workspace without affecting your teammates, as it is automatically excluded from version control .

📁 Understanding the Configuration Hierarchy

Claude Code uses a layered system where more specific scopes override broader ones . Here is a comparison of the different configuration scopes:

| Scope | File Location | Intended Use | Shared with Team? |
|-------|---------------|--------------|-------------------|
| Local | .claude/settings.local.json | Personal overrides for this specific project (e.g., test settings, personal shortcuts). | No (auto git-ignored) |
| Project | .claude/settings.json | Team-shared settings (standard hooks, shared MCP servers, project rules) . | Yes (committed to git) |
| User | ~/.claude/settings.json | Your global preferences across all projects (themes, default tools) . | No |
| Managed | System-level directory | Enterprise IT policies that enforce organization-wide security and compliance . | Yes (deployed by admin) |

Settings are applied with the following priority (highest to lowest): Managed > Command-line arguments > Local > Project > User . This means your settings.local.json will override settings in both the project's settings.json and your global user settings.

🛠️ How and When to Use It

You should create and edit a settings.local.json file in your project's .claude/ directory when you need settings that are specific to your workflow on that project.

Key Use Cases:

Personal Tool Permissions: Pre-approve specific commands (like git commit) to reduce permission prompts just for you .
Experiment Safely: Test new hooks or environment variables before proposing them to the team in the shared settings.json .
Machine-Specific Paths: Configure paths or credentials that differ on your machine .
Auto-approving MCP Servers: Some tools (like claude-flow) may generate this file to auto-approve specific local MCP servers for convenience .


📝 Common Configuration Example

Here are practical configurations you might add to your .claude/settings.local.json to reduce permission prompts:


![](/assets/images/claudecode4/Screenshot 2026-01-21 at 4.28.35 PM.png)
*Yes, and don't ask again for pwsh commands in /User/neilhaddley/Documents/GitHub/gettingstarted*

![](/assets/images/claudecode4/Screenshot 2026-01-21 at 4.29.01 PM.png)
*{"permissions": { "allow": ["Bash(pwsh:*)"]}}*


## References

- [Claude Code Tutorial #4 - Tools & Permissions](https://www.youtube.com/watch?v=TU0ZcDFq0e0&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=4)