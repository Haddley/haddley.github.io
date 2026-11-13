---
title: "DeepSeek Harness"
part: 4
description: "A vendor delivers broken items and the wrong items, and the company uses Business Central: a walk through one run of DeepSeek Harness on real Cronus data, from the scenario to two unposted draft credit memos, and what a person still has to do"
date: "2026-11-13"
categories: ["AI", "Business Central"]
image: "/assets/images/deepseekharnessaccounting/poster.svg"
tags: "deepseek, ai-agent, business-central, human-in-the-loop, mcp"
hidden: false
slug: "deepseekharnessaccounting"
---

# DeepSeek Harness and a Vendor Dispute in Business Central

## What this post tells you, and why

In [LLM Benchmarking](/posts/llmbenchmark/) I measured six models on accountancy questions and ended on this point: a real answer needs more than a good model. It needs a **harness**. This post shows what that means on one realistic accounting scenario, from the first message to a result that a person can act on. Here is what I tell you, in order:

1. **What a harness is,** in one picture and one paragraph.
2. **The scenario:** a vendor delivers broken items and the wrong items, and the company wants a settlement.
3. **What a chat answer gets right and wrong,** checked against Microsoft Learn.
4. **How the harness approaches the case:** understand first, then look up, then ask, and do the sums with code.
5. **What it needs besides the documentation:** the company's habits, the law, the vendor, and the records an auditor will want.
6. **One run, start to finish,** on the real Cronus demo company, with screenshots of the draft credit memos it created.
7. **What a person does next,** because the harness never posts.

**Why:** accounting work has branches, rules that live outside the product, and consequences that cannot be undone. A harness that looks things up, reads the ledger, shows its sources and stops at the right place is useful. A model that answers fluently is not enough, and the difference is easiest to see on a worked example.

:::watch-it It also works in Claude Code
I ran the same case through Claude Code with the same two connections, and it reached the same kind of plan, faster. Everything in this post is about DeepSeek Harness, because one clear run is easier to follow than two. A harness is not tied to one product.
:::

## A harness, in one picture

You give the harness the scenario. The harness sends the scenario, with a list of the tools it has (or knows about), to the model. The model replies with an answer, or with a request: call this tool with these arguments. The tool might search the internet, look something up in Business Central or Microsoft Learn, or ask you a question. The harness makes the call, adds the result to the conversation (it may summarise an old conversation to keep it short), and sends it all back to the model. That loop repeats until the model gives an answer and asks for no more tools.

![](assets/images/deepseekharnessaccounting/harness-loop.svg)
*The loop. The model decides what to ask for, and the harness makes the calls*

So a harness is powered by a model, and it is not the model. The model does the reasoning and chooses the next request. The harness does everything else: it holds the conversation, runs the tools, and decides which of the model's requests are allowed to run, with approvals that can stop a risky one.

