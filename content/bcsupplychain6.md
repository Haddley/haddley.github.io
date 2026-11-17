---
title: "Business Central Supply Chain"
part: 6
description: "Data Query Tools: Asking Business Central Questions: A preview feature gives the agent four extra tools to query Business Central data directly. It ignored them until the wiki pointed at them, then answered a cross-record question that the standard API pages cannot, after several query errors"
date: "2026-11-17"
categories: ["AI", "Business Central"]
image: "/assets/images/bcsupplychain6/poster.svg"
tags: "business-central, mcp, ai-agent, deepseek, data-query-tools, preview, wiki"
hidden: false
slug: "bcsupplychain6"
---

# Data Query Tools: Asking Business Central Questions

The standard API pages work one page at a time: "list purchase orders", then "list the lines of this order". That is fine for creating or fixing a document. It is a poor fit for a question such as "which vendor has the most open purchase orders?", because the answer needs lines from many documents.

**Data Query Tools** is a preview feature of the Business Central MCP server that gives the agent four extra tools for this. The agent finds a table, reads its fields, and writes a small query in AL (the Business Central programming language). Business Central runs the query as the signed-in user and returns rows. The tools are **read-only**: they cannot create, change or delete anything, so creating and posting documents still goes through the API pages.

## What it adds

| Tool | What it does |
|---|---|
| `bc_data_find_tables` | Finds tables by name |
| `bc_data_get_table_schema` | Lists a table's fields |
| `bc_data_get_table_relations` | Shows how tables link |
| `bc_data_query` | Compiles and runs a query written in AL |

I switched it on in `SupplyChainLab`: select the feature in the configuration's Server Features list, and choose Activate. The configuration must be deactivated first.

:::watch-it Microsoft plans to charge for MCP tools
When you activate the feature, Business Central warns: "Use of Data Query Tools will incur additional charges." Microsoft's own MCP overview says it plans to introduce charges for Business Central MCP tools, and that pricing, affected tools and rollout will be announced later. I found no published price. A community project says billing for the data query tools is expected when the feature reaches general availability, but it gives no source, so I treat that as unconfirmed. I accepted the warning once, for a short test in a sandbox, and switched the feature off straight afterwards. Check with your Microsoft partner before you leave it on.
:::

## First try: the agent ignored it

On my first prompt after switching it on (a purchase order for 13 lamps), the agent used **none** of the four tools. It made 34 normal calls. It had no reason to use them, because nothing in its wiki or in my prompt mentioned them.

## Second try: the wiki pointed at them

In that first run the agent wrote a new wiki page about the configuration, which listed the data tools. I kept that page. Then I asked:

```PROMPT
Which vendor has the largest total value of open purchase orders, and how many open orders is that?
```

This time the agent used the data tools 12 times, in 26 calls in total. It looked up table schemas, wrote queries, and failed six times with "Compilation failed" before getting them right. The errors were about AL syntax: object names that were too long, a filter on a column with special characters, and a field that did not exist.

## What it found

Two facts in the answer would be easy to get wrong with the standard pages:

- **The API status is inverted from what you see in the web client.** In the API, **Draft** means the order is open and not yet released, and **Open** means released. Filtering for "open" returned the wrong set.
- **Outstanding Amount counts only what has not been received.** A line that is received but not yet invoiced shows zero, so it understates the open value.

It also noticed that the `fullyReceived` flag is unreliable on drafts.

All 32 purchase orders qualified as open under one reading. By the classic reading (released, fully received, waiting for an invoice) **First Up Consultants** leads with 80,470.00 across 2 orders. Under a narrower reading the leader changes to **Graphic Design Institute** at 31,369.07, because First Up's two large orders have already arrived.

The agent reported both and explained the difference, and then wrote the query recipes and the "open" definition into the wiki.

:::brain-power Should it have asked first?
"Open" has two reasonable meanings, and the agent answered both instead of asking me which one I wanted. In the earlier posts it asked about cost and price. Here it did not ask. Is a clear answer to both readings better than a question? I think a one-line question first would have saved a paragraph.
:::

## What I do not know

- Whether it is **faster**. I did not run the same question without the data tools, so I cannot say.
- Whether the answer is **right**. I have not checked the 80,470.00 against the web client.
- How the **charge** compares with the time it saves.

:::bullet-points What I would tell someone starting
- The agent will not use a tool it has not been told about. **Put new tools in the wiki.**
- Expect **several query errors** at the start. The agent fixes them, and then records the fix.
- For documents, use the standard pages. For **questions across documents**, the data tools are a better fit.
:::

## What comes next

Run the same question with the data tools off, check the answer in the web client, and then run the pilot of 40 scenarios on a fresh copy of the Sandbox.
