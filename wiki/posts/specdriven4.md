---
type: post
slug: specdriven4
title: "Spec-Driven AI Tools (Part 4)"
date: "2026-09-30"
part: 4
builds_on: [specdriven1, specdriven2, specdriven3, deepseekharness]
topics: [spec-driven-development, ai-agent-workflows, llm-cost-analysis, software-engineering-processes]
tools: [OpenSpec, Spec-Kit, BMAD, Claude Code, DeepSeek Harness]
status: current
checked: "2026-11-06"
source_hash: "096c40148b42"
generated_by: gemma4:12b
---

**Summary.** I compared three spec-driven AI development tools—OpenSpec, Spec-Kit, and BMAD—by running them against identical tasks and feature requests. I found that while they share a common goal, they differ significantly in their approach to ambiguity, verification, and cost.

## What I did
- I ran three different tools against the same fixed task to eliminate noise.
- I analyzed how each tool handled specific technical ambiguities.
- I measured the cost and friction of each tool's workflow.
- I compared the tools against the original source article's claims.
- I evaluated the tools based on their suitability for different team needs.

## Claims
- BMAD is the only tool that proactively asked me for clarification on technical ambiguities.
  > "Read across a row and the pattern holds: every ambiguity got a real answer, every answer was different at least once, and in three cases (negative-number format, bitwise scope, stddev formula) BMAD is the one tool that actually asked me instead of deciding on its own."
- OpenSpec is the cheapest option because it skips the steps of asking the user and performing post-facto verification.
  > "It is fastest and cheapest largely *because* it skips both things that cost the other two tools time, turns, and money: asking you anything, and checking its own work after the fact."
- Spec-Kit is the most rigorous and conventional tool because it includes an enforced gate called the Constitution Check.
  > "**Spec-Kit reads as the most conventionally rigorous.** GitHub-backed, the heaviest artifact set of the three (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`, plus a pre-planning quality checklist), and the only one with a literal enforced gate — the Constitution Check, a pass/fail table checked against every principle before planning can proceed."
- Spec-Kit has significantly more GitHub stars than OpenSpec.
  > "It shows in adoption too, not just structure: as of today, Spec-Kit sits at **139,453** GitHub stars against OpenSpec's **70,691** — checked directly, not quoted secondhand — roughly double, a ratio an independent comparison found holding steady since at least May 2026 (96k vs 47k then)."
- OpenSpec's cost was the lowest in my tests, while Spec-Kit and BMAD were roughly 2.6 to 2.7 times more expensive.
  > "(Sonnet 5 pricing, standard cache-token multipliers — cache write ≈1.25× input rate, cache read ≈0.1×.) OpenSpec was the clear cheapest in my own runs, and Spec-Kit and BMAD landed close together at roughly 2.6–2.7× OpenSpec's cost."
- BMAD's standard installation path does not support DeepSeek Harness.
  > "**BMAD's usual install path has no DeepSeek Harness support at all.** The Claude Code plugin method this whole series used (`claude plugin install bmad-method@bmad`) is Claude Code/Codex only."

## Outcome
I concluded that OpenSpec is best for fast, low-cost changes where the user accepts the risk of no automated verification, while Spec-Kit is the superior choice for rigorous, high-assurance workflows.

## Caveats
I did not test every tool's integration with every driver agent end-to-end, so some compatibility findings are based on documentation rather than live tests.
