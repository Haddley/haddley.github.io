---
type: post
slug: bcmcp7
title: "Business Central and DeepSeek Harness (Part 7)"
date: "2026-11-18"
part: 7
builds_on: ["bcmcp6"]
topics: ["business-central", "ai-safety", "automated-accounting", "policy-enforcement"]
tools: ["Business Central", "Python", "DeepSeek"]
status: current
checked: "2026-11-26"
source_hash: "774d671922c0"
generated_by: gemma4:12b
---

**Summary.** I describe the logic and safety mechanisms of the posting tool for Business Central. I explain how the system handles successful orders, failed rules, and the specific limitations of this demonstration.

## What I did
- I defined the rules for what the tool checks and what the user sees.
- I built a review card to show the user the impact of a posting action.
- I implemented a guard to prevent the AI from bypassing security controls.
- I established a limit on how many times the AI can request a single order.

## Claims
- The system blocks any order that fails a predefined rule.
  > "Any fail means the order is blocked."
- The review card shows the user exactly what values will change in the system.
  > "Below it the card says what will change: stock of 1936-S from 584 to 582, and Adatum's balance due from 397.17 to 794.34 (it already owed 397.17 from the earlier order)."
- The system records the specific stock and balance changes in a log.
  > "For this order it records the checks, the stock before and after (584 and 582) and the balance before and after (397.17 and 794.34), and that each moved as expected."
- The tool prevents the AI from attempting to bypass the rules by changing prices or quantities.
  > "It did not change the quantity or the price to make the order pass, and it said it would not edit the draft's lines to squeeze it under the caps."
- The AI is limited to three requests per order within a thirty minute window.
  > "**Three asks per order.** The AI may ask for the same order at most three times in half an hour."
- The guard prevents the AI from accessing sensitive configuration files or credentials.
  > "**A guard.** A rule in the harness refuses any tool call whose arguments name the posting helper, the token command, the sign-in cache, the policy folder or the harness profile."
- The system identifies the specific user who performed the posting in the ledger.
  > "The newest two registers (1088 and 1089, entries 5637 to 5641) are this invoice, and the User ID is **NEIL**, my own Business Central user."
- The rules are stored in a separate policy file outside of the project code.
  > "They live in a policy file, outside the project."

## Outcome
I built a tool that provides a safe, human-in-the-loop interface for AI to post orders to Business Central. The design ensures that the AI cannot override business rules or bypass safety guards.

## Caveats
The current design uses a shared sign-in for the AI and the tool, which is not a proven defense against a determined attacker.
