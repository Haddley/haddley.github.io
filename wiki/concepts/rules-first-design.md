---
type: concept
slug: rules-first-design
title: "Rules-first design"
description: "Using AI to build and maintain a rules base from the law, then running the rules, not the AI, when someone asks: what the Minnesota DWI advisor posts show, and where the approach is weaker than the first post claimed"
posts: [azurefoundryagent7, azurefoundryagent8]
status: current
checked: "2026-11-06"
---

**Summary.** In a rules-first design, a model helps build a rules base from primary sources, and at question time ordinary code applies the rules. The model's only job is reading the person's words into facts. I tried this for a Minnesota DWI advisor, and two posts report how well it worked and how I tested it.

## The idea
- AI reads the statutes and court decisions and drafts each rule with a quote from the source.
- A script checks the quotes, and a person approves the change.
- At question time the rules run. A small model turns the person's words into facts, and a check keeps only the facts their own words support.
- The answer is assembled from templates, and every citation is checked against the statute text.

## Claims
- The pattern, in one sentence.
  > "use AI to build and maintain a rules base for one body of law, and run the rules, not the AI, when someone asks" — azurefoundryagent7
- Why it is attractive: speed, cost and traceability.
  > "In this case the answers are cheaper and faster, and each figure traces back to the section of the law it came from." — azurefoundryagent7
- Where the model sits.
  > "At question time only the rules run." — azurefoundryagent7
- A small model is enough, because the job is small.
  > "Because that job is small, the model can be small: qwen2.5:7b, running locally, with no frontier model anywhere." — azurefoundryagent7
- Plain rules already read most messages.
  > "Rules alone, with no model at all, read 73% of 150 fresh messages exactly." — azurefoundryagent7
- Little is left for the model to get wrong.
  > "Everything with a legal consequence is code, so there was little for the model to get wrong." — azurefoundryagent8
- A perfect reader and the real small model scored the same on the 2,000 tests.
  > "With a perfect reader the advisor also passed all 2,000, and the real small model matched it." — azurefoundryagent8
- Search engines do not rank a statute above a blog post; the rules base does.
  > "A search engine ranks pages. It does not rank a statute above a law firm's blog post, and our advisor does." — azurefoundryagent8

## Where the approach is weaker
- The first post claimed the advisor was right every time.
  > "Only our AI Agent is right every time, and every citation it gives is checked against the statute text." — azurefoundryagent7
- The tests are built from the same rules, so a shared mistake would pass.
  > "The tests share the advisor's rules." — azurefoundryagent8
  > "No lawyer has reviewed them." — azurefoundryagent8
- The rules did not check that a timeline fits together.
  > "Some simulated stories contradict themselves." — azurefoundryagent8
- A rules-first advisor can still miss something it was given.
  > "Our advisor did not: the person gave a notice date of 29 August, so the window closed on 28 October" — azurefoundryagent8

## What I concluded
The design makes the answers fast, cheap and checkable, and it moves the risk from the model to the rules and the tests. Anything the rules do not encode, such as an inconsistent story or a commercial licence, is a gap that no model will fill. The tests need to come from a source other than the rules.
