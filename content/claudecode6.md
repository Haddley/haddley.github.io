---
title: "Claude Code (Part 6)"
description: "Slash Commands"
date: "2026-01-21"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode6"
---

Custom slash commands let me package project-specific knowledge and workflows into a single shortcut. Instead of re-explaining my project's structure, conventions, and tools at the start of every session, I type `/powershell` and Claude already knows everything it needs.

A custom slash command is a Markdown file stored in `.claude/commands/`. When I invoke it, Claude reads the file and uses it as the context for the session.

## Creating the command

I created `.claude/commands/powershell.md` containing instructions for how Claude should approach my PowerShell project — what files to read first, what commands to use, which safety rules to follow, and how to structure new functions:

![](/assets/images/claudecode6/Screenshot-2026-01-21-at-6.31.43-PM.png)
*I created the /powershell command file in .claude/commands/*

The command tells Claude to:
- Read the main script and any module files before acting
- Use `Invoke-Pester` for tests and `Invoke-Build` for task automation
- Never suggest `-ExecutionPolicy Bypass` as a first solution
- Follow PowerShell Verb-Noun naming and use `[CmdletBinding()]` on new functions

## Using the command

I ran `/powershell` at the start of a new session:

![](/assets/images/claudecode6/Screenshot-2026-01-21-at-6.35.11-PM.png)
*I ran /powershell — Claude read the project files and loaded the context*

![](/assets/images/claudecode6/Screenshot-2026-01-21-at-6.37.04-PM.png)
*Claude summarised what it found and asked what I wanted to do*

I asked it to add a Pester test file for the module:

![](/assets/images/claudecode6/Screenshot-2026-01-21-at-6.38.53-PM.png)
*I asked Claude to add a test file for the GreetingHelpers module*

Claude generated a complete Pester test suite covering `Get-Greeting` and `Show-Greeting`, including context blocks for parameters, edge cases, and validation:

```powershell
BeforeAll {
    Import-Module "$PSScriptRoot/../Modules/GreetingHelpers/GreetingHelpers.psm1" -Force
}

Describe "Get-Greeting" {
    Context "With required Prefix parameter" {
        It "Returns greeting with username from environment" {
            $result = Get-Greeting -Prefix "Hello"
            $result | Should -Be "Hello, $env:USER!"
        }

        It "Returns greeting with different prefix" {
            $result = Get-Greeting -Prefix "Welcome"
            $result | Should -Be "Welcome, $env:USER!"
        }
    }

    Context "With optional Username parameter" {
        It "Returns greeting with custom username" {
            $result = Get-Greeting -Prefix "Hello" -Username "TestUser"
            $result | Should -Be "Hello, TestUser!"
        }

        It "Returns greeting with empty username" {
            $result = Get-Greeting -Prefix "Hello" -Username ""
            $result | Should -Be "Hello, !"
        }
    }

    Context "Parameter validation" {
        It "Has mandatory Prefix parameter" {
            $command = Get-Command Get-Greeting
            $command.Parameters['Prefix'].Attributes.Mandatory | Should -Contain $true
        }
    }
}

Describe "Show-Greeting" {
    Context "With required Message parameter" {
        It "Outputs message to host" {
            $output = Show-Greeting -Message "Test Message" 6>&1
            $output[0].ToString() | Should -Be "Test Message"
        }

        It "Outputs message 6 times by default" {
            $output = Show-Greeting -Message "Test Message" 6>&1
            $output.Count | Should -Be 6
        }
    }

    Context "With optional RepeatCount parameter" {
        It "Outputs message specified number of times" {
            $output = Show-Greeting -Message "Test Message" -RepeatCount 3 6>&1
            $output.Count | Should -Be 3
        }

        It "Outputs message once when RepeatCount is 1" {
            $output = Show-Greeting -Message "Test Message" -RepeatCount 1 6>&1
            $output.Count | Should -Be 1
        }

        It "Outputs nothing when RepeatCount is 0" {
            $output = Show-Greeting -Message "Test Message" -RepeatCount 0 6>&1
            $output | Should -BeNullOrEmpty
        }
    }

    Context "Parameter validation" {
        It "Has mandatory Message parameter" {
            $command = Get-Command Show-Greeting
            $command.Parameters['Message'].Attributes.Mandatory | Should -Contain $true
        }
    }
}
```

All 11 tests passed:

![](/assets/images/claudecode6/Screenshot-2026-01-21-at-6.43.28-PM.png)
*All 11 Pester tests passed*

The command effectively inverted the workflow — instead of me guiding Claude, the command taught Claude how to guide itself within the project. New sessions start with full context, no repetition required.

## References

- [Claude Code Tutorial #6 - Slash Commands](https://www.youtube.com/watch?v=52KBhQqqHuc&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=6)