The word "agent" is used loosely, so here is how I use the two words here. The harness is the software apart from the model. An agent is a model and a harness working on a task together. The harness can be a general-purpose program such as Claude Code or DeepSeek Harness, or custom code, such as the code behind the [Blog AI Assistant](/posts/localagent2/). That fits Simon Willison's definition of 18 September 2025: "An LLM agent runs tools in a loop to achieve a goal." Anthropic's essay [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (19 December 2024) draws a related line between a workflow, where code fixes the steps in advance, and an agent, where the model directs its own steps and its own use of tools. A test that works for me: if I swap the model, what stays the same? What stays the same is the harness. Product names do not follow this, so I keep each product's own name and say "harness" when I compare them.

## The scenario

A vendor delivers an order. Some of the items are **broken**, and some of the items are the **wrong ones**. The company uses Business Central, and the invoice may already be posted. The company wants a creative settlement: keep the wrong items at a lower price, and get credit for the broken ones.

This is a good test because there is no single answer. The right documents depend on three facts:

1. Has the original purchase invoice been **posted**?
2. What happens to the **wrong** items: keep them free, keep them at a discount, or send them back?
3. What happens to the **broken** items: scrap them here, send them back, or wait for replacements?

For the run I used real data from Business Central's Cronus demo company. The vendor is Graphic Design Institute. Receipt 107145 is 10 lamps that all arrived broken, with a $385.00 credit agreed and the lamps scrapped here. Receipt 107149 is 10 mobile pedestals that arrived instead of the item ordered, kept for a $400.00 allowance, with 4 of the 10 already sold. Both invoices are posted.

:::brain-power Before you read on
Which of the three questions above would change the Business Central documents the most? Keep your answer in mind. The harness has to find the answers in the ledger, and some of them it cannot find at all.
:::

## Step 1: A chat answer, checked

I put the scenario to Claude Sonnet 5.5 in a plain chat, with no tools, no files and no instructions, and I call its reply "the assistant's answer". It wrote a sensible three-part procedure: a purchase return order for the broken items, a credit memo with an item charge for the wrong ones, then apply the credits and adjust the cost.

It gave no links. I asked, in a third message, for the exact Microsoft Learn page and sentence behind each step. It declined: it had consulted no Learn pages, the answer came from its general knowledge, and any URL or quotation it produced now would be reconstructed from memory. It then split its answer into standard features it trusted but had not verified, and its own reasoning, "not documented statements". That is the honest answer, and it is also the limit of a plain chat: with no tools, it cannot cite a source it has not read. So I looked each claim up on Microsoft's own pages.

| The assistant said | What Microsoft Learn says | Verdict |
|---|---|---|
| Use **Get Posted Document Lines to Reverse** and the cost reverses correctly | The action "always exactly reverses the costs from the posted document line". | Confirmed |
| For the wrong items you keep, post a credit memo with a **Charge (Item)** line, quantity 1, assigned to the receipt | The same steps appear under "Create a purchase allowance". | Confirmed |
| Run **Adjust Cost - Item Entries** so the lower cost reaches the cost of goods sold | After an item charge on items already sold, the batch job forwards the cost to the sale entries. | Confirmed |
| Scrapping needs no separate posting, and a negative adjustment would remove the stock twice | The pages say nothing about scrapping. | Not confirmed |
| The credit "lowers the inventory cost of the kept items" | For items on **Standard** costing, the charge does not change the unit cost. It is posted as a purchase variance. | Wrong for some items |
| Do not use **Create Corrective Credit Memo**, because it reverses the whole invoice | The action copies the invoice into a credit memo that you can edit. | Overstated |
| *(nothing)* | A disputed posted invoice can be put **On Hold** so that payment runs skip it. | **Missing** |
| *(nothing)* | The Learn training module starts by registering the **compensation agreement** with the vendor, before anything is shipped, credited or scrapped. | **Missing**: nothing should be scrapped or posted until the vendor has agreed |

So the assistant's answer was mostly right, and the problems are the ones you cannot see by reading it: it left out the hold, it never said that the vendor must agree first, and it described one effect that is wrong for items on standard costing.

:::watch-it The error is in what the answer leaves out
It is easy to check a claim that is on the page. It is hard to notice a step that is not. A harness that begins with the model's own understanding of the case, then finds the documented procedure and makes every step of the plan point at it, finds missing steps. Reading an answer more carefully does not.
:::

Microsoft Learn also has a training module for this kind of situation, [Manage returns to vendors in Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/modules/manage-vendor-returns-dynamics-365-business-central/). It treats the dispute as a **compensation agreement** registered on a purchase return order. For goods that stay with you, it says to add a **Charge (Item)** line with the allowance in **Direct Unit Cost** and assign it to the posted receipt, which "keeps the inventory valuation accurate". Learn also warns that **Correct** and **Cancel** on a posted invoice work only for **unpaid** invoices, so a dispute over a paid invoice cannot use them.

## Step 2: How the harness approaches the case

The order matters: understand first, then search. A model that has learned accounting can already see what kind of problem this is: a vendor allowance on goods that are partly sold, and a credit for goods that are scrapped. It can see that a $385 credit on $428 of lamps is a $43 loss, not a gain. No Business Central page says that. What the model cannot know from its weights is how **this product** behaves, and that is what the lookup is for:

1. **Understand.** Before it searches, the harness writes a short analysis from the model's own knowledge of accounting, and marks every statement that depends on how Business Central behaves as "to verify".
2. **Search.** It calls Microsoft Learn's MCP tool `microsoft_docs_search` with Business Central terms from the case, never figures or names.
3. **Fetch and verify.** It reads the pages with `microsoft_docs_fetch`, and for each "to verify" statement says whether Learn confirms it, changes it, or does not cover it, with the page and the sentence.
4. **Read the ledger.** It reads the facts of the case from Business Central itself, so it never asks a person for something the data holds.
5. **Ask.** Only then does it ask the person the questions that neither the model, the documents nor the ledger can answer.

If nothing documents a step, the harness says so and asks a person. It also does the arithmetic with code and not in its head, for example the share of an allowance across receipt lines.

:::watch-it Search first, and do not guess addresses
While I was writing, two Learn addresses that I guessed returned 404 errors. A search then found the right pages straight away. A harness that builds an address from memory will fail the same way, or worse, will fetch an old page that still exists.
:::

## Step 3: What it needs besides the documentation

Microsoft Learn says how Business Central works. A real settlement also depends on four other things.

**The company's habits.** Do we hold every disputed invoice? Which item charge is the purchase allowance? Do we scrap broken items here? Those answers live in people's heads. A company wiki of short rules, each with a reason, an owner and a review date, kept as files and loaded by the harness as a skill, answers them. In my run the wiki said: put every disputed posted invoice on hold; scrap broken items that cost under $50 a unit; approvals above $500 need a second person; allowances use the item charge `PURCH-ALLOW`. A rule can change what the company chooses. It cannot change how the product behaves, so if the two disagree the harness says so and does not follow either blindly.

**The law and the standards.** Whether the tax on the original invoice must be adjusted, and how a vendor allowance is accounted for (under US GAAP, ASC 705-20 treats vendor consideration as a reduction of the purchase price), are set by the tax authority and the standard-setter, not by Business Central. The harness should look them up, cite them, say when it cannot reach the primary text (the FASB Codification is paywalled), and flag the point for a qualified accountant.

**The vendor.** The settlement is a negotiation unless the terms were agreed in advance. A harness can price each offer, flag the approval limits, check what the ledger says (both invoices paid, so a credit becomes a refund claim), and draft the message. Could it conduct the negotiation itself? Technically, yes. Whether it should is a question of authority and risk, not a limit of the technology: a message to a vendor cannot be recalled, the company decides who may commit it, and the auditors will ask who agreed what. So I would grow its role in steps: it informs, then it drafts and a person sends, then it negotiates within a **mandate** that a person writes down, the way a company gives a junior buyer a limit. Until the vendor agrees, nothing is scrapped or posted, because scrapping first can leave a company with no goods, no evidence and no credit.

**The records.** A settlement that the books show and the files do not support is a problem at audit time. I found no standard that lists the records for a vendor dispute, so this is practitioner guidance, built from [PCAOB AS 1105](https://pcaobus.org/oversight/standards/auditing-standards/details/AS1105) on audit evidence: the order, receipt and invoice; evidence of the defect (photographs, a note); the vendor's agreement in writing, and later the vendor's own credit note; an internal approval dated before the disposal; evidence of the disposal; the posting trail; the reconciliation of the agreed credit to the received credit; and the payment hold. The harness can keep the checklist and say which items exist and which are missing. It must never create evidence: it does not write the approval or invent a vendor email.

Things also go wrong: a vendor that has stopped trading, a vendor blocked in Business Central, goods already sold or used, an invoice already paid. Most of these are reads of the ledger, so the harness should check them before it plans anything.

## Step 4: One run, start to finish

For the run I used DeepSeek Harness in its headless mode with the DeepSeek V4 Flash model. It had two connections: the Microsoft Learn MCP server, and the Business Central MCP server with a configuration that could read the ledger and create and modify purchase credit memos and their lines, and nothing else. (The setup, and what went wrong on the way, is in [Connecting DeepSeek Harness to Business Central](/posts/deepseekharnessbusinesscentral/).) The harness also had the company wiki and a skill that set out the method. I gave it the scenario and asked for five things: look up the product behaviour, read the ledger, name the jurisdiction and look up the tax rule and the GAAP treatment, write a plan with a source for each step, then create the two draft credit memos and never post. Here is the run, as a conversation. Every quoted line is a real query or a real reply from the logs, and long replies are cut.

![](assets/images/deepseekharnessaccounting/fireside-deepseek.svg)
*DeepSeek Harness works one vendor dispute from start to finish*

### What it read

The harness read the vendor, the receipts, the invoice lines, the item ledger, the accounting periods and the existing credit memos. It found that receipt 107145 is 10 lamps at $42.80, a cost of $428.00, and receipt 107149 is 10 pedestals at $338.20, a cost of $3,382.00. Nothing in the data links a receipt to its invoice, so it matched them by posting date and exact amount, and asked a person to confirm. This is what it was looking at in the Business Central web client. Invoice 108139 for the lamps is paid, and the related G/L entries show the payment out of cash:

![](assets/images/deepseekharnessaccounting/bc-posted-invoice-108139-paid.webp)
*Posted purchase invoice 108139 for the lamps. The related G/L entries include a cash payment of $453.68, so the invoice is paid*

![](assets/images/deepseekharnessaccounting/bc-posted-invoice-108143.webp)
*Posted purchase invoice 108143 for the 10 ATHENS Mobile Pedestals, item 1906-S, $3,382.00 plus $202.92 tax*

Both invoices are paid, so the credits cannot reduce an unpaid balance. They become a refund to claim, or a balance to offset. It also found the periods up to October 2025 closed, so the credits must post in an open period.

### What it concluded

It worked out that the $385.00 credit leaves $43.00 of the lamps' $428.00 cost unrecovered, and that the $400.00 allowance on the pedestals is $160.00 against the 4 sold and $240.00 against the 6 in stock. For the tax it chose **Florida**, because the vendor is in Miami and both invoices were taxed at 6%, citing Fla. Stat. § 212.17 and Rule 12A-1.014, and noting that the lamps are scrapped, not returned, so the statute does not fit them on its face. For the accounting it cited ASC 705-20-25-1, read in KPMG's public inventory handbook because the FASB Codification is paywalled, and flagged both credits for a qualified accountant. It applied the wiki: the lamps cost $42.80 a unit, under $50, so scrapping them is right, and each credit is under the $500 approval limit, though together they are $785.

### What it created

Then it created the drafts. These are the two credit memos in Business Central, listed beside the existing ones. Memos 1011 and 1012 have no vendor credit memo number, because the vendor has not issued one:

![](assets/images/deepseekharnessaccounting/bc-draft-credit-memos-list.webp)
*The Purchase Credit Memos list. 1011 and 1012 are the harness's drafts. The Vendor Cr. Memo No. column is empty because the vendor has not issued a credit note*

![](assets/images/deepseekharnessaccounting/bc-draft-1011-open.webp)
*Draft credit memo 1011 for Graphic Design Institute. Its status is Open, so it is not posted. The Post button is there for a person to use*

![](assets/images/deepseekharnessaccounting/bc-draft-1011-lines.webp)
*Draft 1011: one line, subtotal $385.00, tax $11.55, total $396.55*

![](assets/images/deepseekharnessaccounting/bc-draft-1012-lines.webp)
*Draft 1012 for the pedestals: subtotal $400.00, tax $12.00, total $412.00*

Each draft has one line of type **G/L Account**, number 72140, with a description that names the receipt, for example "Purchase allowance - Receipt 107145 - 10 AMSTERDAM Lamps 1928-S, all broken, scrapped on site".

### What it could not do

The harness first tried the documented line: type **Charge (Item)**, using the wiki's `PURCH-ALLOW` item charge. Business Central answered "The Item Charge does not exist", and no tool can create item charges, so it fell back to a G/L account line. It said plainly what that costs: **a G/L line does not revalue inventory**, which is the whole point of the allowance procedure. It listed the rest of what it could not do:

- It could not assign the allowance to the receipts, apply the credits to the paid invoices, scrap the lamps or run **Adjust Cost - Item Entries**.
- The tax on the drafts came out at 3%, not 6%, because the API cannot set the tax area, which leaves the two memos $23.55 short.
- It reported that the header totals read 0.00 through the API. In the Business Central web client they are correct, as the screenshots show.
- It could not see the vendor ledger entries to confirm the open balance.

It stopped with seven questions for a person, among them: the vendor's credit note numbers and dates; whether the two credits are one $785 claim needing the controller or two under the limit; which four pedestals were sold, since the ledger shows a single shipment of 10; whether the jurisdiction is Florida (the vendor) or Georgia (both receipts ship to Atlanta); whether `PURCH-ALLOW` should be created; and how to treat four older draft credit memos for the same vendor that may overlap.

The run took 8 minutes 58 seconds. Nothing was posted, because the harness had no tool that posts.

## Step 5: What a person does next

The harness never posts. Its output is a plan with sources and two unposted drafts, and a person has more to do before posting:

1. **Check the draft against the plan.** The harness stated its own limits, so the person knows where to look.
2. **Fix the line.** Create the item charge, change each G/L line to a **Charge (Item)** line, and assign it to the receipt, so that inventory is revalued and the cost reaches the cost of goods sold.
3. **Fix the tax.** Set the tax area so the credits carry 6% and not 3%, and settle Florida or Georgia with an accountant.
4. **Get the paper.** Fill in the vendor's credit note number once the vendor issues it, and keep the vendor's written agreement and the evidence of the defect with the file.
5. **Approve and post.** Someone with authority approves, then posts in an open period. Then the person applies the credits to the paid invoices, or claims the refund, and runs **Adjust Cost - Item Entries**.

:::no-dumb-questions
**Q: Is this more work than asking the chat assistant?**

A: Yes, and the checking is the point. The chat answer was fast and mostly right. Checking it against the documentation found missing steps, a wrong effect and several unconfirmed steps, and that took a few minutes. A harness makes that check part of the process instead of something a careful person does when they have time.

**Q: Why not let the harness post the credit memo, once I have approved the plan?**

A: Approving a plan is not approving a posting. A posting needs the real amounts, the real receipt lines and the real vendor, and any of them can differ from the plan, as the item charge and the tax did here. Posting is also a bound action in Business Central, and the configuration leaves bound actions off, so the harness could not post even if it tried.

**Q: Why can the harness create documents but not post them?**

A: Creating a draft is reversible: a person can delete it. A posted document is part of the books. The configuration allows Create and Modify on two kinds of document and nothing else, and a person decided to switch writing on.
:::

:::pencil Find the missing step
A vendor credits you $120 for damaged items that you keep. You already sold half of them last week. You post the credit memo with a **Charge (Item)** line assigned to the receipt. Your inventory value is now correct. What is still wrong, and what do you do about it?

:::answer
The cost of goods sold for the items that you already sold has not changed, so your profit for last week is understated. Run the **Adjust Cost - Item Entries** batch job, which forwards the extra cost, here a reduction, to the sale entries. The item charges page explains this, and it is exactly the kind of step that a procedure written from memory leaves out.
:::
:::

## What this post told you

:::bullet-points What to remember
- A real answer needs more than a good model. It needs a harness: the software that holds the conversation, runs the tools the model asks for, and decides which requests run.
- A chat answer can be fluent and incomplete. The errors that matter are the steps it leaves out, and a harness with documentation tools finds them.
- Start the plan from what the model knows about accounting, mark what depends on the product, then verify it against the documentation and the ledger. Search before fetching, and tie every step to a source.
- Four sources besides the documentation matter: the company's habits, the law and the standards, the vendor, and the audit records. The settlement is a negotiation unless the terms were agreed in advance, and the harness informs it, drafts for it, and could negotiate within a written mandate once a person trusts it to.
- In the run, the harness read the real ledger, found both invoices paid, cited Florida tax law and ASC 705-20 and said where it could not read the primary text, and created two unposted draft credit memos.
- It also said what it could not do: the documented item charge did not exist, the tax came out wrong, and the questions that only a person can answer stayed open.
- The harness drafts, and a person posts.
- It also works in Claude Code.
:::

## What comes next

The next steps are a bank reconciliation, a goods-received-not-invoiced accrual and a foreign currency vendor credit on the same real company, and a test that puts a person in front of the harness's questions, so that silence stays pending and nothing is posted. A harness that creates the item charge itself, with a person's approval, would close the gap that this run found.

## References

- [LLM Benchmarking](/posts/llmbenchmark/): the benchmark, and why the harness matters
- [Connecting DeepSeek Harness to Business Central](/posts/deepseekharnessbusinesscentral/): the setup behind this run
- [LLM Wiki](/posts/LLM-Wiki/): the idea of a knowledge base that a model drafts and a person reviews
- [Model Context Protocol](/posts/businesscentralmcpclaudecode/): connecting Claude Code to Business Central's built-in MCP server
- [Blog AI Assistant](/posts/localagent2/): a harness written as custom code
- [I think “agent” may finally have a widely enough agreed upon definition to be useful jargon now](https://simonwillison.net/2025/Sep/18/agents/): Simon Willison, 18 September 2025
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): Anthropic, 19 December 2024
- [DeepSeek Harness](/posts/deepseekharness/) (part 1), [with Ollama](/posts/deepseekharnessollama/) (part 2) and [with local subagents](/posts/deepseekharnesshybrid/) (part 3)
- [Handle vendor payment disputes](https://learn.microsoft.com/en-us/dynamics365/business-central/payables-how-handling-payment-disputes), [Process returns or cancellations](https://learn.microsoft.com/en-us/dynamics365/business-central/purchasing-how-process-purchase-returns-cancellations) and [Use item charges to account for extra trade costs](https://learn.microsoft.com/en-us/dynamics365/business-central/payables-how-assign-item-charges): Microsoft Learn
- [Manage returns to vendors in Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/modules/manage-vendor-returns-dynamics-365-business-central/): the Microsoft Learn training module on compensation agreements and exact cost reversing
- [PCAOB AS 1105: Audit Evidence](https://pcaobus.org/oversight/standards/auditing-standards/details/AS1105)
- DeepSeek Harness documentation: [user questions](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/user-questions), [approvals](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/approval), [skills](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/skills) and [web access](https://deepseek-harness.github.io/deepseek-harness/en/reference/subsystems/web)
