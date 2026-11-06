---
type: post
slug: azurefoundryagent8
title: "Azure Foundry Agent (Part 7)"
date: "2026-11-03"
series: Azure Foundry Agent
part: 7
builds_on: [azurefoundryagent7]
topics: [evaluation, simulated-users, rules-first-design, test-validity, minnesota-dwi]
tools: [Ollama, qwen2.5, GPT-5.5, DeepSeek, gpt-5-search-api]
status: current
checked: "2026-11-06"
---

**Summary.** Part 6 used three cases. This part tests the same advisor on 2,000 simulated conversations, six of them told as fireside chats, and shows where the other advisors and the test itself fall short.

## What I did
- Generated 2,000 conversations in five kinds: gather, partial, unknown, distractors and scope.
- Had a simulated driver reveal facts only when asked, and scored whether the advisor asked for every needed fact and answered correctly.
- Put ten of the 2,000 to GPT with search, GPT-5.5 and DeepSeek.
- Checked the chats against the statutes and fixed what the check found.

## Claims
- The scale of the test.
  > "2,000 simulated conversations, each one starting the way a frightened person really starts"
- Three cases were a story, not a test.
  > "Three cases is a story, not a test."
- The pass rate, which the post calls the least interesting result.
  > "The advisor passed all 2,000, in about 5 seconds each."
- The chats are shown as the advisor printed them.
  > "Nothing in a chat is edited, shortened or reworded"
- The tests share the advisor's rules, so a shared mistake would pass.
  > "The tests share the advisor's rules."
  > "No lawyer has reviewed them."
- Some simulated stories contradict themselves, and the advisor was not scored on spotting it.
  > "Some simulated stories contradict themselves."
- The advisor missed a passed deadline in the semi-driver chat.
  > "Our advisor did not: the person gave a notice date of 29 August, so the window closed on 28 October"

## Outcome
The advisor passes its own tests, and the post is candid about why that is the least interesting number: the traps are in what the other advisors get wrong and in what the tests do not cover.

## Caveats
The simulated drivers sometimes contradict themselves, for example an arrest "on Saturday" beside a notice 75 days old. The wording was fixed in the 1,000-scenario generator, but the 2,000 conversations were not rerun with the fix.
