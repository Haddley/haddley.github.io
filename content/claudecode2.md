---
title: "Claude Code (Part 2)"
description: "Memory"
date: "2026-01-21"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode2"
---

A CLAUDE.md file gives Claude Code persistent knowledge about your project, acting as its "memory" for your codebase's unique setup and rules.

📁 Creating Your CLAUDE.md File

You have two main options to create this file:

Method	Process	Best For
Automatic (/init)	In your project's root directory, run claude, then type /init. Claude scans your project and generates a starter file.	Quickly bootstrapping a new project or when you're unsure what to include.
Manual	Create a new markdown file named CLAUDE.md (case-sensitive) in your project's root. Start with a basic project overview.	Full control from the start or for simple projects.
Whether you generate or create the file manually, treat it as a living document that you edit and refine over time.

🗺️ How to Use It Effectively

Think of CLAUDE.md as an onboarding guide for Claude. To make it effective:

Start Small and Build: Begin with just the essentials: a one-line project description, key terminal commands (npm run dev, docker-compose up), and critical "gotchas" (e.g., "NEVER commit .env files"). Add rules only when Claude makes a consistent mistake.
Structure for Clarity: Use clear Markdown headings. Common sections include:

## Project Overview
## Common Commands
## Code Style
## Important Notes / Gotchas
Place It Strategically: You can have multiple CLAUDE.md files in a hierarchy:

Project Root: The standard location for project-wide rules.
Subdirectories: For monorepos, place files in subfolders (e.g., /api/CLAUDE.md) for module-specific rules.
Home Directory (~/.claude/): For your personal, global preferences across all projects.

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.03.11 PM.png)
*/init*

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.03.49 PM.png)
*Yes, allow all edits this session*

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.04.28 PM.png)
*CLAUDE.md project specific file created*

```prompt
"Please add to my CLAUDE.md: In PowerShell scripting loop variables should have descriptive names, use camelCase, and explicitly differentiate the single item variable from the collection variable. "
```

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.08.37 PM.png)
*Please add to my CLAUDE.md...*

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.09.32 PM.png)
*Code Style section added*

```prompt
update script using "Code Style"
```

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.12.12 PM.png)
*update script...*

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.13.38 PM.png)
*script updated*

```prompt
update CLAUDE.md to include description of the loop
```

![](/assets/images/claudecode2/Screenshot 2026-01-21 at 12.14.26 PM.png)
*update CLAUDE.md...*


## References

- [Claude Code Tutorial #2 - CLAUDE.md Files & /init)](https://www.youtube.com/watch?v=i_OHQH4-M2Y&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=2)