---
title: "Business Central Supply Chain"
part: 4
description: "Do Written Procedures Help an AI Assistant? I turned its own notes into three standard procedures and five work instructions, then ran matched requests with and without them. The procedures changed what it asked and made it more consistent. They did not make it faster"
date: "2026-11-16"
categories: ["AI", "Business Central"]
image: "/assets/images/bcsupplychain4/poster.svg"
tags: "business-central, mcp, ai-agent, deepseek, sop, work-instructions, llm-wiki, evaluation"
hidden: false
slug: "bcsupplychain4"
---

# Do Written Procedures Help an AI Assistant?

## What this post tells you, and why

In [Part 3](/posts/bcsupplychain3/) the AI wrote notes in its wiki after every run: how Business Central behaves, what went wrong, what it assumed. The idea I want to test is simple. If those notes are turned into proper **procedures**, will the next run need less reasoning and make fewer mistakes?

I borrowed a distinction from quality management:

| Document | Answers | Written for | In this project |
|---|---|---|---|
| **Standard procedure** (an SOP) | What, why, who decides, which facts must be collected | The person who owns the process | "Create a draft purchase order": the facts to collect, the guardrails, the steps that only a person can do |
| **Work instruction** | Exactly how to perform one task, click by click | The person doing the hands-on work | "Create a purchase order with one line": the exact tool, the parameters that worked, the errors and their fixes |

A step in an SOP links to the work instruction that performs it. I wrote three SOPs and five work instructions from what the AI had already learned, plus what I knew about the API.

## What the procedures say

Here is the sales-order procedure as the AI reads it. At the top: what it is for, when it applies, and who decides what.

![](assets/images/bcsupplychain4/r4-sop-page-top.webp)
*The written procedure for a draft sales order. "Decision rights" is the key line: the AI prepares the draft, a person posts it and approves special prices and credit exceptions*

![](assets/images/bcsupplychain4/r4-sop-page-steps.webp)
*The steps, the guardrails and the human-only steps. Each step links to a work instruction with the exact calls*

Here is the heart of that procedure in plain text, shortened: the table of facts the AI must have before it creates anything, and what to do when one is missing.

| Fact | Source | If missing |
|---|---|---|
| Customer | look up the customer (number, blocked, credit limit) | ask if no match |
| Item | look up the item (stock, list price) | ask if ambiguous |
| Quantity | the request | **ask** |
| Unit price | the request or the user | **ask**. The item list price is only a suggestion. A "special" or "agreed" price is not stored where the AI can read it, so ask |
| Ship / order date | the request, otherwise today | state the date you used |
| Stock | stock on hand on the item | warn if the quantity is more than stock, and ask about backorder |
| Customer credit | credit limit and balance on the customer | a limit of 0 with a balance due is worth a flag. Never change the limit |

One line under the table does most of the work: **"Ask all missing facts in ONE round. Do not ask for anything you can look up."**

## A work instruction, in full

An SOP says what to do and who decides. A **work instruction** says exactly how: which tool, which fields, and what goes wrong. This is the one for creating a sales order with one line. The AI reads it before its first write.

![](assets/images/bcsupplychain4/r4-wi-sales-line-top.webp)
*The top of the work instruction. The first line tells the AI which of two tools to use and why: the other one was rejected in a test run. Then the header call, the line call, and the read-back*

![](assets/images/bcsupplychain4/r4-wi-sales-line-errors.webp)
*The error table. Each row is a mistake the AI made once, with the fix. The last two sections matter for prices: Business Central stores exactly the price it is sent, so a special price must always be sent, and read back*

Most of the content of these pages came from the AI itself. It hit an error, found the fix, and the procedure told it to write the fix into the matching work instruction. I reviewed what it added and kept what was right.

## The hand-over procedure

One procedure applies to every task. It says how the AI must end: always in the same five parts, in plain words, so that a person can finish the job.

![](assets/images/bcsupplychain4/r4-handover-top.webp)
*Parts 1 to 4: what I did (and that nothing was posted), what is left and why, what to check first with numbers and not just "check credit", and links*

![](assets/images/bcsupplychain4/r4-handover-rules.webp)
*Part 5 is steps, only where a screen is genuinely needed. The rules at the bottom are the ones that matter most: never tell a person to do what the checking screen already does, never suggest raising a credit limit or zeroing a cost, and say so in the first line if you could not do what was asked*

Every hand-over in this series, the purchase of 19 chairs, the pedestal order, the lamp receipt, follows this page.

The full set of procedures is three SOPs (purchase order, sales order, correcting an existing order) and five work instructions (look up, create a purchase line, create a sales line, modify a line, and verify). They are in the wiki under `procedures/`, and `CLAUDE.md` tells the AI to read the matching SOP and work instructions before it starts, and to add new gotchas to the work instruction, not to a new page.

## The test

I used three kinds of prompt, each in two conditions, three times:

| Family | Prompt shape |
|---|---|
| Purchase | "Receive 12 ANTWERP Conference Table from Wide World Importers." |
| Sales | "Ship 14 PARIS Guest Chair, black to Trey Research." |
| Special price | "Sell 8 BERLIN Guest Chair, yellow to Alpine Ski House at their special price." |

