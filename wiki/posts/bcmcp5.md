---
type: post
slug: bcmcp5
title: "Business Central and DeepSeek Harness (Part 5)"
date: "2026-11-18"
part: 5
builds_on: ["bcmcp6"]
topics: ["sandbox-management", "ai-safety", "environment-isolation", "business-central-automation"]
tools: ["Business Central", "DeepSeek", "MCP Server"]
status: current
checked: "2026-11-26"
source_hash: "79ce94e03070"
generated_by: gemma4:12b
---

**Summary.** I explain how to test an AI against a fresh copy of a practice company to ensure it does not affect real data. I demonstrate how to create a baseline sandbox and use it to generate disposable environments for each test run.

## What I did
- I established a clean baseline sandbox to serve as a consistent starting point.
- I created a new sandbox copy for each test run to isolate the AI's actions.
- I updated the harness configuration and the posting add-on to point to the new environment.
- I reset the notes folder to ensure every run begins with the same files.
- I executed the prompts and deleted the sandbox once the test was complete.

## Claims
- I use a copy because the AI can create and post documents.
  > "You are about to let an AI create and post documents."
- A copy allows you to find out if the AI makes a mistake for free.
  > "A copy lets you find out for free."
- A sandbox copy contains the data that the baseline had.
  > "A: A sandbox copy has the data that the baseline had."
- The system refuses to run if the environment name does not match the configuration.
  > "It refuses to run if its environment does not match the one it is told to expect."
- The name of a deleted environment cannot be used again straight away.
  > "**Names are reserved.** The name of a deleted environment cannot be used again straight away, so choose a new one for each run."
- A limit of three sandboxes exists in the admin center.
  > "**A limit of three sandboxes.** If you are at the limit, delete one before you copy."

## Outcome
I built a workflow that isolates AI testing within disposable sandboxes. This ensures that any unexpected AI behavior does not impact real company data.

## Caveats
The post does not show the specific content of the posted invoice in Part 6.
