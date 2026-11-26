---
type: post
slug: bcmcp4
title: "Business Central and DeepSeek Harness (Part 4)"
date: "2026-11-18"
part: 4
builds_on: ["bcmcp2", "bcmcp5"]
topics: ["standard-operating-procedures", "work-instructions", "prompt-engineering", "business-logic-automation"]
tools: ["Business Central", "DeepSeek", "Markdown"]
status: current
checked: "2026-11-26"
source_hash: "3fa1479e477e"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to provide the AI with a company's specific way of working by using plain text files for SOPs and work instructions. This method ensures the AI follows specific business rules, such as default lead times, before it interacts with Business Central.

## What I did
- I defined the difference between an SOP and a work instruction.
- I created a house rule for a default lead time.
- I integrated these rules into the harness via plain Markdown files.
- I tested the system with a specific order request.
- I verified that the AI followed the rules and provided a proper hand-over.

## Claims
- The AI performed well even when no instructions were provided.
  > "It did a decent job, with nothing written down."
- A work instruction records specific errors and the facts that helped resolve them.
  > "It names the tools, and it records two errors I met and the facts that helped."
- The AI stopped and asked for clarification on a specific business rule.
  > "The AI stopped and asked on its own judgment, and it asked in one round, as the front page says."
- The AI calculated the correct date based on the house rule and waited for confirmation.
  > "So the AI works out today's date (2026-11-18), adds five days, offers 2026-11-23 as the recommended answer, and waits for me."
- The AI followed the rule and placed the correct date in the field.
  > "It followed this one: the question was asked, and the date is in a field I can see."
- The cost of this confirmation step is one extra question per order.
  > "The cost of the confirmation step is one extra question per order."

## Outcome
I built a system where the AI follows company-specific rules by reading plain text files before performing tasks. This ensures the AI acts as a reliable agent that follows human-defined logic rather than just guessing.

## Caveats
Rules that must always hold are better suited for code rather than text files, which is the subject of future posts.
