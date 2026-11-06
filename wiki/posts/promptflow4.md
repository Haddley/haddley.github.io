---
type: post
slug: promptflow4
title: "Prompt Flow (Part 4)"
date: "2024-08-24"
part: 4
builds_on: []
topics: [semantic-kernel, ai-orchestration, prompt-flow, agentic-workflows]
tools: [Semantic Kernel, Python, Sequential Planner]
status: current
checked: "2026-11-06"
source_hash: "8ee873183f3b"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use Semantic Kernel's planner to orchestrate multiple AI plugins. The process shows how an agent can automatically combine different tools to achieve a specific user goal.

## What I did
- I integrated multiple plugins including summarize, writer, text, and shakespeare.
- I implemented a Sequential Planner to generate a plan based on a specific goal.
- I executed the plan to produce a multi-step transformation of text.
- I expanded the toolset by adding Email, Math, and Time plugins.
- I used the planner to resolve three distinct questions.

## Claims
- I used Semantic Kernel planning to combine multiple plugins so the AI agent can solve a user’s goal by orchestrating them together.
  > "I used Semantic Kernel planning to combine multiple plugins so the AI agent can solve a user’s goal by orchestrating them together."
- I created a Sequential Planner and asked it to create a plan based on my ask.
  > "*I created a Sequential PlannerI asked the planner to create a plan based on my ask (goal)*"
- I invoked the plan and printed the result which was a short poem in the style of Shakespeare translated to French and converted to all upper case.
  > "*I printed out the planning stepsI invoked the plan and printed the result (a short poem in the style of Shakespeare translated to French and converted to all upper case)*"
- I used the planner to answer three questions.
  > "*I used the planner to answer three questions*"

## Outcome
I built a system where a planner automatically orchestrates multiple plugins to achieve complex goals. I successfully demonstrated this by generating a multi-step transformed poem.

## Caveats
The post does not detail the specific internal logic of the underlying LLM used by the planner.
