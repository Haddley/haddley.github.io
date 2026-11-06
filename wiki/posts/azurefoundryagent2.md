---
type: post
slug: azurefoundryagent2
title: "Azure Foundry Agent (Part 1)"
date: "2026-10-27"
part: 1
builds_on: [claudecode14, claudecowork1, azuresearchvector, azurefoundryagent3]
topics: [azure-ai-foundry, prompt-engineering, llm-evaluation, skill-versioning]
tools: [Azure AI Foundry, Python SDK, pypdf, GPT-4o-mini]
status: current
checked: "2026-11-05"
source_hash: "5fb059a88084"
generated_by: gemma4:12b
---

**Summary.** I test the page-line-summary skill in Azure AI Foundry to see how reliably a prompt agent identifies contradictions in deposition excerpts. I find that while the agent follows the skill's structure well, results vary between runs and the model does not consistently find all contradictions.

## What I did
- I uploaded the page-line-summary skill to Microsoft Foundry.
- I created a prompt agent and provided it with deposition text.
- I tested the agent across different reasoning effort settings.
- I evaluated the accuracy of the results against known contradictions.

## Claims
- The prompt agent does not have a tool to read files directly.
  > "**It cannot read a PDF.** I extracted the text myself and pasted it into the message."
- The owner role is insufficient to create skills and agents because the Foundry User role is required.
  > "Creating skills and agents calls a Foundry data action, `Microsoft.CognitiveServices/accounts/AIServices/agents/write`, which the **Foundry User** role carries and the Owner role does not."
- A required section in the output template is more reliable than a rule in the instructions.
  > "A required section in the output template worked better than a rule in the instructions."
- Increasing the reasoning effort to medium did not improve the accuracy of the results.
  > "More reasoning did not mean more accuracy."
- The results vary from run to run, so a human must check every summary.
  > "The results vary, so a lawyer must check every summary against the transcript."
- The prompt agent uses the skill text as its instructions.
  > "I used the skill as the instructions, and I added a short preamble for the tools that a prompt agent does not have."

## Outcome
I built a prompt agent in Azure AI Foundry that uses a custom skill to structure deposition summaries. I concluded that while the system is useful, the variability of LLM outputs means a human must still verify the final results.

## Caveats
The results vary from run to run because the sample size is small and the model can skip instructions in a long prompt.
