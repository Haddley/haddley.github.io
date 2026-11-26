---
type: post
slug: bcmcp6
title: "Business Central and DeepSeek Harness (Part 6)"
date: "2026-11-18"
part: 6
builds_on: ["bcmcp7"]
topics: ["business-central", "web-api-integration", "human-in-the-loop", "ai-safety-guards"]
tools: ["Business Central", "DeepSeek", "Python", "Web API"]
status: current
checked: "2026-11-26"
source_hash: "699b5d5b794f"
generated_by: gemma4:12b
---

**Summary.** I explain how I built the request_posting tool to bridge the gap between AI drafts and final actions. I describe how the tool ensures that a human must review and approve a transaction before the system executes a web API call to post the order.

## What I did
- I designed a tool that requires a human to intervene before any final posting occurs.
- I separated the AI's capabilities from the actual execution of the ship and invoice action.
- I implemented a single function that handles checking rules, asking for approval, and posting the order.
- I ensured the AI only interacts with a single argument, which is the order number.
- I used the web API to perform the final action as the signed-in user.

## Claims
- A draft that no one can post is only half a job.
  > "That is on purpose, but a draft that nobody can post is only half a job."
- The AI sees one tool with one argument.
  > "The AI sees one tool with one argument."
- The body is one function: check, ask, post.
  > "The body is one function: check, ask, post."
- The person's answer goes to the function, not to the AI.
  > "The person's answer goes to the function, not to the AI."
- The add-on posts with one web API call, as you.
  > "The add-on posts with one web API call, as you."
- The tool's body is one function that does three things in order, and nothing can skip a step.
  > "The tool's body is one function that does three things in order, and nothing can skip a step, because there is no other way in."

## Outcome
I built a robust mechanism where the AI cannot post directly, but instead triggers a workflow that requires a human to approve the final action.

## Caveats
The post does not cover the specific rules or the behavior of the system when a rule fails, which is covered in Part 7.
