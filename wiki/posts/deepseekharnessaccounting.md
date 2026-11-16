---
type: post
slug: deepseekharnessaccounting
title: "DeepSeek Harness (Part 4)"
date: "2026-11-13"
part: 4
builds_on: ["llmbenchmark", "deepseekharnessbusinesscentral", "localagent2", "deepseekharness", "deepseekharnessollama"]
topics: ["deepseek-harness", "business-central-sandbox", "accounting-scenario", "microsoft-learn-lookups", "api-calls"]
tools: ["DeepSeek Harness", "Business Central Sandbox", "Microsoft Learn", "Ollama", "Claude Code", "Microsoft Entra App"]
status: current
checked: "2026-11-14"
source_hash: "63dfbf4923a0"
generated_by: qwen2.5:14b
---

**Summary.** This post details a case study using the DeepSeek Harness web UI on a fresh Business Central Sandbox to handle a scenario where a vendor delivers six broken lamps and agrees to take them back. The harness uses Microsoft Learn lookups and Business Central API calls to generate a plan and draft a credit memo, demonstrating the power of a well-structured harness in handling complex accounting tasks.

## What I did
- Set up a new Business Central Sandbox environment for a clean start
- Ran the DeepSeek Harness web UI with a specific scenario involving broken lamps
- Captured screenshots at each step of the process

## Claims
- The DeepSeek Harness can trace a purchase order to its receipt and invoice even when the order is no longer listed.
  > "The harness traced purchase order 106030 to receipt 107240 and invoice 108234, even though the order was no longer in the order list."
- Microsoft Learn documentation is crucial for the harness to decide on the correct procedure.
  > "**It decided the route.** The note about Correct and Cancel is what rules out the quick option for a partial return."
- The harness correctly identified the jurisdiction based on the tax area and shipping address.
  > "The scenario said the order's tax area is ATLANTA, GA, and the receipt ships to an Atlanta address, and the harness reasoned about **Georgia, City of Atlanta, Fulton County**."
- The harness created a draft credit memo with the correct amounts and tax.
  > "One call failed with an unknown-property error, because Business Central exposes two tools for credit memo lines and the first takes no parent id."
- The harness faced a technical limitation when trying to set the 'On Hold' status on a vendor ledger entry.
  > "The only tool that exposes open vendor ledger entries has twelve fields, and On Hold is not one of them, so the harness had no way to set it."

## Outcome
The post concludes that the DeepSeek Harness successfully navigated a complex accounting scenario, leveraging Microsoft Learn documentation and Business Central API calls to draft a credit memo and outline a plan for handling the return of broken lamps.

## Caveats
The post does not cover the actual posting of the credit memo or the physical return of the lamps, focusing instead on the planning and drafting stages.
