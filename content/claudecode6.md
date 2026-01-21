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

Adding a custom slash command like /powershell is about transforming Claude from a general-purpose assistant into a specialized, context-aware co-pilot for your specific project. Here’s why it's powerful and how to set it up.

🎯 Why Create a Custom Slash Command?

Reason	The Problem (Without Command)	The Solution (With /powershell)
1. Save Time & Repetition	You must repeatedly explain your project's structure, style rules, and common tools in every new chat.	Encapsulates all project knowledge. Typing /powershell instantly gives Claude the context it needs.
2. Enforce Standards	Claude might suggest solutions that don't follow your team's PowerShell best practices (e.g., unsafe execution policies).	Embeds your rules (like "never suggest Bypass") directly into its workflow, ensuring consistent, high-quality output.
3. Reduce Errors	Manual file context loading (@) is easy to forget, leading to suggestions based on incomplete information.	Automates the "context-gathering" phase—Claude first reads key project files before acting.
4. Streamline Onboarding	New team members spend days learning project quirks and setup.	The command acts as an instant onboarding guide, giving anyone expert-level context.
5. Create a Shared Language	Team discussions require long descriptions of tasks (e.g., "run the full test suite with detailed output").	Standardizes actions. /powershell can define exactly what "run tests" means (Invoke-Pester -Path ./tests -Output Detailed).
In essence, it inverts the workflow. Instead of you constantly guiding Claude, you teach Claude once how to guide itself within your project's world.


```md
When this command is used, Claude should act as a PowerShell project expert. Follow these steps:

1.  **Context Gathering & Analysis:**
    *   First, use the `@` mention to read the main project script file (like `@.\MyScript.ps1`).
    *   Check for a `RequiredModules.psd1`, `requirements.psd1`, or any `*.psd1/*.psm1` files to understand module dependencies.
    *   Look for a `tests/` directory and specifically for `*.Tests.ps1` files to understand the testing framework (likely Pester).
    *   Check for the presence of a `PSModulePath` configuration or a `.env` file with environment variables.

2.  **Core Project Commands & Structure:**
    *   Assume the project follows common PowerShell conventions. If a module project (`*.psd1` exists), the build/test commands likely use `Invoke-Build` or `psake`.
    *   **Standard commands to reference:**
        *   `.\Build.ps1` or `Invoke-Build` - For task automation.
        *   `Invoke-Pester -Path ./tests -Output Detailed` - To run the full test suite.
        *   `Import-Module .\MyModule -Force` - For local development reloads.
        *   `Get-Module -ListAvailable` - To check installed dependencies.

3.  **Best Practices & Safety Rules:**
    *   **NEVER** suggest running scripts with `-ExecutionPolicy Bypass` as a first solution. Prefer configuring the policy correctly.
    *   Always check for `#Requires` statements at the top of scripts and ensure Claude respects admin/module requirements.
    *   Prefer `-Confirm:$false` or `-Force` parameters only when explicitly safe and requested. Highlight their use if suggested.
    *   When editing functions, ensure `[CmdletBinding()]` and common parameters (`-Verbose`, `-ErrorAction`) are preserved if present.
    *   **Code Style:** Follow PowerShell's Verb-Noun naming for any new functions. Use PascalCase for variables in parameters, camelCase for local variables. Suggest `[ValidateSet()]` and `[Parameter(Mandatory)]` attributes to improve new functions.

4.  **Common Tasks & Solutions:**
    *   For module dependency issues, suggest `Install-Module -Name <ModuleName> -Scope CurrentUser` or using `Save-Module`.
    *   For file path issues, always use `Join-Path` or `Resolve-Path` instead of string concatenation.
    *   For JSON/CSV manipulation, prefer `ConvertFrom-Json`, `ConvertTo-Json`, `Import-Csv`, and `Export-Csv` cmdlets.
    *   When suggesting error handling, include `Try/Catch` blocks with `$PSCmdlet.ThrowTerminatingError()` for advanced functions.

5.  **Output & Next Steps:**
    *   After analysis, provide a concise summary of the project structure and identified dependencies.
    *   Tailor any following action plans (like adding a feature or fixing a bug) to the discovered project setup.
    *   Ask clarifying questions if the project structure is unusual or key files are missing.
```

![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.31.43 PM.png)
*slash command*

![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.35.11 PM.png)
*/powershell*

![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.37.04 PM.png)
*what would you like to do with this project?*

![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.38.53 PM.png)
*add a test file for the module*

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

![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.43.28 PM.png)
*All 11 tests pass*


## References

- [Claude Code Tutorial #6 - Slash Commands](https://www.youtube.com/watch?v=52KBhQqqHuc&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=6)