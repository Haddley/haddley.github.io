---
type: post
slug: specdriven3
title: "Spec-Driven AI Tools (Part 3)"
date: "2026-09-30"
part: 3
builds_on: [specdriven1, specdriven2, specdriven4]
topics: [spec-driven-development, ai-agent-workflows, automated-code-review, prompt-engineering]
tools: [BMAD, OpenSpec, Spec-Kit, Claude Code]
status: current
checked: "2026-11-06"
source_hash: "9ee7bf96c194"
generated_by: gemma4:12b
---

**Summary.** I evaluated the BMAD tool as part of a series comparing three different spec-driven AI development workflows. I found that BMAD is the only tool that proactively asks for clarification on ambiguities and features a robust three-layer review process that caught several bugs before I saw them.

## What I did
- I set up a fresh worktree using the same baseline calculator and feature requests as previous tests.
- I installed and configured the BMAD tool as a Claude Code plugin.
- I ran the full spec-build-review cycle for both Programmer Mode and Statistics Mode.
- I compared the results, costs, and behaviors of BMAD against OpenSpec and Spec-Kit.
- I verified all fixes and results through manual testing and automated tests.

## Claims
- BMAD is the only tool that asks for clarification instead of making silent decisions.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)."
- The three-layer review process caught four real bugs before I saw them.
  > "Its three-layer review found real defects and correctly rejected several false findings."
- BMAD's review process is more proactive than Spec-Kit's convergence feature.
  > "BMAD's review ran automatically, inside the same build pass, before the result ever reached me."
- BMAD's run cost approximately 2.6 times more than OpenSpec.
  > "The BMAD run cost about 2.6 times OpenSpec's, even though its spec is the most compact of the three."
- BMAD's review layer correctly identified and rejected several false findings.
  > "The most interesting line in the whole Review Triage Log, though, is a finding the review layer checked and explicitly **rejected as correct behavior**:"
- BMAD is the most expensive and complex tool to set up and run.
  > "It was the heaviest of the three to set up and run, and the most expensive in my runs."

## Outcome
I concluded that while BMAD is the most operationally heavy and expensive tool, it provides the highest level of safety by asking for clarification and running a thorough automated review.

## Caveats
The comparison is based on specific versions of the tools and may change as the software evolves.
