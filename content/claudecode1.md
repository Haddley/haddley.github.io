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

✅ Step-by-Step Getting Started Guide

Follow these steps to install and start using Claude Code.

Step	What to Do	Key Details/Examples
1. Install	Run the appropriate install command for your OS in your terminal.	macOS/Linux/WSL: 

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows (PowerShell): 

```powershell
irm https://claude.ai/install.ps1 | iex
```

2. Authenticate	Start an interactive session with claude and follow the prompts to log in.	Your credentials are stored locally after the first login.

3. First Interactions	In your project directory, start Claude Code by typing claude in your terminal. Then, simply ask it to write you a hello world PowerShell script.


I installed Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

![](/assets/images/claudecode/Screenshot 2026-01-20 at 3.45.50 PM.png)
*curl -fsSL https://claude.ai/install.sh | bash*

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

![](/assets/images/claudecode/Screenshot 2026-01-20 at 3.52.29 PM.png)
*echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 3.56.00 PM.png)
*claude*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.00.24 PM.png)
*Dark mode*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.00.48 PM.png)
*Claude account with subscription*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.03.36 PM.png)
*Claude Pro Plan*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.04.23 PM.png)
*Monthly subscription*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.09.40 PM.png)
*Authorize*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.09.53 PM.png)
*Login successful*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.10.09 PM.png)
*Enter*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.10.19 PM.png)
*Yes, use recommended settings*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.10.40 PM.png)
*Yes, continue*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.10.59 PM.png)
*Prompt*

```prompt
create a new PowerShell script file named "HelloWorld.ps1". The script should simply output the string "Hello, World!" to the console. Show me the code and explain how to run it.
```

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.48.31 PM.png)
*create a new PowerShell script file named "HelloWorld.ps1"...*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 5.07.19 PM.png)
*"I've created HelloWorld.ps1 with the following code"*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.48.58 PM.png)
*Yes, allow all edits during this session (shift+tab)*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.49.35 PM.png)
*run it*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.49.56 PM.png)
*Yes, and don't ask again for pwsh commands in /Users/neilhaddley/Documents/GitHub/gettingstarted*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.50.16 PM.png)
*The script executed successfully and output Hello World! to the console.*

![](/assets/images/claudecode/Screenshot 2026-01-20 at 4.51.23 PM.png)
*pwsh ./HelloWorld.ps1*

## References

- [Claude Code Clearly Explained (and how to use it)](https://www.youtube.com/watch?v=zxMjOqM7DFs)