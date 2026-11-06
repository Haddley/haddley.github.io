---
type: post
slug: claudecode16
title: "Claude Code (Part 16)"
date: "2026-10-17"
part: 16
builds_on: [claudecode13]
topics: [claude-code, dataverse-integration, llm-tool-selection, prompt-engineering]
tools: [Claude Code, Microsoft Dataverse, Python SDK, Dataverse CLI, PAC CLI, GitHub Copilot]
status: current
checked: "2026-11-05"
source_hash: "fba18325e9be"
generated_by: gemma4:12b
---

**Summary.** I explore the official Microsoft Dataverse plugin for Claude Code and compare its capabilities to my custom-built skill. I find that while the official plugin excels at live environment operations, my custom skill remains superior for offline XML generation and building the application shell.

## What I did
- Installed the official Dataverse plugin from the Claude marketplace.
- Connected Claude Code to a live Dataverse environment.
- Tested various skills including data queries, record creation, and metadata updates.
- Compared the official plugin's capabilities against my custom dv-generate skill.

## Claims
- The official plugin uses different tools depending on the specific task required.
  > "The Dataverse MCP server handles simple reads and small writes, the Python SDK handles bulk work, the Dataverse CLI handles data commands, and the PAC CLI handles solutions and tenant operations."
- The plugin adds a significant amount of tokens to every turn even when not using Dataverse features.
  > "A: The plugin adds about 1.1k tokens to every turn, even when I am not working on Dataverse."
- Claude correctly identified custom tables by filtering out those with Microsoft prefixes.
  > "It worked out that the `msdyn_`, `mspp_` and `adx_` tables come from Microsoft, and picked out the one table with a real publisher prefix."
- The official plugin performs environment-first updates by making changes live and then exporting the XML.
  > "Its metadata skill is environment-first: it makes changes in the environment and exports the XML, instead of writing XML by hand as my `dv-generate` skill does."
- My custom skill is better for offline work because it avoids the risks of manual XML editing.
  > "My instructions have a long numbered list of rules about exactly those failures, and I learned every one of them the hard way."
- The official plugin cannot yet build the model-driven app shell.
  > "**Dataverse plugin:** Not yet."

## Outcome
I concluded that the official Dataverse plugin and my custom skill complement each other by handling different parts of the development lifecycle.

## Caveats
The official plugin cannot currently build the application shell or handle certain complex configurations like site maps.
