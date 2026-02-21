---
title: "Claude Code (Part 1)"
description: "Getting started"
date: "2026-01-20"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode1"
---

Claude Code is an AI coding assistant from Anthropic that runs directly in your terminal. Unlike chat-based tools, it can read your project files, write and edit code, run commands, and work through multi-step tasks — all from a single prompt.

Getting started takes three steps: install, authenticate, and start prompting.

## Install

I ran the install script in my terminal (macOS/Linux/WSL):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows (PowerShell):

```powershell
irm https://claude.ai/install.ps1 | iex
```

![](/assets/images/claudecode/Screenshot-2026-01-20-at-3.45.50-PM.png)
*I ran the installer in the terminal*

I then added Claude Code to my PATH so the terminal could find the binary:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

![](/assets/images/claudecode/Screenshot-2026-01-20-at-3.52.29-PM.png)
*I added the Claude Code binary to PATH and reloaded the shell*

## Authenticate

I typed `claude` to launch Claude Code for the first time:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-3.56.00-PM.png)
*I ran 'claude' in the terminal to start the first-time setup*

I picked a colour theme:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.00.24-PM.png)
*I chose dark mode*

I then linked Claude Code to my Anthropic account. A **Claude Pro** subscription (or higher) is required:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.00.48-PM.png)
*I logged in to my Claude account*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.03.36-PM.png)
*I selected the Claude Pro plan*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.04.23-PM.png)
*I confirmed the monthly subscription*

Claude Code opened a browser tab to complete the OAuth flow:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.09.40-PM.png)
*I authorized Claude Code to access my Anthropic account*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.09.53-PM.png)
*Login successful*

Back in the terminal, I accepted the remaining setup prompts:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.10.09-PM.png)
*I pressed Enter to confirm*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.10.19-PM.png)
*I accepted the recommended default settings*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.10.40-PM.png)
*I confirmed to finish setup*

## First prompt

With setup complete, I was dropped into the interactive Claude Code prompt:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.10.59-PM.png)
*The Claude Code prompt, ready for input*

I asked it to create a simple PowerShell script:

```prompt
create a new PowerShell script file named "HelloWorld.ps1". The script should simply output the string "Hello, World!" to the console. Show me the code and explain how to run it.
```

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.48.31-PM.png)
*I asked Claude Code to create the HelloWorld.ps1 script*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-5.07.19-PM.png)
*"I've created HelloWorld.ps1 with the following code"*

Claude Code asks for permission before writing any files. I approved edits for the whole session:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.48.58-PM.png)
*Yes, allow all edits during this session (shift+tab)*

I then asked Claude Code to run the script:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.49.35-PM.png)
*I asked Claude Code to run the script*

It also asks before executing shell commands:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.49.56-PM.png)
*Yes, and don't ask again for pwsh commands in /Users/neilhaddley/Documents/GitHub/gettingstarted*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.50.16-PM.png)
*The script ran and output "Hello, World!" to the console*

I also ran the script directly to confirm it worked independently:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-4.51.23-PM.png)
*I ran pwsh ./HelloWorld.ps1 manually to verify the output*

## VS Code Extension

I also installed the **Claude Code VS Code Extension**, which integrates directly into the editor. It automatically loads the file I'm working on as context, so I can ask questions without switching to the terminal:

![](/assets/images/claudecode/Screenshot-2026-01-20-at-7.55.32-PM.png)
*Claude Code's Visual Studio Code Extension*

![](/assets/images/claudecode/Screenshot-2026-01-20-at-7.58.07-PM.png)
*I asked Claude Code to explain the script from inside VS Code*

## References

- [Claude Code Clearly Explained (and how to use it)](https://www.youtube.com/watch?v=zxMjOqM7DFs)

- [Claude Code Tutorial #1 - Introduction & Setup)](https://www.youtube.com/watch?v=SUysp3sJHbA&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY)

- [How I Start EVERY Claude Code Project](https://www.youtube.com/watch?v=aQvpqlSiUIQ)

- [6 Months of Claude Code Lessons in 27 Minutes](https://www.youtube.com/watch?v=rfDvkSkelhg)