Condition **A** was the wiki as it was before the AI wrote anything, with no procedures. Condition **B** was that wiki plus the procedures. Before every run I reinstalled the wiki from a snapshot, so no run could learn from another. Each prompt used a customer and item (or vendor and item) pair that no earlier run had used, so no run could find another run's document. The first round of B runs used my first version of the procedures, and the next two rounds used a second version that included what the AI had added.

I scored each run from the harness log, which records every tool call and error, not from my impression. I answered the AI's questions from a fixed script. That is 18 runs, one model, one company. It is a small test.

## What the numbers say

| Family | Procedures | Tool calls (round 1 / 2 / 3) | Median | Errors from Business Central (1 / 2 / 3) |
|---|---|---|---|---|
| Purchase | without | 32 / 25 / 43 | 32 | 1 / 1 / 4 |
| Purchase | with | 34 / 30 / 30 | 30 | 4 / 0 / 1 |
| Sales | without | 20 / 38 / 19 | 20 | 2 / 4 / 1 |
| Sales | with | 31 / 29 / 28 | 29 | 2 / 2 / 0 |
| Special price | without | 32 / 25 / 44 | 32 | 2 / 1 / 2 |
| Special price | with | 22 / 27 / 31 | 27 | 2 / 0 / 1 |

Across all nine runs per condition, the mean was **30.9 calls without** procedures and **29.1 with** them. That is no real difference. What is different is the spread. Without procedures the runs ranged from 19 to 44 calls. With them, from 22 to 34. The procedures did not make the AI faster. They made it more predictable.

:::watch-it The AI still read them late
In one of the first runs the AI read the work instruction for creating the order only after it had created the order. In the later runs I added a rule to the SOP: read the work instruction before your first write. All the later runs followed it.
:::

## What changed is what it asked

This is the real result.

| Family | Without procedures | With procedures |
|---|---|---|
| **Purchase** | Asked only how to proceed. Never asked receive-or-invoice or the invoice number. Used the item master cost, or never asked for a cost. | Asked the unit cost, whether to receive or receive and invoice, and the invoice number, in all three runs |
| **Sales** | Asked **nothing** in all three. Shipped at the list price. Did not mention a customer with a credit limit of 0.00 and a balance due | Asked the price and flagged the credit position in all three |
| **Special price** | Asked for the price in all three, but after it had already created an order at list price. One run created extra test quotes to probe the pricing | Asked for the price before creating anything in all three. Flagged the credit position in two |

The AI without procedures was not careless. It did the routine thing, which is to use the list price and the item cost. The SOP changed the routine. A rule such as "the item master cost is only a suggestion, not the answer" is a business policy, and the AI cannot discover a policy from the API.

There was a second effect. Without procedures the AI created between two and five documents per run, because it probed. With procedures it created two, every time. One run without procedures ran eight shell commands that read the harness's own configuration and session folder, looking for a way to post a receipt. Posting is switched off in this configuration, so nothing could happen, but it is the behaviour an SOP removes: with the procedures the same kind of run used one to three shell commands.

## The AI improved the procedures itself

The SOP tells the AI to record new gotchas in the matching work instruction. In the B runs it did, and some of what it added was good:

- Purchase orders in this API have **no Vendor Invoice No. field** at all, so the invoice number cannot be stored. My first draft of the SOP assumed it could. The AI found out, and corrected the work instruction, so the SOP now says to hand the number over to the person who posts.
- On a new line, `invoiceQuantity` already equals the quantity, so it is **not evidence** that anything was invoiced. Two separate runs found this independently.
- Before asking for a price, read the customer's earlier orders and quotes for the same item as evidence, and offer it as a suggestion, but still ask.

I kept those, and I left out two things on purpose. One was customer balances, because they change. The other was the AI's own suggestion to ask about a credit limit once and not again, because that weakens the rule I wanted.

A warning about my own method: I reset the workspace between runs, so the AI's edits were erased each time. I recovered them from the harness logs. Without that I would have lost them.

## What I do not know

- **Is it the procedures, or the instruction to follow them?** I tested this afterwards. I removed the rule from `CLAUDE.md` and ran the three families again, plus one run where the procedures were also missing from the index. The AI found the procedures anyway, read them before its first write, and asked the same questions. In this wiki, the existence of the procedures matters, not the instruction. I did not test a much larger wiki, where they might be harder to find.
- **Is it the content or the shape?** I did not compare SOPs and work instructions with a single long notes page.
- **One model, one company, one script of my own answers.** Another model might follow a procedure less closely, or more.
- **Two of the runs hit demo data** that matched my prompt (an existing First Up order for the TOKYO chair, and an Adatum order for the lamp). The AI noticed both.

:::bullet-points What I would tell someone starting
- Write down **which facts the AI must collect**, and that a default such as the list price is a suggestion. That is where the procedures changed behaviour.
- Do not expect speed. Expect **consistency and fewer surprises**.
- Let the AI add to the work instructions, then **review what it added**.
- Keep your own test design out of the AI's workspace.
:::

## What comes next

[Part 5](/posts/bcsupplychain5/) fills in three gaps: payment terms, purchase receipts, and a preview feature for asking Business Central questions. [Part 6](/posts/bcsupplychain6/) asks what happens when someone is careless, and [Part 7](/posts/bcsupplychain7/) shows the screen that makes the answer safe.
