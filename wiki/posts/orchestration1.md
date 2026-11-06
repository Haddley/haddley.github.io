---
type: post
slug: orchestration1
title: "Agent Orchestration (Part 1)"
date: "2026-09-24"
part: 1
builds_on: [orchestration2, orchestration3, claudecode9]
topics: [multi-agent-patterns, langchain-architecture, tool-call-reliability, agent-orchestration]
tools: [LangChain, muse-glimmer, qwen3.827b-mlx, qwq32b, Ollama]
status: current
checked: "2026-11-06"
source_hash: "ed2753e0bcd8"
generated_by: gemma4:12b
---

**Summary.** I compared three LangChain multi-agent patterns—subagents, skills, and handoffs—to determine which best handles conversational flows requiring clarifying questions. I found that the skills pattern outperformed the others in accuracy and cost while avoiding a specific structural crash caused by nested tool calls.

## What I did
- I designed a test using six documents on Minnesota traffic and car law.
- I implemented and compared three multi-agent patterns: subagents, skills, and handoffs.
- I evaluated these designs across eleven conversations requiring follow-ups or clarifications.
- I identified and analyzed a specific structural cause for a tool-call crash in the subagents pattern.

## Claims
- The router pattern is unsuitable for multi-turn conversations because it lacks a checkpointer.
  > "This is the real, structural reason router is confined to single-shot lookups and excluded from the test below — not that it asks or remembers badly, but that both require state it was built without."
- The skills pattern outperformed both subagents and handoffs in accuracy and cost.
  > "Skills leads on facts and on the judge, and by a wide margin on cost: less than half what subagents spent, and about 70 percent of handoffs' tokens, for a better result than either."
- The flat pattern is significantly more expensive than other designs because it repeats the entire prompt for every turn.
  > "Flat asked again on the follow-up even though that was not expected, and each `ask_user` interrupt replays the entire ~35,000-token document prompt: its two turns cost 107,280 and 108,209 prompt tokens — seven to seventeen times what skills (14,593 / 4,829), subagents (14,875 / 7,750) or handoffs (14,664 / 4,809) paid for the identical conversation."
- A specific nesting depth in the subagents pattern caused a tool-call formatting crash.
  > "A tool call an agent makes from inside another agent's own tool call is not just an ordinary reliability risk with extra steps: across this project, one local model family's `ask_user` formatting crash only ever happened at exactly that nesting depth, on subagents, and never once on a top-level `ask_user` call, across flat, skills or handoffs."
- The judge model provides a high-quality evaluation but is still just one model's opinion.
  > "The judge model is a step up from a keyword check, but it is itself one model's opinion, not ground truth; I found and fixed one case where it hallucinated a full grade for an answer it had never seen."
- Running all specialists on a single model eliminated the crash in the uniform test.
  > "Running every specialist on one model stopped the crash in every conversation the uniform run covered."

## Outcome
I concluded that the skills pattern is the most efficient and reliable design for multi-turn interactions. I also identified that nested tool calls in subagents create a specific structural risk for certain models.

## Caveats
The results for the skills pattern are based on a configuration where the crash forced a specific model choice rather than a uniform model test.
