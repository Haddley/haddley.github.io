---
type: post
slug: rewardsextension
title: "Rewards Extension"
date: "2023-08-30"
builds_on: [lmstudio]
topics: [business-central, al-programming, table-extensions, page-extensions, llm-documentation]
tools: [Business Central, Codellama, LM Studio]
status: current
checked: "2026-11-06"
source_hash: "600b55aef4ed"
generated_by: gemma4:12b
---

**Summary.** I built a Business Central extension that allows users to create a list of rewards and associate them with customers. I also demonstrated how to use a local language model to document the AL code.

## What I did
- I created a Reward table and two associated pages.
- I added a Reward ID field to the Customer table via a table extension.
- I added a Reward field to the Customer Card page via a page extension.
- I used a local codellama model to generate the code documentation.

## Claims
- The extension allows users to manage rewards and link them to customers.
  > "I created a Business Central Extension that allows users to create a list of Rewards and associate them with Business Central Customers."
- The idRange ensures that my object IDs do not collide with other extensions.
  > "Every table and page that I add has to have an id inside it, so that my objects do not collide with Business Central's own or with other extensions'."
- I used table and page extensions to add fields without changing base objects.
  > "I did not change the base objects, because an extension adds to them."
- I used a local language model to document the code and verified the output.
  > "I used a local language model to document the code, and I checked its answer."
- The Reward List and Reward Card pages display the Reward ID, Description, Discount Percentage, and Minimum Purchase.
  > "Both pages show the table's fields, which are the Reward ID, the Description, the Discount Percentage and the Minimum Purchase."

## Outcome
I built a functional Rewards extension that links rewards to customers and documented the code using an AI model.

## Caveats
The explanation provided by the language model is a starting point and not a formal specification.
