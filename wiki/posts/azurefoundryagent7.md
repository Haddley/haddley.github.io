---
type: post
slug: azurefoundryagent7
title: "Azure Foundry Agent (Part 6)"
date: "2026-11-02"
series: Azure Foundry Agent
part: 6
builds_on: [azurefoundryagent6]
topics: [rules-first-design, minnesota-dwi, citations, llm-comparison, cost-per-answer]
tools: [Ollama, qwen2.5, GPT-5.5, DeepSeek, Azure Container Apps]
status: current
checked: "2026-11-06"
---

**Summary.** I put three first-degree felony DWI cases to six advisors and scored five points that the Minnesota statutes settle. A rules-first advisor, which uses a small model only to read the person's words, got every point right and cited the section for each.

## What I did
- Wrote three felony cases (A, B and C), each with three or four earlier DWIs inside ten years.
- Put them to the rules-first advisor, GPT-5.5, `gpt-5-search-api`, DeepSeek with and without search, and Google's AI Overview.
- Scored each answer on the degree, the three-year floor, the ten-year revocation, the 60-day deadline, and plates and forfeiture.
- Priced the advisor on Azure Container Apps and on Foundry.

## Claims
- The headline claim.
  > "Only our AI Agent is right every time, and every citation it gives is checked against the statute text."
- The design: AI builds the rules base; only the rules run at question time.
  > "At question time only the rules run."
- Reading the person's words is the model's only job, and plain rules already read most of it.
  > "Rules alone, with no model at all, read 73% of 150 fresh messages exactly."
- A wrong number costs the most in a felony.
  > "A wrong number costs the most in a felony."
- The old-law answer a model gives from memory is wrong for a prior 13 years ago.
  > "Since the law changed on 1 August 2025 the statute says at least two years"
- The other advisors' scores are my own tally.
  > "I judged the other advisors' points by hand"

## Outcome
Only the rules-first advisor drew a full pentagon on both charts, at a fraction of the time and cost of the others, with the other advisors losing points on the numbers after the degree.

## Caveats
The times and costs for the other advisors are rough figures from my own runs, and the raw scoring sheet is not kept, so read the charts as a guide. The August 2025 date comes from House Research, not the statute text. This part is followed by Part 7, which tests the same approach on 2,000 conversations.
